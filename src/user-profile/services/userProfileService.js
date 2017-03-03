/* globals module */
/**
 * @module baasicUserProfileService
 * @description Baasic User Profile Service provides an easy way to consume Baasic User Profile REST API end-points. In order to obtain needed routes `baasicUserProfileService` uses `baasicUserProfileRouteService`.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicUserProfileService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicUserProfileRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, userProfileRouteService) {
            return {    
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of user profile resources matching the given criteria.
                 * @method        
                 * @example 
userProfileService.find({
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
                    return baasicApiHttp.get(userProfileRouteService.find.expand(baasicApiService.findParams(options)));
                },
                /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the user profile resource.
                * @method        
                * @example 
baasicUserProfileService.get()
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/  				
                get: function (id, options) {
                    return baasicApiHttp.get(userProfileRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                 /**
                 * Returns a promise that is resolved once the create user profile action has been performed; this action creates a new user profile resource.
                 * @method        
                 * @example 
baasicUserProfileService.create({
  firstName : '<first-name>',
  lastName : '<last-name>',
  displayName: '<nick-name>' 
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/ 				
                create: function (data) {
                    return baasicApiHttp.post(userProfileRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the update user profile action has been performed; this action updates a user profile resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserProfileRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(userProfile);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// userProfile is a resource previously fetched using get action.
userProfile.displayName = '<nick-name>';
baasicUserProfileService.update(userProfile)
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
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a user profile resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserProfileRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(userProfile);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// userProfile is a resource previously fetched using get action.				 
baasicUserProfileService.remove(userProfile)
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
                acl: {
                    /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns a list of ACL policies established for the specified user profile resource.
                    * @method acl.get       
                    * @example 
baasicUserProfileService.acl.get({id: '<profile-id>'})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/ 					
                    get: function (options) {
                        var params = angular.copy(options);
                        return baasicApiHttp.get(userProfileRouteService.acl.get.expand(params));
                    },
                    /**
                    * Returns a promise that is resolved once the update acl action has been performed, this action creates new ACL policy for the specified user profile resource.
                    * @method acl.update      
                    * @example 
var options = {id : '<profile-id>'};
var aclObj =  {
 actionId: '<action-id'>,
 roleId: '<roleId>',
 userId: '<userId>'
};
options[baasicConstants.modelPropertyName] = aclObj;
baasicUserProfileService.acl.update(options)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				    **/							
                    update: function (options) {
                        var params = angular.copy(options);
                        return baasicApiHttp.put(userProfileRouteService.acl.get.expand(params), params[baasicConstants.modelPropertyName]);
                    },
                    /**
                    * Returns a promise that is resolved once the removeByUser action has been performed. This action deletes ACL policy assigned to the specified user and user profile resource.
                    * @method acl.deleteByUser      
                    * @example 
baasicUserProfileService.acl.removeByUser('<profile-id>', '<access-action>', '<username>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				    **/						
                    removeByUser: function (profileId, action, user, data) {
                        var params = baasicApiService.removeParams(data);
                        params.profileId = profileId;
                        params.user = user;
                        params.accessAction = action;
                        return baasicApiHttp.delete(userProfileRouteService.acl.deleteByUser.expand(params));
                    },
                    /**
                    * Returns a promise that is resolved once the removeByRole action has been performed. This action deletes ACL policy assigned to the specified role and user profile resource.
                    * @method acl.deleteByRole      
                    * @example 
baasicUserProfileService.acl.removeByRole('<profile-id>', '<access-action>', '<role-name>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				    **/						
                    removeByRole: function (profileId, action, role, data) {
                        var params = baasicApiService.removeParams(data);
                        params.profileId = profileId;
                        params.role = role;
                        params.accessAction = action;
                        return baasicApiHttp.delete(userProfileRouteService.acl.deleteByRole.expand(params));
                    }
                }, 
                /**
                * Provides direct access to `userProfileRouteService`.
                * @method        
                * @example baasicUserProfileService.routeService.get.expand(expandObject);
                **/  							    
				routeService: userProfileRouteService
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
