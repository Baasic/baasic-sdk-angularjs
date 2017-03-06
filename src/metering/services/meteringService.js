﻿/* globals module */
/**
 * @module baasicMeteringService
 * @description Baasic Metering Service provides an easy way to consume Baasic Metering REST API end-points. In order to obtain a needed routes `baasicMeteringService` uses `baasicMeteringRouteService`.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicMeteringService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicMeteringRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, routeService) {
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
                    return baasicApiHttp.get(routeService.find.expand(baasicApiService.findParams(options)));
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
                    return baasicApiHttp.get(routeService.get.expand(baasicApiService.getParams(id, options)));
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
                    return baasicApiHttp.post(routeService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                purge: function(){
                    return baasicApiHttp.delete(routeService.purge.expand({})); 
                },    
                /**
                * Provides direct access to `routeService`.
                * @method        
                * @example baasicMeteringService.routeService.get.expand(expandObject);
                **/  							    
				routeService: routeService,
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
                      return baasicApiHttp.post(routeService.batch.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                      return baasicApiHttp.post(routeService.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
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
                  remove: function(ids) {
                    return baasicApiHttp({
                        url: routeService.batch.remove.expand(),
                        method: 'DELETE',
                        data: ids
                    });                         
                  }
                },             
                statistics:{
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
                      return baasicApiHttp.get(routeService.statistics.find.expand(baasicApiService.findParams(options)));
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
                        var params = angular.copy(options);
                        return baasicApiHttp.get(routeService.acl.get.expand(params));
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
                        var params = angular.copy(options);
                        return baasicApiHttp.put(routeService.acl.get.expand(params), params[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.removeParams(data);
                        params.id = id;
                        params.user = user;
                        params.accessAction = action;
                        return baasicApiHttp.delete(routeService.acl.deleteByUser.expand(params));
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
                        var params = baasicApiService.removeParams(data);
                        params.id = id;
                        params.role = role;
                        params.accessAction = action;
                        return baasicApiHttp.delete(routeService.acl.deleteByRole.expand(params));
                    }
                }
            };
        }]);
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
