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

.PHONY: build
build: ## build docs into the local 'site' folder
	@$(MAKE) install-requirements
	@$(MAKE) graphvizfigures
	uv run mike deploy $(DSP) latest --update-aliases

.PHONY: serve
serve: ## serve docs for local viewing
	@$(MAKE) build
	uv run mike serve

.PHONY: deploy
deploy: ## build and publish docs to Github Pages with versioning from the release.mk file
	@$(MAKE) install-requirements
	'$(CURRENT_DIR)/update-and-deploy.sh' dsp=$(DSP) api=$(API) app=$(APP) tools=$(TOOLS) deploy=true

.PHONY: install-requirements
install-requirements: ## install requirements
	uv sync

.PHONY: clean
clean: ## cleans the project directory
	@rm -rf site/
	uv run mike delete --all

.PHONY: graphvizfigures
graphvizfigures: $(PNG_FIGURES) ## to generate images from dot files

%.dot.png: %.dot
	dot -Tpng $< -o $@

.PHONY: help
help: ## this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

.DEFAULT_GOAL := help
