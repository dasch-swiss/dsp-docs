#!/bin/bash

set -e

home=$(pwd)
sep='---------------------------------'

stop() {
	echo >&2 "$@"
	exit 0
}

usage() {
	echo "usage: <command> dsp=[main version] api=[api version] app=[app version] tools=[tools version] meta=[meta version] deploy=[false]"
	echo ${sep}
}

v=""
api=""
app=""
tools=""
meta=""

deploy=false

for ARGUMENT in "$@"; do
	KEY=$(echo $ARGUMENT | cut -f1 -d=)

	KEY_LENGTH=${#KEY}
	VALUE="${ARGUMENT:$KEY_LENGTH+1}"
	if [[ $KEY == "dsp" ]]; then
		echo "Prepare new release ${VALUE}"
		v=$VALUE
		echo $sep
		echo $sep
	elif [[ $KEY == "deploy" ]]; then
		deploy=$VALUE
	else
		echo "Update submodule dsp-${KEY} ${VALUE}"
		cd dsp/dsp-${KEY}
		echo $(pwd)
		git fetch
		git checkout ${VALUE}
		cd "${home}"
		git add dsp/dsp-${KEY}
		echo $sep
	fi
done

# set alias: default is latest, rc is prerelease
alias="latest"
if [[ $v == *"-rc"* ]]; then
	echo "This version is a release candidate"
	alias="prerelease"
fi

if [ "${deploy}" = false ]; then
	stop "do not deploy"
else
	# generates images from dot files
	make graphvizfigures

	echo "Deploy version ${v} to github pages now"
	uv run mike deploy --push --branch gh-pages --update-aliases "${v}" "${alias}"

	echo $sep
fi
