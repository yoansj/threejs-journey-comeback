#!/bin/sh
# Builds every numbered lesson folder that has a package.json and collects the
# result in /out/<NN>, ready to be served at https://<host>/<NN>/
# The homepage project is built on top of that, at the root of /out.
set -eu

mkdir -p /out

# Title shown on the homepage card: first "# heading" of the lesson NOTES.md,
# minus its leading lesson number ("# 18 - Galaxy Generator" -> "Galaxy
# Generator"). Falls back to the <title> of the lesson, then to "Lesson NN".
lesson_title() {
    title=$(sed -n 's/^#[[:space:]]\+//p' "$1/NOTES.md" 2>/dev/null | head -n1 |
            sed -E 's/^[0-9]+[[:space:]]*[-–—:.][[:space:]]*//')
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

    echo ">> building $dir"

    # Vite rewrites asset URLs it can see (HTML, imports) using --base, but not
    # plain strings such as textureLoader.load('/textures/foo.png'). Those stay
    # absolute and would 404 under /NN/, so make them document-relative here.
    # Only touched inside the image; the repository keeps its original paths.
    find "$dir/src" -name '*.js' -type f -exec \
        sed -i -E "s#(['\"\`])/(textures|fonts|models|sounds|images|draco|audio)/#\1./\2/#g" {} +

    (cd "$dir" && npm ci && npx vite build --base "/$dir/")

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
done

# ---- Homepage, served at / ----
echo ">> building homepage"
(cd homepage && npm ci && npx vite build --base /)
cp -r homepage/dist/. /out/

ls -1 /out
