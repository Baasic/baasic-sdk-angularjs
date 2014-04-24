(function (angular, undefined) {﻿
    var module = angular.module("baasic.baasicApi", ["HALParser"]);

    ﻿module.config(["$provide", function config($provide) {
        if (browserSupportCredentialsWithCookies()) {
            $provide.decorator("$httpBackend", ["$delegate", "$q", "$rootScope", "$window", "$document", "baasicApp", function initBaasicProxy($delegate, $q, $rootScope, $window, $document, baasicApp) {
                var apiUrl = baasicApp.get_apiUrl();

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
                    if (url.indexOf(apiUrl) == 0) {

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

                function browserSupportCredentialsWithCookies() {
                    return ('withCredentials' in new XMLHttpRequest()) && !(window.ActiveXObject || "ActiveXObject" in window);
                }
            }]);
        }
    }]);

    ﻿module.constant("baasicApiConfig", {
        apiRootUrl: "api.baasic.local",
        apiVersion: "beta"
    });

    ﻿ (function (angular, module, undefined) {
        module.service("baasicApiHttp", ["$q", "$http", "HALParser", "baasicApp", baasicApiHttp]);
        module.service("baasicSystemApiHttp", ["$q", "$http", "HALParser", "baasicSystemApp", baasicSystemApiHttp]);

        var extend = angular.extend;

        var proxyFactory = function proxyFactory($q, $http, HALParser, baasicApp, func) {
            var parser = new HALParser();
            var apiUrl = baasicApp.get_apiUrl();

            var proxyMethod = function (config) {
                if (config) {
                    config.withCredentials = true;
                    config.url = apiUrl + config.url;

                    var headers = config.headers || (config.headers = {});

                    if (!headers["Content-Type"]) {
                        headers["Content-Type"] = "application/json; charset=UTF-8";
                    }
                    if (!headers["Accept"]) {
                        headers["Accept"] = "application/hal+json; charset=UTF-8";
                    }

                    var token = baasicApp.get_accessToken();
                    if (token) {
                        headers["AUTHORIZATION"] = token.token_type + ' ' + token.access_token;
                    }
                }

                var promise = $http(config);

                promise = extend(promise.then(function (response) {
                    if (response.data && response.data._links) {
                        response.data = parser.parse(response.data);
                    }
                }), promise);

                return promise;
            }

            var proxy;
            if (func) {
                proxy = function (config) {
                    func(config);

                    return proxyMethod(config);
                }
            } else {
                proxy = proxyMethod;
            }

            createShortMethods(proxy, "get", "delete", "head", "jsonp");
            createShortMethodsWithData(proxy, "post", "put");

            return proxy;
        };

        function createShortMethods(proxy) {
            _.each(_.rest(arguments, 1), function (name) {
                proxy[name] = function (url, config) {
                    return proxy(extend(config || {}, {
                        method: name,
                        url: url
                    }));
                };
            });
        }

        function createShortMethodsWithData(proxy) {
            _.each(_.rest(arguments, 1), function (name) {
                proxy[name] = function (url, data, config) {
                    return proxy(extend(config || {}, {
                        method: name,
                        url: url,
                        data: data
                    }));
                };
            });
        }

        function baasicSystemApiHttp($q, $http, HALParser, baasicSystemApp) {
            return proxyFactory($q, $http, HALParser, baasicSystemApp);
        }

        function baasicApiHttp($q, $http, HALParser, baasicApp) {
            var proxy = proxyFactory($q, $http, HALParser, baasicApp);

            proxy.createMockDefer = function () {
                var deferrd = defer();

                var resolve = deferrd.resolve;
                var reject = deferrd.reject;

                deferrd.resolve = function (obj) {
                    resolve({
                        data: obj
                    });
                };

                deferrd.reject = function (obj) {
                    reject({
                        data: obj
                    });
                };

                return deferrd;
            };

            return proxy;

            function defer() {
                var deferred = $q.defer();
                var promise = deferred.promise;

                promise.success = function (fn) {
                    promise.then(function (response) {
                        fn(response.data, response.status, response.headers, response.config);
                    });
                    return promise;
                };

                promise.error = function (fn) {
                    promise.then(null, function (response) {
                        fn(response.data, response.status, response.headers, response.config);
                    });
                    return promise;
                };

                return deferred;
            }
        }
    })(angular, module);

    ﻿module.service("baasicApp", ["baasicApiConfig", function baasicAppService(baasicApiConfig) {
        return MonoSoftware.Baasic.Application.init(baasicApiConfig.apiKey, baasicApiConfig);
    }]);

    ﻿module.service("baasicSystemApp", ["systemApiConfig", function baasicSystemAppService(systemApiConfig) {
        return MonoSoftware.Baasic.Application.init("system", systemApiConfig);
    }]);

    ﻿module.constant("systemApiConfig", {
        apiRootUrl: "api.baasic.local",
        apiVersion: "beta"
    });

})(angular);