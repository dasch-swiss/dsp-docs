# Knora-UI coding rules

In general, please follow the style guide of Angular &rarr; [https://angular.io/guide/styleguide](https://angular.io/guide/styleguide).

## Naming

- Component selector: Use the prefix kui for any classes (e.g. kui-sort-button)
- Pipe: (Shortname)Pipe
- Directive: (Shortname)Directive
- Component: (Shortname)Component
- Service: (Shortname)Service

Shortname = explicit name with short length

## Annotate each methods in the file component.ts

- JSdoc annotation block

## Component

- Private variable must start with “_” + lowercase first letter (e.g. private _myVariable)
- Injection in the constructor must start with “_” + lowercase first letter (e.g. _resourceService)
- A method name must start with a lowercase letter, no specific character (e.g. getOneResource())

- @Input(), @Output(), @ViewChild must be declared at the top of the class, before the declaration of any other variables
- Specific methods must be declared after lifecycle hook methods (ngOnInit, etc. > getOneResource())
