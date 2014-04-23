(function (BaasicApi) {

    var dependencies = [
        "HALParser"
    ];

    BaasicApi.module = angular.module("baasic.baasicApi", dependencies)
                    .config(BaasicApi.configDefinition)
                    .constant("baasicApiConfig", BaasicApi.apiConfig)
                    .constant("systemApiConfig", BaasicApi.systemApiConfig)
                    .value("baasicApiKey", "")
                    .service("baasicSystemApp", BaasicApi.baasicSystemAppServiceDefinition)
                    .service("baasicSystemApiHttp", BaasicApi.baasicSystemApiHttpDefinition)
                    .service("baasicApp", BaasicApi.baasicAppServiceDefinition)
                    .service("baasicApiHttp", BaasicApi.baasicApiHttpDefinition);

})(MonoSoftware.BaasicApi);

            
﻿MonoSoftware = MonoSoftware || {};
MonoSoftware.BaasicApi = {};
﻿(function (BaasicApi) {

    BaasicApi.configDefinition = ["$provide", config];

    function config($provide) {

        $provide.decorator("$httpBackend", ["$delegate", "$q", "$rootScope", "$window", "$document", "baasicApp", function initApiKey($delegate, $q, $rootScope, $window, $document, baasicApp) {
            if (browserSupportCredentialsWithCookies()) {
                return $delegate;
            } else {
                var apiUrl = baasicApp.get_apiUrl();

                var proxyFrame = null;
                var requestHash = new Object();
                var nextRequestId = 0;

                var injectFrame = angular.element('<div style="display:none"><iframe src="' + apiUrl + 'proxy/angular"></iframe></div>');
                injectFrame.find("iframe").bind("load", function () {
                    proxyFrame = this;
                    flush();
                });
                $document.find("body").append(injectFrame);

                angular.element($window).bind("message", function (e) {
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
                        message: message,
                        posted: false
                    };

                    requestHash[message.requestId] = request;

                    sendMessage(request);

                    nextRequestId += 1;
                }

                function flush() {
                    for (var requestId in requestHash) {
                        var request = requestHash[requestId];
                        if (!request.posted) {
                            sendMessage(request)
                        }
                    }
                }

                function sendMessage(request) {
                    if (proxyFrame) {
                        proxyFrame.contentWindow.postMessage(JSON.stringify(request.message), apiUrl);
                        request.posted = true;
                    }
                }
            }
        }]);

    };

    function browserSupportCredentialsWithCookies() {
        return ('withCredentials' in new XMLHttpRequest())
            && !(window.ActiveXObject || "ActiveXObject" in window);
    }

})(MonoSoftware.BaasicApi);
﻿(function (BaasicApi) {

    BaasicApi.apiConfig = {
        apiRootUrl: "api.baasic.local",
        apiVersion: "beta"
    };

})(MonoSoftware.BaasicApi);
﻿(function (BaasicApi) {
    BaasicApi.baasicApiHttpDefinition = ["$q", "$http", "HALParser", "baasicApp", baasicApiHttp];
    BaasicApi.baasicSystemApiHttpDefinition = ["$q", "$http", "HALParser", "baasicSystemApp", baasicSystemApiHttp];

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
})(MonoSoftware.BaasicApi);
﻿(function (BaasicApi) {

    BaasicApi.baasicAppServiceDefinition = ["baasicApiKey", "baasicApiConfig", baasicAppService];

    function baasicAppService(baasicApiKey, baasicApiConfig) {
        return MonoSoftware.Baasic.Application.init(baasicApiKey, baasicApiConfig);
    };

})(MonoSoftware.BaasicApi);
﻿(function (BaasicApi) {

    BaasicApi.baasicSystemAppServiceDefinition = ["systemApiConfig", baasicSystemAppService];

    function baasicSystemAppService(systemApiConfig) {
        return MonoSoftware.Baasic.Application.init("system", systemApiConfig);
    };

})(MonoSoftware.BaasicApi);
﻿(function (BaasicApi) {

    BaasicApi.systemApiConfig = {
        apiRootUrl: "api.baasic.local",
        apiVersion: "beta"
    };

})(MonoSoftware.BaasicApi);