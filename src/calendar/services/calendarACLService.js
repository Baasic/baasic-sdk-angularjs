/* globals module */
/**
 * @module baasicCalendarACLService
 * @description Baasic Calendar ACL Service provides an easy way to consume Baasic Calendar REST API end-points. In order to obtain a needed routes `baasicCalendarACLService` uses `baasicCalendarACLRouteService`.
 */
(function (angular, module) {
    'use strict';
    module.service('baasicCalendarACLService', ['baasicApp',
        function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {

                /**                     
                 * Returns a promise that is resolved once the get action has been performed. Success response returns a list of ACL policies established for the specified calendar resource.                     
                 * @method
                 * @returns A promise that is resolved once the get action has been performed.                            
                 * @example 
                    aclService.get({id: '<id>'})
                    .success(function (data) {   
                        // perform success action here 
                    }),
                    .error(function (response, status, headers, config) {   
                        // perform error handling here 
                    });
                 */
                get: function(options) {
                    return baasicApp.calendarModule.ACL.get(options);
                },

                /**                     
                 * Returns a promise that is resolved once the update acl action has been performed, this action creates new ACL policy for the specified calendar resource.                     
                 * @method                     
                 * @example 
                    let options = {id : '<id>'}; 
                    let aclObj =  {  actionId: '<action-id'>,  roleId: '<roleId>',  userId: '<userId>' }; 
                    options[baasicConstants.modelPropertyName] = aclObj; 
                    aclService.update(options)
                    .success(function (data) {   
                        // perform success action here 
                    }),
                    .error(function (response, status, headers, config) {   
                        // perform error handling here 
                    });				    
                 */
                update: function(options) {
                    return baasicApp.calendarModule.ACL.update(options);
                },

                /**                     
                 * Returns a promise that is resolved once the removeByUser action has been performed. This action deletes ACL policy assigned to the specified user and calendar resource.                     
                 * @method                  
                 * @example 
                    aclService.removeByUser('<id>', '<access-action>', '<username>')
                    .success(function (data) {   
                        // perform success action here 
                    }),
                    .error(function (response, status, headers, config) {   
                        // perform error handling here 
                    });				    
                 */
                removeByUser: function(id, action, user, data) {
                    return baasicApp.calendarModule.ACL.removeByUser(id, action, user, data);
                },

                /**                     
                 * Returns a promise that is resolved once the removeByRole action has been performed. This action deletes ACL policy assigned to the specified role and calendar resource.                     
                 * @method                  
                 * @example 
                    aclService.removeByRole('<id>', '<access-action>', '<role-name>')
                    .success(function (data) {   
                        // perform success action here 
                    }),
                    .error(function (response, status, headers, config) {   
                        // perform error handling here 
                    });				    
                 */
                removeByRole: function(id, action, role, data) {
                    return baasicApp.calendarModule.ACL.removeByRole(id, action, role, data);
                }                
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