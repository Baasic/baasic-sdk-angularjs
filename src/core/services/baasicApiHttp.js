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
	// Tokenizer and unquote code taken from http://stackoverflow.com/questions/5288150/digest-authentication-w-jquery-is-it-possible/5288679#5288679
	var wwwAuthenticateTokenizer = (function () {
		var ws = '(?:(?:\\r\\n)?[ \\t])+',
		token = '(?:[\\x21\\x23-\\x27\\x2A\\x2B\\x2D\\x2E\\x30-\\x39\\x3F\\x41-\\x5A\\x5E-\\x7A\\x7C\\x7E]+)',
		quotedString = '"(?:[\\x00-\\x0B\\x0D-\\x21\\x23-\\x5B\\\\x5D-\\x7F]|'+ws+'|\\\\[\\x00-\\x7F])*"';
		
		return new RegExp(token+'(?:=(?:'+quotedString+'|'+token+'))?', 'g');
	})();
	
	function unquote(quotedString) {
		return quotedString.substr(1, quotedString.length-2).replace(/(?:(?:\r\n)?[ \t])+/g, ' ');
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
						var values = tokens[i].split('=');
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
        return startsWith(lowerUrl, 'http://') || startsWith(lowerUrl, 'https://');
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
        var apiUrl = app.getApiUrl();
		
		function removeToken(details) {
			var token = app.getAccessToken();
			app.updateAccessToken(null);
			$rootScope.$broadcast('token_error', {
				token: token,
				error: details.error,
				/*jshint camelcase: false */
				errorDescription: details.error_description
			});
		}
		
		function parseHeaders(headers) {
			var wwwAuthenticate = parseWWWAuthenticateHeader(headers('WWW-Authenticate'));
			if (wwwAuthenticate) {
				if (wwwAuthenticate.scheme.toLowerCase() === 'bearer') {
					var details = wwwAuthenticate.details;
					if (details) {
						if (details.error) {
							switch (details.error) {
								case 'invalid_token':
									removeToken(details);
									break;
								case 'invalid_request':
									/*jshint camelcase: false */
									switch (details.error_description) {
									/*jshint camelcase: true */
										case 'Missing or invalid session':
										removeToken(details);
										break;
									}
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

                if (!headers.hasOwnProperty('Content-Type')) {
                    headers['Content-Type'] = 'application/json; charset=UTF-8';
                }
				/*jshint sub: true */
                if (!headers.hasOwnProperty('Accept')) {
                    headers['Accept'] = 'application/hal+json; charset=UTF-8';
                }
				/*jshint sub: false */

                var token = app.getAccessToken();
                if (token) {
					/*jshint camelcase: false, sub: true */
                    headers['AUTHORIZATION'] = token.token_type + ' ' + token.access_token;
                }
            }

            var promise = $http(config);

            promise = extend(promise
				.then(function (response) {
					if (response.headers) {
						var contentType = response.headers('Content-Type');
						if (contentType && contentType.toLowerCase().indexOf('application/hal+json') !== -1) {
							response.data = parser.parse(response.data);
						}

						parseHeaders(response.headers);
					}
				}, function (response) {
					if (response.headers) {
						parseHeaders(response.headers);
					}
				})
				.finally(function () {
					var token = app.getAccessToken();
					if (token) {
						/*jshint camelcase: false */
						var slidingWindow = token.sliding_window;
						/*jshint camelcase: true */
						if (slidingWindow) {
							token.expireTime = new Date().getTime() + (token.slidingWindow * 1000);
							app.updateAccessToken(token);
						}
					}
				}), promise);

            return promise;
        };

        createShortMethods(proxyMethod, 'get', 'delete', 'head', 'jsonp');
        createShortMethodsWithData(proxyMethod, 'post', 'put', 'patch');

        return proxyMethod;
    };
    
    module.service('baasicApiHttp', ['$rootScope', '$http', 'HALParser', 'baasicApp', function baasicApiHttp($rootScope, $http, HALParser, baasicApp) {
		var parser = new HALParser();
			
		var proxy = proxyFactory($rootScope, $http, parser, baasicApp.get());
			
		proxy.createNew = function (app) {
			return proxyFactory($rootScope, $http, parser, app);
		};
			
		return proxy;
	}]);
})(angular, module);
