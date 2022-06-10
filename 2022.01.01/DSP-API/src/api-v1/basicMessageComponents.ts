/*
 * Copyright © 2021 Data and Service Center for the Humanities and/or DaSCH Service Platform contributors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * This module contains interfaces that are used by other modules (message components).
 * It does not represent a particular API V1 request or response format.
 */
export module basicMessageComponents {

    /**
     * Numeric code representing the result (success or failure) of an API operation.
     *
     * 0:   OK (Success)
     *
     * 1:   INVALID_REQUEST_METHOD
     *
     * 2:   CREDENTIALS_NOT_VALID
     *
     * 3:   NO_RIGHTS_FOR_OPERATION
     *
     * 4:   INTERNAL_SALSAH_ERROR
     *
     * 5:   NO_PROPERTIES
     *
     * 6:   NOT_IN_USERDATA
     *
     * 7:   RESOURCE_ID_MISSING
     *
     * 8:   UNKNOWN_VOCABULARY
     *
     * 9:   NOT_FOUND
     *
     * 10:  API_ENDPOINT_NOT_FOUND
     *
     * 11:  INVALID_REQUEST_TYPE
     *
     * 12:  PROPERTY_ID_MISSING
     *
     * 13:  NOT_YET_IMPLEMENTED
     *
     * 14:  COULD_NOT_OPEN_PROGRESS_FILE
     *
     * 15:  VALUE_ID_OR_RESTYPE_ID_MISSING
     *
     * 16:  HLIST_ALREADY_EXISTENT
     *
     * 17:  HLIST_NO_LABELS
     *
     * 18:  HLIST_NOT_EXISTING
     *
     * 19:  HLIST_NO_POSITION
     *
     * 20:  HLIST_INVALID_POSITION
     *
     * 21:  SELECTION_NO_LABELS
     *
     * 22:  SELECTION_ALREADY_EXISTENT
     *
     * 23:  SELECTION_MISSING_OR_INVALID_POSITION
     *
     * 24:  SELECTION_DELETE_FAILED
     *
     * 25:  SELECTION_NODE_ALREADY_EXISTENT
     *
     * 26:  GEONAMES_GEONAME_ID_EXISTING
     *
     * 27:  UPDATE_NOT_PERFORMED
     *
     * 28:  DUPLICATE_VALUE
     *
     * 29:  ONTOLOGY_CONSTRAINT
     *
     * 999: UNSPECIFIED_ERROR
     *
     */
    type KnoraStatusCode = integer;

    /**
     * Numeric code representing the user's rights on a Knora resource.
     *
     * 0: No rights
     *
     * 1: Restricted View Permission
     *
     * 2: View Permission
     *
     * 6: Modify Permission
     *
     * 7: Delete Permission
     *
     * 8: Change Rights Permission
     */
    export type KnoraRights = integer;

    /**
     * Obsolete
     *
     * String representing the user's permission on a resource.
     *
     * "OK": the user has sufficient permission to view the resource
     */
    export type KnoraAccess = string;

    /**
     * Basic members of the DSP-API V1 response format.
     */
    export interface basicResponse {
        /**
         * Knora status code
         */
        status:KnoraStatusCode;
    }

    /**
     * Represents a text with markup.
     */
    interface richtext {
        /**
         * The XML representing a text with markup.
         * Please note that the XML has to be stringified.
         */
        xml: String;

        /**
         * The IRI of the mapping to be used to convert the XML into a standoff representation and back.
         */
        mapping_id: KnoraIRI;

        /**
         * The optional language of the text.
         */
        language?:string;

    }

    /**
     * Represents a simple text value without markup.
     */
    interface simpletext {
        /**
         * Mere string representation
         */
        utf8str:string;

        /**
         * The optional language of the text.
         */
        language?:string;

    }

    /**
     * Represents a date value
     */
    interface date {
        /**
         * Start date in string format
         */
        dateval1:string;

        /**
         * End end in string format
         */
        dateval2:string;

        /**
         * The era of dateval1, either "CE" or "BCE".
         */
        era1:string;

        /**
         * The era of dateval2, either "CE" or "BCE".
         */
        era2:string;

        /**
         * Calendar used
         */
        calendar:string;

    }

    /**
     * Represents an interval value
     */
    interface interval {

        /**
         * Begin of the interval in seconds
         */
        timeval1: number;

        /**
         * End ofg the interval in seconds
         */
        timeval2: number;

    }
    
    /**
     * Repesents a timestamp.
     */
    interface time {
        /**
         * An xsd:dateTimeStamp.
         */
        timestamp: string;
    }

    /**
     * String must be a hexadecimal RGB color code, e.g. "#4169E1"
     */
    type color = string;

    /**
     * String must be a valid Knora IRI, e.g. "http://rdfh.ch/c5058f3a".
     */
    export type KnoraIRI = string;

    /**
     * String must have the following format: (GREGORIAN|JULIAN|ISLAMIC):YYYY[-MM[-DD]][ era][:YYYY[-MM[-DD]]][ era]
     * E.g. an exact date like GREGORIAN:2015-12-03 CE or a period like GREGORIAN:2015-12-03 CE:2015-12-04 CE.
     * Dates may also have month or year precision, e.g. GREGORIAN:2015-12 (the whole month of december) or GREGORIAN:2015 (the whole year 2015).
     */
    type dateString = string;

    /**
     * An integer number (no fractions).
     */
    type integer = number;

    /**
     * A floating point number (may have fractions).
     */
    type decimal = number;

    /**
     * A string representing a URI
     */
    type URI = string;

    /**
     * A string representing a geometrical figure on a surface (2D).
     */
    type geometry = string;

    /**
     * A Knora List Node IRI
     */
    export type KnoraListNodeIRI = KnoraIRI;

    /**
     * A geoname identifier
     */
    type geoname = string;

    /**
     * Describes a Knora Value.
     * Either a simple type or a complex represented by an interface.
     */
    export type knoraValue = integer|decimal|boolean|richtext|simpletext|interval|date|color|KnoraIRI|URI|geometry|geoname|KnoraListNodeIRI;

    interface valueBase {

        /**
         * Comment on the value.
         */
        comment?: string | null;
    }

    export interface richtextValue extends valueBase {

        /**
         * A richtext value
         */
        richtext_value: simpletext|richtext;
    }


    export interface linkValue extends valueBase {

        /**
         * A link to another Knora resource. Value must be a Knora IRI.
         */
        link_value: KnoraIRI;

    }


    export interface integerValue extends valueBase {

        /**
         * An integer value
         */
        int_value: integer;

    }


    export interface decimalValue extends valueBase {

        /**
         * A decimal value (floating point)
         */
        decimal_value: decimal;

    }

    export interface booleanValue extends valueBase {

        /**
         * A boolean value
         */
        boolean_value: boolean;

    }

    export interface uriValue extends valueBase {

        /**
         * A URI value
         */
        uri_value: URI;

    }

    export interface dateValue extends valueBase {

        /**
         * A date value.
         */
        date_value: dateString;
    }

    export interface colorValue extends valueBase {

        /**
         * A color value
         */
        color_value: color;
    }

    export interface geometryValue extends valueBase {

        /**
         * A geometry value representing a region on a 2D surface.
         */
        geom_value: geometry;
    }


    export interface hierarchicalListValue extends valueBase {

        /**
         * A list node IRI
         */
        hlist_value: KnoraListNodeIRI;

    }

    export interface intervalValue extends valueBase {

        /**
         * An interval value consisting of two time values
         */
        interval_value: Array<number>;

    }


    export interface timeValue extends valueBase {

        /**
         * A timestamp
         */
        time_value: time;

    }


    export interface geonameValue extends valueBase {

        /**
         * A geoname value
         */
        geoname_value: geoname;

    }

    /**
     * Describes a file value.
     */
    export interface createOrChangeFileValueRequest {

        /**
         * The internal filename returned by Sipi.
         */
        file: string;
    }

    /**
     * Binary representation of a resource (location)
     */
    export interface locationItem {
        /**
         * Duration of a movie or an audio file
         */
        duration:number;

        /**
         * X dimension of an image representation
         */
        nx:number;

        /**
         * Y dimension of an image representation
         */
        ny:number;

        /**
         * Path to the binary representation
         */
        path:string;

        /**
         * Frames per second (movie)
         */
        fps:number;

        /**
         * Format of the binary representation
         */
        format_name:string;

        /**
         * Original file name of the binary representation (before import to Knora)
         */
        origname:string;

        /**
         * Protocol used
         */
        protocol:protocolOptions;
    }

    /**
     * Represents how a binary representation (location) can be accessed.
     * Either locally stored (file) or referenced from an external location (url)
     */
    type protocolOptions = "file" | "url";

}
