/* globals module */
/**
 * @module baasicOrganizationService
 * @description Baasic Organization Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Organization Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
 */
(function (angular, module, undefined) {
  'use strict';
  module.service('baasicOrganizationService', ['baasicApp',
    function (baasicApps) {
      var baasicApp = baasicApps.get();
      return {
        /**
                 * Returns a promise that is resolved once the create organization action has been performed; this action creates a new organization resource.
                 * @method        
                 * @example 
baasicOrganizationService.create({
  description : '<description>',
  name : '<name>',
  slug: '<slug>' 
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        create: function (data) {
          return baasicApp.userProfile.organization.create(data);
        },
        /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of organization resources matching the given criteria.
                 * @method        
                 * @example 
baasicOrganizationService.find({
  pageNumber : 1,
  pageSize : 10,
  orderBy : '<field>',
  orderDirection : '<asc|desc>',
  search : '<search-phrase>'
})
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                **/
        find: function (options) {
          return baasicApp.userProfile.organization.find(options);
        },
        /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the organization resource.
                * @method        
                * @example 
baasicOrganizationService.get()
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        get: function (id, options) {
          return baasicApp.userProfile.organization.get(id, options);
        },
        /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove an organization resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicOrganizationRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(organization);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// organization is a resource previously fetched using get action.				 
baasicOrganizationService.remove(organization)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				        **/
        remove: function (data) {
          return baasicApp.userProfile.organization.remove(params[baasicConstants.modelPropertyName].links('delete').href);
        },
        /**
                 * Returns a promise that is resolved once the update organization action has been performed; this action updates an organization resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicOrganizationRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(organization);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// organization is a resource previously fetched using get action.
organization.description = '<description>';
baasicOrganizationService.update(organization)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				        **/
        update: function (data) {
          return baasicApp.userProfile.organization.update(data);
        },
        batch: {
          /**
                  * Returns a promise that is resolved once the create organization action has been performed; this action creates new organization resources.
                  * @method batch.create       
                  * @example 
  baasicOrganizationService.batch.create([{
    description : '<description>',
    name : '<name>',
    slug: '<slug>' 
  }])
  .success(function (data) {
    // perform success action here
  })
  .error(function (response, status, headers, config) {
    // perform error handling here
  });
                  **/
          create: function (data) {
            return baasicApp.userProfile.organization.batch.create(data);
          },
          /**
                  * Returns a promise that is resolved once the update organization action has been performed; this action updates specified organization resources.
                  * @method batch.update       
                  * @example 
  baasicOrganizationService.batch.update(companies)
  .success(function (data) {
    // perform success action here
  })
  .error(function (response, status, headers, config) {
    // perform error handling here
  });
                  **/
          update: function (data) {
            return baasicApp.userProfile.organization.batch.update(data);
          },
          /**
                  * Returns a promise that is resolved once the remove action has been performed. This action will remove organization resources from the system if successfully completed. 
                  * @method batch.remove       
                  * @example 			 
  baasicOrganizationService.batch.remove(organizationIds)
  .success(function (data) {
    // perform success action here
  })
  .error(function (response, status, headers, config) {
    // perform error handling here
  });		
                  **/
          remove: function (ids) {
            return baasicApp.userProfile.organization.batch.remove(ids);
          }
        }
      };
    }
  ]);
}(angular, module));

/**
 * @overview 
 ***Notes:**
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/