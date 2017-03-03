/* globals module */
/**
 * @module baasicArticleCommentRepliesRouteService
 * @description Baasic Article Comment Replies Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Article Comment Replies Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleCommentRepliesRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
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