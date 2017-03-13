/* globals module */
/**
 * @module baasicLookupService
 * @description Baasic Lookup Service provides an easy way to consume Baasic Lookup REST API end-points. In order to obtain needed routes `baasicLookupService` uses `baasicLookupRouteService`.
 */
(function (angular, module, undefined) {
	'use strict';
	module.service('baasicLookupService', ['baasicApp',
		function (baasicApps) {
			var baasicApp = baasicApps.get();
			return {
				routeService: function () {
					return baasicApp.membershipModule.lookups.routeDefinition;
				},
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
					return baasicApp.membershipModule.lookups.get(options);
				}
			};
		}
	]);
}(angular, module));
/**
 * @overview 
 ***Notes:**
 - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/