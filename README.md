# DaSCH Service Platform Documentation

This is the main documentation for all services the Data and Service Center for the Humanities DaSCH develops and supports. It includes the main frameworks:

- [DSP-API](https://github.com/dasch-swiss/dsp-api)
- [DSP-APP](https://github.com/dasch-swiss/dsp-app)

As well the tools in between:

- [Sipi](https://github.com/dasch-swiss/Sipi)
- [DSP-JS](https://github.com/dasch-swiss/dsp-js-lib)
- [DSP-UI](https://github.com/dasch-swiss/dsp-ui-lib)

You'll find the documentaion on [docs.dasch.swiss](https://docs.dasch.swiss).

## Contribute

If you have to contribute and you want to add or edit entries, please read the following information about file structure and developing carefully.

### File structure

The DSP-API and the DSP-APP have their own documentation in their repositories itself.
They are integrated into this documentation with [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules) and
the [mkdocs-monorepo-plugin](https://github.com/backstage/mkdocs-monorepo-plugin).

Those two documentations are stored as git submodules in the `/dsp` folder. Please do not change anything there. They have to be updated in their own repositories. 
To grab the latest version of them run `make update-docs`.

The basics and the general DSP developers guide are stored in the `/docs` folder.

1. **Developers** contains all information for people who wants to contribute to one of the DSP tools or to help improving one of the software mentioned above.
    - Getting Started = Information about local installation and how to setup a local DSP environment
    - Introduction = General information about the DSP software
    - RDF = all about the resource description framework, which is main part of the data management
    - Contribution = All about the tools we are using for version control and releasing

1. **Community** almost links to other services and support pages
      - FAQ = List of questions and answers (NOT YET IMPLEMENTED)
      - Product Updates = List of release notes
      - About us = all about the DaSCH and the DaSCH developers

Images like screenshots and so on has to be stored in `/docs/assets/images`.

## Developers

The documentation is based on [MkDocs](https://www.mkdocs.org).

To run the documentation locally you'll need [Python](https://www.python.org/) installed, as well as the Python package manager, [pip](http://pip.readthedocs.io/en/stable/installing/). You can check if you have these already installed from the command line:

```shell
python --version
Python 3.9.5
$ pip --version
pip 21.1.1
```

MkDocs supports Python versions 2.7, 3.4, 3.5, 3.6, 3.7 and [pypy](https://pypy.org).

### Installing dependencies

Install the required packages by running

```shell
make install-requirements
```

### Update the submodules

Get the latest version of DSP-API or DSP-APP documentation by running

```shell
make update-docs
```

### Getting started

MkDocs comes with a built-in dev-server that lets you preview your documentation as you work on it. Make sure you're in the same directory as the mkdocs.yml configuration file, and then start the server by running the following command:

```shell
$ make serve-docs
INFO    -  Building documentation...
INFO    -  Cleaning site directory
[I 160402 15:50:43 server:271] Serving on http://127.0.0.1:8000
[I 160402 15:50:43 handlers:58] Start watching changes
[I 160402 15:50:43 handlers:60] Start detecting changes
```

Open up http://127.0.0.1:8000/ in your browser, and you'll see the documentation start page being.

In case you need to clean the project directory, run:

```shell
make clean
```

To get some help about the `make` commands, run:

```shell
make help
```

### Building the documentation

To build the documentation just run

```shell
make build-docs
```

### Deploying github page

On each push into `main` branch, a Github actions script will build and deploy the documentation on [docs.dasch.swiss](https://docs.dasch.swiss).

Be aware that you have to review the built site before pushing it to `main` branch! Please create an own branch for any changes and review it before merging!
