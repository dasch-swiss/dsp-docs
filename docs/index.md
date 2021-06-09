# DaSCH Service Platform Documentation

Since 2017, the Data and Service Center for the Humanities (DaSCH) has been a member of the Swiss Academy of Humanities and Social Sciences. The main task of the institution is to operate a platform for humanities research data that ensures access to this data. In addition, the networking of data with other databases is to be promoted (linked open data), thus creating added value for research and the interested public.

## Services

The task of the DaSCH is to promote and support the generation, use and long-term availability of research data in the humanities in Switzerland. The focus is on making research data in the humanities available online over the long term in the most direct and easy-to-use way possible and supporting researchers in using them for further research projects ("re-use of research data"). The DaSCH operates the necessary infrastructures (a so called "keep-alive" archive) and supports researchers in using this infrastructure. In order to reach this goal, the DaSCH offers the following services:

### Long term hosting of research data

The infrastructure of the DaSCH is designed to host and keep accessible complex qualitative research data (e.g. any kind of databases and associated digital objects such as digital texts, images, movies, audio). The data has to be migrated to the infrastructure (both hardware and software) maintained by the DaSCH. All data will be held with a minimal redundancy of 6 identical copies at two geographically different locations in Switzerland (based on switchEngines) for an undefinite amount of time. Access to the data is provided by an API based on widely adopted standards (e.g. RESTful based on JSON-LD, IIIF, RDF, TEI/XML etc.) and through a generic web interface.

In order to fulfill these requirements, DaSCH develops and maintains various software tools which are described and documented here.

## Documentation

### For researchers

If you are a researcher you're probably most interested in the usage of the generic web application. In this case please have a look at our [DSP-APP documentation](dsp-app/).

### For developers

The documentation for developers is splited into different groups depending on the software repository.

- [Overview](developers/getting-started.md)

- [DSP-API](dsp-api/05-internals/development/) is the main software framework in the back-end.

- [DSP-APP](dsp-app/how-to-contribute/)

- [DSP Libraries](developers/libraries/index.md)

- [Sipi](developers/sipi/index.md)

### For the community

In case of further questions, bug reports or if you want to get in contact with us have a look at our [community page](community/faq.md).
