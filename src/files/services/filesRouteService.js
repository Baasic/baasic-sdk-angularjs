/* globals module */
/**
 * @module baasicFilesRouteService
 * @description Baasic Files Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Files Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicFilesRouteService', ['baasicUriTemplateService',
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
baasicFilesRouteService.find.expand(
    {searchQuery: '<search-phrase>'}
);               
                **/  			
                find: uriTemplateService.parse('files/{?searchQuery,page,rpp,sort,embed,fields}'),     
                           
                /**
                * Parses get route; this route should be expanded with the Id of the file resource.
                * @method        
                * @example 
baasicFilesRouteService.get.expand(
    {id: '<file-id>'}
);               
                **/ 			
                get: uriTemplateService.parse('files/{id}/{?embed,fields}'),             
                
                /**
                * Parses link route; this URI template does not expose any additional options.
                * @method        
                * @example baasicFilesRouteService.link.expand({});              
                **/  			                
                link: uriTemplateService.parse('files/link'),       
                
                streams: {
                    /**
                    * Parses get route; this route should be expanded with id or path of desired file stream. Additional supported items are:
                    * - `width` - width of desired derived image.
                    * - `height` - height of desired derived image.
                    * @method streams.get
                    * @example 
baasicFilesRouteService.streams.get.expand(
    {id: '<path>'}
);               
                    **/ 			
                    get: uriTemplateService.parse('file-streams/{id}/{?width,height}'),

                    /**
                    * Parses create route; this route should be expanded with the path which indicates where the stream will be saved.
                    * @method streams.create
                    * @example 
baasicFilesRouteService.streams.create.expand(
    {path: '<path>'}
);               
                    **/ 			
                    create: uriTemplateService.parse('file-streams/{path}'),
                    
                    /**
                    * Parses update route; this route should be expanded with the id or path of the previously saved resource. Additional supported items are:
                    * - `width` - width of derived image to update.
                    * - `height` - height of derived image to update.                    
                    * @method streams.update    
                    * @example 
baasicFilesRouteService.streams.update.expand(
    {id: '<path>'}
);               
                    **/ 			
                    update: uriTemplateService.parse('file-streams/{id}/{?width,height}')         
                    
                },

                batch: {
                    /**
                    * Parses unlink route; this URI template does not expose any additional options.                                    
                    * @method batch.unlink       
                    * @example baasicFilesRouteService.batch.unlink.expand({});              
                    **/                      
                    unlink: uriTemplateService.parse('files/batch/unlink'),                                       
                    
                    /**
                    * Parses update route; this URI template does not expose any additional options.
                    * @method batch.update       
                    * @example baasicFilesRouteService.batch.update.expand({});              
                    **/                      
                    update: uriTemplateService.parse('files/batch'),
                   
                    /**
                    * Parses update route; this URI template does not expose any additional options.
                    * @method batch.link       
                    * @example baasicFilesRouteService.batch.link.expand({});              
                    **/                       
                    link: uriTemplateService.parse('files/batch/link')                           
                },
                
                acl: {
					/**
					* Parses get acl route; this URI template should be expanded with the Id of the file resource.					
					* @method acl.get       
					* @example 
baasicFilesRouteService.acl.get.expand(
	{id: '<file-id>'}
);
					**/ 				
                    get: uriTemplateService.parse('files/{id}/acl/{?fields}'),
                    
					/**
					* Parses update acl route; this URI template should be expanded with the Id of the file resource.					
					* @method acl.update       
					* @example 
baasicFilesRouteService.acl.update.expand(
	{id: '<file-id>'}
);
					**/ 					
                    update: uriTemplateService.parse('files/{id}/acl/{?fields}'),
                    
					/**
					* Parses deleteByUser acl route which can be expanded with additional options. Supported items are:
					* - `id` - File id which uniquely identifies file resource whose security privileges need to be retrieved and updated.
					* - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified user and file resource.
					* - `user` - A value which uniquely identifies user for which ACL policy needs to be removed.					
					* @method acl.deleteByUser       
					* @example 
baasicFilesRouteService.acl.deleteByUser.expand({
    id: '<file-id>', 
    accessAction: '<access-action>', 
    user: '<username>'
});
					**/ 					
                    deleteByUser: uriTemplateService.parse('files/{id}/acl/actions/{accessAction}/users/{user}/'),
                    
					/**
					* Parses deleteByUser acl route which can be expanded with additional options. Supported items are:
					* - `id` - File id which uniquely identifies file resource whose security privileges need to be retrieved and updated.
					* - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified role and file resource.
					* - `role` - A value which uniquely identifies role for which ACL policy needs to be removed.					
					* @method acl.deleteByRole       
					* @example 
baasicFilesRouteService.acl.deleteByRole.expand({
    id: '<file-id>', 
    accessAction: '<access-action>', 
    role: '<role-name>'
});
					**/ 					
                    deleteByRole: uriTemplateService.parse('files/{id}/acl/actions/{accessAction}/roles/{role}/')					
                },
                /**
                * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                * @method
                * @example 
baasicFilesRouteService.parse(
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
 - Refer to the [REST API documentation](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
 - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
 - All end-point objects are transformed by the associated route service.
*/
