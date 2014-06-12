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

})(angular);