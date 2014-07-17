(function (angular, module, undefined) {
    "use strict";
    module.service("baasicValueSetService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicValueSetRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, valueSetRouteService) {
            return {
				routeService: valueSetRouteService,
                find: function (data) {
                    return baasicApiHttp.get(valueSetRouteService.find.expand(baasicApiService.findParams(data)));
                },
                get: function (data) {
                    return baasicApiHttp.get(valueSetRouteService.get.expand(baasicApiService.getParams(data, 'setName')));
                },
                create: function (data) {
                    return baasicApiHttp.post(valueSetRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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