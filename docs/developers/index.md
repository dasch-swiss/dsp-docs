# Developer Overview

## Local Development Environment

At the DaSCH, the principal development envionment is [Apple macOS](https://www.apple.com/macos).

Each developer machine should have the following prerequisites installed:

- Docker Desktop: https://www.docker.com/products/docker-desktop
- Homebrew: https://brew.sh

### Java Adoptopenjdk 11

To install, follow these steps:

```bash
$ brew tap AdoptOpenJDK/openjdk
$ brew cask install AdoptOpenJDK/openjdk/adoptopenjdk11
```

To pin the version of Java, please add this environment variable to you startup script (bashrc, etc.):

```
export JAVA_HOME=`/usr/libexec/java_home -v 11`
```

### Bazel build tools

To install, follow these steps:

```
$ brew install bazel
$ brew upgrade bazel
```

#### Vizualize your Build

Add the following line to your ~/.bazelrc:

```
query --package_path %workspace%:[PATH TO BAZEL]/base_workspace # set the path to the bazel binary
```

Run bazel query inside your project directory, asking it to search for all dependencies
of //:main (or however the label is to your target of interest):

```
$ bazel query 'deps(//:main)' --output graph > graph.in
```

This creates a file called `graph.in`, which is a text representation of the build graph.
You can use ```dot``` (install with `brew install graphviz`) to create a png:

```
$ dot -Tpng < graph.in > graph.png
```


### Python3

To install, follow these steps:

```
$ brew install python
```
