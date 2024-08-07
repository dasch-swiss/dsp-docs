#! /usr/bin/env bash

set -eu

getToolsReleases() {
  curl -s "https://api.github.com/repos/dasch-swiss/dsp-tools/releases"
}

getDeployReleases() {
  false
  # this function should output the raw content RELEASE.jsonl, get link through https://github.com/dasch-swiss/ops-deploy/raw/main/versions/RELEASE.json
  # curl -s ...
}

tools="$(getToolsReleases | jq -r '.[0].name')"

read -r -d '' template <<EOF || true
"# for DSP, API, APP, see https://github.com/dasch-swiss/ops-deploy/blob/main/versions/RELEASE.json
# for TOOLS, see https://github.com/dasch-swiss/dsp-tools/releases
DSP := \"\(.key)\"
API := \"\(.value.api)\"
APP := \"\(.value.app)\"
TOOLS := \"$tools\"
INGEST := \"\(.value.ingest)\""
EOF

getDeployReleases | jq 'to_entries[0]' | jq -r "$template"
