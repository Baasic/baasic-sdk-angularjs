/* globals module */
/**
 * @module baasicArticleTagsService
 * @description Baasic Article Tags Service provides an easy way to consume Baasic Article Tags REST API end-points. `baasicArticleTagsService` functions enable performing standard CRUD operations directly on article tag resources, whereas the `baasicArticleService` functions allow management between article and article tag. In order to obtain needed routes `baasicArticleTagsService` uses `baasicArticleTagsRouteService`.
 */

(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleTagsService', ['baasicApp',
        function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article tag resources matching the given criteria.
                * @method        
                * @example 
baasicArticleTagsService.find({
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
                    return baasicApp.articleModule.tags.find(options);
                },
                /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the specified article tag resource.
                * @method        
                * @example 
baasicArticleTagsService.get('<articleTag-id>')
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});
               **/
                get: function (id, options) {
                    return baasicApp.articleModule.tags.get(id, options);
                },
                /**
                * Returns a promise that is resolved once the update article tag action has been performed; this action updates a tag. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleTagsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(articleTag);
var uri = params['model'].links('put').href;
```
                * @method        
                * @example 
// articleTag is a resource previously fetched using get action.
articleTag.tag = '<new-tag>';
baasicArticleTagsService.update(articleTag)
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});
               **/
                update: function (data) {
                    return baasicApp.articleModule.tags.update(data);
                },
                /**
                * Returns a promise that is resolved once the remove article tag action has been performed. If the action is successfully completed, the article tag resource will be permanently removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleTagsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(articleTag);
var uri = params['model'].links('delete').href;
```
                * @method        
                * @example 
// articleTag is a resource previously fetched using get action.				 
baasicArticleTagsService.remove(articleTag)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
                remove: function (data) {
                    return baasicApp.articleModule.tags.remove(data);
                },
                /**
                 * Provides direct access to `baasicArticleTagsRouteService`.
                 * @method        
                 * @example baasicArticleTagsService.routeService.get.expand(expandObject);
                 **/
                routeService: function () {
                    return baasicApp.articleModule.tags.routeDefinition;
                },

                subscriptions: {
                    /**
                    * Returns a promise that is resolved once the subscribe action has been performed. This action subscribes an user to the specified tag.
                    * @method subscriptions.subscribe
                    * @example 
baasicArticleTagsService.subscriptions.subscribe(tag, user)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                    **/
                    subscribe: function (tag, data) {
                        return baasicApp.articleModule.tags.subscriptions.subscribe(tag, data);
                    },
                    /**
                    * Returns a promise that is resolved once the isSubscribed action has been performed. This action checks if a user is subscribed to the specified tag.
                    * @method subscriptions.isSubscribed
                    * @example 
baasicArticleTagsService.subscriptions.isSubscribed(tag, user)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                    **/
                    isSubscribed: function (tag, data) {
                        return baasicApp.articleModule.tags.subscriptions.isSubscribed(tag, data);
                    },
                    /**
                    * Returns a promise that is resolved once the unSubscribe action has been performed. This action unsubscribes a user from the specified tag.
                    * @method subscriptions.unSubscribe
                    * @example 
baasicArticleTagsService.subscriptions.unSubscribe(tag, user)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                    **/
                    unSubscribe: function (tag, data) {
                        return baasicApp.articleModule.tags.subscriptions.unSubscribe(tag, data);
                    }
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