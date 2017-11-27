/* globals module */
/**
 * @module baasicCalendarEventService
 * @description Baasic Calendar Event Service provides an easy way to consume Baasic Calendar REST API end-points. In order to obtain a needed routes `baasicCalendarEventService` uses `baasicCalendarEventRouteService`.
 */
(function (angular, module) {
    'use strict';
    module.service('baasicCalendarEventService', ['baasicApp',
        function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {

                /**
                 * Returns a promise that is resolved once the find action has been completed. Success response returns a list of Event resources matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarEventService.find({
                        pageNumber: 1,
                        pageSize: 10,
                        orderBy: '<field>',
                        orderDirection: '<asc|desc>',
                        search: '<search-phrase>',
                        ids: '<event-identifiers>',
                        ownerIds: '<event-owner-identifiers>',
                        calendarIds: '<calendars-identifiers>',
                        calendarNames: '<calendar-names>',
                        statusIds: '<event-status-identifiers>',
                        typeIds: '<event-type-identifiers>',
                        from: '<start-date>',
                        to: '<end-date>'
                    })
                    .success(function (collection) {
                        // perform success action here
                    })
                    .error(function(response, status, headers, config) {
                        // perform error handling here 
                    });
                 */
                find: function (options) {
                    return baasicApp.calendarModule.event.find(options);
                },


                /**
                 * Returns a promise that is resolved once the get action has been completed. Success response returns an Event resource matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarEventService.get('<event-id>')
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function(response, status, headers, config) {
                        // perform error handling here 
                    });             
                 */
                get: function (id, options) {
                    return baasicApp.calendarModule.event.get(id, options);
                },


                /**
                 * Returns a promise that is resolved once the get action has been completed. Success response returns an Event resource matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarEventService.getByEmailOrFullName(eventId, email, securityToken, options)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function(response, status, headers, config) {
                        // perform error handling here 
                    });   
                 */
                getByEmailOrFullName: function (id, emailOrFullName, securityToken, options) {
                    return baasicApp.calendarModule.event.getByEmailOrFullName(id, emailOrFullName, securityToken, options);
                },


                /**
                 * Returns a promise that is resolved once the create Event action has been performed. This action creates a new Event resource.
                 * @method
                 * @example 
                    baasicCalendarEventService.create({
                        author: <user-info>,
                        authorId: '<author-identifier>',
                        calendar: <calendar>,
                        calendarId: '<calendar-identifier>',
                        description: '<description>',
                        detail: <calendar-event-detail>,
                        endTime: '<end-time>',
                        isAllDay: '<true|false>',
                        isRecurring: '<true|false>',
                        json: '<json>',
                        startTime: '<start-time>',
                        title: '<title'>
                    })
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                 */
                create: function (data) {
                    return baasicApp.calendarModule.event.create(data);
                },


                /**
                 * Returns a promise that is resolved once the update Event action has been performed. This action updates an Event resource.
                 * @method
                 * @example
                    event is a resource previously fetched using get action.
                    event.title = '<title>';
                    baasicCalendarEventService.update(event)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                */
                update: function (data) {
                    return baasicApp.calendarModule.event.update(data);
                },


                /**
                 * Returns a promise that is resolved once the remove Event action has been performed. This action removes an Event resource.
                 * @method
                 * @example
                    event is a resource previously fetched using get action.
                    baasicCalendarEventService.remove(event)
                    .success(funcation (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                 */
                remove: function (data) {
                    return baasicApp.calendarModule.event.remove(data);
                },


                /**
                 * Returns a promise that is resolved once the purge action has been performed. This action removes all Event resources from the system matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarEventService.purge(calendar)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                 */
                purge: function (data) {
                    return baasicApp.calendarModule.event.purge(data);
                },


                batch: {

                    /**
                     * Returns a promise that is resolved once the create Events action has been performed. This action creates new Event resources.
                     * @method batch.create
                     * @example 
                        baasicCalendarEventService.batch.create([{
                            author: <user-info>,
                            authorId: '<author-identifier>',
                            calendar: <calendar>,
                            calendarId: '<calendar-identifier>',
                            description: '<description>',
                            detail: <calendar-event-detail>,
                            endTime: '<end-time>',
                            isAllDay: '<true|false>',
                            isRecurring: '<true|false>',
                            json: '<json>',
                            startTime: '<start-time>',
                            title: '<title'>
                        }])
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (respose, status, headers, config) {
                            // perform error handling here
                        });
                     */
                    create: function (data) {
                        return baasicApp.calendarModule.event.batch.create(data);
                    },


                    /**
                     * Returns a promise that is resolved once the update Events action has been performed. This action updates Event resources.
                     * @method batch.update
                     * @example
                        events are resources previously fetched using get action.
                        baasicCalendarEventService.batch.update(events)
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (response, status, headers, config) {
                            // perform error handling here
                        });
                     */
                    update: function (data) {
                        return baasicApp.calendarModule.event.batch.update(data);
                    },


                    /**
                     * Returns a promise that is resolved once the delete Events action has been performed. This action deletes Event resources.
                     * @method batch.remove
                     * @example 
                        baasicCalendarEventService.batch.remove(eventIds)
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (response, status, headers, config) {
                            // perform error handling here
                        });
                     */
                    remove: function(ids) {
                        return baasicApp.calendarModule.event.batch.remove(ids);
                    },

                    /**
                     * Provides direct access to `routeService`.
                     * @method batch.routeService
                     * @example 
                        baasicCalendarEventService.batch.routeService.get(expandObject);
                     */
                    routeService:baasicApp.calendarModule.event.batch.routeDefinition
                },

                /**
                 * Provides direct access to `routeService`.
                 * @method
                 * @example 
                    baasicCalendarEventService.routeService.get(expandObject);
                 */
                routeService: baasicApp.calendarModule.event.routeDefinition
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