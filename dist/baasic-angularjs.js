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
     * @module baasicApplicationSettingsRouteService
     * @description Baasic Application Settings Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Application Settings Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicApplicationSettingsRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicApplicationSettingsRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('applications/{?embed,fields}'),
                /**
                 * Parses update route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicApplicationSettingsRouteService.update.expand({});               
                 **/
                update: uriTemplateService.parse('applications/'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicApplicationSettingsRouteService.parse(
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
        // Tokenizer and unquote code taken from http://stackoverflow.com/questions/5288150/digest-authentication-w-jquery-is-it-possible/5288679#5288679
        var wwwAuthenticateTokenizer = (function () {
            var ws = '(?:(?:\\r\\n)?[ \\t])+',
                token = '(?:[\\x21\\x23-\\x27\\x2A\\x2B\\x2D\\x2E\\x30-\\x39\\x3F\\x41-\\x5A\\x5E-\\x7A\\x7C\\x7E]+)',
                quotedString = '"(?:[\\x00-\\x0B\\x0D-\\x21\\x23-\\x5B\\\\x5D-\\x7F]|' + ws + '|\\\\[\\x00-\\x7F])*"';

            return new RegExp(token + '(?:=(?:' + quotedString + '|' + token + '))?', 'g');
        })();

        function unquote(quotedString) {
            return quotedString.substr(1, quotedString.length - 2).replace(/(?:(?:\r\n)?[ \t])+/g, ' ');
        }

        function parseWWWAuthenticateHeader(value) {
            if (value) {
                var tokens = value.match(wwwAuthenticateTokenizer);
                if (tokens && tokens.length > 0) {
                    var wwwAutheniticate = {
                        scheme: tokens[0]
                    };

                    if (tokens.length > 1) {
                        var details = {};
                        for (var i = 1, l = tokens.length; i < l; i++) {
                            var values = tokens[i].split('=');
                            details[values[0]] = unquote(values[1]);
                        }

                        wwwAutheniticate.details = details;
                    }

                    return wwwAutheniticate;
                }
            }

            return undefined;
        }

        function startsWith(target, input) {
            return target.substring(0, input.length) === input;
        }

        function isAbsoluteUrl(url) {
            var lowerUrl = url.toLowerCase();
            return startsWith(lowerUrl, 'http://') || startsWith(lowerUrl, 'https://');
        }

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

        var proxyFactory = function proxyFactory($rootScope, $http, parser, app) {
            var apiUrl = app.getApiUrl();

            function removeToken(details) {
                var token = app.getAccessToken();
                app.updateAccessToken(null);
                $rootScope.$broadcast('token_error', {
                    token: token,
                    error: details.error,
                    /*jshint camelcase: false */
                    errorDescription: details.error_description
                });
            }

            function parseHeaders(headers) {
                var wwwAuthenticate = parseWWWAuthenticateHeader(headers('WWW-Authenticate'));
                if (wwwAuthenticate) {
                    if (wwwAuthenticate.scheme.toLowerCase() === 'bearer') {
                        var details = wwwAuthenticate.details;
                        if (details) {
                            if (details.error) {
                                switch (details.error) {
                                case 'invalid_token':
                                    removeToken(details);
                                    break;
                                case 'invalid_request':
                                    /*jshint camelcase: false */
                                    switch (details.error_description) { /*jshint camelcase: true */
                                    case 'Missing or invalid session':
                                        removeToken(details);
                                        break;
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            var proxyMethod = function (config) {
                if (config) {
                    config.withCredentials = true;
                    if (!isAbsoluteUrl(config.url)) {
                        config.url = apiUrl + config.url;
                    }

                    var headers = config.headers || (config.headers = {});

                    if (!headers.hasOwnProperty('Content-Type')) {
                        headers['Content-Type'] = 'application/json; charset=UTF-8';
                    } /*jshint sub: true */
                    if (!headers.hasOwnProperty('Accept')) {
                        headers['Accept'] = 'application/hal+json; charset=UTF-8';
                    } /*jshint sub: false */

                    var token = app.getAccessToken();
                    if (token) { /*jshint camelcase: false, sub: true */
                        headers['AUTHORIZATION'] = token.token_type + ' ' + token.access_token;
                    }
                }

                var promise = $http(config);

                promise = extend(promise.then(function (response) {
                    if (response.headers) {
                        var contentType = response.headers('Content-Type');
                        if (contentType && contentType.toLowerCase().indexOf('application/hal+json') !== -1) {
                            response.data = parser.parse(response.data);
                        }

                        parseHeaders(response.headers);
                    }
                }, function (response) {
                    if (response.headers) {
                        parseHeaders(response.headers);
                    }
                }).
                finally(function () {
                    var token = app.getAccessToken();
                    if (token) { /*jshint camelcase: false */
                        var slidingWindow = token.sliding_window; /*jshint camelcase: true */
                        if (slidingWindow) {
                            token.expireTime = new Date().getTime() + (token.slidingWindow * 1000);
                            app.updateAccessToken(token);
                        }
                    }
                }), promise);

                return promise;
            };

            createShortMethods(proxyMethod, 'get', 'delete', 'head', 'jsonp');
            createShortMethodsWithData(proxyMethod, 'post', 'put', 'patch');

            return proxyMethod;
        };

        module.service('baasicApiHttp', ['$rootScope', '$http', 'HALParser', 'baasicApp', function baasicApiHttp($rootScope, $http, HALParser, baasicApp) {
            var parser = new HALParser();

            var proxy = proxyFactory($rootScope, $http, parser, baasicApp.get());

            proxy.createNew = function (app) {
                return proxyFactory($rootScope, $http, parser, app);
            };

            return proxy;
        }]);
    })(angular, module);

    /* globals module */
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
            var defaultApp;
            /**
             * Create an application.
             * @method create       
             * @example
             var app = baasicApp.create('<api-key>', {
             apiRootUrl : 'api.baasic.com',
             // for beta please use "beta" as a desired version
             apiVersion : '<version>' 
             });
             **/
            this.create = function create(apiKey, config) {
                var defaultConfig = {
                    apiRootUrl: 'api.baasic.com',
                    apiVersion: 'beta'
                };
                var app = MonoSoftware.Baasic.Application.init(apiKey, angular.extend(defaultConfig, config));

                apps[apiKey] = app;
                if (!defaultApp) {
                    defaultApp = app;
                }

                return app;
            };

            this.$get = function () {
                return {
                    /**
                     * Returns a list of all applications.
                     * @method        
                     * @example baasicApp.all();               
                     **/
                    all: function () {
                        var list = [];
                        for (var key in apps) {
                            list.push(apps[key]);
                        }

                        return list;
                    },
                    /**
                     * Returns a specified application.
                     * @method        
                     * @example baasicApp.get('<api-key>');               
                     **/
                    get: function getBaasicApplication(apiKey) {
                        if (apiKey) {
                            return apps[apiKey];
                        } else {
                            return defaultApp;
                        }
                    }
                };
            };
        });
    }(angular, module)); /* globals module */
    /**
     * @module baasicLookupRouteService
     * @description Baasic Lookup Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Lookup Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */

    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicLookupRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses get route which can be expanded with additional options. Supported items are: 
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicLookupRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('lookups/{?embed,fields}'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicLookupRouteService.parse(
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
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicLookupService
     * @description Baasic Lookup Service provides an easy way to consume Baasic Lookup REST API end-points. In order to obtain needed routes `baasicLookupService` uses `baasicLookupRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicLookupService', ['baasicApiHttp', 'baasicApp', 'baasicApiService', 'baasicLookupRouteService', function (baasicApiHttp, baasicApp, baasicApiService, lookupRouteService) {
            function getResponseData(embed, data) {
                var responseData = {};
                if (embed) {
                    var embeds = embed.split(',');
                    for (var index in embeds) {
                        var propName = embeds[index];
                        if (data.hasOwnProperty(propName)) {
                            responseData[propName] = data[propName];
                        }
                    }
                }
                return responseData;
            }

            return {
                routeService: lookupRouteService,
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
                    var deferred = baasicApiHttp.createHttpDefer();
                    var embed = options.embed || 'role,accessAction,accessSection,snProvider';
                    baasicApiHttp.get(lookupRouteService.get.expand(baasicApiService.getParams({
                        embed: embed
                    }))).success(function (data, status, headers, config) {
                        var responseData = getResponseData(embed, data);
                        deferred.resolve({
                            data: responseData,
                            status: status,
                            headers: headers,
                            config: config
                        });
                    }).error(function (data, status, headers, config) {
                        deferred.reject({
                            data: data,
                            status: status,
                            headers: headers,
                            config: config
                        });
                    });
                    return deferred.promise;
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
    })(angular, module);
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
    var module = angular.module("baasic.dynamicResource", ["baasic.api"]);

    module.config(["$provide", function config($provide) {}]);

    /**
     * @module baasicDynamicResourceRouteService
     * @description Baasic Dynamic Resource Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Dynamic Resource Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicDynamicResourceRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `schemaName` - Name of the dynamic resource schema.
                 * - `searchQuery` - A string referencing dynamic resource properties using the phrase or BQL (Baasic Query Language) search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain dynamic resource subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the dynamic resource property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method      
                 * @example 
                 baasicDynamicResourceRouteService.find.expand({
                 schemaName: '<schema-name>', 
                 searchQuery: '<search-phrase>'
                 });
                 **/
                find: uriTemplateService.parse("resources/{schemaName}/{?searchQuery,page,rpp,sort,embed,fields}"),
                /**
                 * Parses get route which must be expanded with the name of the previously created dynamic resource schema in the system and the Id of the previously created dynamic resource. Additional expand supported items are:
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method      
                 * @example 
                 baasicDynamicResourceRouteService.find.expand({
                 schemaName: '<schema-name>', 
                 id: '<schema-id>'
                 });
                 **/
                get: uriTemplateService.parse("resources/{schemaName}/{id}/{?embed,fields}"),
                /**
                 * Parses create route, this URI template doesn't expose any additional properties.
                 * @method      
                 * @example baasicDynamicResourceRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse("resources/{schemaName}"),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicDynamicResourceRouteService.parse(
                 '<route>/{?embed,fields,options}'
                 ).expand(
                 {embed: '<embedded-resource>'}
                 );
                 **/
                parse: uriTemplateService.parse,
                acl: {
                    /**
                     * Parses get acl route; this URI template should be expanded with the Id of the dynamic resource and name of the dynamic resource schema.					
                     * @method acl.get       
                     * @example 
                     baasicDynamicResourceRouteService.acl.get.expand({
                     id: '<dynamic-resource-id>', 
                     schemaName: '<schema-name>'
                     });
                     **/
                    get: uriTemplateService.parse("resources/{schemaName}/{id}/acl/{?fields}"),
                    /**
                     * Parses update acl route; this URI template should be expanded with the Id of the dynamic resource and name of the dynamic resource schema.			
                     * @method acl.update       
                     * @example 
                     baasicDynamicResourceRouteService.acl.update.expand({
                     id: '<dynamic-resource-id>', 
                     schemaName: '<schema-name>'
                     });
                     **/
                    update: uriTemplateService.parse("resources/{schemaName}/{id}/acl/{?fields}"),
                    /**
                     * Parses deleteByUser acl route which can be expanded with additional options. Supported items are:
                     * - `schemaName` - Name of the dynamic resource schema.
                     * - `id` - Id of the dynamic resource.
                     * - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified user and dynamic resource item.
                     * - `user` - A value which uniquely identifies user for which ACL policy needs to be removed.					
                     * @method acl.deleteByUser       
                     * @example 
                     baasicDynamicResourceRouteService.acl.deleteByUser.expand({
                     schemaName: '<schema-name>', 
                     id: '<dynamic-resource-id>', 
                     accessAction: '<access-action>', 
                     user: '<username>'
                     });
                     **/
                    deleteByUser: uriTemplateService.parse("resources/{schemaName}/{id}/acl/actions/{accessAction}/users/{user}/"),
                    /**
                     * Parses deleteByRole acl route which can be expanded with additional options. Supported items are:
                     * - `schemaName` - Name of the dynamic resource schema.
                     * - `id` - Id of the dynamic resource.
                     * - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified role and dynamic resource item.
                     * - `role` - A value which uniquely identifies role for which ACL policy needs to be removed.					
                     * @method acl.deleteByRole       
                     * @example 
                     baasicDynamicResourceRouteService.acl.deleteByRole.expand({
                     schemaName: '<schema-name>', 
                     id: '<dynamic-resource-id>', 
                     accessAction: '<access-action>', 
                     role: '<role-name>'
                     });
                     **/
                    deleteByRole: uriTemplateService.parse("resources/{schemaName}/{id}/acl/actions/{accessAction}/roles/{role}/")
                }
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */

    /**
     * @module baasicDynamicResourceService
     * @description Baasic Dynamic Resource Service provides an easy way to consume Baasic Dynamic Resource REST API end-points. In order to obtain needed routes `baasicDynamicResourceService` uses `baasicDynamicResourceRouteService`.
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicDynamicResourceService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicDynamicResourceRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, dynamicResourceRouteService) {
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
                    return baasicApiHttp.get(dynamicResourceRouteService.find.expand(baasicApiService.findParams(angular.extend({
                        schemaName: schemaName
                    }, options))));
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
                    return baasicApiHttp.get(dynamicResourceRouteService.get.expand(baasicApiService.getParams(id, angular.extend({
                        schemaName: schemaName
                    }, options))));
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
                    var params = baasicApiService.getParams(schemaName, data, 'schemaName');
                    return baasicApiHttp.post(dynamicResourceRouteService.create.expand(params), baasicApiService.createParams(params)[baasicConstants.modelPropertyName]);
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
                    var opt = angular.extend({}, options);
                    var params = baasicApiService.updateParams(data);
                    var url = dynamicResourceRouteService.parse(params[baasicConstants.modelPropertyName].links('put').href).expand(opt);
                    return baasicApiHttp.put(url, params[baasicConstants.modelPropertyName]);
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
                    var opt = angular.extend({}, options);
                    var params = baasicApiService.updateParams(data);
                    var url = dynamicResourceRouteService.parse(params[baasicConstants.modelPropertyName].links('patch').href).expand(opt);
                    return baasicApiHttp.patch(url, params[baasicConstants.modelPropertyName]);
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
                    var opt = angular.extend({}, options);
                    var params = baasicApiService.removeParams(data);
                    var url = dynamicResourceRouteService.parse(params[baasicConstants.modelPropertyName].links('delete').href).expand(opt);
                    return baasicApiHttp.delete(url);
                },
                /**
                 * Provides direct access to `baasicDynamicResourceRouteService`.
                 * @method        
                 * @example baasicDynamicResourceService.routeService.get.expand(expandObject);
                 **/
                routeService: dynamicResourceRouteService,
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
                        var params = angular.extend({}, options);
                        return baasicApiHttp.get(dynamicResourceRouteService.acl.get.expand(params));
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
                        var params = angular.extend({}, options);
                        return baasicApiHttp.put(dynamicResourceRouteService.acl.get.expand(params), params[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.removeParams(data);
                        params.user = user;
                        params.accessAction = action;
                        return baasicApiHttp.delete(dynamicResourceRouteService.acl.deleteByUser.expand(params));
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
                        var params = baasicApiService.removeParams(data);
                        params.role = role;
                        params.accessAction = action;
                        return baasicApiHttp.delete(dynamicResourceRouteService.acl.deleteByRole.expand(params));
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

    /**
     * @module baasicDynamicSchemaRouteService
     * @description Baasic Dynamic Schema Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Dynamic Schema Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */

    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicDynamicSchemaRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing dynamic resource schema properties using the phrase or BQL (Baasic Query Language) search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain dynamic resource schema subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the dynamic resource schema property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method      
                 * @example 
                 baasicDynamicSchemaRouteService.find.expand(
                 {searchQuery: '<search-phrase>'}
                 );
                 **/
                find: uriTemplateService.parse("schemas/{?searchQuery,page,rpp,sort,embed,fields}"),
                /**
                 * Parses get route which must be expanded with name of the previously created dynamic resource schema. Additional expand supported items are:
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method      
                 * @example 
                 baasicDynamicSchemaRouteService.find.expand(
                 {name: '<schema-name>'}
                 );
                 **/
                get: uriTemplateService.parse("schemas/{name}/{?embed,fields}"),
                /**
                 * Parses create route; this URI template doesn't expose any additional properties.
                 * @method      
                 * @example baasicDynamicSchemaRouteService.create.expand({});              
                 **/
                generate: uriTemplateService.parse("schemas/generate"),
                /**
                 * Parses create route; this URI template doesn't expose any additional properties.
                 * @method      
                 * @example baasicDynamicSchemaRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse("schemas"),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicDynamicSchemaRouteService.parse(
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
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */
    /**
     * @module baasicDynamicSchemaService
     * @description Baasic Dynamic Schema Service provides an easy way to consume Baasic Dynamic Schema REST API end-points. In order to obtain needed routes `baasicDynamicSchemaService` uses `baasicDynamicSchemaRouteService`.
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicDynamicSchemaService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicDynamicSchemaRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, dynamicSchemaRouteService) {
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
                    return baasicApiHttp.get(dynamicSchemaRouteService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(dynamicSchemaRouteService.get.expand(baasicApiService.getParams(name, options, 'name')));
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
                    return baasicApiHttp.post(dynamicSchemaRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                    return baasicApiHttp.post(dynamicSchemaRouteService.generate.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                /**
                 * Provides direct access to `baasicDynamicSchemaRouteService`.
                 * @method        
                 * @example baasicDynamicSchemaService.routeService.get.expand(expandObject);
                 **/
                routeService: dynamicSchemaRouteService
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
    var module = angular.module("baasic.keyValue", ["baasic.api"]);

    module.config(["$provide", function config($provide) {}]);

    /**
     * @module baasicKeyValueService
     * @description Baasic Key Value Service provides an easy way to consume Baasic Key Value REST API end-points. 
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicKeyValueService", ["baasicApp", function (baasicApp) {
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
        module.service('baasicLoginService', ['baasicApp', function (baasicApp) {

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
    /* globals module */
    /**
     * @module baasicPasswordRecoveryService
     * @description Baasic Password Recovery Service provides an easy way to consume Baasic Password Recovery REST API end-points. 
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicPasswordRecoveryService', ['baasicApp', function (baasicApp) {
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
        module.service('baasicRegisterService', ['baasicApp', function (baasicApp) {
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
        module.service('baasicRoleService', ['baasicApp', function (baasicApp) {
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
        module.service('baasicUserService', ['baasicApp', function (baasicApp) {
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
     * @module baasicMeteringCategoryRouteService
     * @description Baasic Metering Category Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Metering Category Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicMeteringCategoryRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find metering category route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string value used to identify metering resources using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain metering subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the metering property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicMeteringCategoryRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('metering/categories/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicMeteringCategoryRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('metering/categories/{id}/{?embed,fields}'),
                /**
                 * Parses create metering category route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicMeteringCategoryRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('metering/categories'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example baasicMeteringCategoryRouteService.parse('<route>/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
                 **/
                parse: uriTemplateService.parse,
                batch: {
                    /**
                     * Parses create route; this URI template does not expose any additional options.
                     * @method batch.create       
                     * @example baasicMeteringCategoryRouteService.batch.create.expand({});              
                     **/
                    create: uriTemplateService.parse('metering/categories/batch'),
                    /**
                     * Parses remove route; this URI template does not expose any additional options.
                     * @method batch.remove       
                     * @example baasicMeteringCategoryRouteService.batch.remove.expand({});              
                     **/
                    remove: uriTemplateService.parse('metering/categories/batch'),
                    /**
                     * Parses update route; this URI template does not expose any additional options.
                     * @method batch.update       
                     * @example baasicMeteringCategoryRouteService.batch.update.expand({});              
                     **/
                    update: uriTemplateService.parse('metering/categories/batch')
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
     - Refer to the [REST API documentation](http://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */


    /* globals module */
    /**
     * @module baasicMeteringCategoryService
     * @description Baasic Metering Category Service provides an easy way to consume Baasic Metering REST API end-points. In order to obtain a needed routes `baasicMeteringCategoryService` uses `baasicMeteringCategoryRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicMeteringCategoryService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicMeteringCategoryRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, routeService) {
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
                    return baasicApiHttp.get(routeService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(routeService.get.expand(baasicApiService.getParams(id, options)));
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
                    return baasicApiHttp.post(routeService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicMeteringCategoryService.routeService.get.expand(expandObject);
                 **/
                routeService: routeService,
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
                        return baasicApiHttp.post(routeService.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp.post(routeService.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp({
                            url: routeService.batch.remove.expand(),
                            method: 'DELETE',
                            data: ids
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

    /* globals module */
    /**
     * @module baasicMeteringRouteService
     * @description Baasic Metering Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Metering Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicMeteringRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find metering route which can be expanded with additional options. Supported items are: 
                 * - `applicationId` - The application identifier.
                 * - `categories` - The metering categories  in CSV format.
                 * - `from` - The from date.
                 * - `to` - The to date.
                 * - `names` - The name of the resource inside the category in CSV format.
                 * - `moduleNames` - The name of the resource inside the category in CSV format.
                 * - `statuses` - The operation status in CSV format.
                 * - `endpoints` - The back-end endpoint in CSV format.
                 * - `sources` - The metering collector source in CSV format.
                 * - `searchQuery` - A string value used to identify metering resources using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain metering subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the metering property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicMeteringRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('metering/data/{?applicationId,searchQuery,categories,from,to,names,moduleNames,statuses,endpoints,sources,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicMeteringRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('metering/data/{id}/{?embed,fields}'),
                /**
                 * Parses create metering route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicMeteringRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('metering/data'),
                /**
                 * Parses purge metering data route: this URI template does not expose any additional options.
                 * @method
                 * @example baasicMeteringRouteService.purge.expand({});  
                 **/
                purge: uriTemplateService.parse('metering/data/purge'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example baasicMeteringRouteService.parse('<route>/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
                 **/
                parse: uriTemplateService.parse,
                statistics: {
                    /**
                     * Parses find metering route which can be expanded with additional options. Supported items are: 
                     * - `category` - The metering category.
                     * - `applicationId` - The application identifier.
                     * - `rateBy` - The sampling rate by minute,hour,day,week, month or year.
                     * - `from` - The from date.
                     * - `to` - The to date.
                     * - `names` - The name of the resource inside the category in CSV format.
                     * - `moduleNames` - The name of the resource inside the category in CSV format.
                     * - `statuses` - The operation status in CSV format.
                     * - `endpoints` - The back-end endpoint in CSV format.
                     * - `sources` - The metering collector source in CSV format.                    
                     * - `page` - A value used to set the page number, i.e. to retrieve certain metering subset from the storage.
                     * - `rpp` - A value used to limit the size of result set per page.
                     * - `sort` - A string used to set the metering property to sort the result collection by.
                     * - `embed` - Comma separated list of resources to be contained within the current representation.
                     * @method        
                     * @example baasicMeteringRouteService.statistics.find.expand({category: '<category-name-or-id>'});               
                     **/
                    find: uriTemplateService.parse('metering/statistics/{category}/{?applicationIds,rateBy,from,to,names,moduleNames,statuses,endpoints,sources,page,rpp,sort,embed,fields}'),
                },
                batch: {
                    /**
                     * Parses create route; this URI template does not expose any additional options.
                     * @method batch.create       
                     * @example baasicMeteringRouteService.batch.create.expand({});              
                     **/
                    create: uriTemplateService.parse('metering/data/batch'),
                    /**
                     * Parses remove route; this URI template does not expose any additional options.
                     * @method batch.remove       
                     * @example baasicMeteringRouteService.batch.remove.expand({});              
                     **/
                    remove: uriTemplateService.parse('metering/data/batch'),
                    /**
                     * Parses update route; this URI template does not expose any additional options.
                     * @method batch.update       
                     * @example baasicMeteringRouteService.batch.update.expand({});              
                     **/
                    update: uriTemplateService.parse('metering/data/batch')
                },
                acl: {
                    /**
                     * Parses get metering acl route; this URI template should be expanded with the Id of the metering.					
                     * @method acl.get       
                     * @example 
                     baasicMeteringRouteService.acl.get.expand(
                     {id: '<id>'}
                     );
                     **/
                    get: uriTemplateService.parse('metering/data/{id}/acl/{?fields}'),
                    /**
                     * Parses update metering acl route; this URI template should be expanded with the Id of the metering.					
                     * @method acl.update       
                     * @example 
                     baasicMeteringRouteService.acl.update.expand(
                     {id: '<id>'}
                     );
                     **/
                    update: uriTemplateService.parse('metering/data/{id}/acl/{?fields}'),
                    /**
                     * Parses deleteByUser metering acl route which can be expanded with additional options. Supported items are:
                     * - `id` - Id of the metering.
                     * - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified user and metering resource.
                     * - `user` - A value which uniquely identifies user for which ACL policy needs to be removed.					
                     * @method acl.deleteByUser       
                     * @example 
                     baasicMeteringRouteService.acl.deleteByUser.expand({
                     id: '<id>', 
                     accessAction: '<access-action>', 
                     user: '<username>'
                     });
                     **/
                    deleteByUser: uriTemplateService.parse('metering/data/{id}/acl/actions/{accessAction}/users/{user}/'),
                    /**
                     * Parses deleteByUser metering acl route which can be expanded with additional options. Supported items are:
                     * - `id` - Id of the metering.
                     * - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified role and metering resource.
                     * - `role` - A value which uniquely identifies role for which ACL policy needs to be removed.					
                     * @method acl.deleteByRole       
                     * @example 
                     baasicMeteringRouteService.acl.deleteByRole.expand({
                     id: '<id>', 
                     accessAction: '<access-action>', 
                     role: '<role-name>'
                     });
                     **/
                    deleteByRole: uriTemplateService.parse('metering/data/{id}/acl/actions/{accessAction}/roles/{role}/')
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
     * @module baasicMeteringService
     * @description Baasic Metering Service provides an easy way to consume Baasic Metering REST API end-points. In order to obtain a needed routes `baasicMeteringService` uses `baasicMeteringRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicMeteringService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicMeteringRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, routeService) {
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
                    return baasicApiHttp.get(routeService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(routeService.get.expand(baasicApiService.getParams(id, options)));
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
                    return baasicApiHttp.post(routeService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                    return baasicApiHttp.delete(routeService.purge.expand({}));
                },
                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicMeteringService.routeService.get.expand(expandObject);
                 **/
                routeService: routeService,
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
                        return baasicApiHttp.post(routeService.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp.post(routeService.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp({
                            url: routeService.batch.remove.expand(),
                            method: 'DELETE',
                            data: ids
                        });
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
                        return baasicApiHttp.get(routeService.statistics.find.expand(baasicApiService.findParams(options)));
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
                        var params = angular.copy(options);
                        return baasicApiHttp.get(routeService.acl.get.expand(params));
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
                        var params = angular.copy(options);
                        return baasicApiHttp.put(routeService.acl.get.expand(params), params[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.removeParams(data);
                        params.id = id;
                        params.user = user;
                        params.accessAction = action;
                        return baasicApiHttp.delete(routeService.acl.deleteByUser.expand(params));
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
                        var params = baasicApiService.removeParams(data);
                        params.id = id;
                        params.role = role;
                        params.accessAction = action;
                        return baasicApiHttp.delete(routeService.acl.deleteByRole.expand(params));
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
     * @module baasicMeteringSettingsRouteService
     * @description Baasic Metering Settings Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Metering settings Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicMeteringSettingsRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicMeteringSettingsRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('metering/settings/{id}/{?embed,fields}'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example baasicMeteringSettingsRouteService.parse('<route>/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
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
     * @module baasicMeteringSettingsService
     * @description Baasic Metering Settings Service provides an easy way to consume Baasic Metering REST API end-points. In order to obtain a needed routes `baasicMeteringSettingsService` uses `baasicMeteringSettingsRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicMeteringSettingsService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicMeteringSettingsRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, routeService) {
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
                    return baasicApiHttp.get(routeService.get.expand(baasicApiService.getParams(options)));
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                /**
                 * Provides direct access to `routeService`.
                 * @method        
                 * @example baasicMeteringSettingsService.routeService.get.expand(expandObject);
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
     * @module baasicNotificationsRouteService
     * @description Baasic Notifications Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Notifications Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicNotificationsRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                publish: {
                    /**
                     * Parses create publish route; this route does not expose any additional options.
                     * @method publish.create
                     * @example baasicNotificationsRouteService.publish.create.expand({});
                     */
                    create: uriTemplateService.parse('notifications/publish'),

                    batch: {
                        /**
                         * Parses create publish batch route; this route does not expose any additional options.
                         * @method publish.batch.create
                         * @example baasicNotificationsRouteService.publish.batch.create.expand({});
                         */
                        create: uriTemplateService.parse('notifications/publish/batch')
                    }
                },
                subscriptions: {
                    users: {
                        /**
                         * Parses create user subscription route; this route does not expose any additional options
                         * @method subscriptions.users.create
                         * @example baasicNotificationsRouteService.subscriptions.users.create.expand({});
                         */
                        create: uriTemplateService.parse('notifications/subscriptions'),

                        /**
                         * Parses find user subscriptions route which can be expanded with additional options. Supported items are: 
                         * - `searchQuery` - A string referencing user subscription properties using the phrase search.
                         * - `userIds` - Comma separated list of user identifiers.
                         * - `channels` - Comma separated list of channels.
                         * - `page` - A value used to set the page number, i.e. to retrieve certain user subscriptions subset from the storage.
                         * - `rpp` - A value used to limit the size of result set per page.
                         * - `sort` - A string used to set the user subscription property to sort the result collection by.
                         * - `embed` - Comma separated list of resources to be contained within the current representation.
                         * @method subscriptions.users.find
                         * @example 
                         baasicNotificationsRouteService.subscriptions.users.find.expand({
                         searchQuery: '<search-phrase>',
                         channels: '<channel-name>,<channel-name>'
                         });
                         */
                        find: uriTemplateService.parse('notifications/subscriptions/{?searchQuery,userIds,channels,page,rpp,sort,embed,fields}'),

                        /**
                         * Parses get user subscription route; this route should be expanded with the Id of user subscription resource.
                         * @method subscriptions.users.get
                         * @example
                         baasicNotificationsRouteService.subscriptions.users.get.expand({
                         id: '<subscription-id>'
                         });
                         */
                        get: uriTemplateService.parse('notifications/subscriptions/{id}/{?embed,fields}'),

                        batch: {
                            /**
                             * Parses create user subscriptions batch route; this route does not expose any additional options
                             * @method subscriptions.users.batch.create
                             * @example baasicNotificationsRouteService.subscriptions.users.batch.create.expand({});
                             */
                            create: uriTemplateService.parse('notifications/subscriptions/batch'),

                            /**
                             * Parses remove user subscriptions batch route; this route does not expose any additional options
                             * @method subscriptions.users.batch.remove
                             * @example baasicNotificationsRouteService.subscriptions.users.batch.remove.expand({});
                             */
                            remove: uriTemplateService.parse('notifications/subscriptions/batch'),

                            /**
                             * Parses update user subscriptions batch route; this route does not expose any additional options
                             * @method subscriptions.users.batch.update
                             * @example baasicNotificationsRouteService.subscriptions.users.batch.update.expand({});
                             */
                            update: uriTemplateService.parse('notifications/subscriptions/batch')
                        }
                    },
                    anonymous: {
                        /**
                         * Parses create anonymous subscription route; this route does not expose any additional options
                         * @method subscriptions.anonymous.create
                         * @example baasicNotificationsRouteService.subscriptions.anonymous.create.expand({});
                         */
                        create: uriTemplateService.parse('notifications/subscriptions/anonymous'),

                        /**
                         * Parses find anonymous subscriptions route which can be expanded with additional options. Supported items are: 
                         * - `searchQuery` - A string referencing user subscription properties using the phrase search.
                         * - `registrationIds` - Comma separated list of anonymous registration identifiers.
                         * - `channels` - Comma separated list of channels.
                         * - `page` - A value used to set the page number, i.e. to retrieve certain user subscription subset from the storage.
                         * - `rpp` - A value used to limit the size of result set per page.
                         * - `sort` - A string used to set the user subscription property to sort the result collection by.
                         * - `embed` - Comma separated list of resources to be contained within the current representation.
                         * @method        
                         * @example 
                         baasicNotificationsRouteService.subscriptions.anonymous.find.expand({
                         searchQuery: '<search-phrase>',
                         channels: '<channel-name>,<channel-name>'
                         });
                         */
                        find: uriTemplateService.parse('notifications/subscriptions/anonymous/{?searchQuery,registrationIds,channels,page,rpp,sort,embed,fields}'),

                        /**
                         * Parses get anonymous subscription route; this route should be expanded with the Id of anonymous subscription resource.
                         * @method subscriptions.anonymous.get
                         * @example
                         baasicNotificationsRouteService.subscriptions.anonymous.get.expand({
                         id: '<subscription-id>'
                         });
                         */
                        get: uriTemplateService.parse('notifications/subscriptions/anonymous/{id}/{?embed,fields}'),

                        batch: {
                            /**
                             * Parses create anonymous subscription batch route; this route does not expose any additional options
                             * @method subscriptions.anonymous.batch.create
                             * @example baasicNotificationsRouteService.subscriptions.anonymous.batch.create.expand({});
                             */
                            create: uriTemplateService.parse('notifications/subscriptions/anonymous/batch'),

                            /**
                             * Parses remove anonymous subscription batch route; this route does not expose any additional options
                             * @method subscriptions.anonymous.batch.remove
                             * @example baasicNotificationsRouteService.subscriptions.anonymous.batch.remove.expand({});
                             */
                            remove: uriTemplateService.parse('notifications/subscriptions/anonymous/batch'),

                            /**
                             * Parses update anonymous subscription batch route; this route does not expose any additional options
                             * @method subscriptions.anonymous.batch.update
                             * @example baasicNotificationsRouteService.subscriptions.anonymous.batch.update.expand({});
                             */
                            update: uriTemplateService.parse('notifications/subscriptions/anonymous/batch')
                        }
                    }
                },
                registrations: {
                    users: {
                        /**
                         * Parses create users registrations route; this route does not expose any additional options
                         * @method registrations.users.create
                         * @example baasicNotificationsRouteService.registrations.users.create.expand({});
                         */
                        create: uriTemplateService.parse('notifications/registrations'),

                        /**
                         * Parses find users registrations route which can be expanded with additional options. Supported items are: 
                         * - `searchQuery` - A string referencing user subscription properties using the phrase search.
                         * - `userIds` - Comma separated list of user identifiers.
                         * - `providers` - Comma separated list of notification providers.
                         * - `page` - A value used to set the page number, i.e. to retrieve certain user subscription subset from the storage.
                         * - `rpp` - A value used to limit the size of result set per page.
                         * - `sort` - A string used to set the user subscription property to sort the result collection by.
                         * - `embed` - Comma separated list of resources to be contained within the current representation.
                         * @method        
                         * @example 
                         baasicNotificationsRouteService.registrations.users.find.expand({
                         searchQuery: '<search-phrase>',
                         providers: '<provider-name>,<provider-name>'
                         });
                         */
                        find: uriTemplateService.parse('notifications/registrations/{?searchQuery,userIds,providers,page,rpp,sort,embed,fields}'),

                        /**
                         * Parses get users registrations route; this route should be expanded with the Id of users registrations resource.
                         * @method registrations.users.get
                         * @example
                         baasicNotificationsRouteService.registrations.users.get.expand({
                         id: '<registration-id>'
                         });
                         */
                        get: uriTemplateService.parse('notifications/registrations/{id}/{?embed}'),

                        batch: {
                            /**
                             * Parses create users registrations batch route; this route does not expose any additional options
                             * @method registrations.users.batch.create
                             * @example baasicNotificationsRouteService.registrations.users.batch.create.expand({});
                             */
                            create: uriTemplateService.parse('notifications/registrations/batch'),

                            /**
                             * Parses remove users registrations batch route; this route does not expose any additional options
                             * @method registrations.users.batch.remove
                             * @example baasicNotificationsRouteService.registrations.users.batch.remove.expand({});
                             */
                            remove: uriTemplateService.parse('notifications/registrations/batch'),

                            /**
                             * Parses update users registrations batch route; this route does not expose any additional options
                             * @method registrations.users.batch.update
                             * @example baasicNotificationsRouteService.registrations.users.batch.update.expand({});
                             */
                            update: uriTemplateService.parse('notifications/registrations/batch'),
                        }
                    },
                    anonymous: {
                        /**
                         * Parses create anonymous registrations route; this route does not expose any additional options
                         * @method registrations.anonymous.create
                         * @example baasicNotificationsRouteService.registrations.anonymous.create.expand({});
                         */
                        create: uriTemplateService.parse('notifications/registrations/anonymous'),

                        /**
                         * Parses find anonymous registrations route which can be expanded with additional options. Supported items are: 
                         * - `searchQuery` - A string referencing user subscription properties using the phrase search.
                         * - `providers` - Comma separated list of notification providers.
                         * - `page` - A value used to set the page number, i.e. to retrieve certain user subscription subset from the storage.
                         * - `rpp` - A value used to limit the size of result set per page.
                         * - `sort` - A string used to set the user subscription property to sort the result collection by.
                         * - `embed` - Comma separated list of resources to be contained within the current representation.
                         * @method        
                         * @example 
                         baasicNotificationsRouteService.registrations.anonymous.find.expand({
                         searchQuery: '<search-phrase>',
                         providers: '<provider-name>,<provider-name>'
                         });
                         */
                        find: uriTemplateService.parse('notifications/registrations/anonymous/{?searchQuery,providers,page,rpp,sort,embed,fields}'),

                        /**
                         * Parses get anonymous registrations route; this route should be expanded with the Id of anonymous registrations resource.
                         * @method registrations.anonymous.get
                         * @example
                         baasicNotificationsRouteService.registrations.anonymous.get.expand({
                         id: '<registration-id>'
                         });
                         */
                        get: uriTemplateService.parse('notifications/registrations/anonymous/{id}/{?embed}'),

                        batch: {
                            /**
                             * Parses create anonymous registrations batch route; this route does not expose any additional options
                             * @method registrations.anonymous.batch.create
                             * @example baasicNotificationsRouteService.registrations.anonymous.batch.create.expand({});
                             */
                            create: uriTemplateService.parse('notifications/registrations/anonymous/batch'),

                            /**
                             * Parses remove anonymous registrations batch route; this route does not expose any additional options
                             * @method registrations.anonymous.batch.remove
                             * @example baasicNotificationsRouteService.registrations.anonymous.batch.remove.expand({});
                             */
                            remove: uriTemplateService.parse('notifications/registrations/anonymous/batch'),

                            /**
                             * Parses update anonymous registrations batch route; this route does not expose any additional options
                             * @method registrations.anonymous.batch.update
                             * @example baasicNotificationsRouteService.registrations.anonymous.batch.update.expand({});
                             */
                            update: uriTemplateService.parse('notifications/registrations/anonymous/batch')
                        }
                    }
                },
                settings: {
                    /**
                     * Parses get notification settings route; this route should be expanded with the notification provider name.
                     * @method settings.get
                     * @example
                     baasicNotificationsRouteService.settings.get.expand({
                     id: '<provider-name>'
                     });
                     */
                    get: uriTemplateService.parse('notifications/settings/{id}'),

                    /**
                     * Parses update notification settings route; this route should be expanded with the notification provider name.
                     * @method settings.update
                     * @example
                     baasicNotificationsRouteService.settings.update.expand({
                     id: '<provider-name>'
                     });
                     */
                    update: uriTemplateService.parse('notifications/settings/{id}')
                }
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
     * @module baasicNotificationsService
     * @description Baasic Notifications Service provides an easy way to consume Baasic Notifications REST API end-points. In order to obtain needed routes `baasicNotificationsService` uses `baasicNotificationsRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicNotificationsService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicNotificationsRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, notificationsRouteService) {
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
                        return baasicApiHttp.post(notificationsRouteService.publish.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                            return baasicApiHttp.post(notificationsRouteService.publish.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                            return baasicApiHttp.post(notificationsRouteService.subscriptions.users.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                            return baasicApiHttp.get(notificationsRouteService.subscriptions.users.find.expand(baasicApiService.findParams(options)));
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
                            return baasicApiHttp.get(notificationsRouteService.subscriptions.users.get.expand(baasicApiService.getParams(id, options)));
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
                            var params = baasicApiService.removeParams(data);
                            return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                            var params = baasicApiService.updateParams(data);
                            return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                                return baasicApiHttp.post(notificationsRouteService.subscriptions.users.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                                return baasicApiHttp({
                                    url: notificationsRouteService.subscriptions.users.batch.remove.expand(),
                                    method: 'DELETE',
                                    data: ids
                                });
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
                                return baasicApiHttp.put(notificationsRouteService.subscriptions.users.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
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
                            return baasicApiHttp.post(notificationsRouteService.subscriptions.anonymous.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                            return baasicApiHttp.get(notificationsRouteService.subscriptions.anonymous.find.expand(baasicApiService.findParams(options)));
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
                            return baasicApiHttp.get(notificationsRouteService.subscriptions.anonymous.get.expand(baasicApiService.getParams(id, options)));
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
                            var params = baasicApiService.removeParams(data);
                            return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                            var params = baasicApiService.updateParams(data);
                            return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                                return baasicApiHttp.post(notificationsRouteService.subscriptions.anonymous.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                                return baasicApiHttp({
                                    url: notificationsRouteService.subscriptions.anonymous.batch.remove.expand(),
                                    method: 'DELETE',
                                    data: ids
                                });
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
                                return baasicApiHttp.put(notificationsRouteService.subscriptions.anonymous.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
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
                            return baasicApiHttp.post(notificationsRouteService.registrations.users.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                            return baasicApiHttp.get(notificationsRouteService.registrations.users.find.expand(baasicApiService.findParams(options)));
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
                            return baasicApiHttp.get(notificationsRouteService.registrations.users.get.expand(baasicApiService.getParams(id, options)));
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
                            var params = baasicApiService.removeParams(data);
                            return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                            var params = baasicApiService.updateParams(data);
                            return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                                return baasicApiHttp.post(notificationsRouteService.registrations.users.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                                return baasicApiHttp({
                                    url: notificationsRouteService.registrations.users.batch.remove.expand(),
                                    method: 'DELETE',
                                    data: ids
                                });
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
                                return baasicApiHttp.put(notificationsRouteService.registrations.users.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
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
                            return baasicApiHttp.post(notificationsRouteService.registrations.anonymous.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                            return baasicApiHttp.get(notificationsRouteService.registrations.anonymous.find.expand(baasicApiService.findParams(options)));
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
                            return baasicApiHttp.get(notificationsRouteService.registrations.anonymous.get.expand(baasicApiService.getParams(id, options)));
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
                            var params = baasicApiService.removeParams(data);
                            return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                            var params = baasicApiService.updateParams(data);
                            return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                                return baasicApiHttp.post(notificationsRouteService.registrations.anonymous.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                                return baasicApiHttp({
                                    url: notificationsRouteService.registrations.anonymous.batch.remove.expand(),
                                    method: 'DELETE',
                                    data: ids
                                });
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
                                return baasicApiHttp.put(notificationsRouteService.registrations.anonymous.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp.get(notificationsRouteService.settings.get.expand(baasicApiService.getParams(provider)));
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
                        var params = baasicApiService.updateParams(data);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                    }
                },

                /**
                 * Provides direct access to `baasicNotificationsRouteService`.
                 * @method
                 * @example baasicNotificationsService.routeService.publish.create.expand({});
                 */
                routeService: notificationsRouteService
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
        var permissionHash = {};
        module.service('baasicAuthorizationService', ['$rootScope', '$document', 'baasicApp', function ($rootScope, $document, baasicApp) {
            var app = baasicApp.get(),
                apiKey = app.getApiKey();
            permissionHash[apiKey] = {};

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
                 * Retrives user permission hash. This action should be performed when user information is updated.
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
                    permissionHash[apiKey] = {};
                },
                /**
                 * Checks if current user has permissions to perform a certain action. To optimize performance this information is cached and can be reset using the resetPermissions action. Permissions cache should be reset when updated user information is set.
                 * @method        
                 * @example baasicAuthorizationService.hasPermission("<baasic-Section>.<action>");				
                 **/
                hasPermission: function (authorization) {
                    if (permissionHash[apiKey].hasOwnProperty(authorization)) {
                        return permissionHash[apiKey][authorization];
                    }

                    var user = this.getUser();
                    if (user === undefined) {
                        return;
                    }

                    var hasPermission = false;

                    if (user.permissions) {
                        var tokens = authorization.split('.');
                        if (tokens.length > 0) {
                            var section = tokens[0];

                            var sectionPermissions = user.permissions[section];
                            if (sectionPermissions) {
                                if (tokens.length > 1) {
                                    var action = tokens[1].toLowerCase();
                                    for (var i = 0; i < sectionPermissions.length; i++) {
                                        if (sectionPermissions[i].toLowerCase() === action) {
                                            hasPermission = true;
                                            break;
                                        }
                                    }
                                } else {
                                    hasPermission = true;
                                }
                            }
                        }
                    }

                    permissionHash[apiKey][authorization] = hasPermission;
                    return hasPermission;
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
     * @module baasicPermissionsRouteService
     * @description Baasic Permissions Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Permissions Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicPermissionsRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `section` - Section abbreviation which identifies part of the application for which security privileges can be retrieved and managed.
                 * - `searchQuery` - A string value used to identify access policy resources using the phrase search. 
                 * - `sort` - A string used to set the access policy property to sort the result collection by.				
                 * @method        
                 * @example 
                 baasicPermissionsRouteService.find(
                 'sectionName'
                 ).expand(
                 {searchQuery: '<search-phrase>'}
                 );
                 **/
                find: function (section) {
                    return uriTemplateService.parse('permissions/sections/{section}/{?searchQuery,sort}', section);
                },
                /**
                 * Parses getActions route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string value used to identify access action resources using the phrase search.  
                 * - `sort` - A string used to set the access action property to sort the result collection by.				
                 * @method        
                 * @example 
                 baasicPermissionsRouteService.getActions.expand(
                 {searchQuery: '<search-phrase>'}
                 );
                 **/
                getActions: uriTemplateService.parse('permissions/actions/{?searchQuery,sort}'),
                /**
                 * Parses getRoles route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string value used to identify access policy resources using the phrase search.   
                 * - `sort` - A string used to set the access policy property to sort the result collection by.	
                 * - `page` - A value used to set the page number, i.e. to retrieve certain access policy subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.				
                 * @method        
                 * @example 
                 baasicPermissionsRouteService.getRoles.expand(
                 {searchQuery: '<search-phrase>'}
                 );
                 **/
                getRoles: uriTemplateService.parse('lookups/roles/{?searchQuery,page,rpp,sort}'),
                /**
                 * Parses getUsers route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string value used to identify access policy resources using the phrase search.     
                 * - `sort` - A string used to set the access policy property to sort the result collection by.	
                 * - `page` - A value used to set the page number, i.e. to retrieve certain access policy subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.				
                 * @method        
                 * @example 
                 baasicPermissionsRouteService.getRoles.expand(
                 {searchQuery: '<search-phrase>'}
                 );
                 **/
                getUsers: uriTemplateService.parse('users/{?searchQuery,page,rpp,sort}'),
                /**
                 * Parses create permission route; this URI template doesn't expose any additional properties.
                 * @method        
                 * @example baasicPermissionsRouteService.create.expand({});               
                 **/
                create: uriTemplateService.parse('permissions/'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method tags.parse
                 * @example 
                 baasicPermissionsRouteService.parse(
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
     * @module baasicPermissionsService
     * @description Baasic Permissions Service provides an easy way to consume Baasic Application Permissions REST API end-points. In order to obtain needed routes `baasicPermissionsService` uses `baasicPermissionsRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicPermissionsService', ['$q', '$filter', 'baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicPermissionsRouteService', 'baasicAuthorizationService', function ($q, $filter, baasicApiHttp, baasicApiService, baasicConstants, permissionsRouteService, authService) {
            var _orderBy = $filter('orderBy');

            function isEmpty(data) {
                return data === undefined || data === null || data === '';
            }

            function getRoles(options) {
                return baasicApiHttp.get(permissionsRouteService.getRoles.expand(baasicApiService.findParams(options)));
            }

            function getUsers(options) {
                return baasicApiHttp.get(permissionsRouteService.getUsers.expand(baasicApiService.findParams(options)));
            }

            function firstCharToLowerCase(text) {
                return text.replace(/^./, function (char) {
                    return char.toLowerCase();
                });
            }

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
                    var params = angular.extend({}, options);
                    params.section = section;
                    return baasicApiHttp.get(permissionsRouteService.find().expand(baasicApiService.findParams(params)));
                },
                /**
                 * Returns a promise that is resolved once the getActions action has been performed. Success response returns a list of access policies that match the specified search parameters.
                 * @method        
                 * @example 
                 baasicPermissionsService.find({
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
                getActions: function (options) {
                    return baasicApiHttp.get(permissionsRouteService.getActions.expand(baasicApiService.findParams(options)));
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
                    var membershipCollection = [];
                    var resolvedTasks = 0;
                    var deferred = $q.defer();

                    function ensureTaskCount() {
                        resolvedTasks++;
                        if (resolvedTasks === 2) {
                            deferred.resolve(membershipCollection);
                            resolvedTasks = 0;
                        }
                    }

                    getUsers(options).success(function (collection) {
                        angular.forEach(collection.item, function (item) {
                            var membershipItem = {
                                name: item.userName,
                                role: ''
                            };
                            angular.extend(membershipItem, item);
                            membershipCollection.push(membershipItem);
                        });
                        ensureTaskCount();
                    }).error(function (data, status, headers, config) {
                        if (status !== undefined && status !== 403) {
                            deferred.reject({
                                data: data,
                                status: status,
                                headers: headers,
                                config: config
                            });
                        }
                        ensureTaskCount();
                    });

                    getRoles(options).success(function (collection) {
                        angular.forEach(collection.item, function (item) {
                            var membershipItem = {
                                name: item.name,
                                roleName: item.name,
                                userName: ''
                            };
                            angular.extend(membershipItem, item);
                            membershipCollection.push(membershipItem);
                        });
                        ensureTaskCount();
                    }).error(function (data, status, headers, config) {
                        if (status !== undefined && status !== 403) {
                            deferred.reject({
                                data: data,
                                status: status,
                                headers: headers,
                                config: config
                            });
                        }
                        ensureTaskCount();
                    });

                    return deferred.promise.then(function () {
                        return _orderBy(membershipCollection, 'name');
                    });
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
                    return baasicApiHttp.post(permissionsRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    var action = data.actions[0];
                    var operation = !isEmpty(data.role) ? 'Role' : 'User';
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete' + action.abrv + operation).href);
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
                    var permission = {
                        dirty: true,
                        role: membershipItem.roleName,
                        userName: membershipItem.userName,
                        section: section,
                        actions: []
                    };
                    angular.forEach(actionCollection, function (lookupAction) {
                        var newAction = {
                            checked: false
                        };
                        angular.extend(newAction, lookupAction);
                        permission.actions.push(newAction);
                    });
                    return permission;
                },
                /**
                 * Finds a permission in a given permission collection.
                 * @method        
                 * @example baasicPermissionsService.findPermission(permissionObj, permissionCollection);
                 **/
                findPermission: function (permission, permissionCollection) {
                    for (var i = 0; i < permissionCollection.length; i++) {
                        var item = permissionCollection[i];

                        if (item.section === permission.section && ((!isEmpty(item.role) && !isEmpty(permission.role) && item.role === permission.role) || (!isEmpty(item.userName) && !isEmpty(permission.userName) && item.userName === permission.userName))) {
                            return item;
                        }
                    }
                    return undefined;
                },
                /**
                 * Checks if a permission object exists in a given permission collection.
                 * @method        
                 * @example baasicPermissionsService.exists(permissionObj, permissionCollection);
                 **/
                exists: function (permission, permissionCollection) {
                    return this.findPermission(permission, permissionCollection) !== undefined;
                },
                /**
                 * Returns a promise that is resolved once the togglePermission action has been completed. The action will internally either call a `remove` or `create` action based on given criteria.
                 * @method        
                 * @example baasicPermissionsService.togglePermission(permissionObj, action);
                 **/
                togglePermission: function (permission, action) {
                    var requestPermission = {};
                    angular.extend(requestPermission, permission);
                    requestPermission.actions = [action];

                    var operation;
                    if (!action.checked) {
                        operation = this.remove;
                    } else {
                        operation = this.create;
                    }
                    return operation(requestPermission);
                },
                /**
                 * Fetches and returns and object containing all existing module permissions.
                 * @method        
                 * @example baasicPermissionsService.getModulePermissions('<section-name>');
                 **/
                getModulePermissions: function (section) {
                    var permission = {
                        update: authService.hasPermission(firstCharToLowerCase(section) + '.update'),
                        create: authService.hasPermission(firstCharToLowerCase(section) + '.create'),
                        remove: authService.hasPermission(firstCharToLowerCase(section) + '.delete'),
                        read: authService.hasPermission(firstCharToLowerCase(section) + '.read'),
                        full: authService.hasPermission(firstCharToLowerCase(section) + '.full')
                    };
                    return permission;
                },
                /**
                 * Provides direct access to `baasicPermissionsRouteService`.
                 * @method        
                 * @example baasicPermissionsService.routeService.get.expand(expandObject);
                 **/
                routeService: permissionsRouteService
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

    /*global module */

    /**
     * @module baasicTemplatingRouteService
     * @description Baasic Templating Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Templating Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicTemplatingRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string value used to identify template resources using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain template subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the template property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example 
                 baasicTemplatingRouteService.find.expand(
                 {searchQuery: '<search-phrase>'}
                 );
                 **/
                find: uriTemplateService.parse('templates/{?searchQuery,page,rpp,sort,embed,fields,moduleNames}'),
                /**
                 * Parses get route which must be expanded with the Id of the previously created template resource in the system.
                 * @method        
                 * @example 
                 baasicTemplatingRouteService.get.expand(
                 {id: '<template-id>'}
                 );
                 **/
                get: uriTemplateService.parse('templates/{id}/{?embed,fields}'),
                /**
                 * Parses create route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicTemplatingRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('templates'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicTemplatingRouteService.parse(
                 '<route>/{?embed,fields,options}'
                 ).expand(
                 {embed: '<embedded-resource>'}
                 );
                 **/
                parse: uriTemplateService.parse,
                batch: {
                    /**
                     * Parses create route; this URI template does not expose any additional options.
                     * @method batch.create       
                     * @example baasicTemplatingRouteService.batch.create.expand({});              
                     **/
                    create: uriTemplateService.parse('templates/batch'),
                    /**
                     * Parses remove route; this URI template does not expose any additional options.
                     * @method batch.remove       
                     * @example baasicTemplatingRouteService.batch.remove.expand({});              
                     **/
                    remove: uriTemplateService.parse('templates/batch'),
                    /**
                     * Parses update route; this URI template does not expose any additional options.
                     * @method batch.update       
                     * @example baasicTemplatingRouteService.batch.update.expand({});              
                     **/
                    update: uriTemplateService.parse('templates/batch')
                }
            };
        }]);
    }(angular, module)); // jshint ignore:line
    /**
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */
    /* globals module */

    /**
     * @module baasicTemplatingService
     * @description Baasic Templating Service provides an easy way to consume Baasic Templating REST API end-points. In order to obtain a needed routes `baasicTemplatingService` uses `baasicTemplatingRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicTemplatingService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicTemplatingRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, templatingRouteService) {
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
                    return baasicApiHttp.get(templatingRouteService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(templatingRouteService.get.expand(baasicApiService.getParams(id, options)));
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
                    return baasicApiHttp.post(templatingRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                 * Provides direct access to `baasicKeyValueRouteService`.
                 * @method        
                 * @example baasicTemplatingService.routeService.get.expand(expandObject);
                 **/
                routeService: templatingRouteService,
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
                        return baasicApiHttp.post(templatingRouteService.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp.post(templatingRouteService.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp({
                            url: templatingRouteService.batch.remove.expand(),
                            method: 'DELETE',
                            data: ids
                        });
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
     * @module baasicCompanyRouteService
     * @description Baasic Company Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Company Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCompanyRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing company properties using the phrase or BQL (Baasic Query Language) search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain company subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the company property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicCompanyRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('lookups/companies/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses create route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicCompanyRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('lookups/companies'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicCompanyRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('lookups/companies/{id}/{?embed,fields}'),
                batch: {
                    /**
                     * Parses create route; this URI template does not expose any additional options.
                     * @method batch.create       
                     * @example baasicCompanyRouteService.batch.create.expand({});              
                     **/
                    create: uriTemplateService.parse('lookups/companies/batch'),
                    /**
                     * Parses remove route; this URI template does not expose any additional options.
                     * @method batch.remove       
                     * @example baasicCompanyRouteService.batch.remove.expand({});              
                     **/
                    remove: uriTemplateService.parse('lookups/companies/batch'),
                    /**
                     * Parses update route; this URI template does not expose any additional options.
                     * @method batch.update       
                     * @example baasicCompanyRouteService.batch.update.expand({});              
                     **/
                    update: uriTemplateService.parse('lookups/companies/batch')
                }
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
     * @module baasicCompanyService
     * @description Baasic Company Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Company Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicCompanyService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicCompanyRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, companyRouteService) {
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
                    return baasicApiHttp.post(companyRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    return baasicApiHttp.get(companyRouteService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(companyRouteService.get.expand(baasicApiService.getParams(id, options)));
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp.post(companyRouteService.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp.post(companyRouteService.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp({
                            url: companyRouteService.batch.remove.expand(),
                            method: 'DELETE',
                            data: ids
                        });
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
     * @module baasicOrganizationRouteService
     * @description Baasic Organization Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Organization Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicOrganizationRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing organization properties using the phrase or BQL (Baasic Query Language) search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain organization subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the organization property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicOrganizationRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('lookups/organizations/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses create route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicOrganizationRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('lookups/organizations'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicOrganizationRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('lookups/organizations/{id}/{?embed,fields}'),
                batch: {
                    /**
                     * Parses create route; this URI template does not expose any additional options.
                     * @method batch.create       
                     * @example baasicOrganizationRouteService.batch.create.expand({});              
                     **/
                    create: uriTemplateService.parse('lookups/organizations/batch'),
                    /**
                     * Parses remove route; this URI template does not expose any additional options.
                     * @method batch.remove       
                     * @example baasicOrganizationRouteService.batch.remove.expand();              
                     **/
                    remove: uriTemplateService.parse('lookups/organizations/batch'),
                    /**
                     * Parses update route; this URI template does not expose any additional options.
                     * @method batch.update       
                     * @example baasicOrganizationRouteService.batch.update.expand({});              
                     **/
                    update: uriTemplateService.parse('lookups/organizations/batch')
                }
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
     * @module baasicOrganizationService
     * @description Baasic Organization Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Organization Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicOrganizationService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicOrganizationRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, organizationRouteService) {
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
                    return baasicApiHttp.post(organizationRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    return baasicApiHttp.get(organizationRouteService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(organizationRouteService.get.expand(baasicApiService.getParams(id, options)));
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp.post(organizationRouteService.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp.post(organizationRouteService.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp({
                            url: organizationRouteService.batch.remove.expand(),
                            method: 'DELETE',
                            data: ids
                        });
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
     * @module baasicSkillRouteService
     * @description Baasic Skill Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Skill Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicSkillRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing skill properties using the phrase or BQL (Baasic Query Language) search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain skill subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the skill property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicSkillRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('profile/lookups/skills/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses create route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicSkillRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('profile/lookups/skills'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicSkillRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('profile/lookups/skills/{id}/{?embed,fields}'),
                batch: {
                    /**
                     * Parses create route; this URI template does not expose any additional options.
                     * @method batch.create       
                     * @example baasicSkillRouteService.batch.create.expand({});              
                     **/
                    create: uriTemplateService.parse('profile/lookups/skills/batch'),
                    /**
                     * Parses remove route; this URI template does not expose any additional options.
                     * @method batch.remove       
                     * @example baasicSkillRouteService.batch.remove.expand({});              
                     **/
                    remove: uriTemplateService.parse('profile/lookups/skills/batch'),
                    /**
                     * Parses update route; this URI template does not expose any additional options.
                     * @method batch.update       
                     * @example baasicSkillRouteService.batch.update.expand({});              
                     **/
                    update: uriTemplateService.parse('profile/lookups/skills/batch')
                }
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
     * @module baasicSkillService
     * @description Baasic Skill Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Skill Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicSkillService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicSkillRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, skillRouteService) {
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
                    return baasicApiHttp.post(skillRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    return baasicApiHttp.get(skillRouteService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(skillRouteService.get.expand(baasicApiService.getParams(id, options)));
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp.post(skillRouteService.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp.post(skillRouteService.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp({
                            url: skillRouteService.batch.remove.expand(),
                            method: 'DELETE',
                            data: ids
                        });
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
     * @module baasicUserEducationRouteService
     * @description Baasic User Education Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic User Education Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserEducationRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing user education properties using the phrase or BQL (Baasic Query Language) search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain user education subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the user education property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicUserEducationRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('profiles/{userId}/educations/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses create route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicUserEducationRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('profiles/{userId}/educations'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicUserEducationRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('profiles/{userId}/educations/{id}/{?embed,fields}')
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
     * @module baasicUserEducationService
     * @description Baasic User Education Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic User Education Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserEducationService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicUserEducationRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, userEducationRouteService) {
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
                    return baasicApiHttp.post(userEducationRouteService.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    return baasicApiHttp.get(userEducationRouteService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(userEducationRouteService.get.expand(baasicApiService.getParams(id, options)));
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
     * @module baasicUserProfileAvatarRouteService
     * @description Baasic Article Files Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Article Files Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserProfileAvatarRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses get route; this route should be expanded with the Id of the profile.
                 * @method        
                 * @example 
                 baasicUserProfileAvatarRouteService.get.expand(
                 {id: '<file-id>'}
                 );
                 **/
                get: uriTemplateService.parse('profiles/{id}/avatars/{?embed,fields}'),

                /**
                 * Parses link route; this route should be expanded with the Id of the profile.
                 * @method        
                 * @example baasicUserProfileAvatarRouteService.link.expand({id: '<file-id>'});              
                 **/
                link: uriTemplateService.parse('profiles/{id}/avatars/link'),

                streams: {
                    /**
                     * Parses get route; this route should be expanded with id of profile. Additional supported items are:
                     * - `width` - width of desired derived image.
                     * - `height` - height of desired derived image.
                     * @method streams.get
                     * @example 
                     baasicUserProfileAvatarRouteService.streams.get.expand(
                     {id: '<file-id>'}
                     );
                     **/
                    get: uriTemplateService.parse('profiles/{id}/avatar-streams/{?width,height}'),

                    /**
                     * Parses create route; this route should be expanded with the filename which indicates where the stream will be saved as well with id of the profile.
                     * @method streams.create
                     * @example 
                     baasicUserProfileAvatarRouteService.streams.create.expand(
                     {
                     filename: '<filename>',
                     id: '<file-id>'
                     },
                     );
                     **/
                    create: uriTemplateService.parse('profiles/{id}/avatar-streams/{filename}'),

                    /**
                     * Parses update route; this route should be expanded with the id of the profile. Additional supported items are:
                     * - `width` - width of derived image to update.
                     * - `height` - height of derived image to update.                    
                     * @method streams.update    
                     * @example 
                     baasicUserProfileAvatarRouteService.streams.update.expand(
                     {id: '<file-id>'}
                     );
                     **/
                    update: uriTemplateService.parse('profiles/{id}/avatar-streams/{?width,height}')

                },

                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicUserProfileAvatarRouteService.parse(
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
     * @module baasicUserProfileAvatarService
     * @description Baasic Files Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Files Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserProfileAvatarService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicUserProfileAvatarRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, filesRouteService) {
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
    }(angular, module));

    /**
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicUserProfileRouteService
     * @description Baasic User Profile Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic User Profile Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserProfileRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find user profile route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string value used to identify user profile resources using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain user profile subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the user profile property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicUserProfileRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('profiles/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicUserProfileRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('profiles/{id}/{?embed,fields}'),
                /**
                 * Parses create user profile route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicUserProfileRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('profiles'),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example baasicUserProfileRouteService.parse('<route>/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
                 **/
                parse: uriTemplateService.parse,
                acl: {
                    /**
                     * Parses get user profile acl route; this URI template should be expanded with the Id of the user profile resource.					
                     * @method acl.get       
                     * @example 
                     baasicUserProfileRouteService.acl.get.expand(
                     {id: '<profile-id>'}
                     );
                     **/
                    get: uriTemplateService.parse('profiles/{id}/acl/{?fields}'),
                    /**
                     * Parses update user profile acl route; this URI template should be expanded with the Id of the user profile.					
                     * @method acl.update       
                     * @example 
                     baasicUserProfileRouteService.acl.update.expand(
                     {id: '<profile-id>'}
                     );
                     **/
                    update: uriTemplateService.parse('profiles/{id}/acl/{?fields}'),
                    /**
                     * Parses deleteByUser user profile acl route which can be expanded with additional options. Supported items are:
                     * - `id` - Id of the user profile resource.
                     * - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified user and user profile resource.
                     * - `user` - A value which uniquely identifies user for which ACL policy needs to be removed.					
                     * @method acl.deleteByUser       
                     * @example 
                     baasicUserProfileRouteService.acl.deleteByUser.expand({
                     id: '<profile-id>', 
                     accessAction: '<access-action>', 
                     user: '<username>'
                     });
                     **/
                    deleteByUser: uriTemplateService.parse('profiles/{id}/acl/actions/{accessAction}/users/{user}/'),
                    /**
                     * Parses deleteByUser user profile acl route which can be expanded with additional options. Supported items are:
                     * - `id` - Id of the user profile.
                     * - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified role and user profile resource.
                     * - `role` - A value which uniquely identifies role for which ACL policy needs to be removed.					
                     * @method acl.deleteByRole       
                     * @example 
                     baasicUserProfileRouteService.acl.deleteByRole.expand({
                     id: '<profile-id>', 
                     accessAction: '<access-action>', 
                     role: '<role-name>'
                     });
                     **/
                    deleteByRole: uriTemplateService.parse('profiles/{id}/acl/actions/{accessAction}/roles/{role}/')
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
     * @module baasicUserProfileService
     * @description Baasic User Profile Service provides an easy way to consume Baasic User Profile REST API end-points. In order to obtain needed routes `baasicUserProfileService` uses `baasicUserProfileRouteService`.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserProfileService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicUserProfileRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, userProfileRouteService) {
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
                    return baasicApiHttp.get(userProfileRouteService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(userProfileRouteService.get.expand(baasicApiService.getParams(id, options)));
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
                    return baasicApiHttp.post(userProfileRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                        var params = angular.copy(options);
                        return baasicApiHttp.get(userProfileRouteService.acl.get.expand(params));
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
                        var params = angular.copy(options);
                        return baasicApiHttp.put(userProfileRouteService.acl.get.expand(params), params[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.removeParams(data);
                        params.profileId = profileId;
                        params.user = user;
                        params.accessAction = action;
                        return baasicApiHttp.delete(userProfileRouteService.acl.deleteByUser.expand(params));
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
                        var params = baasicApiService.removeParams(data);
                        params.profileId = profileId;
                        params.role = role;
                        params.accessAction = action;
                        return baasicApiHttp.delete(userProfileRouteService.acl.deleteByRole.expand(params));
                    }
                },
                /**
                 * Provides direct access to `userProfileRouteService`.
                 * @method        
                 * @example baasicUserProfileService.routeService.get.expand(expandObject);
                 **/
                routeService: userProfileRouteService
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
     * @module baasicUserSkillRouteService
     * @description Baasic User Skill Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic User Skill Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserSkillRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing user skill properties using the phrase or BQL (Baasic Query Language) search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain user skill subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the user skill property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicUserSkillRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('profiles/{userId}/skills/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses create route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicUserSkillRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('profiles/{userId}/skills'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicUserSkillRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('profiles/{userId}/skills/{id}/{?embed,fields}')
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
     * @module baasicUserSkillService
     * @description Baasic User Skill Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic User Skill Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserSkillService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicUserSkillRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, userSkillRouteService) {
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
                    return baasicApiHttp.post(userSkillRouteService.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    return baasicApiHttp.get(userSkillRouteService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(userSkillRouteService.get.expand(baasicApiService.getParams(id, options)));
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
     * @module baasicUserWorkRouteService
     * @description Baasic User Work Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic User Work Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserWorkRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing user work properties using the phrase or BQL (Baasic Query Language) search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain user work subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the user work property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicUserWorkRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('profiles/{userId}/work/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                 * Parses create route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicUserWorkRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse('profiles/{userId}/work'),
                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicUserWorkRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('profiles/{userId}/work/{id}/{?embed,fields}')
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
     * @module baasicUserWorkService
     * @description Baasic User Work Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic User Work Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicUserWorkService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicUserWorkRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, userWorkRouteService) {
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
                    return baasicApiHttp.post(userWorkRouteService.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    return baasicApiHttp.get(userWorkRouteService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(userWorkRouteService.get.expand(baasicApiService.getParams(id, options)));
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
        module.service("baasicValueSetService", ["baasicApp", function (baasicApp) {
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