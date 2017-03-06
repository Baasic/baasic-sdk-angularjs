/* globals module */
/**
 * @module baasicPermissionsService
 * @description Baasic Permissions Service provides an easy way to consume Baasic Application Permissions REST API end-points. In order to obtain needed routes `baasicPermissionsService` uses `baasicPermissionsRouteService`.
 */
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicPermissionsService', ['baasicApp', 'baasicAuthorizationService',
        function (baasicAppHandler, authService) {
            var baasicApp = baasicAppHandler.get();
            return {
                /**
                * Returns a promise that is resolved once the find action has been performed. Success response returns a list of access policies that match the specified search parameters.
                * @method        
                * @example 
baasicPermissionsService.find('<section-name>', {
  search : '<search-phrase>'
})
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                **/
                find: function (section, options) {
                    return baasicApp.membership.permissions.find(section, options);
                },
                /**
                * Returns a promise that is resolved once the getActions action has been performed. Success response returns a list of access policies that match the specified search parameters.
                * @method        
                * @example 
baasicPermissionsService.getActions({
  search : '<search-phrase>'
})
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                **/
                getActions: function (options) {
                    return baasicApp.membership.permissions.getActions(options);
                },
                /**
                * Returns a promise that is resolved once the getPermissionSubjects action has been performed. Success response returns a list of matching user and role resources.
                * @method        
                * @example 
baasicPermissionsService.getPermissionSubjects({
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
                getPermissionSubjects: function (options) {
                    return baasicApp.membership.permissions.getPermissionSubjects(options);
                },
                /**
                 * Returns a promise that is resolved once the create action has been performed; this action creates a new permission resource.
                 * @method        
                 * @example 
// readAction and updateActions are resources previously fetched using getActions.
baasicPermissionsService.create({
  actions : [readAction, updateAction],
  section : '<section-name>',
  userName : '<userName>'
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
                create: function (data) {
                    return baasicApp.membership.permissions.create(data);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. If the action is successfully complete, an access policy assigned to the specified role and section will be removed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicPermissionsService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(permission);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// permission is a resource previously fetched using get action.				 
baasicPermissionsService.remove(permission)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
                remove: function (data) {
                    return baasicApp.membership.permissions.remove(data);
                },
                /**
                 * Creates a new in-memory permission object.
                 * @method        
                 * @example 
// action collection are lookup items fetched using baasicLookupService.get action.
var actionCollection;
return baasicLookupService.get()
.success(function (data) {
  actionCollection = data;
})
.error(function (data, status, headers, config) {});
// subjectItem is an item fetched using baasicPermissionsService.getPermissionSubjects action.
baasicPermissionsService.createPermission('<section-Name>', actionCollection, subjectItem);
				**/
                createPermission: function (section, actionCollection, membershipItem) {
                    return baasicApp.membership.permissions.createPermission(section, actionCollection, membershipItem);
                },
                /**
                 * Finds a permission in a given permission collection.
                 * @method        
                 * @example baasicPermissionsService.findPermission(permissionObj, permissionCollection);
                 **/
                findPermission: function (permission, permissionCollection) {
                    return baasicApp.membership.permissions.findPermission(permission, permissionCollection);
                },
                /**
                 * Checks if a permission object exists in a given permission collection.
                 * @method        
                 * @example baasicPermissionsService.exists(permissionObj, permissionCollection);
                 **/
                exists: function (permission, permissionCollection) {
                    return baasicApp.membership.permissions.exists(permission, permissionCollection);
                },
                /**
                 * Returns a promise that is resolved once the togglePermission action has been completed. The action will internally either call a `remove` or `create` action based on given criteria.
                 * @method        
                 * @example baasicPermissionsService.togglePermission(permissionObj, action);
                 **/
                togglePermission: function (permission, action) {
                    return baasicApp.membership.permissions.togglePermission(permission, action);
                },
                /**
                 * Fetches and returns and object containing all existing module permissions.
                 * @method        
                 * @example baasicPermissionsService.getModulePermissions('<section-name>');
                 **/
                getModulePermissions: function (section) {
                    return baasicApp.membership.permissions.getModulePermissions(section);
                },
                /**
                 * Provides direct access to `baasicPermissionsRouteService`.
                 * @method        
                 * @example baasicPermissionsService.routeService.get.expand(expandObject);
                 **/
                routeService: baasicApp.membership.permissions.routeDefinition
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