# Graphviz diagrams to be converted to PNG
DOT_FIGURES = $(shell find ./ -type f -name '*.dot')
PNG_FIGURES = $(patsubst %.dot,%.dot.png,$(DOT_FIGURES))

THIS_FILE := $(abspath $(lastword $(MAKEFILE_LIST)))
CURRENT_DIR := $(shell dirname "$(realpath $(firstword $(MAKEFILE_LIST)))")

include release.mk

-.PHONY: init-submodules
init-submodules: ## init the documentation from each connected repo; this command takes commit from defined release; used only in github actions!
	git submodule update --init --remote --recursive

.PHONY: update-submodules
update-submodules: ## grab the current documentation from each connected repo
	'$(CURRENT_DIR)/update-and-deploy.sh' dsp=$(DSP) api=$(API) app=$(APP) tools=$(TOOLS) meta=$(META) deploy=false

.PHONY: openapi-update
openapi-update:
	rm -rf ./docs/openapi
	mkdir -p ./docs/openapi/
	rm -rf ./docs/03-endpoints/generated-openapi
	mkdir -p ./docs/03-endpoints/generated-openapi
	## generate openapi yml freshly from the code
	(cd ./dsp/dsp-api && just docs-openapi-generate)
	(cd ./dsp/dsp-api && just docs-ingest-openapi-generate)
	## mkdocs cannot resolve relative paths to the generate openapi yml, we need to copy them to the right location
	cp -r ./dsp/dsp-api/ingest/docs/openapi/*.yml ./docs/openapi/
	cp -r ./dsp/dsp-api/docs/03-endpoints/generated-openapi/*.yml ./docs/03-endpoints/generated-openapi

.PHONY: build
build: ## build docs into the local 'site' folder
	@$(MAKE) install-requirements
	@$(MAKE) graphvizfigures
	@$(MAKE) openapi-update
	.venv/bin/mike deploy $(DSP) latest --update-aliases

.PHONY: serve
serve: ## serve docs for local viewing
	@$(MAKE) build
	.venv/bin/mike serve

.PHONY: deploy
deploy: ## build and publish docs to Github Pages with versioning from the release.mk file
	@$(MAKE) install-requirements
	'$(CURRENT_DIR)/update-and-deploy.sh' dsp=$(DSP) api=$(API) app=$(APP) tools=$(TOOLS) ingest=$(INGEST) deploy=true

.PHONY: install-requirements
install-requirements: ## install requirements
	test -d .venv || python3 -m venv .venv
	.venv/bin/pip3 install --upgrade pip > /dev/null
	.venv/bin/pip3 install -r requirements.txt > /dev/null

.PHONY: clean
clean: ## cleans the project directory
	@rm -rf site/
	.venv/bin/mike delete --all

.PHONY: graphvizfigures
graphvizfigures: $(PNG_FIGURES) ## to generate images from dot files

%.dot.png: %.dot
	dot -Tpng $< -o $@

.PHONY: help
help: ## this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

.DEFAULT_GOAL := help
