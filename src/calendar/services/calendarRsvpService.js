/* globals module */
/**
 * @module baasicCalendarRsvpService
 * @description Baasic Calendar Rsvp Service provides an easy way to consume Baasic Calendar REST API end-points. In order to obtain a needed routes `baasicCalendarRsvpService` uses `baasicCalendarRsvpRouteService`.
 */
(function (angular, module) {
    'use strict';
    module.service('baasicCalendarRsvpService', ['baasicApp',
        function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {

                /**
                 * Returns a promise that is resolved once the find action has been completed. Success response returns a list of EventRsvp resources matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarRsvpService.find(calendarId, {
                        pageNumber: 1,
                        pageSize: 10,
                        orderBy: '<field>',
                        orderDirection: '<asc|desc>',
                        search: '<search-phrase>',
                        ids: '<ids>',
                        InvitationTypeIds: '<invitation-type-ids>',
                        InvitationOnly: <true|false>,
                        statusIds: '<status-ids>',
                        from: '<from-date>',
                        to: '<to-date>',
                        registrationCloseFrom: '<registration-start-date>',
                        registrationCloseTo: '<registration-end-date>'
                    })
                    .success(function (collection) {
                        // perform success action here
                    })
                    .error(function(response, status, headers, config) {
                        // perform error handling here 
                    });
                */
                find: function (calendarId, options) {
                    return baasicApp.calendarModule.calendarRsvpClient.find(calendarId, options);
                },


                /**
                 * Returns a promise that is resolved once the get action has been completed. Success response returns an EventRsvp resource matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarRsvpService.get(calendarId, id)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function(response, status, headers, config) {
                        // perform error handling here 
                    });             
                */
                get: function (calendarId, id, options) {
                    return baasicApp.calendarModule.calendarRsvpClient.get(calendarId, id, options);
                },


                /**
                 * Returns a promise that is resolved once the link EventRsvp action has been performed. This action links the specified eventRsvp resource to the specified calendar resource.
                 * @method
                 * @example 
                    baasicCalendarRsvpService.link(calendarId, {
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
                link: function (calendarId, data) {
                    return baasicApp.calendarModule.calendarRsvpClient.link(calendarId, data);
                },


                /**
                 * Returns a promise that is resolved once the update EventRsvp action has been performed. This action updates an EventRsvp resource.
                 * @method
                 * @example
                    eventRsvp is a resource previously fetched using get action.
                    eventRsvp.MaxSlots = '<max-slots>';
                    baasicCalendarRsvpService.update(calendarId, eventRsvp)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                */
                update: function (calendarId, data) {
                    return baasicApp.calendarModule.calendarRsvpClient.update(calendarId, data);
                },


                /**
                 * Returns a promise that is resolved once the unlink EventRsvp action has been performed. This action unlinks the specified eventRsvp resource from the specified calendar resource.
                 * @method
                 * @example
                    baasicCalendarRsvpService.unlink(calendarId, eventRsvp)
                    .success(funcation (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                */
                unlink: function (calendarId, data) {
                    return baasicApp.calendarModule.calendarRsvpClient.unlink(calendarId, data);
                },


                /**
                 * Returns a promise that is resolved once the purge EventRsvps action has been performed. This action deletes all EventRsvps from the specified Event resource.
                 * @method
                 * @example
                    baasicCalendarRsvpService.purge(calendarId, event)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                 */
                purge: function (calendarId, data) {
                    return baasicApp.calendarModule.calendarRsvpClient.purge(calendarId, data);
                },


                batch: {

                    /**
                     * Returns a promise that is resolved once the link EventRsvps action has been performed. This action links EnventRsvp resources to the specified calendar.
                     * @method batch.link
                     * @example 
                        baasicCalendarRsvpService.batch.link(calendarId, [{
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
                    link: function (calendarId, data) {
                        return baasicApp.calendarModule.calendarRsvpBatchClient.link(calendarId, data);
                    },


                    /**
                     * Returns a promise that is resolved once the update EventRsvps action has been performed. This action updates EventRsvp resources.
                     * @method batch.update
                     * @example
                        eventRsvps are resources previously fetched using get action.
                        baasicCalendarRsvpService.batch.update(calendarId, eventRsvps)
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (response, status, headers, config) {
                            // perform error handling here
                        });
                    */
                    update: function (calendarId, data) {
                        return baasicApp.calendarModule.calendarRsvpBatchClient.update(calendarId, data);
                    },


                    /**
                     * Returns a promise that is resolved once the unlink EventRsvps action has been performed. This action unlinks EventRsvp resources from the specified calendar.
                     * @method batch.unlink
                     * @example 
                        baasicCalendarRsvpService.batch.unlink(calendarId, eventRsvpIds)
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (response, status, headers, config) {
                            // perform error handling here
                        });
                    */
                    unlink: function(calendarId, ids) {
                        return baasicApp.calendarRsvpBatchClient.unlink(calendarId, ids);
                    },

                    /**
                     * Provides direct access to `routeService`.
                     * @method batch.routeService
                     * @example baasicCalendarRsvpService.batch.routeService.get(expandObject);
                     **/
                    routeService: baasicApp.calendarRsvpBatchClient.routeDefinition
                },


                /**
                 * Provides direct access to `routeService`.
                 * @method
                 * @example baasicCalendarRsvpService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.calendarRsvpClient.routeDefinition
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