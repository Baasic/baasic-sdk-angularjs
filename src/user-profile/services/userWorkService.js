/* globals module */
/**
 * @module baasicUserWorkService
 * @description Baasic User Work Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic User Work Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
 */
(function (angular, module, undefined) {
  'use strict';
  module.service('baasicUserWorkService', ['baasicApp',
    function (baasicApps) {
      return {
        /**
                 * Returns a promise that is resolved once the create user work action has been performed; this action creates a new user work resource.
                 * @method        
                 * @example 
baasicUserWorkService.create({
  companyName : '<company-name>',  
  userId: '<user-id>' 
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        create: function (data) {
          return baasicApp.userProfileModule.profile.work.create(data);
        },
        /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of user work resources matching the given criteria.
                 * @method        
                 * @example 
baasicUserWorkService.find({
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
          return baasicApp.userProfileModule.profile.work.find(options);
        },
        /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the user work resource.
                * @method        
                * @example 
baasicUserWorkService.get()
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        get: function (id, options) {
          return baasicApp.userProfileModule.profile.work.get(id, options);
        },
        /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a user work resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserWorkRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(work);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// work is a resource previously fetched using get action.				 
baasicUserWorkService.remove(work)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				        **/
        remove: function (data) {
          return baasicApp.userProfileModule.profile.work.remove(data);
        },
        /**
                 * Returns a promise that is resolved once the update user work action has been performed; this action updates a user work resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserWorkRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(work);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// work is a resource previously fetched using get action.
work.companyName = '<company-name>';
baasicUserWorkService.update(work)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				        **/
        update: function (data) {
          return baasicApp.userProfileModule.profile.work.update(data);
        }
      };
    }
  ]);
}(angular, module));

/**
 * @overview 
 ***Notes:**
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/