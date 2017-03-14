/* globals module */
/**
 * @module baasicCommerceCustomerService
 * @description Baasic Commerce Customer Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceCustomerService` uses `baasicCommerceCustomerRouteService`.
 */
(function (angular, module, undefined) {
  'use strict';
  module.service('baasicCommerceCustomerService', ['baasicApp',
    function (baasicApps) {
      var baasicApp = baasicApps.get();
      return {
        /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
baasicCommerceCustomerService.find({
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
          return baasicApp.commerceModule.customers.find(options);
        },
        /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                * @method        
                * @example 
baasicCommerceCustomerService.get()
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        get: function (id, options) {
          return baasicApp.commerceModule.customers.get(id, options);
        },
        /**
                 * Returns a promise that is resolved once the update commerce action has been performed; this action updates a commerce resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceCustomerRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(commerceCustomer);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// commerceCustomer is a resource previously fetched using get action.
commerceCustomer.isDefault : true;
baasicCommerceCustomerService.update(commerceCustomer)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/
        update: function (data) {
          return baasicApp.commerceModule.customers.update(data);
        },
        /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a commerce resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceCustomerRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(commerceCustomer);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// commerceCustomer is a resource previously fetched using get action.				 
baasicCommerceCustomerService.remove(commerceCustomer)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
        remove: function (data) {
          return baasicApp.commerceModule.customers.remove(data);
        },
        /**
         * Provides direct access to `routeService`.
         * @method        
         * @example baasicCommerceCustomerService.routeService.get(expandObject);
         **/
        routeService: baasicApp.commerceModule.customers.routeDefinition
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