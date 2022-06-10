#!/bin/bash

set -e

home=$(pwd)
sep='---------------------------------'

die() {
    echo >&2 "$@"
    exit 1
}

usage() {
    echo "usage: <command> -v [main version] -i [api version]  -p [app version]  -t [tools version] "
    echo ${sep}
}

v=""
api=""
app=""
tools=""

for ARGUMENT in "$@"; do
    KEY=$(echo $ARGUMENT | cut -f1 -d=)

    KEY_LENGTH=${#KEY}
    VALUE="${ARGUMENT:$KEY_LENGTH+1}"
    if [[ $KEY == "v" ]]; then
        echo "Prepare new release ${VALUE}"
        v=$VALUE
        echo $sep
        echo $sep
    else 
        echo "Update submodule dsp-${KEY} ${VALUE}"
        cd dsp/dsp-${KEY}
        echo $(pwd)
        git checkout ${VALUE}
        cd ${home}
        git add dsp/dsp-${KEY}
        echo $sep
    fi
done

echo "Update main branch"
git commit -m "Deploy DSP version ${v}"
git push

echo $sep
echo "Deploy version ${v} now"
alias="latest"
if [[ $v == *"-rc"* ]]; then
    echo "This version is a release candidate"
    alias="release candidate"
fi

mike deploy --push --branch gh-pages --update-aliases ${v} ${alias}

# keep the latest stable version as default
# mike set-default --push latest




