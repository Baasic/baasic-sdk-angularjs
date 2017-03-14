/* globals module */
/**
 * @module baasicCommerceAddressTypeService
 * @description Baasic Commerce AddressType Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceAddressTypeService` uses `baasicCommerceAddressTypeRouteService`.
 */
(function (angular, module, undefined) {
  'use strict';
  module.service('baasicCommerceAddressTypeService', ['baasicApp',
    function (baasicApps) {
      var baasicApp = baasicApps.get();
      return {
        /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
baasicCommerceAddressTypeService.find({
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
          return baasicApp.commerceModule.lookups.addressTypes.find(options);
        },
        /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                * @method        
                * @example 
baasicCommerceAddressTypeService.get()
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        get: function (id, options) {
          return baasicApp.commerceModule.lookups.addressTypes.get(id, options);
        },
        /**
                 * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resource.
                 * @method        
                 * @example 
baasicCommerceAddressTypeService.create({  
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
          return baasicApp.commerceModule.lookups.addressTypes.create(data);
        },
        /**
                 * Returns a promise that is resolved once the update commerce action has been performed; this action updates a commerce resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceAddressTypeRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(commerceAddressType);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// commerceAddressType is a resource previously fetched using get action.
commerceAddressType.description = '<description>';
baasicCommerceAddressTypeService.update(commerceAddressType)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/
        update: function (data) {
          return baasicApp.commerceModule.lookups.addressTypes.update(data);
        },
        /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a commerce resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceAddressTypeRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(commerceAddressType);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// commerceAddressType is a resource previously fetched using get action.				 
baasicCommerceAddressTypeService.remove(commerceAddressType)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
        remove: function (data) {
          return baasicApp.commerceModule.lookups.addressTypes.remove(data);
        },

        batch: {
          /**
                    * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resources.
                    * @method batch.create        
                    * @example 
baasicCommerceAddressTypeService.batch.create([{  
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
            return baasicApp.commerceModule.lookups.addressTypes.batch.create(data);
          },

          /**
                    * Returns a promise that is resolved once the remove commerce action has been performed. This action will remove commerce resources from the system if successfully completed. 
                    * @method batch.remove       
                    * @example 			 
  baasicCommerceAddressTypeService.batch.remove(commerceAddressTypeIds)
  .success(function (data) {
    // perform success action here
  })
  .error(function (response, status, headers, config) {
    // perform error handling here
  });		
                    **/
          remove: function (ids) {
            return baasicApp.commerceModule.lookups.addressTypes.batch.remove(ids);
          },

          /**
                    * Returns a promise that is resolved once the update commerce action has been performed; this action updates specified commerce resources.
                    * @method batch.update       
                    * @example 
  baasicCommerceAddressTypeService.batch.update(commerceAddressTypes)
  .success(function (data) {
    // perform success action here
  })
  .error(function (response, status, headers, config) {
    // perform error handling here
  });
                    **/
          update: function (data) {
            return baasicApp.commerceModule.lookups.addressTypes.batch.update(data);
          }
        },

        /**
         * Provides direct access to `routeService`.
         * @method        
         * @example baasicCommerceAddressTypeService.routeService.get(expandObject);
         **/
        routeService: baasicApp.commerceModule.lookups.addressTypes.routeDefinition
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