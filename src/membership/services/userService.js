﻿/* globals module */
/**
 * @module baasicUserService
 * @description Baasic User Service provides an easy way to consume Baasic User REST API end-points. In order to obtain needed routes `baasicUserService` uses `baasicUserRouteService`.
 */
(function (angular, module, undefined) {
  'use strict';
  module.service('baasicUserService', ['baasicApp',
    function (baasicApps) {
      var baasicApp = baasicApps.get();
      return {
        /**
                 * Returns a promise that is resolved once the exists action has been performed. This action checks if user exists in the application.
                 * @method        
                 * @example 
baasicUserService.exists('<username>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});  
                 **/
        exists: function (username, options) {
          return baasicApp.membershipModule.user.exists(username, options);
        },
        /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of user resources matching the given criteria.
                 * @method        
                 * @example 
baasicUserService.find({
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
          return baasicApp.membershipModule.user.find(options);
        },
        /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified user resource.
                 * @method        
                 * @example 
baasicUserService.get({
  username : '<username>',
  embed : '<embedded-resource>'
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/
        get: function (options) {
          return baasicApp.membershipModule.user.get(options.username, options);
        },
        /**
                 * Returns a promise that is resolved once the create user action has been performed; this action creates a new user.
                 * @method        
                 * @example 
baasicUserService.create({
  confirmPassword : '<password>',
  email : '<email>',
  password : '<password>',
  sendEmailNotification : true,
  username : '<username>',
  roles: ['<role-name>'],
  additionalProperty: '<additional-property>'  
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/
        create: function (data) {
          return baasicApp.membershipModule.user.create(data);
        },
        /**
                 * Returns a promise that is resolved once the update user action has been performed; this action updates a user. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(user);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// user is a resource previously fetched using get action.
user.roles = ['<role-name>', '<new-role-name>'];
user.email = '<new-email>';
baasicUserService.update(user)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/
        update: function (data) {
          return baasicApp.membershipModule.user.update(data);
        },
        /**
                 * Returns a promise that is resolved once the remove user action has been performed. This action will remove a user from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(user);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// user is a resource previously fetched using get action.				 
baasicUserService.remove(user)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
        remove: function (data) {
          return baasicApp.membershipModule.user.remove(data);
        },
        /**
                 * Returns a promise that is resolved once the unlock user action has been performed. This action will unlock the user resource which was previously locked either manually or automatically by the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(user);
var uri = params['model'].links('unlock').href;
```
                 * @method        
                 * @example 
//  user is a resource previously fetched using get action.				 
baasicUserService.unlock(user)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
        unlock: function (data) {
          return baasicApp.membershipModule.user.unlock(data);
        },
        /**
                 * Returns a promise that is resolved once the lock user action has been performed. This action will lock the user resource out of the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(user);
var uri = params['model'].links('lock').href;
```
                 * @method        
                 * @example 
// user is a resource previously fetched using get action.				 
baasicUserService.lock(user)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
        lock: function (data) {
          return baasicApp.membershipModule.user.lock(data);
        },
        /**
                 * Returns a promise that is resolved once the approve user action has been performed. This action will mark the user resource as 'approved' in the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(user);
var uri = params['model'].links('approve').href;
```
                 * @method        
                 * @example 
// user is a resource previously fetched using get action.				 
baasicUserService.lock(user)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
        approve: function (data) {
          return baasicApp.membershipModule.user.approve(data);
        },
        /**
                 * Returns a promise that is resolved once the disapprove user action has been performed. This action will mark the user resource as 'not approved' in the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(user);
var uri = params['model'].links('disapprove').href;
```
                 * @method        
                 * @example 
// user is a resource previously fetched using get action.				 
baasicUserService.lock(user)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
        disapprove: function (data) {
          return baasicApp.membershipModule.user.disapprove(data);
        },
        /**
                 * Returns a promise that is resolved once the changePassword action has been performed. This action will update user's password selection.
                 * @method        
                 * @example 
baasicUserService.changePassword('<username>', {
  newPassword : '<new-password>',
  sendMailNotification : false
})
.success(function () {
  // perform success action here
})
.error(function (data, status, headers, config) {
  // perform error handling here
})
.finally (function () {});
				**/
        changePassword: function (username, data) {
          return baasicApp.membershipModule.user.changePassword(username, data);
        },
        /**
         * Provides direct access to `baasicUserRouteService`.
         * @method        
         * @example baasicUserService.routeService.get(expandObject);
         **/
        routeService: baasicApp.membershipModule.user.routeDefinition,
        socialLogin: {
          /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns a list user resource connected social login providers.
                    * @method socialLogin.get
                    * @example 
baasicUserService.socialLogin.get('<username>')
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/
          get: function (username) {
            return baasicApp.membershipModule.user.socialLogin.get(username);
          },
          /**
                    * Returns a promise that is resolved once the remove action has been performed. This action removes the user resource social login connection from the specified provider.
                    * @method socialLogin.remove
                    * @example 
baasicUserService.socialLogin.remove('<username>', '<provider>')
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/
          remove: function (username, provider) {
            return baasicApp.membershipModule.user.socialLogin.remove(username, provider);
          }
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