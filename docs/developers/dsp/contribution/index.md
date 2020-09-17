# How to contribute in general

The DSP software is developed under git version control using [Github](https://github.com/dasch-swiss) and by following the [GitHub flow](https://guides.github.com/introduction/flow/):

1. Create a branch from master
1. Add commits (please follow our [Git commit guidelines](#git-commit-guidelines))
1. Open a pull request (please follow our [Pull request guidelines](#pull-request-guidelines))
1. Discuss and review your code
1. Merge

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

We use [Github actions](https://github.com/features/actions) to automate some processes. With each push to Github the tests are executed. Successfull tests are needed to merge code into repository's main branch (s. [Branch protection rules](#branch-protection-rules)).
