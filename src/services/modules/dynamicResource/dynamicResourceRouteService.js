(function (angular, module, undefined) {
    "use strict";
    module.service("baasicDynamicResourceRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("resource/{resourceName}/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("resource/{resourceName}/{id}/{?embed,fields}"),
                create: uriTemplateService.parse("resource/{resourceName}"),
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));