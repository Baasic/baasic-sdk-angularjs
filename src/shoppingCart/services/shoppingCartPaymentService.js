/* globals module */
/**
 * @module baasicShoppingCartPaymentService
 * @description Baasic ShoppingCartPayment Service provides an easy way to consume Baasic ShoppingCartItems REST API end-points. In order to obtain needed routes `baasicShoppingCartPaymentService` uses `baasicShoppingCartItemRouteService`.
 */
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicShoppingCartPaymentService', ['baasicApp',
        function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
/**
                * Returns a promise that is resolved once the create shopping cart item action has been performed, this action creates a new shopping cart itemresource.
                * @method        
                * @example 
baasicShoppingCartPaymentService.create({
 productId : '<product-id>',
 quantity : '<quantity>',
 userId : '<user-id>',
 timeStamp : '<time-stamp>'
})
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});
                **/
                create: function (data) {
                    return baasicApp.shoppingCartModule.items.create(data);
                },
/**
                * Returns a promise that is resolved once the create shopping cart item action has been performed, this action creates a new shopping cart itemresource.
                * @method        
                * @example 
baasicShoppingCartPaymentService.createByUserIdAndProductId(<user-id>, <product-id>,{
 quantity : '<quantity>',
 timeStamp : '<time-stamp>'
})
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});
                **/
                createByUserIdAndProductId: function (userId, productId, data) {
                    return baasicApp.shoppingCartModule.items.create(userId, productId, data);
                },
/**
                * Returns a promise that is resolved once the remove shopping cart item action has been performed. If the action is successfully completed, the shopping cart itemresource will be permanently removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicShoppingCartItemRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(shoppingCartItem);
var uri = params['model'].links('delete').href;
```
                * @method        
                * @example 
// shopping cart item is a resource previously fetched using get action.				 
baasicShoppingCartPaymentService.remove(shoppingCartItemId)
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});		
               **/
                remove: function (id) {
                    return baasicApp.shoppingCartModule.items.remove(id);
                },
/**
                * Returns a promise that is resolved once the remove shopping cart item action has been performed. If the action is successfully completed, the shopping cart itemresource will be permanently removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicShoppingCartItemRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(shoppingCartItem);
var uri = params['model'].links('delete').href;
```
                * @method        
                * @example 
// shopping cart item is a resource previously fetched using get action.				 
baasicShoppingCartPaymentService.removeByUserIdAndProductId(<userId>, <productId>)
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});		
               **/
                removeByUserIdAndProductId: function (userId, productId) {
                    return baasicApp.shoppingCartModule.items.removeByUserIdAndProductId(userid, productId);
                },
/**
                * Returns a promise that is resolved once the purge items action has been performed. Please note that all shopping cart itemresources will be deleted from the system once the action is successfully completed and therefore it can only be executed by user assigned to account owner role. 
                * @method        
                * @example 	 
baasicShoppingCartPaymentService.purge({})
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});		
               **/
                purge: function () {
                    return baasicApp.shoppingCartModule.items.purge();
                },                
                /**
                 * Provides direct access to `baasicShoppingCartItemRouteService`.
                 * @method        
                 * @example baasicShoppingCartPaymentService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.shoppingCartModule.items.routeDefinition
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