(function (angular, module, undefined) {
    "use strict";
    module.service("applicationSettingsRouteService", ["uriTemplateService",
        function (uriTemplateService) {
            return {
                get: uriTemplateService.parse("application/{key}/{?embed,fields}"),
                update: uriTemplateService.parse("application/{key}/"),
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));