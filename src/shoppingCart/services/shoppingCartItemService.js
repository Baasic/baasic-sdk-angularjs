/* globals module */
/**
 * @module baasicShoppingCartItemService
 * @description Baasic ShoppingCartItems Service provides an easy way to consume Baasic ShoppingCartItems REST API end-points. In order to obtain needed routes `baasicShoppingCartItemService` uses `baasicShoppingCartItemRouteService`.
 */
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicShoppingCartItemService', ['baasicApp',
        function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
/**
                * Returns a promise that is resolved once the create shopping cart item action has been performed, this action creates a new shopping cart itemresource.
                * @method        
                * @example 
baasicShoppingCartItemService.create({
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
baasicShoppingCartItemService.createByUserIdAndProductId(<user-id>, <product-id>,{
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
baasicShoppingCartItemService.remove(shoppingCartItemId)
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
baasicShoppingCartItemService.removeByUserIdAndProductId(<userId>, <productId>)
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
baasicShoppingCartItemService.purge({})
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
                
                 batch: {
          /**
                  * Returns a promise that is resolved once the remove action has been performed. This action will remove shopping cart item resources from the system if successfully completed. Specified shopping cart item and all its accompanying derived resources will be removed from the system.
                  * @method batch.remove       
                  * @example
// Remove original shopping cart item resources		 
baasicShoppingCartItemService.batch.remove([{ id: '<shopping-cart-item-id>' }])
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
}); 	
                  **/
                    remove: function (data) {
                        return baasicApp.shoppingCartModule.items.batch.remove(data);
                    },
/**
                  * Returns a promise that is resolved once the update action has been performed; this action updates specified shopping cart item resources.
                  * @method batch.update      
                  * @example 
baasicShoppingCartItemService.batch.update(files)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                  **/
                    update: function (data) {
                        return baasicApp.shoppingCartModule.items.batch.update(data);
                    },
                    
                    /**
                  * Returns a promise that is resolved once the create action has been performed; this action creates specified shopping cart item resources.
                  * @method batch.create       
                  * @example 
baasicShoppingCartItemService.batch.create(files)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                  **/
                    create: function (data) {
                        return baasicApp.shoppingCartModule.items.batch.create(data);
                    },
                    routeService: baasicApp.shoppingCartModule.items.batch.routeDefinition
                },      
                /**
                 * Provides direct access to `baasicShoppingCartItemRouteService`.
                 * @method        
                 * @example baasicShoppingCartItemService.routeService.get(expandObject);
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