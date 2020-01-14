# SIPI basics

<br>

## The media server SIPI
The **S**imple **I**mage **P**resentation **I**nterface (Sipi) takes care of storing, converting and serving image, audio and video files as well as other documents such as pdf files. It is designed to be used by all institutions that need to preserve high-quality images and to make them available online.

SIPI implements the **I**nternational **I**mage **I**nteroperability **F**ramework ([IIIF](https://iiif.io/)), which aims at supporting interoperability between different image repositories. SIPI efficiently converts lossless between image formats while preserving the metadata contained in the image files. If images are stored in [JPEG 2000](https://jpeg.org/jpeg2000/) format, SIPI can convert them on the fly to formats that are commonly used on the Internet. 
SIPI is written in C++ and runs on Linux and Mac OS X. It offers a flexible framework for specifying authentication and authorization logic which is obtained by scripts written in the scripting language [Lua](https://www.lua.org/). SIPI supports restricted access to images, either by reducing the image dimensions or by adding watermarks to the images. 

<br>

## Interaction of Knora and SIPI
If a file is requested from SIPI by e.g. an image link served by [Knora](../../knora/documentation/index.md), a preflight function is called. This function needs three parameters: a prefix, the identifier (the name of the requested file) and a cookie. All file links created by Knora use the prefix `knora`. An example link from our incunabula project may look as follows: `0.0.0.0:1024/knora/incunabula_0000000002.jp2/full/2613,3505/0/default.jpg`.
**WORKING EXAMPLE NEEDED! LINK RETURNS "Unauthorized: Unauthorized access" ... NOT PERFECT**

Based on the provided information, SIPI asks Knora about the permissions on the file in question of the current user. Therefore, the cookie is needed: it contains the current user's Knora session ID. Hence, Knora can match SIPI's request with a given user profile and tell SIPI the permissions this user has on the requested file. If the user has sufficient permissions, the file is served in full quality. If the user has only preview rights, SIPI serves a reduced quality of the file or integrates a watermark. If the user has no permissions, SIPI refuses to serve the file. However, all of this behaviour is defined in the preflight function in SIPI and not controlled by Knora. Knora only provides the permission code.

Thus, Knora and SIPI stick to a clear division of responsibility regarding files: Knora knows about the names of files that are attached to resources as well as some metadata and is capable of creating the URLs for the client to request them from SIPI, but the whole handling of files (storing, naming, organization of the internal directory structure, format conversions, and serving) is taken care of by SIPI.

When a user creates a resource with a digital representation attached to it in Knora either via the **G**raphical **U**ser **I**nterface (GUI) or directly via the **A**pplication **P**rogramming **I**nterface (API), the file is directly sent to SIPI to calculate a thumbnail hosted by SIPI which then gets displayed to the user in the browser. SIPI copies the original file into a temporary directory and keeps it there for later processing in another request. In its answer in [JSON](http://www.json.org/) format, SIPI returns the path to the thumbnail, the name of the temporarily stored original file managed by SIPI, the mime type of the original file and the original name of the file submitted by the client. At the moment when the user wants to attach the file to a resource, the request is sent to Knora’s API providing all the required parameters to create the resource along with additional information about the file to be attached. The file itself is not submitted to the Knora API, but its filename returned by SIPI.