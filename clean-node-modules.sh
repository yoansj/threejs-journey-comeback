#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

find "$root" -type d -name node_modules -prune -exec rm -rf {} +

echo "Removed all node_modules directories under $root"
