# Contribute to develop Knora-ui modules

## Developers note

### Prerequisites

We develop the Knora-ui modules with Angular 8, especially with Angular-cli, which requires the following tools:

#### Yarn

We use [yarn](https://yarnpkg.com/en/) instead of npm. To install yarn on macOS:

```bash
$ brew install yarn
```

For other platforms, please go to the yarn website.

#### Node

Install [Node](https://nodejs.org/en/download/) in version 10.9.0 or later. The easiest way to install node
in the correct version is to use ['n'](https://github.com/tj/n):

```bash
$ yarn global add n
$ n v10.9.0
```

### First steps

Install the node packages with:

```bash
$ yarn install --prod=false
```

and build the libraries with:

```bash
$ yarn build-lib
```

### Develop

If you want to add more components, services and so on to a module library, you can do it with:

`$ ng generate component [path/in/your/module/][name-of-component] --project @knora/[module-name] --styleext scss`

It puts the component or the service into `lib/` directly. Otherwise you can define a path inside of `lib/`.

Before using the module inside of the app, you have to rebuild after the changes: `ng build @knora/[module-name]`.

### Run the demo app

Run the app with `ng s`. The demo app runs on <http://localhost:4200> and we use it for documentation on [Knora-ui Github page](https://dasch-swiss.github.io/knora-ui).

There's a test environment for the modules on <https://github.com/dhlab-basel/knora-ui-playground> with yalc

***

## Knora-UI coding rules

In general, please follow the style guide of Angular &rarr; [https://angular.io/guide/styleguide](https://angular.io/guide/styleguide).

### Naming

- Component selector: Use the prefix kui for any classes (e.g. kui-sort-button)
- Pipe: (Shortname)Pipe
- Directive: (Shortname)Directive
- Component: (Shortname)Component
- Service: (Shortname)Service

Shortname = explicit name with short length

### Annotate each methods in the file component.ts

- JSdoc annotation block

### Component

- Private variable must start with “_” + lowercase first letter (e.g. private _myVariable)
- Injection in the constructor must start with “_” + lowercase first letter (e.g. _resourceService)
- A method name must start with a lowercase letter, no specific character (e.g. getOneResource())

- @Input(), @Output(), @ViewChild must be declared at the top of the class, before the declaration of any other variables
- Specific methods must be declared after lifecycle hook methods (ngOnInit, etc. > getOneResource())

***

## Style guide

The general design and the style of GUI elements are defined in the [Knora-App style guide](/developers/knora-web-app/contribution/). This guideline should be followed for any new features. 
