/* globals module */
/**
 * @module baasicMediaVaultRouteService
 * @description Baasic Media Vault Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Media Vault Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicMediaVaultRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
            return {                                                
                /**
                * Parses find route which can be expanded with additional options. Supported items are: 
                * - `searchQuery` - A string referencing media vault properties using the phrase search.
                * - `page` - A value used to set the page number, i.e. to retrieve certain media vault subset from the storage.
                * - `rpp` - A value used to limit the size of result set per page.
                * - `sort` - A string used to set the media vault property to sort the result collection by.
				* - `embed` - Comma separated list of resources to be contained within the current representation.
                * @method        
                * @example 
baasicMediaVaultRouteService.find.expand(
    {searchQuery: '<search-phrase>'}
);               
                **/  			
                find: uriTemplateService.parse('media-vaults/{?searchQuery,page,rpp,sort,embed,fields}'),     
                           
                /**
                * Parses get route; this route should be expanded with the Id of media vault resource.
                * @method        
                * @example 
baasicMediaVaultRouteService.get.expand(
    {id: '<media-vault-id>'}
);               
                **/ 			
                get: uriTemplateService.parse('media-vaults/{id}/{?embed,fields}'),                    
                
                streams: {
                    /**
                    * Parses get route; this route should be expanded with id or path of desired media vault stream. Additional supported items are:
                    * - `width` - width of desired derived image.
                    * - `height` - height of desired derived image.                    
                    * @method streams.get
                    * @example 
baasicMediaVaultRouteService.streams.get.expand(
    {id: '<path>'}
);               
                    **/ 			
                    get: uriTemplateService.parse('media-vault-streams/{id}/{?width,height}'),

                    /**
                    * Parses create route; this route should be expanded with the path which indicates where the stream will be saved.
                    * @method streams.create
                    * @example 
baasicMediaVaultRouteService.streams.create.expand(
    {path: '<path>'}
);               
                    **/ 			
                    create: uriTemplateService.parse('media-vault-streams/{path}'),
                    
                    /**
                    * Parses update route; this route should be expanded with the id or path of the previously saved media vault resource. Additional supported items are:
                    * - `width` - width of desired derived image.
                    * - `height` - height of desired derived image.                     
                    * @method streams.update
                    * @example 
baasicMediaVaultRouteService.streams.update.expand(
    {id: '<path>'}
);               
                    **/ 			
                    update: uriTemplateService.parse('media-vault-streams/{id}/{?width,height}')                       
                },
                
                batch: {
                    /**
                    * Parses remove route; this URI template does not expose any additional options.                         
                    * @method batch.remove       
                    * @example baasicMediaVaultRouteService.batch.remove.expand({});              
                    **/                      
                    remove: uriTemplateService.parse('media-vaults/batch'),   

                    /**
                    * Parses update route; this URI template does not expose any additional options.
                    * @method batch.update       
                    * @example baasicMediaVaultRouteService.batch.update.expand({});              
                    **/                      
                    update: uriTemplateService.parse('media-vaults/batch')                                        
                },
                
                settings: {
                    /**
                    * Parses get route; this route doesn not expose any additional options.
                    * @method settings.get
                    * @example baasicMediaVaultRouteService.settings.get.expand({});               
                    **/ 	                    
                    get: uriTemplateService.parse('media-vault-settings'),
                    
                    /**
                    * Parses update route; this URI template does not expose any additional options.
                    * @method settings.update       
                    * @example baasicMediaVaultRouteService.settings.update.expand({});              
                    **/                     
                    update: uriTemplateService.parse('media-vault-settings')   
                },               
                processingProviderSettings: {
                    /**
                    * Parses find route which can be expanded with additional options. Supported items are: 
                    * - `searchQuery` - A string referencing media vault processing provider setting properties using the phrase search.
                    * - `page` - A value used to set the page number, i.e. to retrieve certain media vault processing provider setting subset from the storage.
                    * - `rpp` - A value used to limit the size of result set per page.
                    * - `sort` - A string used to set the media vault processing provider setting property to sort the result collection by.
                    * - `embed` - Comma separated list of resources to be contained within the current representation.
                    * @method        
                    * @example 
baasicMediaVaultRouteService.processingProviderSettings.find.expand(                
    {searchQuery: '<search-phrase>'}
);               
                    **/  			
                    find: uriTemplateService.parse('media-vault-preprocessing-settings/{?searchQuery,page,rpp,sort,embed,fields}'),     
                            
                    /**
                    * Parses get route; this route should be expanded with Id of the media vault processing provider setting resource.
                    * @method        
                    * @example 
baasicMediaVaultRouteService.processingProviderSettings.get.expand(
    {id: '<id>'}
);               
                    **/ 			
                    get: uriTemplateService.parse('media-vault-preprocessing-settings/{id}/{?embed,fields}')                     
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
