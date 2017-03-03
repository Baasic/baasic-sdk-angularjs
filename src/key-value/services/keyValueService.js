/**
 * @module baasicKeyValueService
 * @description Baasic Key Value Service provides an easy way to consume Baasic Key Value REST API end-points. In order to obtain needed routes `baasicKeyValueService` uses `baasicKeyValueRouteService`.
*/
(function (angular, module, undefined) {
    "use strict";
    module.service("baasicKeyValueService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicKeyValueRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, keyValueRouteService) {
            return {
                 /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of key value resources matching the given criteria.
                 * @method        
                 * @example 
baasicKeyValueService.find({
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
                    return baasicApiHttp.get(keyValueRouteService.find.expand(baasicApiService.findParams(options)));
                },
                 /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified key value resource.
                 * @method        
                 * @example 
baasicKeyValueService.get('<key-value-id>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/				
                get: function (id, options) {
                    return baasicApiHttp.get(keyValueRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                 /**
                 * Returns a promise that is resolved once the create key value action has been performed; this action creates a new key value resource.
                 * @method        
                 * @example 
baasicKeyValueService.create({
  key : '<key>',
  value : '<value>', 
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/ 				
                create: function (data) {
                    return baasicApiHttp.post(keyValueRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                 /**
                 * Returns a promise that is resolved once the update key value action has been performed; this action updates a key value resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicKeyValueRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(keyValue);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// keyValue is a resource previously fetched using get action.
keyValue.value = '<new-value>';
baasicKeyValueService.update(keyValue)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/					
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                 /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a key value resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicKeyValueRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(keyValue);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// keyValue is a resource previously fetched using get action.				 
baasicKeyValueService.remove(keyValue)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/					
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                * Provides direct access to `baasicKeyValueRouteService`.
                * @method        
                * @example baasicKeyValueService.routeService.get.expand(expandObject);
                **/              
                routeService: keyValueRouteService
            };
        }]);
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
