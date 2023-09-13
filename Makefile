# bash script that generates dot files with UMLs from python code
PYREVERSE_SCRIPT := $(shell find dsp/dsp-tools -type f -name 'pyreverse.sh')
PYREVERSE_SCRIPT_WORKING_DIRECTORY := $(subst dsp/dsp-tools/,,$(PYREVERSE_SCRIPT))

# Graphviz diagrams to be converted to PNG
DOT_FIGURES = $(shell find ./ -type f -name '*.dot')
PNG_FIGURES = $(patsubst %.dot,%.dot.png,$(DOT_FIGURES))

THIS_FILE := $(abspath $(lastword $(MAKEFILE_LIST)))
CURRENT_DIR := $(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

include release.mk

-.PHONY: init-submodules
init-submodules: ## init the documentation from each connected repo; this command takes commit from defined release; used only in github actions!
	git submodule update --init --remote --recursive

.PHONY: update-submodules
update-submodules: ## grab the current documentation from each connected repo
	$(CURRENT_DIR)/update-and-deploy.sh dsp=$(DSP) api=$(API) app=$(APP) tools=$(TOOLS) deploy=false
	
.PHONY: build
build: ## build docs into the local 'site' folder
	@$(MAKE) generate-pyreverse
	@$(MAKE) graphvizfigures
	@$(MAKE) install-requirements
	mike deploy $(DSP) latest --update-aliases
	mike set-default latest

.PHONY: serve
serve: ## serve docs for local viewing
	@$(MAKE) build
	mike serve

.PHONY: deploy
deploy: ## build and publish docs to Github Pages with versioning from the release.mk file
	@$(MAKE) install-requirements	
	$(CURRENT_DIR)/update-and-deploy.sh dsp=$(DSP) api=$(API) app=$(APP) tools=$(TOOLS) deploy=true

.PHONY: install-requirements
install-requirements: ## install requirements
	pip3 install -r requirements.txt > /dev/null

.PHONY: clean
clean: ## cleans the project directory
	@rm -rf site/
	mike delete --all

.PHONY: generate-pyreverse
generate-pyreverse: ## execute the bash script that generates dot files with UMLs from python code
ifeq ($(strip $(PYREVERSE_SCRIPT_WORKING_DIRECTORY)),)
	$(warning pyreverse.sh not found in dsp-tools repository! There will be missing images in the dsp-tools documentation!)
else
	@echo "Generating dot files with $(PYREVERSE_SCRIPT_WORKING_DIRECTORY)"
	@chmod +x $(PYREVERSE_SCRIPT)
	@cd dsp/dsp-tools && bash ./$(PYREVERSE_SCRIPT_WORKING_DIRECTORY) > /dev/null
endif

.PHONY: graphvizfigures
graphvizfigures: $(PNG_FIGURES) ## to generate images from dot files

%.dot.png: %.dot
	dot -Tpng $< -o $@

.PHONY: help
help: ## this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

.DEFAULT_GOAL := help
