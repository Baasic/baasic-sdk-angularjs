/* globals module */
/**
 * @module baasicCommerceCouponUseService
 * @description Baasic Commerce Coupon Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceProductService` uses `baasicCommerceProductRouteService`.
 */
(function (angular, module, undefined) {
  'use strict';
  module.service('baasicCommerceCouponUseService', ['baasicApp',
    function (baasicApps) {
      var baasicApp = baasicApps.get();
      return {
        /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
baasicCommerceCouponUseService.find({
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
          return baasicApp.commerceModule.couponUses.find(options);
        },
        /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                * @method        
                * @example 
baasicCommerceCouponUseService.get()
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        get: function (id, options) {
          return baasicApp.commerceModule.couponUses.get(id, options);
        },
        /**
                 * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resource.
                 * @method        
                 * @example 
baasicCommerceCouponUseService.create({
  name : '<product-name>',
  slug : '<slug>',
  shortDescription : '<short-description>',
  recurringCyclePeriodTypeId: '<recurring-cycle-period-type-id>'
  planId : '<plan-id>',
  price: 100,
  published: true
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/
        create: function (data) {
          return baasicApp.commerceModule.couponUses.create(data);
        },
        /**
                 * Returns a promise that is resolved once the update commerce action has been performed; this action updates a commerce resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceProductRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(commerceCouponUse);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// commerceCouponUse is a resource previously fetched using get action.
commerceCouponUse.shortDescription : '<short-description>';
baasicCommerceCouponUseService.update(commerceCouponUse)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/
        update: function (data) {
          return baasicApp.commerceModule.couponUses.update(data);
        },
        /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a commerce resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceProductRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(commerceCouponUse);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// commerceCouponUse is a resource previously fetched using get action.				 
baasicCommerceCouponUseService.remove(commerceCouponUse)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
        remove: function (data) {
          return baasicApp.commerceModule.couponUses.remove(data);
        },
        /**
         * Provides direct access to `routeService`.
         * @method        
         * @example baasicCommerceCouponUseService.routeService.get(expandObject);
         **/
        routeService: baasicApp.commerceModule.couponUses.routeDefinition
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