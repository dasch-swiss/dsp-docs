#! /usr/bin/env bash

set -euo pipefail

getToolsReleases() {
  curl -s "https://api.github.com/repos/dasch-swiss/dsp-tools/releases"
}

getMetaReleases() {
  curl -s "https://api.github.com/repos/dasch-swiss/dsp-meta/releases"
}

getDeployReleases() {
  false
  # this function should output the raw content RELEASE.json, get link by clicking on
  # https://github.com/dasch-swiss/ops-deploy/raw/main/versions/RELEASE.json
  # curl -s ...
}

tools="$(getToolsReleases | jq -r '.[0].name')"
meta="$(getMetaReleases | jq -r '.[0].tag_name')"

read -r -d '' template <<EOF || true
"# for DSP, API, APP, Ingest, see https://github.com/dasch-swiss/ops-deploy/blob/main/versions/RELEASE.json
# for TOOLS, see https://github.com/dasch-swiss/dsp-tools/releases
# for META, see https://github.com/dasch-swiss/dsp-meta/releases (NB: tags start with 'dsp-meta-')
DSP := \"\(.key)\"
API := \"\(.value.api)\"
APP := \"\(.value.app)\"
TOOLS := \"$tools\"
INGEST := \"\(.value.ingest)\"
META := \"$meta\" "
EOF

getDeployReleases | jq 'to_entries[0]' | jq -r "$template" > release.mk