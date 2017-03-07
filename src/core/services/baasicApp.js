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
				var cfg = angular.extend({}, config, {
					httpClient: httpClient
				});
				var app = new BaasicApp(apiKey, cfg);
				apps[apiKey] = function () {
					return app;
				};

				return app;
			};

			if (!defaultAppKey) {
				defaultAppKey = apiKey;
			}

			return app;
		};

		this.$get = ["$http", function ($http) {
			var httpClient = getHttpClient($http);

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

	function getHttpClient($http) {
		return function (request) {
			var config = {
				withCredentials: true,
				method: request.method,
				url: request.url.toString()
			};

			if (request.headers) config.headers = request.headers;
			if (request.body) config.data = request.body;

			return $http(config)
				.then(function (value) {
					return {
						headers: value.headers(),
						body: value.data,
						statusCode: value.status,
						statusText: value.statusText
					};
				});
		};
	}

}(angular, module));