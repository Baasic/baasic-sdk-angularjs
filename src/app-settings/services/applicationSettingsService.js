/* globals module */
/**
 * @module baasicApplicationSettingsService
 * @description Baasic Application Settings Service provides an easy way to consume Baasic Application Settings REST API end-points. In order to obtain needed routes `baasicApplicationSettingsService` uses `baasicApplicationSettingsRouteService`.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicApplicationSettingsService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicApplicationSettingsRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, applicationSettingsRouteService) {
            return {    
                /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the application settings resource.
                * @method        
                * @example 
baasicApplicationSettingsService.get()
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/  				
                get: function (options) {
                    return baasicApiHttp.get(applicationSettingsRouteService.get.expand(baasicApiService.getParams(options)))
                        .success(function (appSettings) {
                            appSettings.origins = appSettings.origins || [];
                        });
                },
                 /**
                 * Returns a promise that is resolved once the update application settings action has been performed. This action updates the application setting resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't use `baasicApplicationSettingsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(appSettings);
var uri = params['model'].links('put').href;				 
```
                 * @method        
                 * @example 
// appSettings is a resource previously fetched using get action.
appSettings.allowAnyOrigin = true;
baasicApplicationSettingsService.update(appSettings)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/					
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
					var model = params[baasicConstants.modelPropertyName];
                    return baasicApiHttp.put(model.links('put').href, model);
                },
                
				routeService: applicationSettingsRouteService
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
