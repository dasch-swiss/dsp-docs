# DaSCH Service Platform Documentation

This is the main documentation for all services the Data and Service Center for the Humanities DaSCH develops and 
supports. It includes three main components:

- [DSP-API](https://github.com/dasch-swiss/dsp-api)
- [DSP-APP](https://github.com/dasch-swiss/dsp-app)
- [DSP-TOOLS](https://github.com/dasch-swiss/dsp-tools)

You'll find the documentation on [docs.dasch.swiss](https://docs.dasch.swiss).

## Contribute

If you have to contribute, and you want to add or edit entries, please read the following information about file 
structure and developing carefully.

### File structure

DSP-API, DSP-APP, and DSP-TOOLS have their own documentation in their repositories itself.
They are integrated into this documentation with [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules) and
the [mkdocs-monorepo-plugin](https://github.com/backstage/mkdocs-monorepo-plugin).

Those three documentations are stored as git submodules in the `/dsp` folder. Please do not change anything there. 
They have to be updated in their own repositories. To grab the latest version of them run `make update-docs`.

The basics and the general DSP developers guide are stored in the `/docs` folder.

1. **Developers** contains all information for people who want to contribute to one of the DSP components or to help improving one of the software mentioned above.
    - Getting Started = Information about local installation and how to set up a local DSP environment
    - Introduction = General information about the DSP software
    - RDF = all about the resource description framework, which is main part of the data management
    - Contribution = All about the tools we are using for version control and releasing


Images like screenshots and so on have to be stored in `/docs/assets/images`.

## Developers

The documentation is based on [MkDocs](https://www.mkdocs.org).

**Python**

To run the documentation locally you'll need [Python](https://www.python.org/) installed, as well as the Python package 
manager, [pip](http://pip.readthedocs.io/en/stable/installing/). You can check if you have these already installed from 
the command line:

```shell
python --version
Python 3.9.5
$ pip --version
pip 21.1.1
```

MkDocs supports Python versions 2.7, 3.4, 3.5, 3.6, 3.7 and [pypy](https://pypy.org).

**Graphviz**

Install Graphviz (Graph visualization software) to work with `.dot` file:

```shell
brew install graphviz
```

### Installing dependencies

Install the required packages by running

```shell
make install-requirements
```

### Initializing submodules

This step is required to be performed if you work with `dsp-docs` repository for the first time, just run:

```shell
make init-submodules
```

### Update the submodules

Get the latest version of DSP-API, DSP-APP and DSP-TOOLS documentation by running

```shell
make update-submodules
```

### Getting started

MkDocs comes with a built-in dev-server that lets you preview your documentation as you work on it. Make sure you're in 
the same directory as the `mkdocs.yml` configuration file, and then start the server by running the following command:

```shell
make serve
```

Open up <http://127.0.0.1:8000/> in your browser, and you'll see the documentation start page being.

In case you need to clean the project directory, run:

```shell
make clean
```

To get help about the `make` commands, run:

```shell
make help
```

### Building the documentation

To build the documentation just run:

```shell
make build
```

In some cases, the submodules have changed (depending on the defined version in `release.mk` file). In this case run 
`git update-submodules` first.

### Deploying GitHub page

Deploying the documentation to the GitHub pages has to be done manually. 

Make sure that the `release.mk` file is up-to-date with the corresponding versions, and you are in the main branch. 
Then run the following command:

```shell
make deploy
```

It updates the submodules and pushes the documentation to the gh-pages branch.
