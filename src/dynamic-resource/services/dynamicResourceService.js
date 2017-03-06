/**
 * @module baasicDynamicResourceService
 * @description Baasic Dynamic Resource Service provides an easy way to consume Baasic Dynamic Resource REST API end-points. In order to obtain needed routes `baasicDynamicResourceService` uses `baasicDynamicResourceRouteService`.
*/
(function (angular, module, undefined) {
    "use strict";
    module.service("baasicDynamicResourceService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicDynamicResourceRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, dynamicResourceRouteService) {
            return {
                 /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of dynamic resources matching the given criteria.
                 * @method        
                 * @example 
baasicDynamicResourceService.find('<schema-name>', {
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
                find: function (schemaName, options) {
                    return baasicApiHttp.get(dynamicResourceRouteService.find.expand(baasicApiService.findParams(angular.extend({ schemaName: schemaName }, options))));
                },
                 /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified dynamic resource.
                 * @method        
                 * @example 
baasicDynamicResourceService.get('<schema-name>', '<dynamic-resource-id>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/ 				
                get: function (schemaName, id, options) {
                    return baasicApiHttp.get(dynamicResourceRouteService.get.expand(baasicApiService.getParams(id, angular.extend({ schemaName: schemaName }, options))));
                },
                 /**
                 * Returns a promise that is resolved once the create dynamic resource action has been performed; this action creates a new dynamic resource item.
                 * @method        
                 * @example 
baasicDynamicResourceService.create('<schema-name>', {
  id : '',
  description : '<description>'  
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/ 					
                create: function (schemaName, data) {
                    var params = baasicApiService.getParams(schemaName, data, 'schemaName');
                    return baasicApiHttp.post(dynamicResourceRouteService.create.expand(params), baasicApiService.createParams(params)[baasicConstants.modelPropertyName]);
                },
                 /**
                 * Returns a promise that is resolved once the update action has been performed; this action updates a dynamic resource item. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicDynamicResourceRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(dynamicResource);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// dynamicResource is a resource previously fetched using get action.
dynamicResource.description = '<description>';
baasicDynamicResourceService.update(dynamicResource, {
  query: "where field = 'value' "
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/						
                update: function (data, options) {
                    var opt = angular.extend({}, options);
                    var params = baasicApiService.updateParams(data);
                    var url = dynamicResourceRouteService.parse(params[baasicConstants.modelPropertyName].links('put').href).expand(opt);
                    return baasicApiHttp.put(url, params[baasicConstants.modelPropertyName]);
                },
                 /**
                 * Returns a promise that is resolved once the patch action has been performed; this action patches an existing dynamic resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicDynamicResourceRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(dynamicResource);
var uri = params['model'].links('patch').href;
```
                 * @method        
                 * @example 
// dynamicResource is a resource previously fetched using get action.
dynamicResource.description = '<new-description>';
dynamicResource.newField = '<newfield-value>';
baasicDynamicResourceService.update(dynamicResource, {
  query: "where field = 'value' "
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/				
                patch: function (data, options) {
                    var opt = angular.extend({}, options);
                    var params = baasicApiService.updateParams(data);
                    var url = dynamicResourceRouteService.parse(params[baasicConstants.modelPropertyName].links('patch').href).expand(opt);
                    return baasicApiHttp.patch(url, params[baasicConstants.modelPropertyName]);
                },
                 /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a dynamic resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicDynamicResourceRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(dynamicResource);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// dynamicResource is a resource previously fetched using get action.				 
baasicDynamicResourceService.remove(dynamicResource, {
  query: "where field = 'value' "
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/					
                remove: function (data, options) {
                    var opt = angular.extend({}, options);
                    var params = baasicApiService.removeParams(data);
                    var url = dynamicResourceRouteService.parse(params[baasicConstants.modelPropertyName].links('delete').href).expand(opt);
                    return baasicApiHttp.delete(url);
                },
                /**
                * Provides direct access to `baasicDynamicResourceRouteService`.
                * @method        
                * @example baasicDynamicResourceService.routeService.get.expand(expandObject);
                **/              
                routeService: dynamicResourceRouteService,
                acl: {
                    /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns a list of ACL policies established for the specified dynamic resource.
                    * @method acl.get       
                    * @example 
baasicDynamicResourceService.acl.get({id: '<dynamic-resource-id>', schemaName: '<schema-name>'})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/				
                    get: function (options) {
                        var params = angular.extend({}, options);
                        return baasicApiHttp.get(dynamicResourceRouteService.acl.get.expand(params));
                    },
                    /**
                    * Returns a promise that is resolved once the update acl action has been performed; this action creates new ACL policy for the specified dynamic resource.
                    * @method acl.update      
                    * @example 
baasicDynamicResourceService.acl.update({id: '<dynamic-resource-id>', schemaName: '<schema-name>'})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				    **/						
                    update: function (options) {
                        var params = angular.extend({}, options);
                        return baasicApiHttp.put(dynamicResourceRouteService.acl.get.expand(params), params[baasicConstants.modelPropertyName]);
                    },
                    /**
                    * Returns a promise that is resolved once the removeByUser action has been performed. This action deletes ACL policy assigned to the specified user and dynamic resource.
                    * @method acl.deleteByUser      
                    * @example 
// dynamicResource is a resource previously fetched using get action.					
baasicDynamicResourceService.acl.removeByUser('<access-action>', '<username>', dynamicResource)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				    **/						
                    removeByUser: function (action, user, data) {
                        var params = baasicApiService.removeParams(data);
                        params.user = user;
                        params.accessAction = action;
                        return baasicApiHttp.delete(dynamicResourceRouteService.acl.deleteByUser.expand(params));
                    },
                    /**
                    * Returns a promise that is resolved once the removeByRole action has been performed. This action deletes ACL policy assigned to the specified role and dynamic resource.
                    * @method acl.deleteByRole      
                    * @example 
// dynamicResource is a resource previously fetched using get action.						
baasicDynamicResourceService.acl.removeByRole('<access-action>', '<role-name>', dynamicResource)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				    **/							
                    removeByRole: function (action, role, data) {
                        var params = baasicApiService.removeParams(data);
                        params.role = role;
                        params.accessAction = action;
                        return baasicApiHttp.delete(dynamicResourceRouteService.acl.deleteByRole.expand(params));
                    }
                }
            };
        }]);
}(angular, module));
/**
 * @overview 
 ***Notes:**
 - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/
