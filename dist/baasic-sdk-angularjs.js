/*
 Baasic AngularJS SDK v2.0.0
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
        module.service('baasicApplicationSettingsService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicApplicationSettingsRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, applicationSettingsRouteService) {
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
                    return baasicApiHttp.get(applicationSettingsRouteService.get.expand(baasicApiService.getParams(options))).success(function (appSettings) {
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
                    var params = baasicApiService.updateParams(data);
                    var model = params[baasicConstants.modelPropertyName];
                    return baasicApiHttp.put(model.links('put').href, model);
                },

                routeService: applicationSettingsRouteService
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
     * @module baasicArticleCommentRepliesRouteService
     * @description Baasic Article Comment Replies Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Article Comment Replies Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicArticleCommentRepliesRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are:
                 * - `searchQuery` - A string value used to identify article comment reply resources using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain article comment reply subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the article comment reply property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * - `statuses` - Comma separated list of article comment reply states that specify where search should be done (Allowed states: Approved, Spam, Reported, Flagged and UnApproved).
                 * @method
                 * @example
                 baasicArticleCommentRepliesRouteService.find.expand({
                 searchQuery: '<search-phrase>'
                 });
                 **/
                find: uriTemplateService.parse('article-comment-replies/{?searchQuery,statuses,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get route which can be expanded with additional options. Supported items are:
                 * - `id` - Id which uniquely identifies article comment reply resource that needs to be retrieved.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method 
                 * @example
                 baasicArticleCommentRepliesRouteService.get.expand({
                 id: '<comment-reply-id>'
                 });
                 **/
                get: uriTemplateService.parse('article-comment-replies/{id}/{?embed,fields}'),
                /**
                 * Parses create article comment reply route; this URI template does not support any additional items.                                                
                 * @method
                 * @example 
                 baasicArticleCommentRepliesRouteService.create.expand({});
                 **/
                create: uriTemplateService.parse('article-comment-replies'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicArticleCommentRepliesRouteService.parse(
                 '<route>/{?embed,fields,options}'
                 ).expand(
                 {embed: '<embedded-resource>'}
                 );
                 **/
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicArticleCommentRepliesService
     * @description Baasic Article Comment Replies Service provides an easy way to consume Baasic Article Comment Replies REST API end-points. `baasicArticleCommentRepliesService` functions enable performing standard CRUD operations directly on article comment reply resources, whereas the `baasicArticleService` functions allow management between article and article comment reply. In order to obtain needed routes `baasicArticleCommentRepliesService` uses `baasicArticleCommentRepliesRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicArticleCommentRepliesService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicArticleCommentRepliesRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, articleCommentRepliesRouteService) {
            var commentStatuses = {
                approved: 1,
                spam: 2,
                reported: 4,
                flagged: 8,
                unapproved: 16
            };

            return {
                /**
                 * Contains a reference to valid list of article comment reply states. It returns an object containing all article comment reply states.
                 * @method  
                 * @example baasicArticleCommentRepliesService.statuses.approved;
                 **/
                statuses: commentStatuses,
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
                    var params = baasicApiService.updateParams(data);
                    var commentOptions = baasicApiService.updateParams(options);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-approve').href, commentOptions[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unapprove').href, params[baasicConstants.modelPropertyName]);
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
                    return baasicApiHttp.post(articleCommentRepliesRouteService.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    return baasicApiHttp.get(articleCommentRepliesRouteService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-flag').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unflag').href, params[baasicConstants.modelPropertyName]);
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
                    return baasicApiHttp.get(articleCommentRepliesRouteService.get.expand(baasicApiService.getParams(id, options)));
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                    var params = baasicApiService.updateParams(data);
                    var commentOptions = baasicApiService.updateParams(options);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-report').href, commentOptions[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unreport').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-spam').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unspam').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                /**
                 * Provides direct access to `baasicArticleCommentRepliesRouteService`.
                 * @method        
                 * @example baasicArticleCommentRepliesService.routeService.get.expand(expandObject);
                 **/
                routeService: articleCommentRepliesRouteService
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
     * @module baasicArticleCommentsRouteService
     * @description Baasic Article Comments Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Article Comments Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicArticleCommentsRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are:
                 * - `searchQuery` - A string value used to identify article comment resources using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain article comment subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the article comment property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * - `statuses` - Comma separated list of article comment states that specify where search should be done (Allowed states: Approved, Spam, Reported, Flagged and UnApproved).
                 * @method
                 * @example
                 baasicArticleCommentsRouteService.find.expand({
                 searchQuery: '<search-phrase>'
                 });
                 **/
                find: uriTemplateService.parse('article-comments/{?searchQuery,statuses,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get route which can be expanded with additional options. Supported items are:
                 * - `id` - Id which uniquely identifies article comment resource that needs to be retrieved.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method
                 * @example
                 baasicArticleCommentsRouteService.get.expand({
                 id: '<comment-id>'
                 });
                 **/
                get: uriTemplateService.parse('article-comments/{id}/{?embed,fields}'),
                /**
                 * Parses create route; this URI template doesnt support any additional options.
                 * @method   
                 * @example 
                 baasicArticleCommentsRouteService.create.expand({});
                 **/
                create: uriTemplateService.parse('article-comments/'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicArticleCommentsRouteService.parse(
                 '<route>/{?embed,fields,options}'
                 ).expand(
                 {embed: '<embedded-resource>'}
                 );
                 **/
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicArticleCommentsService
     * @description Baasic Article Comments Service provides an easy way to consume Baasic Article Comments REST API end-points. `baasicArticleCommentsService` functions enable performing standard CRUD operations directly on article comment resources, whereas the `baasicArticleService` functions allow management between article and article comments. In order to obtain needed routes `baasicArticleCommentsService` uses `baasicArticleCommentsRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicArticleCommentsService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicArticleCommentsRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, articleCommentsRouteService) {
            var commentStatuses = {
                approved: 1,
                spam: 2,
                reported: 4,
                flagged: 8,
                unapproved: 16
            };
            return {
                /**
                 * Contains a reference to valid list of article comment states. It returns an object containing all article comment states.
                 * @method      
                 * @example baasicArticleCommentsService.statuses.approved;
                 **/
                statuses: commentStatuses,
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
                    var params = baasicApiService.updateParams(data);
                    var commentOptions = baasicApiService.updateParams(options);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-approve').href, commentOptions[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unapprove').href, params[baasicConstants.modelPropertyName]);
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
                    return baasicApiHttp.post(articleCommentsRouteService.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    return baasicApiHttp.get(articleCommentsRouteService.find.expand(baasicApiService.findParams(options)));
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-flag').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unflag').href, params[baasicConstants.modelPropertyName]);
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
                    return baasicApiHttp.get(articleCommentsRouteService.get.expand(baasicApiService.getParams(id, options)));
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                    var params = baasicApiService.updateParams(data);
                    var commentOptions = baasicApiService.updateParams(options);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-report').href, commentOptions[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unreport').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-spam').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unspam').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                /**
                 * Provides direct access to `baasicArticleCommentsRouteService`.
                 * @method        
                 * @example baasicArticleCommentsService.routeService.get.expand(expandObject);
                 **/
                routeService: articleCommentsRouteService
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
     * @module baasicArticleFilesRouteService
     * @description Baasic Article Files Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Article Files Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicArticleFilesRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing file properties using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain file subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the file property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example 
                 baasicArticleFilesRouteService.find.expand(
                 {searchQuery: '<search-phrase>'}
                 );
                 **/
                find: uriTemplateService.parse('article-files/{?searchQuery,page,rpp,sort,embed,fields}'),

                /**
                 * Parses get route; this route should be expanded with the Id of the file resource.
                 * @method        
                 * @example 
                 baasicArticleFilesRouteService.get.expand(
                 {id: '<file-id>'}
                 );
                 **/
                get: uriTemplateService.parse('article-files/{id}/{?embed,fields}'),

                /**
                 * Parses link route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicArticleFilesRouteService.link.expand({});              
                 **/
                link: uriTemplateService.parse('article-files/link'),

                streams: {
                    /**
                     * Parses get route; this route should be expanded with id of desired file stream. Additional supported items are:
                     * - `width` - width of desired derived image.
                     * - `height` - height of desired derived image.
                     * @method streams.get
                     * @example 
                     baasicArticleFilesRouteService.streams.get.expand(
                     {id: '<filename>'}
                     );
                     **/
                    get: uriTemplateService.parse('article-file-streams/{id}/{?width,height}'),

                    /**
                     * Parses create route; this route should be expanded with the filename which indicates where the stream will be saved.
                     * @method streams.create
                     * @example 
                     baasicArticleFilesRouteService.streams.create.expand(
                     {filename: '<filename>'}
                     );
                     **/
                    create: uriTemplateService.parse('article-file-streams/{filename}/{?articleId}'),

                    /**
                     * Parses update route; this route should be expanded with the id of the previously saved resource. Additional supported items are:
                     * - `width` - width of derived image to update.
                     * - `height` - height of derived image to update.                    
                     * @method streams.update    
                     * @example 
                     baasicArticleFilesRouteService.streams.update.expand(
                     {id: '<filename>'}
                     );
                     **/
                    update: uriTemplateService.parse('article-file-streams/{id}/{?width,height}')

                },

                batch: {
                    /**
                     * Parses unlink route; this URI template does not expose any additional options.                                    
                     * @method batch.unlink       
                     * @example baasicArticleFilesRouteService.batch.unlink.expand({});              
                     **/
                    unlink: uriTemplateService.parse('article-files/batch/unlink'),

                    /**
                     * Parses update route; this URI template does not expose any additional options.
                     * @method batch.update       
                     * @example baasicArticleFilesRouteService.batch.update.expand({});              
                     **/
                    update: uriTemplateService.parse('article-files/batch'),

                    /**
                     * Parses update route; this URI template does not expose any additional options.
                     * @method batch.link       
                     * @example baasicArticleFilesRouteService.batch.link.expand({});              
                     **/
                    link: uriTemplateService.parse('article-files/batch/link')
                },

                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicArticleFilesRouteService.parse(
                 '<route>/{?embed,fields,options}'
                 ).expand(
                 {embed: '<embedded-resource>'}
                 );
                 **/
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicArticleFilesService
     * @description Baasic Files Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Files Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicArticleFilesService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicArticleFilesRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, filesRouteService) {
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
                    return baasicApiHttp.get(filesRouteService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(filesRouteService.get.expand(baasicApiService.getParams(id, options)));
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
                    if (!options) {
                        options = {};
                    }
                    var params = baasicApiService.removeParams(data);
                    var href = filesRouteService.parse(params[baasicConstants.modelPropertyName].links('unlink').href).expand(options);
                    return baasicApiHttp.delete(href);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    return baasicApiHttp.post(filesRouteService.link.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                     baasicArticleFilesService.streams.create('<file-id>', <blob>)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data, stream) {
                        var formData = new FormData();
                        formData.append('file', stream);
                        return baasicApiHttp({
                            transformRequest: angular.identity,
                            url: filesRouteService.streams.create.expand(data),
                            method: 'POST',
                            data: formData,
                            headers: {
                                'Content-Type': undefined
                            }
                        });
                    }
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
                        return baasicApiHttp({
                            url: filesRouteService.batch.unlink.expand({}),
                            method: 'DELETE',
                            data: data
                        });
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
                        return baasicApiHttp.put(filesRouteService.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp.post(filesRouteService.batch.link.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
     * @module baasicArticleRatingsRouteService
     * @description Baasic Article Ratings Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Article Ratings Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicArticleRatingsRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses create article rating route; this URI does not support any additional embed items.
                 * @method     
                 * @example baasicArticleRatingsRouteService.create.expand({});
                 **/
                create: uriTemplateService.parse('article-ratings'),
                /**
                 * Parses find article rating route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing article rating properties using the phrase or BQL (Baasic Query Language) search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain article rating subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the article rating property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example 
                 baasicArticleRatingsRouteService.find.expand(
                 {searchQuery: '<search-phrase>'}
                 );
                 **/
                find: uriTemplateService.parse('article-ratings/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses findByUser article rating route which can be expanded with additional options. Supported items are: 
                 * - `username` - A value that uniquely identifies a user which has created an article rating.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain article rating subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the article rating property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example 
                 baasicArticleRatingsRouteService.find.expand(
                 {username: '<username>'}
                 );
                 **/
                findByUser: uriTemplateService.parse('article-ratings/{?username,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get article rating route which must be expanded with the Id of the previously created article rating resource in the system. Additional expand supported items are:
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example 
                 baasicArticleRatingsRouteService.get.expand(
                 {id: '<articleRating-id>'}
                 );
                 **/
                get: uriTemplateService.parse('article-ratings/{id}/{?embed,fields}'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicArticleRatingsRouteService.parse(
                 '<route>/{?embed,fields,options}'
                 ).expand(
                 {embed: '<embedded-resource>'}
                 );
                 **/
                parse: uriTemplateService.parse
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
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicArticleRatingsService
     * @description Baasic Article Ratings Service provides an easy way to consume Baasic Article Ratings REST API end-points. `baasicArticleRatingsService` functions enable performing standard CRUD operations directly on article rating resources, whereas the `baasicArticleService` functions allow management between article and article rating. In order to obtain needed routes `baasicArticleRatingsService` uses `baasicArticleRatingsRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicArticleRatingsService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicArticleRatingsRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, articleRatingsRouteService) {
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
                    return baasicApiHttp.post(articleRatingsRouteService.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    return baasicApiHttp.get(articleRatingsRouteService.find.expand(baasicApiService.findParams(options)));
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
                    var params = angular.extend({}, options);
                    params.username = username;
                    return baasicApiHttp.get(articleRatingsRouteService.findByUser.expand(baasicApiService.findParams(params)));
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
                    return baasicApiHttp.get(articleRatingsRouteService.get.expand(baasicApiService.getParams(id, options)));
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                 * Provides direct access to `baasicArticleRatingsRouteService`.
                 * @method        
                 * @example baasicArticleRatingsService.routeService.get.expand(expandObject);
                 **/
                routeService: articleRatingsRouteService
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
     * @module baasicArticleRouteService
     * @description Baasic Article Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Article Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicArticleRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find article route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing article properties using the phrase or BQL (Baasic Query Language) search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain article subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the article property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * - `startDate` - A value used to specify the article creation, publish or archive date date starting from which article resource collection should be returned.
                 * - `endDate` - A value used to specify the article creation, publish or archive date until (and including) which article resource collection should be returned.
                 * - `statuses` - Comma separated list of article statuses that specify where search should be done (Allowed statuses: Published, Draft and Archived).
                 * -  `tags` - A value used to restrict the search to article resources with these tags. Multiple tags should be comma separated.        				
                 * @method        
                 * @example 
                 baasicArticleRouteService.find.expand(
                 {searchQuery: '<search-phrase>'}
                 );
                 **/
                find: uriTemplateService.parse('articles/{?searchQuery,page,rpp,sort,embed,fields,statuses,tags,startDate,endDate}'),
                /**
                 * Parses get article route which must be expanded with the Id of the previously created article resource in the system. Additional expand supported items are:
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example 
                 baasicArticleRouteService.get.expand(
                 {id: '<article-id>'}
                 );
                 **/
                get: uriTemplateService.parse('articles/{id}/{?embed,fields}'),
                /**
                 * Parses publish article route which must be expanded with the Id of the previously created article resource in the system.
                 * @method        
                 * @example 
                 baasicArticleRouteService.publish.expand(
                 {id: '<article-id>'}
                 );
                 **/
                publish: uriTemplateService.parse('articles/{id}/publish/'),
                /**
                 * Parses purge article route, this URI template doesn't expose any additional properties.
                 * @method        
                 * @example baasicArticleRouteService.purge.expand({});               
                 **/
                purge: uriTemplateService.parse('articles/purge/'),
                /**
                 * Parses create article route; this URI template doesn't expose any additional properties.
                 * @method        
                 * @example baasicArticleRouteService.create.expand({});               
                 **/
                create: uriTemplateService.parse('articles'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicArticleRouteService.parse(
                 '<route>/{?embed,fields,options}'
                 ).expand(
                 {embed: '<embedded-resource>'}
                 );
                 **/
                parse: uriTemplateService.parse,
                subscriptions: {
                    articleModule: {
                        /**
                         * Parses article module subscribe route which doesn't support any additional options.
                         * @method subscriptions.articleModule.subscribe
                         * @example baasicArticleRouteService.subscriptions.articleModule.subscribe.expand({});   
                         **/
                        subscribe: uriTemplateService.parse('articles/subscriptions'),
                        /**
                         * Parses article module isSubscribed route which must be expanded with subscriber Id
                         * @method subscriptions.articleModule.isSubscribed
                         * @example baasicArticleRouteService.subscriptions.articleModule.isSubscribed.expand({subscriberId: '<subscriber-id>'});   
                         **/
                        isSubscribed: uriTemplateService.parse('articles/subscriptions/{subscriberId}'),
                        /**
                         * Parses article module unSubscribe route which doesn't support any additional options.
                         * @method subscriptions.articleModule.unSubscribe
                         * @example baasicArticleRouteService.subscriptions.articleModule.unSubscribe.expand({});   
                         **/
                        unSubscribe: uriTemplateService.parse('articles/subscriptions'),
                    },
                    article: {
                        /**
                         * Parses article subscribe route which must be expanded with id of the article.
                         * @method subscriptions.article.subscribe
                         * @example 
                         baasicArticleRouteService.subscriptions.article.subscribe.expand(
                         {id: '<article-id>'}
                         );
                         **/
                        subscribe: uriTemplateService.parse('articles/{id}/subscriptions'),
                        /**
                         * Parses article isSubscribed route which must be expanded with subscriber Id and the id of the article.
                         * @method subscriptions.article.isSubscribed
                         * @example 
                         baasicArticleRouteService.subscriptions.article.isSubscribed.expand({
                         id: '<article-id>', 
                         subscriberId: '<subscriber-id>'
                         });
                         **/
                        isSubscribed: uriTemplateService.parse('articles/{id}/subscriptions/{subscriberId}'),
                        /**
                         * Parses article unSubscribe route which must be expanded with the id of the article.
                         * @method subscriptions.articleModule.unSubscribe
                         * @example 
                         baasicArticleRouteService.subscriptions.article.unSubscribe.expand(
                         {id: '<article-id>'}
                         );
                         **/
                        unSubscribe: uriTemplateService.parse('articles/{id}/subscriptions'),
                    },
                    commentReported: {
                        /**
                         * Parses commentReported subscribe route which doesn't support any additional options.
                         * @method subscriptions.commentReported.subscribe
                         * @example baasicArticleRouteService.subscriptions.commentReported.subscribe.expand({});
                         **/
                        subscribe: uriTemplateService.parse('articles/subscriptions/comment-reported'),
                        /**
                         * Parses commentReported isSubscribed route which must be expanded with subscriber Id.
                         * @method subscriptions.commentReported.isSubscribed
                         * @example 
                         baasicArticleRouteService.subscriptions.article.isSubscribed.expand({
                         subscriberId: '<subscriber-id>'
                         });
                         **/
                        isSubscribed: uriTemplateService.parse('articles/subscriptions/comment-reported/{subscriberId}'),
                        /**
                         * Parses commentReported unSubscribe route which doesn't support any additional options.
                         * @method subscriptions.commentReported.unSubscribe
                         * @example baasicArticleRouteService.subscriptions.article.unSubscribe.expand({})
                         **/
                        unSubscribe: uriTemplateService.parse('articles/subscriptions/comment-reported'),
                    },
                    commentRequiresModeration: {
                        /**
                         * Parses commentRequiresModeration subscribe route which doesn't support any additional options.
                         * @method subscriptions.commentRequiresModeration.subscribe
                         * @example baasicArticleRouteService.subscriptions.commentRequiresModeration.subscribe.expand({});
                         **/
                        subscribe: uriTemplateService.parse('articles/subscriptions/comment-requires-moderation'),
                        /**
                         * Parses commentRequiresModeration isSubscribed route which must be expanded with subscriber Id.
                         * @method subscriptions.commentRequiresModeration.isSubscribed
                         * @example 
                         baasicArticleRouteService.subscriptions.commentRequiresModeration.isSubscribed.expand({
                         subscriberId: '<subscriber-id>'
                         });
                         **/
                        isSubscribed: uriTemplateService.parse('articles/subscriptions/comment-requires-moderation/{subscriberId}'),
                        /**
                         * Parses commentRequiresModeration unSubscribe route which doesn't support any additional options.
                         * @method subscriptions.commentRequiresModeration.unSubscribe
                         * @example baasicArticleRouteService.subscriptions.commentRequiresModeration.unSubscribe.expand({})
                         **/
                        unSubscribe: uriTemplateService.parse('articles/subscriptions/comment-requires-moderation'),
                    }
                },
                ratings: {
                    /**
                     * Parses get article rating route which must be expanded with the Id of the previously created article rating resource in the system and the ArticleId. Additional expand supported items are:
                     * - `embed` - Comma separated list of resources to be contained within the current representation.
                     * @method        
                     * @example 
                     baasicArticleRouteService.ratings.get.expand(
                     {
                     articleId: '<article-id>'
                     id: '<articleRating-id>'
                     }
                     );               
                     **/
                    get: uriTemplateService.parse('articles/{articleId}/ratings/{id}/{?embed,fields}'),
                    /**
                     * Parses find article rating route which can be expanded with additional options. Supported items are: 
                     * - `articleId` - Id of the article.
                     * - `page` - A value used to set the page number, i.e. to retrieve certain article rating subset from the storage.
                     * - `rpp` - A value used to limit the size of result set per page.
                     * - `sort` - A string used to set the article rating property to sort the result collection by.
                     * - `embed` - Comma separated list of resources to be contained within the current representation.
                     * @method ratings.find       
                     * @example 
                     baasicArticleRouteService.ratings.find.expand(
                     {articleId: '<article-id>'}
                     );
                     **/
                    find: uriTemplateService.parse('articles/{articleId}/ratings{?page,rpp,sort,embed,fields}'),
                    /**
                     * Parses findByUser article rating route which can be expanded with additional options. Supported items are: 
                     * - `articleId` - Id of the article.
                     * - `username` - A value that uniquely identifies a user which has created an article rating.
                     * - `embed` - Comma separated list of resources to be contained within the current representation.
                     * @method ratings.findByUsername       
                     * @example 
                     baasicArticleRouteService.ratings.findByUsername.expand({
                     articleId: '<article-id>', 
                     username: '<username>'
                     });
                     **/
                    findByUsername: uriTemplateService.parse('articles/{articleId}/users/{username}/ratings/{?embed,fields}'),
                    /**
                     * Parses create article rating route; this URI template should be expanded with the Id of the article.
                     * @method ratings.create       
                     * @example 
                     baasicArticleRouteService.ratings.create.expand(
                     {articleId: '<article-id>'}
                     );
                     **/
                    create: uriTemplateService.parse('articles/{articleId}/ratings/'),
                    /**
                     * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                     * @method ratings.parse
                     * @example 
                     baasicArticleRouteService.ratings.parse(
                     '<route>/{?embed,fields,options}'
                     ).expand(
                     {embed: '<embedded-resource>'}
                     );
                     **/
                    parse: uriTemplateService.parse
                },
                tags: {
                    /**
                     * Parses find article tags route which can be expanded with additional options. Supported items are: 
                     * - `id` - Id of the article.
                     * - `searchQuery` - A string value used to identify article tag resources using the phrase search.
                     * - `page` - A value used to set the page number, i.e. to retrieve certain article tag subset from the storage.
                     * - `rpp` - A value used to limit the size of result set per page.
                     * - `sort` - A string used to set the article tag property to sort the result collection by.
                     * - `embed` - Comma separated list of resources to be contained within the current representation.
                     * @method tags.find       
                     * @example 
                     baasicArticleRouteService.tags.find.expand({
                     id: '<article-id>', 
                     searchQuery: '<search-phrase>'
                     });
                     **/
                    find: uriTemplateService.parse('articles/{id}/tags/{?searchQuery,page,rpp,sort,embed,fields}'),
                    /**
                     * Parses get article tags route which can be expanded with additional options. Supported items are: 
                     * - `id` - Id of the article.					
                     * - `tag` - Article slug which uniquely identifies article tag resource that needs to be retrieved.
                     * - `embed` - Comma separated list of resources to be contained within the current representation.
                     * @method tags.get       
                     * @example 
                     baasicArticleRouteService.tags.get.expand({
                     id: '<article-id>', 
                     tag: '<tag>'
                     });
                     **/
                    get: uriTemplateService.parse('articles/{id}/tags/{tag}/{?embed,fields}'),
                    /**
                     * Parses create article tag route; this URI template should be expanded with the tag and Id of the article.
                     * @method tags.create       
                     * @example 
                     baasicArticleRouteService.tags.create.expand({
                     id: '<article-id>', 
                     tag: '<tag>'
                     });
                     **/
                    create: uriTemplateService.parse('articles/{id}/tags/{tag}/'),
                    /**
                     * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                     * @method tags.parse
                     * @example 
                     baasicArticleRouteService.tags.parse(
                     '<route>/{?embed,fields,options}'
                     ).expand(
                     {embed: '<embedded-resource>'}
                     );
                     **/
                    parse: uriTemplateService.parse
                },
                comments: {
                    /**
                     * Parses find article comments route which can be expanded with additional options. Supported items are:
                     * - `articleId` - Id of the article.
                     * - `searchQuery` - A string value used to identify article comment resources using the phrase search.
                     * - `page` - A value used to set the page number, i.e. to retrieve certain article comment subset from the storage.
                     * - `rpp` - A value used to limit the size of result set per page.
                     * - `sort` - A string used to set the article comment property to sort the result collection by.
                     * - `embed` - Comma separated list of resources to be contained within the current representation.
                     * - `statuses` - Comma separated list of article comment states that specify where search should be done (Allowed states: Approved, Spam, Reported, Flagged and UnApproved).
                     * @method comments.find
                     * @example
                     baasicArticleRouteService.comment.find.expand({
                     articleId: '<article-id>',
                     searchQuery: '<search-phrase>'
                     });
                     **/
                    find: uriTemplateService.parse('articles/{articleId}/comments/{?searchQuery,statuses,page,rpp,sort,embed,fields}'),
                    /**
                     * Parses get article comments route which can be expanded with additional options. Supported items are:
                     * - `articleId` - Id of the article.
                     * - `id` - Id which uniquely identifies article comment resource that needs to be retrieved.
                     * - `embed` - Comma separated list of resources to be contained within the current representation.
                     * @method comments.get
                     * @example
                     baasicArticleRouteService.comments.get.expand({
                     articleId: '<article-id>',
                     id: '<comment-id>'
                     });
                     **/
                    get: uriTemplateService.parse('articles/{articleId}/comments/{id}/{?embed,fields}'),
                    /**
                     * Parses create article comments route; this URI template should be expanded with the Id of the article.
                     * @method comments.create       
                     * @example 
                     baasicArticleRouteService.comments.create.expand({
                     id: '<article-id>'
                     });
                     **/
                    create: uriTemplateService.parse('articles/{articleId}/comments/'),
                    /**
                     * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                     * @method comments.parse
                     * @example 
                     baasicArticleRouteService.comments.parse(
                     '<route>/{?embed,fields,options}').expand({
                     embed: '<embedded-resource>'
                     });
                     **/
                    parse: uriTemplateService.parse,
                    replies: {
                        /**
                         * Parses find article comment replies route which can be expanded with additional options. Supported items are:
                         * - `articleId` - Id of the article.
                         * - `commentId` - Id of the parent comment.
                         * - `searchQuery` - A string value used to identify article comment reply resources using the phrase search.
                         * - `page` - A value used to set the page number, i.e. to retrieve certain article comment reply subset from the storage.
                         * - `rpp` - A value used to limit the size of result set per page.
                         * - `sort` - A string used to set the article comment reply property to sort the result collection by.
                         * - `embed` - Comma separated list of resources to be contained within the current representation.
                         * - `statuses` - Comma separated list of article comment reply states that specify where search should be done (Allowed states: Approved, Spam, Reported, Flagged and UnApproved).
                         * @method comments.replies.find
                         * @example
                         baasicArticleRouteService.comment.replies.find.expand({
                         articleId: '<article-id>',
                         commentId: '<comment-id>',
                         searchQuery: '<search-phrase>'
                         });
                         **/
                        find: uriTemplateService.parse('articles/{articleId}/comments/{commentId}/replies/{?searchQuery,statuses,page,rpp,sort,embed,fields}'),
                        /**
                         * Parses get article comment reply route which can be expanded with additional options. Supported items are:
                         * - `articleId` - Id of the article.
                         * - `commentId` - Id of the parent comment.
                         * - `id` - Id which uniquely identifies article comment reply resource that needs to be retrieved.
                         * - `embed` - Comma separated list of resources to be contained within the current representation.
                         * @method comments.replies.get
                         * @example
                         baasicArticleRouteService.comments.replies.get.expand({
                         articleId: '<article-id>',
                         commentId: '<comment-id>',
                         id: '<comment-reply-id>'
                         });
                         **/
                        get: uriTemplateService.parse('articles/{articleId}/comments/{commentId}/replies/{id}/{?embed,fields}'),
                        /**
                         * Parses create article comment reply route; this URI template should be expanded with the:
                         * - `articleId` - Id of the article.
                         * - `commentId` - Id of the parent comment.                        
                         * @method comments.replies.create       
                         * @example 
                         baasicArticleRouteService.comments.replies.create.expand({
                         articleId: '<article-id>',
                         commentId: '<comment-id>'  
                         });
                         **/
                        create: uriTemplateService.parse('articles/{articleId}/comments/{commentId}/replies'),
                        /**
                         * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                         * @method comments.replies.parse
                         * @example 
                         baasicArticleRouteService.comments.replies.parse(
                         '<route>/{?embed,fields,options}').expand({
                         embed : '<embedded-resource>'
                         });
                         **/
                        parse: uriTemplateService.parse,
                    }
                },
                files: {
                    /**
                     * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                     * @method files.parse
                     * @example 
                     baasicArticleRouteService.files.parse(
                     '<route>/{?embed,fields,options}').expand({
                     embed : '<embedded-resource>'
                     });
                     **/
                    parse: uriTemplateService.parse,
                    /**
                     * Parses find route which should be expanded with articleId additionally it can be expanded with additional options. Supported items are: 
                     * - `searchQuery` - A string referencing file properties using the phrase search.
                     * - `page` - A value used to set the page number, i.e. to retrieve certain file subset from the storage.
                     * - `rpp` - A value used to limit the size of result set per page.
                     * - `sort` - A string used to set the file property to sort the result collection by.
                     * - `embed` - Comma separated list of resources to be contained within the current representation.
                     * @method files.find
                     * @example 
                     baasicArticleRouteService.files.find.expand(
                     {
                     articleId: '<article-id>',
                     searchQuery: '<search-phrase>'
                     }
                     );
                     **/
                    find: uriTemplateService.parse('articles/{articleId}/files/{?searchQuery,page,rpp,sort,embed,fields}'),
                    /**
                     * Parses get route; this route should be expanded with the Id of the file resource and parent articleId.
                     * @method files.get     
                     * @example 
                     baasicArticleRouteService.get.expand(
                     {
                     articleId: '<article-id>',
                     id: '<file-id>'
                     }
                     );
                     **/
                    get: uriTemplateService.parse('articles/{articleId}/files/{id}/{?embed,fields}'),

                    /**
                     * Parses link route; this URI template should be expanded with the parent articleId.
                     * @method files.link      
                     * @example baasicArticleRouteService.link.expand({articleId: '<article-id>'});              
                     **/
                    link: uriTemplateService.parse('articles/{articleId}/files/link'),

                    streams: {
                        /**
                         * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                         * @method files.streams.parse
                         * @example 
                         baasicArticleRouteService.files.streams.parse(
                         '<route>/{?embed,fields,options}').expand({
                         embed : '<embedded-resource>'
                         });
                         **/
                        parse: uriTemplateService.parse,
                        /**
                         * Parses get route; this route should be expanded with id of desired file stream and parent articleId. Additional supported items are:
                         * - `width` - width of desired derived image.
                         * - `height` - height of desired derived image.
                         * @method files.streams.get
                         * @example 
                         baasicArticleRouteService.streams.get.expand(
                         {
                         id: '<filename>',
                         articleId: '<article-id>'
                         },
                         );
                         **/
                        get: uriTemplateService.parse('articles/{articleId}/file-streams/{id}/{?width,height}'),

                        /**
                         * Parses create route; this route should be expanded with the filename which indicates where the stream will be saved and additionally it should be expanded with parent articleId.
                         * @method files.streams.create
                         * @example 
                         baasicArticleRouteService.streams.create.expand(
                         {
                         filename: '<filename>',
                         articleId: '<article-id>'
                         }
                         );
                         **/
                        create: uriTemplateService.parse('articles/{articleId}/file-streams/{filename}'),

                        /**
                         * Parses update route; this route should be expanded with the id of the previously saved resource and parent articleId. Additional supported items are:
                         * - `width` - width of derived image to update.
                         * - `height` - height of derived image to update.                    
                         * @method files.streams.update    
                         * @example 
                         baasicArticleRouteService.streams.update.expand(
                         {
                         id: '<filename>',
                         articleId: '<article-id>'
                         }
                         );
                         **/
                        update: uriTemplateService.parse('articles/{articleId}/file-streams/{id}/{?width,height}')
                    },
                    batch: {
                        /**
                         * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                         * @method files.batch.parse
                         * @example 
                         baasicArticleRouteService.files.streams.parse(
                         '<route>/{?embed,fields,options}').expand({
                         embed : '<embedded-resource>'
                         });
                         **/
                        parse: uriTemplateService.parse,
                        /**
                         * Parses unlink route; this URI template should be expanded with parent articleId.                                    
                         * @method files.batch.unlink       
                         * @example baasicArticleRouteService.files..batch.unlink.expand({articleId: '<article-id>'});              
                         **/
                        unlink: uriTemplateService.parse('articles/{articleId}/files/batch/unlink'),

                        /**
                         * Parses update route; this URI template should be expanded with parent articleId.
                         * @method files.batch.update       
                         * @example baasicArticleRouteService.files.batch.update.expand({articleId: '<article-id>'});              
                         **/
                        update: uriTemplateService.parse('articles/{articleId}/files/batch'),

                        /**
                         * Parses update route; this URI template should be expanded with parent articleId.
                         * @method files.batch.link       
                         * @example baasicArticleRouteService.files.batch.link.expand({articleId: '<article-id>'});              
                         **/
                        link: uriTemplateService.parse('articles/{articleId}/files/batch/link')
                    }
                },
                acl: {
                    /**
                     * Parses get article acl route; this URI template should be expanded with the Id of the article.					
                     * @method acl.get       
                     * @example 
                     baasicArticleRouteService.acl.get.expand(
                     {id: '<article-id>'}
                     );
                     **/
                    get: uriTemplateService.parse('articles/{id}/acl/{?fields}'),
                    /**
                     * Parses update article acl route; this URI template should be expanded with the Id of the article.					
                     * @method acl.update       
                     * @example 
                     baasicArticleRouteService.acl.update.expand(
                     {id: '<article-id>'}
                     );
                     **/
                    update: uriTemplateService.parse('articles/{id}/acl/{?fields}'),
                    /**
                     * Parses deleteByUser article acl route which can be expanded with additional options. Supported items are:
                     * - `id` - Id of the article.
                     * - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified user and article resource.
                     * - `user` - A value which uniquely identifies user for which ACL policy needs to be removed.					
                     * @method acl.deleteByUser       
                     * @example 
                     baasicArticleRouteService.acl.deleteByUser.expand({
                     id: '<article-id>', 
                     accessAction: '<access-action>', 
                     user: '<username>'
                     });
                     **/
                    deleteByUser: uriTemplateService.parse('articles/{id}/acl/actions/{accessAction}/users/{user}/'),
                    /**
                     * Parses deleteByUser article acl route which can be expanded with additional options. Supported items are:
                     * - `id` - Id of the article.
                     * - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified role and article resource.
                     * - `role` - A value which uniquely identifies role for which ACL policy needs to be removed.					
                     * @method acl.deleteByRole       
                     * @example 
                     baasicArticleRouteService.acl.deleteByRole.expand({
                     id: '<article-id>', 
                     accessAction: '<access-action>', 
                     role: '<role-name>'
                     });
                     **/
                    deleteByRole: uriTemplateService.parse('articles/{id}/acl/actions/{accessAction}/roles/{role}/')
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
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicArticleService
     * @description Baasic Articles Service provides an easy way to consume Baasic Articles REST API end-points. In order to obtain needed routes `baasicArticleService` uses `baasicArticleRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicArticleService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicArticleRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, articleRouteService) {
            // https://github.com/yvg/js-replace-diacritics/blob/master/replace-diacritics.js
            var alphabet = {
                a: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/ig,
                aa: /[\uA733]/ig,
                ae: /[\u00E6\u01FD\u01E3]/ig,
                ao: /[\uA735]/ig,
                au: /[\uA737]/ig,
                av: /[\uA739\uA73B]/ig,
                ay: /[\uA73D]/ig,
                b: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/ig,
                c: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/ig,
                d: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/ig,
                dz: /[\u01F3\u01C6]/ig,
                e: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/ig,
                f: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/ig,
                g: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/ig,
                h: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/ig,
                hv: /[\u0195]/ig,
                i: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/ig,
                j: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/ig,
                k: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/ig,
                l: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/ig,
                lj: /[\u01C9]/ig,
                m: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/ig,
                n: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/ig,
                nj: /[\u01CC]/ig,
                o: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/ig,
                oi: /[\u01A3]/ig,
                ou: /[\u0223]/ig,
                oo: /[\uA74F]/ig,
                p: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/ig,
                q: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/ig,
                r: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/ig,
                s: /[\u0073\u24E2\uFF53\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/ig,
                ss: /[\u00DF\u1E9E]/ig,
                t: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/ig,
                tz: /[\uA729]/ig,
                u: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/ig,
                v: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/ig,
                vy: /[\uA761]/ig,
                w: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/ig,
                x: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/ig,
                y: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/ig,
                z: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/ig,
                '': /[\u0300\u0301\u0302\u0303\u0308]/ig
            };

            function replaceDiacritics(str) {
                for (var letter in alphabet) {
                    str = str.replace(alphabet[letter], letter);
                }
                return str;
            }

            var statuses = {
                none: 0,
                published: 2,
                draft: 1,
                archive: 4
            };

            var commentStatuses = {
                approved: 1,
                spam: 2,
                reported: 4,
                flagged: 8,
                unapproved: 16
            };

            function toSlug(str) {
                if (angular.isUndefined(str) || str === null || str === '') {
                    return str;
                }
                str = replaceDiacritics(str);
                str = str.toLowerCase();
                str = str.replace(/[^a-z0-9]+/g, '-');
                str = str.replace(/^-|-$/g, '');
                return str;
            }

            function updateSlug(resource) {
                var newSlug = toSlug(resource.slug);
                if (angular.isUndefined(newSlug) || newSlug === null || newSlug === '') {
                    newSlug = toSlug(resource.title);
                }

                if (!angular.isUndefined(newSlug) || newSlug !== null || newSlug !== '') {
                    if (!angular.equals(resource.slug, newSlug)) {
                        resource.slug = newSlug;
                    }
                }
            }

            return {
                /**
                 * Contains a reference to valid list of article statuses. It returns an object containing all article statuses: `{ draft: 1, published: 2, archive: 4 }`
                 * @method        
                 * @example baasicArticleService.statuses.archive;
                 **/
                statuses: statuses,
                /**
                 * Parses article object and updates slug of an article.
                 * @method        
                 * @example baasicArticleService.updateSlug(article);
                 **/
                updateSlug: updateSlug,
                /**
                 * Generates and returns a valid slug url string.
                 * @method        
                 * @example baasicArticleService.toSlug('<slug>');
                 **/
                toSlug: toSlug,
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
                    function getStartDate() {
                        if (!angular.isUndefined(options.startDate) && options.startDate !== null) {
                            return options.startDate.toISOString();
                        }
                        return undefined;
                    }

                    function getEndDate() {
                        if (!angular.isUndefined(options.endDate) && options.endDate !== null) {
                            return options.endDate.toISOString();
                        }
                        return undefined;
                    }

                    var params = baasicApiService.findParams(options);
                    params.startDate = getStartDate();
                    params.endDate = getEndDate();
                    return baasicApiHttp.get(articleRouteService.find.expand(params));
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
                    return baasicApiHttp.get(articleRouteService.get.expand(baasicApiService.getParams(id, options)));
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
                    return baasicApiHttp.post(articleRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                    var params = baasicApiService.updateParams(data);
                    var articleOptions = baasicApiService.updateParams(options);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('archive').href, articleOptions[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('restore').href);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('unpublish').href);
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
                    var params = baasicApiService.updateParams(articleOptions);
                    return baasicApiHttp.put(articleRouteService.publish.expand(baasicApiService.getParams(article)), params[baasicConstants.modelPropertyName]);
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
                    return baasicApiHttp.delete(articleRouteService.purge.expand(options));
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
                            return baasicApiHttp.post(articleRouteService.subscriptions.articleModule.subscribe.expand(data), data);
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
                            return baasicApiHttp.get(articleRouteService.subscriptions.articleModule.isSubscribed.expand(data));
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
                            return baasicApiHttp({
                                url: articleRouteService.subscriptions.articleModule.unSubscribe.expand(data),
                                method: 'DELETE',
                                data: data
                            });
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
                            var params = angular.extend(article, data);
                            return baasicApiHttp.post(articleRouteService.subscriptions.article.subscribe.expand(params), params);
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
                            var params = angular.extend(article, data);
                            return baasicApiHttp.get(articleRouteService.subscriptions.article.isSubscribed.expand(params));
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
                            var params = angular.extend(article, data);
                            return baasicApiHttp({
                                url: articleRouteService.subscriptions.article.unSubscribe.expand(params),
                                method: 'DELETE',
                                data: params
                            });
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
                            return baasicApiHttp.post(articleRouteService.subscriptions.commentReported.subscribe.expand(data), data);
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
                            return baasicApiHttp.get(articleRouteService.subscriptions.article.isSubscribed.expand(data));
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
                            return baasicApiHttp({
                                url: articleRouteService.subscriptions.article.unSubscribe.expand(data),
                                method: 'DELETE',
                                data: data
                            });
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
                            return baasicApiHttp.post(articleRouteService.subscriptions.commentRequiresModeration.subscribe.expand(data), data);
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
                            return baasicApiHttp.get(articleRouteService.subscriptions.commentRequiresModeration.isSubscribed.expand(data));
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
                            return baasicApiHttp({
                                url: articleRouteService.subscriptions.commentRequiresModeration.unSubscribe.expand(data),
                                method: 'DELETE',
                                data: data
                            });
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
                        var params = angular.extend({}, options);
                        params.articleId = articleId;
                        params.id = ratingId;
                        return baasicApiHttp.get(articleRouteService.ratings.get.expand(baasicApiService.getParams(params)));
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
                        var params = angular.extend({}, options);
                        params.articleId = articleId;
                        return baasicApiHttp.get(articleRouteService.ratings.find.expand(baasicApiService.findParams(params)));
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
                        var params = angular.extend({}, options);
                        params.articleId = articleId;
                        params.username = username;
                        return baasicApiHttp.get(articleRouteService.ratings.findByUsername.expand(baasicApiService.findParams(params)));
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
                        return baasicApiHttp.post(articleRouteService.ratings.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.updateParams(data);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.removeParams(data);
                        return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                        var params = baasicApiService.removeParams(data);
                        return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete-ratings-by-article').href);
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
                        var params = angular.copy(options);
                        params.articleId = articleId;
                        return baasicApiHttp.get(articleRouteService.tags.find.expand(baasicApiService.findParams(params)));
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
                        var params = angular.copy(options);
                        params.articleId = articleId;
                        return baasicApiHttp.get(articleRouteService.tags.get.expand(baasicApiService.getParams(id, params)));
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
                        return baasicApiHttp.post(articleRouteService.tags.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.removeParams(data);
                        return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                        var params = baasicApiService.removeParams(data);
                        return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete-tags-by-article').href);
                    }
                },
                comments: {
                    /**
                     * Contains a reference to valid list of article comment states. It returns an object containing all article comment states.
                     * @method comments.statuses      
                     * @example baasicArticleService.comments.statuses.approved;
                     **/
                    statuses: commentStatuses,
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
                        var params = baasicApiService.updateParams(data);
                        var commentOptions = baasicApiService.updateParams(options);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-approve').href, commentOptions[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.updateParams(data);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unapprove').href, params[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp.post(articleRouteService.comments.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.findParams(options);
                        params.articleId = articleId;
                        return baasicApiHttp.get(articleRouteService.comments.find.expand(params));
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
                        var params = baasicApiService.updateParams(data);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-flag').href, params[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.updateParams(data);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unflag').href, params[baasicConstants.modelPropertyName]);
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
                        var params = angular.extend({}, options);
                        params.articleId = articleId;
                        params.id = commentId;
                        return baasicApiHttp.get(articleRouteService.comments.get.expand(baasicApiService.getParams(params)));
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
                        var params = baasicApiService.removeParams(data);
                        return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                        var params = baasicApiService.removeParams(data);
                        return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete-comments-by-article').href);
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
                        var params = baasicApiService.updateParams(data);
                        var commentOptions = baasicApiService.updateParams(options);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-report').href, commentOptions[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.updateParams(data);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unreport').href, params[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.updateParams(data);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-spam').href, params[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.updateParams(data);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unspam').href, params[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.updateParams(data);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                    },
                    replies: {
                        /**
                         * Contains a reference to valid list of article comment reply states. It returns an object containing all article comment reply states.
                         * @method comments.replies.statuses    
                         * @example baasicArticleService.comments.replies.statuses.approved;
                         **/
                        statuses: commentStatuses,
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
                            var params = baasicApiService.updateParams(data);
                            var commentOptions = baasicApiService.updateParams(options);
                            return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-approve').href, commentOptions[baasicConstants.modelPropertyName]);
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
                            var params = baasicApiService.updateParams(data);
                            return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unapprove').href, params[baasicConstants.modelPropertyName]);
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
                            var params = angular.copy(data);
                            params.articleId = articleId;
                            return baasicApiHttp.post(articleRouteService.comments.replies.create.expand(params), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                            var params = baasicApiService.findParams(options);
                            params.articleId = articleId;
                            params.commentId = commentId;
                            return baasicApiHttp.get(articleRouteService.comments.replies.find.expand(params));
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
                            var params = baasicApiService.updateParams(data);
                            return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-flag').href, params[baasicConstants.modelPropertyName]);
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
                            var params = baasicApiService.updateParams(data);
                            return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unflag').href, params[baasicConstants.modelPropertyName]);
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
                            var params = angular.extend({}, options);
                            params.articleId = articleId;
                            params.commentId = commentId;
                            params.id = replyId;
                            return baasicApiHttp.get(articleRouteService.comments.replies.get.expand(baasicApiService.getParams(params)));
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
                            var params = baasicApiService.removeParams(data);
                            return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                            var params = baasicApiService.removeParams(data);
                            return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete-comments-by-article').href);
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
                            var params = baasicApiService.updateParams(data);
                            var commentOptions = baasicApiService.updateParams(options);
                            return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-report').href, commentOptions[baasicConstants.modelPropertyName]);
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
                            var params = baasicApiService.updateParams(data);
                            return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unreport').href, params[baasicConstants.modelPropertyName]);
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
                            var params = baasicApiService.updateParams(data);
                            return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-spam').href, params[baasicConstants.modelPropertyName]);
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
                            var params = baasicApiService.updateParams(data);
                            return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unspam').href, params[baasicConstants.modelPropertyName]);
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
                            var params = baasicApiService.updateParams(data);
                            return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.findParams(options);
                        params.articleId = articleId;
                        return baasicApiHttp.get(articleRouteService.files.find.expand(params));
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
                        var params = angular.extend({}, options);
                        params.articleId = articleId;
                        params.id = id;
                        return baasicApiHttp.get(articleRouteService.files.get.expand(baasicApiService.getParams(params)));
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
                        if (!options) {
                            options = {};
                        }
                        var params = baasicApiService.removeParams(data);
                        params.articleId = articleId;
                        var href = articleRouteService.parse(params[baasicConstants.modelPropertyName].links('unlink').href).expand(options);
                        return baasicApiHttp.delete(href);
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
                        if (!options) {
                            options = {};
                        }
                        var params = baasicApiService.removeParams(data);
                        params.articleId = articleId;
                        var href = articleRouteService.parse(params[baasicConstants.modelPropertyName].links('unlink-by-article').href).expand(options);
                        return baasicApiHttp.delete(href);
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
                        var params = baasicApiService.updateParams(data);
                        params.articleId = articleId;
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                        var params = angular.copy(data);
                        params.articleId = articleId;
                        return baasicApiHttp.post(articleRouteService.files.link.expand(params), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                            if (!angular.isObject(data)) {
                                data = {
                                    id: data
                                };
                            }
                            var params = angular.copy(data);
                            params.articleId = articleId;
                            return baasicApiHttp.get(articleRouteService.files.streams.get.expand(params));
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
                            if (!angular.isObject(data)) {
                                data = {
                                    id: data
                                };
                            }
                            var params = angular.copy(data);
                            params.articleId = articleId;
                            return baasicApiHttp({
                                url: articleRouteService.files.streams.get.expand(params),
                                method: 'GET',
                                responseType: 'blob'
                            });
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
                            if (!angular.isObject(data)) {
                                data = {
                                    id: data
                                };
                            }
                            var params = angular.copy(data);
                            params.articleId = articleId;
                            var formData = new FormData();
                            formData.append('file', stream);
                            return baasicApiHttp({
                                transformRequest: angular.identity,
                                url: articleRouteService.files.streams.update.expand(params),
                                method: 'PUT',
                                data: formData,
                                headers: {
                                    'Content-Type': undefined
                                }
                            });
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
                            if (!angular.isObject(data)) {
                                data = {
                                    filename: data
                                };
                            }
                            var params = angular.copy(data);
                            params.articleId = articleId;
                            var formData = new FormData();
                            formData.append('file', stream);
                            return baasicApiHttp({
                                transformRequest: angular.identity,
                                url: articleRouteService.files.streams.create.expand(params),
                                method: 'POST',
                                data: formData,
                                headers: {
                                    'Content-Type': undefined
                                }
                            });
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
                            var params = {
                                articleId: articleId
                            };
                            return baasicApiHttp({
                                url: articleRouteService.files.batch.unlink.expand(params),
                                method: 'DELETE',
                                data: data
                            });
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
                            var params = {
                                articleId: articleId
                            };
                            return baasicApiHttp.put(articleRouteService.files.batch.update.expand(params), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
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
                            var params = {
                                articleId: articleId
                            };
                            return baasicApiHttp.post(articleRouteService.files.batch.link.expand(params), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                        var params = angular.copy(options);
                        return baasicApiHttp.get(articleRouteService.acl.get.expand(params));
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
                        var params = angular.copy(options);
                        return baasicApiHttp.put(articleRouteService.acl.get.expand(params), params[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.removeParams(data);
                        params.articleId = articleId;
                        params.user = user;
                        params.accessAction = action;
                        return baasicApiHttp.delete(articleRouteService.acl.deleteByUser.expand(params));
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
                        var params = baasicApiService.removeParams(data);
                        params.articleId = articleId;
                        params.role = role;
                        params.accessAction = action;
                        return baasicApiHttp.delete(articleRouteService.acl.deleteByRole.expand(params));
                    }
                },
                /**
                 * Provides direct access to `baasicArticleRouteService`.
                 * @method        
                 * @example baasicArticleService.routeService.get.expand(expandObject);
                 **/
                routeService: articleRouteService,
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
     * @module baasicArticleSettingsRouteService
     * @description Baasic Article Settings Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Article Settings Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicArticleSettingsRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses get article settings route; this URI template doesn't expose any additional properties.				
                 * @method
                 * @example 
                 baasicArticleSettingsRouteService.acl.get.expand(
                 {id: '<article-id>'}
                 );
                 **/
                get: uriTemplateService.parse('article-settings/{?embed,fields}'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicArticleSettingsRouteService.parse(
                 '<route>/{?embed,fields,options}'
                 ).expand(
                 {embed: '<embedded-resource>'}
                 );
                 **/
                parse: uriTemplateService.parse
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
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicArticleSettingsService
     * @description Baasic Article Settings Service provides an easy way to consume Baasic Article Settings REST API end-points. In order to obtain needed routes `baasicArticleSettingsService` uses `baasicArticleSettingsRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicArticleSettingsService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicArticleSettingsRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, articleSettingsRouteService) {
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
                    return baasicApiHttp.get(articleSettingsRouteService.get.expand(baasicApiService.getParams(options)));
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                /**
                 * Provides direct access to `baasicArticleSettingsRouteService`.
                 * @method        
                 * @example baasicArticleSettingsService.routeService.get.expand(expandObject);
                 **/
                routeService: articleSettingsRouteService
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
     * @module baasicArticleTagsRouteService
     * @description Baasic Article Tags Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Article Tags Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */

    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicArticleTagsRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find article tags route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string value used to identify article tags using the phrase search; multiple tag keywords must be comma separated.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain article tag subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the article tag property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method      
                 * @example 
                 baasicArticleTagsRouteService.find.expand(
                 {searchQuery: '<search-phrase>'}
                 );
                 **/
                find: uriTemplateService.parse('article-tags/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get article tag route which must be expanded with the Id of the previously created article tag resource in the system. Additional expand supported items are:
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method      
                 * @example 
                 baasicArticleTagsRouteService.find.expand(
                 {id: '<articleTag-id>'}
                 );
                 **/
                get: uriTemplateService.parse('article-tags/{id}/{?embed,fields}'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicArticleTagsRouteService.parse(
                 '<route>/{?embed,fields,options}'
                 ).expand(
                 {embed: '<embedded-resource>'}
                 );
                 **/
                parse: uriTemplateService.parse,

                subscriptions: {
                    /**
                     * Parses subscribe route which must be expanded with id of the tag.
                     * @method subscriptions.subscribe
                     * @example 
                     baasicArticleTagsRouteService.subscriptions.subscribe.expand(
                     {id: '<tag-id>'}
                     );
                     **/
                    subscribe: uriTemplateService.parse('article-tags/{id}/subscriptions'),
                    /**
                     * Parses isSubscribed route which must be expanded with subscriber id and the id of the tag.
                     * @method subscriptions.isSubscribed
                     * @example 
                     baasicArticleRouteService.subscriptions.isSubscribed.expand({
                     id: '<tag-id>',
                     subscriberId: '<subscriber-id>'
                     });
                     **/
                    isSubscribed: uriTemplateService.parse('article-tags/{id}/subscriptions/{subscriberId}'),
                    /**
                     * Parses unSubscribe route which must be expanded with the id of the article.
                     * @method subscriptions.unSubscribe
                     * @example 
                     baasicArticleRouteService.subscriptions.unSubscribe.expand(
                     {id: '<tag-id>'}
                     );
                     **/
                    unSubscribe: uriTemplateService.parse('article-tags/{id}/subscriptions')
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
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicArticleTagsService
     * @description Baasic Article Tags Service provides an easy way to consume Baasic Article Tags REST API end-points. `baasicArticleTagsService` functions enable performing standard CRUD operations directly on article tag resources, whereas the `baasicArticleService` functions allow management between article and article tag. In order to obtain needed routes `baasicArticleTagsService` uses `baasicArticleTagsRouteService`.
     */

    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicArticleTagsService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicArticleTagsRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, articleTagsRouteService) {
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
                    return baasicApiHttp.get(articleTagsRouteService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(articleTagsRouteService.get.expand(baasicApiService.getParams(id, options)));
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                 * Provides direct access to `baasicArticleTagsRouteService`.
                 * @method        
                 * @example baasicArticleTagsService.routeService.get.expand(expandObject);
                 **/
                routeService: articleTagsRouteService,

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
                        var params = angular.extend(tag, data);
                        return baasicApiHttp.post(articleTagsRouteService.subscriptions.subscribe.expand(params), params);
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
                        var params = angular.extend(tag, data);
                        return baasicApiHttp.get(articleTagsRouteService.subscriptions.isSubscribed.expand(params));
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
                        var params = angular.extend(tag, data);
                        return baasicApiHttp({
                            url: articleTagsRouteService.subscriptions.unSubscribe.expand(params),
                            method: 'DELETE',
                            data: params
                        });
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
     * @module baasicCommerceCustomerPaymentMethodRouteService
     * @description Baasic Commerce CustomerPaymentMethod Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Commerce CustomerPaymentMethod Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceCustomerPaymentMethodRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find commerce customer-payment-methods route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string value used to identify commerce resources using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain commerce subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the commerce property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicCommerceCustomerPaymentMethodRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('commerce/customer-payment-methods/{systemName}/{?customerId,searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicCommerceCustomerPaymentMethodRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('commerce/customer-payment-methods/{systemName}/{id}/{?embed,fields}'),
                /**
                 * Parses create commerce customer-payment-method route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicCommerceCustomerPaymentMethodRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('commerce/customer-payment-methods/{systemName}/'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example baasicCommerceCustomerPaymentMethodRouteService.parse('<route>/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
                 **/
                parse: uriTemplateService.parse
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
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */


    /* globals module */
    /**
     * @module baasicCommerceCustomerPaymentMethodService
     * @description Baasic Commerce CustomerPaymentMethod Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceCustomerPaymentMethodService` uses `baasicCommerceCustomerPaymentMethodRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceCustomerPaymentMethodService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicCommerceCustomerPaymentMethodRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, routeService) {
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
                    return baasicApiHttp.get(routeService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(routeService.get.expand(baasicApiService.getParams(id, options)));
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    return baasicApiHttp.post(routeService.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceCustomerPaymentMethodService.routeService.get.expand(expandObject);
                 **/
                routeService: routeService
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
     * @module baasicCommerceCustomerRouteService
     * @description Baasic Commerce Customer Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Commerce Customer Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceCustomerRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find commerce customers route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string value used to identify commerce resources using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain commerce subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the commerce property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicCommerceCustomerRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('commerce/customers/{systemName}/{?customerId,searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicCommerceCustomerRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('commerce/customers/{systemName}/{id}/{?embed,fields}'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example baasicCommerceCustomerRouteService.parse('<route>/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
                 **/
                parse: uriTemplateService.parse
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
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */


    /* globals module */
    /**
     * @module baasicCommerceCustomerService
     * @description Baasic Commerce Customer Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceCustomerService` uses `baasicCommerceCustomerRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceCustomerService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicCommerceCustomerRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, routeService) {
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
                    return baasicApiHttp.get(routeService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(routeService.get.expand(baasicApiService.getParams(id, options)));
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceCustomerService.routeService.get.expand(expandObject);
                 **/
                routeService: routeService
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
     * @module baasicCommerceInvoiceRouteService
     * @description Baasic Commerce Invoice Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Commerce Invoice Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceInvoiceRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find commerce invoice route which can be expanded with additional options. Supported items are: 
                 * - `customerId` - The customer identifier.
                 * - `invoiceStatusId` - A invoice status unique identifier.
                 * - `subscriptionId` - A subscription unique identifier.
                 * - `dateCreatedMin` - A date created minimum date filter.
                 * - `dateCreatedMax` - A date created maximum date filter.
                 * - `searchQuery` - A string value used to identify commerce resources using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain commerce subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the commerce property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicCommerceInvoiceRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('commerce/invoices/{?customerId,invoiceStatusId,subscriptionId,dateCreatedMin,dateCreatedMax,searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicCommerceInvoiceRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('commerce/invoices/{id}/{?embed,fields}'),

                streams: {
                    /**
                     * Parses get route; this route should be expanded with id of desired invoice.
                     * @method streams.get
                     * @example 
                     baasicCommerceInvoiceRouteService.streams.get.expand(
                     {id: '<invoice-id>'}
                     );
                     **/
                    get: uriTemplateService.parse('commerce/invoice-streams/{id}')
                },

                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example baasicCommerceInvoiceRouteService.parse('<route>/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
                 **/
                parse: uriTemplateService.parse
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
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */


    /* globals module */
    /**
     * @module baasicCommerceInvoiceService
     * @description Baasic Commerce Invoice Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceInvoiceService` uses `baasicCommerceInvoiceRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceInvoiceService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicCommerceInvoiceRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, routeService) {
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
                    return baasicApiHttp.get(routeService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(routeService.get.expand(baasicApiService.getParams(id, options)));
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                        if (!angular.isObject(data)) {
                            data = {
                                id: data
                            };
                        }
                        return baasicApiHttp.get(routeService.streams.get.expand(data));
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
                        if (!angular.isObject(data)) {
                            data = {
                                id: data
                            };
                        }
                        return baasicApiHttp({
                            url: routeService.streams.get.expand(data),
                            method: 'GET',
                            responseType: 'blob'
                        });
                    }
                },

                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceInvoiceService.routeService.get.expand(expandObject);
                 **/
                routeService: routeService
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
     * @module baasicCommercePaymentTransactionRouteService
     * @description Baasic Commerce PaymentTransaction Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Commerce PaymentTransaction Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommercePaymentTransactionRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find commerce payment transaction route which can be expanded with additional options. Supported items are: 
                 * - `customerId` - A customer unique identifier.
                 * - `searchQuery` - A string value used to identify commerce resources using the phrase search.
                 * - `invoiceStatusId` - A invoice status unique identifier.
                 * - `subscriptionId` - A subscription unique identifier.
                 * - `paymentMethodId` - A payment method unique identifier.
                 * - `firstName` - A customer first name.
                 * - `lastName` - A customer last name.
                 * - `transactionStatuses` - A transaction statuses in CSV format.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain commerce subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the commerce property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicCommercePaymentTransactionRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('commerce/payment-transactions/{?customerId,searchQuery,invoiceStatusId,subscriptionId,paymentMethodId,firstName,lastName,transactionStatuses,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicCommercePaymentTransactionRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('commerce/payment-transactions/{id}/{?embed,fields}'),
                /**
                 * Parses create commerce payment transaction route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicCommercePaymentTransactionRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('commerce/payment-transactions'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example baasicCommercePaymentTransactionRouteService.parse('<route>/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
                 **/
                parse: uriTemplateService.parse
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
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */


    /* globals module */
    /**
     * @module baasicCommercePaymentTransactionService
     * @description Baasic Commerce PaymentTransaction Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommercePaymentTransactionService` uses `baasicCommercePaymentTransactionRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommercePaymentTransactionService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicCommercePaymentTransactionRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, routeService) {
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
                    return baasicApiHttp.get(routeService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(routeService.get.expand(baasicApiService.getParams(id, options)));
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommercePaymentTransactionService.routeService.get.expand(expandObject);
                 **/
                routeService: routeService
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
     * @module baasicCommerceProductRouteService
     * @description Baasic Commerce Product Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Commerce Product Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceProductRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find commerce product route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string value used to identify commerce resources using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain commerce subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the commerce property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicCommerceProductRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('commerce/products/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicCommerceProductRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('commerce/products/{id}/{?embed,fields}'),
                /**
                 * Parses create commerce product route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicCommerceProductRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('commerce/products'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example baasicCommerceProductRouteService.parse('<route>/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
                 **/
                parse: uriTemplateService.parse
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
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */


    /* globals module */
    /**
     * @module baasicCommerceProductService
     * @description Baasic Commerce Product Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceProductService` uses `baasicCommerceProductRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceProductService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicCommerceProductRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, routeService) {
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
                    return baasicApiHttp.get(routeService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(routeService.get.expand(baasicApiService.getParams(id, options)));
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
                    return baasicApiHttp.post(routeService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceProductService.routeService.get.expand(expandObject);
                 **/
                routeService: routeService
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
     * @module baasicCommerceRouteService
     * @description Baasic Commerce Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Commerce Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find commerce route which can be expanded with additional options. Supported items are: 
                 * - `customerId` - The customer identifier.
                 * - `systemName` - The commerce payment gateway system name.
                 * - `searchQuery` - A string value used to identify commerce resources using the phrase search.
                 * - `plan` - Product name.
                 * - `statuses` - Subscription status unique identifier or abbreviation in CSV format.
                 * - `productId` - Product unique identifier.
                 * - `firstName` - Customer first name.
                 * - `lastName` - Customer last name.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain commerce subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the commerce property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicCommerceRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('commerce/subscriptions/{?customerId,systemName,searchQuery,plan,statuses,productId,firstName,lastName,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicCommerceRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('commerce/subscriptions/{id}/{?embed,fields}'),
                /**
                 * Parses validate VAT route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicCommerceRouteService.validateVAT.expand({ countryCode: 'DE', vatId: 'DE999999999' });               
                 **/
                validateVAT: uriTemplateService.parse('commerce/vat-validations/{?countryCode,vatId}'),
                /**
                 * Parses subscription pre-process commerce route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicCommerceRouteService.preprocess.expand({});              
                 **/
                preprocess: uriTemplateService.parse('commerce/subscriptions/preprocess'),
                /**
                 * Parses subscription commerce route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicCommerceRouteService.subscribe.expand({});              
                 **/
                subscribe: uriTemplateService.parse('commerce/subscriptions'),
                /**
                 * Parses cancel subscription commerce route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicCommerceRouteService.cancel.expand({ systemName: '<system-name>' });              
                 **/
                cancel: uriTemplateService.parse('commerce/subscriptions/{systemName}/{id}/{?requestRefund,refundAmount}'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example baasicCommerceRouteService.parse('<route>/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
                 **/
                parse: uriTemplateService.parse
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
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicCommerceService
     * @description Baasic Commerce Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceService` uses `baasicCommerceRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicCommerceRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, routeService) {
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
                    return baasicApiHttp.get(routeService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(routeService.get.expand(baasicApiService.getParams(id, options)));
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
                    return baasicApiHttp.get(routeService.validateVAT.expand({
                        countryCode: countryCode,
                        vatId: vatId
                    }));
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
                    return baasicApiHttp.post(routeService.preprocess.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    return baasicApiHttp.post(routeService.subscribe.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    return baasicApiHttp.delete(routeService.cancel.expand(data));
                },
                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceService.routeService.get.expand(expandObject);
                 **/
                routeService: routeService
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
     * @module baasicCommerceAddressTypeRouteService
     * @description Baasic Commerce AddressType Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Commerce AddressType Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceAddressTypeRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find commerce address type route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string value used to identify commerce resources using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain commerce subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the commerce property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicCommerceAddressTypeRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('commerce/lookups/address-types/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicCommerceAddressTypeRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('commerce/lookups/address-types/{id}/{?embed,fields}'),
                /**
                 * Parses create commerce address type route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicCommerceAddressTypeRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('commerce/lookups/address-types'),

                batch: {

                    /**
                     * Parses create commerce address type batch route; this route does not expose any additional options
                     * @method batch.create
                     * @example baasicCommerceAddressTypeRouteService.batch.create.expand({});
                     */
                    create: uriTemplateService.parse('commerce/lookups/address-types/batch'),

                    /**
                     * Parses remove commerce address type batch route; this route does not expose any additional options
                     * @method batch.remove
                     * @example baasicCommerceAddressTypeRouteService.batch.remove.expand({});
                     */
                    remove: uriTemplateService.parse('commerce/lookups/address-types/batch'),

                    /**
                     * Parses remove commerce address type batch route; this route does not expose any additional options
                     * @method batch.update
                     * @example baasicCommerceAddressTypeRouteService.batch.update.expand({});
                     */
                    update: uriTemplateService.parse('commerce/lookups/address-types/batch')

                },

                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example baasicCommerceAddressTypeRouteService.parse('<route>/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
                 **/
                parse: uriTemplateService.parse
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
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */


    /* globals module */
    /**
     * @module baasicCommerceAddressTypeService
     * @description Baasic Commerce AddressType Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceAddressTypeService` uses `baasicCommerceAddressTypeRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceAddressTypeService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicCommerceAddressTypeRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, routeService) {
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
                    return baasicApiHttp.get(routeService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(routeService.get.expand(baasicApiService.getParams(id, options)));
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
                    return baasicApiHttp.post(routeService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                        return baasicApiHttp.post(routeService.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp({
                            url: routeService.batch.remove.expand(),
                            method: 'DELETE',
                            data: ids
                        });
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
                        return baasicApiHttp.put(routeService.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
                    }
                },

                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceAddressTypeService.routeService.get.expand(expandObject);
                 **/
                routeService: routeService
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
     * @module baasicCommerceCountryRouteService
     * @description Baasic Commerce Country Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Commerce Country Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceCountryRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find commerce country route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string value used to identify commerce resources using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain commerce subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the commerce property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicCommerceCountryRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('commerce/lookups/countries/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicCommerceCountryRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('commerce/lookups/countries/{id}/{?embed,fields}'),
                /**
                 * Parses create commerce country route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicCommerceCountryRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('commerce/lookups/countries'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example baasicCommerceCountryRouteService.parse('<route>/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
                 **/
                parse: uriTemplateService.parse,

                batch: {
                    /**
                     * Parses create commerce country batch route; this route does not expose any additional options
                     * @method batch.create
                     * @example baasicCommerceCountryRouteService.batch.create.expand({});
                     */
                    create: uriTemplateService.parse('commerce/lookups/countries/batch'),

                    /**
                     * Parses remove commerce country batch route; this route does not expose any additional options
                     * @method batch.remove
                     * @example baasicCommerceCountryRouteService.batch.remove.expand({});
                     */
                    remove: uriTemplateService.parse('commerce/lookups/countries/batch'),

                    /**
                     * Parses remove commerce country batch route; this route does not expose any additional options
                     * @method batch.update
                     * @example baasicCommerceCountryRouteService.batch.update.expand({});
                     */
                    update: uriTemplateService.parse('commerce/lookups/countries/batch')
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
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicCommerceCountryService
     * @description Baasic Commerce Country Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceCountryService` uses `baasicCommerceCountryRouteService`.
     */
    (function (angular, module) {
        'use strict';
        module.service('baasicCommerceCountryService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicCommerceCountryRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, routeService) {
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
                    return baasicApiHttp.get(routeService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(routeService.get.expand(baasicApiService.getParams(id, options)));
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
                    return baasicApiHttp.post(routeService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                        return baasicApiHttp.post(routeService.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp({
                            url: routeService.batch.remove.expand(),
                            method: 'DELETE',
                            data: ids
                        });
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
                        return baasicApiHttp.put(routeService.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
                    }
                },

                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceCountryService.routeService.get.expand(expandObject);
                 **/
                routeService: routeService
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
     * @module baasicCommerceCountryStateRouteService
     * @description Baasic Commerce Country State Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Commerce Country State Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceCountryStateRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {

                /**
                 * Parses create commerce country state route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicCommerceCountryStateRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('commerce/lookups/states'),

                /**
                 * Parses find commerce country state route which can be expanded with additional options. Supported items are:
                 * - `countryId` - An identifier used to identify commerce country resource. 
                 * - `searchQuery` - A string value used to identify commerce resources using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain commerce subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the commerce property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicCommerceCountryStateRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('commerce/lookups/states/{?countryId,searchQuery,page,rpp,sort,embed}'),

                /**
                 * Parses get commerce country state route which can be expanded with additional options. Supported items are:
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicCommerceCountryStateRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('commerce/lookups/states/{id}/{?embed}'),

                batch: {

                    /**
                     * Parses create commerce country state batch route; this route does not expose any additional options
                     * @method batch.create
                     * @example baasicCommerceCountryStateRouteService.batch.create.expand({});
                     */
                    create: uriTemplateService.parse('commerce/lookups/states/batch'),

                    /**
                     * Parses remove commerce country state batch route; this route does not expose any additional options
                     * @method batch.remove
                     * @example baasicCommerceCountryStateRouteService.batch.remove.expand({});
                     */
                    remove: uriTemplateService.parse('commerce/lookups/states/batch'),

                    /**
                     * Parses remove commerce country state batch route; this route does not expose any additional options
                     * @method batch.update
                     * @example baasicCommerceCountryStateRouteService.batch.update.expand({});
                     */
                    update: uriTemplateService.parse('commerce/lookups/states/batch')
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
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicCommerceCountryStateService
     * @description Baasic Commerce Country State Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceCountryStateService` uses `baasicCommerceCountryStateRouteService`.
     */
    (function (angular, module) {
        'use strict';
        module.service('baasicCommerceCountryStateService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicCommerceCountryStateRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, routeService) {
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
                    return baasicApiHttp.post(routeService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    return baasicApiHttp.get(routeService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(routeService.get.expand(baasicApiService.getParams(id, options)));
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                        return baasicApiHttp.post(routeService.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp({
                            url: routeService.batch.remove.expand(),
                            method: 'DELETE',
                            data: ids
                        });
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
                        return baasicApiHttp.put(routeService.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
                    }

                },

                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceCountryStateService.routeService.get.expand(expandObject);
                 **/
                routeService: routeService
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
     * @module baasicCommerceInvoiceStatusRouteService
     * @description Baasic Commerce Invoice Status Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Commerce Invoice Status Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module) {
        'use strict';
        module.service('baasicCommerceInvoiceStatusRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses create commerce invoce status route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicCommerceInvoiceStatusRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('commerce/lookups/invoice-statuses'),

                /**
                 * Parses find commerce invoice status route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string value used to identify commerce resources using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain commerce subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the commerce property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicCommerceInvoiceStatusRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('commerce/lookups/invoice-statuses/{?searchQuery,page,rpp,sort,embed}'),

                /**
                 * Parses get commerce invoice status route which can be expanded with additional options. Supported items are: 
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicCommerceInvoiceStatusRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('commerce/lookups/invoice-statuses/{id}/{?embed}'),

                batch: {

                    /**
                     * Parses create commerce invoice status batch route; this route does not expose any additional options
                     * @method batch.create
                     * @example baasicCommerceInvoiceStatusRouteService.batch.create.expand({});
                     */
                    create: uriTemplateService.parse('commerce/lookups/invoice-statuses/batch'),

                    /**
                     * Parses remove commerce invoice status batch route; this route does not expose any additional options
                     * @method batch.remove
                     * @example baasicCommerceInvoiceStatusRouteService.batch.remove.expand({});
                     */
                    remove: uriTemplateService.parse('commerce/lookups/invoice-statuses/batch'),

                    /**
                     * Parses remove commerce invoice status batch route; this route does not expose any additional options
                     * @method batch.update
                     * @example baasicCommerceInvoiceStatusRouteService.batch.update.expand({});
                     */
                    update: uriTemplateService.parse('commerce/lookups/invoice-statuses/batch')
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
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicCommerceInvoiceStatusService
     * @description Baasic Commerce Invoice Status Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceInvoiceStatusService` uses `baasicCommerceInvoiceStatusRouteService`.
     */
    (function (angular, module) {
        'use strict';
        module.service('baasicCommerceInvoiceStatusService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicCommerceInvoiceStatusRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, routeService) {
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
                    return baasicApiHttp.post(routeService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    return baasicApiHttp.get(routeService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(routeService.get.expand(baasicApiService.getParams(id, options)));
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                        return baasicApiHttp.post(routeService.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp({
                            url: routeService.batch.remove.expand(),
                            method: 'DELETE',
                            data: ids
                        });
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
                        return baasicApiHttp.put(routeService.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
                    }
                },

                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceInvoiceStatusService.routeService.get.expand(expandObject);
                 **/
                routeService: routeService
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
     * @module baasicCommercePaymentMethodRouteService
     * @description Baasic Commerce PaymentMethod Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Commerce PaymentMethod Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommercePaymentMethodRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find commerce payment method route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string value used to identify commerce resources using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain commerce subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the commerce property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicCommercePaymentMethodRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('commerce/lookups/payment-methods/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicCommercePaymentMethodRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('commerce/lookups/payment-methods/{id}/{?embed,fields}'),
                /**
                 * Parses create commerce payment method route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicCommercePaymentMethodRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('commerce/lookups/payment-methods'),

                batch: {
                    /**
                     * Parses create commerce payment method batch route; this route does not expose any additional options
                     * @method batch.create
                     * @example baasicCommercePaymentMethodRouteService.batch.create.expand({});
                     */
                    create: uriTemplateService.parse('commerce/lookups/payment-methods/batch'),

                    /**
                     * Parses remove commerce payment method batch route; this route does not expose any additional options
                     * @method batch.remove
                     * @example baasicCommercePaymentMethodRouteService.batch.remove.expand({});
                     */
                    remove: uriTemplateService.parse('commerce/lookups/payment-methods/batch'),

                    /**
                     * Parses remove commerce payment method batch route; this route does not expose any additional options
                     * @method batch.update
                     * @example baasicCommercePaymentMethodRouteService.batch.update.expand({});
                     */
                    update: uriTemplateService.parse('commerce/lookups/payment-methods/batch')
                },

                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example baasicCommercePaymentMethodRouteService.parse('<route>/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
                 **/
                parse: uriTemplateService.parse
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
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */


    /* globals module */
    /**
     * @module baasicCommercePaymentMethodService
     * @description Baasic Commerce PaymentMethod Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommercePaymentMethodService` uses `baasicCommercePaymentMethodRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommercePaymentMethodService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicCommercePaymentMethodRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, routeService) {
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
                    return baasicApiHttp.get(routeService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(routeService.get.expand(baasicApiService.getParams(id, options)));
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
                    return baasicApiHttp.post(routeService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                        return baasicApiHttp.post(routeService.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp({
                            url: routeService.batch.remove.expand(),
                            method: 'DELETE',
                            data: ids
                        });
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
                        return baasicApiHttp.put(routeService.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
                    }

                },

                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommercePaymentMethodService.routeService.get.expand(expandObject);
                 **/
                routeService: routeService
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
     * @module baasicCommercePaymentTransactionStatusRouteService
     * @description Baasic Commerce PaymentTransactionStatus Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Commerce PaymentTransactionStatus Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommercePaymentTransactionStatusRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find commerce payment transaction statuses route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string value used to identify commerce resources using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain commerce subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the commerce property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicCommercePaymentTransactionStatusRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('commerce/lookups/payment-transaction-statuses/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicCommercePaymentTransactionStatusRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('commerce/lookups/payment-transaction-statuses/{id}/{?embed,fields}'),
                /**
                 * Parses create commerce payment transaction statuses route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicCommercePaymentTransactionStatusRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('commerce/lookups/payment-transaction-statuses'),

                batch: {

                    /**
                     * Parses create commerce payment transaction status batch route; this route does not expose any additional options
                     * @method batch.create
                     * @example baasicCommercePaymentTransactionStatusRouteService.batch.create.expand({});
                     */
                    create: uriTemplateService.parse('commerce/lookups/payment-transaction-statuses/batch'),

                    /**
                     * Parses remove commerce payment transaction status batch route; this route does not expose any additional options
                     * @method batch.remove
                     * @example baasicCommercePaymentTransactionStatusRouteService.batch.remove.expand({});
                     */
                    remove: uriTemplateService.parse('commerce/lookups/payment-transaction-statuses/batch'),

                    /**
                     * Parses remove commerce payment transaction status batch route; this route does not expose any additional options
                     * @method batch.update
                     * @example baasicCommercePaymentTransactionStatusRouteService.batch.update.expand({});
                     */
                    update: uriTemplateService.parse('commerce/lookups/payment-transaction-statuses/batch')
                },

                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example baasicCommercePaymentTransactionStatusRouteService.parse('<route>/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
                 **/
                parse: uriTemplateService.parse
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
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */


    /* globals module */
    /**
     * @module baasicCommercePaymentTransactionStatusService
     * @description Baasic Commerce PaymentTransactionStatus Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommercePaymentTransactionStatusService` uses `baasicCommercePaymentTransactionStatusRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommercePaymentTransactionStatusService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicCommercePaymentTransactionStatusRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, routeService) {
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
                    return baasicApiHttp.get(routeService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(routeService.get.expand(baasicApiService.getParams(id, options)));
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
                    return baasicApiHttp.post(routeService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                        return baasicApiHttp.post(routeService.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp({
                            url: routeService.batch.remove.expand(),
                            method: 'DELETE',
                            data: ids
                        });
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
                        return baasicApiHttp.put(routeService.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
                    }
                },

                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommercePaymentTransactionStatusService.routeService.get.expand(expandObject);
                 **/
                routeService: routeService
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
     * @module baasicCommerceRecurringCyclePeriodTypeRouteService
     * @description Baasic Commerce Recurring Cycle Period Type Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Commerce Recurring Cycle Period Type Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module) {
        'use strict';
        module.service('baasicCommerceRecurringCyclePeriodTypeRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses create commerce recurrng cycle period type route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicCommerceRecurringCyclePeriodTypeRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('commerce/lookups/recurring-cycle-period-types'),

                /**
                 * Parses find commerce recurrng cycle period type route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string value used to identify commerce resources using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain commerce subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the commerce property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicCommerceRecurringCyclePeriodTypeRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('commerce/lookups/recurring-cycle-period-types/{?searchQuery,page,rpp,sort,embed}'),

                /**
                 * Parses get commerce recurrng cycle period type route which can be expanded with additional options. Supported items are: 
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicCommerceRecurringCyclePeriodTypeRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('commerce/lookups/recurring-cycle-period-types/{id}/{?embed}'),

                batch: {

                    /**
                     * Parses create commerce recurrng cycle period type batch route; this route does not expose any additional options
                     * @method batch.create
                     * @example baasicCommerceRecurringCyclePeriodTypeRouteService.batch.create.expand({});
                     */
                    create: uriTemplateService.parse('commerce/lookups/recurring-cycle-period-types/batch'),

                    /**
                     * Parses remove commerce recurrng cycle period type batch route; this route does not expose any additional options
                     * @method batch.remove
                     * @example baasicCommerceRecurringCyclePeriodTypeRouteService.batch.remove.expand({});
                     */
                    remove: uriTemplateService.parse('commerce/lookups/recurring-cycle-period-types/batch'),

                    /**
                     * Parses remove commerce recurrng cycle period type batch route; this route does not expose any additional options
                     * @method batch.update
                     * @example baasicCommerceRecurringCyclePeriodTypeRouteService.batch.update.expand({});
                     */
                    update: uriTemplateService.parse('commerce/lookups/recurring-cycle-period-types/batch'),
                }
            };
        }]);
    })(angular, module);
    /**
     * @copyright (c) 2017 Mono Ltd
     * @license MIT
     * @author Mono Ltd
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */
    /**
     * @module baasicCommerceRecurringCyclePeriodTypeService
     * @description Baasic Commerce Recurring Cycle Period Type Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceRecurringCyclePeriodTypeService` uses `baasicCommerceRecurringCyclePeriodTypeRouteService`.
     */
    (function (angular, module) {
        'use strict';
        module.service('baasicCommerceRecurringCyclePeriodTypeService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicCommerceRecurringCyclePeriodTypeRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, routeService) {
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
                    return baasicApiHttp.post(routeService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    return baasicApiHttp.get(routeService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(routeService.get.expand(baasicApiService.getParams(id, options)));
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                        return baasicApiHttp.post(routeService.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp({
                            url: routeService.batch.remove.expand(),
                            method: 'DELETE',
                            data: ids
                        });
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
                        return baasicApiHttp.put(routeService.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
                    }
                },

                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceRecurringCyclePeriodTypeService.routeService.get.expand(expandObject);
                 **/
                routeService: routeService
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
     * @module baasicCommerceSubscriptionStatusRouteService
     * @description Baasic Commerce SubscriptionStatus Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Commerce SubscriptionStatus Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceSubscriptionStatusRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find commerce subscription status route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string value used to identify commerce resources using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain commerce subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the commerce property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicCommerceSubscriptionStatusRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('commerce/lookups/subscription-statuses/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicCommerceSubscriptionStatusRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('commerce/lookups/subscription-statuses/{id}/{?embed,fields}'),
                /**
                 * Parses create commerce subscription status route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicCommerceSubscriptionStatusRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('commerce/lookups/subscription-statuses'),

                batch: {

                    /**
                     * Parses create commerce subscription status batch route; this route does not expose any additional options
                     * @method batch.create
                     * @example baasicCommerceSubscriptionStatusRouteService.batch.create.expand({});
                     */
                    create: uriTemplateService.parse('commerce/lookups/subscription-statuses/batch'),

                    /**
                     * Parses remove commerce subscription status batch route; this route does not expose any additional options
                     * @method batch.remove
                     * @example baasicCommerceSubscriptionStatusRouteService.batch.remove.expand({});
                     */
                    remove: uriTemplateService.parse('commerce/lookups/subscription-statuses/batch'),

                    /**
                     * Parses remove commerce  subscription status batch route; this route does not expose any additional options
                     * @method batch.update
                     * @example baasicCommerceSubscriptionStatusRouteService.batch.update.expand({});
                     */
                    update: uriTemplateService.parse('commerce/lookups/subscription-statuses/batch')

                },

                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example baasicCommerceSubscriptionStatusRouteService.parse('<route>/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
                 **/
                parse: uriTemplateService.parse
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
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */


    /* globals module */
    /**
     * @module baasicCommerceSubscriptionStatusService
     * @description Baasic Commerce SubscriptionStatus Service provides an easy way to consume Baasic Commerce REST API end-points. In order to obtain a needed routes `baasicCommerceSubscriptionStatusService` uses `baasicCommerceSubscriptionStatusRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCommerceSubscriptionStatusService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicCommerceSubscriptionStatusRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, routeService) {
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
                    return baasicApiHttp.get(routeService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(routeService.get.expand(baasicApiService.getParams(id, options)));
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
                    return baasicApiHttp.post(routeService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                        return baasicApiHttp.post(routeService.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp({
                            url: routeService.batch.remove.expand(),
                            method: 'DELETE',
                            data: ids
                        });
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
                        return baasicApiHttp.put(routeService.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
                    }
                },

                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicCommerceSubscriptionStatusService.routeService.get.expand(expandObject);
                 **/
                routeService: routeService
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

                return app.baasicApiClient.request(request);

                promise.success = function (fn) {
                    promise.then(function (response) {
                        fn(response.data, response.statusCode, response.headers, config);
                    }, null);
                    return promise;
                };

                promise.error = function (fn) {
                    promise.then(null, function (response) {
                        fn(response.data, response.statusCode, response.headers, config);
                    });
                    return promise;
                };

                return promise;
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
                    var cfg = angular.extend({}, config, {
                        httpClient: httpClient
                    });
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
                    promise = deferred.promise;

                    promise.success = function (fn) {
                        promise.then(function (response) {
                            fn(response.data, response.status, response.headers, response.config);
                        }, null);
                        return promise;
                    };

                    promise.error = function (fn) {
                        promise.then(null, function (response) {
                            fn(response.data, response.status, response.headers, response.config);
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
                routeService: baasicApp.membership.lookups.routeDefinition,
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
                    return baasicApp.membership.lookups.get(options);
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
                    return baasicApp.dynamicResource.find(schemaName, options);
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
                    return baasicApp.dynamicResource.get(schemaName, id, options);
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
                    return baasicApp.dynamicResource.create(schemaName, data);
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
                update: function (data, options) {
                    return baasicApp.dynamicResource.update(data, options);
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
                patch: function (data, options) {
                    return baasicApp.dynamicResource.patch(data, options);
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
                remove: function (data, options) {
                    return baasicApp.dynamicResource.remvoe(data, options);
                },
                /**
                 * Provides direct access to `baasicDynamicResourceRouteService`.
                 * @method        
                 * @example baasicDynamicResourceService.routeService.get.expand(expandObject);
                 **/
                routeService: baasicApp.dynamicResource.routeDefinition,
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
                        return baasicApp.dynamicResource.acl.get(options);
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
                        return baasicApp.dynamicResource.acl.update(options);
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
                        return baasicApp.dynamicResource.acl.removeByUser(action, user, data);
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
                        return baasicApp.dynamicResource.acl.removeByRole(action, role, data);
                    },
                    routeService: baasicApp.dynamicResource.acl.routeDefinition
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
                    return baasicApp.dynamicResource.schema.find(options);
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
                    return baasicApp.dynamicResource.schema.get(name, options);
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
                    return baasicApp.dynamicResource.schema.create(data);
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
                    return baasicApp.dynamicResource.schema.update(data);
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
                    return baasicApp.dynamicResource.schema.remove(data);
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
                    return baasicApp.dynamicResource.schema.generate(data);
                },
                /**
                 * Provides direct access to `baasicDynamicSchemaRouteService`.
                 * @method        
                 * @example baasicDynamicSchemaService.routeService.get.expand(expandObject);
                 **/
                routeService: baasicApp.dynamicResource.schema.routeDefinition
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
                    return baasicApp.files.find(options);
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
                    return baasicApp.files.get(id, options);
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
                    return baasicApp.files.unlink(data, options);
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
                    return baasicApp.files.update(data);
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
                    return baasicApp.files.link(data);
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
                        return baasicApp.files.streams.get(data);
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
                        return baasicApp.files.streams.getBlob(data);
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
                        return baasicApp.files.streams.update(data, stream);
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
                        return baasicApp.files.streams.create(data, stream);
                    },
                    routeService: baasicApp.files.streams.routeDefinition
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
                        return baasicApp.files.batch.unlink(data);
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
                        return baasicApp.files.batch.update(data);
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
                        return baasicApp.files.batch.link(data);
                    },
                    routeService: baasicApp.files.batch.routeDefinition
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
                        return baasicApp.files.acl.get(options);
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
                        return baasicApp.files.acl.update(options);
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
                        return baasicApp.files.acl.removeByUser(fileEntryId, action, user, data);
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
                        return baasicApp.files.acl.removeByRole(fileEntryId, action, role, data);
                    }
                },
                routeService: baasicApp.files.acl.routeDefinition
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
                    return baasicApp.mediaVault.find(options);
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
                    return baasicApp.mediaVault.get(id, options);
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
                    return baasicApp.mediaVault.remove(data, options);
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
                    return baasicApp.mediaVault.update(data);
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
                        return baasicApp.mediaVault.streams.get(data);
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
                        return baasicApp.mediaVault.streams.getBlob(data);
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
                        return baasicApp.mediaVault.streams.update(data, streams);
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
                        return baasicApp.mediaVault.streams.create(data, stream);
                    },
                    routeService: baasicApp.mediaVault.streams.routeDefinition
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
                        return baasicApp.mediaVault.batch.remove(data);
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
                        return baasicApp.mediaVault.batch.update(data);
                    },
                    routeService: baasicApp.mediaVault.batch.routeDefinition
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
                        return baasicApp.mediaVault.settings.get();
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
                        return baasicApp.mediaVault.settings.update(data);
                    },
                    routeService: baasicApp.mediaVault.settings.routeDefinition
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
                        return baasicApp.mediaVault.processingProviderSettings.find(options);
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
                        return baasicApp.mediaVault.processingProviderSettings.get(id, options);
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
                        return baasicApp.mediaVault.processingProviderSettings.update(data);
                    },
                    routeService: baasicApp.mediaVault.processingProviderSettings.routeDefinition
                },
                routeService: baasicApp.mediaVault.routeDefinition
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
                    return baasicApp.keyValue.get(options);
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
                    return baasicApp.keyValue.get(id, options);
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
                    return baasicApp.keyValue.post(data);
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
                    return baasicApp.keyValue.put(data);
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
                    return baasicApp.keyValue.delete(data);
                },
                /**
                 * Provides direct access to routeDefinition.
                 * @method        
                 * @example baasicKeyValueService.routeService.get('<id>', { embed:'<embeds>', fields: '<fields>' });
                 **/
                routeService: baasicApp.keyValue.routeDefinition
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
                    return baasicApp.membership.login.login(data);
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
                    return baasicApp.membership.login.loadUserData(data);
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
                    return baasicApp.membership.login.logout(token, type);
                },
                /**
                 * Provides direct access to route definition.
                 * @method        
                 * @example baasicLoginService.routeService.get('<id>', expandObject);
                 **/
                routeService: baasicApp.membership.login.routeDefinition,
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
                        return baasicApp.membership.loginSocial.get(provider, returnUrl);
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
                        return baasicApp.membership.loginSocial.post(provider, data, options);
                    },
                    /**
                     * Parses social provider response parameters.
                     * @method social.parseResponse
                     * @example baasicLoginService.social.parseResponse('<provider>');
                     **/
                    parseResponse: function (provider, returnUrl) {
                        return baasicApp.membership.loginSocial.parseResponse(provider, returnUrl);
                    },
                    /**
                     * Provides direct access to route definition.
                     * @method        
                     * @example baasicLoginService.social.routeService.get('<id>', expandObject);
                     **/
                    routeService: baasicApp.membership.loginSocial.routeDefinition
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
                    return baasicApp.membership.passwordRecovery.requestReset(data);
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
                    return baasicApp.membership.passwordRecovery.reset(data);
                },
                /**
                 * Provides direct access to route definition.
                 * @method        
                 * @example baasicPasswordRecoveryService.routeService.get('<id>', expandObject);
                 **/
                routeService: baasicApp.membership.passwordRecovery.routeDefinition
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
                    return baasicApp.membership.register.create(data);
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
                    return baasicApp.membership.register.activate(data);
                },
                /**
                 * Provides direct access to route definition.
                 * @method        
                 * @example baasicRegisterService.routeService.get('<id>', expandObject);
                 **/
                routeService: baasicApp.membership.register.routeDefinition
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
                    return baasicApp.membership.role.find(options);
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
                    return baasicApp.membership.role.get(id, options);
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
                    return baasicApp.membership.role.create(data);
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
                    return baasicApp.membership.role.update(data);
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
                    return baasicApp.membership.role.remove(data);
                },
                /**
                 * Provides direct access to route definition.
                 * @method        
                 * @example baasicRoleService.routeService.get('<id>', expandObject);
                 **/
                routeService: baasicApp.membership.role.routeDefinition
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
                    return baasicApp.membership.user.exists(username, options);
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
                    return baasicApp.membership.user.find(options);
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
                    return baasicApp.membership.user.get(options.username, options);
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
                    return baasicApp.membership.user.create(data);
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
                    return baasicApp.membership.user.update(data);
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
                    return baasicApp.membership.user.remove(data);
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
                    return baasicApp.membership.user.unlock(data);
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
                    return baasicApp.membership.user.lock(data);
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
                    return baasicApp.membership.user.approve(data);
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
                    return baasicApp.membership.user.disapprove(data);
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
                    return baasicApp.membership.user.changePassword(username, data);
                },
                /**
                 * Provides direct access to `baasicUserRouteService`.
                 * @method        
                 * @example baasicUserService.routeService.get.expand(expandObject);
                 **/
                routeService: baasicApp.membership.user.routeDefinition,
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
                        return baasicApp.membership.user.socialLogin.get(username);
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
                        return baasicApp.membership.user.socialLogin.remove(username, provider);
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
                    return baasicApp.metering.category.find(options);
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
                    return baasicApp.metering.category.get(id, options);
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
                    return baasicApp.metering.category.create(data);
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
                    return baasicApp.metering.category.update(data);
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
                    return baasicApp.metering.category.remove(data);
                },
                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicMeteringCategoryService.routeService.get.expand(expandObject);
                 **/
                routeService: baasicApp.metering.category.routeDefinition,
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
                        return baasicApp.metering.category.batch.create(data);
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
                        return baasicApp.metering.category.batch.update(data);
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
                        return baasicApp.metering.category.batch.remove(ids);
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
                    return baasicApp.metering.find(options);
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
                    return baasicApp.metering.get(id, options);
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
                    return baasicApp.metering.create(data);
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
                    return baasicApp.metering.update(data);
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
                    return baasicApp.metering.remove(data);
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
                    return baasicApp.metering.purge();
                },
                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicMeteringService.routeService.get.expand(expandObject);
                 **/
                routeService: baasicApp.metering.routeDefinition,
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
                        return baasicApp.metering.batch.create(data);
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
                        return baasicApp.metering.batch.update(data);
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
                        return baasicApp.metering.batch.remove(ids);
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
                        return baasicApp.metering.statistics.find(options);
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
                        return baasicApp.metering.acl.get(options);
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
                        return baasicApp.metering.acl.update(options);
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
                        return baasicApp.metering.acl.removeByUser(id, action, user, data);
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
                        return baasicApp.metering.acl.removeByRole(id, action, role, data);
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
                    return baasicApp.metering.settings.get(options);
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
                    return baasicApp.metering.settings.update(data);
                },
                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicMeteringSettingsService.routeService.get.expand(expandObject);
                 **/
                routeService: baasicApp.metering.settings.routeDefinition
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
                        return baasicApp.notifications.publish.create(data);
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
                            return baasicApp.notifications.publish.batch.create(data);
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
                            return baasicApp.notifications.subscriptions.users.create(data);
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
                            return baasicApp.notifications.subscriptions.users.find(options);
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
                            return baasicApp.notifications.subscriptions.users.get(id, options);
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
                            return baasicApp.notifications.subscriptions.users.remove(data);
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
                            return baasicApp.notifications.subscriptions.users.update(data);
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
                                return baasicApp.notifications.subscriptions.batch.create(data);
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
                                return baasicApp.notifications.subscriptions.batch.remove(ids);
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
                                return baasicApp.notifications.subscriptions.batch.update(data);
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
                            return baasicApp.notifications.subscriptions.anonymous.create(data);
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
                            return baasicApp.notifications.subscriptions.anonymous.find(options);
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
                            return baasicApp.notifications.subscriptions.anonymous.get(id, options);
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
                            return baasicApp.notifications.subscriptions.anonymous.remove(data);
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
                            return baasicApp.notifications.subscriptions.anonymous.update(data);
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
                                return baasicApp.notifications.subscriptions.anonymous.batch.create(data);
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
                                return baasicApp.notifications.subscriptions.anonymous.batch.remove(ids);
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
                                return baasicApp.notifications.subscriptions.anonymous.batch.update(data);
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
                            return baasicApp.notifications.registrations.users.create(data);
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
                            return baasicApp.notifications.registrations.users.find(options);
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
                            return baasicApp.notifications.registrations.users.get(id, options);
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
                            return baasicApp.notifications.registrations.users.remove(data);
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
                            return baasicApp.notifications.registrations.users.update(data);
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
                                return baasicApp.notifications.registrations.users.batch.create(data);
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
                                return baasicApp.notifications.registrations.users.batch.remove(ids);
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
                                return baasicApp.notifications.registrations.users.batch.update(data);
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
                            return baasicApp.notifications.registrations.anonymous.create(data);
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
                            return baasicApp.notifications.registrations.anonymous.find(options);
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
                            return baasicApp.notifications.registrations.anonymous.get(id, options);
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
                            return baasicApp.notifications.registrations.anonymous.remove(data);
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
                            return baasicApp.notifications.registrations.anonymous.update(data);
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
                                return baasicApp.notifications.registrations.anonymous.batch.create(data);
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
                                return baasicApp.notifications.registrations.anonymous.batch.remove(ids);
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
                                return baasicApp.notifications.registrations.anonymous.batch.update(data);
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
                        return baasicApp.notifications.settings.get(provider);
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
                        return baasicApp.notifications.settings.update(data);
                    }
                },

                /**
                 * Provides direct access to `baasicNotificationsRouteService`.
                 * @method
                 * @example baasicNotificationsService.routeService.publish.create.expand({});
                 */
                routeService: baasicApp.notifications.routeDefinition
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
                    app.membership.permissions.resetPermissions();
                },
                /**
                 * Checks if current user has permissions to perform a certain action. To optimize performance this information is cached and can be reset using the resetPermissions action. Permissions cache should be reset when updated user information is set.
                 * @method        
                 * @example baasicAuthorizationService.hasPermission("<baasic-Section>.<action>");				
                 **/
                hasPermission: function (authorization) {
                    return app.membership.permissions.hasPermission(authorization);
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
                    return baasicApp.membership.permissions.find(section, options);
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
                    return baasicApp.membership.permissions.getActions(options);
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

                    baasicApp.membership.permissions.getPermissionSubjects(options).then(function (data) {
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
                    return baasicApp.membership.permissions.create(data);
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
                    return baasicApp.membership.permissions.remove(data);
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
                    return baasicApp.membership.permissions.createPermission(section, actionCollection, membershipItem);
                },
                /**
                 * Finds a permission in a given permission collection.
                 * @method        
                 * @example baasicPermissionsService.findPermission(permissionObj, permissionCollection);
                 **/
                findPermission: function (permission, permissionCollection) {
                    return baasicApp.membership.permissions.findPermission(permission, permissionCollection);
                },
                /**
                 * Checks if a permission object exists in a given permission collection.
                 * @method        
                 * @example baasicPermissionsService.exists(permissionObj, permissionCollection);
                 **/
                exists: function (permission, permissionCollection) {
                    return baasicApp.membership.permissions.exists(permission, permissionCollection);
                },
                /**
                 * Returns a promise that is resolved once the togglePermission action has been completed. The action will internally either call a `remove` or `create` action based on given criteria.
                 * @method        
                 * @example baasicPermissionsService.togglePermission(permissionObj, action);
                 **/
                togglePermission: function (permission, action) {
                    return baasicApp.membership.permissions.togglePermission(permission, action);
                },
                /**
                 * Fetches and returns and object containing all existing module permissions.
                 * @method        
                 * @example baasicPermissionsService.getModulePermissions('<section-name>');
                 **/
                getModulePermissions: function (section) {
                    return baasicApp.membership.permissions.getModulePermissions(section);
                },
                /**
                 * Provides direct access to `baasicPermissionsRouteService`.
                 * @method        
                 * @example baasicPermissionsService.routeService.get.expand(expandObject);
                 **/
                routeService: baasicApp.membership.permissions.routeDefinition
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
                    return baasicApp.templating.find(options);
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
                    return baasicApp.templating.get(id, options);
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
                    return baasicApp.templating.create(data);
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
                    return baasicApp.templating.update(data);
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
                    return baasicApp.templating.remove(data);
                },
                /**
                 * Provides direct access to `baasicKeyValueRouteService`.
                 * @method        
                 * @example baasicTemplatingService.routeService.get.expand(expandObject);
                 **/
                routeService: baasicApp.templating.routeDefinition,
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
                        return baasicApp.templating.batch.create(data);
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
                        return baasicApp.templating.batch.update(data);
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
                        return baasicApp.templating.batch.remove(ids);
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
                    return baasicApp.userProfile.company.create(data);
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
                    return baasicApp.userProfile.company.find(options);
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
                    return baasicApp.userProfile.company.get(id, options);
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
                    return baasicApp.userProfile.company.remove(data);
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
                    return baasicApp.userProfile.company.update(data);
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
                        return baasicApp.userProfile.company.batch.create(data);
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
                        return baasicApp.userProfile.company.batch.update(data);
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
                        return baasicApp.userProfile.company.batch.remove(ids);
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
                    return baasicApp.userProfile.organization.create(data);
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
                    return baasicApp.userProfile.organization.find(options);
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
                    return baasicApp.userProfile.organization.get(id, options);
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
                    return baasicApp.userProfile.organization.remove(params[baasicConstants.modelPropertyName].links('delete').href);
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
                    return baasicApp.userProfile.organization.update(data);
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
                        return baasicApp.userProfile.organization.batch.create(data);
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
                        return baasicApp.userProfile.organization.batch.update(data);
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
                        return baasicApp.userProfile.organization.batch.remove(ids);
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
                    return baasicApp.userProfile.skill.create(data);
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
                    return baasicApp.userProfile.skill.find(options);
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
                    return baasicApp.userProfile.skill.get(id, options);
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
                    return baasicApp.userProfile.skill.remove(data);
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
                    return baasicApp.userProfile.skill.update(data);
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
                        return baasicApp.userProfile.skill.batch.create(data);
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
                        return baasicApp.userProfile.skill.batch.update(data);
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
                        return baasicApp.userProfile.skill.batch.remove(ids);
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
                    return baasicApp.userProfile.profile.education.create(data);
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
                    return baasicApp.userProfile.profile.education.find(options);
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
                    return baasicApp.userProfile.profile.education.get(id, options);
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
                    return baasicApp.userProfile.profile.education.remove(data);
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
                    return baasicApp.userProfile.profile.education.update(data);
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
                    return baasicApp.userProfile.profile.avatar.get(id, options);
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
                    return baasicApp.userProfile.profile.avatar.unlink(data, options);
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
                    return baasicApp.userProfile.profile.avatar.update(data);
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
                    return baasicApp.userProfile.profile.avatar.link(id, data);
                },
                routeService: baasicApp.userProfile.profile.avatar.routeDefinition,
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
                        return baasicApp.userProfile.profile.avatar.streams.get(data);
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
                        return baasicApp.userProfile.profile.avatar.streams.getBlob(data);
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
                        return baasicApp.userProfile.profile.avatar.streams.update(data, stream);
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
                        return baasicApp.userProfile.profile.avatar.streams.create(id, data, stream);
                    },
                    routeService: baasicApp.userProfile.profile.avatar.streams.routeDefinition,
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
                    return baasicApp.userProfile.profile.find(options);
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
                    return baasicApp.userProfile.profile.get(id, options);
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
                    return baasicApp.userProfile.profile.create(data);
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
                    return baasicApp.userProfile.profile.update(data);
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
                    return baasicApp.userProfile.profile.remove(data);
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
                        return baasicApp.userProfile.profile.get(options);
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
                        return baasicApp.userProfile.profile.update(options);
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
                        return baasicApp.userProfile.profile.removeByUser(profileId, action, user, data);
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
                        return baasicApp.userProfile.profile.removeByRole(profileId, action, role, data);
                    }
                },
                /**
                 * Provides direct access to `userProfileRouteService`.
                 * @method        
                 * @example baasicUserProfileService.routeService.get.expand(expandObject);
                 **/
                routeService: baasicApp.userProfile.profile.routeDefinition
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
                    return baasicApp.userProfile.profile.skill.create(data);
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
                    return baasicApp.userProfile.profile.skill.find(options);
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
                    return baasicApp.userProfile.profile.skill.get(id, options);
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
                    return baasicApp.userProfile.profile.skill.remove(data);
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
                    return baasicApp.userProfile.profile.skill.update(data);
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
                    return baasicApp.userProfile.profile.work.create(data);
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
                    return baasicApp.userProfile.profile.work.find(options);
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
                    return baasicApp.userProfile.profile.work.get(id, options);
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
                    return baasicApp.userProfile.profile.work.remove(data);
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
                    return baasicApp.userProfile.profile.work.update(data);
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
                    return baasicApp.valueSet.get(options);
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
                    return baasicApp.valueSet.get(setName, options);
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
                    return baasicApp.valueSet.post(data);
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
                    return baasicApp.valueSet.put(data);
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
                    return baasicApp.valueSet.delete(data);
                },
                /**
                 * Provides direct access to route defintion.
                 * @method        
                 * @example baasicValueSetService.routeService.get('<id>', expandObject);
                 **/
                routeService: baasicApp.valueSet.routeDefinition,
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
                        return baasicApp.valueSet.items.get(options);
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
                        return baasicApp.valueSet.items.get(setName, id, options);
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
                        return baasicApp.valueSet.items.post(data);
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
                        return baasicApp.valueSet.items.put(data);
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
                        return baasicApp.valueSet.items.delete(data);
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