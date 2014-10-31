(function (angular, module, undefined) {
    "use strict";
    module.service("baasicValueSetItemRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("valuesetitems/set/{setName}/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("valuesetitems/set/{setName}/item/{itemKey}/{?embed,fields}"),
                create: uriTemplateService.parse("valuesetitems"),
				parse: uriTemplateService.parse
            };
        }]);
}(angular, module));