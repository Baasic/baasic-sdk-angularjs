/* globals module */
/**
 * @module baasicRoleService
 * @description Baasic Role Service provides an easy way to consume Baasic Role REST API end-points. 
 */
(function (angular, module, undefined) {
  'use strict';
  module.service('baasicRoleService', ['baasicApp',
    function (baasicApps) {
      var baasicApp = baasicApps.get();
      return {
        /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of role resources matching the given criteria.
                 * @method        
                 * @example 
baasicRoleService.find({
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
          return baasicApp.membershipModule.role.find(options);
        },
        /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified role resource.
                 * @method        
                 * @example 
baasicRoleService.get('<role-id>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/
        get: function (id, options) {
          return baasicApp.membershipModule.role.get(id, options);
        },
        /**
                 * Returns a promise that is resolved once the create action has been performed; this action creates a role.
                 * @method        
                 * @example 
baasicRoleService.create({
  description : '<description>',
  name : '<name>'
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/
        create: function (data) {
          return baasicApp.membershipModule.role.create(data);
        },
        /**
                 * Returns a promise that is resolved once the update role action has been performed; this action updates a role. 
                 * @method        
                 * @example 
// role is a resource previously fetched using get action.
role.name = '<new-name>';
baasicRoleService.update(role)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});

				**/
        update: function (data) {
          return baasicApp.membershipModule.role.update(data);
        },
        /**
                 * Returns a promise that is resolved once the remove role action has been performed. This action will remove a role from the system, if completed successfully. 
                 * @method        
                 * @example 
// Role is a resource previously fetched using get action.				 
baasicRoleService.remove(role)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
        remove: function (data) {
          return baasicApp.membershipModule.role.remove(data);
        },
        /**
         * Provides direct access to route definition.
         * @method        
         * @example baasicRoleService.routeService.get('<id>', expandObject);
         **/
        routeService: baasicApp.membership.role.routeDefinition
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