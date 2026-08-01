#!/bin/sh
# Builds every numbered lesson folder that has a package.json and collects the
# result in /out/<NN>, ready to be served at https://<host>/<NN>/
set -eu

mkdir -p /out

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
done

ls -1 /out
