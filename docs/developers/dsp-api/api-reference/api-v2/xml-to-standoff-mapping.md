# XML to Standoff Mapping in API v2

## General Information

Please see v1 documentation for general information about the XML to standoff mapping: [XML To Standoff Mapping in API v1](../api-v1/xml-to-standoff-mapping.md).

## Validating a Mapping and sending it to DSP-API

A mapping can be validated before sending it to DSP-API with the following
XML Schema file: `webapi/src/resources/mappingXMLToStandoff.xsd`. Any
mapping that does not conform to this XML Schema file will be rejected
by DSP-API.

The mapping has to be sent as a multipart request to the standoff route
using the path segment `mapping`:

    HTTP POST http://host/v2/mapping

The multipart request consists of two named parts:

```
"json":

  {
      "knora-api:mappingHasName": "My Mapping",
      "knora-api:attachedToProject": "projectIRI",
      "rdfs:label": "MappingNameSegment",
      "@context": {
          "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
          "knora-api": "http://api.knora.org/ontology/knora-api/v2#"
      }
  }

"xml":

  <?xml version="1.0" encoding="UTF-8"?>
  <mapping>
      ...
  </mapping>
```

A successful response returns the Iri of the mapping. However, the Iri
of a mapping is predictable: it consists of the project Iri followed by
`/mappings/` and the `knora-api:mappingHasName` submitted in the JSON-LD (if the name
already exists, the request will be rejected). Once created, a mapping
can be used to create TextValues in DSP-API. The formats are documented in
the v2 typescript interfaces `AddMappingRequest` and `AddMappingResponse`
in module `MappingFormats`
