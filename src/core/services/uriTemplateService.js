/* globals module, UriTemplate */
/**
 * @module baasicUriTemplateService
 * @description This is the core Uri template service wihch expands templates based on on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications and can expand templates up to and including Level 4 in that specification.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicUriTemplateService', [function () {
        return {
			/**
			* Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
			* @method
			* @example 
baasicUriTemplateService.parse(
	'<route>/{?embed,fields,options}'
).expand(
	{embed: '<embedded-resource>'}
);
			**/  		
            parse: function (link) {
                return UriTemplate.parse(link);
            },
			/**
			* Constructs template Url based on given arguments.
			* @method
			* @example 
baasicUriTemplateService.constructTemplateUrl({
  templateText : UriTemplate.parse('<route>/{searchTerm}/{rpp}/{page}/{sort}'),
  defaultUrl : 'route'
}, {
  search : '<search-phrase>',
  pageNumber : 1,
  pageSize : 10,
  orderBy : '<field>',
  orderDirection : '<asc|desc>'
});			
			**/  			
            constructTemplateUrl: function (config, params) {
                if (!config || !config.templateText || !config.defaultUrl) {
                    throw 'Invalid template configuration.';
                }
				
				var url,
					defaultUrl = config.defaultUrl;
                if (config.templateText) {
                    var sortParams = params.orderBy ? params.orderBy + '|' + params.orderDirection : null,
						expandConfig = { page: params.pageNumber, rpp: params.pageSize, sort: sortParams, searchQuery: params.search };

                    if (config.additionalParams) {
                        for (var p in config.additionalParams) {
                            if (expandConfig[p]) {
                                throw 'Property' + p + ' already exists in default expand configuration';
                            }
                            else {
                                expandConfig[p] = config.additionalParams[p];
                            }
                        }
                    }

                    var expandedTemplate = config.templateText.expand(expandConfig);

                    var defaultUrlIndex = expandedTemplate.indexOf(defaultUrl);

                    url = expandedTemplate.substr(defaultUrlIndex);
                }
                else {
                    url = defaultUrl;
                }

                return url;
            }
        };
    }]);
})(angular, module);