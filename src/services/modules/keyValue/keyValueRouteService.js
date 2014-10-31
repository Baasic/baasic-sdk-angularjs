(function (angular, module, undefined) {
    "use strict";
    module.service("baasicKeyValueRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("keyvalue/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("keyvalue/{key}/{?embed,fields}"),
                create: uriTemplateService.parse("keyvalue"),
				parse: uriTemplateService.parse
            };
        }]);
}(angular, module));