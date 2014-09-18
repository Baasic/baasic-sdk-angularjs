(function (angular, module, undefined) {
    "use strict";
    var permissionHash = {};
    module.service("baasicAuthorizationService", ["$rootScope", "baasicApp",
        function ($rootScope, baasicApp) {
            var app = baasicApp.get();
            var apiKey = app.get_apiKey();
            permissionHash[apiKey] = {};

            return {
                getUser: function getUser() {
                    var user = app.get_user();
                    if ($rootScope.user === undefined &&
                            user.user !== undefined) {
                        $rootScope.user = user.user;
                    }
                    return user.user;
                },
                setUser: function setUser(user) {
                    if (user) {
                        var token = user.accessToken;
                        delete user.accessToken;

                        app.set_user(user, token);
                        user.isAuthenticated = true;
                        $rootScope.user = user;
                    } else {
                        app.set_user(null);
                        this.resetPermissions();
                        $rootScope.user = {
                            isAuthenticated: false
                        };
                    }
                },
                updateUser: function updateUser(user) {
                    if (!user.accessToken) {
                        user.accessToken = this.getAccessToken();
                    }

                    var currentUser = this.getUser();
                    angular.extend(currentUser, user);

                    this.setUser(currentUser);
                },
                getAccessToken: function getAccessToken() {
                    return app.get_accessToken();
                },
				resetPermissions: function () {
                    permissionHash[apiKey] = {};
                },
                hasPermission: function (authorization) {
                    if (permissionHash[apiKey].hasOwnProperty(authorization)) {
                        return permissionHash[apiKey][authorization];
                    }

                    var user = this.getUser();
                    if (user === undefined) {
                        return;
                    }

                    var hasPermission = false;

                    if (user.permissions) {
                        var tokens = authorization.split(".");
                        if (tokens.length > 0) {
                            var section = tokens[0];

                            var sectionPermissions = user.permissions[section];
                            if (sectionPermissions) {
                                if (tokens.length > 1) {
                                    var action = tokens[1].toLowerCase();
                                    for (var i = 0; i < sectionPermissions.length; i++) {
                                        if (sectionPermissions[i].toLowerCase() == action) {
                                            hasPermission = true;
                                            break;
                                        }
                                    }
                                } else {
                                    hasPermission = true;
                                }
                            }
                        }
                    }

                    permissionHash[apiKey][authorization] = hasPermission;
                    return hasPermission;
                }
            };
        }]);
}(angular, module));