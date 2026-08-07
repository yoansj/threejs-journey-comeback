#!/bin/sh
# Builds every numbered lesson folder that has a package.json and collects the
# result in /out/<NN>, ready to be served at https://<host>/<NN>/
# The homepage project is built on top of that, at the root of /out.
set -eu

mkdir -p /out

# Finished builds, keyed by the contents of the folder they came from. Lives on
# a BuildKit cache mount (see the Dockerfile), so it survives between builds and
# an unchanged lesson is copied out instead of being installed and rebuilt.
# Pruning the builder cache only costs one full rebuild.
CACHE="${LESSON_CACHE:-/lesson-cache}"
mkdir -p "$CACHE"

# Every key carries the hash of this script: changing how lessons are built has
# to invalidate every lesson, or the cache would keep serving the old output.
SCRIPT_HASH=$(sha256sum "$0" | cut -d' ' -f1)

# Content hash of a project folder. Sorted by path so it does not depend on the
# order find walks the tree, and blind to timestamps so a fresh git clone (which
# is what the deployment builds from) still hits the cache.
project_hash() {
    printf '%s %s' "$SCRIPT_HASH" "$(
        find "$1" \( -name node_modules -o -name dist \) -prune -o -type f -exec sha256sum {} + |
            sort -k2 |
            sha256sum
    )" | sha256sum | cut -d' ' -f1
}

# Copies a cached build into place, if there is one for that exact content.
cache_restore() {
    [ -d "$CACHE/$1/$2" ] || return 1

    mkdir -p "$3"
    cp -r "$CACHE/$1/$2/." "$3/"
}

# Stores what was just built, and drops the entries of previous contents of the
# same project so the cache tracks the repository instead of growing forever.
cache_store() {
    rm -rf "$CACHE/$1"
    mkdir -p "$CACHE/$1/$2"
    cp -r "$3/." "$CACHE/$1/$2/"
}

# Run from inside a project folder: reproducible install when there is a
# lockfile, plain install when there is not.
install_deps() {
    if [ -f package-lock.json ]; then
        npm ci
    else
        echo ">> no package-lock.json, falling back to npm install"
        npm install --no-audit --no-fund
    fi
}

# Title shown on the homepage card: first "# heading" of the lesson NOTES.md,
# minus its leading lesson number ("# 18 - Galaxy Generator" -> "Galaxy
# Generator"). Falls back to the <title> of the lesson, then to "Lesson NN".
lesson_title() {
    title=$(sed -n 's/^#[[:space:]][[:space:]]*//p' "$1/NOTES.md" 2>/dev/null | head -n1 |
            sed 's/^[0-9][0-9]*[[:space:]]*[-:.][[:space:]]*//')
    [ -n "$title" ] || title=$(sed -n 's:.*<title>\(.*\)</title>.*:\1:p' "$1/src/index.html" 2>/dev/null | head -n1)
    [ -n "$title" ] || title="Lesson $1"
    printf '%s' "$title"
}

# "01,02 05" -> " 01 02 05 ", so a plain substring test can match whole entries
EXCLUDED=" $(echo "${EXCLUDE_DIRS:-}" | tr ',;' '  ' | tr -s ' ') "

for dir in [0-9][0-9]*; do
    [ -d "$dir" ] || continue

    if [ ! -f "$dir/package.json" ]; then
        echo ">> skipping $dir (no package.json)"
        continue
    fi

    case "$EXCLUDED" in
        *" $dir "*)
            echo ">> skipping $dir (in EXCLUDE_DIRS)"
            continue
            ;;
    esac

    # Hashed before the rewriting below, so the key reflects the repository.
    hash=$(project_hash "$dir")

    if cache_restore "$dir" "$hash" "/out/$dir"; then
        echo ">> reusing cached build of $dir"
        continue
    fi

    echo ">> building $dir"

    # Vite rewrites asset URLs it can see (HTML, imports) using --base, but not
    # plain strings such as textureLoader.load('/textures/foo.png'). Those stay
    # absolute and would 404 under /NN/, so make them document-relative here.
    # Only touched inside the image; the repository keeps its original paths.
    find "$dir/src" -name '*.js' -type f -exec \
        sed -i -E "s#(['\"\`])/(textures|fonts|models|sounds|images|draco|audio)/#\1./\2/#g" {} +

    # npm ci needs a lockfile and hard-fails without one, which would take the
    # whole deployment down over a lesson that was committed without it.
    (cd "$dir" && install_deps && npx vite build --base "/$dir/")

    mkdir -p "/out/$dir"
    cp -r "$dir/dist/." "/out/$dir/"

    # Optional homepage thumbnail, dropped at the root of the lesson folder.
    thumbnail=""
    for candidate in "$dir"/thumbnail.*; do
        [ -f "$candidate" ] || continue
        cp "$candidate" "/out/$dir/"
        thumbnail="/$dir/$(basename "$candidate")"
        break
    done

    # Card metadata for this lesson. The entrypoint collects the ones that
    # survived EXCLUDE_DIRS into the /lessons.json the homepage fetches.
    json_title=$(lesson_title "$dir" | sed 's/\\/\\\\/g; s/"/\\"/g')
    if [ -n "$thumbnail" ]; then
        json_thumbnail="\"$thumbnail\""
    else
        json_thumbnail="null"
    fi
    printf '{"id":"%s","title":"%s","thumbnail":%s}\n' \
        "$dir" "$json_title" "$json_thumbnail" > "/out/$dir/lesson.json"

    # The whole /out/<NN>, so a cache hit needs no post-processing at all.
    cache_store "$dir" "$hash" "/out/$dir"

    # The output is safely in /out and in the cache, so the ~60MB of
    # node_modules has done its job. Kept, they would pile up in this layer for
    # the entire build (half a gigabyte at nine lessons, and growing with every
    # lesson added) on a machine that has to hold the image alongside them.
    # The npm cache mount makes reinstalling cheap anyway.
    rm -rf "$dir/node_modules" "$dir/dist"
done

# ---- Homepage, served at / ----
hash=$(project_hash homepage)

if cache_restore homepage "$hash" /out; then
    echo ">> reusing cached build of homepage"
else
    echo ">> building homepage"
    (cd homepage && install_deps && npx vite build --base /)
    cp -r homepage/dist/. /out/
    cache_store homepage "$hash" homepage/dist
    rm -rf homepage/node_modules homepage/dist
fi

du -sh /out

ls -1 /out
