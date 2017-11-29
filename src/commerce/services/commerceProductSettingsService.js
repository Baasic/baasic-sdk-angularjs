/* globals module */
/**
 * @module baasicCommerceProductSettingsService
 * @description Baasic Commerce Product Settings Service provides an easy way to consume Baasic Commerce Product Settings REST API end-points. In order to obtain needed routes `baasicCommerceProductSettingsService` uses `baasicCommerceProductSettingsRouteService`.
 */
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicCommerceProductSettingsService', ['baasicApp',
        function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the product settings.
                 * @method        
                 * @example 
baasicCommerceProductSettingsService.get()
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
                get: function (options) {
                    return baasicApp.commerceModule.settings.get(options);
                },
                /**
                 * Returns a promise that is resolved once the update product settings action has been performed; this action updates product settings. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceProductSettingsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(productSettings);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// productSettings is a resource previously fetched using get action.
productSettings.allowArchive = true;
baasicCommerceProductSettingsService.update(productSettings)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/
                update: function (data) {
                    return baasicApp.commerceModule.settings.update(data);
                },
                /**
                 * Provides direct access to `baasicCommerceProductSettingsRouteService`.
                 * @method        
                 * @example baasicCommerceProductSettingsService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.commerceModule.settings.routeDefinition
            };
        }
    ]);
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