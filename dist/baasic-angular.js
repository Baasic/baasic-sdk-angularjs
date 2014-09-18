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
        module.directive("baasicRecaptcha", ["baasicRecaptchaService", function (recaptchaService) {
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
        module.service("baasicLookupRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                get: uriTemplateService.parse("lookup/{?embed,fields}")
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicLookupService", ["baasicApiHttp", "baasicApiService", "baasicLookupRouteService", function (baasicApiHttp, baasicApiService, lookupRouteService) {
            var lookupKey = "baasic-lookup-data";
            return {
                routeService: lookupRouteService,
                get: function (data) {
                    var deferred = baasicApiHttp.createHttpDefer();
                    var result = JSON.parse(localStorage.getItem(lookupKey));
                    if (result === undefined || result === null) {
                        baasicApiHttp.get(lookupRouteService.get.expand(baasicApiService.getParams(data))).success(function (data, status, headers, config) {
                            localStorage.setItem(lookupKey, JSON.stringify(data));
                            deferred.resolve({
                                data: data,
                                status: status,
                                headers: headers,
                                config: config
                            });
                        }).error(function (data, status, headers, config) {
                            deferred.reject({
                                data: data,
                                status: status,
                                headers: headers,
                                config: config
                            });
                        });
                    } else {
                        deferred.resolve({
                            data: result
                        });
                    }
                    return deferred.promise;
                },
                reset: function () {
                    localStorage.setItem(lookupKey, null);
                }
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicRoleRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
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
        module.service("baasicRoleService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicRoleRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, roleRouteService) {
            return {
                routeService: roleRouteService,
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
        module.service("baasicUserRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
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
        module.service("baasicUserService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicUserRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, userRouteService) {
            return {
                routeService: userRouteService,
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
        module.service("baasicApplicationSettingsRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                get: uriTemplateService.parse("application/{key}/{?embed,fields}"),
                update: uriTemplateService.parse("application/{key}/"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicApplicationSettingsService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicApplicationSettingsRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, applicationSettingsRouteService) {
            return {
                routeService: applicationSettingsRouteService,
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
        module.service("baasicDynamicResourceRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("resource/{resourceName}/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("resource/{resourceName}/{id}/{?embed,fields}"),
                create: uriTemplateService.parse("resource/{resourceName}"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicDynamicResourceService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicDynamicResourceRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, dynamicResourceRouteService) {
            return {
                routeService: dynamicResourceRouteService,
                find: function (data) {
                    return baasicApiHttp.get(dynamicResourceRouteService.find.expand(baasicApiService.findParams(data)));
                },
                get: function (data) {
                    return baasicApiHttp.get(dynamicResourceRouteService.get.expand(baasicApiService.getParams(data)));
                },
                create: function (data) {
                    return baasicApiHttp.post(dynamicResourceRouteService.create.expand({
                        resourceName: data.resourceName
                    }), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
        module.service("baasicDynamicSchemaRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("schema/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("schema/{resourceName}/{?embed,fields}"),
                generateSchema: uriTemplateService.parse("schema/generate"),
                create: uriTemplateService.parse("schema"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicDynamicSchemaService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicDynamicSchemaRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, dynamicSchemaRouteService) {
            return {
                routeService: dynamicSchemaRouteService,
                find: function (data) {
                    return baasicApiHttp.get(dynamicSchemaRouteService.find.expand(baasicApiService.findParams(data)));
                },
                get: function (data) {
                    return baasicApiHttp.get(dynamicSchemaRouteService.get.expand(baasicApiService.getParams(data, 'resourceName')));
                },
                create: function (data) {
                    return baasicApiHttp.post(dynamicSchemaRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                generateSchema: function (data) {
                    return baasicApiHttp.post(dynamicSchemaRouteService.generateSchema.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                }
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicKeyValueRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
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
        module.service("baasicKeyValueService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicKeyValueRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, keyValueRouteService) {
            return {
                routeService: keyValueRouteService,
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
        module.service("baasicValueSetItemRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
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
        module.service("baasicValueSetItemService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicValueSetItemRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, valueSetItemRouteService) {
            return {
                routeService: valueSetItemRouteService,
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
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                }
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicValueSetRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
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
        module.service("baasicValueSetService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicValueSetRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, valueSetRouteService) {
            return {
                routeService: valueSetRouteService,
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
        module.service("baasicAuthorizationService", ["$rootScope", "baasicApp", function ($rootScope, baasicApp) {
            var app = baasicApp.get();
            var apiKey = app.get_apiKey();
            permissionHash[apiKey] = {};

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
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicLoginRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                login: uriTemplateService.parse("/login/{?embed,fields}"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicLoginService", ["baasicApiHttp", "baasicLoginRouteService", function (baasicApiHttp, loginRouteService) {
            return {
                routeService: loginRouteService,
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
                    data = data || {};
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
        module.service("baasicPasswordRecoveryRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                passwordRecovery: uriTemplateService.parse("/RecoverPassword"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicPasswordRecoveryService", ["baasicApiHttp", "baasicPasswordRecoveryRouteService", function (baasicApiHttp, passwordRecoveryRouteService) {

            return {
                routeService: passwordRecoveryRouteService,
                requestReset: function (request) {
                    return baasicApiHttp({
                        url: passwordRecoveryRouteService.passwordRecovery.expand({}),
                        method: "POST",
                        data: request
                    });
                },
                change: function (change) {
                    return baasicApiHttp({
                        url: passwordRecoveryRouteService.passwordRecovery.expand({}),
                        method: "PUT",
                        data: change
                    });
                }
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicPermissionsRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                find: function (section) {
                    return uriTemplateService.parse("permissions/section/" + section + "/{?searchQuery,sort}");
                },
                get: function (section) {
                    return uriTemplateService.parse("permissions/section/" + section + "/{id}");
                },
                getActions: uriTemplateService.parse("permissions/actions/{?searchQuery,sort}"),
                getRoles: uriTemplateService.parse("role/{?searchQuery,page,rpp,sort}"),
                getUsers: uriTemplateService.parse("user/{?searchQuery,page,rpp,sort}"),
                create: uriTemplateService.parse("permissions/"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicPermissionsService", ["$q", "baasicApiHttp", "baasicPermissionsRouteService", "notificationService", "baasicAuthorizationService", function permissionsService($q, baasicApiHttp, permissionsRouteService, notificationService, authService) {
            function isEmpty(data) {
                return _.isUndefined(data) || _.isNull(data) || data === '';
            }

            function getRoles(params) {
                var apiParams = {
                    page: params.pageNumber,
                    rpp: params.pageSize,
                    sort: params.orderBy ? params.orderBy + '|' + params.orderDirection : null,
                    searchQuery: params.search
                };
                return baasicApiHttp.get(permissionsRouteService.getRoles.expand(apiParams));
            }

            function getUsers(params) {
                var apiParams = {
                    page: params.pageNumber,
                    rpp: params.pageSize,
                    sort: params.orderBy ? params.orderBy + '|' + params.orderDirection : null,
                    searchQuery: params.search
                };
                return baasicApiHttp.get(permissionsRouteService.getUsers.expand(apiParams));
            }

            function firstCharToLowerCase(text) {
                return text.replace(/^./, function (char) {
                    return char.toLowerCase();
                });
            }

            return {
                find: function (section, params) {
                    var apiParams = {
                        sort: params.orderBy ? params.orderBy + '|' + params.orderDirection : null,
                        searchQuery: params.search
                    };

                    return baasicApiHttp.get(permissionsRouteService.find(section).expand(apiParams));
                },
                get: function (section, id) {
                    return baasicApiHttp.get(permissionsRouteService.get(section).expand({
                        id: id
                    }));
                },
                getActions: function (params) {
                    var apiParams = {
                        sort: params.orderBy ? params.orderBy + '|' + params.orderDirection : null,
                        searchQuery: params.search
                    };
                    return baasicApiHttp.get(permissionsRouteService.getActions.expand(apiParams));
                },
                getPermissionSubjects: function (params) {
                    var membershipCollection = [];

                    var userTask = getUsers(params).success(function (collection) {
                        _.each(collection.item, function (item) {
                            var membershipItem = {
                                name: item.username,
                                role: ''
                            };
                            _.extend(membershipItem, item);
                            membershipCollection.push(membershipItem);
                        });
                    });

                    var roleTask = getRoles(params).success(function (collection) {
                        _.each(collection.item, function (item) {
                            var membershipItem = {
                                name: item.name,
                                roleName: item.name,
                                username: ''
                            };
                            _.extend(membershipItem, item);
                            membershipCollection.push(membershipItem);
                        });
                    });

                    return $q.all([userTask, roleTask]).then(function () {
                        return _.sortBy(membershipCollection, function (item) {
                            return item.name;
                        });
                    });
                },
                create: function (permission) {
                    return baasicApiHttp.post(permissionsRouteService.create, permission);
                },
                remove: function (permission) {
                    var action = permission.actions[0];
                    var operation = !isEmpty(permission.role) ? 'Role' : 'User';
                    return baasicApiHttp.delete(permission.links('delete' + action.abrv + operation).href);
                },
                preparePermissions: function (queryUtility, actionCollection, permissionCollection, selectedPermissions) {
                    var that = this;
                    //Apply search parameters to the selected items & create new mixed collection
                    var newPermissionCollection = _.clone(_.filter(selectedPermissions, function (item) {
                        if (!isEmpty(queryUtility.pagingInfo.search)) {
                            return item.name.indexOf(queryUtility.pagingInfo.search) > -1;
                        }
                        return true;
                    }));
                    _.each(permissionCollection, function (permission) {
                        _.each(actionCollection, function (lookupAction) {
                            //Add missing actions to the permission
                            var items = _.filter(permission.actions, function (action) {
                                return action.abrv === lookupAction.abrv;
                            });
                            if (items.length === 0) {
                                var newAction = {
                                    checked: false
                                };
                                _.extend(newAction, lookupAction);
                                permission.actions.push(newAction);
                            } else {
                                _.each(items, function (item) {
                                    item.checked = true;
                                });
                            }
                        });
                        permission.actions = _.sortBy(permission.actions, function (action) {
                            return action.name;
                        });
                        //Push existing permission to mixed collection and fix the HAL links for selected permissions
                        var newPermission = that.findPermission(permission, newPermissionCollection);
                        if (_.isUndefined(newPermission)) {
                            newPermissionCollection.push(permission);
                        } else {
                            _.extend(newPermission, permission);
                        }
                    });
                    return newPermissionCollection;
                },
                createPermission: function (section, actionCollection, membershipItem) {
                    var permission = {
                        dirty: true,
                        role: membershipItem.roleName,
                        username: membershipItem.userName,
                        section: section,
                        actions: []
                    };
                    _.each(actionCollection, function (lookupAction) {
                        var newAction = {
                            checked: false
                        };
                        _.extend(newAction, lookupAction);
                        permission.actions.push(newAction);
                    });
                    return permission;
                },
                findPermission: function (permission, permissionCollection) {
                    return _.find(permissionCollection, function (item) {
                        return item.section === permission.section && ((!isEmpty(item.role) && !isEmpty(permission.role) && item.role === permission.role) || (!isEmpty(item.username) && !isEmpty(permission.username) && item.username === permission.username));
                    });
                },
                exists: function (permission, permissionCollection) {
                    return !_.isUndefined(this.findPermission(permission, permissionCollection));
                },
                togglePermission: function (permission, action) {
                    var removingLabel = _.template("Removing <%= permission.section %> <%= action.name %> permission for <%= permission.username %><%= permission.role %>");
                    var removingErrorLabel = _.template("Unable to remove <%= permission.section %> <%= action.name %> permission for <%= permission.username %><%= permission.role %>");
                    var removedLabel = _.template("Removed <%= permission.section %> <%= action.name %> permission for <%= permission.username %><%= permission.role %>");
                    var addingLabel = _.template("Adding <%= permission.section %> <%= action.name %> permission for <%= permission.username %><%= permission.role %>");
                    var addingErrorLabel = _.template("Unable to add <%= permission.section %> <%= action.name %> permission for <%= permission.username %><%= permission.role %>");
                    var addedLabel = _.template("Added <%= permission.section %> <%= action.name %> permission for <%= permission.username %><%= permission.role %>");
                    var notification;
                    if (action.checked) {
                        notification = notificationService.create(removingLabel({
                            action: action,
                            permission: permission
                        }));
                    } else {
                        notification = notificationService.create(addingLabel({
                            action: action,
                            permission: permission
                        }));
                    }
                    var requestPermission = {};
                    _.extend(requestPermission, permission);
                    requestPermission.actions = [action];

                    var operation;
                    if (action.checked) {
                        operation = this.remove;
                    } else {
                        operation = this.create;
                    }

                    return operation(requestPermission).success(function () {
                        notification.status = notificationService.statusTypes.success;
                        notification.message = !action.checked ? removedLabel({
                            action: action,
                            permission: permission
                        }) : addedLabel({
                            action: action,
                            permission: permission
                        });
                        notificationService.update(notification);
                    }).error(function (data) {
                        notification.message = !action.checked ? removingErrorLabel({
                            action: action,
                            permission: permission
                        }) : addingErrorLabel({
                            action: action,
                            permission: permission
                        });
                        notificationService.formatErrorNotification(notification, data);
                        notificationService.update(notification);
                    });
                },
                getModulePermissions: function (section) {
                    var permission = {
                        update: authService.hasPermission(firstCharToLowerCase(section) + ".update"),
                        create: authService.hasPermission(firstCharToLowerCase(section) + ".create"),
                        remove: authService.hasPermission(firstCharToLowerCase(section) + ".delete"),
                        read: authService.hasPermission(firstCharToLowerCase(section) + ".read")
                    };
                    return permission;
                }
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicRecaptchaService", ["recaptchaKey", function (recaptchaKey) {
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
        module.service("baasicUriTemplateService", [function () {
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