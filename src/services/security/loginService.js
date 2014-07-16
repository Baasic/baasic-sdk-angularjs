(function (angular, module, undefined) {
    "use strict";
    module.service("baasicLoginService", ["baasicApiHttp", "baasicLoginRouteService",
        function (baasicApiHttp, loginRouteService) {
            return {
                login: function (username, password) {
                    var data = 'grant_type=password&username=' + username + '&password=' + password;

                    return baasicApiHttp({
                        url: loginRouteService.login.expand({}) + "?withSession=true",
                        method: "POST",
                        data: data,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        }
                    });
                },
                loadUserData: function loadUserData(data) {
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