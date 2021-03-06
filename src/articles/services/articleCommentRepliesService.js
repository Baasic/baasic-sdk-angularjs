/* globals module */
/**
 * @module baasicArticleCommentRepliesService
 * @description Baasic Article Comment Replies Service provides an easy way to consume Baasic Article Comment Replies REST API end-points. `baasicArticleCommentRepliesService` functions enable performing standard CRUD operations directly on article comment reply resources, whereas the `baasicArticleService` functions allow management between article and article comment reply. In order to obtain needed routes `baasicArticleCommentRepliesService` uses `baasicArticleCommentRepliesRouteService`.
 */
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleCommentRepliesService', ['baasicApp',
        function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Contains a reference to valid list of article comment reply states. It returns an object containing all article comment reply states.
                 * @method  
                 * @example baasicArticleCommentRepliesService.statuses.approved;
                 **/
                statuses: baasicApp.articleModule.comments.replies.statuses,
                /**
                * Returns a promise that is resolved once the approve article comment reply action has been performed. This action sets the state of an article comment reply to "approved". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentRepliesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('comment-approve').href;
```
                * @method
                * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleCommentRepliesService.approve(articleCommentReply, commentOptions)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/
                approve: function (data, options) {
                    return baasicApp.articleModule.comments.replies.approve(data, options);
                },
                /**
                * Returns a promise that is resolved once the unapprove article comment reply action has been performed. This action sets the state of an article comment reply to "unapproved". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentRepliesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('comment-unapprove').href;
```
                * @method
                * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleCommentRepliesService.unapprove(articleCommentReply)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/
                unapprove: function (data) {
                    return baasicApp.articleModule.comments.replies.unapprove(data);
                },
                /**
                * Returns a promise that is resolved once the create article comment reply action has been performed; this action creates a new comment reply for an article.
                * @method      
                * @example 
baasicArticleCommentRepliesService.create('<article-id>', {
commentId : '<comment-id>',
comment : <comment>,
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
                    return baasicApp.articleModule.comments.replies.create(data);
                },
                /**
                * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article comment reply resources matching the given criteria.
                * @method
                * @example 
baasicArticleCommentRepliesService.find({
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
                    return baasicApp.articleModule.comments.replies.find(options);
                },
                /**
                * Returns a promise that is resolved once the flag article comment reply action has been performed. This action sets the state of an article comment reply to "flagged". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentRepliesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('comment-flag').href;
```
                * @method      
                * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleCommentRepliesService.flag(articleCommentReply)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/
                flag: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApp.articleModule.comments.replies.flag(data);
                },
                /**
                * Returns a promise that is resolved once the unflag article comment reply action has been performed. This action removes the "flagged" comment reply state. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentRepliesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('comment-unflag').href;
```
                * @method  
                * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleCommentRepliesService.unflag(articleCommentReply)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/
                unflag: function (data) {
                    return baasicApp.articleModule.comments.replies.unflag(data);
                },
                /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the specified article comment reply resource.
                * @method   
                * @example 
baasicArticleCommentRepliesService.get('<comment-reply-id>')
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                **/
                get: function (id, options) {
                    return baasicApp.articleModule.comments.replies.get(id, options);
                },
                /**
                * Returns a promise that is resolved once the remove article comment reply action has been performed. If the action is successfully completed, the article comment reply resource will be permanently removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentRepliesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(articleCommentReply);
var uri = params['model'].links('delete').href;
```
                * @method 
                * @example 
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleCommentRepliesService.remove(articleCommentReply)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
        **/
                remove: function (data) {
                    return baasicApp.articleModule.comments.replies.remove(data);
                },
                /**
                * Returns a promise that is resolved once the report article comment reply action has been performed. This action sets the state of an article comment reply to "reported". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentRepliesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('comment-report').href;
```
                * @method      
                * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleCommentRepliesService.report(articleCommentReply, commentOptions)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/
                report: function (data, options) {
                    return baasicApp.articleModule.comments.replies.report(data, options);
                },
                /**
                * Returns a promise that is resolved once the unreport article comment reply action has been performed. This action removes the "reported" comment reply state. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentRepliesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('comment-unreport').href;
```
                * @method      
                * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleCommentRepliesService.unreport(articleCommentReply)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/
                unreport: function (data) {
                    return baasicApp.articleModule.comments.replies.unreport(data);
                },
                /**
                * Returns a promise that is resolved once the mark as spam article comment reply action has been performed. This action sets the state of an article comment reply to "spam". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentRepliesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('comment-spam').href;
```
                * @method      
                * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleCommentRepliesService.spam(articleCommentReply)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/
                spam: function (data) {
                    return baasicApp.articleModule.comments.replies.spam(data);
                },
                /**
                * Returns a promise that is resolved once the unspam article comment reply action has been performed. This action removes the "spam" comment reply state. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentRepliesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('comment-unspam').href;
```
                * @method    
                * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleCommentRepliesService.unspam(articleCommentReply)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/
                unspam: function (data) {
                    return baasicApp.articleModule.comments.replies.unspam(data);
                },
                /**
                * Returns a promise that is resolved once the update article comment reply action has been performed; this action updates an article comment reply resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentRepliesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('put').href;
```
                * @method      
                * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleCommentRepliesService.update(articleCommentReply)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/
                update: function (data) {
                    return baasicApp.articleModule.comments.replies.update(data);
                },
                /**
                 * Provides direct access to `baasicArticleCommentRepliesRouteService`.
                 * @method        
                 * @example baasicArticleCommentRepliesService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.articleModule.comments.replies.routeDefinition
            };
        }
    ]);
}(angular, module));

/**
 * @overview 
 ***Notes:**
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/