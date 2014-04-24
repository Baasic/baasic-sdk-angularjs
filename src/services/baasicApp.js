module.provider("baasicApp", function baasicAppService() {
		var apps = {};
		var defaultApp;
		
		this.create = function create(apiKey, config) {
			var defaultConfig = {
				apiRootUrl: "api.baasic.local",
				apiVersion: "beta"
			};
			
			var app = MonoSoftware.Baasic.Application.init(apiKey, angular.extend(defaultConfig, config));
			
			apps[apiKey] = app;
			if (!defaultApp) {
				defaultApp = app;
			}
			
			return app;
		}
		
		this.$get = function () {
			return {
				all: function () {
					var list = [];
					for (var key in apps) {
						list.push(apps[key]);
					}
					
					return list;
				},
				get: function getBaasicApplication (apiKey) {
					if (apiKey) {
						return apps[apiKey];
					} else {
						return defaultApp;
					}
				}
			};
		};
	}
);
