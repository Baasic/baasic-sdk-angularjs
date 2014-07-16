(function (angular, module, undefined) {
    "use strict";
    module.service("loginRouteService", ["uriTemplateService",
        function (uriTemplateService) {
            return {
                login: uriTemplateService.parse("/login/{?embed,fields}"),
				parse: uriTemplateService.parse
            };
        }]);
}(angular, module));