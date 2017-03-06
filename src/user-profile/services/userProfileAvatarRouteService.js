/* globals module */
/**
 * @module baasicUserProfileAvatarRouteService
 * @description Baasic Article Files Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Article Files Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicUserProfileAvatarRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
            return {                                                                            
                /**
                * Parses get route; this route should be expanded with the Id of the profile.
                * @method        
                * @example 
baasicUserProfileAvatarRouteService.get.expand(
    {id: '<file-id>'}
);               
                **/
                get: uriTemplateService.parse('profiles/{id}/avatars/{?embed,fields}'),             
                
                /**
                * Parses link route; this route should be expanded with the Id of the profile.
                * @method        
                * @example baasicUserProfileAvatarRouteService.link.expand({id: '<file-id>'});              
                **/
                link: uriTemplateService.parse('profiles/{id}/avatars/link'),

                streams: {
                    /**
                    * Parses get route; this route should be expanded with id of profile. Additional supported items are:
                    * - `width` - width of desired derived image.
                    * - `height` - height of desired derived image.
                    * @method streams.get
                    * @example 
baasicUserProfileAvatarRouteService.streams.get.expand(
    {id: '<file-id>'}
);               
                    **/
                    get: uriTemplateService.parse('profiles/{id}/avatar-streams/{?width,height}'),

                    /**
                    * Parses create route; this route should be expanded with the filename which indicates where the stream will be saved as well with id of the profile.
                    * @method streams.create
                    * @example 
baasicUserProfileAvatarRouteService.streams.create.expand(
    {
        filename: '<filename>',
        id: '<file-id>'
    },
);               
                    **/
                    create: uriTemplateService.parse('profiles/{id}/avatar-streams/{filename}'),
                    
                    /**
                    * Parses update route; this route should be expanded with the id of the profile. Additional supported items are:
                    * - `width` - width of derived image to update.
                    * - `height` - height of derived image to update.                    
                    * @method streams.update    
                    * @example 
baasicUserProfileAvatarRouteService.streams.update.expand(
    {id: '<file-id>'}
);               
                    **/
                    update: uriTemplateService.parse('profiles/{id}/avatar-streams/{?width,height}')

                },
                                
                /**
                * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                * @method
                * @example 
baasicUserProfileAvatarRouteService.parse(
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
