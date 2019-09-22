# Project Management

As a project administrator you can define your project, the team members, permission groups and, as most important, define the data model (ontology).

## What is a project?
Create a new research project, e.g., PhD research, pilot, or proof of concept. Enter basic information like a short project description and institution information.

## Collaboration
Add members to the project team and define their permissions roles: Who in the project is able to edit or to see the data? Data includes the research sources and their metadata. Permissions can be set for the entire proejct or for single metadata fields.

## Data model
The most important step in the project is the definition of the data model. Knora web app offers a tool to create data models easely. First you have to know about your data and sources you want to work with. The data model can be flexible and customizable. With Knora web app you can comply with the FAIR data standard, but compliance is not required to analyze your data.

The questions to answer in creating your data model:
"What kind of data do I have in my project?"
"What are the sources and what are their metadata?"

For example: You interviewed 20 people. During these interviews, which you taped, you talked about photographs. Of all the data collected during the project, the most important are:

- audio-files of the interview
- transcribed text of conversations (or you can transcribe the files inside the web app)
- photographs
- data about the person you interviewed
- location where the photograph was taken

Diagram 1 shows the relationships of the data by source type from these experiences.

![Relationship of the data by source type](../assets/images/knora-app/diagram-data-model.png)
Relationship of the data by source type

## Select your SOURCE TYPES

In the data model editor, you have to select your source types from a predefined list on the right-hand side. Later, you can customize the source type or define an additional default source type, if the one you need doesn't exist as a default.

![Data model editor 1: Select all your main source types by drag and drop; e.g. for an interview, select the source type "Audio / Sound / Interview".](../assets/images/knora-app/data-model-add-source.png)
Data model editor 1: Select all your main source types by drag and drop; e.g. for an interview, select the source type "Audio / Sound / Interview".

In our example with the interview and the photographs, you drag and drop the following main source types from the list on the right-hand side:

- Audio / Sound / Interview
- Transcript
- Image / Photograph / Postcard
- Person
- Location / Place

## Select the METADATA fields for each source type (optional)

The predefined source types offer a suggested list of metadata fields. This list could help to create a data model simply and quickly. It's also possible to deselect the suggested metadata fields (e.g., no metadata), to adapt others and to customize them.

![Data model editor 2: Add additional metadata fields to your source type; e.g. add the missing field "Person".](../assets/images/knora-app/data-model-add-property.png)
Data model editor 2: Add additional metadata fields to your source type; e.g. add the missing field "Person".

## Customize the SOURCE TYPES and the METADATA fields (optional)

It's possible to customize the predefined source type and the metadata field values by clicking on the edit button of the source type. You can rename the source type, rearrange the order of the metadata fields, and set permissions.

![Data model editor 3: Customize the source type AUDIO; e.g. rename it into Interview](../assets/images/knora-app/data-model-edit-source.png)
Data model editor 3: Customize the source type AUDIO; e.g. rename it into Interview

## Connect SOURCE TYPES in the data model (optional)

If you have reusable metadata value in a source type (A), you should create an additional source type (B) and drag-and-drop it over the metadata field of the first source type (A) to connect the two data types.
E.g., For the metadata "Photographer" in source type "Photograph", you should create a source type "Person" and connect it in "Photograph".

![Data model editor 4: Manage connections between the source types.](../assets/images/knora-app/data-model-example.png)
Data model editor 4: Manage connections between the source types.


