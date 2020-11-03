# Knora-admin ontology

<br>

Knora has an admin ontology where object properties, datatype properties, classes, individuals and permission class properties necessary for project administration are modelled. 

The Knora-admin ontology is identified by the IRI `http://www.knora.org/ontology/knora-admin`. In our documents it will be identified by the prefix `knora-admin`. The prefix `kb` used here refers to the [Knora-base ontology](knora-base.md).

<br>

## Projects
In Knora each item of data belongs to some particular project. Each project using Knora must define a `knora-admin:knoraProject`, which has the following properties: 

* `projectShortname`: A short name that can be used to identify the project in configuration files and the like.
* `projectLongname`: The full name of the project.
* `projectShortcode`: A hexadecimal code that uniquely identifies the project. These codes are
assigned to projects by the [DaSCH](http://dasch.swiss/).
* `projectDescription`: A description of the project.
* `belongsToInstitution`: The `knora-admin:Institution` that the project belongs to.

Ontologies, resources and values are attached to projects by means of the `kb:attachedToProject` property. Users are associated with a project by means of the `knora-admin:isInProject` property. 

<br>

# Authorisation 

## Users and Groups
Each Knora user is represented by an object belonging to the class `knora-admin:User`, which is a subclass of `foaf:Person`, and has the properties in the following list. The numbers given in parentheses after each property are the so-called *cardinalities*. For more information on cardinalities see [here](knora-base.md#owl-cardinalities).
* `userid` (1): A unique identifier that the user must provide when logging in.
* `password` (1): A cryptographic hash of the user’s password. 
* `email` (0-n): Email addresses belonging to the user. 
* `isInProject` (0-n): Projects that the user is a member of. 
* `isInGroup` (0-n): User-created groups that the user is a member of. 
* `foaf:familyName` (1): The user’s family name. 
* `foaf:givenName` (1): The user’s given name.

Knora’s concept of access control is that an object  -a resource or value - can grant permissions to groups of users, but not to individual users. There are several built-in groups:
* `knora-admin:UnknownUser`: Any user who has not logged into Knora is automatically assigned to this group.
* `knora-admin:KnownUser`: Any user who has logged into Knora is automatically assigned to this group.
* `knora-admin:ProjectMember`: When checking a user’s permissions on an object, the user is automatically assigned to this group if she is a member of the project that the object belongs to.
* `knora-admin:Creator`: When checking a user’s permissions on an object, the user is automatically assigned to this group if he is the creator of the object.
* `knora-admin:ProjectAdmin`: When checking a user’s permissions on an object, the user is automatically assigned to this group if she is an administrator of the project that the object belongs to.
* `knora-admin:SystemAdmin`: The group of Knora system administrators.

A user-created ontology can define additional groups, which must belong to the OWL class `knora-admin:UserGroup`.

There is one built-in `knora-admin:SystemUser`, which is the creator of link values created automatically for resource references in standoff markup (see [StandoffLinkTag](knora-base.md#subclasses-of-standofftag)).

<br>

## Permissions
Each resource or value can grant certain permissions to specified user groups. These permissions are represented as the object of the predicate
`kb:hasPermissions`, which is required on every `kb:Resource` and on the current version of every `kb:Value`. The permissions attached to the current version of a value also apply to previous versions of the value. Value versions other than the current one do not have this predicate.
The following permissions can be granted:
1. **Restricted view permission (RV)**: Allows a restricted view of the object, e.g. a view of an image with a watermark.
2. **View permission (V)**: Allows an unrestricted view of the object. Having view permission on a resource only affects the user’s ability to view information about the resource other than its values. To view a value, she must have view permission on the value itself.
3. **Modify permission (M)**: For values, this permission allows a new version of a value to be created. For resources, this allows the user to create a new value (as opposed to a new version of an existing value), or to change information about the resource other than its values. When he wants to make a new version of a value, his permissions on the containing resource are not relevant. However, when he wants to change the target of a link, the old link must be deleted and a new one created, so he needs modify permission on the resource.
4. **Delete permission (D)**: Allows the item to be marked as deleted.
5. **Change rights permission (CR)**: Allows the permissions granted by the object to be changed.

Each permission in the above list implies all lower-numbered permissions. A user’s permission level on a particular object is calculated in the following way:
1. Make a list of the groups that the user belongs to, including `knora-admin:Creator` and/or `knora-admin:ProjectMember` if applicable.
2. Make a list of the permissions that she can obtain on the object, by iterating over the permissions that the object grants. For each permission, if she is in the specified group, add the specified permission to the list of permissions she can obtain.
3. From the resulting list, select the highest-level permission.
4. If the result is that she would have no permissions, give her whatever
permission `knora-admin:UnknownUser` would have.
To view a link between resources, a user needs permission to view the source and target resources. He also needs permission to view the `kb:LinkValue` representing the link, unless the link property is `kb:hasStandoffLinkTo` (see [StandoffLinkTag](knora-base.md#subclasses-of-standofftag)).

The format of the object of `kb:hasPermissions` is as follows:
* Each permission is represented by the one-letter or two-letter abbreviation given above.
* Each permission abbreviation is followed by a space, then a comma-separated list of groups that the permission is granted to.
* The IRIs of built-in groups are shortened using the `knora-admin` prefix. Multiple permissions are separated by a vertical bar (`|`).

For example, if an object grants view permission to unknown and known users, and modify permission to project members, the resulting permission literal would be:
````
V knora-admin:UnknownUser,knora-admin:KnownUser|M knora-admin:ProjectMember
````


