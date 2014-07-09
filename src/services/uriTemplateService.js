(function (angular, module, undefined) {
    "use strict";
    module.service("uriTemplateService", [function () {
        return {
            parse: function (link) {
                return UriTemplate.parse(link);
            },
            constructTemplateUrl: function (config, params) {
                if (!config || !config.templateText || !config.defaultUrl) {
                    throw "Invalid template configuration.";
                }

                if (config.templateText) {
                    var
                        expandedTemplate = null,
                        defaultUrlIndex = null,
                        sortParams = params.orderBy ? params.orderBy + '|' + params.orderDirection : null;

                    var expandConfig = { page: params.pageNumber, rpp: params.pageSize, sort: sortParams, searchQuery: params.search };

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

                    expandedTemplate = config.templateText.expand(expandConfig);

                    defaultUrlIndex = expandedTemplate.indexOf(config.defaultUrl);

                    url = expandedTemplate.substr(defaultUrlIndex);
                }
                else {
                    url = defaultUrl;
                }

                return url;
            }
        }
    }]);
})(angular, module);