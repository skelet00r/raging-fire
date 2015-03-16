# Getting Started

Assumes mongod is installed, developed with mongo version 3.0.

```
npm install
```

A postinstall hook will run a grunt task that will generate the coverage report, documentation and start the server.

This has all been tested on Win 7 x64 (OSX and/or linux might have issues?)

### npm tasks

- ```npm start```
- ```npm test```

### Grunt tasks

- ```grunt test```
- ```grunt coverage```
- ```grunt docs```
- ```grunt changelog```
- ```grunt release```

### Structure

The api is contained with the api directory.

The project is split into three main sections.

endpoints, middleware and services.

#### Consumables

Consumable api docs can be found [here](consume-docs/readme.md)

#### Endpoints

Each endpoint has its own folder to keep structure self contained and modular

| File | Description |
|--------|--------|
|  route.js        |  contains all the routes for api/endpoint/router.js     |
|  route.controller.js        |  exports the route function handles the response data    |
|  route.model.js :: optional       |  retreives the data from mongo and validates the schema    |
|  route.spec.js        |  contains the test suites for the given route   |

#### Services


| File | Description |
|--------|--------|
|  service.js        |  contains all the logic for the service     |
|  service.spec.js        |  contains the test suites for the service  |


#### Middleware


| File | Description |
|--------|--------|
|  middleware.js        |  contains all the middleware logic    |
|  middleware.spec.js        |  contains the test suites for the middleware  |

##### Pre middleware

Pre middleware is attached to a catchall route before any endpoints are hit.

These middleware handle cors and request validation.

##### Post middleware

Post middleware is attached to a catchall route after all endpoint are hit(or not).

There is only one middleware in this group and that is the 404 catcher.

### Security

Small scale tests have been done but a full featured attack suite would fit better in this case to automate testing against common/known exploits.

#### Authentication
There is no concept of authentication so anyone can post and edit.

#### CORS
If there is it is matched against a whitelist and then the allow-origin header is set with that origin. If not then the request is denied.

#### INJECTION
The post controller checks the req.query.id for existence and then sanitises the input using sanitizer. If an object is passed it is converted into a string and the request fails.

```
	https://gist.github.com/mchow01/49f8979829f1c488d922
```