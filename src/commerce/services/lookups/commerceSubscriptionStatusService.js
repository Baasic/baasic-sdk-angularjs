/* globals module */
/**
 * @module baasicCommerceSubscriptionStatusService
 * @description Baasic Commerce SubscriptionStatus Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceSubscriptionStatusService` uses `baasicCommerceSubscriptionStatusRouteService`.
 */
(function (angular, module, undefined) {
  'use strict';
  module.service('baasicCommerceSubscriptionStatusService', ['baasicApp',
    function (baasicApps) {
      var baasicApp = baasicApps.get();
      return {
        /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
baasicCommerceSubscriptionStatusService.find({
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
          return baasicApp.commerceModule.lookups.subscriptionStatuses.find(options);
        },
        /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                * @method        
                * @example 
baasicCommerceSubscriptionStatusService.get()
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        get: function (id, options) {
          return baasicApp.commerceModule.lookups.subscriptionStatuses.get(id, options);
        },
        /**
                 * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resource.
                 * @method        
                 * @example 
baasicCommerceSubscriptionStatusService.create({  
  name : '<name>',
  abrv: '<abbreviation>',
  description: '<description>'
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/
        create: function (data) {
          return baasicApp.commerceModule.lookups.subscriptionStatuses.create(data);
        },
        /**
                 * Returns a promise that is resolved once the update commerce action has been performed; this action updates a commerce resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceSubscriptionStatusRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(commerceSubscriptionStatus);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// commerceSubscriptionStatus is a resource previously fetched using get action.
commerceSubscriptionStatus.description = '<description>';
baasicCommerceSubscriptionStatusService.update(commerceSubscriptionStatus)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/
        update: function (data) {
          return baasicApp.commerceModule.lookups.subscriptionStatuses.update(data);
        },
        /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a commerce resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceSubscriptionStatusRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(commerceSubscriptionStatus);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// commerceSubscriptionStatus is a resource previously fetched using get action.				 
baasicCommerceSubscriptionStatusService.remove(commerceSubscriptionStatus)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
        remove: function (data) {
          return baasicApp.commerceModule.lookups.subscriptionStatuses.remove(data);
        },

        batch: {

          /**
                    * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resources.
                    * @method batch.create        
                    * @example 
baasicCommerceSubscriptionStatusService.batch.create([{  
  name : '<name>',
  abrv: '<abbreviation>',
  description: '<description>'
}])
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/
          create: function (data) {
            return baasicApp.commerceModule.lookups.subscriptionStatuses.batch.create(data);
          },

          /**
                    * Returns a promise that is resolved once the remove commerce action has been performed. This action will remove commerce resources from the system if successfully completed. 
                    * @method batch.remove       
                    * @example 			 
  baasicCommerceSubscriptionStatusService.batch.remove(subscriptionStatusIds)
  .success(function (data) {
    // perform success action here
  })
  .error(function (response, status, headers, config) {
    // perform error handling here
  });		
                    **/
          remove: function (ids) {
            return baasicApp.commerceModule.lookups.subscriptionStatuses.batch.remove(ids);
          },

          /**
                    * Returns a promise that is resolved once the update commerce action has been performed; this action updates specified commerce resources.
                    * @method batch.update       
                    * @example 
  baasicCommerceSubscriptionStatusService.batch.update(subscriptionStatuses)
  .success(function (data) {
    // perform success action here
  })
  .error(function (response, status, headers, config) {
    // perform error handling here
  });
                    **/
          update: function (data) {
            return baasicApp.commerceModule.lookups.subscriptionStatuses.batch.update(data);
          }
        },

        /**
         * Provides direct access to `routeService`.
         * @method        
         * @example baasicCommerceSubscriptionStatusService.routeService.get.expand(expandObject);
         **/
        routeService: function () {
          return baasicApp.commerceModule.lookups.subscriptionStatuses.routeDefinition;
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