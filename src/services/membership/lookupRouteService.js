(function (angular, module, undefined) {
    "use strict";
    module.service("baasicLookupRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                get: uriTemplateService.parse("lookup/{?embed,fields}")
            };
        }]);
}(angular, module));