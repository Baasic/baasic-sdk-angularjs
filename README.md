# Baasic AngularJS SDK Bundle

The Baasic AngularJS SDK bundle provides integration access to all [Baasic REST API](http://dev.baasic.com/api/reference/home) end-points.

## Dependencies

Baasic AngularJS Core library has the following dependencies:

* [Baasic JavaScript Framework](../../../baasic-sdk-javascript)
* [AngularJS](http://www.angularjs.org/) (>= 1.2.16)
* [HAL Parser](../../../angular-hal)
* [URI Template](../../../uritemplate-js)

## Application Configuration

Baasic AngularJS library allows you to use multiple Baasic applications in your AngularJS modules. To initialize a Baasic application you will need to add the following code to you module configuration:

```javascript
module.config(["baasicAppProvider",
    function (baasicAppProvider) {
        var app = baasicAppProvider.create("my-app-identifier", {
            apiRootUrl: "api.baasic.com",
            apiVersion: "<version>"
        });
    }]);
```

**Note:** _To obtain a Baasic Application Identifier please create your application on [Baasic Registration](https://dashboard.baasic.com/register/) page._

## Baasic Modules

Baasic back-end contains various built-in modules that can be easily consumed through the Baasic AngularJS library. Baasic Developer Center contains detailed information about all the core modules supported by the [AngularJS library](http://dev.baasic.com/sdk#AngularJS).

## Upgrading the package

- update _bower.json_ version and add new dependencies
- update _package.json_ version and add new dependencies
- update _baasic-sdk-angular.nuspec_ version and add new dependencies upon _nuget.exe pack_ action

## How to build a package

- commit and push changes to GIT
- execute _npm install_ in command line or shell tool
- execute _bower install_ in command line or shell tool
- execute _gulp_
- commit and push changes to GIT
- create new GIT Tag with the version used in the _upgrading the package_ procedure

## How to create a new version

- commit and push changes to GIT
- execute _npm install_ in command line or shell tool
- execute _bower install_ in command line or shell tool
- update _bower.json_ version and add new dependencies
- update _package.json_ version and add new dependencies
- execute _gulp_
- update _baasic-sdk-angular.nuspec_ version and add new dependencies upon _nuget.exe pack_ action
- commit and push changes to GIT
- create new GIT Tag with the version used in the _upgrading the package_ procedure
