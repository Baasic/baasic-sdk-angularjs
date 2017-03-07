/* globals module */
/**
 * @module baasicCommerceCountryStateRouteService
 * @description Baasic Commerce Country State Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Commerce Country State Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
*/
(function (angular, module, undefined) { 
    'use strict';
    module.service('baasicCommerceCountryStateRouteService', ['baasicUriTemplateService',
        function (uriTemplateService){
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
 - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
 - All end-point objects are transformed by the associated route service.
*/