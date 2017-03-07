# Baasic Files AngularJS SDK

Baasic AngularJS Files library provides access to [Baasic REST API](http://dev.baasic.com/api/reference/home) files end-points.

## Dependencies

Baasic AngularJS Files library has the following dependencies:

* [Baasic Core AngularJS SDK](../../../baasic-sdk-angularjs-core)

## Usage

### Adding the Library to your Project

Please add the _Baasic Files_ include after the _Baasic Angular Core_ include:

```html
<script src='/js/baasic-angular-core-1.0.0.min.js'></script>
<script src='/js/baasic-angular-files-1.0.0.min.js'></script>
```
### Initialization

To be able to use the library you will need to add the Baasic (_baasic.files_) dependency to your AngularJS module.

```javascript
angular.module('my-module', ["baasic.api", "baasic.files"])
```
## Build Process

1. Install [NodeJs](http://nodejs.org/download/)
2. Open Shell/Command Prompt in the Baasic AngularJS folder
3. Run `npm install`
4. Install gulp globally: `npm install -g gulp`
5. Run `gulp`

## Contributing

* [Pull requests are always welcome](../../../baasic-sdk-angularjs-files/pulls)
* Please [report](../../../baasic-sdk-angularjs-files/issues) any issues you might have found
* Help us write the documentation
* Create interesting apps using SDK
* Looking for something else to do? Get in <u>touch</u> ...
