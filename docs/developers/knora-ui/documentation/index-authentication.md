# Knora-ui AUTHENTICATION module (DEPRECATED)

<span style="color:red">**The following information stands until the version 9.4.1 of @knora/authentication.**
It will be soon replaced by the knora-api-js-lib, @knora/core and @knora/action modules. New Install and Setup instructions will be then defined!</span>

***

[![npm (scoped)](https://img.shields.io/npm/v/@knora/authentication.svg)](https://www.npmjs.com/package/@knora/authentication)

The authentication module contains the login form (for standalone usage) or a complete login- / logout-button environment incl. the login form.

## Prerequisites

For help getting started with a new Angular app, check out the [Angular CLI](https://cli.angular.io/).

For existing apps, follow these steps to begin using Knora-ui authentication.

## Install

You can use either the npm or yarn command-line tool to install packages. Use whichever is appropriate for your project in the examples below.

### Yarn

`$ yarn add @knora/authentication`

### NPM

`$ npm install @knora/authentication`

### Dependencies

This module has the following package dependencies, which you also have to install.

-   @angular/common@8.0.3
-   @angular/core@8.0.3
-   @angular/animations@8.0.3
-   @angular/cdk@8.1.4
-   @angular/material@8.1.4
-   @knora/action@9.4.1
-   @knora/core@9.4.1
-   moment@2.22.2

### Required version of Knora: 9.0.0

## Setup

In your AppModule you have to define the following providers:

```Javascript
import { ErrorInterceptor, JwtInterceptor, KuiAuthenticationModule } from '@knora/authentication';

@NgModule({
    declarations: [
        ...
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule,
        KuiCoreModule.forRoot({
            name: 'Knora-ui Demo App',
            api: environment.api,
            media: environment.media,
            app: environment.app,
        }),
        KuiAuthenticationModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
    ]
})
export class AppModule { }
```

## Usage of KuiAuthGuard

The @knora/authentication module contains a guard class which can be used in a restricted app component and will redirect a guest user to the login page. It can be used in the app routing as follow:

```Javascript
import { AuthGuard } from '@knora/authentication';

const appRoutes: Routes = [
    {
        path: '',
        component: AppComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginFormComponent
    }
]
```

## Usage of kui-login-form

The `LoginFormComponent` in the app needs in principle only the `<kui-login-form></kui-login-form>` tag. Additional it's also possible to define e navigation route, where the user will be redirected after successful login: `<kui-login-form [navigate]="'/dashboard'"></kui-login-form>`