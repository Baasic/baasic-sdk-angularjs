# Baasic AngularJS SDK Bundle

The Baasic AngularJS SDK bundle provides integration access to all Baasic Services [REST API](https://api.baasic.com/vX).

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
