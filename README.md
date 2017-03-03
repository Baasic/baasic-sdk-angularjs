# Baasic AngularJS SDK

Baasic AngularJS library provides integration access to [Baasic REST API](http://dev.baasic.com/api/reference/home) core end-points.

## Dependencies

Baasic AngularJS library has the following dependencies:

* [Baasic JavaScript SDK](../../../baasic-sdk-javascript)
* [AngularJS](http://www.angularjs.org/) (>= 1.2.16)
* [HAL Parser](../../../angular-hal)
* [URI Template](../../../uritemplate-js)

## Usage

This section will describe how to add the Baasic AngularJS library to your project. It's important to know that Baasic AngularJS SDK uses HAL+JSON format for the back-end communication. You can find out more about HAL format [here](http://stateless.co/hal_specification.html).

### Adding the Library to your Project

Please add the following lines of code after the AngularJS include:

```html
<script src='/js/hal-parser.js'></script>
<script src='/js/uritemplate-min.js'></script>
<script src='/js/baasic-angularjs-2.0.0.min.js'></script>
```

### Initialization

To be able to use the library you will need to add the Baasic (_baasic.api_) dependency to your AngularJS module.

```javascript
angular.module('my-module', ["baasic.api"])
```

### Application Configuration

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

## Build Process

1. Install [NodeJs](http://nodejs.org/download/)
2. Open Shell/Command Prompt in the Baasic AngularJS folder
3. Run `npm install`
4. Install gulp globally: `npm install -g gulp`
5. Run `gulp`

## Contributing

##### Pull requests are always welcome

We appreciate pull requests you make, and we'll do our best to process them as quickly as we can. Even if it's just a typo you found or any small or large issue you fixed - please do it! It will help us a lot.

If your pull request is not accepted on your first try, don't be discouraged! If there's a problem with your implementation, hopefully you received feedback on what to improve.

##### Issue reporting

Before you create a new issue, please make sure it hasn't already been reported. In case it already exists simply add a quick _"+1"_ or _"I have the same problem"_ to the existing issue thread.

##### Other

* Help us write the documentation
* Create interesting apps using SDK
* Looking for something else to do? Get in <u>touch</u> ...
