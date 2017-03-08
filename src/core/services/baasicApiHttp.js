/* globals module */
/**
 * @module baasicApiHttp
 * @description `baasicApiHttp` service is a core Baasic service that facilitates communication with the Baasic API. `baasicApiHttp` service is based on Angular '$http' service. For more information please visit online angular [documentation](https://docs.angularjs.org/api/ng/service/$http). This service handles:
 - authentication tokens and
 - HAL parsing.
*/

(function (angular, module, undefined) {
    'use strict';
    var extend = angular.extend;

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

    var proxyFactory = function proxyFactory(app) {
        var proxyMethod = function (config) {
            var request = {};
            if (config) {
                request.url = config.url;
                request.method = config.method;
                if (config.headers) request.headers = config.headers;
                if (config.data) request.data = config.data;

            }

            return app.baasicApiClient.request(request);

            promise.success = function (fn) {
                promise.then(function (response) {
                    fn(response.data, response.statusCode, response.headers, config);
                }, null);
                return promise;
            };

            promise.error = function (fn) {
                promise.then(null, function (response) {
                    fn(response.data, response.statusCode, response.headers, config);
                });
                return promise;
            };

            return promise;
        };

        createShortMethods(proxyMethod, 'get', 'delete', 'head', 'jsonp');
        createShortMethodsWithData(proxyMethod, 'post', 'put', 'patch');

        return proxyMethod;
    };

    module.service('baasicApiHttp', ['baasicApp', function baasicApiHttp(baasicApp) {
        var proxy = proxyFactory(baasicApp.get());

        proxy.createNew = function (app) {
            return proxyFactory(app);
        };

        return proxy;
    }]);
})(angular, module);