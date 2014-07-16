(function (angular, undefined) {
    var module = angular.module("baasic.baasicApi", ["HALParser"]);

    module.config(["$provide", function config($provide) {
        function browserSupportCredentialsWithCookies() {
            return ('withCredentials' in new XMLHttpRequest()) && !(window.ActiveXObject || "ActiveXObject" in window);
        }

        if (!browserSupportCredentialsWithCookies()) {
            $provide.decorator("$httpBackend", ["$delegate", "$q", "$rootScope", "$window", "$document", "baasicApp", function initBaasicProxy($delegate, $q, $rootScope, $window, $document, baasicApp) {
                var apps = baasicApp.all();
                //TODO: Fix the apiUrl issue in case of multi-application environment
                var apiUrl = apps[0].get_apiUrl();

                var apiUrlRegexPattern = "";
                for (var i = 0; i < apps.length; i++) {
                    apiUrlRegexPattern += "|" + regExpEscape(apps[i].get_apiUrl());
                }

                var apiUrlRegex = new RegExp("^" + apiUrlRegexPattern.substring(1));

                var proxyFrame = [];
                var requestHash = {};
                var nextRequestId = 0;
                var sendMessage = sendMessageToQueue;

                var injectFrame = angular.element('<iframe src="' + apiUrl + 'proxy/angular" style="display:none"></iframe>');
                injectFrame.bind("load", function () {
                    var queue = proxyFrame;

                    proxyFrame = this;
                    sendMessage = sendMessageToProxy;

                    while (queue.length > 0) {
                        sendMessage(queue.shift());
                    }
                });
                $document.find("body").append(injectFrame);

                angular.element($window).bind("message", function readMessageFromProxy(e) {
                    var event = e.originalEvent || e;
                    if (event.source == proxyFrame.contentWindow) {
                        var response = JSON.parse(event.data);
                        var request = requestHash[response.requestId];
                        if (request) {
                            delete requestHash[response.requestId];

                            request.callback(response.status, response.response, response.headersString);
                        }
                    }
                });

                return function (method, url, post, callback, headers, timeout, withCredentials, responseType) {
                    if (apiUrlRegex.test(url)) {

                        sendNewMessage({
                            method: method,
                            url: url,
                            post: post,
                            headers: headers,
                            timeout: timeout,
                            withCredentials: withCredentials,
                            responseType: responseType
                        }, callback);

                    } else {
                        $delegate(method, url, post, callback, headers, timeout, withCredentials, responseType);
                    }
                };

                function sendNewMessage(message, callback) {

                    message.requestId = nextRequestId;

                    var request = {
                        callback: callback,
                        message: message
                    };

                    requestHash[message.requestId] = request;

                    sendMessage(request);

                    nextRequestId += 1;
                }

                function sendMessageToProxy(request) {
                    proxyFrame.contentWindow.postMessage(JSON.stringify(request.message), apiUrl);
                }

                function sendMessageToQueue(request) {
                    proxyFrame.push[request];
                }


            }]);
        }

        // copied from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript

        function regExpEscape(s) {
            return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        };
    }]);

    (function (angular, module, undefined) {
        "use strict";
        module.directive("recaptcha", ["recaptchaService", function recaptcha(recaptchaService) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    recaptchaService.create(elem, {
                        theme: "clean"
                    });

                    scope.$on("$destroy", function () {
                        if (recaptchaService) {
                            recaptchaService.destroy();
                        }
                    });
                }
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        module.service("baasicApiHttp", ["$http", "HALParser", "baasicApp", function baasicApiHttp($http, HALParser, baasicApp) {
            var parser = new HALParser();

            var proxy = proxyFactory($http, parser, baasicApp.get());

            proxy.createNew = function (app) {
                return proxyFactory($http, parser, app);
            };

            return proxy;
        }]);

        var extend = angular.extend;

        var proxyFactory = function proxyFactory($http, parser, app) {
            var apiUrl = app.get_apiUrl();

            var proxyMethod = function (config) {
                if (config) {
                    config.withCredentials = true;
                    if (!isAbsoluteUrl(config.url)) {
                        config.url = apiUrl + config.url;
                    }

                    var headers = config.headers || (config.headers = {});

                    if (!headers["Content-Type"]) {
                        headers["Content-Type"] = "application/json; charset=UTF-8";
                    }
                    if (!headers["Accept"]) {
                        headers["Accept"] = "application/hal+json; charset=UTF-8";
                    }

                    var token = app.get_accessToken();
                    if (token) {
                        headers["AUTHORIZATION"] = token.token_type + ' ' + token.access_token;
                    }
                }

                var promise = $http(config);

                promise = extend(promise.then(function (response) {
                    if (response.headers) {
                        var contentType = response.headers("Content-Type");
                        if (contentType && contentType.toLowerCase().indexOf("application/hal+json") != -1) {
                            response.data = parser.parse(response.data);
                        }
                    }
                }), promise);

                return promise;
            }

            createShortMethods(proxyMethod, "get", "delete", "head", "jsonp");
            createShortMethodsWithData(proxyMethod, "post", "put");

            return proxyMethod;
        }

        function createShortMethods(proxy) {
            angular.forEach(tail(arguments, 1), function (name) {
                proxy[name] = function (url, config) {
                    return proxy(extend(config || {}, {
                        method: name,
                        url: url
                    }));
                };
            });
        }

        function createShortMethodsWithData(proxy) {
            angular.forEach(tail(arguments, 1), function (name) {
                proxy[name] = function (url, data, config) {
                    return proxy(extend(config || {}, {
                        method: name,
                        url: url,
                        data: data
                    }));
                };
            });
        }

        function isAbsoluteUrl(url) {
            var lowerUrl = url.toLowerCase();
            return startsWith(lowerUrl, "http://") || startsWith(lowerUrl, "https://");
        }

        function startsWith(target, input) {
            return target.substring(0, input.length) === input;
        }

        function tail(array) {
            return Array.prototype.slice.call(array, 1);
        };
    })(angular, module);

    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicApiService", ["baasicConstants", function (baasicConstants) {
            function FindParams(data) {
                angular.extend(this, data);
                this.sort = data.orderBy ? data.orderBy + '|' + data.orderDirection : null;
                this.searchQuery = data.search;
            }

            function KeyParams(data, propName) {
                if (angular.isObject(data)) {
                    angular.extend(this, data);
                } else {
                    if (propName !== undefined) {
                        this[propName] = data;
                    } else {
                        this[baasicConstants.keyPropertyName] = data;
                    }
                }
            }

            function ModelParams(data) {
                if (data.hasOwnProperty(baasicConstants.modelPropertyName)) {
                    angular.extend(this, data);
                } else {
                    this[baasicConstants.modelPropertyName] = data;
                }
            }

            return {
                findParams: function (data) {
                    return new FindParams(data);
                },
                getParams: function (data, propName) {
                    return new KeyParams(data, propName);
                },
                createParams: function (data) {
                    return new ModelParams(data);
                },
                updateParams: function (data) {
                    return new ModelParams(data);
                },
                removeParams: function (data) {
                    return new ModelParams(data);
                }
            };
        }]);
    }(angular, module));
    module.provider("baasicApp", function baasicAppService() {
        var apps = {};
        var defaultApp;

        this.create = function create(apiKey, config) {
            var defaultConfig = {
                apiRootUrl: "api.baasic.local",
                apiVersion: "beta"
            };

            var app = MonoSoftware.Baasic.Application.init(apiKey, angular.extend(defaultConfig, config));

            apps[apiKey] = app;
            if (!defaultApp) {
                defaultApp = app;
            }

            return app;
        }

        this.$get = function () {
            return {
                all: function () {
                    var list = [];
                    for (var key in apps) {
                        list.push(apps[key]);
                    }

                    return list;
                },
                get: function getBaasicApplication(apiKey) {
                    if (apiKey) {
                        return apps[apiKey];
                    } else {
                        return defaultApp;
                    }
                }
            };
        };
    });

    (function (angular, module, undefined) {
        "use strict";
        module.service("roleRouteService", ["uriTemplateService", function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("role/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("role/{roleId}/{?embed,fields}"),
                create: uriTemplateService.parse("role"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("roleService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "roleRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, roleRouteService) {
            return {
                find: function (data) {
                    return baasicApiHttp.get(roleRouteService.find.expand(baasicApiService.findParams(data)));
                },
                get: function (data) {
                    return baasicApiHttp.get(roleRouteService.get.expand(baasicApiService.getParams(data, 'roleId')));
                },
                create: function (data) {
                    return baasicApiHttp.post(roleRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                }
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("userRouteService", ["uriTemplateService", function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("user/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("user/{username}/{?embed,fields}"),
                create: uriTemplateService.parse("user"),
                activate: uriTemplateService.parse("user/activate/{activationToken}/"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("userService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "userRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, userRouteService) {
            return {
                find: function (data) {
                    return baasicApiHttp.get(userRouteService.find.expand(baasicApiService.findParams(data)));
                },
                get: function (data) {
                    return baasicApiHttp.get(userRouteService.get.expand(baasicApiService.getParams(data, 'username')));
                },
                create: function (data) {
                    return baasicApiHttp.post(userRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                unlock: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('unlock').href, {});
                },
                lock: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('lock').href, {});
                },
                activate: function (data) {
                    var params = baasicApiService.getParams(data, 'activationToken');
                    return baasicApiHttp.put(userRouteService.activate.expand(params), {});
                }
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.constant("baasicConstants", {
            idPropertyName: 'id',
            keyPropertyName: 'key',
            modelPropertyName: 'model'
        });
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("applicationSettingsRouteService", ["uriTemplateService", function (uriTemplateService) {
            return {
                get: uriTemplateService.parse("application/{key}/{?embed,fields}"),
                update: uriTemplateService.parse("application/{key}/"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("applicationSettingsService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "applicationSettingsRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, applicationSettingsRouteService) {
            return {
                get: function (data) {
                    return baasicApiHttp.get(applicationSettingsRouteService.get.expand(baasicApiService.getParams(data))).success(function (appSettings) {
                        appSettings.origins = appSettings.origins || [];
                    });
                },
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                }
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("keyValueRouteService", ["uriTemplateService", function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("keyvalue/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("keyvalue/{key}/{?embed,fields}"),
                create: uriTemplateService.parse("keyvalue"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("keyValueService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "keyValueRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, keyValueRouteService) {
            return {
                find: function (data) {
                    return baasicApiHttp.get(keyValueRouteService.find.expand(baasicApiService.findParams(data)));
                },
                get: function (data) {
                    return baasicApiHttp.get(keyValueRouteService.get.expand(baasicApiService.getParams(data)));
                },
                create: function (data) {
                    return baasicApiHttp.post(keyValueRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                }
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("valueSetItemRouteService", ["uriTemplateService", function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("valuesetitems/set/{setName}/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("valuesetitems/set/{setName}/item/{itemKey}/{?embed,fields}"),
                create: uriTemplateService.parse("valuesetitems"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("valueSetItemService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "valueSetItemRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, valueSetItemRouteService) {
            return {
                find: function (data) {
                    return baasicApiHttp.get(valueSetItemRouteService.find.expand(baasicApiService.findParams(data)));
                },
                get: function (data) {
                    return baasicApiHttp.get(valueSetItemRouteService.get.expand(baasicApiService.getParams(data)));
                },
                create: function (data) {
                    return baasicApiHttp.post(valueSetItemRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                remove: function (valueSetItem) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                }
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("valueSetRouteService", ["uriTemplateService", function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("valueset/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("valueset/{setName}/{?embed,fields}"),
                create: uriTemplateService.parse("valueset"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("valueSetService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "valueSetRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, valueSetRouteService) {
            return {
                find: function (data) {
                    return baasicApiHttp.get(valueSetRouteService.find.expand(baasicApiService.findParams(data)));
                },
                get: function (data) {
                    return baasicApiHttp.get(valueSetRouteService.get.expand(baasicApiService.getParams(data, 'setName')));
                },
                create: function (data) {
                    return baasicApiHttp.post(valueSetRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                }
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        var permissionHash = {};
        module.service("authorizationService", ["$rootScope", "baasicApp", function ($rootScope, baasicApp) {
            var app = baasicApp.get();

            return {
                getUser: function getUser() {
                    var user = app.get_user();
                    if ($rootScope.user === undefined && user.user !== undefined) {
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
                hasPermission: function (authorization) {
                    if (permissionHash.hasOwnProperty(authorization)) {
                        return permissionHash[authorization];
                    } else {
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

                        permissionHash[authorization] = hasPermission;
                        return hasPermission;
                    }
                }
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("loginRouteService", ["uriTemplateService", function (uriTemplateService) {
            return {
                login: uriTemplateService.parse("/login/{?embed,fields}"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("loginService", ["baasicApiHttp", "loginRouteService", function (baasicApiHttp, loginRouteService) {
            return {
                login: function (username, password) {
                    var data = 'grant_type=password&username=' + username + '&password=' + password;

                    return baasicApiHttp({
                        url: loginRouteService.login.expand({}) + "?withSession=true",
                        method: "POST",
                        data: data,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        }
                    });
                },
                loadUserData: function loadUserData(data) {
                    return baasicApiHttp.get(loginRouteService.login.expand(data), {
                        headers: {
                            "Accept": "application/json; charset=UTF-8"
                        }
                    });
                },
                logout: function (token, type) {
                    return baasicApiHttp({
                        url: loginRouteService.login.expand({}),
                        method: "DELETE",
                        data: {
                            token: token,
                            type: type
                        }
                    });
                }
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("passwordRecoveryService", ["baasicApiHttp", function (baasicApiHttp) {
            var url = "RecoverPassword";

            return {
                requestReset: function (request) {
                    return baasicApiHttp({
                        url: url,
                        method: "POST",
                        data: request
                    });
                },
                change: function (change) {
                    return baasicApiHttp({
                        url: url,
                        method: "PUT",
                        data: change
                    });
                }
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("recaptchaService", ["recaptchaKey", function (recaptchaKey) {
            return {
                create: function (elem, options) {
                    var id = elem.attr("id");
                    if (!id) {
                        id = "recaptcha-" + Math.random() * 10000;
                        elem.attr("id", id);
                    }
                    Recaptcha.create(recaptchaKey, id, options);
                },
                challenge: function () {
                    return Recaptcha.get_challenge();
                },
                response: function () {
                    return Recaptcha.get_response();
                },
                reload: function () {
                    Recaptcha.reload();
                },
                destroy: function () {
                    Recaptcha.destroy();
                }
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("uriTemplateService", [function () {
            return {
                parse: function (link) {
                    return UriTemplate.parse(link);
                },
                constructTemplateUrl: function (config, params) {
                    if (!config || !config.templateText || !config.defaultUrl) {
                        throw "Invalid template configuration.";
                    }

                    if (config.templateText) {
                        var
                        expandedTemplate = null,
                            defaultUrlIndex = null,
                            sortParams = params.orderBy ? params.orderBy + '|' + params.orderDirection : null;

                        var expandConfig = {
                            page: params.pageNumber,
                            rpp: params.pageSize,
                            sort: sortParams,
                            searchQuery: params.search
                        };

                        if (config.additionalParams) {
                            for (var p in config.additionalParams) {
                                if (expandConfig[p]) {
                                    throw 'Property' + p + ' already exists in default expand configuration';
                                }
                                else {
                                    expandConfig[p] = config.additionalParams[p];
                                }
                            }
                        }

                        expandedTemplate = config.templateText.expand(expandConfig);

                        defaultUrlIndex = expandedTemplate.indexOf(config.defaultUrl);

                        url = expandedTemplate.substr(defaultUrlIndex);
                    }
                    else {
                        url = defaultUrl;
                    }

                    return url;
                }
            }
        }]);
    })(angular, module);
})(angular);