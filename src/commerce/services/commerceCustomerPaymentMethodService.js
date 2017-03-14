/* globals module */
/**
 * @module baasicCommerceCustomerPaymentMethodService
 * @description Baasic Commerce CustomerPaymentMethod Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceCustomerPaymentMethodService` uses `baasicCommerceCustomerPaymentMethodRouteService`.
 */
(function (angular, module, undefined) {
  'use strict';
  module.service('baasicCommerceCustomerPaymentMethodService', ['baasicApp',
    function (baasicApps) {
      var baasicApp = baasicApps.get();
      return {
        /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
baasicCommerceCustomerPaymentMethodService.find({
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
          return baasicApp.commerceModule.customers.paymentMethods.find(options);
        },
        /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                * @method        
                * @example 
baasicCommerceCustomerPaymentMethodService.get()
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        get: function (id, options) {
          return baasicApp.commerceModule.customers.paymentMethods.get(id, options);
        },
        /**
                 * Returns a promise that is resolved once the update commerce action has been performed; this action updates a commerce resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceCustomerPaymentMethodRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(commerceCustomerPaymentMethod);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// commerceCustomerPaymentMethod is a resource previously fetched using get action.
commerceCustomerPaymentMethod.isDefault : true;
baasicCommerceCustomerPaymentMethodService.update(commerceCustomerPaymentMethod)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/
        update: function (data) {
          return baasicApp.commerceModule.customers.paymentMethods.update(data);
        },
        /**
                 * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resource.
                 * @method        
                 * @example 
baasicCommerceCustomerPaymentMethodService.create({
  paymentMethodNonce : '<payment-method-nonce>',
  customerId : '<customer-id>',
  typeName : '<type-name>'
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/
        create: function (data) {
          return baasicApp.commerceModule.customers.paymentMethods.create(data);
        },
        /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a commerce resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceCustomerPaymentMethodRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(commerceCustomerPaymentMethod);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// commerceCustomerPaymentMethod is a resource previously fetched using get action.				 
baasicCommerceCustomerPaymentMethodService.remove(commerceCustomerPaymentMethod)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
        remove: function (data) {
          return baasicApp.commerceModule.customers.paymentMethods.remove(data);
        },
        /**
         * Provides direct access to `routeService`.
         * @method        
         * @example baasicCommerceCustomerPaymentMethodService.routeService.get(expandObject);
         **/
        routeService: baasicApp.commerceModule.customers.paymentMethods.routeDefinition
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