(function (angular, module, undefined) {
    "use strict";
    module.service("dynamicResourceService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "dynamicResourceRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, dynamicResourceRouteService) {
            return {
                find: function (data) {
                    return baasicApiHttp.get(dynamicResourceRouteService.find.expand(baasicApiService.findParams(data)));
                },
                get: function (data) {
                    return baasicApiHttp.get(dynamicResourceRouteService.get.expand(baasicApiService.getParams(data)));
                },
                create: function (data) {
                    return baasicApiHttp.post(dynamicResourceRouteService.create.expand({ resourceName: data.resourceName }), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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