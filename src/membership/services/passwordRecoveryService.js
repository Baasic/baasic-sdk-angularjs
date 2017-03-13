/* globals module */
/**
 * @module baasicPasswordRecoveryService
 * @description Baasic Password Recovery Service provides an easy way to consume Baasic Password Recovery REST API end-points. 
 */
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicPasswordRecoveryService', ['baasicApp',
        function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
				* Returns a promise that is resolved once the password recovery requestReset action is completed. This action initiates the password recovery process for the user.
				* @method
				* @example
baasicPasswordRecoveryService.requestReset({
  challengeIdentifier : '<challenge-identifier>',
  challengeResponse : '<challenge-response>',
  recoverUrl : '<recover-url>',
  username : '<username>'
})
.success(function () {
  // perform success action here
})
.error(function (data) {
  // perform error handling here
})
.finally (function () {});				
				*/
                requestReset: function (data) {
                    return baasicApp.membershipModule.passwordRecovery.requestReset(data);
                },
                /**
				* Returns a promise that is resolved once the password reset action is completed. This updates user's password selection.
				* @method
				* @example
baasicPasswordRecoveryService.reset({
  newPassword : '<new-password>',
  passwordRecoveryToken : '<password-recovery-token>'
})
.success(function () {
  // perform success action here
})
.error(function (data) {
  // perform error handling here
})
.finally (function () {});				
				*/
                reset: function (data) {
                    return baasicApp.membershipModule.passwordRecovery.reset(data);
                },
                /**
                 * Provides direct access to route definition.
                 * @method        
                 * @example baasicPasswordRecoveryService.routeService.get('<id>', expandObject);
                 **/
                routeService: function () {
                    return baasicApp.membershipModule.passwordRecovery.routeDefinition;
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