/* globals module */
/**
 * @module baasicSkillService
 * @description Baasic Skill Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Skill Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
 */
(function (angular, module, undefined) {
  'use strict';
  module.service('baasicSkillService', ['baasicApp',
    function (baasicApps) {
      var baasicApp = baasicApps.get();
      return {
        /**
                 * Returns a promise that is resolved once the create skill action has been performed; this action creates a new skill resource.
                 * @method        
                 * @example 
baasicSkillService.create({
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
          return baasicApp.userProfile.skill.create(data);
        },
        /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of skill resources matching the given criteria.
                 * @method        
                 * @example 
baasicSkillService.find({
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
          return baasicApp.userProfile.skill.find(options);
        },
        /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the skill resource.
                * @method        
                * @example 
baasicSkillService.get()
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        get: function (id, options) {
          return baasicApp.userProfile.skill.get(id, options);
        },
        /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a skill resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicSkillRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(skill);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// skill is a resource previously fetched using get action.				 
baasicSkillService.remove(skill)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				        **/
        remove: function (data) {
          return baasicApp.userProfile.skill.remove(data);
        },
        /**
                 * Returns a promise that is resolved once the update skill action has been performed; this action updates a skill resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicSkillRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(skill);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// skill is a resource previously fetched using get action.
skill.description = '<description>';
baasicSkillService.update(skill)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				        **/
        update: function (data) {
          return baasicApp.userProfile.skill.update(data);
        },
        batch: {
          /**
                  * Returns a promise that is resolved once the create skill action has been performed; this action creates new skill resources.
                  * @method batch.create       
                  * @example 
  baasicSkillService.batch.create([{
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
            return baasicApp.userProfile.skill.batch.create(data);
          },
          /**
                  * Returns a promise that is resolved once the update skill action has been performed; this action updates specified skill resources.
                  * @method batch.update       
                  * @example 
  baasicSkillService.batch.update(companies)
  .success(function (data) {
    // perform success action here
  })
  .error(function (response, status, headers, config) {
    // perform error handling here
  });
                  **/
          update: function (data) {
            return baasicApp.userProfile.skill.batch.update(data);
          },
          /**
                  * Returns a promise that is resolved once the remove action has been performed. This action will remove skill resources from the system if successfully completed. 
                  * @method batch.remove       
                  * @example 			 
  baasicSkillService.batch.remove(skillIds)
  .success(function (data) {
    // perform success action here
  })
  .error(function (response, status, headers, config) {
    // perform error handling here
  });		
                  **/
          remove: function (ids) {
            return baasicApp.userProfile.skill.batch.remove(ids);
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