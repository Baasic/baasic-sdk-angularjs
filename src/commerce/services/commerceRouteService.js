/* globals module */
/**
 * @module baasicCommerceRouteService
 * @description Baasic Commerce Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Commerce Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicCommerceRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
            return {
                /**
                * Parses find commerce route which can be expanded with additional options. Supported items are: 
                * - `customerId` - The customer identifier.
                * - `systemName` - The commerce payment gateway system name.
                * - `searchQuery` - A string value used to identify commerce resources using the phrase search.
                * - `plan` - Product name.
                * - `statuses` - Subscription status unique identifier or abbreviation in CSV format.
                * - `productId` - Product unique identifier.
                * - `firstName` - Customer first name.
                * - `lastName` - Customer last name.
                * - `page` - A value used to set the page number, i.e. to retrieve certain commerce subset from the storage.
                * - `rpp` - A value used to limit the size of result set per page.
                * - `sort` - A string used to set the commerce property to sort the result collection by.
				* - `embed` - Comma separated list of resources to be contained within the current representation.
                * @method        
                * @example baasicCommerceRouteService.find.expand({searchQuery: '<search-phrase>'});               
                **/  			
                find: uriTemplateService.parse('commerce/subscriptions/{?customerId,systemName,searchQuery,plan,statuses,productId,firstName,lastName,page,rpp,sort,embed,fields}'),
                /**
                * Parses get route; this route doesn't expose any properties.
                * @method        
                * @example baasicCommerceRouteService.get.expand({});               
                **/ 			
                get: uriTemplateService.parse('commerce/subscriptions/{id}/{?embed,fields}'),
                /**
                * Parses validate VAT route; this route doesn't expose any properties.
                * @method        
                * @example baasicCommerceRouteService.validateVAT.expand({ countryCode: 'DE', vatId: 'DE999999999' });               
                **/ 			
                validateVAT: uriTemplateService.parse('commerce/vat-validations/{?countryCode,vatId}'),
                /**
                * Parses subscription pre-process commerce route; this URI template does not expose any additional options.
                * @method        
                * @example baasicCommerceRouteService.preprocess.expand({});              
                **/  				
                preprocess: uriTemplateService.parse('commerce/subscriptions/preprocess'),
                /**
                * Parses subscription commerce route; this URI template does not expose any additional options.
                * @method        
                * @example baasicCommerceRouteService.subscribe.expand({});              
                **/  				
                subscribe: uriTemplateService.parse('commerce/subscriptions'),     
                 /**
                * Parses cancel subscription commerce route; this URI template does not expose any additional options.
                * @method        
                * @example baasicCommerceRouteService.cancel.expand({ systemName: '<system-name>' });              
                **/  				
                cancel: uriTemplateService.parse('commerce/subscriptions/{systemName}/{id}/{?requestRefund,refundAmount}'),               	
                /**
                * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                * @method
                * @example baasicCommerceRouteService.parse('<route>/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
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
