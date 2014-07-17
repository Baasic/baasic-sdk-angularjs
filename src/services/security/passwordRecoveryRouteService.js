(function (angular, module, undefined) {
    "use strict";
    module.service("baasicPasswordRecoveryRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                passwordRecovery: uriTemplateService.parse("/RecoverPassword"),
				parse: uriTemplateService.parse
            };
        }]);
}(angular, module));