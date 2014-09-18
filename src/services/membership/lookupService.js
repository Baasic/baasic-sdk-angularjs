(function (angular, module, undefined) {
    "use strict";
    module.service("baasicLookupService", ["baasicApiHttp", "baasicApiService", "baasicLookupRouteService",
        function (baasicApiHttp, baasicApiService, lookupRouteService) {
            var lookupKey = "baasic-lookup-data";
            return {
                routeService: lookupRouteService,
                get: function (data) {
                    var deferred = baasicApiHttp.createHttpDefer();
                    var result = JSON.parse(localStorage.getItem(lookupKey));
                    if (result === undefined || result === null) {
                        baasicApiHttp.get(lookupRouteService.get.expand(baasicApiService.getParams(data)))
                            .success(function (data, status, headers, config) {
                                localStorage.setItem(lookupKey, JSON.stringify(data));
                                deferred.resolve({
                                    data: data,
                                    status: status,
                                    headers: headers,
                                    config: config
                                });
                            })
                            .error(function (data, status, headers, config) {
                                deferred.reject({
                                    data: data,
                                    status: status,
                                    headers: headers,
                                    config: config
                                });
                            });
                    } else {
                        deferred.resolve({
                            data: result
                        });
                    }
                    return deferred.promise;
                },
                reset: function () {
                    localStorage.setItem(lookupKey, null);
                }
            };
        }]);
}(angular, module));