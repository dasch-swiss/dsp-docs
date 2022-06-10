# Graphviz diagrams to be converted to PNG
DOT_FIGURES = $(shell find ./ -type f -name '*.dot')
PNG_FIGURES = $(patsubst %.dot,%.dot.png,$(DOT_FIGURES))

THIS_FILE := $(abspath $(lastword $(MAKEFILE_LIST)))
CURRENT_DIR := $(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

include release.mk
	
.PHONY: update-submodules
update-submodules: ## grab the current documentation from each connected repo
	$(CURRENT_DIR)/update-and-deploy.sh dsp=$(DSP) api=$(API) app=$(APP) tools=$(TOOLS) deploy=false
	
.PHONY: build
build: ## build docs into the local 'site' folder
	@$(MAKE) graphvizfigures
	mike deploy $(DSP) latest --update-aliases
	mike set-default latest

.PHONY: serve
serve: ## serve docs for local viewing
	@$(MAKE) build
	mike serve

.PHONY: deploy
deploy: ## build and publish docs to Github Pages with versioning from the release.mk file
	$(CURRENT_DIR)/update-and-deploy.sh dsp=$(DSP) api=$(API) app=$(APP) tools=$(TOOLS) deploy=true

.PHONY: install-requirements
install-requirements: ## install requirements
	pip3 install -r requirements.txt

.PHONY: clean
clean: ## cleans the project directory
	@rm -rf site/
	mike delete --all

.PHONY: graphvizfigures
graphvizfigures: $(PNG_FIGURES) ## to generate images from dot files

%.dot.png: %.dot
	dot -Tpng $< -o $@

.PHONY: help
help: ## this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

.DEFAULT_GOAL := help
