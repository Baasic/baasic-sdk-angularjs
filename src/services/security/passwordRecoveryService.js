(function (angular, module, undefined) {
    "use strict";
    module.service("baasicPasswordRecoveryService", ["baasicApiHttp", "baasicPasswordRecoveryRouteService",
        function (baasicApiHttp, passwordRecoveryRouteService) {
            
            return {
				routeService: passwordRecoveryRouteService,
                requestReset: function (request) {
                    return baasicApiHttp({
                        url: passwordRecoveryRouteService.passwordRecovery.expand({}),
                        method: "POST",
                        data: request
                    });
                },
                change: function (change) {
                    return baasicApiHttp({
                        url: passwordRecoveryRouteService.passwordRecovery.expand({}),
                        method: "PUT",
                        data: change
                    });
                }
            };
        }]);
}(angular, module));