(function (angular, module, undefined) {
    "use strict";

    var extend = angular.extend;
	// Tokenizer and unqoute code taken from http://stackoverflow.com/questions/5288150/digest-authentication-w-jquery-is-it-possible/5288679#5288679
	var wwwAuthenticateTokenizer = (function () {
		var ws = '(?:(?:\\r\\n)?[ \\t])+',
		token = '(?:[\\x21\\x23-\\x27\\x2A\\x2B\\x2D\\x2E\\x30-\\x39\\x3F\\x41-\\x5A\\x5E-\\x7A\\x7C\\x7E]+)',
		quotedString = '"(?:[\\x00-\\x0B\\x0D-\\x21\\x23-\\x5B\\\\x5D-\\x7F]|'+ws+'|\\\\[\\x00-\\x7F])*"';
		
		return RegExp(token+'(?:=(?:'+quotedString+'|'+token+'))?', 'g');
	})();
	
	function unquote(quotedString) {
		return quotedString.substr(1, quotedString.length-2).replace(/(?:(?:\r\n)?[ \t])+/g, " ");
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
					for (var i=1,l=tokens.length;i<l;i++) {
						var values = tokens[i].split("=");
						details[values[0]] = unqoute(values[1]);
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

                    var wwwAuthenticate = parseWWWAuthenticateHeader(response.headers("WWW-Authenticate"));
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
