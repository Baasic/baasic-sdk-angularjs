(function (angular, module, undefined) {
    "use strict";
    module.service("passwordRecoveryService", ["baasicApiHttp",
        function (baasicApiHttp) {
            var url = "RecoverPassword";

            return {
                requestReset: function (request) {
                    return baasicApiHttp({
                        url: url,
                        method: "POST",
                        data: request
                    });
                },
                change: function (change) {
                    return baasicApiHttp({
                        url: url,
                        method: "PUT",
                        data: change
                    });
                }
            };
        }]);
}(angular, module));