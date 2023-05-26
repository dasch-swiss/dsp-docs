# Getting started with DSP

The DaSCH Service Platform (DSP) is a bundle of software that runs on servers hosted by DaSCH.
For certain purposes, it is necessary to run the DSP software stack on a local machine.

Follow the instructions on this page to install the DSP software stack on your local machine.

The basic components of DSP are:

| Component | Description                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------- |
| DSP-API   | The core of our software stack, the RDF database that offers an access via API                 |
| DSP-APP   | The web application that allows you to view and edit data in your browser                      |
| DSP-TOOLS | A Python library and command line tool to upload data models and big data sets to a DSP server |

The DSP software can only be run on macOS and Linux.
Unfortunately, Windows is not supported.

This page is divided in 2 sections:

- Researchers, data stewards, and other users can take the shortcut described in the
  [first paragraph](#install-dsp-instructions-for-users)
- Developers must install everything, which is described in the
  [second paragraph](#install-dsp-instructions-for-developers)

## Install DSP: Instructions for users

Researchers and data stewards who want to use DSP to manage their data can get started quite quickly.
In order to run DSP-TOOLS on your computer, it is enough if you install the following software:

### XCode command line tools

Some Terminal commands used for the instructions below are not shipped with macOS by default.
They must be installed separately.
Install the XCode command line tools (not to be confused with the entire XCode application) as follows:
Open a Terminal window and type

```bash
xcode-select --install
```

### Docker Desktop

DSP-API and DSP-APP are shipped as Docker containers.
Install Docker Desktop from [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/).
Make sure to use the correct chip architecture (Intel versus Apple M1 chip).

You will be asked in a prompt if you want to install the command line developer tools. Click "Install".

### Python

DSP-TOOLS is written in [Python](https://www.python.org/downloads/).
Python comes with the XCode command line tools, but we recommend installing it separately.
It can be downloaded from [https://www.python.org/downloads/](https://www.python.org/downloads/).

### DSP-TOOLS

DSP-TOOLS is installed via Terminal: Open a Terminal window and type

```bash
pip3 install dsp-tools
```

### DSP-API and DSP-APP

Follow [these instructions](https://docs.dasch.swiss/2023.05.02/DSP-TOOLS/start-stack/)
to start up DSP-API and DSP-APP.

### Try out our test project "rosetta"

After this, you might want to check out our test project "rosetta":

```bash
git clone https://github.com/dasch-swiss/082E-rosetta-scripts.git
cd 082E-rosetta-scripts
dsp-tools create rosetta.json
dsp-tools xmlupload rosetta.xml
```

You can then look at the data in DSP-APP at [http://0.0.0.0:4200/](http://0.0.0.0:4200/).

From time to time, you have to upgrade DSP-TOOLS to the latest version. This is done with

```bash
pip3 install -upgrade dsp-tools
```

That's it, already!

## Install DSP: Instructions for developers

If you want to contribute to the development of DSP, you have to install a few more dependencies.

### XCode command line tools

Some Terminal commands used for the instructions below are not shipped with macOS by default.
They must be installed separately.
Install the XCode command line tools (not to be confused with the entire XCode application) as follows:

```bash
xcode-select --install
```

### Docker Desktop

DSP-API and DSP-APP are shipped as Docker containers.
[Docker Desktop](https://www.docker.com/products/docker-desktop/) can be installed with

```bash
brew install -cask docker
```

### Python

DSP-TOOLS is written in [Python](https://www.python.org/downloads/),
and the documentation of DSP-API and DSP-APP is built with Python's [MkDocs](https://www.mkdocs.org/).
Python comes with the XCode command line tools, but we recommend installing it separately, with

```bash
brew install python
```

You will be asked in a prompt if you want to install the command line developer tools. Click "Install".

### Homebrew

[Homebrew](https://brew.sh) is a package manager that allows us to install other software. It can be installed with

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Git

All software developed by DaSCH is under [Git](https://git-scm.com/downloads) version control,
and hosted on [GitHub](https://github.com/).
Git comes with the XCode command line tools, but we recommend installing it separately, with

```bash
brew install git
```

### OpenJDK 17

DSP-API is written in Scala, so building DSP-API from source requires Java.
The recommended way to install it is [SDK Man](https://sdkman.io/)),
because SDK Man takes care of the environment variable `JAVA_HOME`.
Installing Java by other means (e.g. Homebrew) is also possible, but requires some manual work and has caused problems in the past.

First, install SDK Man with

```bash
curl -s "https://get.sdkman.io" | bash
```

Then, pick a version to install:

```bash
sdk ls java
```

This command shows you a table of all available versions.
Scroll down with the `Arrow Down` key and copy the name of the most recent version 17 of Temurin, e.g. `17.0.5-tem`.
Then, exit the list view with `q`, and install the version you copied with

```bash
sdk install java 17.0.5-tem
```

### sbt

DSP-API uses [sbt](https://www.scala-sbt.org/) as a build tool.
Install sbt with

```bash
brew install sbt
```

### Node.js, npm, and Angular

Parts of DSP-APP are written in [Angular](https://angular.io/guide/setup-local),
which requires [Node.js](https://nodejs.org/en/download/)
and its package manager [npm](https://www.npmjs.com/).

Node.js and npm can be installed with

```bash
brew install node
```

Angular can be installed with

```bash
npm install -g @angular/cli
```

### yarn

DSP-APP uses [yarn](https://yarnpkg.com/getting-started/install) as a package manager.
Install yarn with

```bash
brew install yarn
```

### DSP-API and DSP-APP

Clone DSP-API from [GitHub](https://github.com/dasch-swiss/dsp-api) and build the Docker image from source:

```bash
git clone https://github.com/dasch-swiss/dsp-api.git
cd dsp-api
make init-db-test-minimal
make stack-up
```

This starts the DSP stack consisting of
Fuseki, DSP-API, SIPI, and DSP-APP.
If everything worked properly, the Dashboard in Docker Desktop should show those containers running.

Please note that the DSP-APP container that was automatically started from within the DSP-API repo is just for convenience.
If you want to work on DSP-APP,
you should clone the [DSP-DAS repo](https://github.com/dasch-swiss/dsp-das) repo separately
and start it according to its own instructions.

To stop everything again, type

```bash
make stack-down-delete-volumes
```

Please see the `Makefile` for other useful `make` targets.

### DSP-TOOLS

[DSP-TOOLS](https://github.com/dasch-swiss/dsp-tools) is a command line tool
used for creating complex data models and uploading big data sets.
Install it with

```bash
pip3 install dsp-tools
```

If DSP-API and DSP-APP are running on your machine, you can create the test project rosetta:

```bash
git clone https://github.com/dasch-swiss/082E-rosetta-scripts.git
cd 082E-rosetta-scripts
dsp-tools create rosetta.json
dsp-tools xmlupload rosetta.xml
```

You can then look at the data in DSP-APP at [http://0.0.0.0:4200/](http://0.0.0.0:4200/).

If you want to work on DSP-TOOLS,
you should clone the [DSP-TOOLS repo](https://github.com/dasch-swiss/dsp-tools) repo separately
and follow the instructions therein.
