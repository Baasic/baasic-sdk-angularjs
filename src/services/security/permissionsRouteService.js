(function (angular, module, undefined) {
    "use strict";
    module.service("baasicPermissionsRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                find: function (section) {
                    return uriTemplateService.parse("permissions/section/" + section + "/{?searchQuery,sort}");
                },
                get: function (section) {
                    return uriTemplateService.parse("permissions/section/" + section + "/{id}");
                },
                getActions: uriTemplateService.parse("permissions/actions/{?searchQuery,sort}"),
                getRoles: uriTemplateService.parse("role/{?searchQuery,page,rpp,sort}"),
                getUsers: uriTemplateService.parse("user/{?searchQuery,page,rpp,sort}"),
                create: uriTemplateService.parse("permissions/"),
				parse: uriTemplateService.parse
            };
        }]);
}(angular, module));