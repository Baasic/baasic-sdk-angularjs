/* globals module */
/**
 * @module baasicCalendarRsvpAttendeeService
 * @description Baasic Calendar Rsvp Attendee Service provides an easy way to consume Baasic Calendar REST API end-points. In order to obtain a needed routes `baasicCalendarRsvpAttendeeService` uses `baasicCalendarRsvpAttendeeRouteService`.
 */
(function (angular, module) {
    'use strict';
    module.service('baasicCalendarRsvpAttendeeService', ['baasicApp',
        function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {

                /**
                 * Returns a promise that is resolved once the find action has been completed. Success response returns a list of EventRsvpAttendee resources matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarRsvpAttendeeService.find(calendarId, eventId, {
                        pageNumber: 1,
                        pageSize: 10,
                        orderBy: '<field>',
                        orderDirection: '<asc|desc>',
                        search: '<search-phrase>',
                        ids: '<ids>',
                        userIds: '<user-ids>',
                        emails: '<emails>',
                        fullNames: '<full-names>',
                        invitationTypeIds: '<invitation-type-ids>',
                        from: <from-date>,
                        to: <to-date>
                    })
                    .success(function (collection) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here 
                    });
                */
                find: function (calendarId, eventId, options) {
                    return baasicApp.calendarModule.calendarRsvpAttendeeClient.find(calendarId, eventId, options);
                },


                /**
                 * Returns a promise that is resolved once the get action has been completed. Success response returns an EventRsvpAttendee resource matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarRsvpAttendeeService.get(calendarId, eventId, id)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function(response, status, headers, config) {
                        // perform error handling here 
                    });             
                */
                get: function (calendarId, eventId, id, options) {
                    return baasicApp.calendarModule.calendarRsvpAttendeeClient.get(calendarId, eventId, id, options);
                },


                /**
                 * Returns a promise that is resolved once the get action has been completed. Success response returns an EventRsvpAttendee resource matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarRsvpAttendeeService.getByEmailOrFullName(calendarId, eventId, email) 
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                 */
                getByEmailOrFullName: function(calendarId, eventId, emailOrFullName) {
                    return baasicApp.calendarModule.calendarRsvpAttendeeClient.getByEmailOrFullName(calendarId, eventId, emailOrFullName);
                },


                /**
                 * Returns a promise that is resolved once the link EventRsvpAttendee action has been performed. This action links the specified eventRsvpAttendee resource to the specified calendar resource.
                 * @method
                 * @example 
                    baasicCalendarRsvpService.link(calendarId, eventId, {
                        AttendeeStatus: <calendar-evetn-attendee-status>,
                        AttendeeStatusId '<attendee-status-id>',
                        DateCreated: '<date-created>',
                        DateUpdated: '<date-updated>',
                        Email: '<email>',
                        EventID: '<calendar-event-id>',
                        FullName: '<full-name>',
                        Id: '<id>',
                        InvitationType: <calendar-event-invitation-type>,
                        InvitationTypeId: '<invitation-type-id>',
                        Json: '<json>',
                        Slots: <slots>,
                        SlotsRequested: <slots-requested>,
                        User: <user-profile>,
                        UserID: '<user-id>'
                    })
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                */
                link: function (calendarId, eventId, data) {
                    return baasicApp.calendarModule.calendarRsvpAttendeeClient.link(calendarId, eventId, data);
                },


                /**
                 * Returns a promise that is resolved once the update EventRsvpAttendee action has been performed. This action updates an EventRsvpAttendee resource.
                 * @method
                 * @example
                    eventRsvpAttendee is a resource previously fetched using get action.
                    eventRsvpAttendee.SlotsRequested = '<clots-requested>';
                    baasicCalendarRsvpAttendeeService.update(calendarId, eventId, eventRsvpAttendee)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                */
                update: function (calendarId, eventId, data) {
                    return baasicApp.calendarModule.calendarRsvpAttendeeClient.update(calendarId, eventId, data);
                },


                /**
                 * Returns a promise that is resolved once the update EventRsvpAttendee status action has been performed. This action updates an EventRsvpAttendee resource.
                 * @method
                 * @example
                    baasicCalendarRsvpAttendeeService.updateStatus(calendarId, eventId, id, statusId)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                 */
                updateStatus: function (calendarId, eventId, id, statusId) {
                    return baasicApp.calendarModule.calendarRsvpAttendeeClient.updateStatus(calendarId, eventId, id, statusId);
                },


                /**
                 * Returns a promise that is resolved once the update EventRsvpAttendee status action has been performed. This action updates an eventRsvpAttendee resource.
                 * @method
                 * @example
                    baasicCalendarRsvpAttendeeService.updateStatusEmailOrFullName(calendarId, eventId, emailOrFullName, statusId)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                 */
                updateStatusEmailOrFullName: function (calendarId, eventId, emailOrFullName, statusId) {
                    return baasicApp.calendarModule.calendarRsvpAttendeeClient.updateStatusEmailOrFullName(calendarId, eventId, emailOrFullName, statusId);
                },


                /**
                 * Returns a promise that is resolved once the unlink EventRsvpAttendee action has been performed. This action unlinks the specified eventRsvpAttende resource from the specified calendar event resource.
                 * @method
                 * @example
                    baasicCalendarRsvpAttendeeService.unlink(calendarId, eventId, eventRsvpAttendee)
                    .success(funcation (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                */
                unlink: function (calendarId, eventId, data) {
                    return baasicApp.calendarModule.calendarRsvpAttendeeClient.unlink(calendarId, eventId, data);
                },


                /**
                 * Returns a promise that is resolved once the purge EventRsvpAttendees action has been performed. This action deletes all EventRsvpAttendees from the specified Event resource.
                 * @method
                 * @example
                    baasicCalendarRsvpService.purge(calendarId, eventId)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                 */
                purge: function (calendarId, eventId) {
                    return baasicApp.calendarModule.calendarRsvpAttendeeClient.purge(calendarId, eventId);
                },


                batch: {

                    /**
                     * Returns a promise that is resolved once the link EventRsvpAttendees action has been performed. This action links EnventRsvpAttendee resources to the specified calendar event.
                     * @method batch.link
                     * @example 
                        baasicCalendarRsvpAttendeeService.batch.link(calendarId, eventId, [{
                            AttendeeStatus: <calendar-evetn-attendee-status>,
                            AttendeeStatusId '<attendee-status-id>',
                            DateCreated: '<date-created>',
                            DateUpdated: '<date-updated>',
                            Email: '<email>',
                            EventID: '<calendar-event-id>',
                            FullName: '<full-name>',
                            Id: '<id>',
                            InvitationType: <calendar-event-invitation-type>,
                            InvitationTypeId: '<invitation-type-id>',
                            Json: '<json>',
                            Slots: <slots>,
                            SlotsRequested: <slots-requested>,
                            User: <user-profile>,
                            UserID: '<user-id>'
                        }])
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (respose, status, headers, config) {
                            // perform error handling here
                        });
                    */
                    link: function (calendarId, eventId, data) {
                        return baasicApp.calendarModule.calendarRsvpAttendeeBatchClient.link(calendarId, eventId, data);
                    },


                    /**
                     * Returns a promise that is resolved once the update EventRsvpAttendees action has been performed. This action updates EventRsvpAttendee resources.
                     * @method batch.update
                     * @example
                        eventRsvpAttendees are resources previously fetched using get action.
                        baasicCalendarRsvpAttemdeeService.batch.update(calendarId, eventId, eventRsvpAttendees)
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (response, status, headers, config) {
                            // perform error handling here
                        });
                    */
                    update: function (calendarId, eventId, data) {
                        return baasicApp.calendarModule.calendarRsvpAttendeeBatchClient.update(calendarId, eventId, data);
                    },


                    /**
                     * Returns a promise that is resolved once the unlink EventRsvpAttendees action has been performed. This action unlinks EventRsvpAttendee resources from the specified calendar event.
                     * @method batch.unlink
                     * @example 
                        baasicCalendarRsvpAttendeeService.batch.unlink(calendarId, eventId, eventRsvpAttendeeIds)
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (response, status, headers, config) {
                            // perform error handling here
                        });
                    */
                    unlink: function(calendarId, eventId, ids) {
                        return baasicApp.calendarRsvpAttendeeBatchClient.unlink(calendarId, eventId, ids);
                    },

                    /**
                     * Provides direct access to `routeService`.
                     * @method batch.routeService
                     * @example baasicCalendarRsvpAttendeeService.batch.routeService.get(expandObject);
                     **/
                    routeService: baasicApp.calendarRsvpAttendeeBatchClient.routeDefinition
                },


                /**
                 * Provides direct access to `routeService`.
                 * @method
                 * @example baasicCalendarRsvpAttendeeService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.calendarRsvpAttendeeClient.routeDefinition
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