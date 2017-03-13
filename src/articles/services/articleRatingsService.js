/* globals module */
/**
 * @module baasicArticleRatingsService
 * @description Baasic Article Ratings Service provides an easy way to consume Baasic Article Ratings REST API end-points. `baasicArticleRatingsService` functions enable performing standard CRUD operations directly on article rating resources, whereas the `baasicArticleService` functions allow management between article and article rating. In order to obtain needed routes `baasicArticleRatingsService` uses `baasicArticleRatingsRouteService`.
 */
(function (angular, module, undefined) {
  'use strict';
  module.service('baasicArticleRatingsService', ['baasicApp',
    function (baasicApps) {
      var baasicApp = baasicApps.get();
      return {
        /**
                  * Returns a promise that is resolved once the create article rating action has been performed; this action creates a new rating for an article.
                  * @method     
                  * @example 
baasicArticleRatingsService.create({
articleId : '<article-id>',
rating : 5,
userId : '<user-id>'
})
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                  **/
        create: function (data) {
          return baasicApp.articleModule.ratings.create(data);
        },
        /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article rating resources matching the given criteria.
                 * @method        
                 * @example 
baasicArticleRatingsService.find({
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
          return baasicApp.articleModule.ratings.find(options);
        },
        /**
                 * Returns a promise that is resolved once the findByUser action has been performed. Success response returns a list of article rating resources filtered by username.
                 * @method        
                 * @example 
baasicArticleRatingsService.find('<username>', {
  pageNumber : 1,
  pageSize : 10,
  orderBy : '<field>',
  orderDirection : '<asc|desc>'
})
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                 **/
        findByUser: function (username, options) {
          return baasicApp.articleModule.ratings.findByUser(username, options);
        },
        /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified article rating resource.
                 * @method        
                 * @example 
baasicArticleRatingsService.get('<articleRating-id>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        get: function (id, options) {
          return baasicApp.articleModule.ratings.get(id, options);
        },
        /**
                 * Returns a promise that is resolved once the update article rating action has been performed; this action updates an article rating. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRatingsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(articleRating);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// articleRating is a resource previously fetched using get action.
articleRating.rating = 4;
baasicArticleRatingsService.update(articleRating)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/
        update: function (data) {
          return baasicApp.articleModule.ratings.update(data);
        },
        /**
                * Returns a promise that is resolved once the remove article rating action has been performed. If the action is successfully completed, the article rating resource will be permanently removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRatingsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(articleRating);
var uri = params['model'].links('delete').href;
```
                * @method        
                * @example 
// articleRating is a resource previously fetched using get action.				 
baasicArticleRatingsService.remove(articleRating)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
        remove: function (data) {
          return baasicApp.articleModule.ratings.remove(data);
        },
        /**
         * Provides direct access to `baasicArticleRatingsRouteService`.
         * @method        
         * @example baasicArticleRatingsService.routeService.get.expand(expandObject);
         **/
        routeService: function () {
          return baasicApp.articleModule.ratings.routeDefinition;
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