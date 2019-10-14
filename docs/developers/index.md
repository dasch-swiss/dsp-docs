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
$ brew tap bazelbuild/tap
$ brew install bazelbuild/tap/bazel
$ brew upgrade bazelbuild/tap/bazel
```

### Python3

To install, follow these steps:

```
$ brew install python
```
