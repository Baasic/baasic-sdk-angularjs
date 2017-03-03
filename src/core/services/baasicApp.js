/* globals module, MonoSoftware */
/**
 * @module baasicApp
 * @description  `baasicApp` service is used to manage Baasic application instances. Multiple AngularJS application instances can be created and coexist at the same time (each will communicate with its corresponding Baasic application).
*/

(function (angular, module, undefined) {
	'use strict';
	module.provider('baasicApp', function baasicAppService() {
		var apps = {};
		var defaultApp;
        /**
        * Create an application.
        * @method create       
        * @example
var app = baasicApp.create('<api-key>', {
    apiRootUrl : 'api.baasic.com',
	// for beta please use "beta" as a desired version
    apiVersion : '<version>' 
});      
        **/ 
		this.create = function create(apiKey, config) {
			var defaultConfig = {
				apiRootUrl: 'api.baasic.local',
				apiVersion: 'beta'
			};
			var app = MonoSoftware.Baasic.Application.init(apiKey, angular.extend(defaultConfig, config));

			apps[apiKey] = app;
			if (!defaultApp) {
				defaultApp = app;
			}

			return app;
		};

		this.$get = function () {
			return {
                /**
                * Returns a list of all applications.
                * @method        
                * @example baasicApp.all();               
                **/ 				
				all: function () {
					var list = [];
					for (var key in apps) {
						list.push(apps[key]);
					}
					
					return list;
				},
                /**
                * Returns a specified application.
                * @method        
                * @example baasicApp.get('<api-key>');               
                **/ 				
				get: function getBaasicApplication (apiKey) {
					if (apiKey) {
						return apps[apiKey];
					} else {
						return defaultApp;
					}
				}
			};
		};
	});
}(angular, module));