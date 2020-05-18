# DSP-UI library

## User Interface library for DSP-API

DSP-UI library is published on [npmJS](https://www.npmjs.com/package/@dasch-swiss/dsp-ui). DSP-UI contains 4 modules: core, viewer, search and action.

The modules help create a GUI to allow the user to use [DSP-API](https://docs.dasch.swiss/developers/knora/api-reference/) in a quick and simple way from within a web application. The modules are written in Typescript for use with [Angular](https://angular.io) (version 9). We decided to style components and directives with [Angular Material design](https://material.angular.io).

DSP-UI-LIB implements [DSP-JS-LIB](https://www.npmjs.com/package/@knora/api) to connect with [DSP-API](https://docs.dasch.swiss/developers/knora/api-reference/). DSP-API is a software framework for storing, sharing, and working with primary sources and data in the humanities.

## Library modules

### [DspActionModule](/developers/dsp-ui/documentation/action/index-action)
*Special pipes and buttons*
> The action module contains special pipes to sort lists or to get the index key in arrays, but also directives for images, sort buttons and s.o.

### [DspCoreModule](/developers/dsp-ui/documentation/core/index-core)
*Services for API requests*
> The core module contains all services to use Knora's RESTful webapi V2 and Admin, as well as a JsonLD converter and an ontology cache service.

### [DspSearchModule](/developers/dsp-ui/documentation/search/index-search)
*Full search panel*
> The search module allows to make full text or extended searches in Knora. Filter by resource class and its properties related to an ontology.

### [DspViewerModule](/developers/dsp-ui/documentation/viewer/index-viewer)
*Resources, Properties, Lists*
> The viewer module contains object components to show a resource class representation, the property gui-elements and various view frameworks.

### [@knora/authentication (obsolete)](/developers/dsp-ui/documentation/index-authentication)
*Login, Logout, Session*
> The authentication module contains the login form, a logout button and it offers a session service, but also an authentication guard.

* * *

## Contribute to develop DSP-UI modules

If you want to contribute to develop DSP-UI modules with us, please consult the [contribution guideline](/developers/dsp-ui/contribution/).

* * *

DSP-API and DSP-UI-LIB are [free software](http://www.gnu.org/philosophy/free-sw.en.html), released under [GNU Affero General Public](http://www.gnu.org/licenses/agpl-3.0.en.html) license.

It is developed by the design team of the [Data and Service Center for the Humanities DaSCH](http://dasch.swiss) at the [University of Basel](http://unibas.ch).
