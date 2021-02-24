<!---
Copyright © 2015-2021 the contributors (see Contributors.md).

This file is part of Knora.

Knora is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Knora is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public
License along with Knora.  If not, see <http://www.gnu.org/licenses/>.
-->

# Getting Lists

## Getting a complete List

In order to request a complete list, make a HTTP GET request to the `lists` route appending the Iri of the list's root node (URL-encoded):

```
HTTP GET to http://host/v2/lists/listRootNodeIri
```

Lists are only returned in the complex schema. The response to a list request is a `List` (see interface `List` in module `ListResponse`). 


## Getting a single Node

In order to request a single node of a list, make a HTTP GET request to the `node` route appending the node's Iri (URL-encoded):

```
HTTP GET to http://host/v2/node/nodeIri
```

Nodes are only returned in the complex schema.  The response to a node request is a `ListNode` (see interface `List` in module `ListResponse`).