/* globals module */
/**
 * @module baasicUserProfileAvatarService
 * @description Baasic Files Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Files Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicUserProfileAvatarService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicUserProfileAvatarRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, filesRouteService) {
            return {                                                                                                                    
                /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns requested file resource.
                * @method        
                * @example 
baasicUserProfileAvatarService.get('<file-id>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
                get: function (id, options) {
                    return baasicApiHttp.get(filesRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                                
                /**
                * Returns a promise that is resolved once the unlink action has been performed. This action will remove one or many file resources from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply baasicUserProfileAvatarRouteService route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(fileEntry);
var uri = params['model'].links('unlink').href;
```
                * @method        
                * @example 
// fileEntry is a file resource previously fetched using get action. The following action will remove the original file resource and all accompanying derived file resources.			 
baasicUserProfileAvatarRouteService.remove(fileEntry)
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});
               **/
                unlink: function (data, options) {
                    if (!options) {
                        options = {};
                    }
                    var params = baasicApiService.removeParams(data);
                    var href = filesRouteService.parse(params[baasicConstants.modelPropertyName].links('unlink').href).expand(options);
                    return baasicApiHttp.delete(href);
                },
                
                /**
                 * Returns a promise that is resolved once the update file action has been performed; this action will update a file resource if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserProfileAvatarRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(fileEntry);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// fileEntry is a file resource previously fetched using get action.
fileEntry.description = '<description>';
baasicUserProfileAvatarService.update(fileEntry)
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
                * Returns a promise that is resolved once the link action has been performed; this action links file resource from other modules into the Profile Files module (For example: file resources from the Media Vault module can be linked directly into the Profile Files module).
                * @method        
                * @example 
baasicUserProfileAvatarService.link(fileObject)
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});
               **/
                link: function (id, data) {
                    var params = angular.copy(data);
                    params.id = id;
                    return baasicApiHttp.post(filesRouteService.link.expand(params), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },

                streams: {                    
                    /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns the file stream if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will return a stream of the derived resource. Otherwise, stream of the original file resource will be retrieved.
                    * @method streams.get        
                    * @example 
// Request the original file stream              
baasicUserProfileAvatarService.stream.get({id: '<file-id>'})
.success(function (data) {
    // perform success action here
})
.error(function (response, status, headers, config) {
    // perform error handling here
});                    
// Request derived file stream                
baasicUserProfileAvatarService.stream.get({id: '<file-id>', width: <width>, height: <height>})
.success(function (data) {
    // perform success action here
})
.error(function (response, status, headers, config) {
    // perform error handling here
});
                    **/
                    get: function (data) {
                        if (!angular.isObject(data)) {
                            data = {
                                id: data
                            };
                        }
                        return baasicApiHttp.get(filesRouteService.streams.get.expand(data));
                    },
                    
                    /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns the file stream as a blob. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will return a blob of the derived file resource. Otherwise, blob of the original file resource will be retrieved. For more information on Blob objects please see [Blob Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
                    * @method streams.getBlob        
                    * @example 
// Request the original blob                
baasicUserProfileAvatarService.stream.getBlob('<file-id>')
.success(function (data) {
    // perform success action here
})
.error(function (response, status, headers, config) {
    // perform error handling here
});
// Request derived blob                 
baasicUserProfileAvatarService.stream.getBlob({id: '<file-id>', width: <width>, height: <height>})
.success(function (data) {
    // perform success action here
})
.error(function (response, status, headers, config) {
    // perform error handling here
});
                    **/
                    getBlob: function (data) {
                        if (!angular.isObject(data)) {
                            data = {
                                id: data
                            };
                        }
                        return baasicApiHttp({
                            url: filesRouteService.streams.get.expand(data),
                            method: 'GET',
                            responseType: 'blob'
                        });
                    },                    

                    /**
                    * Returns a promise that is resolved once the update file stream action has been performed; this action will replace the existing stream with a new one. Alternatively, if a derived stream is being updated it will either create a new derived stream or replace the existing one. In order to update a derived stream, format needs to be passed (For example: `width` and `height` for the image type of file stream data type).
                    * @method streams.update
                    * @example
// Update original file stream 
baasicUserProfileAvatarService.streams.update('<file-id>', <file-stream>)
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});
// Update derived file stream 
baasicUserProfileAvatarService.streams.update({id: '<file-id>', width: <width>, height: <height>}, <file-stream>)
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});
                   **/
                    update: function (data, stream) {
                        if (!angular.isObject(data)) {
                            data = {
                                id: data
                            };
                        }
                        var formData = new FormData();
                        formData.append('file', stream);
                        return baasicApiHttp({
                            transformRequest: angular.identity,
                            url: filesRouteService.streams.update.expand(data),
                            method: 'PUT',
                            data: formData,
                            headers: {
                                'Content-Type': undefined
                            }
                        });
                    },

                    /**
                    * Returns a promise that is resolved once the create file stream action has been performed; this action will upload the specified blob. For more information on Blob objects please see [Blob Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
                    * @method streams.create
                    * @example 
baasicUserProfileAvatarService.streams.create('<file-id>', '<filename'>, <blob>)
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});
                   **/
                    create: function (id, data, stream) {
                        if (!angular.isObject(data)) {
                            data = {
                                filename: data
                            };
                        }
                        var params = angular.copy(data);
                        params.id = id;
                        var formData = new FormData();
                        formData.append('file', stream);
                        return baasicApiHttp({
                            transformRequest: angular.identity,
                            url: filesRouteService.streams.create.expand(params),
                            method: 'POST',
                            data: formData,
                            headers: {
                                'Content-Type': undefined
                            }
                        });
                    }
                }
            };
        }]);
} (angular, module));

/**
 * @overview 
 ***Notes:**
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/
