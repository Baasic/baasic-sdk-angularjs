(function (angular, module, undefined) {
    "use strict";
    module.service("baasicApplicationSettingsRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                get: uriTemplateService.parse("application/{?embed,fields}"),
                update: uriTemplateService.parse("application/"),				
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));