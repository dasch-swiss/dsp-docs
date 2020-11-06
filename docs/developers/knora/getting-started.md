# How to install the DaSCH Service Platform (DSP)
Developing for DSP requires a full local installation of DSP. The different parts are:

1. The cloned [Knora Github repository [https://github.com/dhlab-basel/Knora]](https://github.com/dhlab-basel/Knora)
2. One of the supplied triplestores in the Knora Github repository
3. Sipi by using the [docker image](https://hub.docker.com/r/dhlabbasel/sipi/).

<br>

## Install additional software
For a successful local installation of Knora additional software has to be installed. First of all [Xcode](https://developer.apple.com/xcode/) must be installed. Xcode is an integrated developer environment of Apple for macOS. Thus, you can find Xcode in the App Store. After downloading the app, agree to the license terms and install the components.

Next, we recommend to install [Homebrew [https://brew.sh]](https://brew.sh). If you haven't installed Homebrew yet, open a terminal window and type
````
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
````
You'll then see messages explaining what you need to do to complete the installation process. If Homebrew is already installed on your computer, update it before installing further packages by typing
````
brew update
````

Then, install [Java Adoptopenjdk 11](https://adoptopenjdk.net/) following these steps:

```bash
$ brew tap AdoptOpenJDK/openjdk
$ brew cask install AdoptOpenJDK/openjdk/adoptopenjdk11
```

It is necessary to pin the version of Java to version 11. To achieve this, please add the following environment variable to your startup script (.bashrc, .zshenv, etc. - depending on the shell you're using):

```
export JAVA_HOME=`/usr/libexec/java_home -v 11`
```

Running Knora also requires [Docker](https://www.docker.com) which can be downloaded free of charge. Please follow the instructions for installing [Docker Desktop](https://www.docker.com/products/docker-desktop). It is useful if you increase the memory to 6.50 GB in docker > preferences > resources.

For a successful local installation of Knora the following additional software is necessary too:

* `git`
* `expect`
* `sbt`
* `redis`
* `Python 3`

Simply type
````
brew install git
brew install expect
brew install sbt
brew install redis
brew install python
````
to install the necessary additional software. Git is a version-control system for tracking changes in files. Expect is a tool for automating interactive applications. Sbt is a build-tool for Scala and Java projects. Redis is a data structure store needed for caching.

<br>

## Clone Knora from Github
To clone Knora from Github open a terminal window and change to the directory where you intend to install Knora. Then type
````
git clone https://github.com/dasch-swiss/knora-api.git
````
This will install the directory `Knora` with subdirectories in the chosen directory.

<br>

## Chose and install a triplestore
There are a number of triplestore implementations available, including free software as well as proprietary options. Knora is aimed to work with any standards-compliant triplestore. However, it is primarily tested with [Ontotext GraphDB [http://ontotext.com/products/graphdb/]](http://ontotext.com/products/graphdb/), a high-performance, proprietary triplestore. We recommend GraphDB Standard Edition, but GraphDB Free - which is proprietary but available free of charge - also works. Both versions need to be licensed separately from [Ontotext [http://ontotext.com]](http://ontotext.com). GraphDB-Free can be simply licensed by filling in the respective online registration from.

Depending on which GraphDB version has been licensed, some environment variables may have to be set:
#### GraphDB-Free:
Type
````
export KNORA_GDB_TYPE=graphdb-free
````
to tell Knora that you use GraphDB-Free. If you decide to use another folder than the default folder `./triplestores/graphdb/`, it is necessary to tell Knora the path to your folder:
````
export KNORA_GDB_HOME=/path/to/your/folder 
````
Copy the GraphDB license file into the folder `./triplestores/graphdb/` or into a folder of your choice and name it `graphdb.license`.

#### GraphDB-SE:
Since GraphDB-SE is our default triplestore version you only need to modify the settings if you aren't using the following default value paths:

* `./triplestores/graphdb/` for KNORA_GDB_HOME
* `./triplestores/graphdb/graphdb.license` for the license file.

If you chose other locations, you need to tell Knora the path to your folder and to the license file: 
````
export KNORA_GDB_TYPE=graphdb-se
export KNORA_GDB_LICENSE=/path/to/your/licensefile
export KNORA_GDB_HOME=/path/to/your/folder
````
Copy the GraphDB license file into the folder `./triplestores/graphdb/` or into a folder of your choice and name it `graphdb.license`. Then restart your terminal.

<br>

## Build the docker image
From inside the cloned `Knora` repository folder run
````
make stack-up
````
to compose the Docker image. This should start the complete Knora stack consisting of GraphDB, Webapi, Salsah1 and Sipi which may take some time. If everything worked properly, when typing the command
````
docker ps
````
you should see five active processes / available endpoints for your local instance: 

* `sipi` at `0.0.0.0:1024`
* `salsah1` at  `0.0.0.0:3335`
* `webapi` at `0.0.0.0:3333`
* `redis` at `0.0.0.0:6379`
* `graphdb` at `0.0.0.0:7200`

If everything worked fine, type
````
make init-db-test
````
to load some test data. Afterwards it is necessary to restart the API. Type
````
make stack-restart-api
````
Then, the test data are available to play with them. If not, try
````
make stack-down
make stack-up
````
to stop and reload everything.

You can then create your own scripts based on the knora-test scripts to create new repositories and optionally load existing Knora-compliant RDF data into them.

When you open `0.0.0.0:3335` in your Browser, you should see our Web-API start page called SALSAH.
The GraphDB workbench you can find at `0.0.0.0:7200`.

To stop everything again, type 
````
make stack-down
````