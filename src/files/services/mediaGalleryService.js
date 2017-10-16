/* globals module */
/**
 * @module baasicMediaGalleryService
 * @description Baasic Media Gallery Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Media Gallery Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
 */
(function (angular, module, undefined) {
  'use strict';
  module.service('baasicMediaGalleryService', ['baasicApp',
    function (baasicApps) {
      var baasicApp = baasicApps.get();
      return {
        /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of media gallery resources matching the given criteria.
                 * @method        
                 * @example 
baasicMediaGalleryService.find({
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
          return baasicApp.mediaGalleryModule.galleries.find(options);
        },

        /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns requested media gallery resource.
                * @method        
                * @example 
baasicMediaGalleryService.get('<media-gallery-id>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        get: function (id, options) {
          return baasicApp.mediaGalleryModule.galleries.get(id, options);
        },

        /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove one media gallery resources from the system if successfully completed. Specified media gallery and all accompanying derived resources will be removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply baasicMediaGalleryRouteService route template. Here is an example of how a route can be obtained from HAL enabled objects: 
```
var params = baasicApiService.removeParams(mediaGalleryEntry);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// mediaGalleryEntry is a media gallery resource previously fetched using get action. The following action will remove the original media gallery resource and all accompanying derived media gallery resources.		
baasicMediaGalleryService.remove(mediaGalleryEntry)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
        remove: function (mediaGallery, options) {
          return baasicApp.mediaGalleryModule.galleries.remove(mediaGallery, options);
        },

        /**
                 * Returns a promise that is resolved once the purge action has been performed. This action will remove all media gallery resources from the system if successfully completed. Specified media gallery and all accompanying derived resources will be removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply baasicMediaGalleryRouteService route template. Here is an example of how a route can be obtained from HAL enabled objects: 
                 * @method        
                 * @example 
//The following action will remove all media gallery resources and all accompanying derived media gallery resources.		
baasicMediaGalleryService.purge()
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
        purge: function () {
          return baasicApp.mediaGalleryModule.galleries.purge();
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
baasicMediaGalleryService.update(mediaGalleryEntry)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/
        update: function (data) {
          return baasicApp.mediaGalleryModule.galleries.update(data);
        },

        /**
                * Returns a promise that is resolved once the create action has been performed. Success response returns the new media gallery resource.
                * @method        
                * @example 
baasicMediaGalleryService.create(mediaGalleryEntry)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
        **/
        create: function (data) {
          return baasicApp.mediaGalleryModule.galleries.create(data);
        },

        streams: {
          /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns the media gallery stream if successfully completed. Stream of the original media gallery resource will be retrieved.
                    * @method streams.get        
                    * @example 
// Request the original media gallery stream   
baasicMediaGalleryService.stream.get('<media-gallery>')
.success(function (data) {
    // perform success action here
})
.error(function (response, status, headers, config) {
    // perform error handling here
});
                    **/
          get: function (id, data) {
            return baasicApp.mediaGalleryModule.galleries.streams.get(id, data);
          },

          /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns the media gallery stream as a blob. Blob of the original media gallery resource will be retrieved. For more information on Blob objects please see [Blob Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
                    * @method streams.getBlob        
                    * @example 
// Request the original blob   
baasicMediaGalleryService.stream.getBlob('<media-gallery>')
.success(function (data) {
    // perform success action here
})
.error(function (response, status, headers, config) {
    // perform error handling here
});
                    **/
          getBlob: function (data) {
            return baasicApp.mediaGalleryModule.galleries.streams.getBlob(data);
          },

          /**
                     * Returns a promise that is resolved once the update media gallery stream action has been performed; this action will replace the existing stream with a new one.
                     * @method streams.update
                     * @example
// Update existing original media gallery stream
baasicMediaGalleryService.streams.update('<path>', <media-gallery-stream>)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/
          update: function (data, stream) {
            return baasicApp.mediaGalleryModule.galleries.streams.update(data, streams);
          },

          /**
                     * Returns a promise that is resolved once the create media gallery stream action has been performed; this action will upload the specified blob. For more information on Blob objects please see [Blob Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
                     * @method streams.create
                     * @example 
baasicMediaGalleryService.streams.create('<path>', <blob>)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/
          create: function (data, stream) {
            return baasicApp.mediaGalleryModule.galleries.streams.create(data, stream);
          },
          routeService: baasicApp.mediaGalleryModule.galleries.streams.routeDefinition
        },

        batch: {
          /**
                  * Returns a promise that is resolved once the remove action has been performed. This action will remove media gallery resources from the system if successfully completed. Specified media gallery and all its accompanying derived resources will be removed from the system.
                  * @method batch.remove       
                  * @example
// Remove original media gallery resources		 
baasicMediaGalleryService.batch.remove([{ id: '<media-gallery-id>' }])
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
}); 	
                  **/
          remove: function (data) {
            return baasicApp.mediaGalleryModule.galleries.batch.remove(data);
          },
          /**
                  * Returns a promise that is resolved once the create action has been performed; this action creates specified media gallery resources.
                  * @method batch.update       
                  * @example 
baasicMediaGalleryService.batch.create(files)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                  **/
          create: function (data) {
            return baasicApp.mediaGalleryModule.galleries.batch.create(data);
          },
          routeService: baasicApp.mediaGalleryModule.galleries.batch.routeDefinition
        },        

       files: {
          /**
                   * Returns a promise that is resolved once the find action has been performed. Success response returns a list of file resources matching the given criteria.
                   * @method        
                   * @example 
baasicMediaGalleryService.files.find(<media-gallery-id>, {
  pageNumber : 1,   
  pageSize : 10,   
  orderBy : '<field>',   
  orderDirection : '<asc|desc>',
  ids: '1,2,3',
  from: '',
  to: '',                   
  search : '<search-phrase>'
})
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                  **/
          find: function (mediaGalleryId, options) {
            return baasicApp.mediaGalleryModule.galleries.files.find(mediaGalleryId, options);
          },

          /**
                  * Returns a promise that is resolved once the get action has been performed. Success response returns requested file resource.
                  * @method        
                  * @example 
baasicMediaGalleryService.files.get('<media-gallery-id>','<id>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                  **/
          get: function (mediaGalleryId, id, options) {
            return baasicApp.mediaGalleryModule.galleries.files.get(mediaGalleryId, id, options);
          },

          /**
                  * Returns a promise that is resolved once the unlink action has been performed. This action will remove one or many file resources from the system if successfully completed. Specified file and all its accompanying derived resources will be removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply baasicMediaGalleryFilesRouteService route template. Here is an example of how a route can be obtained from HAL enabled objects: 
```
var params = modelMapper.removeParams(fileEntry); 
var uri = params['model'].links('unlink').href; 
```
                  * @method        
                  * @example 
// fileEntry is a resource previously fetched using get action.
 baasicMediaGalleryService.files.unlink('<media-gallery-id>', fileEntry)
.then(function (data) {   
    // perform success action here 
},
  function (response, status, headers, config) {   
    // perform error handling here 
}); 	
				  **/
          unlink: function (mediaGalleryId, data) {
            return baasicApp.mediaGalleryModule.galleries.files.unlink(mediaGalleryId, data);
          },
          
          /**
                  * Returns a promise that is resolved once the unlink by media gallery action has been performed. This action will remove all file resources from the system related to the requested media gallery if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply baasicMediaGalleryService route template. Here is an example of how a route can be obtained from HAL enabled objects: 
```
var params = modelMapper.removeParams(fileEntry); 
var uri = params['model'].links('unlink').href; 
```
                  * @method        
                  * @example 
 baasicMediaGalleryService.files.unlink('<media-gallery-id>')
.then(function (data) {   
    // perform success action here 
},
  function (response, status, headers, config) {   
    // perform error handling here 
}); 	
				  **/
          unlinkByMediaGallery: function (mediaGalleryId) {
            return baasicApp.mediaGalleryModule.galleries.files.unlinkByMediaGallery(mediaGalleryId);
          },
          
          /**
                  * Returns a promise that is resolved once the update file action has been performed; this action will update a file resource if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicMediaGalleryFilesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects: 
```
var params = modelMapper.removeParams(fileEntry); 
var uri = params['model'].links('put').href; 
```
                  * @method        
                  * @example 
// fileEntry is a resource previously fetched using get action.
 baasicMediaGalleryService.files.update('<media-gallery-id>', fileEntry)
.then(function (data) {   
    // perform success action here 
},
  function (response, status, headers, config) {   
    // perform error handling here 
}); 	
				  **/
          update: function (mediaGalleryId, data) {
            return baasicApp.mediaGalleryModule.galleries.files.update(mediaGalleryId, data);
          },
          
          /**
                  * Returns a promise that is resolved once the link action has been performed; this action links file resource from other modules into the Media GalleryFiles module (For example: file resources from the Media Vault module can be linked directly into the Media GalleryFiles module).         
                  * @method        
                  * @example 
// fileEntry is a resource previously fetched using get action.
 baasicMediaGalleryService.files.update('<media-gallery-id>', fileEntry)
.then(function (data) {   
    // perform success action here 
},
  function (response, status, headers, config) {   
    // perform error handling here 
}); 	
				  **/
          link: function (mediaGalleryId, data) {
            return baasicApp.mediaGalleryModule.galleries.files.link(mediaGalleryId, data);
          },

          batch: {
            /**
                    * Returns a promise that is resolved once the unlink action has been performed. This action will remove file resources from the system if successfully completed. Specified file and all its accompanying derived resources will be removed from the system.
                    * @method    
                    * @example  	 
  baasicMediaGalleryService.files.batch.unlink('<media-gallery-id>', files)
  .success(function (data) {
    // perform success action here
  })
  .error(function (response, status, headers, config) {
    // perform error handling here
  }); 	
                    **/
            unlink: function (mediaGalleryId, data) {
              return baasicApp.mediaGalleryModule.galleries.files.batch.unlink(mediaGalleryId, data);
            },

            /**
                    * Returns a promise that is resolved once the link action has been performed; this action links file resources from other modules into the Files module (For example: file resources from the Media Vault module can be linked directly into the Files module).
                    * @method 
                    * @example 
  baasicMediaGalleryService.files.batch.link('<media-gallery-id>', files)
  .success(function (data) {
    // perform success action here
  })
  .error(function (response, status, headers, config) {
    // perform error handling here
  });
                    **/
            link: function (mediaGalleryId, data) {
              return baasicApp.mediaGalleryModule.galleries.files.batch.link(mediaGalleryId, data);
            },
            
            /**
                    * Returns a promise that is resolved once the update action has been performed; this action updates specified file resources.
                    * @method 
                    * @example 
  baasicMediaGalleryService.files.batch.update('<media-gallery-id>', files)
  .success(function (data) {
    // perform success action here
  })
  .error(function (response, status, headers, config) {
    // perform error handling here
  });
                    **/
            update: function (mediaGalleryId, data) {
              return baasicApp.mediaGalleryModule.galleries.files.batch.update(mediaGalleryId, data);
            },

            routeService: baasicApp.mediaGalleryModule.galleries.files.batch.routeDefinition
          },

          routeService: baasicApp.mediaGalleryModule.galleries.files.routeDefinition
        },
        routeService: baasicApp.mediaGalleryModule.galleries.routeDefinition
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