(function (angular, module, undefined) {
    "use strict";

    var extend = angular.extend;

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

                    var wwwAuthenticate = response.headers("WWW-Authenticate");
                    if (wwwAuthenticate) {
                        var scheme,
							details,
							splitIndex = wwwAuthenticate.indexOf(" ");

                        if (splitIndex === -1) {
                            scheme = wwwAuthenticate;
                        } else {
                            scheme = wwwAuthenticate.substring(0, splitIndex);
                            details = {};
                            var detailsText = wwwAuthenticate.substring(splitIndex + 1),
                                currentPosition = 0;
                                
                            do {
                                var setIndex = detailsText.indexOf("=", currentPosition);
                                if (setIndex !== -1) {
                                    var key = detailsText.substring(currentPosition, setIndex);
                                    currentPosition = setIndex + 1;
                                    var firstChar = detailsText.charAt(currentPosition);
                                    var valueEndIndex;
                                    if (firstChar === '"') {
                                        currentPosition += 1;
                                        valueEndIndex = detailsText.indexOf('"', currentPosition);
                                    } else if (firstChar === "'") {
                                        currentPosition += 1;
                                        valueEndIndex = detailsText.indexOf("'", currentPosition);
                                    } else {
                                        valueEndIndex = detailsText.indexOf(",", currentPosition)
                                    }

                                    var value;
                                    if (valueEndIndex === -1) {
                                        value = detailsText.substring(currentPosition);
                                    } else {
                                        value = detailsText.substring(currentPosition, valueEndIndex);
                                    }

                                    details[key] = value;

                                    if (valueEndIndex === -1) {
                                        break;
                                    } else {
                                        currentPosition = detailsText.indexOf(",", valueEndIndex);
                                        if (currentPosition !== -1) {
                                            if (currentPosition === detailsText.length - 1) {
                                                break;
                                            } else {
                                                currentPosition += 1;
                                            }
                                        }
                                    }
                                }
                            } while (currentPosition !== -1);
                        }

                        if (scheme.toLowerCase() === "bearer") {
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
