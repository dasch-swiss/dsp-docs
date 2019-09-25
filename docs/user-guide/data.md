# Data management

Once your data model is ready, you're able to add data. The Knora web app offers several possibilities to add data, whether you are starting from scratch or importing data from another program.

### Start from scratch

When a project starts from scratch, you will enter and generate new data directly in the Knora web app app itself. Generating new data can be done one by one with a form or with a table-based (Excel like) tool.

- Upload the files, e.g., the actual audio file of an interview or images of the photographs discussed in the interview
- Augment the metadata
- In case of interview transcriptions from audio or video files, Knora web app will offer a simple transcription tool

![Create new source e.g. upload audio file of an interview.](../assets/images/knora-app/mock-source-new-edit.png)
Create new source e.g. upload audio file of an interview.

### Organize data and create additional sources

The workspace of the Knora web app includes tools to connect different sources, even if they're not in the same project (linkage), to comment on a source and on their metadata fields (annotate), and to transcribe audio-visual material. These actions will generate more data and will help to find specific sources and their relations easily.
It's possible to collect different sources and to store them in an individual collection. You can define more than one collection. You can share collections and invite other users to collaborate.

## Find and browse


### Full-text search

Full-text search performs queries including one or more terms or phrases, and returns data that matches search conditions. The asterisk * can be used as a wildcard symbol.

<!-- ![Search 1: Simple full-text search with a selection to filter by project.](/assets/images/search-fulltext.png) -->

### Advanced search

The advanced search allows you to filter by project, by source type, or by the metadata of source types. Each filter can be standalone or combined. The metadata field can be precisely filtered with criteria such as "contains", "is like", "equals to", "exists" or in case of a date value with "before" or "after".

In addition, for a metadata field that is connected to another source type, it's possible to filter by this second source type. If you are looking for the source type "Photograph" with the metadata field "Photographer", which is connected to source type "Person", you can search for photograph(s) taken by person(s) who is born before February 1970. The result of this request will be an intersection of the two source types, illustrated in this Diagram.

![Diagram 1: Photograph and Person are two sources, connected by metadata field "Photographer" in photograph. In advanced search (and expert search) you can find an intersection of both by filtering both sources at the same time.](../assets/images/knora-app/search-advanced-diagram.png)
Diagram 1: Photograph and Person are two sources, connected by metadata field "Photographer" in photograph. In advanced search (and expert search) you can find an intersection of both by filtering both sources at the same time.

![Search 2: Advanced search offers many filter combinations and is a powerful search tool.](../assets/images/knora-app/search-advanced.png)
Search 2: Advanced search offers many filter combinations and is a powerful search tool.

### Expert search

The expert search can be more powerful than the advanced search, but requires knowing how to use the query language Gravsearch (based on SparQL and developed by the DaSCH team). With Gravsearch, expert users can build searches by combining text-related criteria with any other criteria.

For example, you could search for a photograph in a transcript that contains a certain element and also mentions a person, who lived in the same country as another person, who is the author of another photograph.

To learn Gravsearch, go to the Knora documentation [&rarr; Gravsearch](https://docs.knora.org/paradox/03-apis/api-v2/query-language.html)

![Search 3: Expert search is a text area in which you can create Gravsearch queries.](../assets/images/knora-app/search-expert-gravsearch.png)
Search 3: Expert search is a text area in which you can create Gravsearch queries.

## Search results


### Simple list
The results of the search are displayed in an organised list with a small preview. You can select one result at a time to get more information.

![Search result 1: Simple list of results, similar to Google's list of results.](../assets/images/knora-app/search-results-simple-list.png)
Search result 1: Simple list of results, similar to Google's list of results.

### Grid list: Lighttable

The results of the search are displayed in a grid list with a big preview. You can select one result at a time to get more information.

![Search result 2: A kind of preview list, inspired by Pinterest.com.](../assets/images/knora-app/search-results-grid-list.png)
Search result 2: A kind of preview list, inspired by Pinterest.com.

### Table: Excel-like view

The search results are displayed in a table with the option to sort them. This layout is enabled when the search has been performed with only one source type.
Each column of the table corresponds to one metadata.

![Search result 3: An Excel-like table view to edit multiple sources at once.](../assets/images/knora-app/search-results-table.png)
Search result 3: An Excel-like table view to edit multiple sources at once.

## Do research and work on your data

Once you have found the desired sources, you can (re)view them and annotate the source itself, the media file, or single metadata values. If you select more than one source, you can compare them in a side-by-side view, link them, edit them all at once, or save them in a collection. A collection is similar to a playlist in a music app or shopping basket in an online store.

### Display a source

The Knora web app offers different source views for different media types. There's a viewer for still images, moving images, audio and document files. You can open them from the list of search results. Depending on the media type, Knora web app offers different tools to work on the source.

In a still image source, you're able to draw regions on the image and to annotate or transcribe this region. Usually, a still image source is used for book pages, photographs, postcards, letters etc.

In time-based sources like moving image or audio document, you can mark sequences on the timeline. A transcription tool helps to annotate and to transcribe the sequence.

![Single resource view. The source type in this example is "Video".](../assets/images/knora-app/source-selected-one.png)
Single resource view. The source type in this example is "Video".

Knora web app offers a graph view to visualize the connection of a selected source. The graph view is a powerful tool because you will find more information about the source by clicking through the nodes.

![Graph view of a single resource.](../assets/images/knora-app/source-graph-view.png)
Graph view of a single resource.

Additionally, you can work on the source directly, e.g, transcribe a moving image or a taped interview or mark regions of interest on still images and on documents.

![Single resource fullframe view with the transcription tool at the bottom. The source type in this example is "Video" with a table-based sequence protocol on the right hand-side.](../assets/images/knora-app/source-selected-fullframe.png)
Single source fullframe view with the transcription tool at the bottom. The source type in this example is "Video" with a table-based sequence protocol on the right hand-side.

### Select more than one source

![Three sources selected; what do you want to do with them?](../assets/images/knora-app/source-selected-three.png)
Three sources selected; what do you want to do with them?

By selecting more than one source, you can edit them all at once, add them to a collection, share or connect them. Or you compare them as shown in the next paragraph.

### Compare the sources

You can compare from two to six source objects at the same time side by side.

![Compare 2 to 6 sources with each other, similar to the Mirador web app.](../assets/images/knora-app/source-compare-viewer.png)
Compare 2 to 6 sources with each other, similar to the Mirador web app.

### Annotate and connect your data (sources and / or metadata)

A main feature of the flexible data storage that Knora web app uses is the possibility to annotate and link sources and their metadata. An annotation can be a small note about a date like "Not sure about the birthdate of this person. There's another date mentioned in the source XYZ". Inside the note, it's possible to link to another source.
Links in Knora web app are always bi-directional. If you link source A with source B, then source B knows about this connection. If you find source B, you have the connection to source A as well.

### Export, save or share the data

Data sets and metadata extracted through a search can be exported as CSV, XML, or other predefined file formats.
It's also possible to store fulltext, advanced, and expert search queries to reuse them later to store source objects in a collection similar to a playlist of a music app or a shopping basket.

![The share menu offers many tools to export the data, to send it to someone or to store it in an individual source collection.](../assets/images/knora-app/share-export-menu.png)
The share menu offers many tools to export the data, to send it to someone or to store it in an individual source collection.
