/* globals module */
/**
 * @module baasicAuthorizationService
 * @description Baasic Authorization Service provides an easy way to consume Baasic Application Authorization REST API end-points.
 */
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicAuthorizationService', ['$rootScope', '$document', 'baasicApp',
        function ($rootScope, $document, baasicApp) {
            var app = baasicApp.get(),
                apiKey = app.getApiKey();

            angular.element($document).bind('tokenExpired', function () {
                var user = app.getUser();
                if ($rootScope.user !== undefined &&
                    user !== undefined) {
                    $rootScope.user.isAuthenticated = user.isAuthenticated();
                }
            });

            return {
                /**
                 * Gets the currently logged in user.
                 * @method        
                 * @example baasicAuthorizationService.getUser();
                 **/
                getUser: function getUser() {
                    var user = app.getUser();
                    if ($rootScope.user === undefined &&
                        user.user !== undefined) {
                        $rootScope.user = user.user;
                    }
                    return user.user;
                },
                /**
                 * Sets the current user information. If no user information is provided, the user information will be cleared from the storage and rootScope.
                 * @method        
                 * @example baasicAuthorizationService.setUser(null);
                 **/
                setUser: function setUser(user) {
                    if (user) {
                        app.setUser(user);
                        user.isAuthenticated = true;
                        $rootScope.user = user;
                    } else {
                        app.setUser(null);
                        this.resetPermissions();
                        $rootScope.user = {
                            isAuthenticated: false
                        };
                    }
                },
                /**
                * Updates current user information with new data.
                * @method        
                * @example
baasicLoginService.loadUserData()
.success(function (data) {
  // Update user information with refreshed data
  baasicAuthorizationService.updateUser(data);
})
.error(function (data) {})
.finally (function () {});				
                **/
                updateUser: function updateUser(user) {
                    var currentUser = this.getUser();
                    if (currentUser) {
                        angular.extend(currentUser, user);
                    } else {
                        currentUser = user;
                    }

                    this.setUser(currentUser);
                },
                /**
                 * Retrives current user's access token.
                 * @method        
                 * @example baasicAuthorizationService.getAccessToken();
                 **/
                getAccessToken: function getAccessToken() {
                    return app.getAccessToken();
                },
                /**
                * Stores access token information.
                * @method        
                * @example
baasicLoginService.login({
  username : '<username>',
  password : '<password>',
  options : ['session', 'sliding']
})
.success(function (data) {
  // Store token information
  baasicAuthorizationService.updateAccessToken(data);
})
.error(function (data, status) {})
.finally (function () {});				
                **/
                updateAccessToken: function updateAccessToken(token) {
                    return app.updateAccessToken(token);
                },
                /**
                * Resets user permissions.
                * @method        
                * @example
baasicLoginService.loadUserData()
.success(function (data) {
  baasicAuthorizationService.resetPermissions();
  baasicAuthorizationService.updateUser(data);
})
.error(function (data) {})
.finally (function () {});				
                **/
                resetPermissions: function () {
                    app.membership.permissions.resetPermissions();
                },
                /**
                 * Checks if current user has permissions to perform a certain action. To optimize performance this information is cached and can be reset using the resetPermissions action. Permissions cache should be reset when updated user information is set.
                 * @method        
                 * @example baasicAuthorizationService.hasPermission("<baasic-Section>.<action>");				
                 **/
                hasPermission: function (authorization) {
                    return app.membership.permissions.hasPermission(authorization);
                }
            };
        }
    ]);
}(angular, module));
/**
 * @copyright (c) 2017 Mono Ltd
 * @license MIT
 * @author Mono Ltd
 */