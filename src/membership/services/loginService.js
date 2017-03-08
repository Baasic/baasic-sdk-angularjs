/* globals module */
/**
 * @module baasicLoginService
 * @description Baasic Register Service provides an easy way to consume Baasic Application Registration REST API end-points. 
 */
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicLoginService', ['baasicApp',
        function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the login action has been performed. This action logs user into the application and success response returns the token resource.
                 * @method        
                 * @example 
baasicLoginService.login({
  username : '<username>',
  password : '<password>',
  options : ['session', 'sliding']
})
.success(function (data) {
  // perform success actions here
})
.error(function (data, status) {
  // perform error handling here
})
.finally (function () {});       
                 **/
                login: function login(data) {
                    return baasicApp.membership.login.login(data);
                },
                /**
				* Returns a promise that is resolved once the loadUserData action has been performed. This action retrieves the account information of the currently logged in user. Retrieved account information will contain permission collection which identifies access policies assigned to the user and application sections.
				* @method
				* @example
baasicLoginService.loadUserData()
.success(function (data) {
  // perform success actions here
})
.error(function (data) {
  // perform error handling here
})
.finally (function () {});				
				*/
                loadUserData: function loadUserData(data) {
                    return baasicApp.membership.login.loadUserData(data);
                },
                /**
				* Returns a promise that is resolved once the logout action has been performed. This action invalidates user token logging the user out of the system.
				* @method
				* @example
var token = baasicAuthorizationService.getAccessToken();
baasicLoginService.logout(token.access_token, token.token_type)
.error(function (data) {
  // perform error handling here
})
.finally (function () {});				
				*/
                logout: function logout(token, type) {
                    return baasicApp.membership.login.logout(token, type);
                },
                /**
                 * Provides direct access to route definition.
                 * @method        
                 * @example baasicLoginService.routeService.get('<id>', expandObject);
                 **/
                routeService: baasicApp.membership.login.routeDefinition,
                social: {
                    /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns a resolved social login provider Url.
                    * @method social.get
                    * @example 
baasicLoginService.social.get('<provider>', '<returnUrl>')
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/
                    get: function (provider, returnUrl) {
                        return baasicApp.membership.loginSocial.get(provider, returnUrl);
                    },
                    /**
                    * Returns a promise that is resolved once the post action has been performed. This action logs user into the application and success response returns the token resource.
                    * @method social.post
                    * @example 
var postData = {
  email : '<email>',
  code:'<code>',
  activationUrl : '<activationUrl>',
  oAuthToken : '<oAuthToken>',
  oAuthVerifier : '<oAuthVerifier>',
  password : '<password>',
  returnUrl : '<returnUrl>'
};                    
baasicLoginService.social.post('<provider>', postData)
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/
                    post: function (provider, data, options) {
                        return baasicApp.membership.loginSocial.post(provider, data, options);
                    },
                    /**
                     * Parses social provider response parameters.
                     * @method social.parseResponse
                     * @example baasicLoginService.social.parseResponse('<provider>');
                     **/
                    parseResponse: function (provider, returnUrl) {
                        return baasicApp.membership.loginSocial.parseResponse(provider, returnUrl);
                    },
                    /**
                     * Provides direct access to route definition.
                     * @method        
                     * @example baasicLoginService.social.routeService.get('<id>', expandObject);
                     **/
                    routeService: baasicApp.membership.loginSocial.routeDefinition
                }
            };

        }
    ]);
}(angular, module));
/**
 * @overview 
 ***Notes:**
 - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/