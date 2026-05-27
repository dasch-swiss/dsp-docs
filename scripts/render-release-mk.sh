#!/usr/bin/env bash
# Render .github/release.mk.tmpl with the given values to stdout.
# Usage: render-release-mk.sh --dsp <DSP> --api <API> --app <APP> --tools <TOOLS> --meta <META>
set -euo pipefail

DSP="" API="" APP="" TOOLS="" META=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --dsp)   DSP="$2"; shift 2 ;;
    --api)   API="$2"; shift 2 ;;
    --app)   APP="$2"; shift 2 ;;
    --tools) TOOLS="$2"; shift 2 ;;
    --meta)  META="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

# Validate inputs: refuse empty values and characters that would corrupt the
# sed `s|…|…|` replacement (`|` truncates, `&` back-references the match).
for name in DSP API APP TOOLS META; do
  v="${!name}"
  if [[ -z "$v" ]]; then
    echo "render-release-mk.sh: --${name,,} is required" >&2
    exit 2
  fi
  if [[ ! "$v" =~ ^[A-Za-z0-9._-]+$ ]]; then
    echo "render-release-mk.sh: $name has invalid characters: $v" >&2
    exit 2
  fi
done

sed -e "s|{{DSP}}|$DSP|"     -e "s|{{API}}|$API|" \
    -e "s|{{APP}}|$APP|"     -e "s|{{TOOLS}}|$TOOLS|" \
    -e "s|{{META}}|$META|"   .github/release.mk.tmpl
