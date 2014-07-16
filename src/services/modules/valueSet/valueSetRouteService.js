(function (angular, module, undefined) {
    "use strict";
    module.service("valueSetRouteService", ["uriTemplateService",
        function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("valueset/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("valueset/{setName}/{?embed,fields}"),
                create: uriTemplateService.parse("valueset"),
				parse: uriTemplateService.parse
            };
        }]);
}(angular, module));