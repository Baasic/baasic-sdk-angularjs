/* globals module */
/**
 * @module baasicNotificationsRouteService
 * @description Baasic Notifications Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Notifications Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicNotificationsRouteService', ['baasicUriTemplateService',
        function(uriTemplateService){
            return {
                publish: {
                    /**
                     * Parses create publish route; this route does not expose any additional options.
                     * @method publish.create
                     * @example baasicNotificationsRouteService.publish.create.expand({});
                     */
                    create: uriTemplateService.parse('notifications/publish'),

                    batch: {
                        /**
                         * Parses create publish batch route; this route does not expose any additional options.
                         * @method publish.batch.create
                         * @example baasicNotificationsRouteService.publish.batch.create.expand({});
                         */
                        create: uriTemplateService.parse('notifications/publish/batch')
                    }
                },
                subscriptions: {
                    users: {
                        /**
                         * Parses create user subscription route; this route does not expose any additional options
                         * @method subscriptions.users.create
                         * @example baasicNotificationsRouteService.subscriptions.users.create.expand({});
                         */
                        create: uriTemplateService.parse('notifications/subscriptions'),
                        
                        /**
                         * Parses find user subscriptions route which can be expanded with additional options. Supported items are: 
                         * - `searchQuery` - A string referencing user subscription properties using the phrase search.
                         * - `userIds` - Comma separated list of user identifiers.
                         * - `channels` - Comma separated list of channels.
                         * - `page` - A value used to set the page number, i.e. to retrieve certain user subscriptions subset from the storage.
                         * - `rpp` - A value used to limit the size of result set per page.
                         * - `sort` - A string used to set the user subscription property to sort the result collection by.
                         * - `embed` - Comma separated list of resources to be contained within the current representation.
                         * @method subscriptions.users.find
                         * @example 
baasicNotificationsRouteService.subscriptions.users.find.expand({
    searchQuery: '<search-phrase>',
    channels: '<channel-name>,<channel-name>'
});
                         */ 
                        find: uriTemplateService.parse('notifications/subscriptions/{?searchQuery,userIds,channels,page,rpp,sort,embed,fields}'),
                        
                        /**
                         * Parses get user subscription route; this route should be expanded with the Id of user subscription resource.
                         * @method subscriptions.users.get
                         * @example
baasicNotificationsRouteService.subscriptions.users.get.expand({
    id: '<subscription-id>'
});
                         */
                        get: uriTemplateService.parse('notifications/subscriptions/{id}/{?embed,fields}'),

                        batch: {
                            /**
                             * Parses create user subscriptions batch route; this route does not expose any additional options
                             * @method subscriptions.users.batch.create
                             * @example baasicNotificationsRouteService.subscriptions.users.batch.create.expand({});
                             */
                            create: uriTemplateService.parse('notifications/subscriptions/batch'),
                            
                            /**
                             * Parses remove user subscriptions batch route; this route does not expose any additional options
                             * @method subscriptions.users.batch.remove
                             * @example baasicNotificationsRouteService.subscriptions.users.batch.remove.expand({});
                             */
                            remove: uriTemplateService.parse('notifications/subscriptions/batch'),
                            
                            /**
                             * Parses update user subscriptions batch route; this route does not expose any additional options
                             * @method subscriptions.users.batch.update
                             * @example baasicNotificationsRouteService.subscriptions.users.batch.update.expand({});
                             */
                            update: uriTemplateService.parse('notifications/subscriptions/batch')
                        }
                    },
                    anonymous:{
                        /**
                         * Parses create anonymous subscription route; this route does not expose any additional options
                         * @method subscriptions.anonymous.create
                         * @example baasicNotificationsRouteService.subscriptions.anonymous.create.expand({});
                         */
                        create: uriTemplateService.parse('notifications/subscriptions/anonymous'),

                        /**
                         * Parses find anonymous subscriptions route which can be expanded with additional options. Supported items are: 
                         * - `searchQuery` - A string referencing user subscription properties using the phrase search.
                         * - `registrationIds` - Comma separated list of anonymous registration identifiers.
                         * - `channels` - Comma separated list of channels.
                         * - `page` - A value used to set the page number, i.e. to retrieve certain user subscription subset from the storage.
                         * - `rpp` - A value used to limit the size of result set per page.
                         * - `sort` - A string used to set the user subscription property to sort the result collection by.
                         * - `embed` - Comma separated list of resources to be contained within the current representation.
                         * @method        
                         * @example 
baasicNotificationsRouteService.subscriptions.anonymous.find.expand({
    searchQuery: '<search-phrase>',
    channels: '<channel-name>,<channel-name>'
});
                         */ 
                        find: uriTemplateService.parse('notifications/subscriptions/anonymous/{?searchQuery,registrationIds,channels,page,rpp,sort,embed,fields}'),

                        /**
                         * Parses get anonymous subscription route; this route should be expanded with the Id of anonymous subscription resource.
                         * @method subscriptions.anonymous.get
                         * @example
baasicNotificationsRouteService.subscriptions.anonymous.get.expand({
    id: '<subscription-id>'
});
                         */
                        get: uriTemplateService.parse('notifications/subscriptions/anonymous/{id}/{?embed,fields}'),

                        batch: {
                            /**
                             * Parses create anonymous subscription batch route; this route does not expose any additional options
                             * @method subscriptions.anonymous.batch.create
                             * @example baasicNotificationsRouteService.subscriptions.anonymous.batch.create.expand({});
                             */
                            create: uriTemplateService.parse('notifications/subscriptions/anonymous/batch'),
                            
                            /**
                             * Parses remove anonymous subscription batch route; this route does not expose any additional options
                             * @method subscriptions.anonymous.batch.remove
                             * @example baasicNotificationsRouteService.subscriptions.anonymous.batch.remove.expand({});
                             */
                            remove: uriTemplateService.parse('notifications/subscriptions/anonymous/batch'),

                            /**
                             * Parses update anonymous subscription batch route; this route does not expose any additional options
                             * @method subscriptions.anonymous.batch.update
                             * @example baasicNotificationsRouteService.subscriptions.anonymous.batch.update.expand({});
                             */
                            update: uriTemplateService.parse('notifications/subscriptions/anonymous/batch')
                        }
                    }
                },
                registrations:{
                    users: {
                        /**
                         * Parses create users registrations route; this route does not expose any additional options
                         * @method registrations.users.create
                         * @example baasicNotificationsRouteService.registrations.users.create.expand({});
                         */
                        create: uriTemplateService.parse('notifications/registrations'),

                        /**
                         * Parses find users registrations route which can be expanded with additional options. Supported items are: 
                         * - `searchQuery` - A string referencing user subscription properties using the phrase search.
                         * - `userIds` - Comma separated list of user identifiers.
                         * - `providers` - Comma separated list of notification providers.
                         * - `page` - A value used to set the page number, i.e. to retrieve certain user subscription subset from the storage.
                         * - `rpp` - A value used to limit the size of result set per page.
                         * - `sort` - A string used to set the user subscription property to sort the result collection by.
                         * - `embed` - Comma separated list of resources to be contained within the current representation.
                         * @method        
                         * @example 
baasicNotificationsRouteService.registrations.users.find.expand({
    searchQuery: '<search-phrase>',
    providers: '<provider-name>,<provider-name>'
});
                         */ 
                        find: uriTemplateService.parse('notifications/registrations/{?searchQuery,userIds,providers,page,rpp,sort,embed,fields}'),

                        /**
                         * Parses get users registrations route; this route should be expanded with the Id of users registrations resource.
                         * @method registrations.users.get
                         * @example
baasicNotificationsRouteService.registrations.users.get.expand({
    id: '<registration-id>'
});
                         */
                        get: uriTemplateService.parse('notifications/registrations/{id}/{?embed}'),

                        batch: {
                            /**
                             * Parses create users registrations batch route; this route does not expose any additional options
                             * @method registrations.users.batch.create
                             * @example baasicNotificationsRouteService.registrations.users.batch.create.expand({});
                             */
                            create: uriTemplateService.parse('notifications/registrations/batch'),
                            
                            /**
                             * Parses remove users registrations batch route; this route does not expose any additional options
                             * @method registrations.users.batch.remove
                             * @example baasicNotificationsRouteService.registrations.users.batch.remove.expand({});
                             */
                            remove: uriTemplateService.parse('notifications/registrations/batch'),
                            
                            /**
                             * Parses update users registrations batch route; this route does not expose any additional options
                             * @method registrations.users.batch.update
                             * @example baasicNotificationsRouteService.registrations.users.batch.update.expand({});
                             */
                            update: uriTemplateService.parse('notifications/registrations/batch'),
                        }
                    },
                    anonymous: {
                        /**
                         * Parses create anonymous registrations route; this route does not expose any additional options
                         * @method registrations.anonymous.create
                         * @example baasicNotificationsRouteService.registrations.anonymous.create.expand({});
                         */
                        create: uriTemplateService.parse('notifications/registrations/anonymous'),

                        /**
                         * Parses find anonymous registrations route which can be expanded with additional options. Supported items are: 
                         * - `searchQuery` - A string referencing user subscription properties using the phrase search.
                         * - `providers` - Comma separated list of notification providers.
                         * - `page` - A value used to set the page number, i.e. to retrieve certain user subscription subset from the storage.
                         * - `rpp` - A value used to limit the size of result set per page.
                         * - `sort` - A string used to set the user subscription property to sort the result collection by.
                         * - `embed` - Comma separated list of resources to be contained within the current representation.
                         * @method        
                         * @example 
baasicNotificationsRouteService.registrations.anonymous.find.expand({
    searchQuery: '<search-phrase>',
    providers: '<provider-name>,<provider-name>'
});
                         */ 
                        find: uriTemplateService.parse('notifications/registrations/anonymous/{?searchQuery,providers,page,rpp,sort,embed,fields}'),

                        /**
                         * Parses get anonymous registrations route; this route should be expanded with the Id of anonymous registrations resource.
                         * @method registrations.anonymous.get
                         * @example
baasicNotificationsRouteService.registrations.anonymous.get.expand({
    id: '<registration-id>'
});
                         */
                        get: uriTemplateService.parse('notifications/registrations/anonymous/{id}/{?embed}'),

                        batch: {
                            /**
                             * Parses create anonymous registrations batch route; this route does not expose any additional options
                             * @method registrations.anonymous.batch.create
                             * @example baasicNotificationsRouteService.registrations.anonymous.batch.create.expand({});
                             */
                            create: uriTemplateService.parse('notifications/registrations/anonymous/batch'),

                            /**
                             * Parses remove anonymous registrations batch route; this route does not expose any additional options
                             * @method registrations.anonymous.batch.remove
                             * @example baasicNotificationsRouteService.registrations.anonymous.batch.remove.expand({});
                             */
                            remove: uriTemplateService.parse('notifications/registrations/anonymous/batch'),

                            /**
                             * Parses update anonymous registrations batch route; this route does not expose any additional options
                             * @method registrations.anonymous.batch.update
                             * @example baasicNotificationsRouteService.registrations.anonymous.batch.update.expand({});
                             */
                            update: uriTemplateService.parse('notifications/registrations/anonymous/batch')
                        }
                    }
                },
                settings: {
                    /**
                     * Parses get notification settings route; this route should be expanded with the notification provider name.
                     * @method settings.get
                     * @example
baasicNotificationsRouteService.settings.get.expand({
    id: '<provider-name>'
});
                     */
                    get: uriTemplateService.parse('notifications/settings/{id}'),

                    /**
                     * Parses update notification settings route; this route should be expanded with the notification provider name.
                     * @method settings.update
                     * @example
baasicNotificationsRouteService.settings.update.expand({
    id: '<provider-name>'
});
                     */
                    update: uriTemplateService.parse('notifications/settings/{id}') 
                }
            };
        }]);
}(angular, module));
/**
 * @overview 
 ***Notes:**
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
 - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
 - All end-point objects are transformed by the associated route service.
*/
