# Graphviz diagrams to be converted to PNG
DOT_FIGURES = $(shell find ./ -type f -name '*.dot')
PNG_FIGURES = $(patsubst %.dot,%.dot.png,$(DOT_FIGURES))

.PHONY: init-submodules
init-submodules: ## init the documentation from each connected repo
	git submodule update --init --remote --recursive
	
.PHONY: update-submodules
update-submodules: ## grab latest documentation from each connected repo
	git submodule update --remote --recursive
	
.PHONY: build-docs
build-docs: ## build docs into the local 'site' folder
	@$(MAKE) graphvizfigures
	mkdocs build

.PHONY: serve-docs
serve-docs: ## serve docs for local viewing
	@$(MAKE) graphvizfigures
	mkdocs serve

.PHONY: publish-docs
publish-docs: ## build and publish docs to Github Pages
	@$(MAKE) graphvizfigures
	mkdocs gh-deploy

.PHONY: install-requirements
install-requirements: ## install requirements
	pip3 install -r requirements.txt

.PHONY: clean
clean: ## cleans the project directory
	@rm -rf site/

.PHONY: graphvizfigures
graphvizfigures: $(PNG_FIGURES) ## to generate images from dot files

%.dot.png: %.dot
	dot -Tpng $< -o $@

.PHONY: help
help: ## this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

.DEFAULT_GOAL := help
