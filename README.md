# Storeroom 83

Inventory and asset management application built using MEAN stack (MongoDB, Express.js, Angular.js, and Node.js).  This application is a work in progress.  Over time it will develop into a full-scale inventory management and asset management application.  In the meantime, it will serve to demonstrate the latest techniques for developing robust single page web applications based around the MEAN stack.  It will also embrace continuous integration and testing workflows using Grunt, Karma, Protractor.

Some of the technologies planned for Storeroom 83 include:

#### Client Side Technologies

* HTML 5
* Twitter Bootstrap 3.1.x
* angularjs
* ui-router (angular routing framework)
* Restacular (angular REST support)
* angular-ui (useful directives for angular)
* angular-cache (drop in replacement caching mechanism)

#### Server Side Technologies

* Node.js
* MongoDB  (persistent storage)
* Express.js  (web application framework built on top of Connect for Node.js)
* Mongoose (schema based domain modeling)
* Elastisearch
* Passport (authentication)

#### Package Management

* npm
* Bower

#### Testing/Continuous Integration

* Jasmine (client side tests)
* Karma (client side test runner)
* Mocha (server side tests)
* Grunt (build/task automation)
* Protractor

#### Source Repository

* Git/GitHub (where else?)

## Installation Instructions

### Prerequisites

#### Node JS

You will need Node.js.  If you don't have it installed already, you can find an installer for your operating system [here](http://nodejs.org "Get NodeJS"). The node installer will also install **npm**.  This project is currently using Node 0.10.26.

Once you have Node installed, clone the repo into a directory of your choice. Then run npm install from within the newly created project directory. This will download and install all the dependencies listed in the package.json file.

```
$ npm install
```

#### Grunt

`npm install` will install grunt into your local development/project directory.  However, you will also want the grunt command line interface (cli).  This should be installed globally. Note that you may prefer to use "sudo" when doing global installs to avoid permission issues.

```
$ npm install -g grunt-cli
```

#### Bower

You will also need Bower installed globally.  Bower uses npm so make sure you have installed Node first. To install Bower globally:

```
$ npm install -g bower
```

Once this is complete, run bower install from within the working directory.  This will download and install all of the 3rd party javascript, css, and related files into a directory `bower_components`.

```
$ bower install
```

#### Mocha

To execute the server-side mocha tests from the command line you will want to install mocha globally:

```
$ npm install -g mocha
```

#### MongoDB

Storeroom83 requires MongoDB.  To install MongoDB, follow the instructions in the [MongoDB Manual](http://docs.mongodb.org/manual/). You will also need to create a data/db directory within the project directory.  The MongoDB data directory COULD be located anywhere, however the startup script start_mongodb.sh assumes there is a ./data/db directory within the current project directory.  After installing MongoDB, execute the startup script:

```
$ ./start_mongodb.sh
```

If you have problems executing the script, make sure the script has execute permissions:

```
$ sudo chmod +x start_mongodb.sh
```

*IMPORTANT*

If you use ./start_mongodb.sh shell script in the project to start Mongo, you will need perform a ONE-TIME task to initialize the replica set that is referenced in the startup script.  After starting Mongo, open a mongo command shell:

```
$ mongo
```

In the command shell execute the following:

```
> rs.initiate()
```

This will initialize the replica set for the instance.  A replica set is required, even if you are running a standalone instance. The Elasticsearch MongoDB River Connector (installed below), requires the op log features provided by the replica set.  If you do not start your MongoDB instance with the ./start_mongodb.sh shell script, you must configure the replica set yourself. To do so, follow the procedures [here](http://docs.mongodb.org/manual/tutorial/convert-standalone-to-replica-set/).

#### Elasticsearch

Storeroom83 now relies on Elasticsearch for its search capability.  To install Elasticsearch, following the instructions [here](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/setup.html).

Once Elasticsearch is installed, set an env variable 'ELASTICSEARCH_HOME' to the path to your Elasticsearch install directory (do not include the 'bin' in the env variable).  If you haven't already started Elasticsearch, you may do so by executed the following script located in the root of the project directory

```
$ ./start_elasticsearch
```

You must also configure Elasticsearch with the [mongodb-river plugin](https://github.com/richardwilly98/elasticsearch-river-mongodb).  The mongodb-plugin uses the *river* functionality of elasticsearch to update the indexes (which you will build below) whenever there is a change to a document in the mongo collection associated with the *river*.  An elasticsearch *river* is created for each entity (i.e. mongo collection) that is searchable (see Building the Elasticsearch Indexes below). This plugin also relies on the elasticsearch-mapper-attachment plugin which must be installed as well.  The complete installation instructions can be found [here](https://github.com/richardwilly98/elasticsearch-river-mongodb/wiki).  However, they can be condensed into 2 install commands as follows:

```
$ cd %ELASTICSEARCH_HOME%
$ .\bin\plugin -install elasticsearch/elasticsearch-mapper-attachments/1.9.0
$ .\bin\plugin -install com.github.richardwilly98.elasticsearch/elasticsearch-river-mongodb/2.0.0
```

#### Seeding the Database

If you have set up MongoDB, you can seed the database with a few objects to get started.  Currently, there is a single User, a small number of Storerooms, and approximately 651 Items in the seed data.  To seed the development database execute the following Grunt tasks:

```
$ grunt dropDevDatabase // drops dev database
```

```
$ grunt addDevUsers // adds admin user
```

```
$ grunt addDevStorerooms // add storerooms
```

```
$ grunt addDevItems // add items
```

### Building Storeroom83

There is a pre-configured Gruntfile with some tasks pre-defined for building the application.  Run:

```
$ grunt build
```

This will execute several tasks including cleaning any existing files, copying resources to the public (i.e. build) directory, compiling less files into css and copying, and concatenating application javascript files into a small number of files that are referenced by the index.html page.

### Starting Node

To start node, run the following command:

```
$ npm start
```

You should see:

```
Server listening on port 3000
```

Navigate to [http://localhost:3000](http://localhost:3000)

### Build the Elasticsearch Indexes

To set up elasticsearch, you must create the indexes (with associated mappings) and the rivers (with associated river configuration) for each entity that is searchable.  To do so, execute the shell command 'elasticsearch_setup.sh' (first make sure you installed the mongodb-river and elasticsearch-mapper-attachment plugins as described above).  This will drop all the indexes and rivers (if they exist) and build new ones from scratch.  Any entities that are in the mongodb database will automatically be indexed.

```
$ ./elasticsearch_setup
```

Now when you navigate to [http://localhost:3000/inventory/items](http://localhost:3000/inventory/items) you should see the items in the list. Note, you may be required to login.  Currently, there is only 1 admin user.  Just click the 'Login' button on the login page.

## Running Tests

To run unit tests you can execute the "test" grunt task:

```
$ grunt test
```

This will execute the Jasmine and Mocha unit tests.  Note the client side Jasmin spec files are co-mingled in the src/app directory next to production code per [Google's new recommended file layout](http://blog.angularjs.org/2014/02/an-angularjs-style-guide-and-best.html).  The client side tests will run in a headless (PhantomJS) browser using the karma test runner.  The server-side mocha tests spin up an instance of the express server so that routes can be tested.

## Development Workflow

Running the default grunt task will build the files and create "watchers" on the various files in the src directory.  If any of these files change, its associated grunt task is executed (such as compiling less files into public css directory or concatenating application javascript files into the public/js directory).  Also, whenever any javascript files change, the karma test runner will execute the unit tests and output the results in the terminal.

### Webstorm

[Webstorm](http://www.jetbrains.com) is a fantastic IDE will outstanding support for all of these technologies.  Version 8 has improved support for angular js and it comes will some outstanding tools and support for Grunt and Karma.  It is highly recommended.





