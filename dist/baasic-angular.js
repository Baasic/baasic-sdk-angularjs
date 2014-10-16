(function (angular, undefined) {
    var module = angular.module("baasic.baasicApi", ["HALParser"]);

    module.config(["$provide", function config($provide) {
        // copied from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript

        function regExpEscape(s) {
            return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        };

        if (!('withCredentials' in new XMLHttpRequest()) || (window.ActiveXObject || "ActiveXObject" in window)) {

            $provide.decorator("$httpBackend", ["$delegate", "$q", "$rootScope", "$window", "$document", "baasicApp", function initBaasicProxy($delegate, $q, $rootScope, $window, $document, baasicApp) {
                var apps = baasicApp.all();
                var proxies = [];
                var requestHash = {};
                var nextRequestId = 0;

                function sendNewMessage(proxy, message, callback) {

                    message.requestId = nextRequestId;

                    var request = {
                        proxy: proxy,
                        callback: callback,
                        message: message
                    };

                    requestHash[message.requestId] = request;

                    proxy.sendMessage(request);

                    nextRequestId += 1;
                }

                for (var i = 0, l = apps.length; i < l; i++) {
                    var app = apps[i];

                    (function (app) {
                        var apiUrl = app.get_apiUrl();
                        var proxy = {
                            proxyFrame: [],
                            apiUrlRegex: new RegExp("^" + regExpEscape(apiUrl)),
                            sendMessage: function sendMessageToQueue(request) {
                                this.proxyFrame.push[request];
                            }
                        };

                        proxies.push(proxy);

                        var injectFrame = angular.element('<iframe src="' + apiUrl + 'proxy/angular" style="display:none"></iframe>');
                        injectFrame.bind("load", function () {
                            var queue = proxy.proxyFrame;

                            proxy.proxyFrame = this;
                            proxy.sendMessage = function sendMessageToProxy(request) {
                                this.proxyFrame.contentWindow.postMessage(JSON.stringify(request.message), apiUrl);
                            };

                            while (queue.length > 0) {
                                proxy.sendMessage(queue.shift());
                            }
                        });

                        $document.find("body").append(injectFrame);
                    })(app);
                }

                angular.element($window).bind("message", function readMessageFromProxy(e) {
                    var event = e.originalEvent || e;
                    var response = JSON.parse(event.data);
                    var request = requestHash[response.requestId];
                    if (request && event.source == request.proxy.proxyFrame.contentWindow) {
                        delete requestHash[response.requestId];
                        request.callback(response.status, response.response, response.headersString);
                    }
                });

                return function (method, url, post, callback, headers, timeout, withCredentials, responseType) {
                    for (var i = 0, l = proxies.length; i < l; i++) {
                        var proxy = proxies[i];
                        if (proxy.apiUrlRegex.test(url)) {

                            sendNewMessage(proxy, {
                                method: method,
                                url: url,
                                post: post,
                                headers: headers,
                                timeout: timeout,
                                withCredentials: withCredentials,
                                responseType: responseType
                            }, callback);

                            return;
                        }
                    }

                    $delegate(method, url, post, callback, headers, timeout, withCredentials, responseType);
                };
            }]);
        }
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
        "use strict";

        var extend = angular.extend;
        // Tokenizer and unquote code taken from http://stackoverflow.com/questions/5288150/digest-authentication-w-jquery-is-it-possible/5288679#5288679
        var wwwAuthenticateTokenizer = (function () {
            var ws = '(?:(?:\\r\\n)?[ \\t])+',
                token = '(?:[\\x21\\x23-\\x27\\x2A\\x2B\\x2D\\x2E\\x30-\\x39\\x3F\\x41-\\x5A\\x5E-\\x7A\\x7C\\x7E]+)',
                quotedString = '"(?:[\\x00-\\x0B\\x0D-\\x21\\x23-\\x5B\\\\x5D-\\x7F]|' + ws + '|\\\\[\\x00-\\x7F])*"';

            return RegExp(token + '(?:=(?:' + quotedString + '|' + token + '))?', 'g');
        })();

        function unquote(quotedString) {
            return quotedString.substr(1, quotedString.length - 2).replace(/(?:(?:\r\n)?[ \t])+/g, " ");
        }

        function parseWWWAuthenticateHeader(value) {
            if (value) {
                var tokens = value.match(wwwAuthenticateTokenizer);
                if (tokens && tokens.length > 0) {
                    var wwwAutheniticate = {
                        scheme: tokens[0]
                    };

                    if (tokens.length > 1) {
                        var details = {};
                        for (var i = 1, l = tokens.length; i < l; i++) {
                            var values = tokens[i].split("=");
                            details[values[0]] = unquote(values[1]);
                        }

                        wwwAutheniticate.details = details;
                    }

                    return wwwAutheniticate;
                }
            }

            return undefined;
        }

        function startsWith(target, input) {
            return target.substring(0, input.length) === input;
        }

        function isAbsoluteUrl(url) {
            var lowerUrl = url.toLowerCase();
            return startsWith(lowerUrl, "http://") || startsWith(lowerUrl, "https://");
        }

        function tail(array) {
            return Array.prototype.slice.call(array, 1);
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

        var proxyFactory = function proxyFactory($rootScope, $http, parser, app) {
            var apiUrl = app.get_apiUrl();

            function parseHeaders(headers) {
                var wwwAuthenticate = parseWWWAuthenticateHeader(headers("WWW-Authenticate"));
                if (wwwAuthenticate) {
                    if (wwwAuthenticate.scheme.toLowerCase() === "bearer") {
                        var details = wwwAuthenticate.details;
                        if (details) {
                            if (details.error) {
                                switch (details.error) {
                                case "invalid_token":
                                    var token = app.get_accessToken();
                                    app.update_accessToken(null);
                                    $rootScope.$broadcast("token_error", {
                                        token: token,
                                        error: details.error,
                                        error_description: details.error_description
                                    });
                                    break;
                                }
                            }
                        }
                    }
                }
            }

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
                        if (contentType && contentType.toLowerCase().indexOf("application/hal+json") !== -1) {
                            response.data = parser.parse(response.data);
                        }

                        parseHeaders(response.headers);
                    }
                }, function (response) {
                    if (response.headers) {
                        parseHeaders(response.headers);
                    }
                }).
                finally(function () {
                    var token = app.get_accessToken();
                    if (token && token.sliding_window) {
                        token.expireTime = new Date().getTime() + (token.sliding_window * 1000);
                        app.update_accessToken(token);
                    }
                }), promise);

                return promise;
            }

            createShortMethods(proxyMethod, "get", "delete", "head", "jsonp");
            createShortMethodsWithData(proxyMethod, "post", "put");

            return proxyMethod;
        }

        module.service("baasicApiHttp", ["$rootScope", "$http", "HALParser", "baasicApp", function baasicApiHttp($rootScope, $http, HALParser, baasicApp) {
            var parser = new HALParser();

            var proxy = proxyFactory($rootScope, $http, parser, baasicApp.get());

            proxy.createNew = function (app) {
                return proxyFactory($rootScope, $http, parser, app);
            };

            return proxy;
        }]);
    })(angular, module);

    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicApiService", ["baasicConstants", function (baasicConstants) {
            function FindParams(data) {
                if (angular.isObject(data)) {
                    angular.extend(this, data);
                    if (data.hasOwnProperty('orderBy') && data.hasOwnProperty('orderDirection')) {
                        this.sort = data.orderBy ? data.orderBy + '|' + data.orderDirection : null;
                    }
                    if (data.hasOwnProperty('search')) {
                        this.searchQuery = data.search;
                    }
                    if (data.hasOwnProperty('pageNumber')) {
                        this.page = data.pageNumber;
                    }
                    if (data.hasOwnProperty('pageSize')) {
                        this.rpp = data.pageSize;
                    }
                } else {
                    this.searchQuery = data;
                }
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
                get: uriTemplateService.parse("application/{?embed,fields}"),
                update: uriTemplateService.parse("application/"),
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
                login: uriTemplateService.parse("login/{?embed,fields,options}"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicLoginService", ["baasicApiHttp", "baasicLoginRouteService", function (baasicApiHttp, loginRouteService) {
            return {
                routeService: loginRouteService,
                login: function login(data) {
                    var settings = angular.copy(data);
                    var formData = 'grant_type=password&username=' + settings.username + '&password=' + settings.password;

                    if (settings.options) {
                        var options = settings.options;
                        if (angular.isArray(options)) {
                            settings.options = options.join();
                        }
                    }

                    return baasicApiHttp({
                        url: loginRouteService.login.expand(settings),
                        method: "POST",
                        data: formData,
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
                logout: function logout(token, type) {
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
                passwordRecovery: uriTemplateService.parse("RecoverPassword"),
                changePassword: uriTemplateService.parse("RecoverPassword/user/{username}/change"),
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
                reset: function (reset) {
                    return baasicApiHttp({
                        url: passwordRecoveryRouteService.passwordRecovery.expand({}),
                        method: "PUT",
                        data: reset
                    });
                },
                change: function (username, data) {
                    return baasicApiHttp({
                        url: passwordRecoveryRouteService.changePassword.expand({
                            username: username
                        }),
                        method: "PUT",
                        data: data
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
        module.service("baasicPermissionsService", ["$q", "$filter", "baasicApiHttp", "baasicApiService", "baasicConstants", "baasicPermissionsRouteService", "baasicAuthorizationService", function ($q, $filter, baasicApiHttp, baasicApiService, baasicConstants, permissionsRouteService, authService) {
            var _orderBy = $filter('orderBy');
            var _filter = $filter('filter');

            function isEmpty(data) {
                return data === undefined || data === null || data === '';
            }

            function getRoles(data) {
                return baasicApiHttp.get(permissionsRouteService.getRoles.expand(baasicApiService.findParams(data)));
            }

            function getUsers(data) {
                return baasicApiHttp.get(permissionsRouteService.getUsers.expand(baasicApiService.findParams(data)));
            }

            function firstCharToLowerCase(text) {
                return text.replace(/^./, function (char) {
                    return char.toLowerCase();
                });
            }

            return {
                routeService: permissionsRouteService,
                find: function (section, data) {
                    return baasicApiHttp.get(permissionsRouteService.find(section).expand(baasicApiService.findParams(data)));
                },
                get: function (section, data) {
                    return baasicApiHttp.get(permissionsRouteService.get(section).expand(baasicApiService.getParams(data)));
                },
                getActions: function (data) {
                    return baasicApiHttp.get(permissionsRouteService.getActions.expand(baasicApiService.findParams(data)));
                },
                getPermissionSubjects: function (data) {
                    var membershipCollection = [];

                    var userTask = getUsers(data).success(function (collection) {
                        angular.forEach(collection.item, function (item) {
                            var membershipItem = {
                                name: item.username,
                                role: ''
                            };
                            angular.extend(membershipItem, item);
                            membershipCollection.push(membershipItem);
                        });
                    });

                    var roleTask = getRoles(data).success(function (collection) {
                        angular.forEach(collection.item, function (item) {
                            var membershipItem = {
                                name: item.name,
                                roleName: item.name,
                                username: ''
                            };
                            angular.extend(membershipItem, item);
                            membershipCollection.push(membershipItem);
                        });
                    });

                    return $q.all([userTask, roleTask]).then(function () {
                        return _orderBy(membershipCollection, 'name');
                    });
                },
                create: function (data) {
                    return baasicApiHttp.post(permissionsRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    var action = data.actions[0];
                    var operation = !isEmpty(data.role) ? 'Role' : 'User';
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete' + action.abrv + operation).href);
                },
                preparePermissions: function (queryUtility, actionCollection, permissionCollection, selectedPermissions) {
                    var that = this;
                    //Apply search parameters to the selected items & create new mixed collection
                    var newPermissionCollection = angular.copy(_filter(selectedPermissions, function (item) {
                        if (!isEmpty(queryUtility.pagingInfo.search)) {
                            return item.name.indexOf(queryUtility.pagingInfo.search) > -1;
                        }
                        return true;
                    }));
                    angular.forEach(permissionCollection, function (permission) {
                        angular.forEach(actionCollection, function (lookupAction) {
                            //Add missing actions to the permission
                            var items = _filter(permission.actions, function (action) {
                                return action.abrv === lookupAction.abrv;
                            });
                            if (items.length === 0) {
                                var newAction = {
                                    checked: false
                                };
                                angular.extend(newAction, lookupAction);
                                permission.actions.push(newAction);
                            } else {
                                angular.forEach(items, function (item) {
                                    item.checked = true;
                                });
                            }
                        });
                        permission.actions = _orderBy(permission.actions, 'name');
                        //Push existing permission to mixed collection and fix the HAL links for selected permissions
                        var newPermission = that.findPermission(permission, newPermissionCollection);
                        if (newPermission === undefined) {
                            newPermissionCollection.push(permission);
                        } else {
                            angular.extend(newPermission, permission);
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
                    angular.forEach(actionCollection, function (lookupAction) {
                        var newAction = {
                            checked: false
                        };
                        angular.extend(newAction, lookupAction);
                        permission.actions.push(newAction);
                    });
                    return permission;
                },
                findPermission: function (permission, permissionCollection) {
                    for (var i = 0; i < permissionCollection.length; i++) {
                        var item = permissionCollection[i];

                        if (item.section === permission.section && ((!isEmpty(item.role) && !isEmpty(permission.role) && item.role === permission.role) || (!isEmpty(item.username) && !isEmpty(permission.username) && item.username === permission.username))) {
                            return item;
                        }
                    }
                    return undefined;
                },
                exists: function (permission, permissionCollection) {
                    return !(this.findPermission(permission, permissionCollection) === undefined);
                },
                togglePermission: function (permission, action) {
                    var requestPermission = {};
                    angular.extend(requestPermission, permission);
                    requestPermission.actions = [action];

                    var operation;
                    if (!action.checked) {
                        operation = this.remove;
                    } else {
                        operation = this.create;
                    }
                    return operation(requestPermission);
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