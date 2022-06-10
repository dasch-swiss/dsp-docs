/*
 * Copyright © 2021 Data and Service Center for the Humanities and/or DaSCH Service Platform contributors.
 * SPDX-License-Identifier: Apache-2.0
 */

import { sessionResponseFormats } from "../sessionResponseFormats"

let login:sessionResponseFormats.loginResponse = {
    "status":0,
    "message":"credentials are OK",
    "sid":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3ZWJhcGkiLCJzdWIiOiJodHRwOi8vcmRmaC5jaC91c2Vycy9tdWx0aXVzZXIiLCJhdWQiOiJ3ZWJhcGkiLCJpYXQiOjE1MTIxMzc2ODEsImV4cCI6MTUxNDcyOTY4MSwianRpIjoiZTMzY2M4MzYtYjVmYy00Yzc4LWIyNWYtOGE1OWQ4MmViNmFmIn0.lYv_LOnyE1yGtJcMs8tOjD-LeGZVTiwEEnur0BiWfnw",
    "userProfile":{
        "userData":{
            "email":"multi.user@example.com",
            "firstname":"Multi",
            "user_id":"http://rdfh.ch/users/multiuser",
            "lastname":"User",
            "status":true,
            "token":null,
            "lang":"de",
            "password":null
        },
        "groups":[
            "http://rdfh.ch/groups/00FF/images-reviewer"
        ],
        "projects_info":{
            "http://rdfh.ch/projects/00FF":{
                "shortname":"images",
                "description":"A demo project of a collection of images",
                "institution":null,
                "shortcode":"00FF",
                "logo":null,
                "id":"http://rdfh.ch/projects/00FF",
                "status":true,
                "selfjoin":false,
                "keywords":"images, collection",
                "longname":"Image Collection Demo",
                "ontologies":["http://www.knora.org/ontology/00FF/images"]
            },
            "http://rdfh.ch/projects/0803":{
                "shortname":"incunabula",
                "description":"<p>Das interdisziplinäre Forschungsprojekt \"<b><em>Die Bilderfolgen der Basler Frühdrucke: Spätmittelalterliche Didaxe als Bild-Text-Lektüre</em></b>\" verbindet eine umfassende kunstwissenschaftliche Analyse der Bezüge zwischen den Bildern und Texten in den illustrierten Basler Inkunabeln mit der Digitalisierung der Bestände der Universitätsbibliothek und der Entwicklung einer elektronischen Edition in der Form einer neuartigen Web-0.2-Applikation.\n</p>\n<p>Das Projekt wird durchgeführt vom <a href=\"http://kunsthist.unibas.ch\">Kunsthistorischen Seminar</a> der Universität Basel (Prof. B. Schellewald) und dem <a href=\"http://www.dhlab.unibas.ch\">Digital Humanities Lab</a> der Universität Basel (PD Dr. L. Rosenthaler).\n</p>\n<p>\nDas Kernstück der digitalen Edition besteht aus rund zwanzig reich bebilderten Frühdrucken aus vier verschiedenen Basler Offizinen. Viele davon sind bereits vor 1500 in mehreren Ausgaben erschienen, einige fast gleichzeitig auf Deutsch und Lateinisch. Es handelt sich um eine ausserordentlich vielfältige Produktion; neben dem Heilsspiegel finden sich ein Roman, die Melusine,  die Reisebeschreibungen des Jean de Mandeville, einige Gebets- und Erbauungsbüchlein, theologische Schriften, Fastenpredigten, die Leben der Heiligen Fridolin und Meinrad, das berühmte Narrenschiff  sowie die Exempelsammlung des Ritters vom Thurn.\n</p>\nDie Internetpublikation macht das digitalisierte Korpus dieser Frühdrucke  durch die Möglichkeiten nichtlinearer Verknüpfung und Kommentierung der Bilder und Texte, für die wissenschaftliche Edition sowie für die Erforschung der Bilder und Texte nutzbar machen. Auch können bereits bestehende und entstehende Online-Editionen damit verknüpft  werden , wodurch die Nutzung von Datenbanken anderer Institutionen im Hinblick auf unser Corpus optimiert wird.\n</p>",
                "institution":null,
                "shortcode":null,
                "logo":"incunabula_logo.png",
                "id":"http://rdfh.ch/projects/0803",
                "status":true,
                "selfjoin":false,
                "keywords":"Basler Frühdrucke, Inkunabel, Narrenschiff, Wiegendrucke, Sebastian Brant, Bilderfolgen, early print, incunabula, ship of fools, Kunsthistorischs Seminar Universität Basel, Late Middle Ages, Letterpress Printing, Basel, Contectualisation of images",
                "longname":"Bilderfolgen Basler Frühdrucke",
                "ontologies":["http://www.knora.org/ontology/0803/incunabula"]
            },
            "http://rdfh.ch/projects/0001":{
                "shortname":"anything",
                "description":"Anything Project",
                "institution":null,
                "shortcode":null,
                "logo":null,
                "id":"http://rdfh.ch/projects/0001",
                "status":true,
                "selfjoin":false,
                "keywords":null,
                "longname":"Anything Project",
                "ontologies":["http://www.knora.org/ontology/0001/anything"]
            }
        },
        "sessionId":null,
        "isSystemUser":false,
        "permissionData":{
            "groupsPerProject":{
                "http://rdfh.ch/projects/0803":[
                    "http://www.knora.org/ontology/knora-base#ProjectMember",
                    "http://www.knora.org/ontology/knora-base#ProjectAdmin"
                ],
                "http://rdfh.ch/projects/00FF":[
                    "http://rdfh.ch/groups/00FF/images-reviewer",
                    "http://www.knora.org/ontology/knora-base#ProjectMember",
                    "http://www.knora.org/ontology/knora-base#ProjectAdmin"
                ],
                "http://rdfh.ch/projects/0001":[
                    "http://www.knora.org/ontology/knora-base#ProjectMember",
                    "http://www.knora.org/ontology/knora-base#ProjectAdmin"
                ]
            },
            "administrativePermissionsPerProject":{
                "http://rdfh.ch/projects/0803":[
                    {
                        "name":"ProjectAdminAllPermission",
                        "additionalInformation":null,
                        "v1Code":null
                    },
                    {
                        "name":"ProjectResourceCreateAllPermission",
                        "additionalInformation":null,
                        "v1Code":null
                    }
                ],
                "http://rdfh.ch/projects/00FF":[
                    {
                        "name":"ProjectAdminAllPermission",
                        "additionalInformation":null,
                        "v1Code":null
                    },
                    {
                        "name":"ProjectResourceCreateAllPermission",
                        "additionalInformation":null,
                        "v1Code":null
                    }
                ],
                "http://rdfh.ch/projects/0001":[
                    {
                        "name":"ProjectAdminAllPermission",
                        "additionalInformation":null,
                        "v1Code":null
                    },
                    {
                        "name":"ProjectResourceCreateAllPermission",
                        "additionalInformation":null,
                        "v1Code":null
                    }
                ]
            },
            "anonymousUser":false
        }
    }
};
