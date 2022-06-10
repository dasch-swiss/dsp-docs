/*
 * Copyright © 2021 Data and Service Center for the Humanities and/or DaSCH Service Platform contributors.
 * SPDX-License-Identifier: Apache-2.0
 */

import {basicMessageComponents} from "./basicMessageComponents"

/**
 * This module contains interfaces that represent requests and responses for group administration
 */
export module groupFormats {

    /**
     * Represents an API request payload sent during a group creation request.
     *
     * HTTP POST request to http://host/v1/groups
     */
    export interface CreateGroupApiRequestV1 {

        /**
         * The name of the group to be created (unique).
         */
        name: string;

        /**
         * The description of the group to be created.
         */
        description?: string;

        /**
         * The project inside which the group will be created.
         */
        project: basicMessageComponents.KnoraIRI;

        /**
         * The status of the group to be created (active = true, inactive = false).
         */
        status: boolean;

        /**
         * The status of self-join of the group to be created.
         */
        selfjoin: boolean;
    }

    /**
     * Represents an API request payload sent during a group change request.
     *
     * HTTP PUT request to http://host/v1/groups/groupsIRI
     */
    export interface ChangeGroupApiRequestV1 {

        /**
         * The new group's name.
         */
        name?: string;

        /**
         * The new group's description.
         */
        description?: string;

        /**
         * The new group's status.
         */
        status?: boolean;

        /**
         * The new group's self-join status.
         */
        selfjoin?: boolean;
    }

    /**
     * Represents a response to a request for information about all groups.
     *
     * HTTP GET request to http://host/v1/groups
     */
    export interface GroupsResponseV1 {

        /**
         * Information about all existing groups.
         */
        groups: Array<GroupInfoV1>;
    }

    /**
     * Represents a response to a request for information about a single group.
     *
     * HTTP GET request to http://host/v1/groups/groupIRI
     */
    export interface GroupInfoResponseV1 {

        /**
         * All information about the group.
         */
        group_info: GroupInfoV1;
    }

    /**
     * Represents a response to a request for a list of members inside a single group.
     *
     * HTTP GET request to http://host/v1/groups/members/groupIRI
     */
    export interface GroupMembersResponseV1 {

        /**
         * The group's members.
         */
        members: basicMessageComponents.KnoraIRI;
    }

    /**
     * Represents an answer to a group creating/modifying operation.
     */
    export interface GroupOperationResponseV1 {

        /**
         * The new group info of the created/modified group.
         */
        group_info: GroupInfoV1
    }

    /**
     * Represents group information.
     */
    export interface GroupInfoV1 {
        /**
         * The IRI of the group.
         */
        id: basicMessageComponents.KnoraIRI;

        /**
         * The name of the group. Needs to be unique on project level.
         */
        name: string;

        /**
         * The description of the group.
         */
        description: string;

        /**
         * The IRI of the project this group belongs to.
         */
        project: basicMessageComponents.KnoraIRI;

        /**
         * The group's status. `false` means the group is deleted.
         */
        status: boolean;

        /**
         * The group's self-join status. 'true' means everybody can join by themselves.
         */
        selfjoin: boolean;
    }
}
