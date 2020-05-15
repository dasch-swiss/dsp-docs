# Knora-ui SEARCH module

[![npm (scoped)](https://img.shields.io/npm/v/@knora/search.svg)](https://www.npmjs.com/package/@knora/search)

Search module allows to make simple searches or extended searches in Knora. In extended search, resource class and its properties related to one specific ontology are selected to create your query. It is also possible to write Gravsearch queries to target specific data with the expert search form. 

## Prerequisites

For help getting started with a new Angular app, check out the [Angular CLI](https://cli.angular.io/).

For existing apps, follow these steps to begin using Knora-ui search.

## Install

You can use either the npm or yarn command-line tool to install packages. Use whichever is appropriate for your project in the examples below.

### Yarn

`$ yarn add @knora/search`

### NPM

`$ npm install --save @knora/search`

### Dependencies

This module has the following package dependencies, which you also have to install.

- @angular/common@8.0.3
- @angular/core@8.0.3
- @knora/action@9.4.1
- @knora/core@9.4.1
- @knora/viewer@9.4.1
- jdnconvertiblecalendardateadapter@0.0.7

### Required version of Knora: 9.0.0

## Components

This module contains various components to search. The main component is the kui-search-panel, which contains the kui-fulltext-search, kui-extended-search and kui-expert-search. All of them can be used standalone or in combination in kui-search-panel.

### [Search panel](/developers/knora-ui/documentation/search/search-panel)
Fully customizable panel. You can set the following parameters in kui-search-panel:

- route: string; url-route for search results
- filterbyproject: string; project iri to limit search results by project
- projectfilter: boolean; selection of all projects to filter by one of them
- advanced: boolean; additional menu with advanced / extended search
- expert: boolean;  additional menu with expert search / gravsearch "editor"

If everything is set to false or undefined the search-panel is a simple full-text search. [Read more](modules/search/search-panel)

### [Full-text search (Deprecated)](/developers/knora-ui/documentation/search/fulltext-search)

`<kui-fulltext-search [route]="/search-results"></kui-fulltext-search>`

The parameter `route` defines the route where the search-results-component of the app is defined.

We suggest to define a route for the search-results in the app.routing

```typescript
        path: 'search',
        component: SearchComponent,         // --> Component with the search panel
        children: [
            {
                path: ':mode/:q/:project',
                component: SearchResultsComponent       // --> search results, in case of paramter filterByProject and/or projectFilter
            },
            {
                path: ':mode/:q',
                component: SearchResultsComponent
            }
        ]
```

### [Extended / advanced search](/developers/knora-ui/documentation/search/extended-search)

Generic search filter tool to limit search results to ontology and resource class and / or properties. [Read more](modules/search/extended-search)

If you want to use this search, you have to add the following css style to you main app stylesheet to style the date picker properly.

```css
.mat-datepicker-content {
  .mat-calendar {
    height: auto !important;
  }
}
```

### [Expert search](/developers/knora-ui/documentation/search/expert-search)

Expert search is a textarea input field in which you can create Gravsearch queries.
The expert search can be more powerful than the advanced search, but requires knowing how to use the query language Gravsearch (based on SparQL and developed by the DaSCH team). With Gravsearch, expert users can build searches by combining text-related criteria with any other criteria.

Check the [Gravsearch learning guide](https://docs.knora.org/paradox/03-apis/api-v2/query-language.html) on Knora documentation.

## Setup

Import the search module in your app.module.ts and add it to the NgModules's imports:

```typescript
import { AppComponent } from './app.component';
import { KuiSearchModule } from '@knora/search';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        KuiSearchModule
    ],
    providers: [ ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

The search components need a global styling in the app to override some material styling rules. Please update your `angular.json` file as follow:

```json
...
    "styles": [
        "src/styles.scss",
        "node_modules/@knora/search/assets/style/search.scss" // <- add this line
    ],
...
```


