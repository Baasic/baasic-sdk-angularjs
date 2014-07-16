(function (angular, module, undefined) {
    "use strict";
    module.service("applicationSettingsService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "applicationSettingsRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, applicationSettingsRouteService) {
            return {
                get: function (data) {
                    return baasicApiHttp.get(applicationSettingsRouteService.get.expand(baasicApiService.getParams(data)))
                        .success(function (appSettings) {
                            appSettings.origins = appSettings.origins || [];
                        });
                },
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                }
            };
        }]);
}(angular, module));