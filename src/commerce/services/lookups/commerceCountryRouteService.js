/* globals module */
/**
 * @module baasicCommerceCountryRouteService
 * @description Baasic Commerce Country Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Commerce Country Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicCommerceCountryRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
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
