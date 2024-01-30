# Getting started with DSP

The DaSCH Service Platform (DSP) is a bundle of software that runs on servers hosted by DaSCH.
For some purposes, it is necessary to run the DSP software stack on a local machine.

Follow the instructions on this page to install the DSP software stack on your local machine.

The basic components of DSP are:

| Component                                             | Description                                                                                    |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [DSP-API](https://github.com/dasch-swiss/dsp-api)     | The core of our software stack: the RDF database that offers an access via API                 |
| [DSP-APP](https://github.com/dasch-swiss/dsp-das)     | The web application that allows you to view and edit data in your browser                      |
| [DSP-TOOLS](https://github.com/dasch-swiss/dsp-tools) | A Python library and command line tool to upload data models and big data sets to a DSP server |

The DSP software can only be run on macOS and Linux.
Windows is not supported.

This page is divided in 2 sections:

- [Install DSP: Instructions for users](#install-dsp-instructions-for-users):  
  Researchers, data stewards, and other users can take this shortcut.
- [Install DSP: Instructions for developers](#install-dsp-instructions-for-developers):  
  Developers must install everything.



## Install DSP: Instructions for users

If you are a researcher or data steward who wants to use DSP to manage your data,
you can get started quite quickly.

DSP-TOOLS offers you a shortcut,
so you only have to install DSP-TOOLS and its prerequisites:

### XCode command line tools

Some Terminal commands used for the instructions below are not shipped with macOS by default.
They must be installed separately.
Install the XCode command line tools *(not to be confused with the entire XCode application)*
by opening a Terminal window and typing:

```bash
xcode-select --install
```

You will be asked in a prompt if you want to install the command line developer tools. Click "Install".

### Docker Desktop

DSP-API and DSP-APP are shipped as Docker containers.
Install Docker Desktop from [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/).
Make sure to use the correct chip architecture (Intel versus Apple M1 chip).

### Python

Python is the language in which DSP-TOOLS is written.
Even if there is a pre-installed version of Python on your computer,
we recommend installing it separately.
It can be downloaded from [https://www.python.org/downloads/](https://www.python.org/downloads/).

### DSP-TOOLS

With these prerequisites installed,
you are now ready to install DSP-TOOLS!

Open a Terminal window and type:

```bash
pip3 install dsp-tools
```

Before using DSP-TOOLS,
you should always execute the upgrade command:

```bash
pip3 install --upgrade dsp-tools
```

This command upgrades DSP-TOOLS to the latest version.

### DSP-API and DSP-APP: run from within DSP-TOOLS

Now that you have DSP-TOOLS installed,
you can use it to run DSP-API and DSP-APP
according to [these instructions](https://docs.dasch.swiss/latest/DSP-TOOLS/start-stack/).

### Test project *Rosetta*

Now you are ready to try out our test project *Rosetta*.
Make sure that DSP-API and DSP-APP are running,
then open a Terminal window and type:

```bash
cd ~/Desktop                                                        # go to your Desktop  
git clone https://github.com/dasch-swiss/082E-rosetta-scripts.git   # clone the repository
cd 082E-rosetta-scripts                                             # enter the repository
dsp-tools create rosetta.json                                       # create the data model
dsp-tools xmlupload rosetta.xml                                     # upload the data
```

You can then look at the data in a browser at the address [http://0.0.0.0:4200/](http://0.0.0.0:4200/).

Feel free to modify `rosetta.json` and `rosetta.xml` to your liking,
restart DSP-API,
create `rosetta.json` and upload `rosetta.xml` again,
and see how the data changes in DSP-APP.

That's it, you are ready to start working!




## Install DSP: Instructions for developers

If you want to work with the code of the DSP software,
you have to install the prerequisites used to build the code from source.

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

### Docker Desktop

DSP-API and DSP-APP are shipped as Docker containers.
Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) with

```bash
brew install --cask docker
```

### Python

[Python](https://www.python.org/downloads/) is the language in which DSP-TOOLS is written.
It is also required to build the documentation of DSP-API and DSP-APP.
Even if there is a pre-installed version of Python on your computer,
we recommend installing it separately, with

```bash
brew install python
```

### Git

All software developed by DaSCH is under [Git](https://git-scm.com/downloads) version control,
and hosted on [GitHub](https://github.com/).
Git comes with the XCode command line tools,
but we recommend installing it separately, with

```bash
brew install git
```

### OpenJDK 21

DSP-API is written in Scala, so building DSP-API from source requires Java.
The recommended way to install it is [SDK Man](https://sdkman.io/),
because SDK Man takes care of the environment variable `JAVA_HOME`.
Installing Java by other means (e.g. Homebrew) is also possible,
but requires some manual work and has caused problems in the past.

First, install SDK Man with

```bash
curl -s "https://get.sdkman.io" | bash
```

Then, pick a version to install:

```bash
sdk ls java
```

This command gives you a list of all available versions.
Scroll down with the `Arrow Down` key and copy the name of the most recent version 21 of Temurin, e.g. `21.0.1-tem`.
Then, exit the list view with `q`, and install the version you copied with

```bash
sdk install java 17.0.5-tem
```

Technical note:
SDKMAN will take care of the environment variable JAVA_HOME.
If we had installed Java with Homebrew, we would have to take care that JAVA_HOME points to the correct directory,
which might vary from machine to machine.

### sbt

DSP-API uses [sbt](https://www.scala-sbt.org/) as a build tool.
Install sbt with

```bash
brew install sbt
```

### Just

[just](https://just.systems/man/en/) is a command runner run project-specific commands.
It is used in the DSP-API repository. Install it with

```bash
brew install just
```


### Node.js, npm, and Angular

Parts of DSP-APP are written in [Angular](https://angular.io/guide/setup-local),
which requires [Node.js](https://nodejs.org/en/download/)
and its package manager [npm](https://www.npmjs.com/).

Install node.js and npm with

```bash
brew install node
```

Install Angular with

```bash
npm install -g @angular/cli
```

### DSP-API and DSP-APP: build from source

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
If you want to actively work on DSP-APP,
you should clone the [DSP-DAS repo](https://github.com/dasch-swiss/dsp-das) separately
and run it according to its own instructions.

To stop everything, type

```bash
make stack-down-delete-volumes
```

Please see the `Makefile` for other useful `make` targets.

### DSP-TOOLS and *Rosetta*

[DSP-TOOLS](https://github.com/dasch-swiss/dsp-tools) is a command line tool
used for creating complex data models and uploading big data sets.
Install it with

```bash
pip3 install dsp-tools
```

If DSP-API and DSP-APP are running on your machine,
you can try out DSP-TOOLS with our test project *Rosetta*:

```bash
git clone https://github.com/dasch-swiss/082E-rosetta-scripts.git
cd 082E-rosetta-scripts
dsp-tools create rosetta.json
dsp-tools xmlupload rosetta.xml
```

You can then look at the data in DSP-APP at [http://0.0.0.0:4200/](http://0.0.0.0:4200/).

If you want to actively work on DSP-TOOLS,
you should clone the [DSP-TOOLS repo](https://github.com/dasch-swiss/dsp-tools) separately
and run it according to its own instructions.
