/* globals module */
/**
 * @module baasicCalendarEventsService
 * @description Baasic Calendar Events Service provides an easy way to consume Baasic Calendar REST API end-points. In order to obtain a needed routes `baasicCalendarEventsService` uses `baasicCalendarEventsRouteService`.
 */
(function (angular, module) {
    'use strict';
    module.service('baasicCalendarEventsService', ['baasicApp',
        function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {

                /**
                 * Returns a promise that is resolved once the find action has been completed. Success response returns a list of Event resources matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarEventsService.find(calendarId, {
                        pageNumber: 1,
                        pageSize: 10,
                        orderBy: '<field>',
                        orderDirection: '<asc|desc>',
                        search: '<search-phrase>',
                        ids: '<event-identifiers>',
                        ownerIds: '<event-owner-identifiers>',
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
                find: function (calendarId, options) {
                    return baasicApp.calendarModule.calendar.events.find(calendarId, options);
                },


                /**
                 * Returns a promise that is resolved once the get action has been completed. Success response returns an Event resource matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarEventsService.get(calendarId, eventId)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function(response, status, headers, config) {
                        // perform error handling here 
                    });             
                 */
                get: function (id, options) {
                    return baasicApp.calendarModule.calendar.events.get(calendarId, id, options);
                },


                /**
                 * Returns a promise that is resolved once the get action has been completed. Success response returns an Event resource matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarEventsService.getByEmailOrFullName(calendarId, eventId, email, options)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function(response, status, headers, config) {
                        // perform error handling here 
                    });   
                 */
                getByEmailOrFullName: function (calendarId, id, emailOrFullName, options) {
                    return baasicApp.calendarModule.calendar.events.getByEmailOrFullName(calendarId, id, emailOrFullName, options);
                },


                /**
                 * Returns a promise that is resolved once the link Event action has been performed. This action links the specified event resource to the specified calendar resource.
                 * @method
                 * @example 
                    baasicCalendarEventsService.link(calendarId, data)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                 */
                link: function (calendarId, data) {
                    return baasicApp.calendarModule.calendar.events.link(calendarId, data);
                },


                /**
                 * Returns a promise that is resolved once the update Event action has been performed. This action updates an Event resource.
                 * @method
                 * @example
                    event is a resource previously fetched using get action.
                    event.title = '<title>';
                    baasicCalendarEventsService.update(calendarId, event)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                 */
                update: function (calendarId, data) {
                    return baasicApp.calendarModule.calendar.events.update(calendarId, data);
                },


                /**
                 * Returns a promise that is resolved once the unlink Event action has been performed. This action unlinks the specified event resource from the specified calendar resource.
                 * @method
                 * @example
                    baasicCalendarEventsService.unlink(calendarId, data)
                    .success(funcation (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    })
                 */
                unlink: function (calendarId, data) {
                    return baasicApp.calendarModule.calendar.events.unlink(calendarId, data);
                },


                /**
                 * Provides direct access to `routeService`.
                 * @method
                 * @example 
                    baasicCalendarEventsService.routeService.get(expandObject);
                 */
                routeService: baasicApp.calendarModule.calendar.events.routeDefinition
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