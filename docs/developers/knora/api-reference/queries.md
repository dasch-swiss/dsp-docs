# How to build queries
The simplest form of a query is a full-text search. For more complex queries than a full-text search, Knora offers a special query language called [Gravsearch](https://docs.knora.org/paradox/03-apis/api-v2/query-language.html) which is based on the query language [SPARQL](https://www.w3.org/TR/sparql11-overview/) (**S**PARQL **P**rotocol **A**nd **R**DF **Q**uery **L**anguage).

<br>

## Full-text search
Knora offers a full-text search that searches all textual representations of values and `rdfs:label`-labels of resources. The full-text search supports the [Lucene Query Parser syntax](https://lucene.apache.org/core/2_9_4/queryparsersyntax.html).
Search terms can be seperated by a white space - then they will be combined using the Boolean operator `OR` since this is Lucene's default operator. Be aware, that the search terms have to be URL encoded!

The recommended way to submit a full-text query is via `HTTP GET` in the following form.
````
HTTP GET request sent to https://api.dasch.swiss/v2/search/searchValue[limitToResourceClass=resourceClassIRI][limitToStandoffClass=standoffClassIri][limitToProject=projectIRI][offset=Integer]
````

Most of these parameters can be set optionally:
* `limitToResourceClass=resourceClassIRI` : this restricts the search to resources of the specified resource class and its subclasses.
* `LimitToStandoffClass=standoffClassIRI` : this will force Knora to look for search terms that are marked up with the indicated standoff class.
* `limitToProject=projectIRI` : this restricts the search to resources of the specified project.
* `offset=Integer` : this parameter can be used to enable paging and to go through all the results request by request. The default value for the parameter `offset` is 0 which will return the first page of search results. Subsequent pages can be retrieved by increasing the parameter `offset` by one. This means, `offset=1` fetches the second page of serach results, `offset=2` the third, and so on. The amount of retrieved search results per page is defined in `app/v2` in the file `application.conf`.

The first search parameter has to be preceded by a question mark `?` and any following parameter by an ampersand `&`. A search value must have a minimal length of three characters (default value) as defined in `app/v2` in the file `application.conf`.

Wildcards may be used.
* An ampersand `&` represents a single missing character. However, it has to be URL encoded as `%3F` because it has a special meaning in the URL syntax.
* An asterisk `*` represents zero, one or multiple missing characters. The URL encode of an asterisk is `%2A`.

To request the number of results rather than the results themselves, a count query can be made, where the first parameter has to be preceded by a question mark `?` and any following parameter by an ampersand `&`:
````
HTTP GET request sent to https://api.dasch.swiss/v2/search/count/searchValue[limitToResourceClass=resourceClassIRI][limitToStandoffClass=standoffClassIri][limitToProject=projectIRI][offset=Integer]
````

To combine two search terms with boolean `AND` the two search terms have to be combined with `AND`:
````
A AND B
````

For expressing that a query MUST contain the first search term and MAY contain the second search term, the plus sign (`+`; required operator) can be used.
````
+A B
````

Sometimes it may be useful to search for one term that doesn't appear in connection with another term. For such a query, the `NOT` operator can be used:
````
A NOT B
````
Be aware that a `NOT` search with only one term is not possible, there have to be two search terms!

The minus sign (`-`; prohibit operator) enables to exclude hits that contain the term after the prohibit operator:
````
A -B
````

<br>

## A short note on the following examples
All examples in the following sections are from Bernoulli-Euler-Online (BEOL) which is a research platform for the study of early modern mathematics and science implemented within Knora.

<br>

## Examples of full-text searches
Let's assume we intend to search for the term "Bernoulli" with and without wildcard options. To send HTTP GET requests you can use a program such as [Postman](https://www.getpostman.com/) or simply use the [Firefox request detail panel](https://developer.mozilla.org/en-US/docs/Tools/Network_Monitor/request_details) or a similar tool in your favorite browser. For HTTP POST requests, a program such as Postman has to be used.

The query
````
HTTP GET request sent to https://api.dasch.swiss/v2/search/Bernoulli
````
retrieves all resources containing the term "Bernoulli". The beginning of the request result when using Postman and chosing "JSON" as output format looks as follows:
````
{
 "@graph": [
    {
      "@id": "http://rdfh.ch/0801/--rbZIzLTNC4qrcpAAkjwA",
      "@type": "beol:letter",
      "beol:hasText": {
        "@id": "http://rdfh.ch/0801/--rbZIzLTNC4qrcpAAkjwA/values/wiWf4Ta_QX2jYOiRcUNZlQ",
        "@type": "knora-api:TextValue",
        "knora-api:arkUrl": {
          "@type": "xsd:anyURI",
          "@value": "http://ark.dasch.swiss/ark:/72163/1/0801/==rbZIzLTNC4qrcpAAkjwAc/K0Ik_ElfQtOOTkgn4h4MnQQ"
        },
````
We learn that our search term "Bernoulli" appears in a letter which belongs to the BEOL project. If we possess the necessary permissions, the web adress given in `@value` copied to a browser guides us to the corresponding entry of the letter and all of its available additional information in the Knora App.

The following query with the URL encoded (`%3F`) wildcard `&`
````
HTTP GET request sent to https://api.dasch.swiss/v2/search/Bernoull%3F
````
retrieves all resources containing the term "Bernoulli" in the same way as in the preceeding example.

The wildcard `*` (URL encoded `%2A`) in the following query
````
HTTP GET request sent to https://api.dasch.swiss/v2/search/Bern%2A
````
retrieves all resources containing the term "Bernoulli", but would also retrieve hits for e.g. "Bern" or "Bernina".

To search only for the number of hits for the term "Bernoulli" the following count query can be used:
````
HTTP GET request sent to https://api.dasch.swiss/v2/search/count/Bernoulli
````
The answer to this query is at the moment "1989":
````
{
  "schema:numberOfItems": 1989,
  "@context": {
    "schema": "http://schema.org/"
  }
}
````
If we only intend to search within the BEOL project for the term "Bern*", we can specify this in our full-text query, but we have to know the projectIRI of the BEOL project which is `http://rdfh.ch/projects/yTerZGyxjZVqFMNNKXCDPF1`:
````
HTTP GET request sent to https://api.dasch.swiss/v2/search/Bern%2A?limitToProject=http://rdfh.ch/projects/yTerZGyxjZVqFMNNKXCDPF
````
For the use of wildcards just replace the letter(s) in the search term by one of the wildcards. Be aware that the first parameter after the search term has to be preceded by a question mark `?`. However, any following parameter has to be preceded by an ampersamd `&`! Thus, a successful request with two parameters looks as follows:
````
HTTP GET request sent to https://api.dasch.swiss/v2/search/Bernoulli?limitToProject=http://rdfh.ch/projects/yTerZGyxjZVqFMNNKXCDPF&offset=1
````
We added here, that we want to see the second page of the results instead of the first one which is the default value (offset=0).

To combine the two search terms "Bernoulli" and "Euler" the logical operator `AND` has to be used:
````
HTTP GET request sent to https://api.dasch.swiss/v2/search/Bernoulli%20AND%20Euler
````
For expressing that a query must contain the first search term and may contain the second search term, the required operator `+` can be used:
````
HTTP GET request sent to https://api.dasch.swiss/v2/search/+Bernoulli%20Euler
````
Here it is required that the search results contain the term "Bernoulli", but it is optional that they contain the second term "Euler".

Sometimes we may be interested in searching for one term that doesn't appear in connection with another term. For such a query, the `NOT` operator can be used:
````
https://api.dasch.swiss/v2/search/Bernoulli%20NOT%20Euler
````
With this query we are searching for everything that contains Bernoulli, but not Euler.

If we want to exclude all search results that contain "Euler", the prohibit operator `-` has to be used:
````
https://api.dasch.swiss/v2/search/Bernoulli%20-Euler
````
Count queries for the above mentioned combinations of the search terms "Bernoulli" and "Euler" restricted to the BEOL project currently (Dec. 2019) produces the following numbers:
|search term|number|
|-----|:----:|
|Bernoulli|1937|
|Euler|1435|
|Bernoulli%20AND%20Euler|165|
|Bernoulli%20NOT%20Euler|1775|
|Bernoulli%20OR%20Euler|3201|
|Bernoulli%20Euler|3201|
|+Bernoulli%20Euler|1937|
|Bernoulli%20-Euler|1775|

<br>

## SPARQL queries
SPARQL is a set of specifications that provide languages and protocols to query and manipulate RDF graph content on the Web or in an RDF triplestore. In the following the [Turtle](https://www.w3.org/TR/turtle/) data format will be used to show each triple.

The following introduction to SPARQL draws heavily on the book of **Bob DuCharme, Learning SPARQL. Querying and Updating with SPARQL 1.1, 2nd edition, Sebastopol 2013** which we warmly recommend for reading.

The most basic keywords are `SELECT` and `WHERE`. Moreover, a very useful keyword is `LIMIT`.
* `SELECT` names which part of the data we want to see. If all data should be shown, use `SELECT *`, the asterisk functions as wildcard.
* `WHERE` is used to formulate a clause - it decides which data should be retrieved from the whole dataset.
* `LIMIT` limits the query to the first e.g. 20 (`LIMIT 20`) or 100 hits. The limit has to be specified outside the curly braces of the `WHERE`-clause. If you've no idea what the test data are about or if you know that the dataset is large, it's very useful to limit your query in order not to ask too much from the query endpoint. Be aware, that if you're sorting your data, the `LIMIT` keyword will only apply after all data have been retrieved and sorted! Thus, `LIMIT` will give you the first results of the sorted data.

<br>

### Query forms
In SPARQL four different query forms do exist: `SELECT`, `CONSTRUCT`, `ASK` and `DESCRIBE`.
* The most common one is probably `SELECT` which enables requesting data from a collection.
* Using `CONSTRUCT` instead will return triples. Triples can be retrieved without modifying them or the retrieved triples can be used to generate new triples. `CONSTRUCT` enables to copy, create and convert RDF data, and it makes it easier to identify data that do not conform to specific rules.
* Using `ASK` asks the processor whether a certain given graph pattern fits a set of triples in the requested dataset or not. The processor returns a boolean `true` or `false`.
* `DESCRIBE` asks for triples which describe a particular resource. This query form isn't popular because different processors return different triples as a description of the named resource.

Our `knora-api` only allows `CONSTRUCT` requests and a limited set of SPARQL keywords. Thus, the main part of the following examples to illustrate the possibilities of SPARQL use the SPARQL endpoint of Wikipedia called [DBpedia](http://dbpedia.org/snorql/) accessible at http://dbpedia.org/snorql/. There, the following prefixes are predefined:
````
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX : <http://dbpedia.org/resource/>
PREFIX dbpedia2: <http://dbpedia.org/property/>
PREFIX dbpedia: <http://dbpedia.org/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
````
Additional prefixes can be defined in the query window before the `SELECT` statement, e.g.
````
PREFIX knora-api: <https://api.dasch.swiss/ontology/knora-api/v2#>
````

<br>

### A query asking for all data
If we have no idea what our data is all about, a nice first query is the following - but don't forget to set a limit because it asks for all the triples in the dataset!

#### Using your local Knora installation
Go to `http://0.0.0.0:7200/sparql` in your browser which will guide you to the GraphDB SPARQL Query & Update page if you've Knora installed locally. Copy the following code into the window:
````
PREFIX knora-api: <https://api.dasch.swiss/ontology/knora-api/v2#>

select * where {
	?s ?p ?o .
} limit 100
````
This query retrieves the first 100 triples of the data. The asterisk after `SELECT` indicates that all variables should be selected to get bound in this query. Setting a limit with the keyword `LIMIT` prevents a server timeout.

#### Using Postman and HTTP POST
If you haven't installed Knora locally or if you want to run the same query on our live-server, you'll see that this query isn't allowed because it's supposed to be too broad to be meaningful. Additionally, the query has to be adapted because only `CONSTRUCT` queries are allowed, the main resource has to be named and the keyword `LIMIT` is not supported. Remember, that all variables in the `CONSTRUCT` must appear also in the `WHERE`-clause! Open Postman and chose
````
HTTP POST sent to https://api.dasch.swiss/v2/searchextended
````
Then click "Body" and chose "raw". Theoretically, the  adapted query asking for all resources in Knora would look like the following:
````
PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>

CONSTRUCT {
   ?s knora-api:isMainResource true .
}
WHERE {
    ?s a knora-api:Resource .
}
````
This is a syntactically correct query, but it returns no results due to access limitations.

However, we can ask for all resources of a certain kind, e.g. for all who are a `foaf:Person`:
````
PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

CONSTRUCT {
   ?s knora-api:isMainResource true .
}
WHERE {
    ?s a knora-api:Resource .
    ?s a foaf:Person .
}
````
If you do a count search, i.e. sending a POST request to `https://api.dasch.swiss/v2/searchextended/search`, you retrieve 2643 results at the moment.

<br>

### A query asking for one specific variable
If we are interested in works of the artist Marc Chagall, we can send a first query to the DBpedia endpoint, asking for information about Chagall with results stored in the variable `?artist`:
````
SELECT ?artist
WHERE
{
 <http://dbpedia.org/resource/Chagall> ?p ?artist .
}
````
The angle brackets surrounding "http://dbpedia.org/resource/Chagall" tell the processor that it is an URI. The query retrieves the following results in tabular form (if the simple output format "Browse" is chosen):
|artist|
|-----|
|"Chagall"@en|
|158693|
|600433204|
|:Marc_Chagall [link](http://dbpedia.org/snorql/?describe=http%3A//dbpedia.org/resource/Marc_Chagall)|
|<http://en.wikipedia.org/wiki/Chagall> [link](http://dbpedia.org/snorql/?describe=http%3A//en.wikipedia.org/wiki/Chagall)|
|<http://en.wikipedia.org/wiki/Chagall?oldid=600433204> [link](http://dbpedia.org/snorql/?describe=http%3A//en.wikipedia.org/wiki/Chagall%3Foldid%3D600433204)|

After having verified in this way that <http://dbpedia.org/resource/Chagall> is a valid URI, we can ask for properties and values with the following query:
````
SELECT ?property ?hasValue
WHERE {
  <http://dbpedia.org/resource/Marc_Chagall> ?property ?hasValue .
}
````
One of the results obtained is a property `dbpedia:ontology/wikiPageExternalLink` with the value `"<http://www.thejewishmuseum.org/collection/search?artist=Marc%20Chagall%2C%20French%2C%20b.%20Belorussia%2C%201887-1985>`. Following this link leads us to the homepage of the Jewish Museum in New York and the works of Marc Chagall the museum possesses.

If you intend to query data that isn't stored locally, the keyword `FROM` could be used to specify the data set. It is also possible to read data from a file when using the `FROM` keyword. If the data are stored in a file named `example.ttl` stored in the same folder as the query itself, then the `SELECT`-part of the request looks as follows:
````
SELECT * <example.ttl>
WHERE {
   ...
}
````

<br>

### A query with matching on multiple triples
The following query uses a `?films` variable to tie together two triple patterns in the `WHERE`-clause.
````
SELECT ?films
WHERE {
   ?films <http://dbpedia.org/ontology/starring> :Iggy_Pop .
   ?films <http://dbpedia.org/ontology/starring> :Johnny_Depp .
}
````
Such a set of triple patterns within curly braces is called a *graph pattern*. The `?films` variable is used in two different triples to find connected triples in the queried data. The first triple looks for films starring Iggy Pop, the second triple then searches if in one of these films also Johnny Depp was involved. The result shows all the films these actors played in together: Cry Baby and Dead Man.

<br>

### Searching for strings and values
The keyword `FILTER` tells the query processor to return only those triples which meet the given condition in the filter. This time we're searching for films starring David Bowie, but only those which have a runtime longer than 89 minutes.
````
SELECT ?BowieFilm ?runtime
WHERE {
  ?BowieFilm <http://dbpedia.org/ontology/starring> :David_Bowie .
  ?BowieFilm <http://dbpedia.org/ontology/Work/runtime> ?runtime .
  FILTER (xsd:double(?runtime) > 89.0 )
}
ORDER BY xsd:double(?runtime)
````
The keyword `ORDER BY` allows to sort the results with runtime in increasing order. Be aware that it is necessary to specify the datatype `xsd:double` of the `?runtime` variable, otherwise the filter and also the sorting doesn't work properly!

<br>

### Searching for data that may exist or not
The keyword `OPTIONAL` can be used to express "show this value if it exists".
````
SELECT *
WHERE
{
   <http://dbpedia.org/resource/Pink_Floyd> <http://dbpedia.org/ontology/formerBandMember> ?members .
   OPTIONAL {
      ?members <http://dbpedia.org/ontology/deathDate> ?deathDate .
   }
}
````
The above query asks for the former members of the band Pink Floyd and for their death date if they passed away already. If they still enjoy their life, their names are listed anyway since the additional information about the death date is set in an `OPTIONAL` graph pattern. If there is more than one `OPTIONAL` triple pattern, they
are processed in the order the processor sees them. Hence, the order of `OPTIONAL` patterns matters - this fact can be taken advantage of. However, excessive use of the keyword `OPTIONAL` can slow down the queries when dealing with large datasets!

<br>

### Searching for data that doesn't meet a condition
While cleaning up data it is very useful if one can search for missing entries. `FILTER NOT EXISTS` is a filter condition that returns a boolean value `true` if the specified graph pattern doesn't exist.
````
SELECT *
WHERE
{
   ?artist rdf:type <http://dbpedia.org/ontology/Artist> .
   FILTER NOT EXISTS {?artist dbpedia2:works ?works }
}
LIMIT 1000
````
When searching dbpedia data I realised that the information provided for different artists isn't very consistent. If we would intend to homogenise the basic information given for each artist we could use the above query to identify those for which the basic information about at least some of their works is still missing.

Another possibility is to use the keyword `MINUS`. As its name suggests, it subtracts from a group A all those which satisfy the condition. The last query using the keyword `MINUS` looks as follows:
````
SELECT *
WHERE
{
   ?artist rdf:type <http://dbpedia.org/ontology/Artist> .
   MINUS {?artist dbpedia2:works ?works }
}
LIMIT 1000
````
Be aware that `FILTER NOT EXISTS` and `MINUS` *may* return different results!

<br>

### A joined search
To link up different sets of data the same variable can be in the object position in one triple and in the subject position of another triple as in the following example:
````
SELECT DISTINCT ?actor ?value
WHERE
{
   ?film <http://dbpedia.org/ontology/starring> ?actor .
   ?actor <http://dbpedia.org/ontology/birthYear> ?value .
}
LIMIT 1000
````
In this query with the first triple we ask for all actors, in the second triple for the birth dates of the actors. The `DISTINCT` keyword tells the processor that duplicate answers shouldn't be displayed, thus, redundant results are eliminated. Without the `DISTINCT` keyword we would receive lots of identical responses since most actors played in more than one film.

Whether the queried data stem from the same repository or from different ones doesn't matter as long there are resource URIs in one dataset that can be paralleled with resource URIs in another.

<br>

### Asking about patterns
Property paths are a way to express more extensive patterns to look for. They provide a possibility to search for the requested data and in addition to that keep looking for more data. An example where this may be useful is the citation pattern of a certain paper. By simply adding a `+` sign we can tell the query processor to look for papers that cite paper A, and papers that cite those, etc. until the tree of papers is finished. The plus sign means "one or more". One could use an asterisk instead, which means "zero or more". It is also possible to be much more specific by using a property path which asks for papers that are exactly three links away, i.e. papers that cited papers that cited papers that cited paper A. This is laid out by a a series of steps separated by slashes. The `WHERE`-clauses of such queries could look like as follows:

|`WHERE`-clause|meaning|
|-----|-----|
|`WHERE {?s :cites :paperA .}`|papers that cited paper A.|
|`WHERE {?s :cites+ :paperA .}`|one or more links away: papers that cited paper A, and papers that cited those, and papers that cited those, etc.|
|`WHERE {?s :cites* :paperA .}`|zero or more links away: papers that cited paper A, and papers that cited those, and papers that cited those, etc.|
|`WHERE {?s :cites/:cites/:cites :paperA .}`|three links away: papers that cited papers that cited paper A.|

Property paths are powerful to ask about patterns in all kinds of datasets. They are also very useful to cope with data which has been prepared or published with differing naming conventions. One such specific example is if we're interested in the total population of the British Islands:
````
CONSTRUCT {
    ?country <http://dbpedia.org/ontology/populationTotal> ?pop
} WHERE {
    VALUES ?country {
        :England
        :Scotland
        :Wales
        :Northern_Ireland
        :Ireland
    }
    ?country <http://dbpedia.org/property/populationCensus> | <http://dbpedia.org/ontology/populationTotal> ?pop .
}
````
For all countries except Ireland the corresponding number is returned when asking for `<http://dbpedia.org/property/populationCensus>`. To find Ireland's population we need to use another predicate, namely `<http://dbpedia.org/ontology/populationTotal>`. Use of the so-called alternative property path `|` as in the above example allows searching for both options at the same time. Furthermore, using `CONSTRUCT` instead of `SELECT` enables to connect each country to its population with `<http://dbpedia.org/ontology/populationTotal>`, thus returning consistent triples!

<br>

### Combining search conditions
The `UNION` keyword allows to specify multiple different graph pattern and to ask for a combination of all the data which fit any of these patterns. No connection between the sets of data need to be specified. However, probably it is more useful to use `UNION` for retrieving two overlapping sets of data.
````
SELECT *
WHERE
{
   {?artist rdf:type <http://dbpedia.org/ontology/Artist> .
    ?artist <http://dbpedia.org/ontology/birthPlace> <http://dbpedia.org/resource/Russia> .
    ?artist <http://dbpedia.org/ontology/deathPlace> <http://dbpedia.org/resource/Paris> . }
  UNION
   {?artist rdf:type <http://dbpedia.org/ontology/Artist> .
    ?artist <http://dbpedia.org/ontology/deathPlace> <http://dbpedia.org/resource/Saint-Paul-de-Vence> . }
}
````
The above query asks for all artists that were born in Russia and died in Paris and for all those artists who died in St. Paul de Vence.

<br>

### Filtering data
The keyword `FILTER` takes a single argument and it is used to retrieve those triples that match the filter argument. The filter argument can contain strings, a function or a simple comparison. Here are a few examples of filter arguments and the corresponding queries:

|Filter argument|Meaning|
|-----|----|
|`FILTER (regex(?o, "Leiden","i"))`|searches in the ?o value for the substring "Leiden", the "i" means case insensitivity.|
|`FILTER (?o < 10)`| searches for all items with ?o values of less than 10.|
|`FILTER (!(isURI(?city)))`|returns a boolean `true` if the value for ?city isn't a proper URI, the `!` means "not".|
````
SELECT *
WHERE
{
   ?s rdfs:label ?o .
   FILTER (regex(?o, "Leiden","i"))
}
LIMIT 1000
````
````
SELECT DISTINCT ?actor ?year
WHERE
{
   ?film <http://dbpedia.org/ontology/starring> ?actor .
   ?actor <http://dbpedia.org/ontology/birthDate> ?year .
   FILTER (xsd:date(?year) > "1980-01-01"^^xsd:date)
}
LIMIT 1000
````
Be aware that it is necessary to specify the datatype `xsd:date` of the `?year` variable, otherwise the filter doesn't work properly.
````
SELECT *
WHERE
{
   <http://dbpedia.org/resource/Leiden> a ?o .
   FILTER (!(isURI(?o)))
}
````
This query retrieves no results since all values for `?o` for the city of Leiden in dbpedia are proper URIs.

<br>

### Skip a number of results
The `OFFSET` keyword can be used to tell the processor to skip a certain number of search results before picking those to return. This is useful for paging. Just type `OFFSET` and an integer number (e.g. `OFFSET 5`) after the last closing curly brace of the query.

<br>

### Subqueries
Subqueries are queries inside queries. With the help of subqueries a complex query can be broken down into easier manageable parts. Each subquery must be enclosed in its own set of curly braces.
````
SELECT ?capital ?latitude
WHERE {
  {
    SELECT ?capital
    WHERE { ?capital ?p <http://dbpedia.org/resource/Category:Capitals_in_Europe> . }
  }
  {
    SELECT *
    WHERE { ?capital <http://dbpedia.org/property/latd> ?latitude .
            FILTER (?latitude < 52.0)}
  }
}
ORDER BY DESC(?latitude)
````

This query first asks for all capital cities of Europe. The subquery then retrieves the corresponding geographical latitudes and filters out all of them with latitudes larger than 52.0°. Finally, the results are sorted in decreasing order of geographical latitude.

<br>

### Storing results in variables
The `AS` keyword can be used to store the query result in a variable.
````
SELECT (SUM(?height) AS ?total)
WHERE {
  ?skyscrapers <http://purl.org/dc/terms/subject> <http://dbpedia.org/resource/Category:Skyscrapers_in_Manhattan> .
  ?skyscrapers <http://dbpedia.org/ontology/height> ?height .
}
````
The above example asks for the heights of all skyscrapers in Manhattan, the sum of all their heights is calculated and then stored in the variable `?total`. The `SUM()` function adds up all values.

If we're not interested in the sum of the heights of the skyscrapers in Manhattan, but rather in the tallest, the shortest or the average value, the functions `MAX()`, `MIN()` or `AVG()` can be used - they enable to find the maximum, minmum or the average value. Just replace `SUM` in the query by `MAX`, `MIN` or `AVG`.

A more common way of assigning a value to a variable is with the keyword `BIND`. Arithmetic expressions can be used when a new value is created with the help of the keyword `BIND`: `+` for addition, `-` for subtraction, `*` for multiplication and `/` for division.
````
SELECT ?elmax ?elmin ?eldiff
WHERE {
  <http://dbpedia.org/resource/Rouffignac> <http://dbpedia.org/ontology/maximumElevation> ?elmax .
  <http://dbpedia.org/resource/Rouffignac> <http://dbpedia.org/ontology/minimumElevation> ?elmin .
  BIND (?elmax - ?elmin AS ?eldiff)
}
````
We asked for the maximum and minimum elevation of the cave of Rouffignac, calculated the elevation difference and stored it in a variable `?eldiff` with the help of the keyword `BIND`.

<br>

### Sorting
The keyword `ORDER BY` enables the sorting of data. Values can e.g. be sorted in ascending or descending order - the ascending order is the default, for a descending order the sort key has to be wrapped in the `DESC()` function.
````
SELECT ?BowieFilm ?runtime
WHERE {
  ?BowieFilm <http://dbpedia.org/ontology/starring> :David_Bowie .
  ?BowieFilm <http://dbpedia.org/ontology/Work/runtime> ?runtime .
}
ORDER BY DESC(xsd:double(?runtime))
````
This example is almost identical to the one in the section "Searching for strings and values", but we eliminated the filter and now we list all films in decreasing order of runtime. Be aware that it is necessary to specify the datatype `xsd:double` of the ?runtime variable, otherwise the filter and also the sorting doesn't work properly!

Sorting on multiple keys is possible if the key value names are separated by spaces:
````
SELECT ?height ?floors
WHERE {
  ?skyscrapers <http://purl.org/dc/terms/subject> <http://dbpedia.org/resource/Category:Skyscrapers_in_Manhattan> .
  ?skyscrapers <http://dbpedia.org/ontology/height> ?height .
  ?skyscrapers <http://dbpedia.org/ontology/floorCount> ?floors .
}
ORDER BY DESC(?floors) DESC(?height)
````
This query returns all skyscrapers of Manhattan sorted by their number of floors and in the second place by their height.

<br>

### Querying a remote endpoint
The `SERVICE` keyword provides a possibility to query remote data from a distant SPARQL endpoint. The usual way to formulate such a query is the following with an outer `SELECT` or `CONSTRUCT` indicating which values we're interested in:
````
PREFIX xy: <http://your.external.querypoint>

SELECT ?p ?o
WHERE {
  SERVICE <http://your.external.querypoint/sparql>
  {xy:Person_XY ?p ?o}
}
````
However, the SPARQL Explorer for DBpedia doesn't allow such queries to external query points. Such requests have to be sent with e.g. python scripts - see section "Python example scripts".

<br>

### Queries using `CONSTRUCT`
In contrast to a `SELECT` query, a `CONSTRUCT` query specifies a triple to create with each set of values that got bound to the three variables while it has the same graph pattern following the `WHERE` keyword. Thus, the following `SELECT` version of a query asking for all information - subjects, predicates and objects of all triples - in DBpedia where the same subject has a `foaf:givenName` value of "Peter" and a `foaf:surname` value of "Morris"
````
SELECT ?person ?p ?o
WHERE {
  ?person <http://xmlns.com/foaf/0.1/givenName> "Peter"@en ;
          <http://xmlns.com/foaf/0.1/surname> "Morris"@en ;
          ?p ?o .
}
````
corresponds to the following `CONSTRUCT` version:
````
CONSTRUCT
{ ?person ?p ?o . }
WHERE {
  ?person <http://xmlns.com/foaf/0.1/givenName> "Peter"@en ;
          <http://xmlns.com/foaf/0.1/surname> "Morris"@en ;
          ?p ?o .
}
````

<br>

### Query efficiency
Sometimes there are different possibilities for a query to ask for the same set of information which differ in efficiency. The heart of any query is the `WHERE`-clause and the order of its components and the functions it calls can speed things up or slow them down. Although the order of a graph pattern's triple in a `WHERE`-clause does not effect the query results, the ordering may have a huge effect on the speed of the query's execution. Here are a few rules of thumb one should keep in mind:
* You can speed up your searches if you reduce the search space as much as possible as soon as possible.
* The keywort `OPTIONAL` will very likely slow your query down considerably. The best optimization is to avoid the use of `OPTIONAL` whenever possible.
* Also the order of triple pattern influences the execution time. The fewer triples a triple pattern matches against the more it narrows down the search space and hence the faster the query processor will finish its job. Usually, a triple pattern with more unbound variables will match against more triples than a triple pattern with less unbound variables. Furthermore, the variable's position in the triple matters: a given dataset is more likely to have the same property in the predicate position of a large number of triples than in the subject position.
* Moving a `FILTER` statement earlier can help to reduce the serach space as long as all variables referenced in the `FILTER` statement have already been bound.
* The use of property paths can be expensive in terms of execution time.

Outside the `WHERE`-clause the following points should be kept in mind:
* Naming fewer variables in the `SELECT` statement can make the query run faster.
* Sorting of the returned values with `ORDER BY` costs some time.

<br>

### SPARQL Query Result Formats
The retrieved results can usually be returned in different formats, suitable for the different needs of different target groups. Standardized formats are: E**x**tensible **M**arkup **L**anguage (XML), **J**ava**S**cript **O**bject **N**otation (JSON), **C**omma-**S**eparated **V**alue (CSV) and **T**abular-**S**eparated **V**alue (TSV). These formats do not only differ in the syntax used to represent the query results, but also in the amount of metadata provided with the results. For our purposes especially the XML and the JSON formats are useful.

#### SPARQL Query Result XML Format
The SPARQL query result XML format describes a standard XML format for returning the results of a SPARQL query. The structure of a returned XML document is as follows:
* The document element is called `sparql` and it has two child elements - the `head` element lists the selected variable names and the `results` element contains the actual results.
* The returned results are stored in `result` children of the `results` element with a `binding` child for each bound variable.

#### SPARQL Query Result JSON Format
A JSON object is defined as “an unordered collection of zero or more name-value pairs, where a name is a string and a value is a string, number, boolean, null, object, or array.” The syntax is as follows:
* Objects are in curly braces.
* A name-value pair is separated by a colon. The name has to be unique within an object.
* A list of name-value pairs is delimited by commas.
* Arrays are in square braces.

The results of a `SELECT` query in JSON format are a table. The uppermost JSON object has two name-value pairs `head` and `results` - both have an object as their values. The variables the `SELECT` query asked for a stored in the `vars` value of the `head` object. The most important part of the `results` element is its `bindings` object. Each object in the `bindings` array has a name-value pair for each requested variable.

#### Python example scripts
If you have [Python 3](https://www.python.org/) installed on your computer the following SPARQL query can be stored in a file `testxml.py` and run from the directory where the file is stored with the command `python testxml.py`.

We query the dbpedia SPARQL endpoint for the ID of Jakob Bernoulli and return the result in XML format.
````
# Send SPARQL query to dbpedia SPARQL endpoint, store and output result in XML format.

import urllib.request

endpointURL = "http://dbpedia.org/sparql"
query = """
SELECT ?bernoulliID WHERE {
   <http://dbpedia.org/resource/Jakob_Bernoulli>
   <http://dbpedia.org/ontology/wikiPageID> ?bernoulliID . }
"""
escapedQuery = urllib.parse.quote(query)
requestURL = endpointURL + "?query=" + escapedQuery
request = urllib.request.Request(requestURL)
result = urllib.request.urlopen(request)
print (result.read())
````
The output in XML format looks as follows:
````
<sparql xmlns="http://www.w3.org/2005/sparql-results#"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.w3.org/2001/sw/DataAccess/rf1/result2.xsd">
 <head>
   <variable name="bernoulliID"/>
 </head>
 <results distinct="false" ordered="true">
   <result>
     <binding name="bernoulliID">
       <literal datatype="http://www.w3.org/2001/XMLSchema#integer">7500054</literal>
     </binding>
   </result>
 </results>
</sparql>
````
We are told that the bound variable is named "bernoulliID" and we receive the information that the questioned ID is a literal value, namely the integer 7500054.

The following SPARQL query can be stored in a file `testjson.py` and run from the directory where the file is stored with the command `python testjson.py`.

We query the dbpedia SPARQL endpoint for the labels of the resource "Switzerland" and return the result in JSON format.
````
# Query dbpedia SPARQL endpoint about labels of resource Switzerland

from SPARQLWrapper import SPARQLWrapper, JSON

sparql = SPARQLWrapper("http://dbpedia.org/sparql")
sparql.setQuery("""
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    SELECT ?label
    WHERE { <http://dbpedia.org/resource/Switzerland> rdfs:label ?label }
""")
sparql.setReturnFormat(JSON)
results = sparql.query().convert()

if (len(results["results"]["bindings"]) == 0):
    print ("No results found.")
else:
    for result in results["results"]["bindings"]:
        print(result["label"]["value"])
````

The output in JSON format looks as follows:
````
Switzerland
سويسرا
Schweiz
Suiza
Suisse
Svizzera
スイス
Zwitserland
Szwajcaria
Suíça
Швейцария
瑞士
````
Thus, the result is presented in list form.

#### Different ways to send queries
As we've seen in the last paragraph, SPARQL queries can be stored in a file and run from the command line with e.g. Python. However, there are other ways to send your query and the resulting output will differ slightly, depending on which way you chose. Here are a few examples if we query the dbpedia SPARQL endpoint about labels of the resource Switzerland as in the python example in the last paragraph.

If the query part of the script
````
SELECT ?label
    WHERE { <http://dbpedia.org/resource/Switzerland> rdfs:label ?label . }
````
is directly copied into the query text box of the Virtuoso SPARQL Query Editor at http://dbpedia.org/sparql and the results format is chosen as "JSON", the output looks as follows:
````
head:
   link:	[]
   vars:
    0:	"label"
results:
  distinct:	false
  ordered:	true
  bindings:
    0:
      label:
        type:	   "literal"
        xml:lang:	"en"
        value: 	"Switzerland"
    1:
      label:
        type:	   "literal"
        xml:lang:	"ar"
        value:	   "سويسرا"
    2:
      label:
        type:	   "literal"
        xml:lang:	"de"
        value:	   "Schweiz"
    3:
      label:
        type:	   "literal"
        xml:lang:	"es"
        value:	   "Suiza"
    4:
      label:
        type:	   "literal"
        xml:lang:	"fr"
        value:	   "Suisse"
    5:
      label:
        type:	   "literal"
        xml:lang:	"it"
        value:	   "Svizzera"
    6:
      label:
        type:	   "literal"
        xml:lang:	"ja"
        value:	   "スイス"
    7:
      label:
        type:	   "literal"
        xml:lang:	"nl"
        value:	   "Zwitserland"
    8:
      label:
        type:	   "literal"
        xml:lang:	"pl"
        value:	   "Szwajcaria"
    9:
      label:
        type:	   "literal"
        xml:lang:	"pt"
        value:	   "Suíça"
    10:
      label:
        type:	   "literal"
        xml:lang:	"ru"
        value:	   "Швейцария"
    11:
      label:
        type:	   "literal"
        xml:lang:	"zh"
        value:	   "瑞士"
````

Another possibility to retrieve the result of the same query is to send the whole query URL encoded via your browser. To URL encode your query, you can use a tool such as [URL Decode and Encode](https://www.urlencoder.org/):
````
http://dbpedia.org/sparql?query=SELECT%20%3Flabel%20WHERE%20%7B%20%0A%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2FSwitzerland%3E%20rdfs%3Alabel%20%3Flabel%20.%0A%7D
````
The result will be a table with included language tabs in HTML format:
````
label

"Switzerland"@en

"سويسرا"@ar

"Schweiz"@de

"Suiza"@es

"Suisse"@fr

"Svizzera"@it

"スイス"@ja

"Zwitserland"@nl

"Szwajcaria"@pl

"Suíça"@pt

"Швейцария"@ru

"瑞士"@zh
````

Or you can send the whole query URL encoded as HTTP GET request using e.g. Postman:
````
HTTP GET sent to http://dbpedia.org/sparql?query=SELECT%20%3Flabel%20WHERE%20%7B%20%0A%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2FSwitzerland%3E%20rdfs%3Alabel%20%3Flabel%20.%0A%7D
````
This retrieves the following result in JSON format:
````
<sparql xmlns="http://www.w3.org/2005/sparql-results#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.w3.org/2001/sw/DataAccess/rf1/result2.xsd">
 <head>
  <variable name="label"/>
 </head>
 <results distinct="false" ordered="true">
  <result>
   <binding name="label"><literal xml:lang="en">Switzerland</literal></binding>
  </result>
  <result>
   <binding name="label"><literal xml:lang="ar">سويسرا</literal></binding>
  </result>
  <result>
   <binding name="label"><literal xml:lang="de">Schweiz</literal></binding>
  </result>
  <result>
   <binding name="label"><literal xml:lang="es">Suiza</literal></binding>
  </result>
  <result>
   <binding name="label"><literal xml:lang="fr">Suisse</literal></binding>
  </result>
  <result>
   <binding name="label"><literal xml:lang="it">Svizzera</literal></binding>
  </result>
  <result>
   <binding name="label"><literal xml:lang="ja">スイス</literal></binding>
  </result>
  <result>
   <binding name="label"><literal xml:lang="nl">Zwitserland</literal></binding>
  </result>
  <result>
   <binding name="label"><literal xml:lang="pl">Szwajcaria</literal></binding>
  </result>
  <result>
   <binding name="label"><literal xml:lang="pt">Suíça</literal></binding>
  </result>
  <result>
   <binding name="label"><literal xml:lang="ru">Швейцария</literal></binding>
  </result>
  <result>
   <binding name="label"><literal xml:lang="zh">瑞士</literal></binding>
  </result>
 </results>
</sparql>
````

<br>

## Gravsearch queries
Gravsearch is a query language which is able to perform queries with complex search criteria that work well in terms of perforance and security. Furthermore, it enables clients to work with a simpler RDF data model than the one Knora actually uses to store data in the triplestore, and it permits to provide better error-checking than SPARQL.

A Gravsearch query isn't being processed directly by the triplestore. Instead, the query is interpreted by Knora, which enforces certain restrictions on the query, implements paging and permission checking. The API server then generates a SPARQL query based on the submitted Gravsearch query, queries the triplestore, filters the results according to the user’s permissions, and returns each page of query results as a Knora API response. Thus, Gravsearch is a hybrid between a RESTful API and a SPARQL endpoint.

A Gravsearch query conforms to a subset of the syntax of a [SPARQL CONSTRUCT](https://www.w3.org/TR/sparql11-query/#construct) query, with some additional restrictions and functionality. In particular, the variable representing the top-level (or ‘main’) resource that will appear in each search result must be identified, statements must be included to specify the types of the entities being queried, `OFFSET` is used to control paging, and `ORDER BY` is used to sort the results.

The current version of Gravsearch accepts `CONSTRUCT` queries whose `WHERE`-clauses use the following patterns, with the specified restrictions:

* `OPTIONAL`: cannot be nested in a `UNION`.
* `UNION`: cannot be nested in a `UNION`.
* `FILTER`: may contain a complex expression using the Boolean operators `AND` (&&) and `OR` (||), as well as comparison operators. The left argument of a comparison operator must be a query variable. A Knora ontology entity IRI used in a `FILTER` must be a property IRI.
* `FILTER NOT EXISTS`
* `MINUS`
* `OFFSET`: the `OFFSET` is needed for paging. It does not actually refer to the number of triples to be returned, but to the requested page of results. The default value is 0, which refers to the first page of results. The number of results per page is defined in `app/v2` in `application.conf`.
* `ORDER BY`: In SPARQL, the result of a `CONSTRUCT` query is an unordered set of triples. However, a Gravsearch query returns an ordered list of resources, which can be ordered by the values of specified properties. If the query is written in the complex schema, items below the level of Knora values may not be used in `ORDER BY`.
* `BIND`: The value assigned must be a Knora resource IRI.

<br>

### Gravsearch query examples
To send queries to our live-server it is easiest to use the program Postman. You have to chose the method `POST`. Open Postman and type
````
HTTP POST sent to https://api.dasch.swiss/v2/searchextended
````
Then click "Body" and chose "raw". You can then write your queries in the window before sending your request. Be aware, that only `CONSTRUCT` requests are supported by `knora-api`.

Here is one query examples, more will follow.
````
PREFIX beol: <http://api.dasch.swiss/ontology/0801/beol/simple/v2#>
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>

    CONSTRUCT {
        ?letter knora-api:isMainResource true .

        ?letter beol:creationDate ?date .

        ?letter ?linkingProp1  ?person1 .

        ?letter ?linkingProp2  ?person2 .

    } WHERE {
        ?letter a knora-api:Resource .
        ?letter a beol:letter .


    ?letter beol:letterHasTranslation ?translation .

    beol:letterHasTranslation knora-api:objectType knora-api:Resource .
    ?translation a knora-api:Resource .



        ?letter beol:creationDate ?date .

        beol:creationDate knora-api:objectType knora-api:Date .
        ?date a knora-api:Date .

        ?letter ?linkingProp1  ?person1 .

        ?linkingProp1 knora-api:objectType knora-api:Resource .
        FILTER(?linkingProp1 = beol:hasAuthor || ?linkingProp1 = beol:hasRecipient )

        ?person1 a beol:person .
        ?person1 a knora-api:Resource .

        ?person1 beol:hasIAFIdentifier ?gnd1 .
        FILTER(?gnd1 = "(DE-588)116610832")

        ?gnd1 a xsd:string .

        ?letter ?linkingProp2 ?person2 .
        ?linkingProp2 knora-api:objectType knora-api:Resource .

        FILTER(?linkingProp2 = beol:hasAuthor || ?linkingProp2 = beol:hasRecipient )

        ?person2 a beol:person .
        ?person2 a knora-api:Resource .

        ?person2 beol:hasIAFIdentifier ?gnd2 .
        FILTER(?gnd2 = "(DE-588)118696149")

        ?gnd2 a xsd:string .

        beol:hasIAFIdentifier knora-api:objectType xsd:string .

    } ORDER BY ?date

            OFFSET 0
````


