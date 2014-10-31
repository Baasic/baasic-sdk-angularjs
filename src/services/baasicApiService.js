(function (angular, module, undefined) {
    "use strict";
    module.service("baasicApiService", ["baasicConstants",
        function (baasicConstants) {
            function FindParams(data) {
				if (angular.isObject(data)) {
                    angular.extend(this, data);					
					if (data.hasOwnProperty('orderBy') && data.hasOwnProperty('orderDirection')) {
						this.sort = data.orderBy ? data.orderBy + '|' + data.orderDirection : null;
					}
					if (data.hasOwnProperty('search')) {
						this.searchQuery = data.search;
					}
					if (data.hasOwnProperty('pageNumber')) {
						this.page = data.pageNumber;
					}
					if (data.hasOwnProperty('pageSize')) {
						this.rpp = data.pageSize;
					}
                } else {
					this.searchQuery = data;
				}
            }

            function KeyParams(data, propName) {
                if (angular.isObject(data)) {
                    angular.extend(this, data);
                } else {
					if (propName !== undefined) {
						this[propName] = data;
					} else {
						this[baasicConstants.keyPropertyName] = data;
					}
                } 
            }

            function ModelParams(data) {
                if (data.hasOwnProperty(baasicConstants.modelPropertyName)) {
                    angular.extend(this, data);
                } else {
                    this[baasicConstants.modelPropertyName] = data;
                }
            }

            return {
                findParams: function (data) {
                    return new FindParams(data);
                },
                getParams: function (data, propName) {
                    return new KeyParams(data, propName);
                },
                createParams: function (data) {
                    return new ModelParams(data);
                },
                updateParams: function (data) {
                    return new ModelParams(data);
                },
                removeParams: function (data) {
                    return new ModelParams(data);
                }
            };
        }]);
}(angular, module));