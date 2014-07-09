(function (angular, module, undefined) {
    "use strict";
    module.service("keyValueRouteService", ["uriTemplateService",
        function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("keyvalue/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("keyvalue/{key}/{?embed,fields}"),
                create: uriTemplateService.parse("keyvalue")
            };
        }]);
}(angular, module));