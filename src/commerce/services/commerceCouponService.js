/* globals module */
/**
 * @module baasicCommerceCouponService
 * @description Baasic Commerce Coupon Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasiccommerceCouponService` uses `baasiccommerceCouponRouteService`.
 */
(function (angular, module, undefined) {
  'use strict';
  module.service('baasicCommerceCouponService', ['baasicApp',
    function (baasicApps) {
      var baasicApp = baasicApps.get();
      return {
        /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
baasicCommerceCouponService.find({
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
          return baasicApp.commerceModule.coupons.find(options);
        },
        /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                * @method        
                * @example 
baasicCommerceCouponService.get()
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        get: function (id, options) {
          return baasicApp.commerceModule.coupons.get(id, options);
        },
        /**
                 * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resource.
                 * @method        
                 * @example 
baasicCommerceCouponService.create({
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
          return baasicApp.commerceModule.coupons.create(data);
        },
        /**
                 * Returns a promise that is resolved once the update commerce action has been performed; this action updates a commerce resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasiccommerceCouponRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(commerceCoupon);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// commerceCoupon is a resource previously fetched using get action.
commerceCoupon.shortDescription : '<short-description>';
baasiccommerceCouponService.update(commerceCoupon)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/
        update: function (data) {
          return baasicApp.commerceModule.coupons.update(data);
        },
        /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a commerce resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasiccommerceCouponRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(commerceCoupon);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// commerceCoupon is a resource previously fetched using get action.				 
baasiccommerceCouponService.remove(commerceCoupon)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
        remove: function (data) {
          return baasicApp.commerceModule.coupons.remove(data);
        },

        /* Coupon uses per coupon Id */

        /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
baasicCommerceCouponService.findCouponUses(couponId, {
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
        findCouponUses: function (couponId, options) {
          return baasicApp.commerceModule.coupons.findCouponUses(couponId, options);
        },        

        /**
         * Provides direct access to `routeService`.
         * @method        
         * @example baasiccommerceCouponService.routeService.get(expandObject);
         **/
        routeService: baasicApp.commerceModule.coupons.routeDefinition
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