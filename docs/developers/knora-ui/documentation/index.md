# Knora ui modules

## User Interface Modules for Knora

The Knora ui modules are published on [npmJS](https://www.npmjs.com/~knora).

The modules helps to create a graphical user interface, a web application to use [Knora](https://www.knora.org) in a quick and simple way. The modules are written in typescript to use them with [Angular](https://angular.io) (version 8). We decided to style the components and directives with [material design](https://material.angular.io).

But you can use only [@knora/core]() which contains almost all services for the Knora web API. Knora is a software framework for storing, sharing, and working with primary sources and data in the humanities.

## Already published modules

### @knora/core
*Services for API requests*
> The core module contains every service to use Knora\'s RESTful webapi /v2 and /admin. Therefore a JsonLD converter and an ontology cache service.

### @knora/authentication
*Login, Logout, Session*
> The authentication module contains the login form, a logout button and it offers a session service, but also an authentication guard.

### @knora/search
*Complete search panel*
> Search module allows to make fulltext or extended searches in Knora. Filter by resource class and its properties related to an ontology.

### @knora/viewer
*Resources, Properties, Lists*
> The viewer module contains object components to show a resource class representation, the property gui-elements and various view frameworks.

### @knora/action
*Special pipes and buttons*
> The action module contains special pipes to sort lists or to get the index key in arrays, but also directives for images, sort buttons and s.o.

***

Knora and the Knora ui modules is [free software](http://www.gnu.org/philosophy/free-sw.en.html), released under the [GNU Affero General Public License](http://www.gnu.org/licenses/agpl-3.0.en.html).

It is developed by the design team of the [Data and Service Center for the Humanities DaSCH](http://dasch.swiss) at the [University of Basel](http://unibas.ch).
