/*
 Baasic AngularJS SDK v2.0.0-rc.8
 (c) 2014-2017 Mono Ltd.  http://baasic.com
 License: MIT
*/
(function (angular, undefined) { /* exported module */

    /** 
     * @description The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism. An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.appSettings` module functionality it must be added as a dependency to your app.
     * @copyright (c) 2017 Mono Ltd
     * @license MIT
     * @author Mono Ltd
     * @module baasic.appSettings
     * @example
     (function (Main) {
     "use strict";
     var dependencies = [
     "baasic.api",
     "baasic.membership",
     "baasic.security",
     "baasic.appSettings",
     "baasic.article",
     "baasic.dynamicResource",
     "baasic.keyValue",
     "baasic.valueSet"
     ];
     Main.module = angular.module("myApp.Main", dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module('baasic.appSettings', ['baasic.api']);

    /* globals module */
    /**
     * @module baasicApplicationSettingsService
     * @description Baasic Application Settings Service provides an easy way to consume Baasic Application Settings REST API end-points. In order to obtain needed routes `baasicApplicationSettingsService` uses `baasicApplicationSettingsRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicApplicationSettingsService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the application settings resource.
                 * @method        
                 * @example 
                 baasicApplicationSettingsService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (options) {
                    return baasicApp.applicationSettingModule.get(options).success(function (appSettings) {
                        appSettings.origins = appSettings.origins || [];
                    });
                },
                /**
                 * Returns a promise that is resolved once the update application settings action has been performed. This action updates the application setting resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't use `baasicApplicationSettingsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(appSettings);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // appSettings is a resource previously fetched using get action.
                 appSettings.allowAnyOrigin = true;
                 baasicApplicationSettingsService.update(appSettings)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.applicationSettingModule.update(data);
                },
                routeService: baasicApp.applicationSettingModule.routeDefinition
            };
        }]);
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
    /* exported module */
    /** 
     * @description The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism.  An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.article` module functionality it must be added as a dependency to your app.
     * @copyright (c) 2017 Mono Ltd
     * @license MIT
     * @author Mono Ltd
     * @module baasic.article
     * @example
     (function (Main) {
     'use strict';
     var dependencies = [
     'baasic.api',
     'baasic.membership',
     'baasic.security',
     'baasic.appSettings',
     'baasic.article',
     'baasic.dynamicResource',
     'baasic.keyValue',
     'baasic.valueSet'
     ];
     Main.module = angular.module('myApp.Main', dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module('baasic.article', ['baasic.api']);

    /* globals module */
    /**
     * @module baasicArticleCommentRepliesService
     * @description Baasic Article Comment Replies Service provides an easy way to consume Baasic Article Comment Replies REST API end-points. `baasicArticleCommentRepliesService` functions enable performing standard CRUD operations directly on article comment reply resources, whereas the `baasicArticleService` functions allow management between article and article comment reply. In order to obtain needed routes `baasicArticleCommentRepliesService` uses `baasicArticleCommentRepliesRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicArticleCommentRepliesService', ['baasicApp', function (baasicApps) {
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
        }]);
    }(angular, module));

    /**
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicArticleCommentsService
     * @description Baasic Article Comments Service provides an easy way to consume Baasic Article Comments REST API end-points. `baasicArticleCommentsService` functions enable performing standard CRUD operations directly on article comment resources, whereas the `baasicArticleService` functions allow management between article and article comments. In order to obtain needed routes `baasicArticleCommentsService` uses `baasicArticleCommentsRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicArticleCommentsService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Contains a reference to valid list of article comment states. It returns an object containing all article comment states.
                 * @method      
                 * @example baasicArticleCommentsService.statuses.approved;
                 **/
                statuses: baasicApp.articleModule.comments.statuses,
                /**
                 * Returns a promise that is resolved once the approve article comment action has been performed. This action sets the state of an article comment to "approved". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.updateParams(articleComment);
                 var uri = params['model'].links('comment-approve').href;
                 ```
                 * @method       
                 * @example 	
                 // articleComment is a resource previously fetched using get action.
                 baasicArticleCommentsService.approve(articleComment, commentOptions)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                approve: function (data, options) {
                    return baasicApp.articleModule.comments.approve(data, options);
                },
                /**
                 * Returns a promise that is resolved once the unapprove article comment action has been performed. This action sets the state of an article comment to "unapproved". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.updateParams(articleComment);
                 var uri = params['model'].links('comment-unapprove').href;
                 ```
                 * @method       
                 * @example 	
                 // articleComment is a resource previously fetched using get action.
                 baasicArticleCommentsService.unapprove(articleComment)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                unapprove: function (data) {
                    return baasicApp.articleModule.comments.unapprove(data);
                },
                /**
                 * Returns a promise that is resolved once the create article comment action has been performed; this action creates a new comment for an article.
                 * @method      
                 * @example 
                 baasicArticleCommentsService.create({
                 articleId : '<article-id>',
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
                    return baasicApp.articleModule.comments.create(data);
                },
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article comment resources matching the given criteria.
                 * @method
                 * @example 
                 baasicArticleCommentsService.find({
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
                    return baasicApp.articleModule.comments.find(options);
                },
                /**
                 * Returns a promise that is resolved once the flag article comment action has been performed. This action sets the state of an article comment to "flagged". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.updateParams(articleComment);
                 var uri = params['model'].links('comment-flag').href;
                 ```
                 * @method       
                 * @example 	
                 // articleComment is a resource previously fetched using get action.
                 baasicArticleCommentsService.flag(articleComment)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                flag: function (data) {
                    return baasicApp.articleModule.comments.flag(data);
                },
                /**
                 * Returns a promise that is resolved once the unflag article comment action has been performed. This action removes the "flagged" comment mark. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.updateParams(articleComment);
                 var uri = params['model'].links('comment-unflag').href;
                 ```
                 * @method       
                 * @example 	
                 // articleComment is a resource previously fetched using get action.
                 baasicArticleCommentsService.unflag(articleComment)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                unflag: function (data) {
                    return baasicApp.articleModule.comments.unflag(data);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified article comment resource.
                 * @method       
                 * @example 
                 baasicArticleCommentsService.get('<article-id>', '<comment-id>')
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.articleModule.comments.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the remove article comment action has been performed. If the action is successfully completed, the article comment resource and its replies will be permanently removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(articleComment);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method   
                 * @example 
                 // articleComment is a resource previously fetched using get action.
                 baasicArticleCommentsService.remove(articleComment)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.articleModule.comments.remove(data);
                },
                /**
                 * Returns a promise that is resolved once the report article comment action has been performed. This action sets the state of an article comment to "reported". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.updateParams(articleComment);
                 var uri = params['model'].links('comment-report').href;
                 ```
                 * @method       
                 * @example 	
                 // articleComment is a resource previously fetched using get action.
                 baasicArticleCommentsService.report(articleComment, commentOptions)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                report: function (data, options) {
                    return baasicApp.articleModule.comments.report(data, options);
                },
                /**
                 * Returns a promise that is resolved once the unreport article comment action has been performed. This action removes the "reported" comment mark. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.updateParams(articleComment);
                 var uri = params['model'].links('comment-unreport').href;
                 ```
                 * @method       
                 * @example 	
                 // articleComment is a resource previously fetched using get action.
                 baasicArticleCommentsService.unreport(articleComment)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                unreport: function (data) {
                    return baasicApp.articleModule.comments.unreport(data);
                },
                /**
                 * Returns a promise that is resolved once the mark as spam article comment action has been performed. This action sets the state of an article comment to "spam". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.updateParams(articleComment);
                 var uri = params['model'].links('comment-spam').href;
                 ```
                 * @method       
                 * @example 	
                 // articleComment is a resource previously fetched using get action.
                 baasicArticleCommentsService.spam(articleComment)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                spam: function (data) {
                    return baasicApp.articleModule.comments.spam(data);
                },
                /**
                 * Returns a promise that is resolved once the unspam article comment action has been performed. This action removes the "spam" comment mark. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.updateParams(articleComment);
                 var uri = params['model'].links('comment-unspam').href;
                 ```
                 * @method       
                 * @example 	
                 // articleComment is a resource previously fetched using get action.
                 baasicArticleCommentsService.unspam(articleComment)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                unspam: function (data) {
                    return baasicApp.articleModule.comments.unspam(data);
                },
                /**
                 * Returns a promise that is resolved once the update article comment action has been performed; this action updates an article comment resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.updateParams(articleComment);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method
                 * @example 	
                 // articleComment is a resource previously fetched using get action.
                 baasicArticleCommentsService.update(articleComment)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.articleModule.comments.update(data);
                },
                /**
                 * Provides direct access to `baasicArticleCommentsRouteService`.
                 * @method        
                 * @example baasicArticleCommentsService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.articleModule.comments.routeDefinition
            };
        }]);
    }(angular, module));

    /**
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicArticleFilesService
     * @description Baasic Files Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Files Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicArticleFilesService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of file resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicArticleFilesService.find({
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
                    return baasicApp.articleModule.files.find(options);
                },

                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns requested file resource.
                 * @method        
                 * @example 
                 baasicArticleFilesService.get('<file-id>')
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.articleModule.files.get(id, options);
                },

                /**
                 * Returns a promise that is resolved once the unlink action has been performed. This action will remove one or many file resources from the system if successfully completed. Specified file and all its accompanying derived resources will be removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply baasicArticleFilesRouteService route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(fileEntry);
                 var uri = params['model'].links('unlink').href;
                 ```
                 * @method        
                 * @example 
                 // fileEntry is a file resource previously fetched using get action. The following action will remove the original file resource and all accompanying derived file resources.
                 baasicArticleFilesRouteService.remove(fileEntry)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                unlink: function (data, options) {
                    return baasicApp.articleModule.files.unlink(data, options);
                },

                /**
                 * Returns a promise that is resolved once the update file action has been performed; this action will update a file resource if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleFilesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.updateParams(fileEntry);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // fileEntry is a file resource previously fetched using get action.
                 fileEntry.description = '<description>';
                 baasicArticleFilesService.update(fileEntry)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.articleModule.files.update(data);
                },

                /**
                 * Returns a promise that is resolved once the link action has been performed; this action links file resource from other modules into the Article Files module (For example: file resources from the Media Vault module can be linked directly into the Article Files module).
                 * @method        
                 * @example 
                 baasicArticleFilesService.link(fileObject)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                link: function (data) {
                    return baasicApp.articleModule.files.link(data);
                },

                streams: {
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns the file stream if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will return a stream of the derived resource. Otherwise, stream of the original file resource will be retrieved.
                     * @method streams.get        
                     * @example 
                     // Request the original file stream
                     baasicArticleFilesService.stream.get({id: '<file-id>'})
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     // Request derived file stream
                     baasicArticleFilesService.stream.get({id: '<file-id>', width: <width>, height: <height>})
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (data) {
                        return baasicApp.articleModule.files.streams.get(data);
                    },

                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns the file stream as a blob. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will return a blob of the derived file resource. Otherwise, blob of the original file resource will be retrieved. For more information on Blob objects please see [Blob Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
                     * @method streams.getBlob        
                     * @example 
                     // Request the original blob
                     baasicArticleFilesService.stream.getBlob('<file-id>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     // Request derived blob
                     baasicArticleFilesService.stream.getBlob({id: '<file-id>', width: <width>, height: <height>})
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    getBlob: function (data) {
                        return baasicApp.articleModule.files.streams.getBlob(data);
                    },

                    /**
                     * Returns a promise that is resolved once the update file stream action has been performed; this action will replace the existing stream with a new one. Alternatively, if a derived stream is being updated it will either create a new derived stream or replace the existing one. In order to update a derived stream, format needs to be passed (For example: `width` and `height` for the image type of file stream data type).
                     * @method streams.update
                     * @example
                     // Update original file stream
                     baasicArticleFilesService.streams.update('<file-id>', <file-stream>)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     // Update derived file stream
                     baasicArticleFilesService.streams.update({id: '<file-id>', width: <width>, height: <height>}, <file-stream>)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data, stream) {
                        return baasicApp.articleModule.files.streams.update(data, stream);
                    },

                    /**
                     * Returns a promise that is resolved once the create file stream action has been performed; this action will upload the specified blob. For more information on Blob objects please see [Blob Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
                     * @method streams.create
                     * @example 
                     baasicArticleFilesService.streams.create('<file-id>', <blob>)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data, stream) {
                        return baasicApp.articleModule.files.streams.create(data, stream);
                    },
                    routeService: baasicApp.articleModule.files.streams.routeDefinition
                },

                batch: {
                    /**
                     * Returns a promise that is resolved once the unlink action has been performed. This action will remove file resources from the system if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will remove just derived resource. Otherwise, specified file and all its accompanying derived resources will be removed from the system.
                     * @method batch.unlink       
                     * @example
                     // Remove original file resources
                     baasicArticleFilesService.batch.unlink([{ id: '<file-id>' }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     // Remove derived file resources
                     baasicArticleFilesService.batch.unlink([{ id: '<file-id>', fileFormat: { width: <width>, height: <height> } }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    unlink: function (data) {
                        return baasicApp.articleModule.files.batch.unlink(data);
                    },
                    /**
                     * Returns a promise that is resolved once the update action has been performed; this action updates specified file resources.
                     * @method batch.update       
                     * @example 
                     baasicArticleFilesService.batch.update(files)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApp.articleModule.files.batch.update(data);
                    },

                    /**
                     * Returns a promise that is resolved once the link action has been performed; this action links file resources from other modules into the Files module (For example: file resources from the Media Vault module can be linked directly into the Files module).
                     * @method batch.link       
                     * @example 
                     baasicArticleFilesService.batch.link(files)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    link: function (data) {
                        return baasicApp.articleModule.files.batch.link(data);
                    }
                }
            };
        }]);
    }(angular, module));

    /**
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicArticleRatingsService
     * @description Baasic Article Ratings Service provides an easy way to consume Baasic Article Ratings REST API end-points. `baasicArticleRatingsService` functions enable performing standard CRUD operations directly on article rating resources, whereas the `baasicArticleService` functions allow management between article and article rating. In order to obtain needed routes `baasicArticleRatingsService` uses `baasicArticleRatingsRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicArticleRatingsService', ['baasicApp', function (baasicApps) {
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
                 * @example baasicArticleRatingsService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.articleModule.ratings.routeDefinition
            };
        }]);
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
    /* globals module */
    /**
     * @module baasicArticleService
     * @description Baasic Articles Service provides an easy way to consume Baasic Articles REST API end-points. In order to obtain needed routes `baasicArticleService` uses `baasicArticleRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicArticleService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Contains a reference to valid list of article statuses. It returns an object containing all article statuses: `{ draft: 1, published: 2, archive: 4 }`
                 * @method        
                 * @example baasicArticleService.statuses.archive;
                 **/
                statuses: baasicApp.articleModule.articles.statuses,
                /**
                 * Parses article object and updates slug of an article.
                 * @method        
                 * @example baasicArticleService.updateSlug(article);
                 **/
                updateSlug: function (article) {
                    return baasicApp.articleModule.articles.articleUtility.updateSlug(article);
                },
                /**
                 * Generates and returns a valid slug url string.
                 * @method        
                 * @example baasicArticleService.toSlug('<slug>');
                 **/
                toSlug: function (slug) {
                    return baasicApp.articleModule.articles.articleUtility.toSlug(slug);
                },
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicArticleService.find({
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
                    return baasicApp.articleModule.articles.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns a single article resource.
                 * @method        
                 * @example 
                 baasicArticleService.get('<article-id>')
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.articleModule.articles.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the create article action has been performed, this action creates a new article resource.
                 * @method        
                 * @example 
                 baasicArticleService.create({
                 publishDate : new Date(),
                 title : '<title>',
                 content : '<content>',
                 slug : '',
                 status : baasicArticleService.statuses.draft,
                 $tags : ['<tag1>', '<tag2>']
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.articleModule.articles.create(data);
                },
                /**
                 * Returns a promise that is resolved once the update article action has been performed; this action updates an article resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.updateParams(article);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // article is a resource previously fetched using get action.
                 article.title = '<title>';
                 baasicArticleService.update(article)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.articleModule.articles.update(data);
                },
                /**
                 * Returns a promise that is resolved once the saveDraft article action has been performed. This action saves an article with "draft" status. If an article does not exist it will create a new article resource otherwise it will update an existing article resource.
                 * @method        
                 * @example 
                 // article is a resource previously fetched using get action.
                 baasicArticleService.saveDraft(article)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                saveDraft: function (data) {
                    if (angular.isUndefined(data.id)) {
                        //Create new draft
                        return this.create(data);
                    }
                    //Update draft
                    return this.update(data);
                },
                /**
                 * Returns a promise that is resolved once the remove article action has been performed. If the action is successfully completed, the article resource will be permanently removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(article);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // article is a resource previously fetched using get action.
                 baasicArticleService.remove(article)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.articleModule.articles.remove(data);
                },
                /**
                 * Returns a promise that is resolved once the archive article action has been performed. This action sets the status of an article from "published" to "archive". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.updateParams(article);
                 var uri = params['model'].links('archive').href;
                 ```
                 * @method        
                 * @example 	
                 // article is a resource previously fetched using get action.
                 baasicArticleService.archive(article, articleOptions)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                archive: function (data, options) {
                    return baasicApp.articleModule.articles.archive(data, options);
                },
                /**
                 * Returns a promise that is resolved once the restore article action has been performed. This action sets the status of an article from "archive" to "published". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.updateParams(article);
                 var uri = params['model'].links('restore').href;
                 ```
                 * @method        
                 * @example 	
                 // article is a resource previously fetched using get action.
                 baasicArticleService.restore(article)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                restore: function (data) {
                    return baasicApp.articleModule.articles.restore(data);
                },
                /**
                 * Returns a promise that is resolved once the unpublish article action has been performed. This action sets the status of an article from "published" to "draft". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.updateParams(article);
                 var uri = params['model'].links('unpublish').href;
                 ```
                 * @method        
                 * @example 	
                 // article is a resource previously fetched using get action.
                 baasicArticleService.unpublish(article)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                unpublish: function (data) {
                    return baasicApp.articleModule.articles.unpublish(data);
                },
                /**
                 * Returns a promise that is resolved once the publish article action has been performed. This action sets the status of an article from "draft" to "published".
                 * @method        
                 * @example 	 
                 baasicArticleService.publish(article, articleOptions)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                publish: function (article, articleOptions) {
                    return baasicApp.articleModule.articles.publish(article, articleOptions);
                },
                /**
                 * Returns a promise that is resolved once the purge articles action has been performed. Please note that all article resources will be deleted from the system once the action is successfully completed and therefore it can only be executed by user assigned to account owner role. 
                 * @method        
                 * @example 	 
                 baasicArticleService.purge({})
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                purge: function (options) {
                    return baasicApp.articleModule.articles.purge(options);
                },
                subscriptions: {
                    articleModule: {
                        /**
                         * Returns a promise that is resolved once the subscribe action has been performed. This action subscribes an user to the article module.
                         * @method subscriptions.articleModule.subscribe
                         * @example 
                         baasicArticleService.subscriptions.articleModule.subscribe(data)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        subscribe: function (data) {
                            return baasicApp.articleModule.subscriptions.subscribe(data);
                        },
                        /**
                         * Returns a promise that is resolved once the isSubscribed action has been performed. This action checks if a user is subscribed to the article module.
                         * @method subscriptions.articleModule.isSubscribed
                         * @example 
                         baasicArticleService.subscriptions.articleModule.isSubscribed(data)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        isSubscribed: function (data) {
                            return baasicApp.articleModule.subscriptions.isSubscribed(data);
                        },
                        /**
                         * Returns a promise that is resolved once the unSubscribe action has been performed. This action unsubscribes a user from the article module.
                         * @method subscriptions.articleModule.unSubscribe
                         * @example 
                         baasicArticleService.subscriptions.articleModule.unSubscribe(data)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        unSubscribe: function (data) {
                            return baasicApp.articleModule.subscriptions.unSubscribe(data);
                        }
                    },
                    article: {
                        /**
                         * Returns a promise that is resolved once the subscribe action has been performed. This action subscribes an user to the specified article.
                         * @method subscriptions.article.subscribe
                         * @example 
                         baasicArticleService.subscriptions.article.subscribe(article, user)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        subscribe: function (article, data) {
                            return baasicApp.articleModule.articles.subscriptions.subscribe(article, data);
                        },
                        /**
                         * Returns a promise that is resolved once the isSubscribed action has been performed. This action checks if a user is subscribed to the specified article.
                         * @method subscriptions.article.isSubscribed
                         * @example 
                         baasicArticleService.subscriptions.article.isSubscribed(article, user)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        isSubscribed: function (article, data) {
                            return baasicApp.articleModule.articles.subscriptions.isSubscribed(article, data);
                        },
                        /**
                         * Returns a promise that is resolved once the unSubscribe action has been performed. This action unsubscribes a user from the specified article.
                         * @method subscriptions.article.unSubscribe
                         * @example 
                         baasicArticleService.subscriptions.article.unSubscribe(article, user)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        unSubscribe: function (article, data) {
                            return baasicApp.articleModule.articles.subscriptions.unSubscribe(article, data);
                        }
                    },
                    commentReported: {
                        /**
                         * Returns a promise that is resolved once the subscribe action has been performed.
                         * @method subscriptions.commentReported.subscribe
                         * @example 
                         baasicArticleService.subscriptions.commentReported.subscribe(data)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        subscribe: function (data) {
                            return baasicApp.articleModule.articles.subscriptions.commentReported.subscribe(data);
                        },
                        /**
                         * Returns a promise that is resolved once the isSubscribed action has been performed. 
                         * @method subscriptions.commentReported.isSubscribed
                         * @example 
                         baasicArticleService.subscriptions.commentReported.isSubscribed(data)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        isSubscribed: function (data) {
                            return baasicApp.articleModule.articles.subscriptions.commentReported.isSubscribed(data);
                        },
                        /**
                         * Returns a promise that is commentReported once the unSubscribe action has been performed.
                         * @method subscriptions.commentReported.unSubscribe
                         * @example 
                         baasicArticleService.subscriptions.commentReported.unSubscribe(data)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        unSubscribe: function (data) {
                            return baasicApp.articleModule.articles.subscriptions.commentReported.unSubscribe(data);
                        }
                    },
                    commentRequiresModeration: {
                        /**
                         * Returns a promise that is resolved once the subscribe action has been performed.
                         * @method subscriptions.commentRequiresModeration.subscribe
                         * @example 
                         baasicArticleService.subscriptions.commentRequiresModeration.subscribe(data)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        subscribe: function (data) {
                            return baasicApp.articleModule.articles.subscriptions.commentRequiresModeration.subscribe(data);
                        },
                        /**
                         * Returns a promise that is resolved once the isSubscribed action has been performed. 
                         * @method subscriptions.commentRequiresModeration.isSubscribed
                         * @example 
                         baasicArticleService.subscriptions.commentRequiresModeration.isSubscribed(data)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        isSubscribed: function (data) {
                            return baasicApp.articleModule.articles.subscriptions.commentRequiresModeration.isSubscribed(data);
                        },
                        /**
                         * Returns a promise that is commentReported once the unSubscribe action has been performed.
                         * @method subscriptions.commentRequiresModeration.unSubscribe
                         * @example 
                         baasicArticleService.subscriptions.commentRequiresModeration.unSubscribe(data)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        unSubscribe: function (data) {
                            return baasicApp.articleModule.articles.subscriptions.commentRequiresModeration.unSubscribe(data);
                        }
                    }
                },
                ratings: {
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns the specified article rating resource.
                     * @method ratings.get       
                     * @example 
                     baasicArticleService.ratings.get('<article-id>', '<rating-id>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (articleId, ratingId, options) {
                        return baasicApp.articleModule.articles.ratings.get(articleId, ratingId, options);
                    },
                    /**
                     * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article rating resources for a specified article.
                     * @method ratings.find    
                     * @example 
                     baasicArticleService.ratings.find('<article-id>')
                     .success(function (collection) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    find: function (articleId, options) {
                        return baasicApp.articleModule.articles.ratings.find(articleId, options);
                    },
                    /**
                     * Returns a promise that is resolved once the findByUsername action has been performed. Success response returns a list of article rating resources filtered by username and article identifier.
                     * @method ratings.findByUsername    
                     * @example 
                     baasicArticleService.ratings.findByUsername('<article-id>', '<username>')
                     .success(function (collection) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    findByUsername: function (articleId, username, options) {
                        return baasicApp.articleModule.articles.ratings.findByUser(articleId, username, options);
                    },
                    /**
                     * Returns a promise that is resolved once the create article rating action has been performed; this action creates a new rating for an article.
                     * @method  ratings.create      
                     * @example 
                     baasicArticleService.ratings.create({
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
                        return baasicApp.articleModule.articles.ratings.create(data);
                    },
                    /**
                     * Returns a promise that is resolved once the update article rating action has been performed; this action updates a rating of an article.
                     * @method ratings.update       
                     * @example 
                     // article is a resource previously fetched using get action.
                     article.rating = 4;
                     baasicArticleService.update(article)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApp.articleModule.articles.ratings.update(data);
                    },
                    /**
                     * Returns a promise that is resolved once the remove article rating action has been performed. This action will remove a rating from an article if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                     ```
                     var params = baasicApiService.removeParams(articleRating);
                     var uri = params['model'].links('delete').href;
                     ```
                     * @method ratings.remove       
                     * @example 		
                     // articleRating is a resource previously fetched using get action.
                     baasicArticleService.remove(articleRating)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    remove: function (data) {
                        return baasicApp.articleModule.articles.ratings.remove(data);
                    },
                    /**
                     * Returns a promise that is resolved once the removeAll article rating action has been performed. If the action is successfully completed, the article rating resources will be permanently removed from the system for a specified article resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                     ```
                     var params = baasicApiService.removeParams(article);
                     var uri = params['model'].links('delete-ratings-by-article').href;
                     ```
                     * @method ratings.removeAll
                     * @example 	
                     // article is a resource previously fetched using get action.
                     baasicArticleService.removeAll(article)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    removeAll: function (data) {
                        return baasicApp.articleModule.articles.ratings.removeAll(data);
                    }
                },
                tags: {
                    /**
                     * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article tag resources matching the given criteria.
                     * @method tags.find    
                     * @example 
                     baasicArticleService.tags.find('<article-id>')
                     .success(function (collection) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    find: function (articleId, options) {
                        return baasicApp.articleModule.articles.tags.find(articleId, options);
                    },
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns the specified article tag resource.
                     * @method tags.get       
                     * @example 
                     baasicArticleService.tags.get('<article-id>', '<tag>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (articleId, id, options) {
                        return baasicApp.articleModule.articles.tags.get(articleId, id, options);
                    },
                    /**
                     * Returns a promise that is resolved once the create article tag action has been performed; this action creates a new tag for an article.
                     * @method tags.create      
                     * @example 
                     baasicArticleService.tags.create({
                     articleId : '<article-id>',
                     tag : {
                     slug : '<slug>',
                     sortOrder : 1,
                     tag : '<tag>'
                     }
                     })
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data) {
                        return baasicApp.articleModule.articles.tags.create(data);
                    },
                    /**
                     * Returns a promise that is resolved once the remove article tag action has been performed. This action will remove a tag from an article if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                     ```
                     var params = baasicApiService.removeParams(articleTag);
                     var uri = params['model'].links('delete').href;
                     ```
                     * @method tags.remove       
                     * @example 
                     // articleTag is a resource previously fetched using get action.
                     baasicArticleService.tags.remove(articleTag)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    remove: function (data) {
                        return baasicApp.articleModule.articles.tags.remove(data);
                    },
                    /**
                     * Returns a promise that is resolved once the removeAll article tag action has been performed. This action will remove all tags from an article if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                     ```
                     var params = baasicApiService.removeParams(article);
                     var uri = params['model'].links('delete-tags-by-article').href;
                     ```
                     * @method tags.removeAll
                     * @example 		
                     // article is a resource previously fetched using get action.
                     baasicArticleService.tags.removeAll(article)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    removeAll: function (data) {
                        return baasicApp.articleModule.articles.tags.removeAll(data);
                    }
                },
                comments: {
                    /**
                     * Contains a reference to valid list of article comment states. It returns an object containing all article comment states.
                     * @method comments.statuses      
                     * @example baasicArticleService.comments.statuses.approved;
                     **/
                    statuses: baasicApp.articleModule.articles.comments.statuses,
                    /**
                     * Returns a promise that is resolved once the approve article comment action has been performed. This action sets the state of an article comment to "approved". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                     ```
                     var params = baasicApiService.updateParams(articleComment);
                     var uri = params['model'].links('comment-approve').href;
                     ```
                     * @method comments.approve       
                     * @example 	
                     // articleComment is a resource previously fetched using get action.
                     baasicArticleService.comments.approve(articleComment, commentOptions)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    approve: function (data, options) {
                        return baasicApp.articleModule.articles.comments.approve(data, options);
                    },
                    /**
                     * Returns a promise that is resolved once the unapprove article comment action has been performed. This action sets the state of an article comment to "unapproved". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                     ```
                     var params = baasicApiService.updateParams(articleComment);
                     var uri = params['model'].links('comment-unapprove').href;
                     ```
                     * @method comments.unapprove       
                     * @example 	
                     // articleComment is a resource previously fetched using get action.
                     baasicArticleService.comments.unapprove(articleComment, commentOptions)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    unapprove: function (data) {
                        return baasicApp.articleModule.articles.comments.unapprove(data);
                    },
                    /**
                     * Returns a promise that is resolved once the create article comment action has been performed; this action creates a new comment for an article.
                     * @method  comments.create      
                     * @example 
                     baasicArticleService.comments.create({
                     articleId : '<article-id>',
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
                        return baasicApp.articleModule.articles.comments.create(data);
                    },
                    /**
                     * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article comment resources matching the given criteria.
                     * @method comments.find
                     * @example 
                     baasicArticleService.comments.find('<article-id>', {
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
                    find: function (articleId, options) {
                        return baasicApp.articleModule.articles.comments.find(articleId, options);
                    },
                    /**
                     * Returns a promise that is resolved once the flag article comment action has been performed. This action sets the state of an article comment to "flagged". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                     ```
                     var params = baasicApiService.updateParams(articleComment);
                     var uri = params['model'].links('comment-flag').href;
                     ```
                     * @method comments.flag       
                     * @example 	
                     // articleComment is a resource previously fetched using get action.
                     baasicArticleService.comments.flag(articleComment)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    flag: function (data) {
                        return baasicApp.articleModule.articles.comments.flag(data);
                    },
                    /**
                     * Returns a promise that is resolved once the unflag article comment action has been performed. This action removes the "flagged" comment state. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                     ```
                     var params = baasicApiService.updateParams(articleComment);
                     var uri = params['model'].links('comment-unflag').href;
                     ```
                     * @method comments.unflag       
                     * @example 	
                     // articleComment is a resource previously fetched using get action.
                     baasicArticleService.comments.unflag(articleComment)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    unflag: function (data) {
                        return baasicApp.articleModule.articles.comments.unflag(data);
                    },
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns the specified article comment resource.
                     * @method comments.get       
                     * @example 
                     baasicArticleService.comments.get('<article-id>', '<comment-id>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (articleId, commentId, options) {
                        return baasicApp.articleModule.articles.comments.get(articleId, commentId, options);
                    },
                    /**
                     * Returns a promise that is resolved once the remove article comment action has been performed. If the action is successfully completed, the article comment resource and its replies will be permanently removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                     ```
                     var params = baasicApiService.removeParams(articleComment);
                     var uri = params['model'].links('delete').href;
                     ```
                     * @method comments.remove   
                     * @example 
                     // articleComment is a resource previously fetched using get action.
                     baasicArticleService.comments.remove(articleComment)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    remove: function (data) {
                        return baasicApp.articleModule.articles.comments.remove(data);
                    },
                    /**
                     * Returns a promise that is resolved once the removeAll article comment action has been performed. This action will remove all comments and comment replies from an article if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                     ```
                     var params = baasicApiService.removeParams(articleComment);
                     var uri = params['model'].links('delete-comments-by-article').href;
                     ```
                     * @method comments.removeAll
                     * @example 		
                     // articleComment is a resource previously fetched using get action.
                     baasicArticleService.comments.removeAll(articleComment)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    removeAll: function (data) {
                        return baasicApp.articleModule.articles.comments.removeAll(data);
                    },
                    /**
                     * Returns a promise that is resolved once the report article comment action has been performed. This action sets the state of an article comment to "reported". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                     ```
                     var params = baasicApiService.updateParams(articleComment);
                     var uri = params['model'].links('comment-report').href;
                     ```
                     * @method comments.report      
                     * @example 	
                     // articleComment is a resource previously fetched using get action.
                     baasicArticleService.comments.report(articleComment, commentOptions)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    report: function (data, options) {
                        return baasicApp.articleModule.articles.comments.report(data, options);
                    },
                    /**
                     * Returns a promise that is resolved once the unreport article comment action has been performed. This action removes the "reported" comment state. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                     ```
                     var params = baasicApiService.updateParams(articleComment);
                     var uri = params['model'].links('comment-unreport').href;
                     ```
                     * @method comments.unreport     
                     * @example 	
                     // articleComment is a resource previously fetched using get action.
                     baasicArticleService.comments.unreport(articleComment, commentOptions)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    unreport: function (data) {
                        return baasicApp.articleModule.articles.comments.unreport(data);
                    },
                    /**
                     * Returns a promise that is resolved once the mark as spam article comment action has been performed. This action sets the state of an article comment to "spam". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                     ```
                     var params = baasicApiService.updateParams(articleComment);
                     var uri = params['model'].links('comment-spam').href;
                     ```
                     * @method comments.spam       
                     * @example 	
                     // articleComment is a resource previously fetched using get action.
                     baasicArticleService.comments.spam(articleComment)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    spam: function (data) {
                        return baasicApp.articleModule.articles.comments.spam(data);
                    },
                    /**
                     * Returns a promise that is resolved once the unspam article comment action has been performed. This action removes the "spam" comment state. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                     ```
                     var params = baasicApiService.updateParams(articleComment);
                     var uri = params['model'].links('comment-unspam').href;
                     ```
                     * @method comments.unspam       
                     * @example 	
                     // articleComment is a resource previously fetched using get action.
                     baasicArticleService.comments.unspam(articleComment)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    unspam: function (data) {
                        return baasicApp.articleModule.articles.comments.unspam(data);
                    },
                    /**
                     * Returns a promise that is resolved once the update article comment action has been performed; this action updates an article comment resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                     ```
                     var params = baasicApiService.updateParams(articleComment);
                     var uri = params['model'].links('put').href;
                     ```
                     * @method comments.update
                     * @example 	
                     // articleComment is a resource previously fetched using get action.
                     baasicArticleService.comments.update(articleComment)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApp.articleModule.articles.comments.update(data);
                    },
                    replies: {
                        /**
                         * Contains a reference to valid list of article comment reply states. It returns an object containing all article comment reply states.
                         * @method comments.replies.statuses    
                         * @example baasicArticleService.comments.replies.statuses.approved;
                         **/
                        statuses: baasicApp.articleModule.articles.comments.statuses,
                        /**
                         * Returns a promise that is resolved once the approve article comment reply action has been performed. This action sets the state of an article comment reply to "approved". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                         ```
                         var params = baasicApiService.updateParams(articleCommentReply);
                         var uri = params['model'].links('comment-approve').href;
                         ```
                         * @method comments.replies.approve       
                         * @example 	
                         // articleCommentReply is a resource previously fetched using get action.
                         baasicArticleService.comments.replies.approve(articleCommentReply, commentOptions)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        approve: function (data, options) {
                            return baasicApp.articleModule.articles.comments.replies.approve(data, options);
                        },
                        /**
                         * Returns a promise that is resolved once the unapprove article comment reply action has been performed. This action sets the state of an article comment reply to "unapproved". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                         ```
                         var params = baasicApiService.updateParams(articleCommentReply);
                         var uri = params['model'].links('comment-unapprove').href;
                         ```
                         * @method comments.replies.unapprove       
                         * @example 	
                         // articleCommentReply is a resource previously fetched using get action.
                         baasicArticleService.comments.replies.unapprove(articleCommentReply, commentOptions)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        unapprove: function (data) {
                            return baasicApp.articleModule.articles.comments.replies.unapprove(data);
                        },
                        /**
                         * Returns a promise that is resolved once the create article comment reply action has been performed; this action creates a new comment reply for an article.
                         * @method  comments.replies.create      
                         * @example 
                         baasicArticleService.comments.replies.create('<article-id>', {
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
                        create: function (articleId, data) {
                            return baasicApp.articleModule.articles.comments.replies.create(data);
                        },
                        /**
                         * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article comment reply resources matching the given criteria.
                         * @method comments.replies.find
                         * @example 
                         baasicArticleService.comments.replies.find('<article-id>, <comment-id>', {
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
                        find: function (articleId, commentId, options) {
                            return baasicApp.articleModule.articles.comments.replies.find(articleId, commentId, options);
                        },
                        /**
                         * Returns a promise that is resolved once the flag article comment reply action has been performed. This action sets the state of an article comment reply to "flagged". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                         ```
                         var params = baasicApiService.updateParams(articleCommentReply);
                         var uri = params['model'].links('comment-flag').href;
                         ```
                         * @method comments.replies.flag       
                         * @example 	
                         // articleCommentReply is a resource previously fetched using get action.
                         baasicArticleService.comments.replies.flag(articleCommentReply)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        flag: function (data) {
                            return baasicApp.articleModule.articles.comments.replies.flag(data);
                        },
                        /**
                         * Returns a promise that is resolved once the unflag article comment reply action has been performed. This action removes the "flagged" comment reply state. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                         ```
                         var params = baasicApiService.updateParams(articleCommentReply);
                         var uri = params['model'].links('comment-unflag').href;
                         ```
                         * @method comments.replies.unflag       
                         * @example 	
                         // articleCommentReply is a resource previously fetched using get action.
                         baasicArticleService.comments.replies.unflag(articleCommentReply)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        unflag: function (data) {
                            return baasicApp.articleModule.articles.comments.replies.unflag(data);
                        },
                        /**
                         * Returns a promise that is resolved once the get action has been performed. Success response returns the specified article comment reply resource.
                         * @method comments.replies.get       
                         * @example 
                         baasicArticleService.comments.replies.get('<article-id>', '<comment-id>', '<comment-reply-id>')
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        get: function (articleId, commentId, replyId, options) {
                            return baasicApp.articleModule.articles.comments.replies.get(articleId, commentId, replyId, options);
                        },
                        /**
                         * Returns a promise that is resolved once the remove article comment reply action has been performed. If the action is successfully completed, the article comment reply resource will be permanently removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                         ```
                         var params = baasicApiService.removeParams(articleCommentReply);
                         var uri = params['model'].links('delete').href;
                         ```
                         * @method comments.replies.remove  
                         * @example 
                         // articleCommentReply is a resource previously fetched using get action.
                         baasicArticleService.comments.replies.remove(articleCommentReply)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        remove: function (data) {
                            return baasicApp.articleModule.articles.comments.replies.remove(data);
                        },
                        /**
                         * Returns a promise that is resolved once the removeAll article comment reply action has been performed. This action will remove all comment replies from an article comment if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                         ```
                         var params = baasicApiService.removeParams(articleCommentReply);
                         var uri = params['model'].links('delete-comments-by-article').href;
                         ```
                         * @method comments.replies.removeAll
                         * @example 		
                         // articleCommentReply is a resource previously fetched using get action.
                         baasicArticleService.comments.replies.removeAll(articleCommentReply)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        removeAll: function (data) {
                            return baasicApp.articleModule.articles.comments.replies.removeAll(data);
                        },
                        /**
                         * Returns a promise that is resolved once the report article comment reply action has been performed. This action sets the state of an article comment reply to "reported". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                         ```
                         var params = baasicApiService.updateParams(articleCommentReply);
                         var uri = params['model'].links('comment-report').href;
                         ```
                         * @method comments.replies.report       
                         * @example 	
                         // articleCommentReply is a resource previously fetched using get action.
                         baasicArticleService.comments.replies.report(articleCommentReply, commentOptions)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        report: function (data, options) {
                            return baasicApp.articleModule.articles.comments.replies.report(data, options);
                        },
                        /**
                         * Returns a promise that is resolved once the unreport article comment reply action has been performed. This action removes the "reported" comment reply state. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                         ```
                         var params = baasicApiService.updateParams(articleCommentReply);
                         var uri = params['model'].links('comment-unreport').href;
                         ```
                         * @method comments.replies.unreport       
                         * @example 	
                         // articleCommentReply is a resource previously fetched using get action.
                         baasicArticleService.comments.replies.unreport(articleCommentReply, commentOptions)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        unreport: function (data) {
                            return baasicApp.articleModule.articles.comments.replies.unreport(data);
                        },
                        /**
                         * Returns a promise that is resolved once the mark as spam article comment reply action has been performed. This action sets the state of an article comment reply to "spam". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                         ```
                         var params = baasicApiService.updateParams(articleCommentReply);
                         var uri = params['model'].links('comment-spam').href;
                         ```
                         * @method comments.replies.spam       
                         * @example 	
                         // articleCommentReply is a resource previously fetched using get action.
                         baasicArticleService.comments.replies.spam(articleCommentReply)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        spam: function (data) {
                            return baasicApp.articleModule.articles.comments.replies.spam(data);
                        },
                        /**
                         * Returns a promise that is resolved once the unspam article comment reply action has been performed. This action removes the "spam" comment reply state. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                         ```
                         var params = baasicApiService.updateParams(articleCommentReply);
                         var uri = params['model'].links('comment-unspam').href;
                         ```
                         * @method comments.replies.unspam       
                         * @example 	
                         // articleCommentReply is a resource previously fetched using get action.
                         baasicArticleService.comments.replies.unspam(articleCommentReply)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        unspam: function (data) {
                            return baasicApp.articleModule.articles.comments.replies.unspam(data);
                        },
                        /**
                         * Returns a promise that is resolved once the update article comment reply action has been performed; this action updates an article comment reply resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                         ```
                         var params = baasicApiService.updateParams(articleCommentReply);
                         var uri = params['model'].links('put').href;
                         ```
                         * @method comments.replies.update       
                         * @example 	
                         // articleCommentReply is a resource previously fetched using get action.
                         baasicArticleService.comments.replies.update(articleCommentReply)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        update: function (data) {
                            return baasicApp.articleModule.articles.comments.replies.update(data);
                        }
                    }
                },
                files: {
                    /**
                     * Returns a promise that is resolved once the find action has been performed. Success response returns a list of file resources matching the given criteria.
                     * @method files.find   
                     * @example 
                     baasicArticleService.files.find('<article-id>', {
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
                    find: function (articleId, options) {
                        return baasicApp.articleModule.articles.files.find(articleId, options);
                    },

                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns requested file resource.
                     * @method files.get     
                     * @example 
                     baasicArticleService.files.get('<article-id>', '<file-id>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (articleId, id, options) {
                        return baasicApp.articleModule.articles.files.get(articleId, id, options);
                    },

                    /**
                     * Returns a promise that is resolved once the unlink action has been performed. This action will remove one or many file resources from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply baasicArticleService route template. Here is an example of how a route can be obtained from HAL enabled objects:
                     ```
                     var params = baasicApiService.removeParams(fileEntry);
                     var uri = params['model'].links('unlink').href;
                     ```
                     * @method files.unlink     
                     * @example 
                     // fileEntry is a file resource previously fetched using get action. The following action will remove the original file resource and all accompanying derived file resources.
                     baasicArticleService.files.unlink(fileEntry)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    unlink: function (articleId, data, options) {
                        return baasicApp.articleModule.articles.files.unlink(articleId, data, options);
                    },

                    /**
                     * Returns a promise that is resolved once the unlink by article action has been performed. This action will remove all file resources from the system related to the requested article if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply baasicArticleService route template. Here is an example of how a route can be obtained from HAL enabled objects:
                     ```
                     var params = baasicApiService.removeParams(fileEntry);
                     var uri = params['model'].links('unlink-by-article').href;
                     ```
                     * @method files.unlinkByArticle     
                     * @example 
                     // fileEntry is a file resource previously fetched using get action.
                     baasicArticleService.files.unlinkByArticle(fileEntry)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    unlinkByArticle: function (articleId, data, options) {
                        return baasicApp.articleModule.articles.files.unlinkByArticle(articleId, data, options);
                    },

                    /**
                     * Returns a promise that is resolved once the update file action has been performed; this action will update a file resource if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                     ```
                     var params = baasicApiService.updateParams(fileEntry);
                     var uri = params['model'].links('put').href;
                     ```
                     * @method files.update      
                     * @example 
                     // fileEntry is a file resource previously fetched using get action.
                     fileEntry.description = '<description>';
                     baasicArticleService.files.update(fileEntry)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (articleId, data) {
                        return baasicApp.articleModule.articles.files.update(articleId, data);
                    },

                    /**
                     * Returns a promise that is resolved once the link action has been performed; this action links file resource from other modules into the Article Files module (For example: file resources from the Media Vault module can be linked directly into the Article Files module).
                     * @method files.link   
                     * @example 
                     baasicArticleService.files.link(fileObject)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    link: function (articleId, data) {
                        return baasicApp.articleModule.articles.files.link(articleId, data);
                    },

                    streams: {
                        /**
                         * Returns a promise that is resolved once the get action has been performed. Success response returns the file stream if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will return a stream of the derived resource. Otherwise, stream of the original file resource will be retrieved.
                         * @method files.streams.get        
                         * @example 
                         // Request the original file stream
                         baasicArticleService.files.streams.get({id: '<file-id>'})
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         // Request derived file stream
                         baasicArticleService.files.streams.get({id: '<file-id>', width: <width>, height: <height>})
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        get: function (articleId, data) {
                            return baasicApp.articleModule.articles.files.streams.get(articleId, data);
                        },

                        /**
                         * Returns a promise that is resolved once the get action has been performed. Success response returns the file stream as a blob. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will return a blob of the derived file resource. Otherwise, blob of the original file resource will be retrieved. For more information on Blob objects please see [Blob Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
                         * @method files.streams.getBlob        
                         * @example 
                         // Request the original blob
                         baasicArticleService.files.streams.getBlob('<article-id>', '<file-id>')
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         // Request derived blob
                         baasicArticleService.files.streams.getBlob('<article-id>', {id: '<file-id>', width: <width>, height: <height>})
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        getBlob: function (articleId, data) {
                            return baasicApp.articleModule.articles.files.streams.getBlob(articleId, data);
                        },

                        /**
                         * Returns a promise that is resolved once the update file stream action has been performed; this action will replace the existing stream with a new one. Alternatively, if a derived stream is being updated it will either create a new derived stream or replace the existing one. In order to update a derived stream, format needs to be passed (For example: `width` and `height` for the image type of file stream data type).
                         * @method files.streams.update
                         * @example
                         // Update original file stream
                         baasicArticleService.files.streams.update('<article-id>', '<file-id>', <file-stream>)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         // Update derived file stream
                         baasicArticleService.files.streams.update('<article-id>', {id: '<file-id>', width: <width>, height: <height>}, <file-stream>)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        update: function (articleId, data, stream) {
                            return baasicApp.articleModule.articles.files.streams.update(articleId, data, stream);
                        },

                        /**
                         * Returns a promise that is resolved once the create file stream action has been performed; this action will upload the specified blob. For more information on Blob objects please see [Blob Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
                         * @method files.streams.create
                         * @example 
                         baasicArticleService.files.streams.create('<article-id>', '<filename>', <blob>)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        create: function (articleId, data, stream) {
                            return baasicApp.articleModule.articles.files.streams.create(articleId, data, stream);
                        }
                    },

                    batch: {
                        /**
                         * Returns a promise that is resolved once the unlink action has been performed. This action will remove file resources from the system if successfully completed. Specified file and all its accompanying derived resources will be removed from the system.
                         * @method files.batch.unlink       
                         * @example
                         // Remove original file resources
                         baasicArticleService.files.batch.unlink('<article-id>', [{ id: '<file-id>' }])
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        unlink: function (articleId, data) {
                            return baasicApp.articleModule.articles.files.batch.unlink(articleId, data);
                        },

                        /**
                         * Returns a promise that is resolved once the update action has been performed; this action updates specified file resources.
                         * @method files.batch.update       
                         * @example 
                         baasicArticleService.batch.update('<article-id>', files)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        update: function (articleId, data) {
                            return baasicApp.articleModule.articles.files.batch.update(articleId, data);
                        },
                        /**
                         * Returns a promise that is resolved once the link action has been performed; this action links file resources from other modules into the Article Files module (For example: file resources from the Media Vault module can be linked directly into the Article Files module).
                         * @method files.batch.link       
                         * @example 
                         baasicArticleService.batch.link(files)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         **/
                        link: function (articleId, data) {
                            return baasicApp.articleModule.articles.files.batch.link(articleId, data);
                        }
                    }
                },
                acl: {
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns a list of ACL policies established for the specified article resource.
                     * @method acl.get       
                     * @example 
                     baasicArticleService.acl.get({id: '<article-id>'})
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (options) {
                        return baasicApp.articleModule.articles.acl.get(options);
                    },
                    /**
                     * Returns a promise that is resolved once the update acl action has been performed, this action creates new ACL policy for the specified article resource.
                     * @method acl.update      
                     * @example 
                     var options = {id : '<article-id>'};
                     var aclObj =  {
                     actionId: '<action-id'>,
                     roleId: '<roleId>',
                     userId: '<userId>'
                     };
                     options[baasicConstants.modelPropertyName] = aclObj;
                     baasicArticleService.acl.update(options)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (options) {
                        return baasicApp.articleModule.articles.acl.update(options);
                    },
                    /**
                     * Returns a promise that is resolved once the removeByUser action has been performed. This action deletes ACL policy assigned to the specified user and article resource.
                     * @method acl.deleteByUser      
                     * @example 
                     baasicArticleService.acl.removeByUser('<article-id>', '<access-action>', '<username>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    removeByUser: function (articleId, action, user, data) {
                        return baasicApp.articleModule.articles.acl.removeByUser(articleId, action, user, data);
                    },
                    /**
                     * Returns a promise that is resolved once the removeByRole action has been performed. This action deletes ACL policy assigned to the specified role and article resource.
                     * @method acl.deleteByRole      
                     * @example 
                     baasicArticleService.acl.removeByRole('<article-id>', '<access-action>', '<role-name>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    removeByRole: function (articleId, action, role, data) {
                        return baasicApp.articleModule.articles.acl.removeByRole(articleId, action, role, data);
                    }
                },
                /**
                 * Provides direct access to `baasicArticleRouteService`.
                 * @method        
                 * @example baasicArticleService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.articleModule.articles.routeDefinition
            };
        }]);
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
    /* globals module */
    /**
     * @module baasicArticleSettingsService
     * @description Baasic Article Settings Service provides an easy way to consume Baasic Article Settings REST API end-points. In order to obtain needed routes `baasicArticleSettingsService` uses `baasicArticleSettingsRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicArticleSettingsService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the article settings.
                 * @method        
                 * @example 
                 baasicArticleSettingsService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (options) {
                    return baasicApp.articleModule.settings.get(options);
                },
                /**
                 * Returns a promise that is resolved once the update article settings action has been performed; this action updates article settings. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleSettingsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(articleSettings);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // articleSettings is a resource previously fetched using get action.
                 articleSettings.allowArchive = true;
                 baasicArticleSettingsService.update(articleSettings)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.articleModule.settings.update(data);
                },
                /**
                 * Provides direct access to `baasicArticleSettingsRouteService`.
                 * @method        
                 * @example baasicArticleSettingsService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.articleModule.settings.routeDefinition
            };
        }]);
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
    /* globals module */
    /**
     * @module baasicArticleTagsService
     * @description Baasic Article Tags Service provides an easy way to consume Baasic Article Tags REST API end-points. `baasicArticleTagsService` functions enable performing standard CRUD operations directly on article tag resources, whereas the `baasicArticleService` functions allow management between article and article tag. In order to obtain needed routes `baasicArticleTagsService` uses `baasicArticleTagsRouteService`.
     */

    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicArticleTagsService', ['baasicApp', function (baasicApps) {
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
                 * @example baasicArticleTagsService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.articleModule.tags.routeDefinition,

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
        }]);
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
    /* exported module */
    /** 
     * @description The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism.  An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.commerce` module functionality it must be added as a dependency to your app.
     * @copyright (c) 2017 Mono Ltd
     * @license MIT
     * @author Mono Ltd
     * @module baasic.commerce
     * @example
     (function (Main) {
     'use strict';
     var dependencies = [
     'baasic.api',
     'baasic.membership',
     'baasic.security',
     'baasic.appSettings',
     'baasic.commerce',
     'baasic.dynamicResource',
     'baasic.keyValue',
     'baasic.valueSet'
     ];
     Main.module = angular.module('myApp.Main', dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module('baasic.commerce', ['baasic.api']);

    /* globals module */
    /**
     * @module baasicCommerceCustomerPaymentMethodService
     * @description Baasic Commerce CustomerPaymentMethod Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceCustomerPaymentMethodService` uses `baasicCommerceCustomerPaymentMethodRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceCustomerPaymentMethodService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicCommerceCustomerPaymentMethodService.find({
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
                    return baasicApp.commerceModule.customers.paymentMethods.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                 * @method        
                 * @example 
                 baasicCommerceCustomerPaymentMethodService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.commerceModule.customers.paymentMethods.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the update commerce action has been performed; this action updates a commerce resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceCustomerPaymentMethodRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commerceCustomerPaymentMethod);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // commerceCustomerPaymentMethod is a resource previously fetched using get action.
                 commerceCustomerPaymentMethod.isDefault : true;
                 baasicCommerceCustomerPaymentMethodService.update(commerceCustomerPaymentMethod)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.commerceModule.customers.paymentMethods.update(data);
                },
                /**
                 * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resource.
                 * @method        
                 * @example 
                 baasicCommerceCustomerPaymentMethodService.create({
                 paymentMethodNonce : '<payment-method-nonce>',
                 customerId : '<customer-id>',
                 typeName : '<type-name>'
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.commerceModule.customers.paymentMethods.create(data);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a commerce resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceCustomerPaymentMethodRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commerceCustomerPaymentMethod);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // commerceCustomerPaymentMethod is a resource previously fetched using get action.
                 baasicCommerceCustomerPaymentMethodService.remove(commerceCustomerPaymentMethod)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.commerceModule.customers.paymentMethods.remove(data);
                },
                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceCustomerPaymentMethodService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.commerceModule.customers.paymentMethods.routeDefinition
            };
        }]);
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
    /* globals module */
    /**
     * @module baasicCommerceCustomerService
     * @description Baasic Commerce Customer Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceCustomerService` uses `baasicCommerceCustomerRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceCustomerService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicCommerceCustomerService.find({
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
                    return baasicApp.commerceModule.customers.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                 * @method        
                 * @example 
                 baasicCommerceCustomerService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.commerceModule.customers.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the update commerce action has been performed; this action updates a commerce resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceCustomerRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commerceCustomer);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // commerceCustomer is a resource previously fetched using get action.
                 commerceCustomer.isDefault : true;
                 baasicCommerceCustomerService.update(commerceCustomer)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.commerceModule.customers.update(data);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a commerce resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceCustomerRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commerceCustomer);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // commerceCustomer is a resource previously fetched using get action.
                 baasicCommerceCustomerService.remove(commerceCustomer)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.commerceModule.customers.remove(data);
                },
                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceCustomerService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.commerceModule.customers.routeDefinition
            };
        }]);
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
    /* globals module */
    /**
     * @module baasicCommerceInvoiceService
     * @description Baasic Commerce Invoice Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceInvoiceService` uses `baasicCommerceInvoiceRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceInvoiceService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicCommerceInvoiceService.find({
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
                    return baasicApp.commerceModule.invoices.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                 * @method        
                 * @example 
                 baasicCommerceInvoiceService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.commerceModule.invoices.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the update commerce action has been performed; this action updates a commerce resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceInvoiceRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commerceInvoice);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // commerceInvoice is a resource previously fetched using get action.
                 commerceInvoice.invoiceStatusId : '<new-invoice-status-id>';
                 baasicCommerceInvoiceService.update(commerceInvoice)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.commerceModule.invoices.update(data);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a commerce resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceInvoiceRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commerceInvoice);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // commerceInvoice is a resource previously fetched using get action.
                 baasicCommerceInvoiceService.remove(commerceInvoice)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.commerceModule.invoices.remove(data);
                },

                streams: {
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns the invoice stream if successfully completed.
                     * @method streams.get        
                     * @example 
                     // commerceInvoice is a resource previously fetched using get action.
                     baasicCommerceInvoiceService.stream.get({id: commerceInvoice.id})
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (data) {
                        return baasicApp.commerceModule.invoices.streams.get(data);
                    },

                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns the invoice stream as a blob. For more information on Blob objects please see [Blob Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
                     * @method streams.getBlob        
                     * @example 
                     // Request the original blob
                     baasicCommerceInvoiceService.stream.getBlobl({id: commerceInvoice.id})
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    getBlob: function (data) {
                        return baasicApp.commerceModule.invoices.streams.getBlob(data);
                    }
                },

                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceInvoiceService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.commerceModule.invoices.routeDefinition
            };
        }]);
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
    /* globals module */
    /**
     * @module baasicCommercePaymentTransactionService
     * @description Baasic Commerce PaymentTransaction Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommercePaymentTransactionService` uses `baasicCommercePaymentTransactionRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommercePaymentTransactionService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicCommercePaymentTransactionService.find({
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
                    return baasicApp.commerceModule.paymentTransactions.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                 * @method        
                 * @example 
                 baasicCommercePaymentTransactionService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.commerceModule.paymentTransactions.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the update commerce action has been performed; this action updates a commerce resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommercePaymentTransactionRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commercePaymentTransaction);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // commercePaymentTransaction is a resource previously fetched using get action.
                 commercePaymentTransaction.amount : 100;
                 baasicCommercePaymentTransactionService.update(commercePaymentTransaction)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.commerceModule.paymentTransactions.update(data);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a commerce resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommercePaymentTransactionRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commercePaymentTransaction);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // commercePaymentTransaction is a resource previously fetched using get action.
                 baasicCommercePaymentTransactionService.remove(commercePaymentTransaction)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.commerceModule.paymentTransactions.remove(data);
                },
                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommercePaymentTransactionService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.commerceModule.paymentTransactions.routeDefinition
            };
        }]);
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
    /* globals module */
    /**
     * @module baasicCommerceProductService
     * @description Baasic Commerce Product Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceProductService` uses `baasicCommerceProductRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceProductService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicCommerceProductService.find({
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
                    return baasicApp.commerceModule.products.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                 * @method        
                 * @example 
                 baasicCommerceProductService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.commerceModule.products.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resource.
                 * @method        
                 * @example 
                 baasicCommerceProductService.create({
                 name : '<product-name>',
                 slug : '<slug>',
                 shortDescription : '<short-description>',
                 recurringCyclePeriodTypeId: '<recurring-cycle-period-type-id>'
                 planId : '<plan-id>',
                 price: 100,
                 published: true
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.commerceModule.products.create(data);
                },
                /**
                 * Returns a promise that is resolved once the update commerce action has been performed; this action updates a commerce resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceProductRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commerceProduct);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // commerceProduct is a resource previously fetched using get action.
                 commerceProduct.shortDescription : '<short-description>';
                 baasicCommerceProductService.update(commerceProduct)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.commerceModule.products.update(data);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a commerce resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceProductRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commerceProduct);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // commerceProduct is a resource previously fetched using get action.
                 baasicCommerceProductService.remove(commerceProduct)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.commerceModule.products.remove(data);
                },
                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceProductService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.commerceModule.products.routeDefinition
            };
        }]);
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
    /* globals module */
    /**
     * @module baasicCommerceService
     * @description Baasic Commerce Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceService` uses `baasicCommerceRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicCommerceService.find({
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : '<field>',
                 orderDirection : '<asc|desc>',
                 customerId: '<customer-id>'
                 })
                 .success(function (collection) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                find: function (options) {
                    return baasicApp.commerceModule.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                 * @method        
                 * @example 
                 baasicCommerceService.get('<id>', {})
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.commerceModule.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                 * @method        
                 * @example 
                 baasicCommerceService.validateVAT({ countryCode: 'DE', vatId: 'DE999999999' })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                validateVAT: function (countryCode, vatId) {
                    return baasicApp.commerceModule.validateVAT(countryCode, vatId);
                },
                /**
                 * Returns a promise that is resolved once the subscribe pre-process commerce action has been performed; this action performes pre-subscribe operations such as getting client tokens etc.
                 * @method        
                 * @example 
                 baasicCommerceService.preprocess({
                 systemName : '<system-name>',
                 productId : '<product-id>',
                 customerId: '<id>' 
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                preprocess: function (data) {
                    return baasicApp.commerceModule.preprocess(data);
                },
                /**
                 * Returns a promise that is resolved once the subscribe commerce action has been performed; this action creates a new commerce subscription resource.
                 * @method        
                 * @example 
                 baasicCommerceService.subscribe({
                 systemName : '<system-name>',
                 productId : '<product-id>',
                 customer: {
                 id: '<id>',
                 firstName: '<first-name>',
                 lastName: '<last-name>'
                 }} 
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                subscribe: function (data) {
                    return baasicApp.commerceModule.subscribe(data);
                },
                /**
                 * Returns a promise that is resolved once the cancel subscription action has been performed. This action will remove a commerce subscription resource from the system if successfully completed. This route obtain routes from `baasicCommerceRouteService` route template. Here is an example of how execute this action:
                 * @method        
                 * @example				 
                 baasicCommerceService.cancel({
                 systemName: '<system-name>',
                 id: '<subscription-id>',
                 requestRefund: <true/false>,
                 refundAmount: <refund-amount>
                 }})
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                cancel: function (data) {
                    return baasicApp.commerceModule.cancel(data);
                },
                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.commerceModule.routeDefinition
            };
        }]);
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
    /* globals module */
    /**
     * @module baasicCommerceAddressTypeService
     * @description Baasic Commerce AddressType Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceAddressTypeService` uses `baasicCommerceAddressTypeRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceAddressTypeService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicCommerceAddressTypeService.find({
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
                    return baasicApp.commerceModule.lookups.addressTypes.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                 * @method        
                 * @example 
                 baasicCommerceAddressTypeService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.commerceModule.lookups.addressTypes.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resource.
                 * @method        
                 * @example 
                 baasicCommerceAddressTypeService.create({
                 name : '<name>',
                 abrv: '<abbreviation>',
                 description: '<description>'
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.commerceModule.lookups.addressTypes.create(data);
                },
                /**
                 * Returns a promise that is resolved once the update commerce action has been performed; this action updates a commerce resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceAddressTypeRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commerceAddressType);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // commerceAddressType is a resource previously fetched using get action.
                 commerceAddressType.description = '<description>';
                 baasicCommerceAddressTypeService.update(commerceAddressType)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.commerceModule.lookups.addressTypes.update(data);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a commerce resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceAddressTypeRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commerceAddressType);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // commerceAddressType is a resource previously fetched using get action.
                 baasicCommerceAddressTypeService.remove(commerceAddressType)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.commerceModule.lookups.addressTypes.remove(data);
                },

                batch: {
                    /**
                     * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resources.
                     * @method batch.create        
                     * @example 
                     baasicCommerceAddressTypeService.batch.create([{
                     name : '<name>',
                     abrv: '<abbreviation>',
                     description: '<description>'
                     }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data) {
                        return baasicApp.commerceModule.lookups.addressTypes.batch.create(data);
                    },

                    /**
                     * Returns a promise that is resolved once the remove commerce action has been performed. This action will remove commerce resources from the system if successfully completed. 
                     * @method batch.remove       
                     * @example 			 
                     baasicCommerceAddressTypeService.batch.remove(commerceAddressTypeIds)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });		
                     **/
                    remove: function (ids) {
                        return baasicApp.commerceModule.lookups.addressTypes.batch.remove(ids);
                    },

                    /**
                     * Returns a promise that is resolved once the update commerce action has been performed; this action updates specified commerce resources.
                     * @method batch.update       
                     * @example 
                     baasicCommerceAddressTypeService.batch.update(commerceAddressTypes)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApp.commerceModule.lookups.addressTypes.batch.update(data);
                    }
                },

                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceAddressTypeService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.commerceModule.lookups.addressTypes.routeDefinition
            };
        }]);
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
    /* globals module */
    /**
     * @module baasicCommerceCountryService
     * @description Baasic Commerce Country Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceCountryService` uses `baasicCommerceCountryRouteService`.
     */
    (function (angular, module) {
        'use strict';
        module.service('baasicCommerceCountryService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicCommerceCountryService.find({
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
                    return baasicApp.commerceModule.lookups.countries.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                 * @method        
                 * @example 
                 baasicCommerceCountryService.get('<country-id>')
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.commerceModule.lookups.countries.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resource.
                 * @method        
                 * @example 
                 baasicCommerceCountryService.create({
                 name : '<name>',
                 abrv: '<abbreviation>',
                 description: '<description>'
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.commerceModule.lookups.countries.create(data);
                },
                /**
                 * Returns a promise that is resolved once the update commerce action has been performed; this action updates a commerce resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceCountryRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commerceCountry);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // commerceCountry is a resource previously fetched using get action.
                 commerceCountry.phoneCode = '<phone-code>';
                 baasicCommerceCountryService.update(commerceCountry)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.commerceModule.lookups.countries.update(data);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a commerce resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceCountryRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commerceCountry);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // commerceCountry is a resource previously fetched using get action.
                 baasicCommerceCountryService.remove(commerceCountry)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.commerceModule.lookups.countries.remove(data);
                },

                batch: {

                    /**
                     * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resources.
                     * @method batch.create        
                     * @example 
                     baasicCommerceCountryService.batch.create([{
                     name : '<name>',
                     abrv: '<abbreviation>',
                     description: '<description>'
                     }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data) {
                        return baasicApp.commerceModule.lookups.countries.batch.create(data);
                    },

                    /**
                     * Returns a promise that is resolved once the remove commerce action has been performed. This action will remove commerce resources from the system if successfully completed. 
                     * @method batch.remove       
                     * @example 			 
                     baasicCommerceCountryService.batch.remove(commerceCountryIds)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });		
                     **/
                    remove: function (ids) {
                        return baasicApp.commerceModule.lookups.countries.batch.remove(ids);
                    },

                    /**
                     * Returns a promise that is resolved once the update commerce action has been performed; this action updates specified commerce resources.
                     * @method batch.update       
                     * @example 
                     baasicCommerceCountryService.batch.update(commerceCountries)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApp.commerceModule.lookups.countries.batch.update(data);
                    }
                },

                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceCountryService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.commerceModule.lookups.countries.routeDefinition
            };
        }]);
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
    /* globals module */
    /**
     * @module baasicCommerceCountryStateService
     * @description Baasic Commerce Country State Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceCountryStateService` uses `baasicCommerceCountryStateRouteService`.
     */
    (function (angular, module) {
        'use strict';
        module.service('baasicCommerceCountryStateService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {

                /**
                 * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resource.
                 * @method        
                 * @example 
                 baasicCommerceCountryStateService.create({
                 countryId : '<country-id>',
                 name: '<name>',
                 abrv: '<abrv>',
                 description: '<description>'
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.commerceModule.lookups.countryStates.create(data);
                },

                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicCommerceCountryStateService.find({
                 countryId: '<country-id>'
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
                    return baasicApp.commerceModule.lookups.countryStates.find(options);
                },

                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                 * @method        
                 * @example 
                 baasicCommerceCountryStateService.get('<state-id>')
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.commerceModule.lookups.countryStates.get(id, options);
                },

                /**
                 * Returns a promise that is resolved once the update commerce action has been performed; this action updates a commerce resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceCountryStateRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commerceCountryState);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // commerceCountryState is a resource previously fetched using get action.
                 commerceCountryState.description = '<description>';
                 baasicCommerceCountryStateService.update(commerceCountryState)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.commerceModule.lookups.countryStates.update(data);
                },

                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a commerce resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceCountryStateRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commerceCountryState);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // commerceCountryState is a resource previously fetched using get action.
                 baasicCommerceCountryStateService.remove(commerceCountryState)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.commerceModule.lookups.countryStates.remove(data);
                },

                batch: {

                    /**
                     * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resources.
                     * @method batch.create        
                     * @example 
                     baasicCommerceCountryStateService.batch.create([{
                     countryId: '<country-id>',  
                     name : '<name>',
                     abrv: '<abbreviation>',
                     description: '<description>'
                     }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data) {
                        return baasicApp.commerceModule.lookups.countryStates.batch.create(data);
                    },

                    /**
                     * Returns a promise that is resolved once the remove commerce action has been performed. This action will remove commerce resources from the system if successfully completed. 
                     * @method batch.remove       
                     * @example 			 
                     baasicCommerceCountryStateService.batch.remove(commerceCountryStateIds)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });		
                     **/
                    remove: function (ids) {
                        return baasicApp.commerceModule.lookups.countryStates.batch.remove(ids);
                    },

                    /**
                     * Returns a promise that is resolved once the update commerce action has been performed; this action updates specified commerce resources.
                     * @method batch.update       
                     * @example 
                     baasicCommerceCountryStateService.batch.update(commerceCountryStates)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApp.commerceModule.lookups.countryStates.batch.update(data);
                    }

                },

                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceCountryStateService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.commerceModule.lookups.countryStates.routeDefinition
            };
        }]);
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
    /* globals module */
    /**
     * @module baasicCommerceInvoiceStatusService
     * @description Baasic Commerce Invoice Status Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceInvoiceStatusService` uses `baasicCommerceInvoiceStatusRouteService`.
     */
    (function (angular, module) {
        'use strict';
        module.service('baasicCommerceInvoiceStatusService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resource.
                 * @method        
                 * @example 
                 baasicCommerceInvoiceStatusService.create({
                 name : '<name>',
                 abrv: '<abbreviation>',
                 description: '<description>'
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.commerceModule.lookups.invoiceStatuses.create(data);
                },

                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicCommerceInvoiceStatusService.find({
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
                    return baasicApp.commerceModule.lookups.invoiceStatuses.find(options);
                },

                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                 * @method        
                 * @example 
                 baasicCommerceInvoiceStatusService.get('<invoice-status-id>')
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.commerceModule.lookups.invoiceStatuses.get(id, options);
                },

                /**
                 * Returns a promise that is resolved once the update commerce action has been performed; this action updates a commerce resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceInvoiceStatusRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commerceInvoiceStatus);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // commerceInvoiceStatus is a resource previously fetched using get action.
                 commerceInvoiceStatus.description = '<description>';
                 baasicCommerceInvoiceStatusService.update(commerceInvoiceStatus)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.commerceModule.lookups.invoiceStatuses.update(data);
                },

                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a commerce resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceCountryRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commerceInvoiceStatus);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // commerceInvoiceStatus is a resource previously fetched using get action.
                 baasicCommerceInvoiceStatusService.remove(commerceInvoiceStatus)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.commerceModule.lookups.invoiceStatuses.remove(data);
                },

                batch: {

                    /**
                     * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resources.
                     * @method batch.create        
                     * @example 
                     baasicCommerceInvoiceStatusService.batch.create([{
                     name : '<name>',
                     abrv: '<abbreviation>',
                     description: '<description>'
                     }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data) {
                        return baasicApp.commerceModule.lookups.invoiceStatuses.batch.create(data);
                    },

                    /**
                     * Returns a promise that is resolved once the remove commerce action has been performed. This action will remove commerce resources from the system if successfully completed. 
                     * @method batch.remove       
                     * @example 			 
                     baasicCommerceInvoiceStatusService.batch.remove(commerceInvoiceStatusIds)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });		
                     **/
                    remove: function (ids) {
                        return baasicApp.commerceModule.lookups.invoiceStatuses.batch.remove(ids);
                    },

                    /**
                     * Returns a promise that is resolved once the update commerce action has been performed; this action updates specified commerce resources.
                     * @method batch.update       
                     * @example 
                     baasicCommerceInvoiceStatusService.batch.update(commerceInvoiceStatuses)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApp.commerceModule.lookups.invoiceStatuses.batch.update(data);
                    }
                },

                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceInvoiceStatusService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.commerceModule.lookups.invoiceStatuses.routeDefinition
            };
        }]);
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
    /* globals module */
    /**
     * @module baasicCommercePaymentMethodService
     * @description Baasic Commerce PaymentMethod Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommercePaymentMethodService` uses `baasicCommercePaymentMethodRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommercePaymentMethodService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicCommercePaymentMethodService.find({
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
                    return baasicApp.commerceModule.lookups.paymentMethods.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                 * @method        
                 * @example 
                 baasicCommercePaymentMethodService.get('<payment-method-id>')
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.commerceModule.lookups.paymentMethods.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resource.
                 * @method        
                 * @example 
                 baasicCommercePaymentMethodService.create({
                 name : '<name>',
                 abrv: '<abbreviation>',
                 description: '<description>'
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.commerceModule.lookups.paymentMethods.create(data);
                },
                /**
                 * Returns a promise that is resolved once the update commerce action has been performed; this action updates a commerce resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommercePaymentMethodRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commercePaymentMethod);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // commercePaymentMethod is a resource previously fetched using get action.
                 commercePaymentMethod.description = '<description>';
                 baasicCommercePaymentMethodService.update(commercePaymentMethod)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.commerceModule.lookups.paymentMethods.update(data);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a commerce resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommercePaymentMethodRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commercePaymentMethod);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // commercePaymentMethod is a resource previously fetched using get action.
                 baasicCommercePaymentMethodService.remove(commercePaymentMethod)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.commerceModule.lookups.paymentMethods.remove(data);
                },

                batch: {

                    /**
                     * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resources.
                     * @method batch.create        
                     * @example 
                     baasicCommercePaymentMethodService.batch.create([{
                     name : '<name>',
                     abrv: '<abbreviation>',
                     description: '<description>',
                     published: '<published>'
                     }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data) {
                        return baasicApp.commerceModule.lookups.paymentMethods.batch.create(data);
                    },

                    /**
                     * Returns a promise that is resolved once the remove commerce action has been performed. This action will remove commerce resources from the system if successfully completed. 
                     * @method batch.remove       
                     * @example 			 
                     baasicCommercePaymentMethodService.batch.remove(commercePaymentMethodIds)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });		
                     **/
                    remove: function (ids) {
                        return baasicApp.commerceModule.lookups.paymentMethods.batch.remove(ids);
                    },

                    /**
                     * Returns a promise that is resolved once the update commerce action has been performed; this action updates specified commerce resources.
                     * @method batch.update       
                     * @example 
                     baasicCommercePaymentMethodService.batch.update(commercePaymentMethods)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApp.commerceModule.lookups.paymentMethods.batch.update(data);
                    }

                },

                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommercePaymentMethodService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.commerceModule.lookups.paymentMethods.routeDefinition
            };
        }]);
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
    /* globals module */
    /**
     * @module baasicCommercePaymentTransactionStatusService
     * @description Baasic Commerce PaymentTransactionStatus Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommercePaymentTransactionStatusService` uses `baasicCommercePaymentTransactionStatusRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommercePaymentTransactionStatusService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicCommercePaymentTransactionStatusService.find({
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
                    return baasicApp.commerceModule.lookups.paymentTransactionStatuses.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                 * @method        
                 * @example 
                 baasicCommercePaymentTransactionStatusService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.commerceModule.lookups.paymentTransactionStatuses.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resource.
                 * @method        
                 * @example 
                 baasicCommercePaymentTransactionStatusService.create({
                 name : '<name>',
                 abrv: '<abbreviation>',
                 description: '<description>'
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.commerceModule.lookups.paymentTransactionStatuses.create(data);
                },
                /**
                 * Returns a promise that is resolved once the update commerce action has been performed; this action updates a commerce resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommercePaymentTransactionStatusRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commercePaymentTransactionStatus);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // commercePaymentTransactionStatus is a resource previously fetched using get action.
                 commercePaymentTransactionStatus.description = '<description>';
                 baasicCommercePaymentTransactionStatusService.update(commercePaymentTransactionStatus)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.commerceModule.lookups.paymentTransactionStatuses.update(data);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a commerce resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommercePaymentTransactionStatusRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commercePaymentTransactionStatus);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // commercePaymentTransactionStatus is a resource previously fetched using get action.
                 baasicCommercePaymentTransactionStatusService.remove(commercePaymentTransactionStatus)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.commerceModule.lookups.paymentTransactionStatuses.remove(data);
                },

                batch: {

                    /**
                     * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resources.
                     * @method batch.create        
                     * @example 
                     baasicCommercePaymentTransactionStatusService.batch.create([{
                     name : '<name>',
                     abrv: '<abbreviation>',
                     description: '<description>'
                     }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data) {
                        return baasicApp.commerceModule.lookups.paymentTransactionStatuses.batch.create(data);
                    },

                    /**
                     * Returns a promise that is resolved once the remove commerce action has been performed. This action will remove commerce resources from the system if successfully completed. 
                     * @method batch.remove       
                     * @example 			 
                     baasicCommercePaymentTransactionStatusService.batch.remove(commercePaymentTransactionStatusIds)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });		
                     **/
                    remove: function (ids) {
                        return baasicApp.commerceModule.lookups.paymentTransactionStatuses.batch.remove(ids);
                    },

                    /**
                     * Returns a promise that is resolved once the update commerce action has been performed; this action updates specified commerce resources.
                     * @method batch.update       
                     * @example 
                     baasicCommercePaymentTransactionStatusService.batch.update(commercePaymentTransactionStatuses)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApp.commerceModule.lookups.paymentTransactionStatuses.batch.update(data);
                    }
                },

                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommercePaymentTransactionStatusService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.commerceModule.lookups.paymentTransactionStatuses.routeDefinition
            };
        }]);
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
    /* globals module */
    /**
     * @module baasicCommerceRecurringCyclePeriodTypeService
     * @description Baasic Commerce Recurring Cycle Period Type Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceRecurringCyclePeriodTypeService` uses `baasicCommerceRecurringCyclePeriodTypeRouteService`.
     */
    (function (angular, module) {
        'use strict';
        module.service('baasicCommerceRecurringCyclePeriodTypeService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resource.
                 * @method        
                 * @example 
                 baasicCommerceRecurringCyclePeriodTypeService.create({
                 name : '<name>',
                 abrv: '<abbreviation>',
                 description: '<description>',
                 monthFactor: '<month-factor'>
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.commerceModule.lookups.recurringCyclePeriodTypes.create(data);
                },

                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicCommerceRecurringCyclePeriodTypeService.find({
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
                    return baasicApp.commerceModule.lookups.recurringCyclePeriodTypes.find(options);
                },

                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                 * @method        
                 * @example 
                 baasicCommerceRecurringCyclePeriodTypeService.get('<recurring-cycle-period-type-id>')
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.commerceModule.lookups.recurringCyclePeriodTypes.get(id, options);
                },

                /**
                 * Returns a promise that is resolved once the update commerce action has been performed; this action updates a commerce resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceRecurringCyclePeriodTypeRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commerceRecurringPeriodType);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // commerceRecurringPeriodType is a resource previously fetched using get action.
                 commerceRecurringPeriodType.description = '<description>';
                 baasicCommerceRecurringCyclePeriodTypeService.update(commerceRecurringPeriodType)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.commerceModule.lookups.recurringCyclePeriodTypes.update(data);
                },

                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a commerce resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceRecurringCyclePeriodTypeRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commerceRecurringPeriodType);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // commerceRecurringPeriodType is a resource previously fetched using get action.
                 baasicCommerceRecurringCyclePeriodTypeService.remove(commerceRecurringPeriodType)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.commerceModule.lookups.recurringCyclePeriodTypes.remove(data);
                },

                batch: {

                    /**
                     * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resources.
                     * @method batch.create        
                     * @example 
                     baasicCommerceRecurringCyclePeriodTypeService.batch.create([{
                     name : '<name>',
                     abrv: '<abbreviation>',
                     description: '<description>',
                     monthFactor: '<month-factor'>
                     }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data) {
                        return baasicApp.commerceModule.lookups.recurringCyclePeriodTypes.batch.create(data);
                    },

                    /**
                     * Returns a promise that is resolved once the remove commerce action has been performed. This action will remove commerce resources from the system if successfully completed. 
                     * @method batch.remove       
                     * @example 			 
                     baasicCommerceRecurringCyclePeriodTypeService.batch.remove(commerceRecurringPeriodTypeIds)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });		
                     **/
                    remove: function (ids) {
                        return baasicApp.commerceModule.lookups.recurringCyclePeriodTypes.batch.remove(ids);
                    },

                    /**
                     * Returns a promise that is resolved once the update commerce action has been performed; this action updates specified commerce resources.
                     * @method batch.update       
                     * @example 
                     baasicCommerceRecurringCyclePeriodTypeService.batch.update(commerceRecurringPeriodTypes)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApp.commerceModule.lookups.recurringCyclePeriodTypes.batch.update(data);
                    }
                },

                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceRecurringCyclePeriodTypeService.routeService.get(expandObject);
                 **/
                routeService: function () {
                    return baasicApp.commerceModule.lookups.recurringCyclePeriodTypes.routeDefinition;
                }
            };
        }]);
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
    /* globals module */
    /**
     * @module baasicCommerceSubscriptionStatusService
     * @description Baasic Commerce SubscriptionStatus Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceSubscriptionStatusService` uses `baasicCommerceSubscriptionStatusRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceSubscriptionStatusService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of commerce resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicCommerceSubscriptionStatusService.find({
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
                    return baasicApp.commerceModule.lookups.subscriptionStatuses.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the commerce resource.
                 * @method        
                 * @example 
                 baasicCommerceSubscriptionStatusService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.commerceModule.lookups.subscriptionStatuses.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resource.
                 * @method        
                 * @example 
                 baasicCommerceSubscriptionStatusService.create({
                 name : '<name>',
                 abrv: '<abbreviation>',
                 description: '<description>'
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.commerceModule.lookups.subscriptionStatuses.create(data);
                },
                /**
                 * Returns a promise that is resolved once the update commerce action has been performed; this action updates a commerce resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceSubscriptionStatusRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commerceSubscriptionStatus);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // commerceSubscriptionStatus is a resource previously fetched using get action.
                 commerceSubscriptionStatus.description = '<description>';
                 baasicCommerceSubscriptionStatusService.update(commerceSubscriptionStatus)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.commerceModule.lookups.subscriptionStatuses.update(data);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a commerce resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCommerceSubscriptionStatusRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(commerceSubscriptionStatus);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // commerceSubscriptionStatus is a resource previously fetched using get action.
                 baasicCommerceSubscriptionStatusService.remove(commerceSubscriptionStatus)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.commerceModule.lookups.subscriptionStatuses.remove(data);
                },

                batch: {

                    /**
                     * Returns a promise that is resolved once the create commerce action has been performed; this action creates a new commerce resources.
                     * @method batch.create        
                     * @example 
                     baasicCommerceSubscriptionStatusService.batch.create([{
                     name : '<name>',
                     abrv: '<abbreviation>',
                     description: '<description>'
                     }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data) {
                        return baasicApp.commerceModule.lookups.subscriptionStatuses.batch.create(data);
                    },

                    /**
                     * Returns a promise that is resolved once the remove commerce action has been performed. This action will remove commerce resources from the system if successfully completed. 
                     * @method batch.remove       
                     * @example 			 
                     baasicCommerceSubscriptionStatusService.batch.remove(subscriptionStatusIds)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });		
                     **/
                    remove: function (ids) {
                        return baasicApp.commerceModule.lookups.subscriptionStatuses.batch.remove(ids);
                    },

                    /**
                     * Returns a promise that is resolved once the update commerce action has been performed; this action updates specified commerce resources.
                     * @method batch.update       
                     * @example 
                     baasicCommerceSubscriptionStatusService.batch.update(subscriptionStatuses)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApp.commerceModule.lookups.subscriptionStatuses.batch.update(data);
                    }
                },

                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceSubscriptionStatusService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.commerceModule.lookups.subscriptionStatuses.routeDefinition
            };
        }]);
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
    /* exported module */
    /** 
     * @description The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism. An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.api` module functionality it must be added as a dependency to your app.
     * @module baasic.api
     * @example
     (function (Main) {
     'use strict';
     var dependencies = [
     'baasic.api',
     'baasic.membership',
     'baasic.security',
     'baasic.appSettings',
     'baasic.article',
     'baasic.dynamicResource',
     'baasic.keyValue',
     'baasic.valueSet'
     ];
     Main.module = angular.module('myApp.Main', dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module('baasic.api', ['HALParser']);

    /* globals module */

    module.config(['$provide', function config($provide) {
        // copied from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript

        function regExpEscape(s) {
            return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        }

        if (!('withCredentials' in new XMLHttpRequest())) {

            $provide.decorator('$httpBackend', ['$delegate', '$q', '$rootScope', '$window', '$document', 'baasicApp', function initBaasicProxy($delegate, $q, $rootScope, $window, $document, baasicApp) {
                var apps = baasicApp.all(),
                    proxies = [],
                    requestHash = {},
                    nextRequestId = 0;

                function sendNewMessage(proxy, message, callback) {

                    message.requestId = nextRequestId;

                    var request = {
                        proxy: proxy,
                        callback: callback,
                        message: message
                    };

                    requestHash[message.requestId] = request;

                    proxy.sendMessage(request);

                    nextRequestId += 1;
                }

                function createProxy(app) {
                    var apiUrl = app.getApiUrl();
                    var proxy = {
                        proxyFrame: [],
                        apiUrlRegex: new RegExp('^' + regExpEscape(apiUrl)),
                        sendMessage: function sendMessageToQueue(request) {
                            this.proxyFrame.push(request);
                        }
                    };

                    var injectFrame = angular.element('<iframe src="' + apiUrl + 'proxy/angular" style="display:none"></iframe>');
                    injectFrame.bind('load', function () {
                        var queue = proxy.proxyFrame;

                        proxy.proxyFrame = this;
                        proxy.sendMessage = function sendMessageToProxy(request) {
                            this.proxyFrame.contentWindow.postMessage(JSON.stringify(request.message), apiUrl);
                        };

                        while (queue.length > 0) {
                            proxy.sendMessage(queue.shift());
                        }
                    });

                    $document.find('body').append(injectFrame);

                    return proxy;
                }

                for (var i = 0, l = apps.length; i < l; i++) {
                    proxies.push(createProxy(apps[i]));
                }

                angular.element($window).bind('message', function readMessageFromProxy(e) {
                    var event = e.originalEvent || e;
                    var response = JSON.parse(event.data);
                    var request = requestHash[response.requestId];
                    if (request && event.source === request.proxy.proxyFrame.contentWindow) {
                        delete requestHash[response.requestId];
                        request.callback(response.status, response.response, response.headersString);
                    }
                });

                return function (method, url, post, callback, headers, timeout, withCredentials, responseType) {
                    for (var i = 0, l = proxies.length; i < l; i++) {
                        var proxy = proxies[i];
                        if (proxy.apiUrlRegex.test(url)) {

                            sendNewMessage(proxy, {
                                method: method,
                                url: url,
                                post: post,
                                headers: headers,
                                timeout: timeout,
                                withCredentials: withCredentials,
                                responseType: responseType
                            }, callback);

                            return;
                        }
                    }

                    $delegate(method, url, post, callback, headers, timeout, withCredentials, responseType);
                };
            }]);
        }
    }]);

    /* globals module */
    /**
     * @module baasicApiHttp
     * @description `baasicApiHttp` service is a core Baasic service that facilitates communication with the Baasic API. `baasicApiHttp` service is based on Angular '$http' service. For more information please visit online angular [documentation](https://docs.angularjs.org/api/ng/service/$http). This service handles:
     - authentication tokens and
     - HAL parsing.
     */

    (function (angular, module, undefined) {
        'use strict';
        var extend = angular.extend;

        function tail(array) {
            return Array.prototype.slice.call(array, 1);
        }

        function createShortMethods(proxy) {
            angular.forEach(tail(arguments, 1), function (name) {
                proxy[name] = function (url, config) {
                    return proxy(extend(config || {}, {
                        method: name,
                        url: url
                    }));
                };
            });
        }

        function createShortMethodsWithData(proxy) {
            angular.forEach(tail(arguments, 1), function (name) {
                proxy[name] = function (url, data, config) {
                    return proxy(extend(config || {}, {
                        method: name,
                        url: url,
                        data: data
                    }));
                };
            });
        }

        var proxyFactory = function proxyFactory(app) {
            var proxyMethod = function (config) {
                var request = {};
                if (config) {
                    request.url = config.url;
                    request.method = config.method;
                    if (config.headers) request.headers = config.headers;
                    if (config.data) request.data = config.data;

                }

                return app.apiClient.request(request);
            };

            createShortMethods(proxyMethod, 'get', 'delete', 'head', 'jsonp');
            createShortMethodsWithData(proxyMethod, 'post', 'put', 'patch');

            return proxyMethod;
        };

        module.service('baasicApiHttp', ['$q', 'baasicApp', function baasicApiHttp($q, baasicApp) {
            var proxy = proxyFactory(baasicApp.get());

            proxy.createNew = function (app) {
                return proxyFactory(app);
            };

            return proxy;
        }]);
    })(angular, module); /* globals module */
    /**
     * @module baasicApiService
     * @description This service is used to perform low level model or option transformations before they are sent to the Baasic back-end.
     */

    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicApiService', ['baasicConstants', function (baasicConstants) {
            function FindParams(options) {
                if (angular.isObject(options)) {
                    angular.extend(this, options);
                    if (options.hasOwnProperty('orderBy') && options.hasOwnProperty('orderDirection')) {
                        this.sort = options.orderBy ? options.orderBy + '|' + options.orderDirection : null;
                    }
                    if (options.hasOwnProperty('search')) {
                        this.searchQuery = options.search;
                    }
                    if (options.hasOwnProperty('pageNumber')) {
                        this.page = options.pageNumber;
                    }
                    if (options.hasOwnProperty('pageSize')) {
                        this.rpp = options.pageSize;
                    }
                } else {
                    this.searchQuery = options;
                }
            }

            function KeyParams(id, options, propName) {
                if (angular.isObject(id)) {
                    angular.extend(this, id);
                } else {
                    if (propName !== undefined) {
                        this[propName] = id;
                    } else {
                        this[baasicConstants.idPropertyName] = id;
                    }
                }

                if (options !== undefined && angular.isObject(options)) {
                    angular.extend(this, options);
                }
            }

            function ModelParams(data) {
                if (data.hasOwnProperty(baasicConstants.modelPropertyName)) {
                    angular.extend(this, data);
                } else {
                    this[baasicConstants.modelPropertyName] = data;
                }
            }

            return {
                /**
                 * Parses Baasic Api pagination, sorting and search parameters.
                 * @method        
                 * @example 
                 baasicApiService.findParams({
                 pageNumber:1, 
                 pageSize:10
                 });
                 **/
                findParams: function (options) {
                    return new FindParams(options);
                },
                /**
                 * Parses specified key parameters; initial object can be expanded with additional parameters.
                 * @method        
                 * @example 
                 baasicApiService.getParams((
                 '<value>', 
                 {additionalOptions: '<option>'}, 
                 '<property-name>'
                 ));
                 **/
                getParams: function (id, options, propName) {
                    return new KeyParams(id, options, propName);
                },
                /**
                 * Performs create resource transforms on an object so that it can be safely expanded with additional properties.
                 * @method        
                 * @example baasicApiService.createParams({});               
                 **/
                createParams: function (data) {
                    return new ModelParams(data);
                },
                /**
                 * Performs update resource transforms on transforms an object so that it can be safely expanded with additional properties.
                 * @method        
                 * @example baasicApiService.updateParams({});               
                 **/
                updateParams: function (data) {
                    return new ModelParams(data);
                },
                /**
                 * Performs remove resource transforms on transforms an object so that it can be safely expanded with additional properties.
                 * @method        
                 * @example baasicApiService.removeParams({});               
                 **/
                removeParams: function (data) {
                    return new ModelParams(data);
                }
            };
        }]);
    }(angular, module)); /* globals module, MonoSoftware */
    /**
     * @module baasicApp
     * @description  `baasicApp` service is used to manage Baasic application instances. Multiple AngularJS application instances can be created and coexist at the same time (each will communicate with its corresponding Baasic application).
     */

    (function (angular, module, undefined) {
        'use strict';
        module.provider('baasicApp', function baasicAppService() {
            var apps = {};
            var defaultAppKey;
            /**
             * Create an application.
             * @method create       
             * @example
             var app = baasicApp.create('<api-key>', {
             apiRootUrl : 'api.baasic.com',	
             apiVersion : '<version>' 
             });      
             **/
            this.create = function create(apiKey, config) {

                apps[apiKey] = function (httpClient) {
                    var cfg = angular.extend({
                        httpClient: function () {
                            return httpClient;
                        }
                    }, config);
                    var app = new baasicSdkJavaScript.BaasicApp(apiKey, cfg);
                    apps[apiKey] = function () {
                        return app;
                    };

                    return app;
                };

                if (!defaultAppKey) {
                    defaultAppKey = apiKey;
                }
            };

            this.$get = ["$http", "$q", function ($http, $q) {
                var httpClient = getHttpClient($http, $q);

                return {
                    /**
                     * Returns a list of all applications.
                     * @method        
                     * @example baasicApp.all();               
                     **/
                    all: function () {
                        var list = [];
                        for (var key in apps) {
                            list.push(apps[key](httpClient));
                        }

                        return list;
                    },
                    /**
                     * Returns a specified application.
                     * @method        
                     * @example baasicApp.get('<api-key>');               
                     **/
                    get: function getBaasicApplication(apiKey) {
                        var appFactory;
                        if (apiKey) {
                            appFactory = apps[apiKey];
                        } else {
                            appFactory = apps[defaultAppKey];
                        }

                        return appFactory(httpClient);
                    }
                };
            }];
        });

        function getHttpClient($http, $q) {
            return {
                createPromise: function (deferFn) {
                    var deferred = $q.defer();
                    deferFn(deferred.resolve, deferred.reject);
                    var promise = deferred.promise;

                    promise.success = function (fn) {
                        promise.then(function (response) {
                            resolveHttpPromise(fn, response);
                        }, null);
                        return promise;
                    };

                    promise.error = function (fn) {
                        promise.then(null, function (response) {
                            resolveHttpPromise(fn, response);
                        });
                        return promise;
                    };

                    return promise;
                },
                request: function (request) {
                    var config = {
                        withCredentials: true,
                        method: request.method,
                        url: request.url.toString()
                    };

                    if (request.headers) config.headers = request.headers;
                    if (request.data) config.data = request.data;

                    var promise = $http(config).then(function (value) {
                        return {
                            headers: value.headers(),
                            data: value.data,
                            statusCode: value.status,
                            statusText: value.statusText,
                            request: request
                        };
                    }, function (data) {
                        throw {
                            headers: data.headers(),
                            data: data.data,
                            statusCode: data.status,
                            statusText: data.statusText,
                            request: request
                        };
                    });

                    promise.success = function (fn) {
                        promise.then(function (response) {
                            fn(response.data, response.statusCode, response.headers, request);
                        }, null);
                        return promise;
                    };

                    promise.error = function (fn) {
                        promise.then(null, function (response) {
                            fn(response.data, response.statusCode, response.headers, request);
                        });
                        return promise;
                    };

                    return promise;
                }
            };
        }

        function resolveHttpPromise(fn, response) {
            var config = angular.extend({}, response.request);
            if (config.url) config.url = config.url.toString();
            fn(response.data, response.statusCode, response.headers, config);
        }

    }(angular, module)); /* globals module */
    /**
     * @module baasicLookupService
     * @description Baasic Lookup Service provides an easy way to consume Baasic Lookup REST API end-points. In order to obtain needed routes `baasicLookupService` uses `baasicLookupRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicLookupService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                routeService: baasicApp.membershipModule.lookups.routeDefinition,
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the lookup resources.
                 * @method        
                 * @example 
                 baasicLookupService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (options) {
                    return baasicApp.membershipModule.lookups.get(options);
                }
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicConstants
     * @description Baasic constants contain values such as _id_ property name and _model_ property name parameters that can be used in case manual model or option transformation is needed.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.constant('baasicConstants', {
            idPropertyName: 'id',
            modelPropertyName: 'model'
        });
    }(angular, module)); /* globals module, UriTemplate */
    /**
     * @module baasicUriTemplateService
     * @description This is the core Uri template service wihch expands templates based on on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications and can expand templates up to and including Level 4 in that specification.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUriTemplateService', [function () {
            return {
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicUriTemplateService.parse(
                 '<route>/{?embed,fields,options}'
                 ).expand(
                 {embed: '<embedded-resource>'}
                 );
                 **/
                parse: function (link) {
                    return UriTemplate.parse(link);
                },
                /**
                 * Constructs template Url based on given arguments.
                 * @method
                 * @example 
                 baasicUriTemplateService.constructTemplateUrl({
                 templateText : UriTemplate.parse('<route>/{searchTerm}/{rpp}/{page}/{sort}'),
                 defaultUrl : 'route'
                 }, {
                 search : '<search-phrase>',
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : '<field>',
                 orderDirection : '<asc|desc>'
                 });
                 **/
                constructTemplateUrl: function (config, params) {
                    if (!config || !config.templateText || !config.defaultUrl) {
                        throw 'Invalid template configuration.';
                    }

                    var url, defaultUrl = config.defaultUrl;
                    if (config.templateText) {
                        var sortParams = params.orderBy ? params.orderBy + '|' + params.orderDirection : null,
                            expandConfig = {
                                page: params.pageNumber,
                                rpp: params.pageSize,
                                sort: sortParams,
                                searchQuery: params.search
                            };

                        if (config.additionalParams) {
                            for (var p in config.additionalParams) {
                                if (expandConfig[p]) {
                                    throw 'Property' + p + ' already exists in default expand configuration';
                                }
                                else {
                                    expandConfig[p] = config.additionalParams[p];
                                }
                            }
                        }

                        var expandedTemplate = config.templateText.expand(expandConfig);

                        var defaultUrlIndex = expandedTemplate.indexOf(defaultUrl);

                        url = expandedTemplate.substr(defaultUrlIndex);
                    }
                    else {
                        url = defaultUrl;
                    }

                    return url;
                }
            };
        }]);
    })(angular, module); /* globals module */
    /** 
     * @description The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism. An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.dynamicResource` module functionality it must be added as a dependency to your app.
     * @module baasic.dynamicResource 
     * @example
     (function (Main) {
     'use strict';
     var dependencies = [
     'baasic.api',
     'baasic.membership',
     'baasic.security',
     'baasic.appSettings',
     'baasic.article',
     'baasic.dynamicResource',
     'baasic.keyValue',
     'baasic.valueSet'
     ];
     Main.module = angular.module('myApp.Main', dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module("baasic.dynamicResource", ["baasic.api"]); /* globals module */
    module.config(["$provide", function config($provide) {}]);
    /**
     * @module baasicDynamicResourceService
     * @description Baasic Dynamic Resource Service provides an easy way to consume Baasic Dynamic Resource REST API end-points. In order to obtain needed routes `baasicDynamicResourceService` uses `baasicDynamicResourceRouteService`.
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicDynamicResourceService", ["baasicApp", function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of dynamic resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicDynamicResourceService.find('<schema-name>', {
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
                find: function (schemaName, options) {
                    return baasicApp.dynamicResourceModule.find(schemaName, options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified dynamic resource.
                 * @method        
                 * @example 
                 baasicDynamicResourceService.get('<schema-name>', '<dynamic-resource-id>')
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (schemaName, id, options) {
                    return baasicApp.dynamicResourceModule.get(schemaName, id, options);
                },
                /**
                 * Returns a promise that is resolved once the create dynamic resource action has been performed; this action creates a new dynamic resource item.
                 * @method        
                 * @example 
                 baasicDynamicResourceService.create('<schema-name>', {
                 id : '',
                 description : '<description>'  
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (schemaName, data) {
                    return baasicApp.dynamicResourceModule.create(schemaName, data);
                },
                /**
                 * Returns a promise that is resolved once the update action has been performed; this action updates a dynamic resource item. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicDynamicResourceRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(dynamicResource);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // dynamicResource is a resource previously fetched using get action.
                 dynamicResource.description = '<description>';
                 baasicDynamicResourceService.update(dynamicResource, {
                 query: "where field = 'value' "
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (schemaName, data, options) {
                    return baasicApp.dynamicResourceModule.update(schemaName, data, options);
                },
                /**
                 * Returns a promise that is resolved once the patch action has been performed; this action patches an existing dynamic resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicDynamicResourceRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(dynamicResource);
                 var uri = params['model'].links('patch').href;
                 ```
                 * @method        
                 * @example 
                 // dynamicResource is a resource previously fetched using get action.
                 dynamicResource.description = '<new-description>';
                 dynamicResource.newField = '<newfield-value>';
                 baasicDynamicResourceService.update(dynamicResource, {
                 query: "where field = 'value' "
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                patch: function (schemaName, data, options) {
                    return baasicApp.dynamicResourceModule.patch(schemaName, data, options);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a dynamic resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicDynamicResourceRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(dynamicResource);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // dynamicResource is a resource previously fetched using get action.
                 baasicDynamicResourceService.remove(dynamicResource, {
                 query: "where field = 'value' "
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (schemaName, data, options) {
                    return baasicApp.dynamicResourceModule.remove(schemaName, data, options);
                },
                /**
                 * Provides direct access to `baasicDynamicResourceRouteService`.
                 * @method        
                 * @example baasicDynamicResourceService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.dynamicResourceModule.routeDefinition,
                acl: {
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns a list of ACL policies established for the specified dynamic resource.
                     * @method acl.get       
                     * @example 
                     baasicDynamicResourceService.acl.get({id: '<dynamic-resource-id>', schemaName: '<schema-name>'})
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (options) {
                        return baasicApp.dynamicResourceModule.acl.get(options);
                    },
                    /**
                     * Returns a promise that is resolved once the update acl action has been performed; this action creates new ACL policy for the specified dynamic resource.
                     * @method acl.update      
                     * @example 
                     baasicDynamicResourceService.acl.update({id: '<dynamic-resource-id>', schemaName: '<schema-name>'})
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (options) {
                        return baasicApp.dynamicResourceModule.acl.update(options);
                    },
                    /**
                     * Returns a promise that is resolved once the removeByUser action has been performed. This action deletes ACL policy assigned to the specified user and dynamic resource.
                     * @method acl.deleteByUser      
                     * @example 
                     // dynamicResource is a resource previously fetched using get action.
                     baasicDynamicResourceService.acl.removeByUser('<access-action>', '<username>', dynamicResource)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    removeByUser: function (action, user, data) {
                        return baasicApp.dynamicResourceModule.acl.removeByUser(action, user, data);
                    },
                    /**
                     * Returns a promise that is resolved once the removeByRole action has been performed. This action deletes ACL policy assigned to the specified role and dynamic resource.
                     * @method acl.deleteByRole      
                     * @example 
                     // dynamicResource is a resource previously fetched using get action.
                     baasicDynamicResourceService.acl.removeByRole('<access-action>', '<role-name>', dynamicResource)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    removeByRole: function (action, role, data) {
                        return baasicApp.dynamicResourceModule.acl.removeByRole(action, role, data);
                    },
                    routeService: baasicApp.dynamicResourceModule.acl.routeDefinition
                }
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /**
     * @module baasicDynamicSchemaService
     * @description Baasic Dynamic Schema Service provides an easy way to consume Baasic Dynamic Schema REST API end-points. In order to obtain needed routes `baasicDynamicSchemaService` uses `baasicDynamicSchemaRouteService`.
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicDynamicSchemaService", ["baasicApp", function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of dynamic resource schemas matching the given criteria.
                 * @method        
                 * @example 
                 baasicDynamicSchemaService.find({
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
                    return baasicApp.dynamicResourceModule.schema.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified dynamic resource schema.
                 * @method        
                 * @example 
                 baasicDynamicSchemaService.get('<schema-name>')
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (name, options) {
                    return baasicApp.dynamicResourceModule.schema.get(name, options);
                },
                /**
                 * Returns a promise that is resolved once the create action has been performed; this action creates a new dynamic resource schema item.
                 * @method        
                 * @example 
                 baasicDynamicSchemaService.create({
                 schema : {
                 type : 'object',
                 properties : {
                 id : {
                 title : '<unique-identifier-field>',
                 readonly : true,
                 hidden : true,
                 type : 'string'
                 },
                 description : {
                 type: string
                 }
                 }
                 },
                 name : '<schema-name>',
                 description : '<description>',
                 enforceSchemaValidation : true
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.dynamicResourceModule.schema.create(data);
                },
                /**
                 * Returns a promise that is resolved once the update dynamic resource schema action has been performed; this action updates a dynamic resource schema item. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicDynamicSchemaRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(dynamicResourceSchema);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // dynamicResourceSchema is a resource previously fetched using get action.
                 dynamicResourceSchema.description = '<description>';
                 baasicDynamicSchemaService.update(dynamicResourceSchema)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.dynamicResourceModule.schema.update(data);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a dynamic resource schema item from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicDynamicSchemaRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(dynamicResourceSchema);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // dynamicResourceSchema is a resource previously fetched using get action.
                 baasicDynamicSchemaService.remove(dynamicResourceSchema)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.dynamicResourceModule.schema.remove(data);
                },
                /**
                 * Returns a promise that is resolved once the generate schema action has been performed. Success response returns a schema generated based on the json input.
                 * @method        
                 * @example 			 
                 baasicDynamicSchemaService.generate({
                 id : '<schema-Id>',
                 description : '<description>'
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                generate: function (data) {
                    return baasicApp.dynamicResourceModule.schema.generate(data);
                },
                /**
                 * Provides direct access to `baasicDynamicSchemaRouteService`.
                 * @method        
                 * @example baasicDynamicSchemaService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.dynamicResourceModule.schema.routeDefinition
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* exported module */

    /** 
     * @description The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism. An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.files` module functionality it must be added as a dependency to your app.
     * @module baasic.files
     * @example
     (function (Main) {
     "use strict";
     var dependencies = [
     "baasic.api",
     "baasic.membership",
     "baasic.security",
     "baasic.userProfile",
     "baasic.files",
     "baasic.article",
     "baasic.dynamicResource",
     "baasic.keyValue",
     "baasic.valueSet"
     ];
     Main.module = angular.module("myApp.Main", dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module('baasic.files', ['baasic.api']);

    /* globals module */
    /**
     * @module baasicFilesService
     * @description Baasic Files Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Files Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicFilesService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of file resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicFilesService.find({
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
                    return baasicApp.fileModule.find(options);
                },

                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns requested file resource.
                 * @method        
                 * @example 
                 baasicFilesService.get('<file-id>')
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.fileModule.get(id, options);
                },

                /**
                 * Returns a promise that is resolved once the unlink action has been performed. This action will remove one or many file resources from the system if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will remove just derived resource. Otherwise, specified file and all its accompanying derived resources will be removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply baasicFilesRouteService route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(fileEntry);
                 var uri = params['model'].links('unlink').href;
                 ```
                 * @method        
                 * @example 
                 // fileEntry is a file resource previously fetched using get action. The following action will remove the original file resource and all accompanying derived file resources.
                 baasicFilesRouteService.remove(fileEntry)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 // fileEntry is a file resource previously fetched using get action. The following action will remove derived file resource only.
                 baasicFilesRouteService.remove(fileEntry, {width: <width>, height: <height>})
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data, options) {
                    return this.unlink(data, options);
                },

                /**
                 * Returns a promise that is resolved once the unlink action has been performed. This action will remove one or many file resources from the system if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will remove just derived resource. Otherwise, specified file and all its accompanying derived resources will be removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply baasicFilesRouteService route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(fileEntry);
                 var uri = params['model'].links('unlink').href;
                 ```
                 * @method        
                 * @example 
                 // fileEntry is a file resource previously fetched using get action. The following action will remove the original file resource and all accompanying derived file resources.
                 baasicFilesRouteService.remove(fileEntry)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 // fileEntry is a file resource previously fetched using get action. The following action will remove derived file resource only.
                 baasicFilesRouteService.remove(fileEntry, {width: <width>, height: <height>})
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                unlink: function (data, options) {
                    return baasicApp.fileModule.unlink(data, options);
                },

                /**
                 * Returns a promise that is resolved once the update file action has been performed; this action will update a file resource if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicFilesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.updateParams(fileEntry);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // fileEntry is a file resource previously fetched using get action.
                 fileEntry.description = '<description>';
                 baasicFilesService.update(fileEntry)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.fileModule.update(data);
                },

                /**
                 * Returns a promise that is resolved once the link action has been performed; this action links file resource from other modules into the Files module (For example: file resources from the Media Vault module can be linked directly into the Files module).
                 * @method        
                 * @example 
                 baasicFilesService.link(fileObject)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                link: function (data) {
                    return baasicApp.fileModule.link(data);
                },

                streams: {
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns the file stream if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will return a stream of the derived resource. Otherwise, stream of the original file resource will be retrieved.
                     * @method streams.get        
                     * @example 
                     // Request the original file stream
                     baasicFilesService.stream.get({id: '<path>'})
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     // Request derived file stream
                     baasicFilesService.stream.get({id: '<path>', width: <width>, height: <height>})
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (data) {
                        return baasicApp.fileModule.streams.get(data);
                    },

                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns the file stream as a blob. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will return a blob of the derived file resource. Otherwise, blob of the original file resource will be retrieved. For more information on Blob objects please see [Blob Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
                     * @method streams.getBlob        
                     * @example 
                     // Request the original blob
                     baasicFilesService.stream.getBlob('<path>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     // Request derived blob
                     baasicFilesService.stream.getBlob({id: '<path>', width: <width>, height: <height>})
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    getBlob: function (data) {
                        return baasicApp.fileModule.streams.getBlob(data);
                    },

                    /**
                     * Returns a promise that is resolved once the update file stream action has been performed; this action will replace the existing stream with a new one. Alternatively, if a derived stream is being updated it will either create a new derived stream or replace the existing one. In order to update a derived stream, format needs to be passed (For example: `width` and `height` for the image type of file stream data type).
                     * @method streams.update
                     * @example
                     // Update original file stream
                     baasicFilesService.streams.update('<path>', <file-stream>)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     // Update derived file stream
                     baasicFilesService.streams.update({id: '<path>', width: <width>, height: <height>}, <file-stream>)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data, stream) {
                        return baasicApp.fileModule.streams.update(data, stream);
                    },

                    /**
                     * Returns a promise that is resolved once the create file stream action has been performed; this action will upload the specified blob. For more information on Blob objects please see [Blob Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
                     * @method streams.create
                     * @example 
                     baasicFilesService.streams.create('<path>', <blob>)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data, stream) {
                        return baasicApp.fileModule.streams.create(data, stream);
                    },
                    routeService: baasicApp.fileModule.streams.routeDefinition
                },

                batch: {
                    /**
                     * Returns a promise that is resolved once the unlink action has been performed. This action will remove file resources from the system if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will remove just derived resource. Otherwise, specified file and all its accompanying derived resources will be removed from the system.
                     * @method batch.remove       
                     * @example
                     // Remove original file resources
                     baasicFilesService.batch.remove([{ id: '<file-id>' }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     // Remove derived file resources
                     baasicFilesService.batch.remove([{ id: '<file-id>', fileFormat: { width: <width>, height: <height> } }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    remove: function (data) {
                        return this.unlink(data);
                    },

                    /**
                     * Returns a promise that is resolved once the unlink action has been performed. This action will remove file resources from the system if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will remove just derived resource. Otherwise, specified file and all its accompanying derived resources will be removed from the system.
                     * @method batch.unlink       
                     * @example
                     // Remove original file resources
                     baasicFilesService.batch.unlink([{ id: '<file-id>' }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     // Remove derived file resources
                     baasicFilesService.batch.unlink([{ id: '<file-id>', fileFormat: { width: <width>, height: <height> } }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    unlink: function (data) {
                        return baasicApp.fileModule.batch.unlink(data);
                    },
                    /**
                     * Returns a promise that is resolved once the update action has been performed; this action updates specified file resources.
                     * @method batch.update       
                     * @example 
                     baasicFilesService.batch.update(files)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApp.fileModule.batch.update(data);
                    },

                    /**
                     * Returns a promise that is resolved once the link action has been performed; this action links file resources from other modules into the Files module (For example: file resources from the Media Vault module can be linked directly into the Files module).
                     * @method batch.link       
                     * @example 
                     baasicFilesService.batch.link(files)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    link: function (data) {
                        return baasicApp.fileModule.batch.link(data);
                    },
                    routeService: baasicApp.fileModule.batch.routeDefinition
                },

                acl: {
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns a list of ACL policies established for the specified file resource.
                     * @method acl.get       
                     * @example 
                     baasicFilesService.acl.get({id: '<file-id>'})
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (options) {
                        return baasicApp.fileModule.acl.get(options);
                    },
                    /**
                     * Returns a promise that is resolved once the update acl action has been performed, this action creates new ACL policy for the specified file resource.
                     * @method acl.update      
                     * @example 
                     var options = {id : '<file-id>'};
                     var aclObj =  {
                     actionId: '<action-id>',
                     roleId: '<role-id>',
                     userId: '<user-id>'
                     };
                     options[baasicConstants.modelPropertyName] = aclObj;
                     baasicFilesService.acl.update(options)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (options) {
                        return baasicApp.fileModule.acl.update(options);
                    },
                    /**
                     * Returns a promise that is resolved once the removeByUser action has been performed. This action deletes ACL policy assigned to the specified user and file resource.
                     * @method acl.deleteByUser      
                     * @example 
                     baasicFilesService.acl.removeByUser('<file-id>', '<access-action>', '<username>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    removeByUser: function (fileEntryId, action, user, data) {
                        return baasicApp.fileModule.acl.removeByUser(fileEntryId, action, user, data);
                    },
                    /**
                     * Returns a promise that is resolved once the removeByRole action has been performed. This action deletes ACL policy assigned to the specified role and file resource.
                     * @method acl.deleteByRole      
                     * @example 
                     baasicFilesService.acl.removeByRole('<file-id>', '<access-action>', '<role-name>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    removeByRole: function (fileEntryId, action, role, data) {
                        return baasicApp.fileModule.acl.removeByRole(fileEntryId, action, role, data);
                    }
                },
                routeService: baasicApp.fileModule.acl.routeDefinition
            };
        }]);
    }(angular, module));

    /**
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicMediaVaultService
     * @description Baasic Media Vault Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Media Vault Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicMediaVaultService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of media vault resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicMediaVaultService.find({
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
                    return baasicApp.mediaVaultModule.find(options);
                },

                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns requested media vault resource.
                 * @method        
                 * @example 
                 baasicMediaVaultService.get('<media-vault-id>')
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.mediaVaultModule.get(id, options);
                },

                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove one or many media vault resources from the system if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of media vault resource, the operation will remove just derived resource. Otherwise, specified media vault and all its accompanying derived resources will be removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply baasicMediaVaultRouteService route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(mediaVaultEntry);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // mediaVaultEntry is a media vault resource previously fetched using get action. The following action will remove the original media vault resource and all accompanying derived media vault resources.
                 baasicMediaVaultService.remove(mediaVaultEntry)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 // mediaVaultEntry is a media vault resource previously fetched using get action. The following action will remove derived media vault resource only.
                 baasicMediaVaultService.remove(mediaVaultEntry, {width: <width>, height: <height>})
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data, options) {
                    return baasicApp.mediaVaultModule.remove(data, options);
                },

                /**
                 * Returns a promise that is resolved once the update media vault action has been performed; this action will update a media vault resource if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicMediaVaultRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(mediaVaultEntry);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // mediaVaultEntry is a media vault resource previously fetched using get action.
                 mediaVaultEntry.description = '<description>';
                 baasicMediaVaultService.update(mediaVaultEntry)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.mediaVaultModule.update(data);
                },

                streams: {
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns the media vault stream if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of media vault resource, the operation will return a stream of the derived resource. Otherwise, stream of the original media vault resource will be retrieved.
                     * @method streams.get        
                     * @example 
                     // Request the original media vault stream
                     baasicMediaVaultService.stream.get('<path>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     // Request derived media vault stream
                     baasicMediaVaultService.stream.get({id: '<path>', width: <width>, height: <height>})
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (data) {
                        return baasicApp.mediaVaultModule.streams.get(data);
                    },

                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns the media vault stream as a blob. If derived resource's format is passed, such as `width` and `height` for the image type of media vault resource, the operation will return a blob of the derived media vault resource. Otherwise, blob of the original media vault resource will be retrieved. For more information on Blob objects please see [Blob Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
                     * @method streams.getBlob        
                     * @example 
                     // Request the original blob
                     baasicMediaVaultService.stream.getBlob('<path>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     // Request derived blob
                     baasicMediaVaultService.stream.getBlob({id: '<path>', width: <width>, height: <height>})
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    getBlob: function (data) {
                        return baasicApp.mediaVaultModule.streams.getBlob(data);
                    },

                    /**
                     * Returns a promise that is resolved once the update media vault stream action has been performed; this action will replace the existing stream with a new one. Alternatively, if a derived stream is being updated it will either create a new derived stream or replace the existing one. In order to update a derived stream, format needs to be passed (For example: `width` and `height` for the image type of media vault stream data type).
                     * @method streams.update
                     * @example
                     // Update existing original media vault stream
                     baasicMediaVaultService.streams.update('<path>', <media-vault-stream>)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     // Update derived media vault stream
                     baasicMediaVaultService.streams.update({id: '<path>', width: <width>, height: <height>}, <media-vault-stream>)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data, stream) {
                        return baasicApp.mediaVaultModule.streams.update(data, streams);
                    },

                    /**
                     * Returns a promise that is resolved once the create media vault stream action has been performed; this action will upload the specified blob. For more information on Blob objects please see [Blob Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
                     * @method streams.create
                     * @example 
                     baasicMediaVaultService.streams.create('<path>', <blob>)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data, stream) {
                        return baasicApp.mediaVaultModule.streams.create(data, stream);
                    },
                    routeService: baasicApp.mediaVaultModule.streams.routeDefinition
                },

                batch: {
                    /**
                     * Returns a promise that is resolved once the remove action has been performed. This action will remove media vault resources from the system if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of media vault resource, the operation will remove just derived resource. Otherwise, specified media vault and all its accompanying derived resources will be removed from the system.
                     * @method batch.remove       
                     * @example
                     // Remove original media vault resources
                     baasicMediaVaultService.batch.remove([{ id: '<media-vault-id>' }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     // Remove derived media vault resources
                     baasicMediaVaultService.batch.remove([{ id: '<media-vault-id>', fileFormat: { width: <width>, height: <height> } }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    remove: function (data) {
                        return baasicApp.mediaVaultModule.batch.remove(data);
                    },
                    /**
                     * Returns a promise that is resolved once the update action has been performed; this action updates specified media vault resources.
                     * @method batch.update       
                     * @example 
                     baasicMediaVaultService.batch.update(files)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApp.mediaVaultModule.batch.update(data);
                    },
                    routeService: baasicApp.mediaVaultModule.batch.routeDefinition
                },

                settings: {
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns media vault settings resource.
                     * @method settings.get        
                     * @example 
                     baasicMediaVaultService.settings.get()
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function () {
                        return baasicApp.mediaVaultModule.settings.get();
                    },

                    /**
                     * Returns a promise that is resolved once the update action has been performed; this action updates the media vault settings resource.
                     * @method settings.update       
                     * @example 
                     baasicMediaVaultService.settings.update(mediaVaultSettings)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApp.mediaVaultModule.settings.update(data);
                    },
                    routeService: baasicApp.mediaVaultModule.settings.routeDefinition
                },

                processingProviderSettings: {
                    /**
                     * Returns a promise that is resolved once the find action has been performed. Success response returns a list of media vault processing providers matching the given criteria.
                     * @method        
                     * @example 
                     baasicMediaVaultService.processingProviderSettings.find({
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
                        return baasicApp.mediaVaultModule.processingProviderSettings.find(options);
                    },

                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns the media vault processing provider resource.
                     * @method        
                     * @example 
                     baasicMediaVaultService.processingProviderSettings.get('<id>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (id, options) {
                        return baasicApp.mediaVaultModule.processingProviderSettings.get(id, options);
                    },

                    /**
                     * Returns a promise that is resolved once the update action has been performed; this action updates a media vault processing provider setting resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicMediaVaultRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                     ```
                     var params = baasicApiService.removeParams(processingProviderSetting);
                     var uri = params['model'].links('put').href;
                     ```
                     * @method        
                     * @example 
                     // processingProviderSettings is a resource previously fetched using get action.
                     processingProviderSettings.settings.faceDetection = true;
                     baasicMediaVaultService.processingProviderSettings.update(processingProviderSetting)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApp.mediaVaultModule.processingProviderSettings.update(data);
                    },
                    routeService: baasicApp.mediaVaultModule.processingProviderSettings.routeDefinition
                },
                routeService: baasicApp.mediaVaultModule.routeDefinition
            };
        }]);
    }(angular, module));

    /**
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /** 
     * @description The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism. An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.keyValue` module functionality it must be added as a dependency to your app.
     * @copyright (c) 2017 Mono Ltd
     * @license MIT
     * @author Mono Ltd
     * @module baasic.keyValue
     * @example
     (function (Main) {
     'use strict';
     var dependencies = [
     'baasic.api',
     'baasic.membership',
     'baasic.security',
     'baasic.appSettings',
     'baasic.article',
     'baasic.dynamicResource',
     'baasic.keyValue',
     'baasic.valueSet'
     ];
     Main.module = angular.module('myApp.Main', dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module("baasic.keyValue", ["baasic.api"]); /* globals module */
    module.config(["$provide", function config($provide) {}]);
    /**
     * @module baasicKeyValueService
     * @description Baasic Key Value Service provides an easy way to consume Baasic Key Value REST API end-points. 
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicKeyValueService", ["baasicApp", function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of key value resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicKeyValueService.find({
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
                    return baasicApp.keyValueModule.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified key value resource.
                 * @method        
                 * @example 
                 baasicKeyValueService.get('<key-value-id>')
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.keyValueModule.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the create key value action has been performed; this action creates a new key value resource.
                 * @method        
                 * @example 
                 baasicKeyValueService.create({
                 key : '<key>',
                 value : '<value>', 
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.keyValueModule.create(data);
                },
                /**
                 * Returns a promise that is resolved once the update key value action has been performed; this action updates a key value resource. 
                 * @method        
                 * @example 
                 // keyValue is a resource previously fetched using get action.
                 keyValue.value = '<new-value>';
                 baasicKeyValueService.update(keyValue)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.keyValueModule.update(data);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a key value resource from the system if successfully completed. 
                 * @method        
                 * @example 
                 // keyValue is a resource previously fetched using get action.
                 baasicKeyValueService.remove(keyValue)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.keyValueModule.remove(data);
                },
                /**
                 * Provides direct access to routeDefinition.
                 * @method        
                 * @example baasicKeyValueService.routeService.get('<id>', { embed:'<embeds>', fields: '<fields>' });
                 **/
                routeService: baasicApp.keyValueModule.routeDefinition
            };
        }]);
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
    /* exported module */
    /** 
     * @description The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism. An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.membership` module functionality it must be added as a dependency to your app.
     * @module baasic.membership 
     * @example
     (function (Main) {
     'use strict';
     var dependencies = [
     'baasic.api',
     'baasic.membership',
     'baasic.security',
     'baasic.appSettings',
     'baasic.article',
     'baasic.dynamicResource',
     'baasic.keyValue',
     'baasic.valueSet'
     ];
     Main.module = angular.module('myApp.Main', dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module('baasic.membership', ['baasic.api']);

    /* globals module */
    /**
     * @module baasicLoginService
     * @description Baasic Register Service provides an easy way to consume Baasic Application Registration REST API end-points. 
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicLoginService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the login action has been performed. This action logs user into the application and success response returns the token resource.
                 * @method        
                 * @example 
                 baasicLoginService.login({
                 username : '<username>',
                 password : '<password>',
                 options : ['session', 'sliding']
                 })
                 .success(function (data) {
                 // perform success actions here
                 })
                 .error(function (data, status) {
                 // perform error handling here
                 })
                 .finally (function () {});
                 **/
                login: function login(data) {
                    return baasicApp.membershipModule.login.login(data);
                },
                /**
                 * Returns a promise that is resolved once the loadUserData action has been performed. This action retrieves the account information of the currently logged in user. Retrieved account information will contain permission collection which identifies access policies assigned to the user and application sections.
                 * @method
                 * @example
                 baasicLoginService.loadUserData()
                 .success(function (data) {
                 // perform success actions here
                 })
                 .error(function (data) {
                 // perform error handling here
                 })
                 .finally (function () {});
                 */
                loadUserData: function loadUserData(data) {
                    return baasicApp.membershipModule.login.loadUserData(data);
                },
                /**
                 * Returns a promise that is resolved once the logout action has been performed. This action invalidates user token logging the user out of the system.
                 * @method
                 * @example
                 var token = baasicAuthorizationService.getAccessToken();
                 baasicLoginService.logout(token.access_token, token.token_type)
                 .error(function (data) {
                 // perform error handling here
                 })
                 .finally (function () {});
                 */
                logout: function logout(token, type) {
                    return baasicApp.membershipModule.login.logout(token, type);
                },
                /**
                 * Provides direct access to route definition.
                 * @method        
                 * @example baasicLoginService.routeService.get('<id>', expandObject);
                 **/
                routeService: baasicApp.membershipModule.login.routeDefinition,
                social: {
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns a resolved social login provider Url.
                     * @method social.get
                     * @example 
                     baasicLoginService.social.get('<provider>', '<returnUrl>')
                     .success(function (collection) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (provider, returnUrl) {
                        return baasicApp.membershipModule.loginSocial.get(provider, returnUrl);
                    },
                    /**
                     * Returns a promise that is resolved once the post action has been performed. This action logs user into the application and success response returns the token resource.
                     * @method social.post
                     * @example 
                     var postData = {
                     email : '<email>',
                     code:'<code>',
                     activationUrl : '<activationUrl>',
                     oAuthToken : '<oAuthToken>',
                     oAuthVerifier : '<oAuthVerifier>',
                     password : '<password>',
                     returnUrl : '<returnUrl>'
                     };
                     baasicLoginService.social.post('<provider>', postData)
                     .success(function (collection) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    post: function (provider, data, options) {
                        return baasicApp.membershipModule.loginSocial.post(provider, data, options);
                    },
                    /**
                     * Parses social provider response parameters.
                     * @method social.parseResponse
                     * @example baasicLoginService.social.parseResponse('<provider>');
                     **/
                    parseResponse: function (provider, returnUrl) {
                        return baasicApp.membershipModule.loginSocial.parseResponse(provider, returnUrl);
                    },
                    /**
                     * Provides direct access to route definition.
                     * @method        
                     * @example baasicLoginService.social.routeService.get('<id>', expandObject);
                     **/
                    routeService: baasicApp.membershipModule.loginSocial.routeDefinition
                }
            };

        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicPasswordRecoveryService
     * @description Baasic Password Recovery Service provides an easy way to consume Baasic Password Recovery REST API end-points. 
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicPasswordRecoveryService', ['baasicApp', function (baasicApps) {
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
                routeService: baasicApp.membershipModule.passwordRecovery.routeDefinition
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicRegisterService
     * @description Baasic Register Service provides an easy way to consume Baasic Application Registration REST API end-points. 
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicRegisterService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the register create has been performed. This action will create a new user if completed successfully. Created user is not approved immediately, instead an activation e-mail is sent to the user.
                 * @method        
                 * @example 
                 baasicRegisterService.create({
                 activationUrl : '<activation-url>',
                 challengeIdentifier : '<challenge-identifier>',
                 challengeResponse : '<challenge-response>',
                 confirmPassword : '<confirm-password>',
                 email : '<email>',
                 password : '<password>',
                 username : '<username>'
                 })
                 .success(function (data) {
                 // perform success actions here
                 })
                 .error(function (data, status) {
                 // perform error handling here
                 })
                 .finally (function () {});
                 **/
                create: function (data) {
                    return baasicApp.membershipModule.register.create(data);
                },
                /**
                 * Returns a promise that is resolved once the account activation action has been performed; this action activates a user account and success response returns the token resource.
                 * @method        
                 * @example 
                 baasicRegisterService.activate({
                 activationToken : '<activation-token>'
                 })
                 .success(function (data) {
                 // perform success actions here
                 })
                 .error(function (data, status) {
                 // perform error handling here
                 })
                 .finally (function () {});
                 **/
                activate: function (data) {
                    return baasicApp.membershipModule.register.activate(data);
                },
                /**
                 * Provides direct access to route definition.
                 * @method        
                 * @example baasicRegisterService.routeService.get('<id>', expandObject);
                 **/
                routeService: baasicApp.membershipModule.register.routeDefinition
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicRoleService
     * @description Baasic Role Service provides an easy way to consume Baasic Role REST API end-points. 
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicRoleService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of role resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicRoleService.find({
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
                    return baasicApp.membershipModule.role.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified role resource.
                 * @method        
                 * @example 
                 baasicRoleService.get('<role-id>')
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.membershipModule.role.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the create action has been performed; this action creates a role.
                 * @method        
                 * @example 
                 baasicRoleService.create({
                 description : '<description>',
                 name : '<name>'
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.membershipModule.role.create(data);
                },
                /**
                 * Returns a promise that is resolved once the update role action has been performed; this action updates a role. 
                 * @method        
                 * @example 
                 // role is a resource previously fetched using get action.
                 role.name = '<new-name>';
                 baasicRoleService.update(role)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 
                 **/
                update: function (data) {
                    return baasicApp.membershipModule.role.update(data);
                },
                /**
                 * Returns a promise that is resolved once the remove role action has been performed. This action will remove a role from the system, if completed successfully. 
                 * @method        
                 * @example 
                 // Role is a resource previously fetched using get action.
                 baasicRoleService.remove(role)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.membershipModule.role.remove(data);
                },
                /**
                 * Provides direct access to route definition.
                 * @method        
                 * @example baasicRoleService.routeService.get('<id>', expandObject);
                 **/
                routeService: baasicApp.membershipModule.role.routeDefinition
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicUserService
     * @description Baasic User Service provides an easy way to consume Baasic User REST API end-points. In order to obtain needed routes `baasicUserService` uses `baasicUserRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the exists action has been performed. This action checks if user exists in the application.
                 * @method        
                 * @example 
                 baasicUserService.exists('<username>')
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                exists: function (username, options) {
                    return baasicApp.membershipModule.user.exists(username, options);
                },
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of user resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicUserService.find({
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
                    return baasicApp.membershipModule.user.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified user resource.
                 * @method        
                 * @example 
                 baasicUserService.get({
                 username : '<username>',
                 embed : '<embedded-resource>'
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (options) {
                    return baasicApp.membershipModule.user.get(options.username, options);
                },
                /**
                 * Returns a promise that is resolved once the create user action has been performed; this action creates a new user.
                 * @method        
                 * @example 
                 baasicUserService.create({
                 confirmPassword : '<password>',
                 email : '<email>',
                 password : '<password>',
                 sendEmailNotification : true,
                 username : '<username>',
                 roles: ['<role-name>'],
                 additionalProperty: '<additional-property>'  
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.membershipModule.user.create(data);
                },
                /**
                 * Returns a promise that is resolved once the update user action has been performed; this action updates a user. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(user);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // user is a resource previously fetched using get action.
                 user.roles = ['<role-name>', '<new-role-name>'];
                 user.email = '<new-email>';
                 baasicUserService.update(user)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.membershipModule.user.update(data);
                },
                /**
                 * Returns a promise that is resolved once the remove user action has been performed. This action will remove a user from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(user);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // user is a resource previously fetched using get action.
                 baasicUserService.remove(user)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.membershipModule.user.remove(data);
                },
                /**
                 * Returns a promise that is resolved once the unlock user action has been performed. This action will unlock the user resource which was previously locked either manually or automatically by the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(user);
                 var uri = params['model'].links('unlock').href;
                 ```
                 * @method        
                 * @example 
                 //  user is a resource previously fetched using get action.
                 baasicUserService.unlock(user)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                unlock: function (data) {
                    return baasicApp.membershipModule.user.unlock(data);
                },
                /**
                 * Returns a promise that is resolved once the lock user action has been performed. This action will lock the user resource out of the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(user);
                 var uri = params['model'].links('lock').href;
                 ```
                 * @method        
                 * @example 
                 // user is a resource previously fetched using get action.
                 baasicUserService.lock(user)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                lock: function (data) {
                    return baasicApp.membershipModule.user.lock(data);
                },
                /**
                 * Returns a promise that is resolved once the approve user action has been performed. This action will mark the user resource as 'approved' in the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(user);
                 var uri = params['model'].links('approve').href;
                 ```
                 * @method        
                 * @example 
                 // user is a resource previously fetched using get action.
                 baasicUserService.lock(user)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                approve: function (data) {
                    return baasicApp.membershipModule.user.approve(data);
                },
                /**
                 * Returns a promise that is resolved once the disapprove user action has been performed. This action will mark the user resource as 'not approved' in the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(user);
                 var uri = params['model'].links('disapprove').href;
                 ```
                 * @method        
                 * @example 
                 // user is a resource previously fetched using get action.
                 baasicUserService.lock(user)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                disapprove: function (data) {
                    return baasicApp.membershipModule.user.disapprove(data);
                },
                /**
                 * Returns a promise that is resolved once the changePassword action has been performed. This action will update user's password selection.
                 * @method        
                 * @example 
                 baasicUserService.changePassword('<username>', {
                 newPassword : '<new-password>',
                 sendMailNotification : false
                 })
                 .success(function () {
                 // perform success action here
                 })
                 .error(function (data, status, headers, config) {
                 // perform error handling here
                 })
                 .finally (function () {});
                 **/
                changePassword: function (username, data) {
                    return baasicApp.membershipModule.user.changePassword(username, data);
                },
                /**
                 * Provides direct access to `baasicUserRouteService`.
                 * @method        
                 * @example baasicUserService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.membershipModule.user.routeDefinition,
                socialLogin: {
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns a list user resource connected social login providers.
                     * @method socialLogin.get
                     * @example 
                     baasicUserService.socialLogin.get('<username>')
                     .success(function (collection) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (username) {
                        return baasicApp.membershipModule.user.socialLogin.get(username);
                    },
                    /**
                     * Returns a promise that is resolved once the remove action has been performed. This action removes the user resource social login connection from the specified provider.
                     * @method socialLogin.remove
                     * @example 
                     baasicUserService.socialLogin.remove('<username>', '<provider>')
                     .success(function (collection) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    remove: function (username, provider) {
                        return baasicApp.membershipModule.user.socialLogin.remove(username, provider);
                    }
                }
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* exported module */
    /** 
     * @description The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism.  An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.metering` module functionality it must be added as a dependency to your app.
     * @copyright (c) 2017 Mono Ltd
     * @license MIT
     * @author Mono Ltd
     * @module baasic.metering
     * @example
     (function (Main) {
     'use strict';
     var dependencies = [
     'baasic.api',
     'baasic.membership',
     'baasic.security',
     'baasic.appSettings',
     'baasic.metering',
     'baasic.dynamicResource',
     'baasic.keyValue',
     'baasic.valueSet'
     ];
     Main.module = angular.module('myApp.Main', dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module('baasic.metering', ['baasic.api']);

    /* globals module */
    /**
     * @module baasicMeteringCategoryService
     * @description Baasic Metering Category Service provides an easy way to consume Baasic Metering REST API end-points. In order to obtain a needed routes `baasicMeteringCategoryService` uses `baasicMeteringCategoryRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicMeteringCategoryService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of metering resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicMeteringCategoryService.find({
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
                    return baasicApp.meteringModule.category.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the metering resource.
                 * @method        
                 * @example 
                 baasicMeteringCategoryService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.meteringModule.category.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the create metering action has been performed; this action creates a new metering resource.
                 * @method        
                 * @example 
                 baasicMeteringCategoryService.create({
                 category : '<category-name>',
                 unitName : 'Kb',
                 unitFactor: 1,
                 defaultSamplingRate: '<value>', - Defaults: Minute = 1,Hour = 2,Day = 3,Week = 4,Month = 5,Year = 6
                 aggregateFunction: '<value>' - Defaults: None = 0,Count = 1,Avg = 2,Max = 3,Min = 4,Sum = 5
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.meteringModule.category.create(data);
                },
                /**
                 * Returns a promise that is resolved once the update metering action has been performed; this action updates a metering resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicMeteringCategoryRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(meteringCategory);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // meteringCategory is a resource previously fetched using get action.
                 meteringCategory.defaultSamplingRate = 'Day';
                 baasicMeteringCategoryService.update(meteringCategory)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.meteringModule.category.update(data);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a metering resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicMeteringCategoryRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(meteringCategory);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // meteringCategory is a resource previously fetched using get action.
                 baasicMeteringCategoryService.remove(meteringCategory)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.meteringModule.category.remove(data);
                },
                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicMeteringCategoryService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.meteringModule.category.routeDefinition,
                batch: {
                    /**
                     * Returns a promise that is resolved once the create category action has been performed; this action creates new category resources.
                     * @method batch.create       
                     * @example 
                     baasicMeteringCategoryService.batch.create([{
                     aggregateFunction : '<aggregateFunction>',
                     category : '<name>',
                     defaultSamplingRate: '<defaultSamplingRate>',
                     slug: '<slug>',
                     unitFactor: '<unitFactor>',
                     unitName: '<unitName>'
                     }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data) {
                        return baasicApp.meteringModule.category.batch.create(data);
                    },
                    /**
                     * Returns a promise that is resolved once the update category action has been performed; this action updates specified category resources.
                     * @method batch.update       
                     * @example 
                     baasicMeteringCategoryService.batch.update(companies)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApp.meteringModule.category.batch.update(data);
                    },
                    /**
                     * Returns a promise that is resolved once the remove action has been performed. This action will remove category resources from the system if successfully completed. 
                     * @method batch.remove       
                     * @example 			 
                     baasicCompanyService.batch.remove(companyIds)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });		
                     **/
                    remove: function (ids) {
                        return baasicApp.meteringModule.category.batch.remove(ids);
                    }
                }
            };
        }]);
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
    /* globals module */
    /**
     * @module baasicMeteringService
     * @description Baasic Metering Service provides an easy way to consume Baasic Metering REST API end-points. In order to obtain a needed routes `baasicMeteringService` uses `baasicMeteringRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicMeteringService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of metering resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicMeteringService.find({
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : '<field>',
                 orderDirection : '<asc|desc>',
                 categories: 'Storage,Requests,Bandwidth'
                 })
                 .success(function (collection) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                find: function (options) {
                    return baasicApp.meteringModule.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the metering resource.
                 * @method        
                 * @example 
                 baasicMeteringService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.meteringModule.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the create metering action has been performed; this action creates a new metering resource.
                 * @method        
                 * @example 
                 baasicMeteringService.create({
                 category : '<category-name>',
                 name : '<sub-category-name>',
                 value: '<value>' 
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.meteringModule.create(data);
                },
                /**
                 * Returns a promise that is resolved once the update metering action has been performed; this action updates a metering resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicMeteringRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(meteringData);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // meteringData is a resource previously fetched using get action.
                 meteringData.value = '<some-new-value>';
                 baasicMeteringService.update(meteringData)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.meteringModule.update(data);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a metering resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicMeteringRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(meteringData);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // meteringData is a resource previously fetched using get action.
                 baasicMeteringService.remove(meteringData)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.meteringModule.remove(data);
                },
                /**
                 * Returns a promise that is resolved once the purge action has been performed. This action will remove all metering resources from the system if successfully completed. 
                 * @method        
                 * @example 			 
                 baasicMeteringService.purge()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                purge: function () {
                    return baasicApp.meteringModule.purge();
                },
                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicMeteringService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.meteringModule.routeDefinition,
                batch: {
                    /**
                     * Returns a promise that is resolved once the create data action has been performed; this action creates new data resources.
                     * @method batch.create       
                     * @example 
                     baasicMeteringService.batch.create([{
                     applicationId : '<applicationId>',
                     category : '<category>',
                     name: '<name>',
                     value: '<value>' 
                     }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data) {
                        return baasicApp.meteringModule.batch.create(data);
                    },
                    /**
                     * Returns a promise that is resolved once the update data action has been performed; this action updates specified data resources.
                     * @method batch.update       
                     * @example 
                     baasicMeteringService.batch.update(companies)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApp.meteringModule.batch.update(data);
                    },
                    /**
                     * Returns a promise that is resolved once the remove action has been performed. This action will remove data resources from the system if successfully completed. 
                     * @method batch.remove       
                     * @example 			 
                     baasicMeteringService.batch.remove(companyIds)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });		
                     **/
                    remove: function (ids) {
                        return baasicApp.meteringModule.batch.remove(ids);
                    }
                },
                statistics: {
                    /**
                     * Returns a promise that is resolved once the find action has been performed. Success response returns a list of metering resources matching the given criteria.
                     * @method        
                     * @example 
                     baasicMeteringService.statistics.find({
                     pageNumber : 1,
                     pageSize : 10,
                     orderBy : '<field>',
                     orderDirection : '<asc|desc>',
                     category: 'Requests',
                     rateBy : '<minute,hour,day,week,month,year>',
                     from: '2 days ago',
                     to: 'now'
                     })
                     .success(function (collection) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });    
                     **/
                    find: function (options) {
                        return baasicApp.meteringModule.statistics.find(options);
                    }
                },
                acl: {
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns a list of ACL policies established for the specified metering resource.
                     * @method acl.get       
                     * @example 
                     baasicMeteringService.acl.get({id: '<id>'})
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (options) {
                        return baasicApp.meteringModule.acl.get(options);
                    },
                    /**
                     * Returns a promise that is resolved once the update acl action has been performed, this action creates new ACL policy for the specified metering resource.
                     * @method acl.update      
                     * @example 
                     var options = {id : '<id>'};
                     var aclObj =  {
                     actionId: '<action-id'>,
                     roleId: '<roleId>',
                     userId: '<userId>'
                     };
                     options[baasicConstants.modelPropertyName] = aclObj;
                     baasicMeteringService.acl.update(options)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (options) {
                        return baasicApp.meteringModule.acl.update(options);
                    },
                    /**
                     * Returns a promise that is resolved once the removeByUser action has been performed. This action deletes ACL policy assigned to the specified user and metering resource.
                     * @method acl.deleteByUser      
                     * @example 
                     baasicMeteringService.acl.removeByUser('<id>', '<access-action>', '<username>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    removeByUser: function (id, action, user, data) {
                        return baasicApp.meteringModule.acl.removeByUser(id, action, user, data);
                    },
                    /**
                     * Returns a promise that is resolved once the removeByRole action has been performed. This action deletes ACL policy assigned to the specified role and metering resource.
                     * @method acl.deleteByRole      
                     * @example 
                     baasicMeteringService.acl.removeByRole('<id>', '<access-action>', '<role-name>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    removeByRole: function (id, action, role, data) {
                        return baasicApp.meteringModule.acl.removeByRole(id, action, role, data);
                    }
                }
            };
        }]);
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
    /* globals module */
    /**
     * @module baasicMeteringSettingsService
     * @description Baasic Metering Settings Service provides an easy way to consume Baasic Metering REST API end-points. In order to obtain a needed routes `baasicMeteringSettingsService` uses `baasicMeteringSettingsRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicMeteringSettingsService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the metering resource.
                 * @method        
                 * @example 
                 baasicMeteringSettingsService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (options) {
                    return baasicApp.meteringModule.settings.get(options);
                },
                /**
                 * Returns a promise that is resolved once the update metering action has been performed; this action updates a metering resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicMeteringSettingsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(meteringSettings);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // meteringSettings is a resource previously fetched using get action.
                 meteringSettings.dataRetentionPeriod = 60;
                 baasicMeteringSettingsService.update(meteringSettings)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.meteringModule.settings.update(data);
                },
                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicMeteringSettingsService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.meteringModule.settings.routeDefinition
            };
        }]);
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
    /* exported module */
    /** 
     * @description The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism. An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.notifications` module functionality it must be added as a dependency to your app.
     * @module baasic.notifications
     * @example
     (function (Main) {
     'use strict';
     var dependencies = [
     "baasic.api",
     "baasic.membership",
     "baasic.security",
     "baasic.userProfile",
     "baasic.notifications",
     "baasic.article",
     "baasic.dynamicResource",
     "baasic.keyValue",
     "baasic.valueSet"
     ];
     Main.module = angular.module("myApp.Main", dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module('baasic.notifications', ['baasic.api']); /* globals module */
    /**
     * @module baasicNotificationsService
     * @description Baasic Notifications Service provides an easy way to consume Baasic Notifications REST API end-points. In order to obtain needed routes `baasicNotificationsService` uses `baasicNotificationsRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicNotificationsService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                publish: {
                    /**
                     * Returns a promise that is resolved once the create notification action has been performed; this action creates a new notification resource.
                     * @method publish.create
                     * @example 
                     baasicNotificationsService.publish.create({
                     channels: ['<channel-name', '<channel-name>'],
                     moduleName: '<module-name>',
                     templateName: '<template-name>',
                     templateContext: {
                     prop1: '<prop1-value>',
                     prop2: '<prop2-value>'
                     }
                     })
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     */
                    create: function (data) {
                        return baasicApp.notificationModule.publish.create(data);
                    },
                    batch: {
                        /**
                         * Returns a promise that is resolved once the create notification action has been performed; this action creates new notification resources.
                         * @method publish.batch.create       
                         * @example 
                         baasicNotificationsService.publish.create([{
                         channels: ['<channel-name', '<channel-name>'],
                         moduleName: '<module-name>',
                         templateName: '<template-name>',
                         templateContext: {
                         prop1: '<prop1-value>',
                         prop2: '<prop2-value>'
                         }
                         }])
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         */
                        create: function (data) {
                            return baasicApp.notificationModule.publish.batch.create(data);
                        }
                    }
                },
                subscriptions: {
                    users: {
                        /**
                         * Returns a promise that is resolved once the create user subscription action has been performed; this action creates a new user subscription resource.
                         * @method subscriptions.users.create
                         * @example 
                         baasicNotificationsService.subscriptions.users.create({
                         channel: '<channel-name>',
                         userId: '<user-id>'
                         })
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         */
                        create: function (data) {
                            return baasicApp.notificationModule.subscriptions.users.create(data);
                        },

                        /**
                         * Returns a promise that is resolved once the find action has been performed. Success response returns a list of user subscription resources matching the given criteria.
                         * @method subscriptions.users.find       
                         * @example 
                         baasicNotificationsService.subscriptions.users.find({
                         pageNumber : 1,
                         pageSize : 10,
                         orderBy : '<field>',
                         orderDirection : '<asc|desc>',
                         search : '<search-phrase>',
                         channels: '<channel-name1>,<channel-name2>',
                         userIds: '<user-id1>,<user-id2>',
                         embed: '<embed>'
                         })
                         .success(function (collection) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         */
                        find: function (options) {
                            return baasicApp.notificationModule.subscriptions.users.find(options);
                        },

                        /**
                         * Returns a promise that is resolved once the get action has been performed. Success response returns the specified user subscription resource.
                         * @method subscriptions.users.get       
                         * @example 
                         baasicNotificationsService.subscriptions.users.get('<subscription-id>')
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         */
                        get: function (id, options) {
                            return baasicApp.notificationModule.subscriptions.users.get(id, options);
                        },

                        /**
                         * Returns a promise that is resolved once the remove user subscription action has been performed. This action will remove a user subscription resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicNotificationsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                         ```
                         var params = baasicApiService.removeParams(subscription);
                         var uri = params['model'].links('delete').href;
                         ```
                         * @method subscriptions.users.remove        
                         * @example 
                         // subscription is a resource previously fetched using get action.
                         baasicNotificationsService.subscriptions.users.remove(subscription)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         */
                        remove: function (data) {
                            return baasicApp.notificationModule.subscriptions.users.remove(data);
                        },

                        /**
                         * Returns a promise that is resolved once the update user subscription action has been performed; this action updates a user subscription resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicNotificationsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                         ```
                         var params = baasicApiService.updateParams(subscription);
                         var uri = params['model'].links('put').href;
                         ```
                         * @method subscriptions.users.update        
                         * @example 
                         // subscription is a resource previously fetched using get action.
                         subscription.channel = '<channel-name>';
                         baasicNotificationsService.subscriptions.users.update(subscription)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         */
                        update: function (data) {
                            return baasicApp.notificationModule.subscriptions.users.update(data);
                        },
                        batch: {
                            /**
                             * Returns a promise that is resolved once the create user subscription action has been performed; this action creates new user subscription resources.
                             * @method subscriptions.users.batch.create       
                             * @example 
                             baasicNotificationsService.subscriptions.users.batch.create([{
                             channel: '<channel-name>',
                             userId: '<user-id>'
                             }])
                             .success(function (data) {
                             // perform success action here
                             })
                             .error(function (response, status, headers, config) {
                             // perform error handling here
                             });
                             */
                            create: function (data) {
                                return baasicApp.notificationModule.subscriptions.batch.create(data);
                            },

                            /**
                             * Returns a promise that is resolved once the remove action has been performed. This action will remove user subscription resources from the system if successfully completed. 
                             * @method subscriptions.users.batch.remove       
                             * @example 			 
                             baasicNotificationsService.subscriptions.users.batch.remove(subscriptionIds)
                             .success(function (data) {
                             // perform success action here
                             })
                             .error(function (response, status, headers, config) {
                             // perform error handling here
                             });
                             */
                            remove: function (ids) {
                                return baasicApp.notificationModule.subscriptions.batch.remove(ids);
                            },

                            /**
                             * Returns a promise that is resolved once the update user subscriptions action has been performed; this action updates specified user subscription resources.
                             * @method subscriptions.users.batch.update       
                             * @example 
                             baasicNotificationsService.subscriptions.users.batch.update(subscriptions)
                             .success(function (data) {
                             // perform success action here
                             })
                             .error(function (response, status, headers, config) {
                             // perform error handling here
                             });
                             */
                            update: function (data) {
                                return baasicApp.notificationModule.subscriptions.batch.update(data);
                            }
                        }
                    },
                    anonymous: {
                        /**
                         * Returns a promise that is resolved once the create anonymous subscription action has been performed; this action creates a new anonymous subscription resource.
                         * @method subscriptions.anonymous.create
                         * @example 
                         baasicNotificationsService.subscriptions.anonymous.create({
                         channel: '<channel-name>',
                         registrationId: '<registration-id>'
                         })
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         */
                        create: function (data) {
                            return baasicApp.notificationModule.subscriptions.anonymous.create(data);
                        },

                        /**
                         * Returns a promise that is resolved once the find action has been performed. Success response returns a list of anonymous subscription resources matching the given criteria.
                         * @method subscriptions.anonymous.find       
                         * @example 
                         baasicNotificationsService.subscriptions.anonymous.find({
                         pageNumber : 1,
                         pageSize : 10,
                         orderBy : '<field>',
                         orderDirection : '<asc|desc>',
                         search : '<search-phrase>',
                         channels: '<channel-name1>,<channel-name2>',
                         registrationIds: '<registration-id1>,<registration-id2>',
                         embed: '<embed>'
                         })
                         .success(function (collection) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         */
                        find: function (options) {
                            return baasicApp.notificationModule.subscriptions.anonymous.find(options);
                        },

                        /**
                         * Returns a promise that is resolved once the get action has been performed. Success response returns the specified anonymous subscription resource.
                         * @method subscriptions.anonymous.get       
                         * @example 
                         baasicNotificationsService.subscriptions.anonymous.get('<subscription-id>')
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         */
                        get: function (id, options) {
                            return baasicApp.notificationModule.subscriptions.anonymous.get(id, options);
                        },

                        /**
                         * Returns a promise that is resolved once the remove anonymous subscription action has been performed. This action will remove a anonymous subscription resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicNotificationsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                         ```
                         var params = baasicApiService.removeParams(subscription);
                         var uri = params['model'].links('delete').href;
                         ```
                         * @method subscriptions.anonymous.remove        
                         * @example 
                         // subscription is a resource previously fetched using get action.
                         baasicNotificationsService.subscriptions.anonymous.remove(subscription)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         */
                        remove: function (data) {
                            return baasicApp.notificationModule.subscriptions.anonymous.remove(data);
                        },

                        /**
                         * Returns a promise that is resolved once the update anonymous subscription action has been performed; this action updates a anonymous subscription resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicNotificationsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                         ```
                         var params = baasicApiService.updateParams(subscription);
                         var uri = params['model'].links('put').href;
                         ```
                         * @method subscriptions.anonymous.update        
                         * @example 
                         // subscription is a resource previously fetched using get action.
                         subscription.channel = '<channel-name>';
                         baasicNotificationsService.update(subscription)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         */
                        update: function (data) {
                            return baasicApp.notificationModule.subscriptions.anonymous.update(data);
                        },
                        batch: {
                            /**
                             * Returns a promise that is resolved once the create anonymous subscription action has been performed; this action creates new anonymous subscription resources.
                             * @method subscriptions.anonymous.batch.create       
                             * @example 
                             baasicNotificationsService.subscriptions.anonymous.batch.create([{
                             channel: '<channel-name>',
                             registrationId: '<registration-id>'
                             }])
                             .success(function (data) {
                             // perform success action here
                             })
                             .error(function (response, status, headers, config) {
                             // perform error handling here
                             });
                             */
                            create: function (data) {
                                return baasicApp.notificationModule.subscriptions.anonymous.batch.create(data);
                            },

                            /**
                             * Returns a promise that is resolved once the remove action has been performed. This action will remove anonymous subscription resources from the system if successfully completed. 
                             * @method subscriptions.anonymous.batch.remove       
                             * @example 			 
                             baasicNotificationsService.subscriptions.anonymous.batch.remove(subscriptionIds)
                             .success(function (data) {
                             // perform success action here
                             })
                             .error(function (response, status, headers, config) {
                             // perform error handling here
                             });
                             */
                            remove: function (ids) {
                                return baasicApp.notificationModule.subscriptions.anonymous.batch.remove(ids);
                            },

                            /**
                             * Returns a promise that is resolved once the update anonymous subscriptions action has been performed; this action updates specified anonymous subscription resources.
                             * @method subscriptions.anonymous.batch.update       
                             * @example 
                             baasicNotificationsService.subscriptions.anonymous.batch.update(subscriptions)
                             .success(function (data) {
                             // perform success action here
                             })
                             .error(function (response, status, headers, config) {
                             // perform error handling here
                             });
                             */
                            update: function (data) {
                                return baasicApp.notificationModule.subscriptions.anonymous.batch.update(data);
                            }
                        }
                    }
                },
                registrations: {
                    users: {
                        /**
                         * Returns a promise that is resolved once the create user registration action has been performed; this action creates a new user registration resource.
                         * @method registrations.users.create
                         * @example 
                         baasicNotificationsService.registrations.users.create({
                         provider: '<provider-name>',
                         providerData: <provider-data>,
                         userId: '<user-id>'
                         })
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         */
                        create: function (data) {
                            return baasicApp.notificationModule.registrations.users.create(data);
                        },

                        /**
                         * Returns a promise that is resolved once the find action has been performed. Success response returns a list of user registrations resources matching the given criteria.
                         * @method registrations.users.find       
                         * @example 
                         baasicNotificationsService.registrations.users.find({
                         pageNumber : 1,
                         pageSize : 10,
                         orderBy : '<field>',
                         orderDirection : '<asc|desc>',
                         search : '<search-phrase>',
                         providers: '<provider-name1>,<provider-name2>',
                         userIds: '<user-id1>,<user-id2>',
                         embed: '<embed>'
                         })
                         .success(function (collection) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         */
                        find: function (options) {
                            return baasicApp.notificationModule.registrations.users.find(options);
                        },

                        /**
                         * Returns a promise that is resolved once the get action has been performed. Success response returns the specified user registrations resource.
                         * @method registrations.users.get       
                         * @example 
                         baasicNotificationsService.registrations.users.get('<registration-id>')
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         */
                        get: function (id, options) {
                            return baasicApp.notificationModule.registrations.users.get(id, options);
                        },

                        /**
                         * Returns a promise that is resolved once the remove user registrations action has been performed. This action will remove a user registrations resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicNotificationsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                         ```
                         var params = baasicApiService.removeParams(registration);
                         var uri = params['model'].links('delete').href;
                         ```
                         * @method registrations.users.remove        
                         * @example 
                         // registration is a resource previously fetched using get action.
                         baasicNotificationsService.registrations.users.remove(registration)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         */
                        remove: function (data) {
                            return baasicApp.notificationModule.registrations.users.remove(data);
                        },

                        /**
                         * Returns a promise that is resolved once the update user registration action has been performed; this action updates a user registration resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicNotificationsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                         ```
                         var params = baasicApiService.updateParams(subsregistrationcription);
                         var uri = params['model'].links('put').href;
                         ```
                         * @method registrations.users.update        
                         * @example 
                         // registration is a resource previously fetched using get action.
                         registration.provider = '<provider-name>';
                         baasicNotificationsService.registrations.users.update(registration)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         */
                        update: function (data) {
                            return baasicApp.notificationModule.registrations.users.update(data);
                        },
                        batch: {
                            /**
                             * Returns a promise that is resolved once the create user registration action has been performed; this action creates new user registration resources.
                             * @method registrations.users.batch.create       
                             * @example 
                             baasicNotificationsService.registrations.users.batch.create([{
                             provider: '<provider-name>',
                             providerData: <provider-data>,
                             userId: '<user-id>'
                             }])
                             .success(function (data) {
                             // perform success action here
                             })
                             .error(function (response, status, headers, config) {
                             // perform error handling here
                             });
                             */
                            create: function (data) {
                                return baasicApp.notificationModule.registrations.users.batch.create(data);
                            },

                            /**
                             * Returns a promise that is resolved once the remove action has been performed. This action will remove user registration resources from the system if successfully completed. 
                             * @method registrations.users.batch.remove       
                             * @example 			 
                             baasicNotificationsService.registrations.users.batch.remove(subscriptionIds)
                             .success(function (data) {
                             // perform success action here
                             })
                             .error(function (response, status, headers, config) {
                             // perform error handling here
                             });
                             */
                            remove: function (ids) {
                                return baasicApp.notificationModule.registrations.users.batch.remove(ids);
                            },

                            /**
                             * Returns a promise that is resolved once the update user registration action has been performed; this action updates specified user registration resources.
                             * @method registrations.users.batch.update       
                             * @example 
                             baasicNotificationsService.registrations.users.batch.update(registrations)
                             .success(function (data) {
                             // perform success action here
                             })
                             .error(function (response, status, headers, config) {
                             // perform error handling here
                             });
                             */
                            update: function (data) {
                                return baasicApp.notificationModule.registrations.users.batch.update(data);
                            }
                        }
                    },
                    anonymous: {
                        /**
                         * Returns a promise that is resolved once the create anonymous registration action has been performed; this action creates a new anonymous registration resource.
                         * @method registrations.anonymous.create
                         * @example 
                         baasicNotificationsService.registrations.anonymous.create({
                         provider: '<provider-name>',
                         providerdata: <provider-data>,
                         expirationData: '<expiration-date>'
                         })
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         */
                        create: function (data) {
                            return baasicApp.notificationModule.registrations.anonymous.create(data);
                        },

                        /**
                         * Returns a promise that is resolved once the find action has been performed. Success response returns a list of anonymous registration resources matching the given criteria.
                         * @method registrations.anonymous.find       
                         * @example 
                         baasicNotificationsService.registrations.anonymous.find({
                         pageNumber : 1,
                         pageSize : 10,
                         orderBy : '<field>',
                         orderDirection : '<asc|desc>',
                         search : '<search-phrase>',
                         providers: '<provider-name1>,<provider-name2>',
                         embed: '<embed>'
                         })
                         .success(function (collection) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         */
                        find: function (options) {
                            return baasicApp.notificationModule.registrations.anonymous.find(options);
                        },

                        /**
                         * Returns a promise that is resolved once the get action has been performed. Success response returns the specified anonymous registration resource.
                         * @method registrations.anonymous.get       
                         * @example 
                         baasicNotificationsService.registrations.anonymous.get('<registration-id>')
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         */
                        get: function (id, options) {
                            return baasicApp.notificationModule.registrations.anonymous.get(id, options);
                        },

                        /**
                         * Returns a promise that is resolved once the remove anonymous registration action has been performed. This action will remove a anonymous registration resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicNotificationsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                         ```
                         var params = baasicApiService.removeParams(registration);
                         var uri = params['model'].links('delete').href;
                         ```
                         * @method registrations.anonymous.remove        
                         * @example 
                         // registration is a resource previously fetched using get action.
                         baasicNotificationsService.registrations.anonymous.remove(registration)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         */
                        remove: function (data) {
                            return baasicApp.notificationModule.registrations.anonymous.remove(data);
                        },

                        /**
                         * Returns a promise that is resolved once the update anonymous registration action has been performed; this action updates a anonymous registration resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicNotificationsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                         ```
                         var params = baasicApiService.updateParams(registration);
                         var uri = params['model'].links('put').href;
                         ```
                         * @method registrations.anonymous.update        
                         * @example 
                         // registration is a resource previously fetched using get action.
                         subscription.provider = '<provider-name>';
                         baasicNotificationsService.update(registration)
                         .success(function (data) {
                         // perform success action here
                         })
                         .error(function (response, status, headers, config) {
                         // perform error handling here
                         });
                         */
                        update: function (data) {
                            return baasicApp.notificationModule.registrations.anonymous.update(data);
                        },
                        batch: {
                            /**
                             * Returns a promise that is resolved once the create anonymous registration action has been performed; this action creates new anonymous registration resources.
                             * @method registrations.anonymous.batch.create       
                             * @example 
                             baasicNotificationsService.registrations.anonymous.batch.create([{
                             provider: '<provider-name>',
                             providerData: <provider-data>,
                             expirationDate: <expiration-date>
                             }])
                             .success(function (data) {
                             // perform success action here
                             })
                             .error(function (response, status, headers, config) {
                             // perform error handling here
                             });
                             */
                            create: function (data) {
                                return baasicApp.notificationModule.registrations.anonymous.batch.create(data);
                            },

                            /**
                             * Returns a promise that is resolved once the remove action has been performed. This action will remove anonymous registration resources from the system if successfully completed. 
                             * @method registrations.anonymous.batch.remove       
                             * @example 			 
                             baasicNotificationsService.registrations.anonymous.batch.remove(subscriptionIds)
                             .success(function (data) {
                             // perform success action here
                             })
                             .error(function (response, status, headers, config) {
                             // perform error handling here
                             });
                             */
                            remove: function (ids) {
                                return baasicApp.notificationModule.registrations.anonymous.batch.remove(ids);
                            },

                            /**
                             * Returns a promise that is resolved once the update anonymous registration action has been performed; this action updates specified anonymous registration  resources.
                             * @method registrations.anonymous.batch.update       
                             * @example 
                             baasicNotificationsService.registrations.anonymous.batch.update(registrations)
                             .success(function (data) {
                             // perform success action here
                             })
                             .error(function (response, status, headers, config) {
                             // perform error handling here
                             });
                             */
                            update: function (data) {
                                return baasicApp.notificationModule.registrations.anonymous.batch.update(data);
                            }
                        }
                    }
                },
                settings: {
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns the specified setting resource.
                     * @method settings.get       
                     * @example 
                     baasicNotificationsService.settings.get('<provider-name>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     */
                    get: function (provider) {
                        return baasicApp.notificationModule.settings.get(provider);
                    },

                    /**
                     * Returns a promise that is resolved once the update settings action has been performed; this action updates a settings resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicNotificationsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                     ```
                     var params = baasicApiService.updateParams(settings);
                     var uri = params['model'].links('put').href;
                     ```
                     * @method settings.update        
                     * @example 
                     // settings is a resource previously fetched using get action.
                     baasicNotificationsService.update(settings)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     */
                    update: function (data) {
                        return baasicApp.notificationModule.settings.update(data);
                    }
                },

                /**
                 * Provides direct access to `baasicNotificationsRouteService`.
                 * @method
                 * @example baasicNotificationsService.routeService.publish.create({});
                 */
                routeService: baasicApp.notificationModule.routeDefinition
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* exported module */
    /** 
     * @description The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism. An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.security` module functionality it must be added as a dependency to your app.
     * @copyright (c) 2017 Mono Ltd
     * @license MIT
     * @author Mono Ltd
     * @module baasic.security 
     * @example
     (function (Main) {
     'use strict';
     var dependencies = [
     'baasic.api',
     'baasic.membership',
     'baasic.security',
     'baasic.appSettings',
     'baasic.article',
     'baasic.dynamicResource',
     'baasic.keyValue',
     'baasic.valueSet'
     ];
     Main.module = angular.module('myApp.Main', dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */

    var module = angular.module('baasic.security', ['baasic.api']);

    /* globals module */
    /** 
     * @description `baasicRecaptcha` directive allows you to use the reCaptcha inside your project.
     * @module baasicRecaptcha
     * @example <div baasic-recaptcha></div> 
     */
    (function (angular, module, undefined) {
        'use strict';
        module.directive('baasicRecaptcha', ['baasicRecaptchaService', function (recaptchaService) {
            return {
                restrict: 'A',
                link: function (scope, elem) {
                    recaptchaService.create(elem, {
                        theme: 'light'
                    }).then(function (response) {
                        scope.widgetId = response;
                        scope.$on('$destroy', function () {
                            if (recaptchaService) {
                                recaptchaService.destroy(scope.widgetId);
                            }
                        });
                    });
                }
            };
        }]);
    }(angular, module));
    /**
     * @copyright (c) 2017 Mono Ltd
     * @license MIT
     * @author Mono Ltd
     * @overview 
     ***Notes:**
     - To enable reCaptcha, you need to [register for an API key pair](https://www.google.com/recaptcha/admin#list) and configure your Baasic application using the obtained Public and Private Key. Intended module should be assigned to `recaptchaKey` constant which is predefined with Public Key value, while Private Key should be set-up through Application Dashboard under the Application Settings section.
     */


    /* globals module */
    /**
     * @module baasicAuthorizationService
     * @description Baasic Authorization Service provides an easy way to consume Baasic Application Authorization REST API end-points.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicAuthorizationService', ['$rootScope', '$document', 'baasicApp', function ($rootScope, $document, baasicApp) {
            var app = baasicApp.get(),
                apiKey = app.getApiKey();

            angular.element($document).bind('tokenExpired', function () {
                var user = app.getUser();
                if ($rootScope.user !== undefined && user !== undefined) {
                    $rootScope.user.isAuthenticated = user.isAuthenticated();
                }
            });

            return {
                /**
                 * Gets the currently logged in user.
                 * @method        
                 * @example baasicAuthorizationService.getUser();
                 **/
                getUser: function getUser() {
                    var user = app.getUser();
                    if ($rootScope.user === undefined && user.user !== undefined) {
                        $rootScope.user = user.user;
                    }
                    return user.user;
                },
                /**
                 * Sets the current user information. If no user information is provided, the user information will be cleared from the storage and rootScope.
                 * @method        
                 * @example baasicAuthorizationService.setUser(null);
                 **/
                setUser: function setUser(user) {
                    if (user) {
                        app.setUser(user);
                        user.isAuthenticated = true;
                        $rootScope.user = user;
                    } else {
                        app.setUser(null);
                        this.resetPermissions();
                        $rootScope.user = {
                            isAuthenticated: false
                        };
                    }
                },
                /**
                 * Updates current user information with new data.
                 * @method        
                 * @example
                 baasicLoginService.loadUserData()
                 .success(function (data) {
                 // Update user information with refreshed data
                 baasicAuthorizationService.updateUser(data);
                 })
                 .error(function (data) {})
                 .finally (function () {});
                 **/
                updateUser: function updateUser(user) {
                    var currentUser = this.getUser();
                    if (currentUser) {
                        angular.extend(currentUser, user);
                    } else {
                        currentUser = user;
                    }

                    this.setUser(currentUser);
                },
                /**
                 * Retrives current user's access token.
                 * @method        
                 * @example baasicAuthorizationService.getAccessToken();
                 **/
                getAccessToken: function getAccessToken() {
                    return app.getAccessToken();
                },
                /**
                 * Stores access token information.
                 * @method        
                 * @example
                 baasicLoginService.login({
                 username : '<username>',
                 password : '<password>',
                 options : ['session', 'sliding']
                 })
                 .success(function (data) {
                 // Store token information
                 baasicAuthorizationService.updateAccessToken(data);
                 })
                 .error(function (data, status) {})
                 .finally (function () {});
                 **/
                updateAccessToken: function updateAccessToken(token) {
                    return app.updateAccessToken(token);
                },
                /**
                 * Resets user permissions.
                 * @method        
                 * @example
                 baasicLoginService.loadUserData()
                 .success(function (data) {
                 baasicAuthorizationService.resetPermissions();
                 baasicAuthorizationService.updateUser(data);
                 })
                 .error(function (data) {})
                 .finally (function () {});
                 **/
                resetPermissions: function () {
                    app.membershipModule.permissions.resetPermissions();
                },
                /**
                 * Checks if current user has permissions to perform a certain action. To optimize performance this information is cached and can be reset using the resetPermissions action. Permissions cache should be reset when updated user information is set.
                 * @method        
                 * @example baasicAuthorizationService.hasPermission("<baasic-Section>.<action>");				
                 **/
                hasPermission: function (authorization) {
                    return app.membershipModule.permissions.hasPermission(authorization);
                }
            };
        }]);
    }(angular, module));
    /**
     * @copyright (c) 2017 Mono Ltd
     * @license MIT
     * @author Mono Ltd
     */
    /* globals module */
    /**
     * @module baasicPermissionsService
     * @description Baasic Permissions Service provides an easy way to consume Baasic Application Permissions REST API end-points. In order to obtain needed routes `baasicPermissionsService` uses `baasicPermissionsRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicPermissionsService', ['baasicApiHttp', 'baasicApp', 'baasicAuthorizationService', function (baasicApiHttp, baasicApps, authService) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of access policies that match the specified search parameters.
                 * @method        
                 * @example 
                 baasicPermissionsService.find('<section-name>', {
                 search : '<search-phrase>'
                 })
                 .success(function (collection) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                find: function (section, options) {
                    return baasicApp.membershipModule.permissions.find(section, options);
                },
                /**
                 * Returns a promise that is resolved once the getActions action has been performed. Success response returns a list of access policies that match the specified search parameters.
                 * @method        
                 * @example 
                 baasicPermissionsService.getActions({
                 search : '<search-phrase>'
                 })
                 .success(function (collection) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                getActions: function (options) {
                    return baasicApp.membershipModule.permissions.getActions(options);
                },
                /**
                 * Returns a promise that is resolved once the getPermissionSubjects action has been performed. Success response returns a list of matching user and role resources.
                 * @method        
                 * @example 
                 baasicPermissionsService.getPermissionSubjects({
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
                getPermissionSubjects: function (options) {
                    var deferred = baasicApiHttp.createHttpDefer();

                    baasicApp.membershipModule.permissions.getPermissionSubjects(options).then(function (data) {
                        deferred.resolve(data);
                    }, function (data) {
                        deferred.rejact(data);
                    });

                    return deferred.promise;
                },
                /**
                 * Returns a promise that is resolved once the create action has been performed; this action creates a new permission resource.
                 * @method        
                 * @example 
                 // readAction and updateActions are resources previously fetched using getActions.
                 baasicPermissionsService.create({
                 actions : [readAction, updateAction],
                 section : '<section-name>',
                 userName : '<userName>'
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.membershipModule.permissions.create(data);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. If the action is successfully complete, an access policy assigned to the specified role and section will be removed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicPermissionsService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(permission);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // permission is a resource previously fetched using get action.
                 baasicPermissionsService.remove(permission)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.membershipModule.permissions.remove(data);
                },
                /**
                 * Creates a new in-memory permission object.
                 * @method        
                 * @example 
                 // action collection are lookup items fetched using baasicLookupService.get action.
                 var actionCollection;
                 return baasicLookupService.get()
                 .success(function (data) {
                 actionCollection = data;
                 })
                 .error(function (data, status, headers, config) {});
                 // subjectItem is an item fetched using baasicPermissionsService.getPermissionSubjects action.
                 baasicPermissionsService.createPermission('<section-Name>', actionCollection, subjectItem);
                 **/
                createPermission: function (section, actionCollection, membershipItem) {
                    return baasicApp.membershipModule.permissions.createPermission(section, actionCollection, membershipItem);
                },
                /**
                 * Finds a permission in a given permission collection.
                 * @method        
                 * @example baasicPermissionsService.findPermission(permissionObj, permissionCollection);
                 **/
                findPermission: function (permission, permissionCollection) {
                    return baasicApp.membershipModule.permissions.findPermission(permission, permissionCollection);
                },
                /**
                 * Checks if a permission object exists in a given permission collection.
                 * @method        
                 * @example baasicPermissionsService.exists(permissionObj, permissionCollection);
                 **/
                exists: function (permission, permissionCollection) {
                    return baasicApp.membershipModule.permissions.exists(permission, permissionCollection);
                },
                /**
                 * Returns a promise that is resolved once the togglePermission action has been completed. The action will internally either call a `remove` or `create` action based on given criteria.
                 * @method        
                 * @example baasicPermissionsService.togglePermission(permissionObj, action);
                 **/
                togglePermission: function (permission, action) {
                    return baasicApp.membershipModule.permissions.togglePermission(permission, action);
                },
                /**
                 * Fetches and returns and object containing all existing module permissions.
                 * @method        
                 * @example baasicPermissionsService.getModulePermissions('<section-name>');
                 **/
                getModulePermissions: function (section) {
                    return baasicApp.membershipModule.permissions.getModulePermissions(section);
                },
                /**
                 * Provides direct access to `baasicPermissionsRouteService`.
                 * @method        
                 * @example baasicPermissionsService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.membershipModule.permissions.routeDefinition
            };
        }]);
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
    /* globals module, grecaptcha */
    /**
     * @module baasicRecaptchaService
     * @description `baasicRecaptchaService` provides an easy way to consume ReCapctcha REST API end-points. For more information please visit [reCaptcha documentation](https://code.google.com/p/recaptcha/wiki/HowToSetUpRecaptcha).
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicRecaptchaService', ['recaptchaKey', '$q', '$timeout', function (recaptchaKey, $q, $timeout) {
            var wInstances = [];
            var initialize = function (elem, options) {
                var id = elem.attr('id');
                if (!id) {
                    id = 'recaptcha-' + Math.random() * 10000;
                    elem.attr('id', id);
                }

                var response = grecaptcha.render(id, angular.extend({
                    'sitekey': recaptchaKey
                }, options));

                wInstances[response] = elem;
                return response;
            };
            var checkRecaptchaState = function () {
                if (typeof grecaptcha === 'undefined') {
                    return false;
                }
                return true;
            };
            var evaluateRecaptchaState = function (deferred, element, options) {
                if (!checkRecaptchaState()) {
                    $timeout(function () {
                        evaluateRecaptchaState(deferred, element, options);
                    }, 100);
                } else {
                    deferred.resolve(initialize(element, options));
                }
            };

            return {
                /**
                 * Creates a new reCaptcha instance with provided options and injects a reCaptcha DOM onto a given element.
                 * @method        
                 * @example baasicRecaptchaService.create(element, {theme: 'clean'});
                 **/
                create: function (elem, options) {
                    var deferred = $q.defer();
                    evaluateRecaptchaState(deferred, elem, options);
                    return deferred.promise;
                },
                /**
                 * Communicates with reCaptcha service and provides a reCaptcha challenge identifier.
                 * @method        
                 * @example baasicRecaptchaService.challenge();
                 **/
                challenge: function () { /* jshint camelcase: false */
                    return {};
                },
                /**
                 * Communicates with reCaptcha service and returns users response to a reCaptcha challenge.
                 * @method        
                 * @example baasicRecaptchaService.response();
                 **/
                response: function (widgetId) { /* jshint camelcase: false */
                    var result;
                    if (typeof widgetId === 'undefined') {
                        angular.forEach(wInstances, function (value, key) {
                            if (typeof key !== 'undefined') {
                                result = grecaptcha.getResponse(key);
                            }
                        });
                    } else {
                        result = grecaptcha.getResponse(widgetId);
                    }
                    return result;
                },
                /**
                 * Communicates with reCaptcha service and displays a new reCaptcha challenge.
                 * @method        
                 * @example baasicRecaptchaService.reload();
                 **/
                reload: function (widgetId) {
                    var result;
                    if (typeof widgetId === 'undefined') {
                        angular.forEach(wInstances, function (value, key) {
                            if (typeof key !== 'undefined') {
                                result = grecaptcha.reset(key);
                            }
                        });
                    } else {
                        result = grecaptcha.reset(widgetId);
                    }
                    return result;
                },
                /**
                 * Communicates with reCaptcha service and unloads a reCaptcha instance.
                 * @method        
                 * @example baasicRecaptchaService.destroy();
                 **/
                destroy: function (widgetId) {
                    if (typeof widgetId !== 'undefined' && widgetId !== '') {
                        delete wInstances[widgetId];
                    }
                }
            };
        }]);
    }(angular, module));
    /**
     * @copyright (c) 2017 Mono Ltd
     * @license MIT
     * @author Mono Ltd
     */
    /* exported module */
    /** 
     * @description The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism.  An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.templating` module functionality it must be added as a dependency to your app.
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
     * @module baasic.templating
     * @example
     (function (Main) {
     'use strict';
     var dependencies = [
     'baasic.api',
     'baasic.membership',
     'baasic.security',
     'baasic.appSettings',
     'baasic.templating',
     'baasic.dynamicResource',
     'baasic.keyValue',
     'baasic.valueSet'
     ];
     Main.module = angular.module('myApp.Main', dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module('baasic.templating', ['baasic.api']);

    /* globals module */

    /**
     * @module baasicTemplatingService
     * @description Baasic Templating Service provides an easy way to consume Baasic Templating REST API end-points. In order to obtain a needed routes `baasicTemplatingService` uses `baasicTemplatingRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicTemplatingService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of template resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicTemplatingService.find({
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
                    return baasicApp.templatingModule.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified template resource.
                 * @method        
                 * @example 
                 baasicTemplatingService.get('<template-id>')
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.templatingModule.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the create template action has been performed; this action creates a new template resource.
                 * @method        
                 * @example 
                 baasicTemplatingService.create({
                 content : '<content>',
                 templateId : '<template-id>'
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.templatingModule.create(data);
                },
                /**
                 * Returns a promise that is resolved once the update template action has been performed; this action updates a template resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicTemplatingRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(template);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // template is a resource previously fetched using get action.
                 template.content = '<new-content>';
                 baasicTemplatingService.update(template)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.templatingModule.update(data);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a template resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicTemplatingRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(template);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // template is a resource previously fetched using get action.
                 baasicTemplatingService.remove(template)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.templatingModule.remove(data);
                },
                /**
                 * Provides direct access to `baasicKeyValueRouteService`.
                 * @method        
                 * @example baasicTemplatingService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.templatingModule.routeDefinition,
                batch: {
                    /**
                     * Returns a promise that is resolved once the create action has been performed; this action creates new template resources.
                     * @method batch.create       
                     * @example 
                     baasicTemplatingService.batch.create([{
                     content : '<content>',
                     templateId : '<template-id>'
                     }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data) {
                        return baasicApp.templatingModule.batch.create(data);
                    },
                    /**
                     * Returns a promise that is resolved once the update action has been performed; this action updates specified template resources.
                     * @method batch.update       
                     * @example 
                     baasicTemplatingService.batch.update(templates)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApp.templatingModule.batch.update(data);
                    },
                    /**
                     * Returns a promise that is resolved once the remove action has been performed. This action will remove template resources from the system if successfully completed. 
                     * @method batch.remove       
                     * @example 			 
                     baasicTemplatingService.batch.remove(companyIds)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });		
                     **/
                    remove: function (ids) {
                        return baasicApp.templatingModule.batch.remove(ids);
                    }
                }
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* exported module */

    /** 
     * @description The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism. An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.userProfile` module functionality it must be added as a dependency to your app.
     * @copyright (c) 2017 Mono Ltd
     * @license MIT
     * @author Mono Ltd
     * @module baasic.userProfile
     * @example
     (function (Main) {
     "use strict";
     var dependencies = [
     "baasic.api",
     "baasic.membership",
     "baasic.security",
     "baasic.userProfile",
     "baasic.article",
     "baasic.dynamicResource",
     "baasic.keyValue",
     "baasic.valueSet"
     ];
     Main.module = angular.module("myApp.Main", dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module('baasic.userProfile', ['baasic.api']);

    /* globals module */
    /**
     * @module baasicCompanyService
     * @description Baasic Company Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Company Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCompanyService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the create company action has been performed; this action creates a new company resource.
                 * @method        
                 * @example 
                 baasicCompanyService.create({
                 description : '<description>',
                 name : '<name>',
                 slug: '<slug>' 
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.userProfileModule.company.create(data);
                },
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of company resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicCompanyService.find({
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
                    return baasicApp.userProfileModule.company.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the company resource.
                 * @method        
                 * @example 
                 baasicCompanyService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.userProfileModule.company.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a company resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCompanyRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(company);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // company is a resource previously fetched using get action.
                 baasicCompanyService.remove(company)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.userProfileModule.company.remove(data);
                },
                /**
                 * Returns a promise that is resolved once the update company action has been performed; this action updates a company resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCompanyRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(company);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // company is a resource previously fetched using get action.
                 company.description = '<description>';
                 baasicCompanyService.update(company)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.userProfileModule.company.update(data);
                },
                batch: {
                    /**
                     * Returns a promise that is resolved once the create company action has been performed; this action creates new company resources.
                     * @method batch.create       
                     * @example 
                     baasicCompanyService.batch.create([{
                     description : '<description>',
                     name : '<name>',
                     slug: '<slug>' 
                     }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data) {
                        return baasicApp.userProfileModule.company.batch.create(data);
                    },
                    /**
                     * Returns a promise that is resolved once the update company action has been performed; this action updates specified company resources.
                     * @method batch.update       
                     * @example 
                     baasicCompanyService.batch.update(companies)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApp.userProfileModule.company.batch.update(data);
                    },
                    /**
                     * Returns a promise that is resolved once the remove action has been performed. This action will remove company resources from the system if successfully completed. 
                     * @method batch.remove       
                     * @example 			 
                     baasicCompanyService.batch.remove(companyIds)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });		
                     **/
                    remove: function (ids) {
                        return baasicApp.userProfileModule.company.batch.remove(ids);
                    }
                }
            };
        }]);
    }(angular, module));

    /**
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicOrganizationService
     * @description Baasic Organization Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Organization Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicOrganizationService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the create organization action has been performed; this action creates a new organization resource.
                 * @method        
                 * @example 
                 baasicOrganizationService.create({
                 description : '<description>',
                 name : '<name>',
                 slug: '<slug>' 
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.userProfileModule.organization.create(data);
                },
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of organization resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicOrganizationService.find({
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
                    return baasicApp.userProfileModule.organization.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the organization resource.
                 * @method        
                 * @example 
                 baasicOrganizationService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.userProfileModule.organization.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove an organization resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicOrganizationRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(organization);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // organization is a resource previously fetched using get action.
                 baasicOrganizationService.remove(organization)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.userProfileModule.organization.remove(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                 * Returns a promise that is resolved once the update organization action has been performed; this action updates an organization resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicOrganizationRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(organization);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // organization is a resource previously fetched using get action.
                 organization.description = '<description>';
                 baasicOrganizationService.update(organization)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.userProfileModule.organization.update(data);
                },
                batch: {
                    /**
                     * Returns a promise that is resolved once the create organization action has been performed; this action creates new organization resources.
                     * @method batch.create       
                     * @example 
                     baasicOrganizationService.batch.create([{
                     description : '<description>',
                     name : '<name>',
                     slug: '<slug>' 
                     }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data) {
                        return baasicApp.userProfileModule.organization.batch.create(data);
                    },
                    /**
                     * Returns a promise that is resolved once the update organization action has been performed; this action updates specified organization resources.
                     * @method batch.update       
                     * @example 
                     baasicOrganizationService.batch.update(companies)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApp.userProfileModule.organization.batch.update(data);
                    },
                    /**
                     * Returns a promise that is resolved once the remove action has been performed. This action will remove organization resources from the system if successfully completed. 
                     * @method batch.remove       
                     * @example 			 
                     baasicOrganizationService.batch.remove(organizationIds)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });		
                     **/
                    remove: function (ids) {
                        return baasicApp.userProfileModule.organization.batch.remove(ids);
                    }
                }
            };
        }]);
    }(angular, module));

    /**
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicSkillService
     * @description Baasic Skill Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Skill Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicSkillService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the create skill action has been performed; this action creates a new skill resource.
                 * @method        
                 * @example 
                 baasicSkillService.create({
                 description : '<description>',
                 name : '<name>',
                 slug: '<slug>' 
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.userProfileModule.skill.create(data);
                },
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of skill resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicSkillService.find({
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
                    return baasicApp.userProfileModule.skill.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the skill resource.
                 * @method        
                 * @example 
                 baasicSkillService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.userProfileModule.skill.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a skill resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicSkillRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(skill);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // skill is a resource previously fetched using get action.
                 baasicSkillService.remove(skill)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.userProfileModule.skill.remove(data);
                },
                /**
                 * Returns a promise that is resolved once the update skill action has been performed; this action updates a skill resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicSkillRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(skill);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // skill is a resource previously fetched using get action.
                 skill.description = '<description>';
                 baasicSkillService.update(skill)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.userProfileModule.skill.update(data);
                },
                batch: {
                    /**
                     * Returns a promise that is resolved once the create skill action has been performed; this action creates new skill resources.
                     * @method batch.create       
                     * @example 
                     baasicSkillService.batch.create([{
                     description : '<description>',
                     name : '<name>',
                     slug: '<slug>' 
                     }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data) {
                        return baasicApp.userProfileModule.skill.batch.create(data);
                    },
                    /**
                     * Returns a promise that is resolved once the update skill action has been performed; this action updates specified skill resources.
                     * @method batch.update       
                     * @example 
                     baasicSkillService.batch.update(companies)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApp.userProfileModule.skill.batch.update(data);
                    },
                    /**
                     * Returns a promise that is resolved once the remove action has been performed. This action will remove skill resources from the system if successfully completed. 
                     * @method batch.remove       
                     * @example 			 
                     baasicSkillService.batch.remove(skillIds)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });		
                     **/
                    remove: function (ids) {
                        return baasicApp.userProfileModule.skill.batch.remove(ids);
                    }
                }
            };
        }]);
    }(angular, module));

    /**
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicUserEducationService
     * @description Baasic User Education Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic User Education Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserEducationService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the create user education action has been performed; this action creates a new user education resource.
                 * @method        
                 * @example 
                 baasicUserEducationService.create({
                 organizationName : '<organization-name>',
                 summary: '<summary>',
                 userId: '<user-id>' 
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.userProfileModule.profile.education.create(data);
                },
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of user education resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicUserEducationService.find({
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
                    return baasicApp.userProfileModule.profile.education.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the user education resource.
                 * @method        
                 * @example 
                 baasicUserEducationService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.userProfileModule.profile.education.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a user education resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserEducationRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(education);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // education is a resource previously fetched using get action.
                 baasicUserEducationService.remove(education)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.userProfileModule.profile.education.remove(data);
                },
                /**
                 * Returns a promise that is resolved once the update user education action has been performed; this action updates a user education resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserEducationRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(education);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // education is a resource previously fetched using get action.
                 education.degree = '<degree>';
                 baasicUserEducationService.update(education)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.userProfileModule.profile.education.update(data);
                }
            };
        }]);
    }(angular, module));

    /**
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicUserProfileAvatarService
     * @description Baasic Files Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Files Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserProfileAvatarService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
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
                    return baasicApp.userProfileModule.profile.avatar.get(id, options);
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
                    return baasicApp.userProfileModule.profile.avatar.unlink(data, options);
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
                    return baasicApp.userProfileModule.profile.avatar.update(data);
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
                    return baasicApp.userProfileModule.profile.avatar.link(id, data);
                },
                routeService: baasicApp.userProfileModule.profile.avatar.routeDefinition,
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
                        return baasicApp.userProfileModule.profile.avatar.streams.get(data);
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
                        return baasicApp.userProfileModule.profile.avatar.streams.getBlob(data);
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
                        return baasicApp.userProfileModule.profile.avatar.streams.update(data, stream);
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
                        return baasicApp.userProfileModule.profile.avatar.streams.create(id, data, stream);
                    },
                    routeService: baasicApp.userProfileModule.profile.avatar.streams.routeDefinition
                }
            };
        }]);
    }(angular, module));

    /**
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicUserProfileService
     * @description Baasic User Profile Service provides an easy way to consume Baasic User Profile REST API end-points. In order to obtain needed routes `baasicUserProfileService` uses `baasicUserProfileRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserProfileService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of user profile resources matching the given criteria.
                 * @method        
                 * @example 
                 userProfileService.find({
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
                    return baasicApp.userProfileModule.profile.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the user profile resource.
                 * @method        
                 * @example 
                 baasicUserProfileService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.userProfileModule.profile.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the create user profile action has been performed; this action creates a new user profile resource.
                 * @method        
                 * @example 
                 baasicUserProfileService.create({
                 firstName : '<first-name>',
                 lastName : '<last-name>',
                 displayName: '<nick-name>' 
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.userProfileModule.profile.create(data);
                },
                /**
                 * Returns a promise that is resolved once the update user profile action has been performed; this action updates a user profile resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserProfileRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(userProfile);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // userProfile is a resource previously fetched using get action.
                 userProfile.displayName = '<nick-name>';
                 baasicUserProfileService.update(userProfile)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.userProfileModule.profile.update(data);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a user profile resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserProfileRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(userProfile);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // userProfile is a resource previously fetched using get action.
                 baasicUserProfileService.remove(userProfile)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.userProfileModule.profile.remove(data);
                },
                acl: {
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns a list of ACL policies established for the specified user profile resource.
                     * @method acl.get       
                     * @example 
                     baasicUserProfileService.acl.get({id: '<profile-id>'})
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (options) {
                        return baasicApp.userProfileModule.profile.acl.get(options);
                    },
                    /**
                     * Returns a promise that is resolved once the update acl action has been performed, this action creates new ACL policy for the specified user profile resource.
                     * @method acl.update      
                     * @example 
                     var options = {id : '<profile-id>'};
                     var aclObj =  {
                     actionId: '<action-id'>,
                     roleId: '<roleId>',
                     userId: '<userId>'
                     };
                     options[baasicConstants.modelPropertyName] = aclObj;
                     baasicUserProfileService.acl.update(options)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (options) {
                        return baasicApp.userProfileModule.profile.acl.update(options);
                    },
                    /**
                     * Returns a promise that is resolved once the removeByUser action has been performed. This action deletes ACL policy assigned to the specified user and user profile resource.
                     * @method acl.deleteByUser      
                     * @example 
                     baasicUserProfileService.acl.removeByUser('<profile-id>', '<access-action>', '<username>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    removeByUser: function (profileId, action, user, data) {
                        return baasicApp.userProfileModule.profile.acl.removeByUser(profileId, action, user, data);
                    },
                    /**
                     * Returns a promise that is resolved once the removeByRole action has been performed. This action deletes ACL policy assigned to the specified role and user profile resource.
                     * @method acl.deleteByRole      
                     * @example 
                     baasicUserProfileService.acl.removeByRole('<profile-id>', '<access-action>', '<role-name>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    removeByRole: function (profileId, action, role, data) {
                        return baasicApp.userProfileModule.profile.acl.removeByRole(profileId, action, role, data);
                    }
                },
                /**
                 * Provides direct access to `userProfileRouteService`.
                 * @method        
                 * @example baasicUserProfileService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.userProfileModule.profile.routeDefinition
            };
        }]);
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
    /* globals module */
    /**
     * @module baasicUserSkillService
     * @description Baasic User Skill Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic User Skill Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserSkillService', ['baasicApp', function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the create user skill action has been performed; this action creates a new user skill resource.
                 * @method        
                 * @example 
                 baasicUserSkillService.create({
                 skillName : '<skill-name>',  
                 userId: '<user-id>' 
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.userProfileModule.profile.skill.create(data);
                },
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of user skill resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicUserSkillService.find({
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
                    return baasicApp.userProfileModule.profile.skill.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the user skill resource.
                 * @method        
                 * @example 
                 baasicUserSkillService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.userProfileModule.profile.skill.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a user skill resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserSkillRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(skill);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // skill is a resource previously fetched using get action.
                 baasicUserSkillService.remove(skill)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.userProfileModule.profile.skill.remove(data);
                },
                /**
                 * Returns a promise that is resolved once the update user skill action has been performed; this action updates a user skill resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserSkillRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(skill);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // skill is a resource previously fetched using get action.
                 skill.description = '<description>';
                 baasicUserSkillService.update(skill)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.userProfileModule.profile.skill.update(data);
                }
            };
        }]);
    }(angular, module));

    /**
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicUserWorkService
     * @description Baasic User Work Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic User Work Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserWorkService', ['baasicApp', function (baasicApps) {
            return {
                /**
                 * Returns a promise that is resolved once the create user work action has been performed; this action creates a new user work resource.
                 * @method        
                 * @example 
                 baasicUserWorkService.create({
                 companyName : '<company-name>',  
                 userId: '<user-id>' 
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.userProfileModule.profile.work.create(data);
                },
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of user work resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicUserWorkService.find({
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
                    return baasicApp.userProfileModule.profile.work.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the user work resource.
                 * @method        
                 * @example 
                 baasicUserWorkService.get()
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApp.userProfileModule.profile.work.get(id, options);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a user work resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserWorkRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(work);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // work is a resource previously fetched using get action.
                 baasicUserWorkService.remove(work)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.userProfileModule.profile.work.remove(data);
                },
                /**
                 * Returns a promise that is resolved once the update user work action has been performed; this action updates a user work resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicUserWorkRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(work);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // work is a resource previously fetched using get action.
                 work.companyName = '<company-name>';
                 baasicUserWorkService.update(work)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.userProfileModule.profile.work.update(data);
                }
            };
        }]);
    }(angular, module));

    /**
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
    /** 
     * @overview The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism. An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.valueSet` module functionality it must be added as a dependency to your app.
     * @copyright (c) 2017 Mono Ltd
     * @license MIT
     * @author Mono Ltd
     * @module baasic.valueSet
     * @example
     (function (Main) {
     'use strict';
     var dependencies = [
     'baasic.api',
     'baasic.membership',
     'baasic.security',
     'baasic.appSettings',
     'baasic.article',
     'baasic.dynamicResource',
     'baasic.keyValue',
     'baasic.valueSet'
     ];
     Main.module = angular.module('myApp.Main', dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module("baasic.valueSet", ["baasic.api"]);

    module.config(["$provide", function config($provide) {}]);

    /**
     * @module baasicValueSetService
     * @description Baasic Value Set Service provides an easy way to consume Baasic Value Set REST end-points. 
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicValueSetService", ["baasicApp", function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of value set resources matching given criteria.
                 * @method        
                 * @example 
                 baasicValueSetService.find({
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
                    return baasicApp.valueSetModule.find(options);
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified value set resource.
                 * @method        
                 * @example 
                 baasicValueSetService.get('<value-set-name>')
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (setName, options) {
                    return baasicApp.valueSetModule.get(setName, options);
                },
                /**
                 * Returns a promise that is resolved once the create value set action has been performed; this action creates a new value set resource.
                 * @method        
                 * @example 
                 baasicValueSetService.create({
                 name: '<value-set-name>',
                 description: '<description>',
                 values: [{value: '<value>'}]
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApp.valueSetModule.create(data);
                },
                /**
                 * Returns a promise that is resolved once the update value set action has been performed; this action updates a value set resource. 
                 * @method        
                 * @example 
                 // valueSet is a resource previously fetched using get action.
                 valueSet.name = '<new-name>';
                 baasicValueSetService.update(valueSet)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    return baasicApp.valueSetModule.update(data);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will delete a value set resource if the action is completed successfully. 
                 * @method        
                 * @example 
                 // valueSet is a resource previously fetched using get action.
                 baasicValueSetService.remove(valueSet)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    return baasicApp.valueSetModule.remove(data);
                },
                /**
                 * Provides direct access to route definition.
                 * @method        
                 * @example baasicValueSetService.routeService.get('<id>', expandObject);
                 **/
                routeService: baasicApp.valueSetModule.routeDefinition,
                items: {
                    /**
                     * Returns a promise that is resolved once the find action has been performed. Success response returns a list of value set item resources matching given criteria.
                     * @method items.find       
                     * @example 
                     baasicValueSetService.items.find({
                     setName: '<value-set-name>',
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
                        return baasicApp.valueSetModule.items.find(options);
                    },
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns the specified value set item resource.
                     * @method items.get       
                     * @example 
                     baasicValueSetService.items.get('<value-set-name>', '<set-item-id>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (setName, id, options) {
                        return baasicApp.valueSetModule.items.get(setName, id, options);
                    },
                    /**
                     * Returns a promise that is resolved once the create value set item action has been performed; this action creates a new value set item resource.
                     * @method items.create       
                     * @example 
                     baasicValueSetService.items.create({
                     setId: '<value-set-id>',
                     value: '<value>'
                     })
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data) {
                        return baasicApp.valueSetModule.items.create(data);
                    },
                    /**
                     * Returns a promise that is resolved once the update value set item action has been performed; this action updates a value set item resource. 
                     * @method items.update       
                     * @example 
                     // valueSetItem is a resource previously fetched using get action.
                     valueSetItem.value = '<new-value>';
                     baasicValueSetService.items.update(valueSetItem)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        return baasicApp.valueSetModule.items.update(data);
                    },
                    /**
                     * Returns a promise that is resolved once the remove action has been performed. This action will delete a value set item if the action is completed successfully. 
                     * @method items.remove       
                     * @example 
                     // valueSetItem is a resource previously fetched using get action.
                     baasicValueSetService.items.remove(valueSetItem)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    remove: function (data) {
                        return baasicApp.valueSetModule.items.remove(data);
                    }
                }
            };
        }]);
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
}(angular));