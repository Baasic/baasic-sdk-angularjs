/* globals module */
/**
 * @module baasicArticleFilesRouteService
 * @description Baasic Article Files Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Article Files Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleFilesRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
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
} (angular, module));
/**
 * @overview 
 ***Notes:**
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
 - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
 - All end-point objects are transformed by the associated route service.
*/
