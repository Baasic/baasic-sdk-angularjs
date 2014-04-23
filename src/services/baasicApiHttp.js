(function (BaasicApi) {
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