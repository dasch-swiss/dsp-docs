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

sed -e "s|{{DSP}}|$DSP|"     -e "s|{{API}}|$API|" \
    -e "s|{{APP}}|$APP|"     -e "s|{{TOOLS}}|$TOOLS|" \
    -e "s|{{META}}|$META|"   .github/release.mk.tmpl
