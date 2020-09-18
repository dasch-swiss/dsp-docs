# How to contribute in general

The DSP software is developed under git version control using [Github](https://github.com/dasch-swiss). It includes the following main repositories:

[![Knora-API](https://img.shields.io/github/v/release/dasch-swiss/knora-api?include_prereleases&label=Knora-API)](https://github.com/dasch-swiss/knora-api)
[![DSP-JS-LIB](https://img.shields.io/github/v/release/dasch-swiss/dsp-js-lib?include_prereleases&label=DSP-JS-LIB)](https://github.com/dasch-swiss/dsp-js-lib)
[![DSP-UI-LIB](https://img.shields.io/github/v/release/dasch-swiss/dsp-ui-lib?include_prereleases&label=DSP-UI-LIB)](https://github.com/dasch-swiss/dsp-ui-lib)
[![DSP-APP](https://img.shields.io/github/v/release/dasch-swiss/dsp-app?include_prereleases&label=DSP-APP)](https://github.com/dasch-swiss/dsp-app)
[![DSP-Docs](https://img.shields.io/github/v/release/dasch-swiss/dsp-docs?include_prereleases&label=DSP-Docs)](https://github.com/dasch-swiss/dsp-docs)

In all those repositories we follow the [GitHub flow](https://guides.github.com/introduction/flow/) recommondations:

1. [Create a branch from master](#create-branch-guidelines)
1. [Add commits](#git-commit-guidelines)
1. [Open a pull request](#pull-request-guidelines)
1. Discuss and review your code
1. Merge into `master` branch

## Create Branch Guidelines

You will work on an own branch to resolve one issue or user story defined on [Youtrack](https://dasch.myjetbrains.com/youtrack/). Each of those issues has a DSP-number which has to be used in the branch name:

```text
wip/<DSP-nr>-<subject>
```

The prefix `wip` stands for "work in progress" followed by a "/" (slash). The second part starts with the DSP-number followed by a short subject which contains succinct description of the issue/user story. DSP-number and subject have to be written in kebab-case with "-" (hyphens).

## Git Commit Guidelines

We follow strict rules how a commit message has to look like. This leads to more readable messages that are easy to follow when looking through the project history.

### Commit Message Format

```text
<type>(<scope>): <subject>
```

#### Type

Must be one of the following:

- **feat** New feature
- **fix** A bug fix
- **docs** Changes to the documentation
- **style** Update style; no production code change
- **refactor** Refactoring production code
- **test** All about tests: adding, refactoring tests; no production code change
- **chore** Maintenance tasks; no production code change

#### Scope (optional)

The scope could be anything specifying place of the commit change.

#### Subject

The subject contains succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter
- no dot (.) at the end

## Pull request guidelines

### Set title and add description

A pull request resolves one issue or user story defined on [Youtrack](https://dasch.myjetbrains.com/youtrack/). Each of those issues has a DSP-number which has to be used in the PR title:

```text
<DSP-nr> <title>
```

When using the DSP-number in the PR, the PR will be linked on Youtrack. To link the user story on Github's PR we strongly recommend to also add it to the description in form of a link:

```text
Resolves [<DSP-nr>](https://dasch.myjetbrains.com/youtrack/issue/<DSP-nr>)
```

Replace the `<DSP-nr>` with the real number e.g. `DSP-42`.

### Add a label

Add at least one of the corresponding labels to your PR:

- **breaking** Breaking Changes
- **enhancement** New feature
- **bug** A bug fix
- **styling** Update style; no production code change
- **documentation** Changes to the documentation
- **testing** All about tests: adding, refactoring tests; no production code change
- **refactor** Refactoring production code
- **chore** Maintenance tasks; no production code change
- **dependencies** Update a dependency package version

### Make a draft

Please convert the pull request to draft as long it is not ready for reviewing. As soon as the PR is ready for review click the corresponding button "Ready for review".

### Branch protection rules

The main branch of each repo (usual it's the `master` branch) is protected by the following rules:

- Require pull request reviews before merging
  - At least from one reviewer
- Require status checks to pass before merging
  - Require branches to be up to date before merging
  - Status checks e.g. tests defined in each repository's CI

When the PR is merged the branch will be deleted automatically.

## General Github actions workflows (CI)

We use [Github actions](https://github.com/features/actions) to automate some processes. 

### Run tests

With each push to Github the tests of the repository are executed. Successfull tests are needed to merge code into repository's main branch (s. [Branch protection rules](#branch-protection-rules)).

### Release notes

Each push into master branch &mdash; after each merge from pull request &mdash; the release notes for next release are updated. This release called "Next release" is a draft and can be used to publish [real release](#release) later.

The Github action we use for this step is [release-drafter](https://github.com/marketplace/actions/release-drafter).

> This feature is not yet implemented in all repositories. We are still testing it in [DSP-APP](https://github.com/dasch-swiss/dsp-app/releases).

### Release

To do a real release we have to publish the above mentioned [release draft](#release-nots) manually.
