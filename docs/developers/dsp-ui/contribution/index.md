# Contribute to develop DSP-UI modules

## Developers note

### Prerequisites

We develop DSP-UI-LIB modules using Angular 9, with heavy reliance on Angular-cli, which requires the following tools:

#### Node.js

Angular requires a [current, active LTS, or maintenance LTS](https://nodejs.org/about/releases/) version of Node.js. We recommend installing [Node version 12.x](https://nodejs.org/download/release/latest-v12.x/).

On MacOs, install node with [Homebrew](https://brew.sh).
For other platforms, please visit the [Node.js download page](https://nodejs.org/en/download/).

```bash
brew install node@12
```

_Developer hint: To switch between various node versions, we recommand to use [n &mdash; Node.js versions manager](https://www.npmjs.com/package/n)._

To install it, run:

```bash
npm install -g n
```

and switch to the desired node version, e.g. 12.16.2 with `n v12.16.2`

#### NPM package manager

We use [npm](https://docs.npmjs.com/cli/install) instead of yarn, which is installed with Node.js by default.

To check that you have the npm client installed, run `npm -v`.

### First steps

Install the node packages with:

```bash
npm install
```

and build the library with:

```bash
npm run build-lib
```

### Develop

If you want to add more components, services and so on to a module of the library, you can do it with:

```bash
ng generate component [path/in/the/module/][name-of-component] --project @dasch-swiss/dsp-ui
```

For example:

```bash
ng generate component core/test --project @dasch-swiss/dsp-ui
```

will create a component-folder called `test` inside of `projects/dsp-ui/src/lib/core/` with four files:

- `test.component.scss`
- `test.component.html`
- `test.component.spec.ts`
- `test.component.ts`

The main component file should look as follows:

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsp-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
```

Before testing the new component inside of the demo app, you have to rebuild after each change:

```bash
npm run build-lib
```

### Run the demo app

Run the app with the command line: `npm run start`.

The demo app runs on <http://0.0.0.0:4200>.

Documentation can be found on [DSP-UI-LIB Github page](https://dasch-swiss.github.io/knora-ui).

### Run the application in productive mode

To simulate a production environment, the application should be built with optimization and served locally
(not in dev mode, but from a local web server).

- Install `nginx` on your system, e.g. `brew install nginx` for mac OS. Check the [documentation](https://linux.die.net/man/8/nginx) for more information.
- Create a configuration file for the test application.
    The example defines a configuration file `/usr/local/etc/nginx/servers/dspuiapp.conf` for macOS.
    Substitute `$abs_path_to_lib` with the actual absolute path on your system pointing to the project root.
    Substitute `$dsp-ui_folder_name` with the folder name of the app build in `dist`.

```nginx
    server {
            listen 8090;
            server_name dspuiapp.local;
            root /$abs_path_to_lib/dist/$dsp-ui_folder_name;

            location / {
                        try_files $uri $uri/ /index.html;
            }

        access_log /usr/local/etc/nginx/logs/dspuiapp.local.access.log;
    }
```

- Add an entry to your `/etc/hosts`: `127.0.0.1 dspuiapp.local`
- Create an empty file `dspuiapp.local.access.log` in `/usr/local/etc/nginx/logs`
    (you might have to create the folder `logs` first)
- Start `nginx` (if `nginx` is already running, stop it first: `nginx`: `nginx -s stop`)
- Build the library: `npm run build-lib`
- Build the test app with optimization: `npm run build-app`
- Access it via <http://dspuiapp.local:8090>

***

## DSP-UI coding rules

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
