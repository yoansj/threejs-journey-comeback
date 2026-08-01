#!/bin/sh
# Applies EXCLUDE_DIRS and regenerates the root listing, before nginx starts.
set -eu

ROOT=/usr/share/nginx/html
EXCLUDE_DIRS="${EXCLUDE_DIRS:-}"
SITE_TITLE="${SITE_TITLE:-Three.js Journey}"

# "01,02 05" -> drop 01, 02 and 05
for excluded in $(echo "$EXCLUDE_DIRS" | tr ',;' '  '); do
    [ -n "$excluded" ] || continue
    if [ -d "$ROOT/$excluded" ]; then
        echo ">> excluding lesson $excluded"
        rm -rf "${ROOT:?}/$excluded"
    else
        echo ">> EXCLUDE_DIRS mentions '$excluded' but there is no such lesson"
    fi
done

# Placeholder homepage: whatever lessons are left, newest first.
{
    cat <<HEAD
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>$SITE_TITLE</title>
<style>
:root { color-scheme: dark light; }
body { margin:0; padding:3rem 1.5rem; font:16px/1.6 system-ui,sans-serif;
       background:#111; color:#eee; display:flex; justify-content:center; }
main { width:100%; max-width:34rem; }
h1 { font-size:1.4rem; font-weight:600; margin:0 0 1.5rem; }
ul { list-style:none; margin:0; padding:0; }
a { display:flex; gap:1rem; padding:.7rem .9rem; border-radius:.5rem;
    color:inherit; text-decoration:none; }
a:hover { background:#ffffff14; }
b { font-variant-numeric:tabular-nums; color:#888; font-weight:500; }
</style>
</head>
<body>
<main>
<h1>$SITE_TITLE</h1>
<ul>
HEAD

    for dir in "$ROOT"/[0-9][0-9]*; do
        [ -d "$dir" ] || continue
        name=$(basename "$dir")
        title=$(sed -n 's:.*<title>\(.*\)</title>.*:\1:p' "$dir/index.html" 2>/dev/null | head -n1)
        [ -n "$title" ] || title="Lesson $name"
        printf '<li><a href="/%s/"><b>%s</b><span>%s</span></a></li>\n' "$name" "$name" "$title"
    done | sort -r

    cat <<'FOOT'
</ul>
</main>
</body>
</html>
FOOT
} > "$ROOT/index.html"

echo ">> serving: $(ls -d "$ROOT"/[0-9][0-9]* 2>/dev/null | xargs -r -n1 basename | tr '\n' ' ')"
