/* globals module */
/**
 * @module baasicUserProfileRouteService
 * @description Baasic User Profile Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic User Profile Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicUserProfileRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
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
