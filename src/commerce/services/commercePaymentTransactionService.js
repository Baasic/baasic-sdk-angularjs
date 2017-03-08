
/* globals module */
/**
 * @module baasicCommercePaymentTransactionService
 * @description Baasic Commerce PaymentTransaction Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommercePaymentTransactionService` uses `baasicCommercePaymentTransactionRouteService`.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicCommercePaymentTransactionService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicCommercePaymentTransactionRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, routeService) {
            return {    
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
baasicCommercePaymentTransactionService.find({
  pageNumber : 1,
  pageSize : 10,
  orderBy : '<field>',
  orderDirection : '<asc|desc>',
  search : '<search-phrase>'
})
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                 **/ 				
                find: function (options) {
                    return baasicApiHttp.get(routeService.find.expand(baasicApiService.findParams(options)));
                },
                /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                * @method        
                * @example 
baasicCommercePaymentTransactionService.get()
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/  				
                get: function (id, options) {
                    return baasicApiHttp.get(routeService.get.expand(baasicApiService.getParams(id, options)));
                },                 
                /**
                 * Returns a promise that is resolved once the update commerce action has been performed; this action updates a commerce resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommercePaymentTransactionRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(commercePaymentTransaction);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// commercePaymentTransaction is a resource previously fetched using get action.
commercePaymentTransaction.amount : 100;
baasicCommercePaymentTransactionService.update(commercePaymentTransaction)
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
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a commerce resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommercePaymentTransactionRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(commercePaymentTransaction);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// commercePaymentTransaction is a resource previously fetched using get action.				 
baasicCommercePaymentTransactionService.remove(commercePaymentTransaction)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/					
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },                 
                /**
                * Provides direct access to `routeService`.
                * @method        
                * @example baasicCommercePaymentTransactionService.routeService.get.expand(expandObject);
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
