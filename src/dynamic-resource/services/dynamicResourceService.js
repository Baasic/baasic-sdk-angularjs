/**
 * @module baasicDynamicResourceService
 * @description Baasic Dynamic Resource Service provides an easy way to consume Baasic Dynamic Resource REST API end-points. In order to obtain needed routes `baasicDynamicResourceService` uses `baasicDynamicResourceRouteService`.
 */
(function (angular, module, undefined) {
  "use strict";
  module.service("baasicDynamicResourceService", ["baasicApp",
    function (baasicApps) {
      var baasicApp = baasicApps.get();
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
          return baasicApp.dynamicResourceModule.find(schemaName, options);
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
          return baasicApp.dynamicResourceModule.get(schemaName, id, options);
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
          return baasicApp.dynamicResourceModule.create(schemaName, data);
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
        update: function (schemaName, data, options) {
          return baasicApp.dynamicResourceModule.update(schemaName, data, options);
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
        patch: function (schemaName, data, options) {
          return baasicApp.dynamicResourceModule.patch(schemaName, data, options);
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
        remove: function (schemaName, data, options) {
          return baasicApp.dynamicResourceModule.remove(schemaName, data, options);
        },
        /**                  
           * Returns a promise that is resolved once the purge action has been performed. This action will remove all dynamic resources from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `dynamicResourceRoute` route template. Here is an example of how a route can be obtained from HAL enabled objects: 
           * @method
           * @param data JSON object used to purge dynamic resources.                          
           * @example // dynamicResource is a resource previously fetched using get action.				 
                          DynamicResourceService.purge('<schema-name>')
                          .then(function (data) {   
                              // perform success action here 
                          },
                          function (response, status, headers, config) {   
                              // perform error handling here 
                          });						
          **/
          purge: function (schemaName) {
            return baasicApp.dynamicResourceModule.purge(schemaName);
        },
        batch: {
              /**
               * Returns a promise that is resolved once the create JSON object action has been performed; this action creates new JSON object resources.
               * @method
               * @param data JSON object objects that need to be inserted into the system.
               * @returns A promise that is resolved once the create JSON object action has been performed.
               * @example dynamicResourceBatchClient.create([{                    
                              name: '<name>'
                          }])
                          .then(function (data) {
                              // perform success action here
                          },
                          function (response, status, headers, config) {
                              // perform error handling here
                          });
              */
            create: function (data) {
              return baasicApp.dynamicResourceModule.batch.create(data);
          },

          /**
           * Returns a promise that is resolved once the update JSON object action has been performed; this action updates JSON object resources. 
           * @method
           * @param data JSON object objects used to update specified JSON object resources.
           * @returns A promise that is resolved once the update JSON object action has been performed.
           * @example JSON object are resources previously fetched using get action.
                      dynamicResourceBatchClient.update([{                    
                          id: '<id>',
                          name: '<name>'
                      }])
                      .then(function (data) {
                          // perform success action here
                      },
                      function (response, status, headers, config) {
                          // perform error handling here
                      });
          */
          update: function (data) {
              return baasicApp.dynamicResourceModule.batch.update(data);
          },

          /**
           * Returns a promise that is resolved once the patch JSON object action has been performed; this action patches JSON object resources. 
           * @method
           * @param data JSON object objects used to patch specified JSON object resources.
           * @returns A promise that is resolved once the patch JSON object action has been performed.
           * @example JSON object are resources previously fetched using get action.
                      dynamicResourceBatchClient.patch([{                    
                          id: '<id>',
                          name: '<name>'
                      }])
                      .then(function (data) {
                          // perform success action here
                      },
                      function (response, status, headers, config) {
                          // perform error handling here
                      });
          */
          patch: function (data) {
              return baasicApp.dynamicResourceModule.batch.patch(data);
          },

          /**
           * Returns a promise that is resolved once the remove action has been performed. This action will remove JSON object resources from the system if successfully completed.
           * @method
           * @param data JSON object Ids which uniquely identify JSON object resources to be deleted.
           * @returns A promise that is resolved once the remove action has been performed.
           * @example JSON object Ids are identifiers which uniquely identify JSON object resources.
                      dynamicResourceBatchClient.remove(['<id1>', '<id2>']])
                      .then(function (data) {
                          // perform success action here
                      },
                      function (response, status, headers, config) {
                          // perform error handling here
                      });
          */
          remove: function (data) {
              return baasicApp.dynamicResourceModule.batch.remove(data);
          }
        },
        /**
         * Provides direct access to `baasicDynamicResourceRouteService`.
         * @method        
         * @example baasicDynamicResourceService.routeService.get(expandObject);
         **/
        routeService: baasicApp.dynamicResourceModule.routeDefinition,
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
            return baasicApp.dynamicResourceModule.acl.get(options);
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
            return baasicApp.dynamicResourceModule.acl.update(options);
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
            return baasicApp.dynamicResourceModule.acl.removeByUser(action, user, data);
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
            return baasicApp.dynamicResourceModule.acl.removeByRole(action, role, data);
          },
          routeService: baasicApp.dynamicResourceModule.acl.routeDefinition
        }
      };
    }
  ]);
}(angular, module));
/**
 * @overview 
 ***Notes:**
 - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/