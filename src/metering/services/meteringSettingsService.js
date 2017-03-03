

/* globals module */
/**
 * @module baasicMeteringSettingsService
 * @description Baasic Metering Settings Service provides an easy way to consume Baasic Metering REST API end-points. In order to obtain a needed routes `baasicMeteringSettingsService` uses `baasicMeteringSettingsRouteService`.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicMeteringSettingsService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicMeteringSettingsRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, routeService) {
            return {
                /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the metering resource.
                * @method        
                * @example 
baasicMeteringSettingsService.get()
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/  				
                get: function (options) {
                    return baasicApiHttp.get(routeService.get.expand(baasicApiService.getParams(options)));
                },
                /**
                 * Returns a promise that is resolved once the update metering action has been performed; this action updates a metering resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicMeteringSettingsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(meteringSettings);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// meteringSettings is a resource previously fetched using get action.
meteringSettings.dataRetentionPeriod = 60;
baasicMeteringSettingsService.update(meteringSettings)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/					
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },                 
                /**
                * Provides direct access to `routeService`.
                * @method        
                * @example baasicMeteringSettingsService.routeService.get.expand(expandObject);
                **/  							    
				        routeService: routeService
            };
        }]);
}(angular, module));

/**
 * @copyright (c) 2017 Mono Ltd
 * @license MIT
 * @author Mono Ltd
 * @overview 
 ***Notes:**
 - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/
