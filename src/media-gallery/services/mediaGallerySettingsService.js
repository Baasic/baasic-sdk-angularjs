/* globals module */
/**
 * @module baasicMediaGallerySettingsService
 * @description Baasic Media Gallery Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Media Gallery Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
 */
(function (angular, module, undefined) {
  'use strict';
  module.service('baasicMediaGallerySettingsService', ['baasicApp',
    function (baasicApps) {
      var baasicApp = baasicApps.get();
      return {
          /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns media gallery settings resource.
                    * @method settings.get        
                    * @example 
baasicMediaGallerySettingsService.settings.get()
.success(function (data) {
    // perform success action here
})
.error(function (response, status, headers, config) {
    // perform error handling here
});
                    **/
          get: function () {
            return baasicApp.mediaGalleryModule.settings.get();
          },

          /**
                  * Returns a promise that is resolved once the update action has been performed; this action updates the media gallery settings resource.
                  * @method settings.update       
                  * @example 
baasicMediaGallerySettingsService.settings.update(mediaGallerySettings)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                  **/
          update: function (data) {
            return baasicApp.mediaGalleryModule.settings.update(data);
          },
          routeService: baasicApp.mediaGalleryModule.settings.routeDefinition   
      };
    }
  ]);
}(angular, module));

/**
 * @overview 
 ***Notes:**
 - Refer to the [REST API documentation](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/