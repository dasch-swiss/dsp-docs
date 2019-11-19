# Knora-ui ACTION module

[![npm (scoped)](https://img.shields.io/npm/v/@knora/action.svg)](https://www.npmjs.com/package/@knora/action)

The action module is like a tool box containing special pipes to sort lists or to get the index key in arrays, directives for images and sorting names, but also components to display progress indicator bars or customized dialog boxes for resources, etc...

## Prerequisites

For help getting started with a new Angular app, check the [Angular CLI](https://cli.angular.io/) documentation.

For existing apps, follow these steps to begin using Knora-ui action.

## Install

You can use either the npm or yarn command-line tool to install packages. Use whichever is appropriate for your project in the examples below.

### Yarn

`yarn add @knora/action`

### NPM

`npm install --save @knora/action`

### Dependencies

This module has the following package dependencies, which you also have to install.

-   @angular/common@8.0.3
-   @angular/core@8.0.3
-   @angular/animations@8.0.3
-   @angular/cdk@8.1.4
-   @angular/material@8.1.4
-   ts-md5@1.2.4
-   jdnconvertiblecalendar@0.0.5
-   jdnconvertiblecalendardateadapter@0.0.10

### Required version of Knora: 9.0.0

## Setup

 Import the action module in your app.module.ts and add it to the NgModules's imports:

```javascript
import { AppComponent } from './app.component';
import { KuiActionModule } from '@knora/action';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        KuiActionModule
    ],
    providers: [ ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

Some components need a global styling in the app to override some material styling rules. Please update your `angular.json` file as follow:

```json
...
    "styles": [
        "src/styles.scss",
        "node_modules/@knora/action/assets/style/action.scss" // <- add this line
    ],
...
```

## Components, Directives and Pipes

This module contains various components like a progress indicator, sort button and sort-by pipe, but also helper for images (in the admin interface) and existing names.
