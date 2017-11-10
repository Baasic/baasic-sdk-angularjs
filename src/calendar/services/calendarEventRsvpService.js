/* globals module */
/**
 * @module baasicCalendarEventRsvpService
 * @description Baasic Calendar Event Rsvp Service provides an easy way to consume Baasic Calendar REST API end-points. In order to obtain a needed routes `baasicCalendarEventRsvpService` uses `baasicCalendarEventRsvpRouteService`.
 */
(function (angular, module) {
    'use strict';
    module.service('baasicCalendarEventRsvpService', ['baasicApp',
        function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {

                /**
                 * Returns a promise that is resolved once the find action has been completed. Success response returns a list of EventRsvp resources matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarEventRsvpService.find({
                        pageNumber: 1,
                        pageSize: 10,
                        orderBy: '<field>',
                        orderDirection: '<asc|desc>',
                        search: '<search-phrase>',
                        ids: '<event-rsvp-identifiers>',
                        calendarIds: '<calendar-identifiers>',
                        calendarNames: '<calendar-names'>,
                        invitationTypeIds: '<invitation-type-identifiers>',
                        invitationOnly: '<true|false>',
                        statudIds: '<event-status-identifiers>',
                        typeIds: '<event-type-identifiers>',
                        from: '<start-date>',
                        to: '<end-date>',
                        registrationCloseFrom: '<registration-from-date>',
                        registrationCloseTo: '<registration-to-date>'
                    })
                    .success(function (collection) {
                        // perform success action here
                    })
                    .error(function(response, status, headers, config) {
                        // perform error handling here 
                    });
                */
                find: function (options) {
                    return baasicApp.calendarModule.calendarEventRsvpClient.find(options);
                },


                /**
                 * Returns a promise that is resolved once the get action has been completed. Success response returns an EventRsvp resource matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarEventRsvpService.get('<event-rsvp-id>')
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function(response, status, headers, config) {
                        // perform error handling here 
                    });             
                */
                get: function (id, options) {
                    return baasicApp.calendarModule.calendarEventRsvpClient.get(id, options);
                },


                /**
                 * Returns a promise that is resolved once the create EventRsvp action has been performed. This action creates a new EventRsvp resource.
                 * @method
                 * @example 
                    baasicCalendarEventRsvpService.create({
                        InvitationOnly: <true|false>,
                        InvitationType: <calendar-rsvp-invitation-type>,
                        InvitationTypeId: '<invitation-type-id>',
                        Json: '<json>',
                        MaxSlots: <max-slots>,
                        MinSlots: <min-slots>,
                        RegistrationCloseDate: '<registration-close-date>',
                        TotalSlots: <total-slots>
                    })
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                */
                create: function (data) {
                    return baasicApp.calendarModule.calendarEventRsvpClient.create(data);
                },


                /**
                 * Returns a promise that is resolved once the update EventRsvp action has been performed. This action updates an EventRsvp resource.
                 * @method
                 * @example
                    eventRsvp is a resource previously fetched using get action.
                    eventRsvp.maxSlots = '<max-slots>';
                    baasicCalendarEventRsvpService.update(eventRsvp)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                */
                update: function (data) {
                    return baasicApp.calendarModule.calendarEventRsvpClient.update(data);
                },


                /**
                 * Returns a promise that is resolved once the remove EventRsvp action has been performed. This action removes an EventRsvp resource.
                 * @method
                 * @example
                    eventRsvp is a resource previously fetched using get action.
                    baasicCalendarEventRsvpService.remove(eventRsvp)
                    .success(funcation (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    })
                */
                remove: function (data) {
                    return baasicApp.calendarModule.calendarEventRsvpClient.remove(data);
                },


                /**
                 * Returns a promise that is resolved once the purgeForEvent action has been performed. This action removes all EventRsvp resources from the specified event resource.
                 * @method
                 * @example
                    baasicCalendarEventRsvpService.purgeForEvent(event)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    })
                */
                purgeForEvent: function (data) {
                    return baasicApp.calendarModule.calendarEventRsvpClient.purge(data);
                },


                batch: {

                    /**
                     * Returns a promise that is resolved once the create EventRsvps action has been performed. This action creates new EventRsvp resources.
                     * @method batch.create
                     * @example 
                        baasicCalendarEventRsvpService.batch.create([{
                            InvitationOnly: <true|false>,
                            InvitationType: <calendar-rsvp-invitation-type>,
                            InvitationTypeId: '<invitation-type-id>',
                            Json: '<json>',
                            MaxSlots: <max-slots>,
                            MinSlots: <min-slots>,
                            RegistrationCloseDate: '<registration-close-date>',
                            TotalSlots: <total-slots>
                        }])
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (respose, status, headers, config) {
                            // perform error handling here
                        });
                    */
                    create: function (data) {
                        return baasicApp.calendarModule.calendarEventRsvpBatchClient.create(data);
                    },


                    /**
                     * Returns a promise that is resolved once the update EventRsvps action has been performed. This action updates EventRsvp resources.
                     * @method batch.update
                     * @example
                        eventRsvps are resources previously fetched using get action.
                        baasicCalendarEventRsvpService.batch.update(eventRsvps)
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (response, status, headers, config) {
                            // perform error handling here
                        });
                    */
                    update: function (data) {
                        return baasicApp.calendarModule.calendarEventRsvpBatchClient.update(data);
                    },


                    /**
                     * Returns a promise that is resolved once the delete EventRsvps action has been performed. This action deletes EventRsvp resources.
                     * @method batch.remove
                     * @example 
                        baasicCalendarEventRsvpService.batch.remove(eventRsvpIds)
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (response, status, headers, config) {
                            // perform error handling here
                        });
                    */
                    remove: function(ids) {
                        return baasicApp.calendarEventRsvpBatchClient.remove(ids);
                    },

                    /**
                     * Provides direct access to `routeService`.
                     * @method batch.routeService
                     * @example baasicCalendarEventRsvpService.batch.routeService.get(expandObject);
                     **/
                    routeService: baasicApp.calendarEventRsvpBatchClient.routeDefinition
                },

                /**
                 * Provides direct access to `routeService`.
                 * @method
                 * @example baasicCalendarEventRsvpService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.calendarEventRsvpClient.routeDefinition
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