/* globals module */
/**
 * @module baasicArticleTagsRouteService
 * @description Baasic Article Tags Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Article Tags Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
*/

(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleTagsRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
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