# DSP-UI library

## User Interface library for DSP-API

DSP-UI library is published on [npmJS](https://www.npmjs.com/package/@dasch-swiss/dsp-ui).DSP-UI contains 4 modules: core, viewer, search and action.

The modules help to create a graphical user interface, a web application to use [DSP-API](https://www.knora.org) in a quick and simple way. The modules are written in Typescript in order to use them with [Angular](https://angular.io) (version 9). The components and directives are styled with [Angular Material](https://material.angular.io).

However, you can start only with [@knora/core](/developers/knora-ui/documentation/core/index-core) which contains the basic elements to build and connect your application to the Knora web API. Knora is a software framework for storing, sharing, and working with primary sources and data in the humanities.

## Published modules

### [@knora/action](/developers/knora-ui/documentation/action/index-action)
*Special pipes and buttons*
> The action module contains special pipes to sort lists or to get the index key in arrays, but also directives for images, sort buttons and s.o.

### [@knora/authentication (deprecated)](/developers/knora-ui/documentation/index-authentication)
*Login, Logout, Session*
> The authentication module contains the login form, a logout button and it offers a session service, but also an authentication guard.

### [@knora/core](/developers/knora-ui/documentation/core/index-core)
*Services for API requests*
> The core module contains all services to use Knora's RESTful webapi V2 and Admin, as well as a JsonLD converter and an ontology cache service.

### [@knora/search](/developers/knora-ui/documentation/search/index-search)
*Full search panel*
> The search module allows to make full text or extended searches in Knora. Filter by resource class and its properties related to an ontology.

### [@knora/viewer](/developers/knora-ui/documentation/viewer/index-viewer)
*Resources, Properties, Lists*
> The viewer module contains object components to show a resource class representation, the property gui-elements and various view frameworks.

* * *

## Contribute to develop Knora-ui modules

If you want to contribute to develop Knora-ui modules with us, please consult the [contribution guideline](/developers/knora-ui/contribution/).

* * *

Knora and the Knora ui modules is [free software](http://www.gnu.org/philosophy/free-sw.en.html), released under the [GNU Affero General Public License](http://www.gnu.org/licenses/agpl-3.0.en.html).

It is developed by the design team of the [Data and Service Center for the Humanities DaSCH](http://dasch.swiss) at the [University of Basel](http://unibas.ch).
