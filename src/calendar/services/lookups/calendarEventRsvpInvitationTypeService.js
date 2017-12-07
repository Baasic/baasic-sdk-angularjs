/* globals module */
/**
 * @module baasicCalendarEventRsvpInvitationTypeService
 * @description Baasic Calendar Event Rsvp Invitation Type Service provides an easy way to consume Baasic Calendar REST API end-points. In order to obtain a needed routes `baasicCalendarEventRsvpInvitationTypeService` uses `baasicCalendarEventRsvpInvitationTypeRouteService`.
 */
(function (angular, module) {
    'use strict';
    module.service('baasicCalendarEventRsvpInvitationTypeService', ['baasicApp',
        function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {

                /**
                 * Returns a promise that is resolved once the find action has been completed. Success response returns a list of EventRsvpInvitationType resources matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarEventRsvpInvitationTypeService.find({
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
                    return baasicApp.calendarModule.lookups.rsvpInvitationType.find(options);
                },


                /**
                 * Returns a promise that is resolved once the get action has been completed. Success response returns an EventRsvpInvitationType resource matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarEventRsvpInvitationTypeService.get('<event-rsvp-invitation-type-id>')
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function(response, status, headers, config) {
                        // perform error handling here 
                    });             
                 */
                get: function (id, options) {
                    return baasicApp.calendarModule.lookups.rsvpInvitationType.get(id, options);
                },


                /**
                 * Returns a promise that is resolved once the create EventRsvpInvitationType action has been performed. This action creates a new EventRsvpInvitationType resource.
                 * @method
                 * @example 
                    baasicCalendarEventRsvpInvitationTypeService.create({
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
                    return baasicApp.calendarModule.lookups.rsvpInvitationType.create(data);
                },


                /**
                 * Returns a promise that is resolved once the update EventRsvpInvitationType action has been performed. This action updates an EventRsvpInvitationType resource.
                 * @method
                 * @example
                    eventRsvpInvitationType is a resource previously fetched using get action.
                    eventRsvpInvitationType.name = '<name>';
                    baasicCalendarEventRsvpInvitationTypeService.update(eventRsvpInvitationType)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                 */
                update: function (data) {
                    return baasicApp.calendarModule.lookups.rsvpInvitationType.update(data);
                },


                /**
                 * Returns a promise that is resolved once the remove EventRsvpInvitationType action has been performed. This action removes an EventRsvpInvitationType resource.
                 * @method
                 * @example
                    eventRsvpInvitationType is a resource previously fetched using get action.
                    baasicCalendarEventRsvpInvitationTypeService.remove(eventRsvpInvitationType)
                    .success(funcation (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                 */
                remove: function (data) {
                    return baasicApp.calendarModule.lookups.rsvpInvitationType.remove(data);
                },


                /**
                 * Returns a promise that is resolved once the purge EventRsvpInvitationTypes action has been performed. This action removes all EventRsvpInvitationType resources.
                 * @method
                 * @example
                    baasicCalendarEventRsvpInvitationTypeService.purge( )
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                 */
                purge: function ( ) {
                    return baasicApp.calendarModule.lookups.rsvpInvitationType.purge( );
                },


                batch: {

                    /**
                     * Returns a promise that is resolved once the create EventRsvpInvitationTypes action has been performed. This action creates new EventRsvpInvitationType resources.
                     * @method batch.create
                     * @example 
                        baasicCalendarEventRsvpInvitationTypeService.batch.create([{
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
                        return baasicApp.calendarModule.lookups.rsvpInvitationType.batch.create(data);
                    },


                    /**
                     * Returns a promise that is resolved once the update EventRsvpInvitationTypes action has been performed. This action updates EventRsvpInvitationType resources.
                     * @method batch.update
                     * @example
                        eventRsvpInvitationTypes are resources previously fetched using get action.
                        baasicCalendarEventRsvpInvitationTypeService.batch.update(eventRsvpInvitationTypes)
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (response, status, headers, config) {
                            // perform error handling here
                        });
                     */
                    update: function (data) {
                        return baasicApp.calendarModule.lookups.rsvpInvitationType.batch.update(data);
                    },


                    /**
                     * Returns a promise that is resolved once the delete EventRsvpInvitationTypes action has been performed. This action deletes EventRsvpInvitationType resources.
                     * @method batch.remove
                     * @example 
                        baasicCalendarEventRsvpInvitationTypeService.batch.remove(eventRsvpInvitationTypeIds)
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (response, status, headers, config) {
                            // perform error handling here
                        });
                     */
                    remove: function(ids) {
                        return baasicApp.calendarModule.lookups.rsvpInvitationType.batch.remove(ids);
                    },

                    /**
                     * Provides direct access to `routeService`.
                     * @method batch.routeService
                     * @example 
                        baasicCalendarEventRsvpInvitationTypeService.batch.routeService.get(expandObject);
                     */
                    routeService: baasicApp.calendarModule.lookups.rsvpInvitationType.batch.routeDefinition
                },

                /**
                 * Provides direct access to `routeService`.
                 * @method
                 * @example 
                    baasicCalendarEventRsvpInvitationTypeService.routeService.get(expandObject);
                 */
                routeService: baasicApp.calendarModule.lookups.rsvpInvitationType.routeDefinition
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