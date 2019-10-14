.PHONY: build-docs
build-docs: ## build docs into the local 'site' folder
	mkdocs build

.PHONY: serve-docs
serve-docs: ## serve docs for local viewing
	mkdocs serve

.PHONY: publish-docs
publish-docs: ## build and publish docs to Github Pages
	mkdocs gh-deploy

.PHONY: install-requirements
install-requirements: ## install requirements
	pip3 install -r requirements.txt

.PHONY: clean
clean: ## cleans the project directory
	@rm -rf site/

.PHONY: help
help: ## this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

.DEFAULT_GOAL := help
