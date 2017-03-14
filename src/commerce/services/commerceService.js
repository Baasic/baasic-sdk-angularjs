/* globals module */
/**
 * @module baasicCommerceService
 * @description Baasic Commerce Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceService` uses `baasicCommerceRouteService`.
 */
(function (angular, module, undefined) {
  'use strict';
  module.service('baasicCommerceService', ['baasicApp',
    function (baasicApps) {
      var baasicApp = baasicApps.get();
      return {
        /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
baasicCommerceService.find({
  pageNumber : 1,
  pageSize : 10,
  orderBy : '<field>',
  orderDirection : '<asc|desc>',
  customerId: '<customer-id>'
})
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                 **/
        find: function (options) {
          return baasicApp.commerceModule.find(options);
        },
        /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                * @method        
                * @example 
baasicCommerceService.get('<id>', {})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        get: function (id, options) {
          return baasicApp.commerceModule.get(id, options);
        },
        /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                * @method        
                * @example 
baasicCommerceService.validateVAT({ countryCode: 'DE', vatId: 'DE999999999' })
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        validateVAT: function (countryCode, vatId) {
          return baasicApp.commerceModule.validateVAT(countryCode, vatId);
        },
        /**
                 * Returns a promise that is resolved once the subscribe pre-process commerce action has been performed; this action performes pre-subscribe operations such as getting client tokens etc.
                 * @method        
                 * @example 
baasicCommerceService.preprocess({
  systemName : '<system-name>',
  productId : '<product-id>',
  customerId: '<id>' 
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/
        preprocess: function (data) {
          return baasicApp.commerceModule.preprocess(data);
        },
        /**
                 * Returns a promise that is resolved once the subscribe commerce action has been performed; this action creates a new commerce subscription resource.
                 * @method        
                 * @example 
baasicCommerceService.subscribe({
  systemName : '<system-name>',
  productId : '<product-id>',
  customer: {
    id: '<id>',
    firstName: '<first-name>',
    lastName: '<last-name>'
  }} 
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/
        subscribe: function (data) {
          return baasicApp.commerceModule.subscribe(data);
        },
        /**
                 * Returns a promise that is resolved once the cancel subscription action has been performed. This action will remove a commerce subscription resource from the system if successfully completed. This route obtain routes from `baasicCommerceRouteService` route template. Here is an example of how execute this action:
                 * @method        
                 * @example				 
baasicCommerceService.cancel({
  systemName: '<system-name>',
  id: '<subscription-id>',
  requestRefund: <true/false>,
  refundAmount: <refund-amount>
}})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
        cancel: function (data) {
          return baasicApp.commerceModule.cancel(data);
        },
        /**
         * Provides direct access to `routeService`.
         * @method        
         * @example baasicCommerceService.routeService.get(expandObject);
         **/
        routeService: function () {
          return baasicApp.commerceModule.routeDefinition;
        }
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