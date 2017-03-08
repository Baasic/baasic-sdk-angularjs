/* globals module */
/**
 * @module baasicMeteringService
 * @description Baasic Metering Service provides an easy way to consume Baasic Metering REST API end-points. In order to obtain a needed routes `baasicMeteringService` uses `baasicMeteringRouteService`.
 */
(function (angular, module, undefined) {
  'use strict';
  module.service('baasicMeteringService', ['baasicApp',
    function (baasicApps) {
      var baasicApp = baasicApps.get();
      return {
        /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of metering resources matching the given criteria.
                 * @method        
                 * @example 
baasicMeteringService.find({
  pageNumber : 1,
  pageSize : 10,
  orderBy : '<field>',
  orderDirection : '<asc|desc>',
  categories: 'Storage,Requests,Bandwidth'
})
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                 **/
        find: function (options) {
          return baasicApp.metering.find(options);
        },
        /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the metering resource.
                * @method        
                * @example 
baasicMeteringService.get()
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        get: function (id, options) {
          return baasicApp.metering.get(id, options);
        },
        /**
                 * Returns a promise that is resolved once the create metering action has been performed; this action creates a new metering resource.
                 * @method        
                 * @example 
baasicMeteringService.create({
  category : '<category-name>',
  name : '<sub-category-name>',
  value: '<value>' 
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/
        create: function (data) {
          return baasicApp.metering.create(data);
        },
        /**
                 * Returns a promise that is resolved once the update metering action has been performed; this action updates a metering resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicMeteringRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(meteringData);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// meteringData is a resource previously fetched using get action.
meteringData.value = '<some-new-value>';
baasicMeteringService.update(meteringData)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/
        update: function (data) {
          return baasicApp.metering.update(data);
        },
        /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a metering resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicMeteringRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(meteringData);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// meteringData is a resource previously fetched using get action.				 
baasicMeteringService.remove(meteringData)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
        remove: function (data) {
          return baasicApp.metering.remove(data);
        },
        /**
                 * Returns a promise that is resolved once the purge action has been performed. This action will remove all metering resources from the system if successfully completed. 
                 * @method        
                 * @example 			 
baasicMeteringService.purge()
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
        purge: function () {
          return baasicApp.metering.purge();
        },
        /**
         * Provides direct access to `routeService`.
         * @method        
         * @example baasicMeteringService.routeService.get.expand(expandObject);
         **/
        routeService: baasicApp.metering.routeDefinition,
        batch: {
          /**
                  * Returns a promise that is resolved once the create data action has been performed; this action creates new data resources.
                  * @method batch.create       
                  * @example 
 baasicMeteringService.batch.create([{
    applicationId : '<applicationId>',
    category : '<category>',
    name: '<name>',
    value: '<value>' 
  }])
  .success(function (data) {
    // perform success action here
  })
  .error(function (response, status, headers, config) {
    // perform error handling here
  });
                  **/
          create: function (data) {
            return baasicApp.metering.batch.create(data);
          },
          /**
                  * Returns a promise that is resolved once the update data action has been performed; this action updates specified data resources.
                  * @method batch.update       
                  * @example 
  baasicMeteringService.batch.update(companies)
  .success(function (data) {
    // perform success action here
  })
  .error(function (response, status, headers, config) {
    // perform error handling here
  });
                  **/
          update: function (data) {
            return baasicApp.metering.batch.update(data);
          },
          /**
                  * Returns a promise that is resolved once the remove action has been performed. This action will remove data resources from the system if successfully completed. 
                  * @method batch.remove       
                  * @example 			 
  baasicMeteringService.batch.remove(companyIds)
  .success(function (data) {
    // perform success action here
  })
  .error(function (response, status, headers, config) {
    // perform error handling here
  });		
                  **/
          remove: function (ids) {
            return baasicApp.metering.batch.remove(ids);
          }
        },
        statistics: {
          /**
                   * Returns a promise that is resolved once the find action has been performed. Success response returns a list of metering resources matching the given criteria.
                   * @method        
                   * @example 
  baasicMeteringService.statistics.find({
    pageNumber : 1,
    pageSize : 10,
    orderBy : '<field>',
    orderDirection : '<asc|desc>',
    category: 'Requests',
    rateBy : '<minute,hour,day,week,month,year>',
    from: '2 days ago',
    to: 'now'
  })
  .success(function (collection) {
    // perform success action here
  })
  .error(function (response, status, headers, config) {
    // perform error handling here
  });    
                  **/
          find: function (options) {
            return baasicApp.metering.statistics.find(options);
          }
        },
        acl: {
          /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns a list of ACL policies established for the specified metering resource.
                    * @method acl.get       
                    * @example 
baasicMeteringService.acl.get({id: '<id>'})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/
          get: function (options) {
            return baasicApp.metering.acl.get(options);
          },
          /**
                    * Returns a promise that is resolved once the update acl action has been performed, this action creates new ACL policy for the specified metering resource.
                    * @method acl.update      
                    * @example 
var options = {id : '<id>'};
var aclObj =  {
 actionId: '<action-id'>,
 roleId: '<roleId>',
 userId: '<userId>'
};
options[baasicConstants.modelPropertyName] = aclObj;
baasicMeteringService.acl.update(options)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				    **/
          update: function (options) {
            return baasicApp.metering.acl.update(options);
          },
          /**
                    * Returns a promise that is resolved once the removeByUser action has been performed. This action deletes ACL policy assigned to the specified user and metering resource.
                    * @method acl.deleteByUser      
                    * @example 
baasicMeteringService.acl.removeByUser('<id>', '<access-action>', '<username>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				    **/
          removeByUser: function (id, action, user, data) {
            return baasicApp.metering.acl.removeByUser(id, action, user, data);
          },
          /**
                    * Returns a promise that is resolved once the removeByRole action has been performed. This action deletes ACL policy assigned to the specified role and metering resource.
                    * @method acl.deleteByRole      
                    * @example 
baasicMeteringService.acl.removeByRole('<id>', '<access-action>', '<role-name>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				    **/
          removeByRole: function (id, action, role, data) {
            return baasicApp.metering.acl.removeByRole(id, action, role, data);
          }
        }
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