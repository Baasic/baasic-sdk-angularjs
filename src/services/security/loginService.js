(function (angular, module, undefined) {
    "use strict";
    module.service("baasicLoginService", ["baasicApiHttp", "baasicLoginRouteService",
        function (baasicApiHttp, loginRouteService) {
            return {
				routeService: loginRouteService,
                login: function (data) {
                    var formData = 'grant_type=password&username=' + data.username + '&password=' + data.password;

                    return baasicApiHttp({
                        url: loginRouteService.login.expand(data),
                        method: "POST",
                        data: formData,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        }
                    });
                },
                loadUserData: function loadUserData(data) {
					data = data || {};
                    return baasicApiHttp.get(loginRouteService.login.expand(data), { headers: { "Accept": "application/json; charset=UTF-8" } });
                },
                logout: function (token, type) {
                    return baasicApiHttp({
                        url: loginRouteService.login.expand({}),
                        method: "DELETE",
                        data: {
                            token: token,
                            type: type
                        }
                    });
                }
            };
        }]);
}(angular, module));