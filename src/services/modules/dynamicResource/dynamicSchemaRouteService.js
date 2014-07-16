(function (angular, module, undefined) {
    "use strict";
    module.service("dynamicSchemaRouteService", ["uriTemplateService",
        function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("schema/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("schema/{resourceName}/{?embed,fields}"),
                generateSchema: uriTemplateService.parse("schema/generate"),
                create: uriTemplateService.parse("schema"),
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));