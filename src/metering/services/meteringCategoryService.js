
/* globals module */
/**
 * @module baasicMeteringCategoryService
 * @description Baasic Metering Category Service provides an easy way to consume Baasic Metering REST API end-points. In order to obtain a needed routes `baasicMeteringCategoryService` uses `baasicMeteringCategoryRouteService`.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicMeteringCategoryService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicMeteringCategoryRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, routeService) {
            return {    
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of metering resources matching the given criteria.
                 * @method        
                 * @example 
baasicMeteringCategoryService.find({
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
                    return baasicApiHttp.get(routeService.find.expand(baasicApiService.findParams(options)));
                },
                /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the metering resource.
                * @method        
                * @example 
baasicMeteringCategoryService.get()
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
baasicMeteringCategoryService.create({
  category : '<category-name>',
  unitName : 'Kb',
  unitFactor: 1,
  defaultSamplingRate: '<value>', - Defaults: Minute = 1,Hour = 2,Day = 3,Week = 4,Month = 5,Year = 6
  aggregateFunction: '<value>' - Defaults: None = 0,Count = 1,Avg = 2,Max = 3,Min = 4,Sum = 5
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
                 * Returns a promise that is resolved once the update metering action has been performed; this action updates a metering resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicMeteringCategoryRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(meteringCategory);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// meteringCategory is a resource previously fetched using get action.
meteringCategory.defaultSamplingRate = 'Day';
baasicMeteringCategoryService.update(meteringCategory)
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
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a metering resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicMeteringCategoryRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(meteringCategory);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// meteringCategory is a resource previously fetched using get action.				 
baasicMeteringCategoryService.remove(meteringCategory)
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
                * Provides direct access to `routeService`.
                * @method        
                * @example baasicMeteringCategoryService.routeService.get.expand(expandObject);
                **/  							    
				routeService: routeService,
                batch: {
                  /**
                  * Returns a promise that is resolved once the create category action has been performed; this action creates new category resources.
                  * @method batch.create       
                  * @example 
 baasicMeteringCategoryService.batch.create([{
    aggregateFunction : '<aggregateFunction>',
    category : '<name>',
    defaultSamplingRate: '<defaultSamplingRate>',
    slug: '<slug>',
    unitFactor: '<unitFactor>',
    unitName: '<unitName>'
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
                  * Returns a promise that is resolved once the update category action has been performed; this action updates specified category resources.
                  * @method batch.update       
                  * @example 
  baasicMeteringCategoryService.batch.update(companies)
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
                  * Returns a promise that is resolved once the remove action has been performed. This action will remove category resources from the system if successfully completed. 
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
                  remove: function(ids) {
                    return baasicApiHttp({
                        url: routeService.batch.remove.expand(),
                        method: 'DELETE',
                        data: ids
                    });                         
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
