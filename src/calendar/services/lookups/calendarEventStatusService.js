/* globals module */
/**
 * @module baasicCalendarEventStatusService
 * @description Baasic Calendar Event Status Service provides an easy way to consume Baasic Calendar REST API end-points. In order to obtain a needed routes `baasicCalendarEventStatusService` uses `baasicCalendarEventStatusRouteService`.
 */
(function (angular, module) {
    'use strict';
    module.service('baasicCalendarEventStatusService', ['baasicApp',
        function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {

                /**
                 * Returns a promise that is resolved once the find action has been completed. Success response returns a list of EventStatus resources matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarEventStatusService.find({
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
                    return baasicApp.calendarModule.calendarEventStatusClient.find(options);
                },


                /**
                 * Returns a promise that is resolved once the get action has been completed. Success response returns an EventStatus resource matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarEventStatusService.get('<event-status-id>')
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function(response, status, headers, config) {
                        // perform error handling here 
                    });             
                */
                get: function (id, options) {
                    return baasicApp.calendarModule.calendarEventStatusClient.get(id, options);
                },


                /**
                 * Returns a promise that is resolved once the create EventStatus action has been performed. This action creates a new EventStatus resource.
                 * @method
                 * @example 
                    baasicCalendarEventStatusService.create({
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
                    return baasicApp.calendarModule.calendarEventStatusClient.create(data);
                },


                /**
                 * Returns a promise that is resolved once the update EventStatus action has been performed. This action updates an EventStatus resource.
                 * @method
                 * @example
                    eventStatus is a resource previously fetched using get action.
                    eventStatus.name = '<name>';
                    baasicCalendarEventStatusService.update(eventStatus)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                */
                update: function (data) {
                    return baasicApp.calendarModule.calendarEventStatusClient.update(data);
                },


                /**
                 * Returns a promise that is resolved once the remove EventStatus action has been performed. This action removes an EventStatus resource.
                 * @method
                 * @example
                    eventStatus is a resource previously fetched using get action.
                    baasicCalendarEventStatusService.remove(eventStatus)
                    .success(funcation (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    })
                */
                remove: function (data) {
                    return baasicApp.calendarModule.calendarEventStatusClient.remove(data);
                },


                /**
                 * Returns a promise that is resolved once the purge EventStatuses action has been performed. This action removes all EventStatus resources.
                 * @method
                 * @example
                    baasicCalendarEventStatusService.purge( )
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    })
                */
                purge: function ( ) {
                    return baasicApp.calendarModule.calendarEventStatusClient.purge( );
                },


                batch: {

                    /**
                     * Returns a promise that is resolved once the create EventStatuses action has been performed. This action creates new EventStatus resources.
                     * @method batch.create
                     * @example 
                        baasicCalendarEventStatusService.batch.create([{
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
                        return baasicApp.calendarModule.calendarEventStatusBatchClient.create(data);
                    },


                    /**
                     * Returns a promise that is resolved once the update EventStatuses action has been performed. This action updates EventStatus resources.
                     * @method batch.update
                     * @example
                        eventStatuses are resources previously fetched using get action.
                        baasicCalendarEventStatusService.batch.update(eventStatuses)
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (response, status, headers, config) {
                            // perform error handling here
                        });
                    */
                    update: function (data) {
                        return baasicApp.calendarModule.calendarEventStatusBatchClient.update(data);
                    },


                    /**
                     * Returns a promise that is resolved once the delete EventStatuses action has been performed. This action deletes EventStatus resources.
                     * @method batch.remove
                     * @example 
                        baasicCalendarEventStatusService.batch.remove(eventStatusIds)
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (response, status, headers, config) {
                            // perform error handling here
                        });
                    */
                    remove: function(ids) {
                        return baasicApp.calendarEventStatusBatchClient.remove(ids);
                    },

                    /**
                     * Provides direct access to `routeService`.
                     * @method batch.routeService
                     * @example baasicCalendarEventStatusService.batch.routeService.get(expandObject);
                     **/
                    routeService: baasicApp.calendarEventStatusBatchClient.routeDefinition
                },

                /**
                 * Provides direct access to `routeService`.
                 * @method
                 * @example baasicCalendarEventStatusService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.calendarEventStatusClient.routeDefinition
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