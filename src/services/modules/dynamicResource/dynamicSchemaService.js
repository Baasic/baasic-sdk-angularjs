(function (angular, module, undefined) {
    "use strict";
    module.service("dynamicSchemaService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "dynamicSchemaRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, dynamicSchemaRouteService) {
            return {
                find: function (data) {
                    return baasicApiHttp.get(dynamicSchemaRouteService.find.expand(baasicApiService.findParams(data)));
                },
                get: function (data) {
                    return baasicApiHttp.get(dynamicSchemaRouteService.get.expand(baasicApiService.getParams(data, 'resourceName')));
                },
                create: function (data) {
                    return baasicApiHttp.post(dynamicSchemaRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                generateSchema: function (data) {
                    return baasicApiHttp.post(dynamicSchemaRouteService.generateSchema.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                }
            };
        }]);
}(angular, module));