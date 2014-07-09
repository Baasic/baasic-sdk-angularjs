(function (angular, module, undefined) {
    "use strict";
    module.service("keyValueService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "keyValueRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, keyValueRouteService) {
            return {
                find: function (data) {
                    return baasicApiHttp.get(keyValueRouteService.find.expand(baasicApiService.findParams(data)));
                },
                get: function (data) {
                    return baasicApiHttp.get(keyValueRouteService.get.expand(baasicApiService.getParams(data)));
                },
                create: function (data) {
                    return baasicApiHttp.post(keyValueRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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