#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

find "$root" -type d -name node_modules -prune -exec rm -rf {} +
find "$root" -type d -name dist -prune -exec rm -rf {} +

echo "Removed all node_modules & dist directories under $root"
