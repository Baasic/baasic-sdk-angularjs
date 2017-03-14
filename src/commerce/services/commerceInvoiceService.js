/* globals module */
/**
 * @module baasicCommerceInvoiceService
 * @description Baasic Commerce Invoice Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceInvoiceService` uses `baasicCommerceInvoiceRouteService`.
 */
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicCommerceInvoiceService', ['baasicApp',
        function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
baasicCommerceInvoiceService.find({
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
                    return baasicApp.commerceModule.invoices.find(options);
                },
                /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                * @method        
                * @example 
baasicCommerceInvoiceService.get()
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
                get: function (id, options) {
                    return baasicApp.commerceModule.invoices.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the update commerce action has been performed; this action updates a commerce resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceInvoiceRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(commerceInvoice);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// commerceInvoice is a resource previously fetched using get action.
commerceInvoice.invoiceStatusId : '<new-invoice-status-id>';
baasicCommerceInvoiceService.update(commerceInvoice)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/
                update: function (data) {
                    return baasicApp.commerceModule.invoices.update(data);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a commerce resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceInvoiceRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(commerceInvoice);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// commerceInvoice is a resource previously fetched using get action.				 
baasicCommerceInvoiceService.remove(commerceInvoice)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
                remove: function (data) {
                    return baasicApp.commerceModule.invoices.remove(data);
                },

                streams: {
                    /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns the invoice stream if successfully completed.
                    * @method streams.get        
                    * @example 
// commerceInvoice is a resource previously fetched using get action.	
baasicCommerceInvoiceService.stream.get({id: commerceInvoice.id})
.success(function (data) {
    // perform success action here
})
.error(function (response, status, headers, config) {
    // perform error handling here
});                    
                    **/
                    get: function (data) {
                        return baasicApp.commerceModule.invoices.streams.get(data);
                    },

                    /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns the invoice stream as a blob. For more information on Blob objects please see [Blob Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
                    * @method streams.getBlob        
                    * @example 
// Request the original blob                
baasicCommerceInvoiceService.stream.getBlobl({id: commerceInvoice.id})
.success(function (data) {
    // perform success action here
})
.error(function (response, status, headers, config) {
    // perform error handling here
});
                    **/
                    getBlob: function (data) {
                        return baasicApp.commerceModule.invoices.streams.getBlob(data);
                    }
                },

                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceInvoiceService.routeService.get(expandObject);
                 **/
                routeService: function () {
                    return baasicApp.commerceModule.invoices.routeDefinition;
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