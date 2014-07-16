(function (angular, module, undefined) {
    "use strict";
    module.service("baasicLoginRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                login: uriTemplateService.parse("/login/{?embed,fields}"),
				parse: uriTemplateService.parse
            };
        }]);
}(angular, module));