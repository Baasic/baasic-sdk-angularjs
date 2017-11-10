/* globals module */
/**
 * @module baasicCalendarEventRsvpAttendeeStatusService
 * @description Baasic Calendar Event Rsvp Attendee Status Service provides an easy way to consume Baasic Calendar REST API end-points. In order to obtain a needed routes `baasicCalendarEventRsvpAttendeeStatusService` uses `baasicCalendarEventRsvpAttendeeStatusRouteService`.
 */
(function (angular, module) {
    'use strict';
    module.service('baasicCalendarEventRsvpAttendeeStatusService', ['baasicApp',
        function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {

                /**
                 * Returns a promise that is resolved once the find action has been completed. Success response returns a list of EventRsvpAttendeeStatus resources matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarEventRsvpAttendeeStatusService.find({
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
                    return baasicApp.calendarModule.calendarEventRsvpAttendeeStatusClient.find(options);
                },


                /**
                 * Returns a promise that is resolved once the get action has been completed. Success response returns an EventRsvpAttendeeStatus resource matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarEventRsvpAttendeeStatusService.get('<event-rsvp-attendee-status-id>')
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function(response, status, headers, config) {
                        // perform error handling here 
                    });             
                */
                get: function (id, options) {
                    return baasicApp.calendarModule.calendarEventRsvpAttendeeStatusClient.get(id, options);
                },


                /**
                 * Returns a promise that is resolved once the create EventRsvpAttendeeStatus action has been performed. This action creates a new EventRsvpAttendeeStatus resource.
                 * @method
                 * @example 
                    baasicCalendarEventRsvpAttendeeStatusService.create({
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
                    return baasicApp.calendarModule.calendarEventRsvpAttendeeStatusClient.create(data);
                },


                /**
                 * Returns a promise that is resolved once the update EventRsvpAttendeeStatus action has been performed. This action updates an EventRsvpAttendeeStatus resource.
                 * @method
                 * @example
                    eventRsvpAttendeeStatus is a resource previously fetched using get action.
                    eventRsvpAttendeeStatus.name = '<name>';
                    baasicCalendarEventRsvpAttendeeStatusService.update(eventRsvpAttendeeStatus)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                */
                update: function (data) {
                    return baasicApp.calendarModule.calendarEventRsvpAttendeeStatusClient.update(data);
                },


                /**
                 * Returns a promise that is resolved once the remove EventRsvpAttendeeStatus action has been performed. This action removes an EventRsvpAttendeeStatus resource.
                 * @method
                 * @example
                    eventRsvpAttendeeStatus is a resource previously fetched using get action.
                    baasicCalendarEventRsvpAttendeeStatusService.remove(eventRsvpAttendeeStatus)
                    .success(funcation (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    })
                */
                remove: function (data) {
                    return baasicApp.calendarModule.calendarEventRsvpAttendeeStatusClient.remove(data);
                },


                /**
                 * Returns a promise that is resolved once the purge EventRsvpAttendeeStatuses action has been performed. This action removes all EventRsvpAttendeeStatus resources.
                 * @method
                 * @example
                    baasicCalendarEventRsvpAttendeeStatusService.purge( )
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    })
                */
                purge: function ( ) {
                    return baasicApp.calendarModule.calendarEventRsvpAttendeeStatusClient.purge( );
                },


                batch: {

                    /**
                     * Returns a promise that is resolved once the create EventRsvpAttendeeStatuses action has been performed. This action creates new EventRsvpAttendeeStatus resources.
                     * @method batch.create
                     * @example 
                        baasicCalendarEventRsvpAttendeeStatusService.batch.create([{
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
                        return baasicApp.calendarModule.calendarEventRsvpAttendeeStatusBatchClient.create(data);
                    },


                    /**
                     * Returns a promise that is resolved once the update EventRsvpAttendeeStatuses action has been performed. This action updates EventRsvpAttendeeStatus resources.
                     * @method batch.update
                     * @example
                        eventRsvpAttendeeStatuses are resources previously fetched using get action.
                        baasicCalendarEventRsvpAttendeeStatusService.batch.update(eventRsvpAttendeeStatuses)
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (response, status, headers, config) {
                            // perform error handling here
                        });
                    */
                    update: function (data) {
                        return baasicApp.calendarModule.calendarEventRsvpAttendeeStatusBatchClient.update(data);
                    },


                    /**
                     * Returns a promise that is resolved once the delete EventRsvpAttendeeStatuses action has been performed. This action deletes EventRsvpAttendeeStatus resources.
                     * @method batch.remove
                     * @example 
                        baasicCalendarEventRsvpAttendeeStatusService.batch.remove(eventRsvpAttendeeStatusIds)
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (response, status, headers, config) {
                            // perform error handling here
                        });
                    */
                    remove: function(ids) {
                        return baasicApp.calendarEventRsvpAttendeeStatusBatchClient.remove(ids);
                    },

                    /**
                     * Provides direct access to `routeService`.
                     * @method batch.routeService
                     * @example baasicCalendarEventRsvpAttendeeStatusService.batch.routeService.get(expandObject);
                     **/
                    routeService: baasicApp.calendarEventRsvpAttendeeStatusBatchClient.routeDefinition
                },

                /**
                 * Provides direct access to `routeService`.
                 * @method
                 * @example baasicCalendarEventRsvpAttendeeStatusService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.calendarEventRsvpAttendeeStatusClient.routeDefinition
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