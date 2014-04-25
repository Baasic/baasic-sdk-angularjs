(function (angular, module, undefined) {
	module.service("baasicApiHttp", ["$http", "HALParser", "baasicApp", function baasicApiHttp($http, HALParser, baasicApp) {
			var parser = new HALParser();
			
			var proxy = proxyFactory($http, parser, baasicApp.get());
			
			proxy.createNew = function (app) {
				return proxyFactory($http, parser, app);
			};
			
			return proxy;
		}
	]);
	
	var extend = angular.extend;
	
	var proxyFactory = function proxyFactory($http, parser, app) {
		var apiUrl = app.get_apiUrl();

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

				var token = app.get_accessToken();
				if (token) {
					headers["AUTHORIZATION"] = token.token_type + ' ' + token.access_token;
				}
			}

			var promise = $http(config);

			promise = extend(promise.then(function (response) {
				if (response.headers) {
					var contentType = response.headers["Content-Type"];
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
})(angular, module);
