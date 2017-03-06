/* globals module */
/**
 * @module baasicMeteringCategoryRouteService
 * @description Baasic Metering Category Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Metering Category Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicMeteringCategoryRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
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
                batch:{
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
