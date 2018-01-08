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
                * Returns a promise that is resolved once the shopping cart item summary calculation action has been performed, this action calculates the sum for all items in the shopping cart.
                * @method        
                * @example 
baasicShoppingCartPaymentService.calculateSummary({
 customerId : '<customer-id>',
 systemName : '<system-name>',
 coupon : '<coupon>'
})
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});
                **/
                calculateSummary: function (data) {
                    return baasicApp.shoppingCartModule.payment.calculateSummary(data);
                },
/**
                * Returns a promise that is resolved once the shopping cart item summary processing action has been performed, this action processes the items in the shopping cart and executes the payment.
                * @method        
                * @example 
baasicShoppingCartPaymentService.processCart({
 customerId : '<customer-id>',
 systemName : '<system-name>',
 coupon : '<coupon>'
})
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});
                **/
                processCart: function (data) {
                    return baasicApp.shoppingCartModule.payment.processCart(data);
                },
               /**
                 * Provides direct access to `baasicShoppingCartItemRouteService`.
                 * @method        
                 * @example baasicShoppingCartPaymentService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.shoppingCartModule.payment.routeDefinition
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