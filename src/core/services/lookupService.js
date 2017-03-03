/* globals module */
/**
 * @module baasicLookupService
 * @description Baasic Lookup Service provides an easy way to consume Baasic Lookup REST API end-points. In order to obtain needed routes `baasicLookupService` uses `baasicLookupRouteService`.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicLookupService', ['baasicApiHttp', 'baasicApp', 'baasicApiService', 'baasicLookupRouteService',
        function (baasicApiHttp, baasicApp, baasicApiService, lookupRouteService) {			
			function getResponseData(embed, data) {
				var responseData = {};
				if (embed) {
					var embeds = embed.split(',');
                    for (var index in embeds) {
                        var propName = embeds[index];
                        if (data.hasOwnProperty(propName)) {
                            responseData[propName] = data[propName];
                        }
                    }
				}
				return responseData;
			}

            return {
                routeService: lookupRouteService,
                 /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the lookup resources.
                 * @method        
                 * @example 
baasicLookupService.get()
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/  					
                get: function (options) {
                    var deferred = baasicApiHttp.createHttpDefer();
                    var embed = options.embed || 'role,accessAction,accessSection,snProvider';
					baasicApiHttp.get(lookupRouteService.get.expand(baasicApiService.getParams({
						embed: embed
					})))
						.success(function (data, status, headers, config) {							
							var responseData = getResponseData(embed, data);								
							deferred.resolve({
								data: responseData,
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
                    return deferred.promise;
                }
            };
        }]);
}(angular, module));
/**
 * @overview 
 ***Notes:**
 - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/