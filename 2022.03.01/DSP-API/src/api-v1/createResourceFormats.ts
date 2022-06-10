/*
 * Copyright © 2021 - 2022 Swiss National Data and Service Center for the Humanities and/or DaSCH Service Platform contributors.
 * SPDX-License-Identifier: Apache-2.0
 */

import {basicMessageComponents} from "./basicMessageComponents"

/**
 * This module contains interfaces that represent requests to create a new resource
 * and the response to such a request.
 */
export module createResourceFormats {

    /**
     * Represents a property value in the response of a newly created resource.
     */
    interface resultItem {

        /**
         * The property's value
         */
        value:{
            /**
             * Text representation of the value
             */
            textval: {
                string: string;
            }

            /**
             * Set if value is of type integer value
             */
            ival: {
                integer: number;
            } | null;

            /**
             * Set if value is of type decimal value (floating point number)
             */
            dval: {
                decimal: number;
            } | null;

            /**
             * Set if value is of type date value.
             * Represents the start date.
             */
            dateval1: {
                string: string;
            } | null;

            /**
             * Set if value is of type date value.
             * Represents the end date.
             */
            dateval2: {
                string: string;
            } | null;

            /**
             * Set if value is of type date value.
             * Represents the precision of the start date.
             */
            dateprecision1: {
                string: string;
            } | null;

            /**
             * Set if value is of type date value.
             * Represents the precision of the end date.
             */
            dateprecision2: {
                string: string;
            } | null;

            /**
             * Set if value is of type date value.
             * Represents the date's calendar.
             */
            calendar: {
                string: string;
            } | null;

            /**
             * Set if value is of type interval value.
             * Represents the start of the interval.
             */
            timeval1:{
                decimal: number;
            } | null;

            /**
             * Set if value is of type interval value.
             * Represents the end of the interval.
             */
            timeval2:{
                decimal: number;
            } | null;

            /**
             * The IRI of the property type the value belongs to
             */
            property_id: {
                string: basicMessageComponents.KnoraIRI;
            }

            /**
             * The IRI of the person that created the value
             */
            person_id: {
                string: basicMessageComponents.KnoraIRI;
            }

            /**
             * The order of the value
             */
            order: {
                integer: number;
            }

            /**
             * The IRI of the resource the value belongs to.
             */
            resource_id: {
                string: basicMessageComponents.KnoraIRI;
            }
        }

        /**
         * The property value's IRI
         */
        id: basicMessageComponents.KnoraIRI;
    }

    /**
     * Represents a resource creation request without providing information about a digital representation.
     *
     * This definition describes the JSON to be sent as the HTTP body in a POST request to http://host/v1/resources
     *
     * However, this format may part of a HTTP Multipart request (in that case, do not set the content type to "application/json").
     *
     */
    export interface createResourceWithoutRepresentationRequest {

        /**
         * The IRI of the resource class the new resource belongs to.
         */
        restype_id: basicMessageComponents.KnoraIRI;

        /**
         * A map of property types to property values to be assigned to the new resource.
         * Each property type requests a specific value type. These assignments are defined in the project ontologies.
         *
         */
        properties:{
            [index:string]:Array<basicMessageComponents.richtextValue>|Array<basicMessageComponents.linkValue>|Array<basicMessageComponents.integerValue>
                |Array<basicMessageComponents.decimalValue>|Array<basicMessageComponents.booleanValue>|Array<basicMessageComponents.uriValue>
                |Array<basicMessageComponents.dateValue>|Array<basicMessageComponents.colorValue>|Array<basicMessageComponents.geometryValue>
                |Array<basicMessageComponents.hierarchicalListValue>|Array<basicMessageComponents.intervalValue>|Array<basicMessageComponents.timeValue>|Array<basicMessageComponents.geonameValue>;
        }

        /**
         * The IRI of the project the new resource belongs to.
         */
        project_id: basicMessageComponents.KnoraIRI;

        /**
         * The label describing the new resource.
         */
        label: string;

    }

    /**
     * Represents a resource creation request providing a digital representation (GUI-case).
     *
     * This definition describes the JSON to be sent as the HTTP body in a POST request to http://host/v1/resources
     */
    export interface createResourceWithRepresentationRequest extends createResourceWithoutRepresentationRequest, basicMessageComponents.createOrChangeFileValueRequest {}

    /**
     * Represents the answer to a create resource request.
     */
    export interface createResourceResponse extends basicMessageComponents.basicResponse {

        /**
         * The IRI of the new resource
         */
        res_id: basicMessageComponents.KnoraIRI;

        /**
         * A map of property types to property values
         */
        results: {
            [index:string]:Array<resultItem>
        }

    }

    /**
     * Represents a request to change a resource's label.
     *
     * This definition describes the JSON to be sent as the HTTP body in a PUT request to http://host/v1/resources/label/resourceIri
     */
    export interface changeResourceLabelRequest {

        /**
         * The new label of the resource.
         */
        label: string;
    }

    export interface changeResourceLabelResponse extends basicMessageComponents.basicResponse {

        /**
         * The IRI of the resource whose label has been changed.
         */
        res_id: basicMessageComponents.KnoraIRI;

        /**
         * The new label of the resource.
         */
        label: string;

    }
}
