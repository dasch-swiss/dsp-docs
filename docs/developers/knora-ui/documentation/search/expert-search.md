# Expert search (Component)

The expert search is a textarea field in which Gravsearch queries can be written 

## Parameters

Name | Type | Description
--- | --- | ---
route (optionnal) | string | Route to navigate after search. This route path should contain a component for search results.
gravsearch | string | Send the gravsearch query back.
toggleExpertSearchForm | boolean | Trigger toggle for extended search form.

## Examples

Extended search panel

```html
<!-- param gravsearch is where the gravsearch query is cached or sent to Knora -->

<kui-expert-search (gravsearch)="setGravsearch($event)"></kui-expert-search>
```