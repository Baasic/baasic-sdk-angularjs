/**
 * @module baasicKeyValueService
 * @description Baasic Key Value Service provides an easy way to consume Baasic Key Value REST API end-points. 
 */
(function (angular, module, undefined) {
  "use strict";
  module.service("baasicKeyValueService", ["baasicApp",
    function (baasicApps) {
      var baasicApp = baasicApps.get();
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
          return baasicApp.keyValueModule.find(options);
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
          return baasicApp.keyValueModule.get(id, options);
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
          return baasicApp.keyValueModule.create(data);
        },
        /**
                 * Returns a promise that is resolved once the update key value action has been performed; this action updates a key value resource. 
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
          return baasicApp.keyValueModule.update(data);
        },
        /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a key value resource from the system if successfully completed. 
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
          return baasicApp.keyValueModule.remove(data);
        },
        /**
         * Provides direct access to routeDefinition.
         * @method        
         * @example baasicKeyValueService.routeService.get('<id>', { embed:'<embeds>', fields: '<fields>' });
         **/
        routeService: baasicApp.keyValueModule.routeDefinition
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