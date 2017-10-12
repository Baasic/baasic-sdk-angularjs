/* globals module */
/**
 * @module baasicMediaGalleryFilesService
 * @description Baasic Media Gallery Files Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Media Gallery Files Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
 */
(function (angular, module, undefined) {
  'use strict';
  module.service('baasicMediaGalleryFilesService', ['baasicApp',
    function (baasicApps) {
      var baasicApp = baasicApps.get();
      return {
        /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of media gallery files matching the given criteria.
                 * @method        
                 * @example 
baasicMediaGalleryFilesService.find({
  pageNumber : 1,
  pageSize : 10,
  orderBy : '<field>',
  orderDirection : '<asc|desc>',
  search : '<search-phrase>',
  ids : '1,2,5',
  from : '',
  to : ''
})
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                **/
        find: function (options) {
          return baasicApp.mediaGalleryModule.files.find(options);
        },

        /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns requested media gallery file resource.
                * @method        
                * @example 
baasicMediaGalleryFilesService.get('<id>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        get: function (id, options) {
          return baasicApp.mediaGalleryModule.files.get(id, options);
        },

        /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove one media gallery file resources from the system if successfully completed.  This route uses HAL enabled objects to obtain routes and therefore it doesn't apply baasicMediaGalleryRouteService route template. Here is an example of how a route can be obtained from HAL enabled objects: 
```
var params = baasicApiService.removeParams(mediaGalleryEntry);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// mediaGalleryEntry is a media gallery resource previously fetched using get action. The following action will remove the original media gallery resource and all accompanying derived media gallery resources.		
baasicMediaGalleryFilesService.remove(id)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
        remove: function (id) {
          return baasicApp.mediaGalleryModule.files.remove(id);
        },

        /**
                 * Returns a promise that is resolved once the update media gallery action has been performed; this action will update a media gallery resource if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicMediaGalleryRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(mediaGalleryEntry);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// mediaGalleryEntry is a media gallery resource previously fetched using get action.
mediaGalleryEntry.description = '<description>';
baasicMediaGalleryFilesService.update(mediaGalleryEntry)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/
        update: function (data) {
          return baasicApp.mediaGalleryModule.files.update(data);
        },

        /**
                * Returns a promise that is resolved once the create action has been performed. Success response returns the new media gallery resource.
                * @method        
                * @example 
baasicMediaGalleryFilesService.create(mediaGalleryEntry)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
        **/
        create: function (data) {
          return baasicApp.mediaGalleryModule.files.create(data);
        },       

        batch: {
          /**
                  * Returns a promise that is resolved once the unlink action has been performed. This action will unlink media gallery resources.
                  * @method     
                  * @example
// Remove original media gallery resources		 
baasicMediaGalleryFilesService.batch.unlink([{ id: '<id>' }])
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
}); 	
                  **/
          unlink: function (ids) {
            return baasicApp.mediaGalleryModule.files.batch.unlink(ids);
          },

          /**
                  * Returns a promise that is resolved once the link action has been performed; this action links specified media gallery files.
                  * @method 
                  * @example 
baasicMediaGalleryFilesService.batch.link(files)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                  **/
          link: function (files) {
            return baasicApp.mediaGalleryModule.files.batch.link(files);
          },

          /**
                  * Returns a promise that is resolved once the update action has been performed; this action updates specified media gallery resources.
                  * @method 
                  * @example 
baasicMediaGalleryFilesService.batch.update(files)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
          **/
          update: function (files) {
            return baasicApp.mediaGalleryModule.files.batch.update(files);
          },
          routeService: baasicApp.mediaGalleryModule.files.batch.routeDefinition
        },
        
        routeService: baasicApp.mediaGalleryModule.files.routeDefinition
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