/**
 * @module baasicDynamicSchemaService
 * @description Baasic Dynamic Schema Service provides an easy way to consume Baasic Dynamic Schema REST API end-points. In order to obtain needed routes `baasicDynamicSchemaService` uses `baasicDynamicSchemaRouteService`.
 */
(function (angular, module, undefined) {
  "use strict";
  module.service("baasicDynamicSchemaService", ["baasicApp",
    function (baasicApps) {
      var baasicApp = baasicApps.get();
      return {
        /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of dynamic resource schemas matching the given criteria.
                 * @method        
                 * @example 
baasicDynamicSchemaService.find({
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
          return baasicApp.dynamicResourceModule.schema.find(options);
        },
        /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified dynamic resource schema.
                 * @method        
                 * @example 
baasicDynamicSchemaService.get('<schema-name>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        get: function (name, options) {
          return baasicApp.dynamicResourceModule.schema.get(name, options);
        },
        /**
                * Returns a promise that is resolved once the create action has been performed; this action creates a new dynamic resource schema item.
                * @method        
                * @example 
baasicDynamicSchemaService.create({
  schema : {
    type : 'object',
    properties : {
      id : {
        title : '<unique-identifier-field>',
        readonly : true,
        hidden : true,
        type : 'string'
      },
      description : {
        type: string
      }
    }
  },
  name : '<schema-name>',
  description : '<description>',
  enforceSchemaValidation : true
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        create: function (data) {
          return baasicApp.dynamicResourceModule.schema.create(data);
        },
        /**
                 * Returns a promise that is resolved once the update dynamic resource schema action has been performed; this action updates a dynamic resource schema item. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicDynamicSchemaRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(dynamicResourceSchema);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// dynamicResourceSchema is a resource previously fetched using get action.
dynamicResourceSchema.description = '<description>';
baasicDynamicSchemaService.update(dynamicResourceSchema)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/
        update: function (data) {
          return baasicApp.dynamicResourceModule.schema.update(data);
        },
        /**
                * Returns a promise that is resolved once the remove action has been performed. This action will remove a dynamic resource schema item from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicDynamicSchemaRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(dynamicResourceSchema);
var uri = params['model'].links('delete').href;
```
                * @method        
                * @example 
// dynamicResourceSchema is a resource previously fetched using get action.				 
baasicDynamicSchemaService.remove(dynamicResourceSchema)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
        remove: function (data) {
          return baasicApp.dynamicResourceModule.schema.remove(data);
        },
        /**
                * Returns a promise that is resolved once the generate schema action has been performed. Success response returns a schema generated based on the json input.
                * @method        
                * @example 			 
baasicDynamicSchemaService.generate({
  id : '<schema-Id>',
  description : '<description>'
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
        generate: function (data) {
          return baasicApp.dynamicResourceModule.schema.generate(data);
        },
        /**
         * Provides direct access to `baasicDynamicSchemaRouteService`.
         * @method        
         * @example baasicDynamicSchemaService.routeService.get.expand(expandObject);
         **/
        routeService: function () {
          return baasicApp.dynamicResourceModule.schema.routeDefinition;
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