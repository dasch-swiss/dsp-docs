# Knora-ui VIEWER module

[![npm (scoped)](https://img.shields.io/npm/v/@knora/viewer.svg)](https://www.npmjs.com/package/@knora/viewer)

The viewer module contains object components to show the resource class representations from Knora, the gui-elements for the property values and different kind of view frameworks.

**ATTENTION: Knora-ui viewer is under development!**

## Prerequisites

For help getting started with a new Angular app, check out the [Angular CLI](https://cli.angular.io/).

For existing apps, follow these steps to begin using Knora-ui viewer.

## Install

You can use either the npm or yarn command-line tool to install packages. Use whichever is appropriate for your project in the examples below.

### Yarn

`$ yarn add @knora/viewer`

### NPM

`$ npm install --save @knora/viewer`

### Dependencies

This module has the following package dependencies, which you also have to install.

-   @angular/common@8.0.3
-   @angular/core@8.0.3
-   @angular/animations@8.0.3
-   @angular/cdk@8.1.4
-   @angular/material@8.1.4
-   @angular/flex-layout@8.0.0-beta.27
-   @knora/action@9.4.1
-   @knora/core@9.4.1

### Required version of Knora: 9.0.0

## Setup

Import the viewer module in your app.module.ts and add it to the NgModules's imports:

```typescript
import { AppComponent } from './app.component';
import { KuiViewerModule } from '@knora/viewer';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        KuiViewerModule
    ],
    providers: [ ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```
