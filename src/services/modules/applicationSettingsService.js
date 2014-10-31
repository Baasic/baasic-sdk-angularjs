(function (angular, module, undefined) {
    "use strict";
    module.service("baasicApplicationSettingsService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicApplicationSettingsRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, applicationSettingsRouteService) {
            return {
				routeService: applicationSettingsRouteService,
                get: function (data) {
                    return baasicApiHttp.get(applicationSettingsRouteService.get.expand(baasicApiService.getParams(data)))
                        .success(function (appSettings) {
                            appSettings.origins = appSettings.origins || [];
                        });
                },
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                }
            };
        }]);
}(angular, module));