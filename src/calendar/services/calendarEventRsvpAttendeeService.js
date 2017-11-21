/* globals module */
/**
 * @module baasicCalendarEventRsvpAttendeeService
 * @description Baasic Calendar Event Rsvp Attendee Service provides an easy way to consume Baasic Calendar REST API end-points. In order to obtain a needed routes `baasicCalendarEventRsvpAttendeeService` uses `baasicCalendarEventRsvpAttendeeRouteService`.
 */
(function (angular, module) {
    'use strict';
    module.service('baasicCalendarEventRsvpAttendeeService', ['baasicApp',
        function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {

                /**
                 * Returns a promise that is resolved once the find action has been completed. Success response returns a list of EventRsvpAttendee resources matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarEventRsvpAttendeeService.find({
                        pageNumber: 1,
                        pageSize: 10,
                        orderBy: '<field>',
                        orderDirection: '<asc|desc>',
                        search: '<search-phrase>',
                        calendarIds: '<calendar-identifiers>',
                        calendarNames: '<calendar-names>',
                        eventIds: '<event-ids>',
                        invitationTypeIds: '<event-invitation-type-identifierss>',
                        attendeeStatusIds: '<event-attendee-status-identifierss>',
                        userIds: '<user-identifierss>',
                        slotDifference: '<true|false>',
                        emails: '<e-mails>',
                        ids: '<event-rsvp-attendee-identifiers>',
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
                    return baasicApp.calendarModule.attendee.find(options);
                },


                /**
                 * Returns a promise that is resolved once the get action has been completed. Success response returns an EventRsvpAttendee resource matching the given criteria.
                 * @method
                 * @example
                    baasicCalendarEventRsvpAttendeeService.get('<event-rsvp-attendee-id>')
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function(response, status, headers, config) {
                        // perform error handling here 
                    });             
                 */
                get: function (id, options) {
                    return baasicApp.calendarModule.attendee.get(id, options);
                },


                /**
                 * Returns a promise that is resolved once the create EventRsvpAttendee action has been performed. This action creates a new EventRsvpAttendee resource.
                 * @method
                 * @example 
                    baasicCalendarEventRsvpAttendeeService.create({
                        AttendeeStatus: <calendar-event-attendee-status>,
                        AttendeeStatusId '<event-attendee-status-id>',
                        DateCreated: '<date-created>',
                        DateUpdated: '<date-updated>',
                        Email: '<email>',
                        EventId: '<calendar-event-id>',
                        FullName: '<full-name>',
                        Id: '<id>',
                        InvitationType: <calendar-event-invitation-type>,
                        InvitationTypeId: '<event-invitation-type-id>',
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
                create: function (data) {
                    return baasicApp.calendarModule.attendee.create(data);
                },


                /**
                 * Returns a promise that is resolved once the update EventRsvpAttendee action has been performed. This action updates an EventRsvpAttendee resource.
                 * @method
                 * @example
                    eventRsvpAttendee is a resource previously fetched using get action.
                    eventRsvpAttendee.maxSlots = '<max-slots>';
                    baasicCalendarEventRsvpAttendeeService.update(eventRsvpAttendee)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                 */
                update: function (data) {
                    return baasicApp.calendarModule.attendee.update(data);
                },


                /**
                 * Returns a promise that is resolved once the update EventRsvpAttendee status action has been performed. This action updates an EventRsvpAttendee resource.
                 * @method
                 * @example
                    baasicCalendarEventRsvpAttendeeService.updateStatus(id, statusId)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });                
                 */
                updateStatus: function (id, statusId) {
                    return baasicApp.calendarModule.attendee.updateStatus(id, statusId);
                },


                /**
                 * Returns a promise that is resolved once the update EventRsvpAttendee status Email or FullName action has been performed. This action updates an EventRsvpAttendee resource
                 * @method
                 * @example
                    baasicCalendarEventRsvpAttendeeService.updateStatusEmailOrFullName(id, email, statusId)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    }); 
                 */
                updateStatusEmailOrFullName: function (id, emailOrFullName, statusId) {
                    return baasicApp.calendarModule.attendee.updateStatusEmailOrFullName(id, emailOrFullName, statusId);
                },


                /**
                 * Returns a promise that is resolved once the remove EventRsvpAttendee action has been performed. This action removes an EventRsvpAttendee resource.
                 * @method
                 * @example
                    eventRsvpAttendee is a resource previously fetched using get action.
                    baasicCalendarEventRsvpAttendeeService.remove(eventRsvpAttendee)
                    .success(funcation (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                 */
                remove: function (data) {
                    return baasicApp.calendarModule.attendee.remove(data);
                },


                /**
                 * Returns a promise that is resolved once the purge action has been performed. This action removes all EventRsvpAttendee resources from the specified event resource.
                 * @method
                 * @example
                    baasicCalendarEventRsvpAttendeeService.purge(event)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        // perform error handling here
                    });
                 */
                purge: function (data) {
                    return baasicApp.calendarModule.attendee.purge(data);
                },

                /**
                 * Returns a promise that is resolved once the subscribe action has been performed. This action creates CalendarEventAttendee subscriotion to CalendarEvent changes.
                 * @method
                 * @example
                    baasicCalendarEventRsvpAttendeeService.subscribe(attendeeId)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        //perform error handling here
                    });
                 */
                subscribe: function(id) {
                    return baasicApp.calendarModule.attendee.subscribe(id);
                },

                /**
                 * Returns a promise that is resolved once the unsubscribe action has been performed. This action removes CalendarEventAttendee subscriotion to CalendarEvent changes.
                 * @method
                 * @example
                    baasicCalendarEventRsvpAttendeeService.unsubscribe(attendeeId)
                    .success(function (data) {
                        // perform success action here
                    })
                    .error(function (response, status, headers, config) {
                        //perform error handling here
                    });
                 */
                unsubscribe: function(id) {
                    return baasicApp.calendarModule.attendee.unsubscribe(id);
                },

                batch: {

                    /**
                     * Returns a promise that is resolved once the create EventRsvpAttendees action has been performed. This action creates new EventRsvpAttendee resources.
                     * @method batch.create
                     * @example 
                        baasicCalendarEventRsvpAttendeeService.batch.create([{
                            AttendeeStatus: <calendar-event-attendee-status>,
                            AttendeeStatusId '<event-attendee-status-id>',
                            DateCreated: '<date-created>',
                            DateUpdated: '<date-updated>',
                            Email: '<email>',
                            EventId: '<calendar-event-id>',
                            FullName: '<full-name>',
                            Id: '<id>',
                            InvitationType: <calendar-event-invitation-type>,
                            InvitationTypeId: '<event-invitation-type-id>',
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
                    create: function (data) {
                        return baasicApp.calendarModule.attendee.batch.create(data);
                    },


                    /**
                     * Returns a promise that is resolved once the update EventRsvpAttendees action has been performed. This action updates EventRsvpAttendee resources.
                     * @method batch.update
                     * @example
                        eventRsvpAttendees are resources previously fetched using get action.
                        baasicCalendarEventRsvpAttendeeService.batch.update(eventRsvpAttendees)
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (response, status, headers, config) {
                            // perform error handling here
                        });
                     */
                    update: function (data) {
                        return baasicApp.calendarModule.attendee.batch.update(data);
                    },


                    /**
                     * Returns a promise that is resolved once the delete EventRsvpAttendees action has been performed. This action deletes EventRsvpAttendee resources.
                     * @method batch.remove
                     * @example 
                        baasicCalendarEventRsvpAttendeeService.batch.remove(eventRsvpAttendeeIds)
                        .success(function (data) {
                            // perform success action here
                        })
                        .error(function (response, status, headers, config) {
                            // perform error handling here
                        });
                     */
                    remove: function(ids) {
                        return baasicApp.calendarModule.attendee.batch.remove(ids);
                    },

                    /**
                     * Provides direct access to `routeService`.
                     * @method batch.routeService
                     * @example 
                        baasicCalendarEventRsvpAttendeeService.batch.routeService.get(expandObject);
                     */
                    routeService: baasicApp.calendarModule.attendee.batch.routeDefinition
                },

                /**
                 * Provides direct access to `routeService`.
                 * @method
                 * @example baasicCalendarEventRsvpAttendeeService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.calendarModule.attendee.routeDefinition
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