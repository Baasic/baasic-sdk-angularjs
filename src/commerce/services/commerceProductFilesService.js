/* globals module */
/**
 * @module baasicCommerceProductFilesService
 * @description Baasic Files Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Files Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
 */
(function (angular, module, undefined) {
  'use strict';
  module.service('baasicCommerceProductFilesService', ['baasicApp',
    function (baasicApps) {
      var baasicApp = baasicApps.get();
      return {
        /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of file resources matching the given criteria.
                 * @method        
                 * @example 
baasicCommerceProductFilesService.find({
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
          return baasicApp.commerceModule.files.find(options);
        },

        /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns requested file resource.
                * @method        
                * @example 
baasicCommerceProductFilesService.get('<file-id>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        get: function (id, options) {
          return baasicApp.commerceModule.files.get(id, options);
        },

        /**
                 * Returns a promise that is resolved once the unlink action has been performed. This action will remove one or many file resources from the system if successfully completed. Specified file and all its accompanying derived resources will be removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply baasicProductFilesRouteService route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(fileEntry);
var uri = params['model'].links('unlink').href;
```
                 * @method        
                 * @example 
// fileEntry is a file resource previously fetched using get action. The following action will remove the original file resource and all accompanying derived file resources.			 
baasicProductFilesRouteService.remove(fileEntry)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/
        unlink: function (data, options) {
          return baasicApp.commerceModule.files.unlink(data, options);
        },

        /**
                 * Returns a promise that is resolved once the update file action has been performed; this action will update a file resource if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicProductFilesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(fileEntry);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// fileEntry is a file resource previously fetched using get action.
fileEntry.description = '<description>';
baasicCommerceProductFilesService.update(fileEntry)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/
        update: function (data) {
          return baasicApp.commerceModule.files.update(data);
        },

        /**
                 * Returns a promise that is resolved once the link action has been performed; this action links file resource from other modules into the Product Files module (For example: file resources from the Media Vault module can be linked directly into the Product Files module).
                 * @method        
                 * @example 
baasicCommerceProductFilesService.link(fileObject)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        link: function (data) {
          return baasicApp.commerceModule.files.link(data);
        },

        streams: {
          /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns the file stream if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will return a stream of the derived resource. Otherwise, stream of the original file resource will be retrieved.
                    * @method streams.get        
                    * @example 
// Request the original file stream              
baasicCommerceProductFilesService.stream.get({id: '<file-id>'})
.success(function (data) {
    // perform success action here
})
.error(function (response, status, headers, config) {
    // perform error handling here
});                    
// Request derived file stream                
baasicCommerceProductFilesService.stream.get({id: '<file-id>', width: <width>, height: <height>})
.success(function (data) {
    // perform success action here
})
.error(function (response, status, headers, config) {
    // perform error handling here
});
                    **/
          get: function (data) {
            return baasicApp.commerceModule.files.streams.get(data);
          },

          /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns the file stream as a blob. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will return a blob of the derived file resource. Otherwise, blob of the original file resource will be retrieved. For more information on Blob objects please see [Blob Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
                    * @method streams.getBlob        
                    * @example 
// Request the original blob                
baasicCommerceProductFilesService.stream.getBlob('<file-id>')
.success(function (data) {
    // perform success action here
})
.error(function (response, status, headers, config) {
    // perform error handling here
});
// Request derived blob                 
baasicCommerceProductFilesService.stream.getBlob({id: '<file-id>', width: <width>, height: <height>})
.success(function (data) {
    // perform success action here
})
.error(function (response, status, headers, config) {
    // perform error handling here
});
                    **/
          getBlob: function (data) {
            return baasicApp.commerceModule.files.streams.getBlob(data);
          },

          /**
                     * Returns a promise that is resolved once the update file stream action has been performed; this action will replace the existing stream with a new one. Alternatively, if a derived stream is being updated it will either create a new derived stream or replace the existing one. In order to update a derived stream, format needs to be passed (For example: `width` and `height` for the image type of file stream data type).
                     * @method streams.update
                     * @example
// Update original file stream 
baasicCommerceProductFilesService.streams.update('<file-id>', <file-stream>)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
// Update derived file stream 
baasicCommerceProductFilesService.streams.update({id: '<file-id>', width: <width>, height: <height>}, <file-stream>)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/
          update: function (data, stream) {
            return baasicApp.commerceModule.files.streams.update(data, stream);
          },

          /**
                     * Returns a promise that is resolved once the create file stream action has been performed; this action will upload the specified blob. For more information on Blob objects please see [Blob Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
                     * @method streams.create
                     * @example 
baasicCommerceProductFilesService.streams.create('<file-id>', <blob>)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/
          create: function (data, stream) {
            return baasicApp.commerceModule.files.streams.create(data, stream);
          },
          routeService: baasicApp.commerceModule.files.streams.routeDefinition
        },

        batch: {
          /**
                  * Returns a promise that is resolved once the unlink action has been performed. This action will remove file resources from the system if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will remove just derived resource. Otherwise, specified file and all its accompanying derived resources will be removed from the system.
                  * @method batch.unlink       
                  * @example
// Remove original file resources                
baasicCommerceProductFilesService.batch.unlink([{ id: '<file-id>' }])
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
// Remove derived file resources  
baasicCommerceProductFilesService.batch.unlink([{ id: '<file-id>', fileFormat: { width: <width>, height: <height> } }])
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		  
                  **/
          unlink: function (data) {
            return baasicApp.commerceModule.files.batch.unlink(data);
          },
          /**
                  * Returns a promise that is resolved once the update action has been performed; this action updates specified file resources.
                  * @method batch.update       
                  * @example 
baasicCommerceProductFilesService.batch.update(files)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                  **/
          update: function (data) {
            return baasicApp.commerceModule.files.batch.update(data);
          },

          /**
                  * Returns a promise that is resolved once the link action has been performed; this action links file resources from other modules into the Files module (For example: file resources from the Media Vault module can be linked directly into the Files module).
                  * @method batch.link       
                  * @example 
baasicCommerceProductFilesService.batch.link(files)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                  **/
          link: function (data) {
            return baasicApp.commerceModule.files.batch.link(data);
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