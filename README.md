# DaSCH Service Platform Documentation

This repository is the source from which the DSP documentation
on [docs.dasch.swiss](https://docs.dasch.swiss) is generated.
It includes three main components:

- [DSP-API](https://github.com/dasch-swiss/dsp-api)
- [DSP-APP](https://github.com/dasch-swiss/dsp-das)
- [DSP-TOOLS](https://github.com/dasch-swiss/dsp-tools)

If you want to contribute, please read the following information carefully.

## File structure

DSP-API, DSP-APP, and DSP-TOOLS have their own documentation in their repositories itself.
They are integrated into this documentation with [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules) and
the [mkdocs-monorepo-plugin](https://github.com/backstage/mkdocs-monorepo-plugin).

Those three documentations are stored as git submodules in the `/dsp` folder. Please do not change anything there.
They have to be updated in their own repositories. To grab the latest version of them run `make update-docs`.

In addition to those embedded contents, there are contents that live in this repository.
They are stored in the `/docs` folder:

- main landing page
- general DSP developers guide, with basics about DSP and how to contribute to the DSP software

Images like screenshots and so on have to be stored in `/docs/assets/images`.

## How to build the documentation from source

In order to build the documentation from source,
you need to install the following prerequisites:

### XCode command line tools

Some Terminal commands used for the instructions below are not shipped with macOS by default.
They must be installed separately.
Install the XCode command line tools (not to be confused with the entire XCode application) as follows:

```bash
xcode-select --install
```

You will be asked in a prompt if you want to install the command line developer tools. Click "Install".

### Homebrew

[Homebrew](https://brew.sh) is a package manager that allows us to install other software.
Install it with

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Python

The documentation is built with [MkDocs](https://www.mkdocs.org),
which requires [Python](https://www.python.org/).
You can check if you have it already installed with:

```shell
python --version
```

If this command doesn't output a version number, then run

```bash
brew install python
```

### Graphviz

Install Graphviz (Graph visualization software) to work with `.dot` files:

```shell
brew install graphviz
```

### Clone this repository and initialize the submodules

Clone this repository from GitHub with

```shell
git clone https://github.com/dasch-swiss/dsp-docs.git
cd dsp-docs
make init-submodules
```

### Update the submodules

If you have been away for a while, you might want to update the submodules
to get the latest version of DSP-API, DSP-APP and DSP-TOOLS documentation.
Make sure you are inside the dsp-docs repository, then run:

```shell
make update-submodules
```

### Install Python packages in a virtual environment

Make sure you are inside the dsp-docs repository, then create a new virtual environment:

```shell
python3 -m venv .venv
source .venv/bin/activate
```

The virtual environment is now active,
as can be seen from the `(.venv)` at the beginning of the command line.
Install the required python packages by running

```shell
make install-requirements
```

### Getting started

MkDocs comes with a built-in dev-server that lets you preview your documentation as you work on it.
Make sure you're in the same directory as the `mkdocs.yml` configuration file,
and then start the server by running the following command:

```shell
make serve
```

Open up <http://127.0.0.1:8000/> in your browser, and you'll see the documentation landing page.

### Building the documentation

To build the documentation just run:

```shell
make build
```

In some cases, the submodules have changed (depending on the defined version in `release.mk` file).
In this case run `git update-submodules` first.

### Deploying GitHub page

Deploying the documentation to [docs.dasch.swiss](https://docs.dasch.swiss/) has to be done manually.

Make sure that the `release.mk` file is up-to-date with the corresponding versions, and that you are in the main branch.
Then run the following command:

```shell
make deploy
```

This updates the submodules and pushes the documentation to the gh-pages branch.

### Help for the `make` commands

To get help for the `make` commands, run:

```shell
make help
```
