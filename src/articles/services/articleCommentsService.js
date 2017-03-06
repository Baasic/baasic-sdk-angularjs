/* globals module */
/**
 * @module baasicArticleCommentsService
 * @description Baasic Article Comments Service provides an easy way to consume Baasic Article Comments REST API end-points. `baasicArticleCommentsService` functions enable performing standard CRUD operations directly on article comment resources, whereas the `baasicArticleService` functions allow management between article and article comments. In order to obtain needed routes `baasicArticleCommentsService` uses `baasicArticleCommentsRouteService`.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleCommentsService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicArticleCommentsRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, articleCommentsRouteService) {
            var commentStatuses = {
                approved: 1,
                spam: 2,
                reported: 4,
                flagged: 8,
                unapproved: 16 
            };            
            return {
                /**
                * Contains a reference to valid list of article comment states. It returns an object containing all article comment states.
                * @method      
                * @example baasicArticleCommentsService.statuses.approved;
                **/                     
                statuses: commentStatuses,
                /**
                * Returns a promise that is resolved once the approve article comment action has been performed. This action sets the state of an article comment to "approved". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleComment);
var uri = params['model'].links('comment-approve').href;
```
                    * @method       
                    * @example 	
// articleComment is a resource previously fetched using get action.				 
baasicArticleCommentsService.approve(articleComment, commentOptions)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/		                    
                approve: function(data, options) {
                    var params = baasicApiService.updateParams(data);
                    var commentOptions = baasicApiService.updateParams(options);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-approve').href, commentOptions[baasicConstants.modelPropertyName]);                        
                },
                /**
                * Returns a promise that is resolved once the unapprove article comment action has been performed. This action sets the state of an article comment to "unapproved". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleComment);
var uri = params['model'].links('comment-unapprove').href;
```
                    * @method       
                    * @example 	
// articleComment is a resource previously fetched using get action.				 
baasicArticleCommentsService.unapprove(articleComment)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/		                    
                unapprove: function(data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unapprove').href, params[baasicConstants.modelPropertyName]);                        
                },                
                /**
                * Returns a promise that is resolved once the create article comment action has been performed; this action creates a new comment for an article.
                * @method      
                * @example 
baasicArticleCommentsService.create({
articleId : '<article-id>',
comment : <comment>,
userId : '<user-id>'
})
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                **/ 
                create: function (data) {
                    return baasicApiHttp.post(articleCommentsRouteService.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },                                        
                /**
                * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article comment resources matching the given criteria.
                * @method
                * @example 
baasicArticleCommentsService.find({
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
                    return baasicApiHttp.get(articleCommentsRouteService.find.expand(baasicApiService.findParams(options)));
                },                    
                /**
                * Returns a promise that is resolved once the flag article comment action has been performed. This action sets the state of an article comment to "flagged". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleComment);
var uri = params['model'].links('comment-flag').href;
```
                    * @method       
                    * @example 	
// articleComment is a resource previously fetched using get action.				 
baasicArticleCommentsService.flag(articleComment)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/		                    
                flag: function(data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-flag').href, params[baasicConstants.modelPropertyName]);                        
                }, 
                /**
                * Returns a promise that is resolved once the unflag article comment action has been performed. This action removes the "flagged" comment mark. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleComment);
var uri = params['model'].links('comment-unflag').href;
```
                    * @method       
                    * @example 	
// articleComment is a resource previously fetched using get action.				 
baasicArticleCommentsService.unflag(articleComment)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/		                    
                unflag: function(data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unflag').href, params[baasicConstants.modelPropertyName]);                        
                },                  
                /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the specified article comment resource.
                * @method       
                * @example 
baasicArticleCommentsService.get('<article-id>', '<comment-id>')
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                **/ 					
                get: function (id, options) {                        
                    return baasicApiHttp.get(articleCommentsRouteService.get.expand(baasicApiService.getParams(id, options)));
                },                                       
                /**
                * Returns a promise that is resolved once the remove article comment action has been performed. If the action is successfully completed, the article comment resource and its replies will be permanently removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(articleComment);
var uri = params['model'].links('delete').href;
```
                * @method   
                * @example 
// articleComment is a resource previously fetched using get action.				 
baasicArticleCommentsService.remove(articleComment)
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
                * Returns a promise that is resolved once the report article comment action has been performed. This action sets the state of an article comment to "reported". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleComment);
var uri = params['model'].links('comment-report').href;
```
                    * @method       
                    * @example 	
// articleComment is a resource previously fetched using get action.				 
baasicArticleCommentsService.report(articleComment, commentOptions)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/		 
                report: function(data, options) {
                    var params = baasicApiService.updateParams(data);
                    var commentOptions = baasicApiService.updateParams(options);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-report').href, commentOptions[baasicConstants.modelPropertyName]);                        
                },      
                /**
                * Returns a promise that is resolved once the unreport article comment action has been performed. This action removes the "reported" comment mark. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleComment);
var uri = params['model'].links('comment-unreport').href;
```
                    * @method       
                    * @example 	
// articleComment is a resource previously fetched using get action.				 
baasicArticleCommentsService.unreport(articleComment)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/		 
                unreport: function(data) {
                    var params = baasicApiService.updateParams(data);                    
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unreport').href, params[baasicConstants.modelPropertyName]);                        
                },                                         
                /**
                * Returns a promise that is resolved once the mark as spam article comment action has been performed. This action sets the state of an article comment to "spam". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleComment);
var uri = params['model'].links('comment-spam').href;
```
                    * @method       
                    * @example 	
// articleComment is a resource previously fetched using get action.		 
baasicArticleCommentsService.spam(articleComment)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/		 
                spam: function(data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-spam').href, params[baasicConstants.modelPropertyName]);                        
                },
                /**
                * Returns a promise that is resolved once the unspam article comment action has been performed. This action removes the "spam" comment mark. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleComment);
var uri = params['model'].links('comment-unspam').href;
```
                    * @method       
                    * @example 	
// articleComment is a resource previously fetched using get action.		 
baasicArticleCommentsService.unspam(articleComment)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/		 
                unspam: function(data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unspam').href, params[baasicConstants.modelPropertyName]);                        
                },                
                /**
                * Returns a promise that is resolved once the update article comment action has been performed; this action updates an article comment resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentsRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleComment);
var uri = params['model'].links('put').href;
```
                    * @method
                    * @example 	
// articleComment is a resource previously fetched using get action.				 
baasicArticleCommentsService.update(articleComment)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/		                    
                update: function(data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);                        
                },                    
                /**
                * Provides direct access to `baasicArticleCommentsRouteService`.
                * @method        
                * @example baasicArticleCommentsService.routeService.get.expand(expandObject);
                **/  
                routeService: articleCommentsRouteService
            };
        }]);
}(angular, module));

/**
 * @overview 
 ***Notes:**
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/
