/* globals module */
/**
 * @module baasicCompanyService
 * @description Baasic Company Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Company Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
 */
(function (angular, module, undefined) {
  'use strict';
  module.service('baasicCompanyService', ['baasicApp',
    function (baasicApps) {
      var baasicApp = baasicApps.get();
      return {
        /**
                 * Returns a promise that is resolved once the create company action has been performed; this action creates a new company resource.
                 * @method        
                 * @example 
baasicCompanyService.create({
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
          return baasicApp.userProfileModule.company.create(data);
        },
        /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of company resources matching the given criteria.
                 * @method        
                 * @example 
baasicCompanyService.find({
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
          return baasicApp.userProfileModule.company.find(options);
        },
        /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the company resource.
                * @method        
                * @example 
baasicCompanyService.get()
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        get: function (id, options) {
          return baasicApp.userProfileModule.company.get(id, options);
        },
        /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a company resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCompanyRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(company);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// company is a resource previously fetched using get action.				 
baasicCompanyService.remove(company)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				        **/
        remove: function (data) {
          return baasicApp.userProfileModule.company.remove(data);
        },
        /**
                 * Returns a promise that is resolved once the update company action has been performed; this action updates a company resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicCompanyRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(company);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// company is a resource previously fetched using get action.
company.description = '<description>';
baasicCompanyService.update(company)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				        **/
        update: function (data) {
          return baasicApp.userProfileModule.company.update(data);
        },
        batch: {
          /**
                  * Returns a promise that is resolved once the create company action has been performed; this action creates new company resources.
                  * @method batch.create       
                  * @example 
 baasicCompanyService.batch.create([{
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
            return baasicApp.userProfileModule.company.batch.create(data);
          },
          /**
                  * Returns a promise that is resolved once the update company action has been performed; this action updates specified company resources.
                  * @method batch.update       
                  * @example 
  baasicCompanyService.batch.update(companies)
  .success(function (data) {
    // perform success action here
  })
  .error(function (response, status, headers, config) {
    // perform error handling here
  });
                  **/
          update: function (data) {
            return baasicApp.userProfileModule.company.batch.update(data);
          },
          /**
                  * Returns a promise that is resolved once the remove action has been performed. This action will remove company resources from the system if successfully completed. 
                  * @method batch.remove       
                  * @example 			 
  baasicCompanyService.batch.remove(companyIds)
  .success(function (data) {
    // perform success action here
  })
  .error(function (response, status, headers, config) {
    // perform error handling here
  });		
                  **/
          remove: function (ids) {
            return baasicApp.userProfileModule.company.batch.remove(ids);
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