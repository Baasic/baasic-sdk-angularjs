/**
 * @module baasicValueSetService
 * @description Baasic Value Set Service provides an easy way to consume Baasic Value Set REST end-points. In order to obtain needed routes `baasicValueSetService` uses `baasicValueSetRouteService`.
*/
(function (angular, module, undefined) {
    "use strict";
    module.service("baasicValueSetService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicValueSetRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, valueSetRouteService) {
            return {
                 /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of value set resources matching given criteria.
                 * @method        
                 * @example 
baasicValueSetService.find({
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
                    return baasicApiHttp.get(valueSetRouteService.find.expand(baasicApiService.findParams(options)));
                },
                 /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified value set resource.
                 * @method        
                 * @example 
baasicValueSetService.get('<value-set-name>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/				
                get: function (setName, options) {
                    return baasicApiHttp.get(valueSetRouteService.get.expand(baasicApiService.getParams(setName, options, 'setName')));
                },
                 /**
                 * Returns a promise that is resolved once the create value set action has been performed; this action creates a new value set resource.
                 * @method        
                 * @example 
baasicValueSetService.create({
   name: '<value-set-name>',
   description: '<description>',
   values: [{value: '<value>'}]
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/ 				
                create: function (data) {
                    return baasicApiHttp.post(valueSetRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                 /**
                 * Returns a promise that is resolved once the update value set action has been performed; this action updates a value set resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicValueSetService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(valueSet);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// valueSet is a resource previously fetched using get action.
valueSet.name = '<new-name>';
baasicValueSetService.update(valueSet)
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
                 * Returns a promise that is resolved once the remove action has been performed. This action will delete a value set resource if the action is completed successfully. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicValueSetService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(valueSet);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// valueSet is a resource previously fetched using get action.				 
baasicValueSetService.remove(valueSet)
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
                * Provides direct access to `baasicValueSetRouteService`.
                * @method        
                * @example baasicValueSetService.routeService.get.expand(expandObject);
                **/              
                routeService: valueSetRouteService,
                items: {
                    /**
                    * Returns a promise that is resolved once the find action has been performed. Success response returns a list of value set item resources matching given criteria.
                    * @method items.find       
                    * @example 
baasicValueSetService.items.find({
  setName: '<value-set-name>',
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
                        return baasicApiHttp.get(valueSetRouteService.items.find.expand(baasicApiService.findParams(options)));
                    },
                    /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns the specified value set item resource.
                    * @method items.get       
                    * @example 
baasicValueSetService.items.get('<value-set-name>', '<set-item-id>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/						
                    get: function (setName, id, options) {
                        var params = angular.extend({}, options);
                        params.setName = setName;
                        return baasicApiHttp.get(valueSetRouteService.items.get.expand(baasicApiService.getParams(id, params)));
                    },
                    /**
                    * Returns a promise that is resolved once the create value set item action has been performed; this action creates a new value set item resource.
                    * @method items.create       
                    * @example 
baasicValueSetService.items.create({
   setId: '<value-set-id>',
   value: '<value>'
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/ 						
                    create: function (data) {
                        return baasicApiHttp.post(valueSetRouteService.items.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                    },
                    /**
                    * Returns a promise that is resolved once the update value set item action has been performed; this action updates a value set item resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicValueSetService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(valueSetItem);
var uri = params['model'].links('put').href;
```
                    * @method items.update       
                    * @example 
// valueSetItem is a resource previously fetched using get action.
valueSetItem.value = '<new-value>';
baasicValueSetService.items.update(valueSetItem)
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
                    * Returns a promise that is resolved once the remove action has been performed. This action will delete a value set item if the action is completed successfully. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicValueSetService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(valueSetItem);
var uri = params['model'].links('delete').href;
```
                    * @method items.remove       
                    * @example 
// valueSetItem is a resource previously fetched using get action.				 
baasicValueSetService.items.remove(valueSetItem)
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
                    }
                }
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