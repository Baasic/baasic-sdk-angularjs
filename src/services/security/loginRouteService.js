(function (angular, module, undefined) {
    "use strict";
    module.service("loginRouteService", ["uriTemplateService",
        function (uriTemplateService) {
            return {
                login: uriTemplateService.parse("/login")
            };
        }]);
}(angular, module));