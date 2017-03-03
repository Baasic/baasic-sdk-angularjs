/* globals module */
/**
 * @module baasicOrganizationRouteService
 * @description Baasic Organization Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Organization Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicOrganizationRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
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
                batch:{
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
