/* globals module */
/**
 * @module baasicMeteringRouteService
 * @description Baasic Metering Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Metering Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicMeteringRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
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
                batch:{
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
