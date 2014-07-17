(function (angular, module, undefined) {
    "use strict";
    module.service("baasicPermissionsService", ["$q", "baasicApiHttp", "baasicPermissionsRouteService", "notificationService", "baasicAuthorizationService",
        function permissionsService($q, baasicApiHttp, permissionsRouteService, notificationService, authService) {
            function isEmpty(data) {
                return _.isUndefined(data) || _.isNull(data) || data === '';
            }

            function getRoles(params) {
                var apiParams = {
                    page: params.pageNumber,
                    rpp: params.pageSize,
                    sort: params.orderBy ? params.orderBy + '|' + params.orderDirection : null,
                    searchQuery: params.search
                };
                return baasicApiHttp.get(permissionsRouteService.getRoles.expand(apiParams));
            }

            function getUsers(params) {
                var apiParams = {
                    page: params.pageNumber,
                    rpp: params.pageSize,
                    sort: params.orderBy ? params.orderBy + '|' + params.orderDirection : null,
                    searchQuery: params.search
                };
                return baasicApiHttp.get(permissionsRouteService.getUsers.expand(apiParams));
            }

            function firstCharToLowerCase(text) {
                return text.replace(/^./, function (char) {
                    return char.toLowerCase();
                });
            }

            return {
                find: function (section, params) {
                    var apiParams = {
                        sort: params.orderBy ? params.orderBy + '|' + params.orderDirection : null,
                        searchQuery: params.search
                    };

                    return baasicApiHttp.get(permissionsRouteService.find(section).expand(apiParams));
                },
                get: function (section, id) {
                    return baasicApiHttp.get(permissionsRouteService.get(section).expand({ id: id }));
                },
                getActions: function (params) {
                    var apiParams = {
                        sort: params.orderBy ? params.orderBy + '|' + params.orderDirection : null,
                        searchQuery: params.search
                    };
                    return baasicApiHttp.get(permissionsRouteService.getActions.expand(apiParams));
                },
                getPermissionSubjects: function (params) {
                    var membershipCollection = [];

                    var userTask = getUsers(params)
                        .success(function (collection) {
                            _.each(collection.item, function (item) {
                                var membershipItem = {
                                    name: item.username,
                                    role: ''
                                };
                                _.extend(membershipItem, item);
                                membershipCollection.push(membershipItem);
                            });
                        });

                    var roleTask = getRoles(params)
                            .success(function (collection) {
                                _.each(collection.item, function (item) {
                                    var membershipItem = {
                                        name: item.name,
                                        roleName: item.name,
                                        username: ''
                                    };
                                    _.extend(membershipItem, item);
                                    membershipCollection.push(membershipItem);
                                });
                            });

                    return $q.all([userTask, roleTask]).then(function () {
                        return _.sortBy(membershipCollection, function (item) {
                            return item.name;
                        });
                    });
                },
                create: function (permission) {
                    return baasicApiHttp.post(permissionsRouteService.create, permission);
                },
                remove: function (permission) {
                    var action = permission.actions[0];
                    var operation = !isEmpty(permission.role) ? 'Role' : 'User';
                    return baasicApiHttp.delete(permission.links('delete' + action.abrv + operation).href);
                },
                preparePermissions: function (queryUtility, actionCollection, permissionCollection, selectedPermissions) {
                    var that = this;
                    //Apply search parameters to the selected items & create new mixed collection
                    var newPermissionCollection = _.clone(_.filter(selectedPermissions, function (item) {
                        if (!isEmpty(queryUtility.pagingInfo.search)) {
                            return item.name.indexOf(queryUtility.pagingInfo.search) > -1;
                        }
                        return true;
                    }));
                    _.each(permissionCollection, function (permission) {
                        _.each(actionCollection, function (lookupAction) {
                            //Add missing actions to the permission
                            var items = _.filter(permission.actions, function (action) {
                                return action.abrv === lookupAction.abrv;
                            });
                            if (items.length === 0) {
                                var newAction = {
                                    checked: false
                                };
                                _.extend(newAction, lookupAction);
                                permission.actions.push(newAction);
                            } else {
                                _.each(items, function (item) {
                                    item.checked = true;
                                });
                            }
                        });
                        permission.actions = _.sortBy(permission.actions, function (action) {
                            return action.name;
                        });
                        //Push existing permission to mixed collection and fix the HAL links for selected permissions
                        var newPermission = that.findPermission(permission, newPermissionCollection);
                        if (_.isUndefined(newPermission)) {
                            newPermissionCollection.push(permission);
                        } else {
                            _.extend(newPermission, permission);
                        }
                    });
                    return newPermissionCollection;
                },
                createPermission: function (section, actionCollection, membershipItem) {
                    var permission = {
                        dirty: true,
                        role: membershipItem.roleName,
                        username: membershipItem.userName,
                        section: section,
                        actions: []
                    };
                    _.each(actionCollection, function (lookupAction) {
                        var newAction = {
                            checked: false
                        };
                        _.extend(newAction, lookupAction);
                        permission.actions.push(newAction);
                    });
                    return permission;
                },
                findPermission: function (permission, permissionCollection) {
                    return _.find(permissionCollection, function (item) {
                        return item.section === permission.section &&
                            ((!isEmpty(item.role) && !isEmpty(permission.role) && item.role === permission.role) ||
                            (!isEmpty(item.username) && !isEmpty(permission.username) && item.username === permission.username));
                    });
                },
                exists: function (permission, permissionCollection) {
                    return !_.isUndefined(this.findPermission(permission, permissionCollection));
                },
                togglePermission: function (permission, action) {
                    var removingLabel = _.template("Removing <%= permission.section %> <%= action.name %> permission for <%= permission.username %><%= permission.role %>");
                    var removingErrorLabel = _.template("Unable to remove <%= permission.section %> <%= action.name %> permission for <%= permission.username %><%= permission.role %>");
                    var removedLabel = _.template("Removed <%= permission.section %> <%= action.name %> permission for <%= permission.username %><%= permission.role %>");
                    var addingLabel = _.template("Adding <%= permission.section %> <%= action.name %> permission for <%= permission.username %><%= permission.role %>");
                    var addingErrorLabel = _.template("Unable to add <%= permission.section %> <%= action.name %> permission for <%= permission.username %><%= permission.role %>");
                    var addedLabel = _.template("Added <%= permission.section %> <%= action.name %> permission for <%= permission.username %><%= permission.role %>");
                    var notification;
                    if (action.checked) {
                        notification = notificationService.create(removingLabel({ action: action, permission: permission }));
                    } else {
                        notification = notificationService.create(addingLabel({ action: action, permission: permission }));
                    }
                    var requestPermission = {};
                    _.extend(requestPermission, permission);
                    requestPermission.actions = [action];

                    var operation;
                    if (action.checked) {
                        operation = this.remove;
                    } else {
                        operation = this.create;
                    }

                    return operation(requestPermission)
                        .success(function () {
                            notification.status = notificationService.statusTypes.success;
                            notification.message = !action.checked ? removedLabel({ action: action, permission: permission }) : addedLabel({ action: action, permission: permission });
                            notificationService.update(notification);
                        })
                        .error(function (data) {
                            notification.message = !action.checked ? removingErrorLabel({ action: action, permission: permission }) : addingErrorLabel({ action: action, permission: permission });
                            notificationService.formatErrorNotification(notification, data);
                            notificationService.update(notification);
                        });
                },
                getModulePermissions: function (section) {
                    var permission = {
                        update: authService.hasPermission(firstCharToLowerCase(section) + ".update"),
                        create: authService.hasPermission(firstCharToLowerCase(section) + ".create"),
                        remove: authService.hasPermission(firstCharToLowerCase(section) + ".delete"),
                        read: authService.hasPermission(firstCharToLowerCase(section) + ".read")
                    };
                    return permission;
                }
            };
        }]);
}(angular, module));