#!/bin/sh
# Applies EXCLUDE_DIRS and regenerates the root listing, before nginx starts.
set -eu

ROOT=/usr/share/nginx/html
EXCLUDE_DIRS="${EXCLUDE_DIRS:-}"
SITE_TITLE="${SITE_TITLE:-Three.js Journey}"

# "01,02 05" -> drop 01, 02 and 05. Usually a no-op: when EXCLUDE_DIRS is a
# Coolify build variable these were never built in the first place. This is the
# fallback for when it is only set at runtime.
for excluded in $(echo "$EXCLUDE_DIRS" | tr ',;' '  '); do
    [ -n "$excluded" ] || continue
    if [ -d "$ROOT/$excluded" ]; then
        echo ">> excluding lesson $excluded"
        rm -rf "${ROOT:?}/$excluded"
    fi
done

# What the homepage fetches: the card metadata written per lesson at build time,
# for whatever survived above, newest first.
{
    printf '['
    separator=""
    for name in $(for dir in "$ROOT"/[0-9][0-9]*; do
                      [ -d "$dir" ] && basename "$dir"
                  done | sort -r); do
        [ -f "$ROOT/$name/lesson.json" ] || continue
        printf '%s' "$separator"
        tr -d '\n' < "$ROOT/$name/lesson.json"
        separator=","
    done
    printf ']'
} > "$ROOT/lessons.json"

# The homepage ships with its own title; SITE_TITLE still gets the last word.
sed -i "s|>Three\.js Journey<|>$SITE_TITLE<|g" "$ROOT/index.html"

served=""
for dir in "$ROOT"/[0-9][0-9]*; do
    [ -d "$dir" ] && served="$served $(basename "$dir")"
done
echo ">> serving:$served"
