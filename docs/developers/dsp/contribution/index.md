# How to contribute to the development of the DSP

The DSP software is developed under git version control using [GitHub](https://github.com/dasch-swiss). It includes the following main repositories:

[![Knora-API](https://img.shields.io/github/v/release/dasch-swiss/knora-api?include_prereleases&label=Knora-API)](https://github.com/dasch-swiss/knora-api)
[![DSP-JS-LIB](https://img.shields.io/github/v/release/dasch-swiss/dsp-js-lib?include_prereleases&label=DSP-JS-LIB)](https://github.com/dasch-swiss/dsp-js-lib)
[![DSP-UI-LIB](https://img.shields.io/github/v/release/dasch-swiss/dsp-ui-lib?include_prereleases&label=DSP-UI-LIB)](https://github.com/dasch-swiss/dsp-ui-lib)
[![DSP-APP](https://img.shields.io/github/v/release/dasch-swiss/dsp-app?include_prereleases&label=DSP-APP)](https://github.com/dasch-swiss/dsp-app)
[![DSP-Docs](https://img.shields.io/github/v/release/dasch-swiss/dsp-docs?include_prereleases&label=DSP-Docs)](https://github.com/dasch-swiss/dsp-docs)

In all these repositories, we follow the [GitHub flow](https://guides.github.com/introduction/flow/) recommondations:

1. [Create a branch from main](#create-branch-guidelines).
1. [Add commits](#git-commit-guidelines).
1. [Open a pull request](#pull-request-guidelines).
1. [Discuss and review your code](#code-review-guidelines).
1. Merge into `main` branch.

## Create Branch Guidelines

You will work on an own branch to resolve one issue or user story defined on [Youtrack](https://dasch.myjetbrains.com/youtrack/). Each of those issues has a DSP-number which has to be used in the branch name:

```text
wip/<DSP-nr>-<subject>
```

The prefix `wip` stands for "work in progress" followed by a "/" (slash). The second part starts with the DSP-number followed by a short subject which contains succinct description of the issue/user story. DSP-number and subject have to be written in kebab-case with "-" (hyphens).

## Git Commit Guidelines

We follow strict rules how a commit message has to look like. This leads to more readable messages that are easy to follow when looking through the project history and release notes. Since release notes are automatically generated from commits, it is important to follow the [Conventional Commit messages](https://www.conventionalcommits.org/).

### Commit Message Format

```text
<type>(<scope>): <subject>
```

#### Type

Must be one of the following:

- **fix**: represents bug fixes, and correlates to a [SemVer](https://semver.org/) **patch**.
- **feat**: represents a new feature, and correlates to a SemVer **minor**.
- **feat!**, **fix!**, **refactor!**, etc.: represents a breaking change (indicated by the `!`) and will result in a SemVer **major**.\
  ⚠ It is important that the exclamation mark is placed before the colon. For example `feat!: <subject>` or `feat(api-v2)!: <subject>`
- **refactor**: production code refactoring.
- **docs**: documentation changes.
- **style**: styles update (no production code change).
- **test**: all about tests: adding, refactoring tests (no production code change).
- **chore**: maintenance tasks (no production code change).

The first three items on this list are taken into account for the release notes and have an effect on the version number.

#### Scope (optional)

The scope could be anything specifying place of the commit change.

#### Subject

The subject contains succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter
- no dot (.) at the end

## Pull Request Guidelines

### Set title and add description

A pull request usually resolves one issue or user story defined on [Youtrack](https://dasch.myjetbrains.com/youtrack/).
Since we started to use the [release-please-action](https://github.com/marketplace/actions/release-please-action) it's very important to set the PR title in the correct way, especially because all commits added within the pull request are squashed. Otherwise PR's with bad titles won't be added to the automatically generated CHANGELOG and release notes. Thus PR title has to follow the commit message convention mentioned [above](#git-commit-guidelines), with small modifications. 

#### PR Title Format

```text
<type>(<scope>): <subject> (<DSP-no.>)
```

It's crucial to start the PR title with the `<type>` ([allowed types](#type)), followed by optional`<scope>` (in brackets and without space between type and scope). `<subject>` should be YouTrack task title or its short version. At the end of the PR title add inside the brackets `<DSP-no.>`, which represents the number of the task(s) related to the PR. Here is an example:

```text
docs(contribution): example pull request title (DSP-001)
```

The PR description should contains important informations for its reviewers. Don't copy/paste YouTrack task description here. Instead of that start the description by adding the following:

```text
Resolves <DSP-no.>
```

Github's [Autolink Setting](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/configuring-autolinks-to-reference-external-resources) will automatically generate a link to Youtrack's issue.

### Add a label (optional)

This step is optional, since it has no impact on the release process anymore. However adding at least one of the corresponding label to your PR will help quickly realize its purpose:

- **breaking**: breaking changes.
- **enhancement**: new feature.
- **bug**: a bug fix.
- **styling** update style (no production code change).
- **documentation**: changes to the documentation.
- **testing**: all about tests: adding, refactoring tests (no production code change).
- **refactor**: refactoring production code.
- **chore**: maintenance tasks (no production code change).
- **dependencies**: update a dependency package version.

### Make a draft

Please [convert the pull request to draft](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/changing-the-stage-of-a-pull-request#converting-a-pull-request-to-a-draft) as long it isn't ready for reviewing. As soon as the PR is [ready for review](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/changing-the-stage-of-a-pull-request#marking-a-pull-request-as-ready-for-review), click on the corresponding button "Ready for review".

### Branch protection rules

The main branch of each repo (it's usually the `main` branch) is protected by the following rules:

- Require pull request reviews before merging
    - At least from one reviewer
- Require status checks to pass before merging
    - Require branches to be up-to-date before merging
    - Status checks e.g. tests defined in each repository's CI

When the PR is merged, the branch will be deleted automatically.

## Code Review Guidelines

- Rewievers should pay attention to proper [PR title setting](#pr-title-format).

## General GitHub actions workflows (CI)

We use [GitHub actions](https://github.com/features/actions) to automate some processes.

### Run tests

With each push to GitHub, the tests of the repository are executed. Successfull tests are needed to merge code into repository's main branch (s. [Branch protection rules](#branch-protection-rules)).

[![Knora-API CI](https://img.shields.io/github/workflow/status/dasch-swiss/knora-api/CI?label=Knora-API%20CI)](https://github.com/dasch-swiss/knora-api/actions)
[![DSP-JS-LIB CI](https://img.shields.io/github/workflow/status/dasch-swiss/dsp-js-lib/CI?label=DSP-JS-LIB%20CI)](https://github.com/dasch-swiss/dsp-js-lib/actions)
[![DSP-UI-LIB CI](https://img.shields.io/github/workflow/status/dasch-swiss/dsp-ui-lib/CI?label=DSP-UI-LIB%20CI)](https://github.com/dasch-swiss/dsp-ui-lib/actions)
[![DSP-APP CI](https://img.shields.io/github/workflow/status/dasch-swiss/dsp-app/CI?label=DSP-APP%20CI)](https://github.com/dasch-swiss/dsp-app/actions)
[![DSP-Docs CI](https://img.shields.io/github/workflow/status/dasch-swiss/dsp-docs/Publish?label=DSP-Docs%20CI)](https://github.com/dasch-swiss/dsp-docs/actions)

### Prepare release

We use [release-please-action](https://github.com/marketplace/actions/release-please-action) to prepare the next release. This action script automates the CHANGELOG generation, the creation of GitHub releases, and version bumps. In doing so, it creates a release PR which updates itself with each push into main branch following the commit messages. It's important to use the defined rules from [above](#git-commit-guidelines) in all commits and in [PR titles](#pr-title-format).

### Create release

When we are ready to tag a release, simply merge the release PR. This will create a release on Github, builds the npm package or the docker image and publishes on the corresponding platform.

[![Knora-API Docker Image](https://img.shields.io/docker/v/daschswiss/knora-api?label=Knora-API%20Docker%20Image)](https://hub.docker.com/r/daschswiss/knora-api)
[![DSP-JS NPM Package](https://img.shields.io/npm/v/@dasch-swiss/dsp-js?label=DSP-JS%20NPM%20package)](https://www.npmjs.com/package/@dasch-swiss/dsp-js)
[![DSP-UI NPM Package](https://img.shields.io/npm/v/@dasch-swiss/dsp-ui?label=DSP-UI%20NPM%20package)](https://www.npmjs.com/package/@dasch-swiss/dsp-ui)
[![DSP-APP Docker Image](https://img.shields.io/docker/v/daschswiss/dsp-app?label=DSP-APP%20Docker%20Image)](https://hub.docker.com/r/daschswiss/dsp-app)
