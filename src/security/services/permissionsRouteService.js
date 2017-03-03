/* globals module */
/**
 * @module baasicPermissionsRouteService
 * @description Baasic Permissions Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Permissions Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicPermissionsRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
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