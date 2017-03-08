/**
 * @module baasicValueSetService
 * @description Baasic Value Set Service provides an easy way to consume Baasic Value Set REST end-points. 
 */
(function (angular, module, undefined) {
  "use strict";
  module.service("baasicValueSetService", ["baasicApp",
    function (baasicApps) {
      var baasicApp = baasicApps.get();
      return {
        /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of value set resources matching given criteria.
                 * @method        
                 * @example 
baasicValueSetService.find({
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
          return baasicApp.valueSet.get(options);
        },
        /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified value set resource.
                 * @method        
                 * @example 
baasicValueSetService.get('<value-set-name>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/
        get: function (setName, options) {
          return baasicApp.valueSet.get(setName, options);
        },
        /**
                 * Returns a promise that is resolved once the create value set action has been performed; this action creates a new value set resource.
                 * @method        
                 * @example 
baasicValueSetService.create({
   name: '<value-set-name>',
   description: '<description>',
   values: [{value: '<value>'}]
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/
        create: function (data) {
          return baasicApp.valueSet.post(data);
        },
        /**
                 * Returns a promise that is resolved once the update value set action has been performed; this action updates a value set resource. 
                 * @method        
                 * @example 
// valueSet is a resource previously fetched using get action.
valueSet.name = '<new-name>';
baasicValueSetService.update(valueSet)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/
        update: function (data) {
          return baasicApp.valueSet.put(data);
        },
        /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will delete a value set resource if the action is completed successfully. 
                 * @method        
                 * @example 
// valueSet is a resource previously fetched using get action.				 
baasicValueSetService.remove(valueSet)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
        remove: function (data) {
          return baasicApp.valueSet.delete(data);
        },
        /**
         * Provides direct access to route defintion.
         * @method        
         * @example baasicValueSetService.routeService.get('<id>', expandObject);
         **/
        routeService: baasicApp.valueSet.routeDefinition,
        items: {
          /**
                    * Returns a promise that is resolved once the find action has been performed. Success response returns a list of value set item resources matching given criteria.
                    * @method items.find       
                    * @example 
baasicValueSetService.items.find({
  setName: '<value-set-name>',
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
            return baasicApp.valueSet.items.get(options);
          },
          /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns the specified value set item resource.
                    * @method items.get       
                    * @example 
baasicValueSetService.items.get('<value-set-name>', '<set-item-id>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/
          get: function (setName, id, options) {
            return baasicApp.valueSet.items.get(setName, id, options);
          },
          /**
                    * Returns a promise that is resolved once the create value set item action has been performed; this action creates a new value set item resource.
                    * @method items.create       
                    * @example 
baasicValueSetService.items.create({
   setId: '<value-set-id>',
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
            return baasicApp.valueSet.items.post(data);
          },
          /**
                    * Returns a promise that is resolved once the update value set item action has been performed; this action updates a value set item resource. 
                    * @method items.update       
                    * @example 
// valueSetItem is a resource previously fetched using get action.
valueSetItem.value = '<new-value>';
baasicValueSetService.items.update(valueSetItem)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				    **/
          update: function (data) {
            return baasicApp.valueSet.items.put(data);
          },
          /**
                    * Returns a promise that is resolved once the remove action has been performed. This action will delete a value set item if the action is completed successfully. 
                    * @method items.remove       
                    * @example 
// valueSetItem is a resource previously fetched using get action.				 
baasicValueSetService.items.remove(valueSetItem)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				    **/
          remove: function (data) {
            return baasicApp.valueSet.items.delete(data);
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