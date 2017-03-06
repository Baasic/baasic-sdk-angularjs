/**
 * @module baasicDynamicSchemaRouteService
 * @description Baasic Dynamic Schema Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Dynamic Schema Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
*/

(function (angular, module, undefined) {
    "use strict";
    module.service("baasicDynamicSchemaRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
				/**
				* Parses find route which can be expanded with additional options. Supported items are: 
				* - `searchQuery` - A string referencing dynamic resource schema properties using the phrase or BQL (Baasic Query Language) search.
				* - `page` - A value used to set the page number, i.e. to retrieve certain dynamic resource schema subset from the storage.
				* - `rpp` - A value used to limit the size of result set per page.
				* - `sort` - A string used to set the dynamic resource schema property to sort the result collection by.
				* - `embed` - Comma separated list of resources to be contained within the current representation.
				* @method      
				* @example 
baasicDynamicSchemaRouteService.find.expand(
	{searchQuery: '<search-phrase>'}
);               
				**/ 			
                find: uriTemplateService.parse("schemas/{?searchQuery,page,rpp,sort,embed,fields}"),
				/**
                * Parses get route which must be expanded with name of the previously created dynamic resource schema. Additional expand supported items are:
				* - `embed` - Comma separated list of resources to be contained within the current representation.
				* @method      
				* @example 
baasicDynamicSchemaRouteService.find.expand(
	{name: '<schema-name>'}
);               
				**/ 					
                get: uriTemplateService.parse("schemas/{name}/{?embed,fields}"),
				/**
				* Parses create route; this URI template doesn't expose any additional properties.
				* @method      
				* @example baasicDynamicSchemaRouteService.create.expand({});              
				**/				
                generate: uriTemplateService.parse("schemas/generate"),
				/**
				* Parses create route; this URI template doesn't expose any additional properties.
				* @method      
				* @example baasicDynamicSchemaRouteService.create.expand({});              
				**/  				
                create: uriTemplateService.parse("schemas"),
				/**
				* Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
				* @method
				* @example 
baasicDynamicSchemaRouteService.parse(
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
 - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
 - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
 - All end-point objects are transformed by the associated route service.
*/