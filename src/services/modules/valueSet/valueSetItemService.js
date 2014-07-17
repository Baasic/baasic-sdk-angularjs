(function (angular, module, undefined) {
    "use strict";
    module.service("baasicValueSetItemService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicValueSetItemRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, valueSetItemRouteService) {
            return {
				routeService: valueSetItemRouteService,
                find: function (data) {
                    return baasicApiHttp.get(valueSetItemRouteService.find.expand(baasicApiService.findParams(data)));
                },
                get: function (data) {
                    return baasicApiHttp.get(valueSetItemRouteService.get.expand(baasicApiService.getParams(data)));
                },
                create: function (data) {
                    return baasicApiHttp.post(valueSetItemRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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