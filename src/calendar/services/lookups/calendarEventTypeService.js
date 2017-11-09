/* globals module */
/**
 * @module baasicCalendarEventTypeService
 * @description Baasic Calendar Event Type Service provides an easy way to consume Baasic Calendar REST API end-points. In order to obtain a needed routes `baasicCalendarEventTypeService` uses `baasicCalendarEventTypeRouteService`.
 */
(function (angular, module) {
    'use strict';
    module.service('baasicCalendarEventTypeService', ['baasicApp',
        function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {

                /**
                 * Returns a promise that is resolved once the find action has been completed. Success response returns a list of EventType resources matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarEventTypeService.find({
                        pageNumber: 1,
                        pageSize: 10,
                        orderBy: '<field>',
                        orderDirection: '<asc|desc>',
                        search: '<search-phrase>',
                        ids: '<identifiers>',
                        from: '<from-date>',
                        to: '<to-date>'
                    })
                    .success(function (collection) {
                        // perform success action here
                    })
                    .error(function(response, status, headers, config) {
                        // perform error handling here 
                    });
                */
                find: function (options) {
                    return baasicApp.calendarModule.calendarEventTypeClient.find(options);
                },


                /**
                 * Returns a promise that is resolved once the get action has been completed. Success response returns an EventType resource matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarEventTypeService.get('<event-type-id>')
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function(response, status, headers, config) {
                        // perform error handling here 
                    });             
                */
                get: function (id, options) {
                    return baasicApp.calendarModule.calendarEventTypeClient.get(id, options);
                },


                /**
                 * Returns a promise that is resolved once the create EventType action has been performed. This action creates a new EventType resource.
                 * @method
                 * @example 
                    baasicCalendarEventTypeService.create({
                        abrv: '<abrv>',
                        json: '<json>',
                        name: '<name>'
                    })
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                */
                create: function (data) {
                    return baasicApp.calendarModule.calendarEventTypeClient.create(data);
                },


                /**
                 * Returns a promise that is resolved once the update EventType action has been performed. This action updates an EventType resource.
                 * @method
                 * @example
                    eventType is a resource previously fetched using get action.
                    eventType.name = '<name>';
                    baasicCalendarEventTypeService.update(eventType)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                */
                update: function (data) {
                    return baasicApp.calendarModule.calendarEventTypeClient.update(data);
                },


                /**
                 * Returns a promise that is resolved once the remove EventType action has been performed. This action removes an EventType resource.
                 * @method
                 * @example
                    eventType is a resource previously fetched using get action.
                    baasicCalendarEventTypeService.remove(eventType)
                    .success(funcation (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    })
                */
                remove: function (data) {
                    return baasicApp.calendarModule.calendarEventTypeClient.remove(data);
                },


                /**
                 * Returns a promise that is resolved once the purge EventTypes action has been performed. This action removes all EventType resources.
                 * @method
                 * @example
                    baasicCalendarEventTypeService.purge( )
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    })
                */
                purge: function ( ) {
                    return baasicApp.calendarModule.calendarEventTypeClient.purge( );
                },


                batch: {

                    /**
                     * Returns a promise that is resolved once the create EventTypes action has been performed. This action creates new EventType resources.
                     * @method batch.create
                     * @example 
                        baasicCommerceCountryService.batch.create([{
                            abrv: '<abrv>',
                            json: '<json>',
                            name: '<name>'      
                        }])
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (respose, status, headers, config) {
                            // perform error handling here
                        });
                    */
                    create: function (data) {
                        return baasicApp.calendarModule.calendarEventTypeBatchClient.create(data);
                    },


                    /**
                     * Returns a promise that is resolved once the update EventTypes action has been performed. This action updates EventType resources.
                     * @method batch.update
                     * @example
                        eventTypes are resources previously fetched using get action.
                        baasicCalendarEventTypeService.batch.update(eventTypes)
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (response, status, headers, config) {
                            // perform error handling here
                        });
                    */
                    update: function (data) {
                        return baasicApp.calendarModule.calendarEventTypeBatchClient.update(data);
                    },


                    /**
                     * Returns a promise that is resolved once the delete EventTypes action has been performed. This action deletes EventType resources.
                     * @method batch.remove
                     * @example 
                        baasicCalendarEventTypeService.batch.remove(eventTypeIds)
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (response, status, headers, config) {
                            // perform error handling here
                        });
                    */
                    remove: function(ids) {
                        return baasicApp.calendarEventTypeBatchClient.remove(ids);
                    },

                    /**
                     * Provides direct access to `routeService`.
                     * @method batch.routeService
                     * @example baasicCalendarEventTypeService.batch.routeService.get(expandObject);
                     **/
                    routeService: baasicApp.calendarEventTypeBatchClient.routeDefinition
                },

                /**
                 * Provides direct access to `routeService`.
                 * @method
                 * @example baasicCalendarEventTypeService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.calendarEventTypeClient.routeDefinition
            };
        }
    ]);
}(angular, module));
/**
 * @copyright (c) 2017 Mono Ltd
 * @license MIT
 * @author Mono Ltd
 * @overview 
 ***Notes:**
- Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
- All end-point objects are transformed by the associated route service.
*/