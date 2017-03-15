/* globals module, MonoSoftware */
/**
 * @module baasicApp
 * @description  `baasicApp` service is used to manage Baasic application instances. Multiple AngularJS application instances can be created and coexist at the same time (each will communicate with its corresponding Baasic application).
 */

(function (angular, module, undefined) {
	'use strict';
	module.provider('baasicApp', function baasicAppService() {
		var apps = {};
		var defaultAppKey;
		/**
        * Create an application.
        * @method create       
        * @example
		var app = baasicApp.create('<api-key>', {
			apiRootUrl : 'api.baasic.com',	
			apiVersion : '<version>' 
		});      
        **/
		this.create = function create(apiKey, config) {

			apps[apiKey] = function (httpClient) {
				var cfg = angular.extend({
					httpClient: function () {
						return httpClient;
					}
				}, config);
				var app = new baasicSdkJavaScript.BaasicApp(apiKey, cfg);
				apps[apiKey] = function () {
					return app;
				};

				return app;
			};

			if (!defaultAppKey) {
				defaultAppKey = apiKey;
			}
		};

		this.$get = ["$http", "$q", function ($http, $q) {
			var httpClient = getHttpClient($http, $q);

			return {
				/**
				 * Returns a list of all applications.
				 * @method        
				 * @example baasicApp.all();               
				 **/
				all: function () {
					var list = [];
					for (var key in apps) {
						list.push(apps[key](httpClient));
					}

					return list;
				},
				/**
				 * Returns a specified application.
				 * @method        
				 * @example baasicApp.get('<api-key>');               
				 **/
				get: function getBaasicApplication(apiKey) {
					var appFactory;
					if (apiKey) {
						appFactory = apps[apiKey];
					} else {
						appFactory = apps[defaultAppKey];
					}

					return appFactory(httpClient);
				}
			};
		}];
	});

	function getHttpClient($http, $q) {
		return {
			createPromise: function (deferFn) {
				var deferred = $q.defer();
				deferFn(deferred.resolve, deferred.reject);
				var promise = deferred.promise;

				promise.success = function (fn) {
					promise.then(function (response) {
						resolveHttpPromise(fn, response);
					}, null);
					return promise;
				};

				promise.error = function (fn) {
					promise.then(null, function (response) {
						resolveHttpPromise(fn, response);
					});
					return promise;
				};

				return promise;
			},
			request: function (request) {
				var config = {
					withCredentials: true,
					method: request.method,
					url: request.url.toString()
				};

				if (request.headers) config.headers = request.headers;
				if (request.data) config.data = request.data;

				var promise = $http(config)
					.then(function (value) {
						return {
							headers: value.headers(),
							data: value.data,
							statusCode: value.status,
							statusText: value.statusText,
							request: request
						};
					}, function (data) {
						throw {
							headers: data.headers(),
							data: data.data,
							statusCode: data.status,
							statusText: data.statusText,
							request: request
						};
					});

				promise.success = function (fn) {
					promise.then(function (response) {
						fn(response.data, response.statusCode, response.headers, request);
					}, null);
					return promise;
				};

				promise.error = function (fn) {
					promise.then(null, function (response) {
						fn(response.data, response.statusCode, response.headers, request);
					});
					return promise;
				};

				return promise;
			}
		};
	}

	function resolveHttpPromise(fn, response) {
		var config = angular.extend({}, response.request);
		if (config.url) config.url = config.url.toString();
		fn(response.data, response.statusCode, response.headers, config);
	}

}(angular, module));