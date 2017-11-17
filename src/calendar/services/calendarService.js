/* globals module */
/**
 * @module baasicCalendarService
 * @description Baasic Calendar Service provides an easy way to consume Baasic Calendar REST API end-points. In order to obtain a needed routes `baasicCalendarService` uses `baasicCalendarRouteService`.
 */
(function (angular, module) {
    'use strict';
    module.service('baasicCalendarRsvpService', ['baasicApp',
        function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {

                /**
                 * Returns a promise that is resolved once the find action has been completed. Success response returns a list of Calendar resources matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarService.find({
                        pageNumber : 1,
                        pageSize : 10,
                        orderBy : '<field>',
                        orderDirection : '<asc|desc>',
                        search : '<search-phrase>',
                        ids : <identifiers>,
                        from : <start-date>,
                        to : <end-date>
                    })
                    .success(function (collection) {
                        // perform success action here
                    })
                    .error(function(response, status, headers, config) {
                        // perform error handling here 
                    });
                */
                find: function (options) {
                    return baasicApp.calendarModule.calendar.find(options);
                },


                /**
                 * Returns a promise that is resolved once the get action has been completed. Success response returns a Calendar resource matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarService.get(id)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function(response, status, headers, config) {
                        // perform error handling here 
                    });             
                */
                get: function (id, options) {
                    return baasicApp.calendarModule.calendar.get(id, options);
                },


                /**
                 * Returns a promise that is resolved once the create Calendar action has been performed. This action creates a new Calendar resource.
                 * @method
                 * @example 
                    baasicCalendarService.create({
                        abrv: '<abrv>',
                        description: '<description>',
                        json: '<json>',
                        name: '<name>',
                        owner: <user-info>,
                        ownerId: '<owner-id>'
                    })
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                */
                create: function (data) {
                    return baasicApp.calendarModule.calendar.create(data);
                },


                /**
                 * Returns a promise that is resolved once the update Calendar action has been performed. This action updates a Calendar resource.
                 * @method
                 * @example
                    calendar is a resource previously fetched using get action.
                    calendar.Name = '<name>';
                    baasicCalendarService.update(calendar)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                */
                update: function (data) {
                    return baasicApp.calendarModule.calendar.update(data);
                },


                /**
                 * Returns a promise that is resolved once the remove Calendar action has been performed. This action removes the specified calendar resource from the system.
                 * @method
                 * @example
                    baasicCalendarService.remove(calendar)
                    .success(funcation (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                */
                remove: function (data) {
                    return baasicApp.calendarModule.calendar.remove(data);
                },


                /**
                 * Returns a promise that is resolved once the purge Calendars action has been performed. This action deletes all Calendar resources from the system.
                 * @method
                 * @example
                    baasicCalendarService.purge( )
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                 */
                purge: function ( ) {
                    return baasicApp.calendarModule.calendar.purge( );
                },


                batch: {

                    /**
                     * Returns a promise that is resolved once the create Calendars action has been performed. This action creates new Calendar resources.
                     * @method batch.create
                     * @example 
                        baasicCalendarService.batch.create([{
                            abrv: '<abrv>',
                            description: '<description>',
                            json: '<json>',
                            name: '<name>',
                            owner: <user-info>,
                            ownerId: '<owner-id>'
                        }])
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (respose, status, headers, config) {
                            // perform error handling here
                        });
                    */
                    create: function (data) {
                        return baasicApp.calendarModule.calendar.batch.create(data);
                    },


                    /**
                     * Returns a promise that is resolved once the update Calendars action has been performed. This action updates Calendar resources.
                     * @method batch.update
                     * @example
                        calendars are resources previously fetched using get action.
                        baasicCalendarService.batch.update(calendars)
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (response, status, headers, config) {
                            // perform error handling here
                        });
                    */
                    update: function (data) {
                        return baasicApp.calendarModule.calendar.batch.update(data);
                    },


                    /**
                     * Returns a promise that is resolved once the remove Calendars action has been performed. This removes Calendar resources from the system.
                     * @method batch.remove
                     * @example 
                        baasicCalendarService.batch.remove(calendarIds)
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (response, status, headers, config) {
                            // perform error handling here
                        });
                    */
                    remove: function(ids) {
                        return baasicApp.calendarModule.Calendar.batch.remove(ids);
                    },

                    /**
                     * Provides direct access to `routeService`.
                     * @method batch.routeService
                     * @example baasicCalendarService.batch.routeService.get(expandObject);
                     **/
                    routeService: baasicApp.calendarModule.calendar.batch.routeDefinition
                },


                /**
                 * Provides direct access to `routeService`.
                 * @method
                 * @example baasicCalendarService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.calendarModule.calendar.routeDefinition
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