# Baasic User Profile AngularJS SDK

Baasic AngularJS User Profile library provides access to [Baasic REST API](http://dev.baasic.com/api/reference/home) user profile end-points.

## Dependencies

Baasic AngularJS User Profile library has the following dependencies:

* [Baasic Core AngularJS SDK](../../../baasic-sdk-angularjs-core)

## Usage

### Adding the Library to your Project

Please add the _Baasic User Profile_ include after the _Baasic Angular Core_ include:

```html
<script src='/js/baasic-angular-core-1.0.0.min.js'></script>
<script src='/js/baasic-angular-user-profile-1.0.0.min.js'></script>
```
### Initialization

To be able to use the library you will need to add the Baasic (_baasic.userProfile_) dependency to your AngularJS module.

```javascript
angular.module('my-module', ["baasic.api", "baasic.userProfile"])
```
## Build Process

1. Install [NodeJs](http://nodejs.org/download/)
2. Open Shell/Command Prompt in the Baasic AngularJS folder
3. Run `npm install`
4. Install gulp globally: `npm install -g gulp`
5. Run `gulp`

## Contributing

* [Pull requests are always welcome](../../../baasic-sdk-angularjs-user-profile/pulls)
* Please [report](../../../baasic-sdk-angularjs-user-profile/issues) any issues you might have found
* Help us write the documentation
* Create interesting apps using SDK
* Looking for something else to do? Get in <u>touch</u> ...
