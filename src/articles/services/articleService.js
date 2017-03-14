/* globals module */
/**
 * @module baasicArticleService
 * @description Baasic Articles Service provides an easy way to consume Baasic Articles REST API end-points. In order to obtain needed routes `baasicArticleService` uses `baasicArticleRouteService`.
 */
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleService', ['baasicApp',
        function (baasicApps) {
            var baasicApp = baasicApps.get();
            return {
                /**
                 * Contains a reference to valid list of article statuses. It returns an object containing all article statuses: `{ draft: 1, published: 2, archive: 4 }`
                 * @method        
                 * @example baasicArticleService.statuses.archive;
                 **/
                statuses: baasicApp.articleModule.articles.statuses,
                /**
                 * Parses article object and updates slug of an article.
                 * @method        
                 * @example baasicArticleService.updateSlug(article);
                 **/
                updateSlug: function (article) {
                    return baasicApp.articleModule.articles.articleUtility.updateSlug(article);
                },
                /**
                 * Generates and returns a valid slug url string.
                 * @method        
                 * @example baasicArticleService.toSlug('<slug>');
                 **/
                toSlug: function (slug) {
                    return baasicApp.articleModule.articles.articleUtility.toSlug(slug);
                },
                /**
                * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article resources matching the given criteria.
                * @method        
                * @example 
baasicArticleService.find({
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
                    return baasicApp.articleModule.articles.find(options);
                },
                /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns a single article resource.
                * @method        
                * @example 
baasicArticleService.get('<article-id>')
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});
               **/
                get: function (id, options) {
                    return baasicApp.articleModule.articles.get(id, options);
                },
                /**
                * Returns a promise that is resolved once the create article action has been performed, this action creates a new article resource.
                * @method        
                * @example 
baasicArticleService.create({
 publishDate : new Date(),
 title : '<title>',
 content : '<content>',
 slug : '',
 status : baasicArticleService.statuses.draft,
 $tags : ['<tag1>', '<tag2>']
})
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});
                **/
                create: function (data) {
                    return baasicApp.articleModule.articles.create(data);
                },
                /**
                * Returns a promise that is resolved once the update article action has been performed; this action updates an article resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(article);
var uri = params['model'].links('put').href;
```
                * @method        
                * @example 
// article is a resource previously fetched using get action.
article.title = '<title>';
baasicArticleService.update(article)
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});
               **/
                update: function (data) {
                    return baasicApp.articleModule.articles.update(data);
                },
                /**
                * Returns a promise that is resolved once the saveDraft article action has been performed. This action saves an article with "draft" status. If an article does not exist it will create a new article resource otherwise it will update an existing article resource.
                * @method        
                * @example 
// article is a resource previously fetched using get action.
baasicArticleService.saveDraft(article)
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});
               **/
                saveDraft: function (data) {
                    if (angular.isUndefined(data.id)) {
                        //Create new draft
                        return this.create(data);
                    }
                    //Update draft
                    return this.update(data);
                },
                /**
                * Returns a promise that is resolved once the remove article action has been performed. If the action is successfully completed, the article resource will be permanently removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(article);
var uri = params['model'].links('delete').href;
```
                * @method        
                * @example 
// article is a resource previously fetched using get action.				 
baasicArticleService.remove(article)
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});		
               **/
                remove: function (data) {
                    return baasicApp.articleModule.articles.remove(data);
                },
                /**
                * Returns a promise that is resolved once the archive article action has been performed. This action sets the status of an article from "published" to "archive". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(article);
var uri = params['model'].links('archive').href;
```
                * @method        
                * @example 	
// article is a resource previously fetched using get action.				 
baasicArticleService.archive(article, articleOptions)
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});		
               **/
                archive: function (data, options) {
                    return baasicApp.articleModule.articles.archive(data, options);
                },
                /**
                * Returns a promise that is resolved once the restore article action has been performed. This action sets the status of an article from "archive" to "published". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(article);
var uri = params['model'].links('restore').href;
```
                * @method        
                * @example 	
// article is a resource previously fetched using get action.				 
baasicArticleService.restore(article)
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});		
               **/
                restore: function (data) {
                    return baasicApp.articleModule.articles.restore(data);
                },
                /**
                * Returns a promise that is resolved once the unpublish article action has been performed. This action sets the status of an article from "published" to "draft". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(article);
var uri = params['model'].links('unpublish').href;
```
                * @method        
                * @example 	
// article is a resource previously fetched using get action.				 
baasicArticleService.unpublish(article)
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});		
               **/
                unpublish: function (data) {
                    return baasicApp.articleModule.articles.unpublish(data);
                },
                /**
                * Returns a promise that is resolved once the publish article action has been performed. This action sets the status of an article from "draft" to "published".
                * @method        
                * @example 	 
baasicArticleService.publish(article, articleOptions)
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});		
               **/
                publish: function (article, articleOptions) {
                    return baasicApp.articleModule.articles.publish(article, articleOptions);
                },
                /**
                * Returns a promise that is resolved once the purge articles action has been performed. Please note that all article resources will be deleted from the system once the action is successfully completed and therefore it can only be executed by user assigned to account owner role. 
                * @method        
                * @example 	 
baasicArticleService.purge({})
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});		
               **/
                purge: function (options) {
                    return baasicApp.articleModule.articles.purge(options);
                },
                subscriptions: {
                    articleModule: {
                        /**
                        * Returns a promise that is resolved once the subscribe action has been performed. This action subscribes an user to the article module.
                        * @method subscriptions.articleModule.subscribe
                        * @example 
baasicArticleService.subscriptions.articleModule.subscribe(data)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                        **/
                        subscribe: function (data) {
                            return baasicApp.articleModule.subscriptions.subscribe(data);
                        },
                        /**
                        * Returns a promise that is resolved once the isSubscribed action has been performed. This action checks if a user is subscribed to the article module.
                        * @method subscriptions.articleModule.isSubscribed
                        * @example 
baasicArticleService.subscriptions.articleModule.isSubscribed(data)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                        **/
                        isSubscribed: function (data) {
                            return baasicApp.articleModule.subscriptions.isSubscribed(data);
                        },
                        /**
                        * Returns a promise that is resolved once the unSubscribe action has been performed. This action unsubscribes a user from the article module.
                        * @method subscriptions.articleModule.unSubscribe
                        * @example 
baasicArticleService.subscriptions.articleModule.unSubscribe(data)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                        **/
                        unSubscribe: function (data) {
                            return baasicApp.articleModule.subscriptions.unSubscribe(data);
                        }
                    },
                    article: {
                        /**
                        * Returns a promise that is resolved once the subscribe action has been performed. This action subscribes an user to the specified article.
                        * @method subscriptions.article.subscribe
                        * @example 
baasicArticleService.subscriptions.article.subscribe(article, user)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                        **/
                        subscribe: function (article, data) {
                            return baasicApp.articleModule.articles.subscriptions.subscribe(article, data);
                        },
                        /**
                        * Returns a promise that is resolved once the isSubscribed action has been performed. This action checks if a user is subscribed to the specified article.
                        * @method subscriptions.article.isSubscribed
                        * @example 
baasicArticleService.subscriptions.article.isSubscribed(article, user)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                        **/
                        isSubscribed: function (article, data) {
                            return baasicApp.articleModule.articles.subscriptions.isSubscribed(article, data);
                        },
                        /**
                        * Returns a promise that is resolved once the unSubscribe action has been performed. This action unsubscribes a user from the specified article.
                        * @method subscriptions.article.unSubscribe
                        * @example 
baasicArticleService.subscriptions.article.unSubscribe(article, user)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                        **/
                        unSubscribe: function (article, data) {
                            return baasicApp.articleModule.articles.subscriptions.unSubscribe(article, data);
                        }
                    },
                    commentReported: {
                        /**
                        * Returns a promise that is resolved once the subscribe action has been performed.
                        * @method subscriptions.commentReported.subscribe
                        * @example 
baasicArticleService.subscriptions.commentReported.subscribe(data)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                        **/
                        subscribe: function (data) {
                            return baasicApp.articleModule.articles.subscriptions.commentReported.subscribe(data);
                        },
                        /**
                        * Returns a promise that is resolved once the isSubscribed action has been performed. 
                        * @method subscriptions.commentReported.isSubscribed
                        * @example 
baasicArticleService.subscriptions.commentReported.isSubscribed(data)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                        **/
                        isSubscribed: function (data) {
                            return baasicApp.articleModule.articles.subscriptions.commentReported.isSubscribed(data);
                        },
                        /**
                        * Returns a promise that is commentReported once the unSubscribe action has been performed.
                        * @method subscriptions.commentReported.unSubscribe
                        * @example 
baasicArticleService.subscriptions.commentReported.unSubscribe(data)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                        **/
                        unSubscribe: function (data) {
                            return baasicApp.articleModule.articles.subscriptions.commentReported.unSubscribe(data);
                        }
                    },
                    commentRequiresModeration: {
                        /**
                        * Returns a promise that is resolved once the subscribe action has been performed.
                        * @method subscriptions.commentRequiresModeration.subscribe
                        * @example 
baasicArticleService.subscriptions.commentRequiresModeration.subscribe(data)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                        **/
                        subscribe: function (data) {
                            return baasicApp.articleModule.articles.subscriptions.commentRequiresModeration.subscribe(data);
                        },
                        /**
                        * Returns a promise that is resolved once the isSubscribed action has been performed. 
                        * @method subscriptions.commentRequiresModeration.isSubscribed
                        * @example 
baasicArticleService.subscriptions.commentRequiresModeration.isSubscribed(data)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                        **/
                        isSubscribed: function (data) {
                            return baasicApp.articleModule.articles.subscriptions.commentRequiresModeration.isSubscribed(data);
                        },
                        /**
                        * Returns a promise that is commentReported once the unSubscribe action has been performed.
                        * @method subscriptions.commentRequiresModeration.unSubscribe
                        * @example 
baasicArticleService.subscriptions.commentRequiresModeration.unSubscribe(data)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                        **/
                        unSubscribe: function (data) {
                            return baasicApp.articleModule.articles.subscriptions.commentRequiresModeration.unSubscribe(data);
                        }
                    }
                },
                ratings: {
                    /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns the specified article rating resource.
                    * @method ratings.get       
                    * @example 
baasicArticleService.ratings.get('<article-id>', '<rating-id>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/
                    get: function (articleId, ratingId, options) {
                        return baasicApp.articleModule.articles.ratings.get(articleId, ratingId, options);
                    },
                    /**
                    * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article rating resources for a specified article.
                    * @method ratings.find    
                    * @example 
baasicArticleService.ratings.find('<article-id>')
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                    **/
                    find: function (articleId, options) {
                        return baasicApp.articleModule.articles.ratings.find(articleId, options);
                    },
                    /**
                    * Returns a promise that is resolved once the findByUsername action has been performed. Success response returns a list of article rating resources filtered by username and article identifier.
                    * @method ratings.findByUsername    
                    * @example 
baasicArticleService.ratings.findByUsername('<article-id>', '<username>')
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                    **/
                    findByUsername: function (articleId, username, options) {
                        return baasicApp.articleModule.articles.ratings.findByUser(articleId, username, options);
                    },
                    /**
                    * Returns a promise that is resolved once the create article rating action has been performed; this action creates a new rating for an article.
                    * @method  ratings.create      
                    * @example 
baasicArticleService.ratings.create({
  articleId : '<article-id>',
  rating : 5,
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
                        return baasicApp.articleModule.articles.ratings.create(data);
                    },
                    /**
                    * Returns a promise that is resolved once the update article rating action has been performed; this action updates a rating of an article.
                    * @method ratings.update       
                    * @example 
// article is a resource previously fetched using get action.
article.rating = 4;
baasicArticleService.update(article)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				    **/
                    update: function (data) {
                        return baasicApp.articleModule.articles.ratings.update(data);
                    },
                    /**
                    * Returns a promise that is resolved once the remove article rating action has been performed. This action will remove a rating from an article if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(articleRating);
var uri = params['model'].links('delete').href;
```
                    * @method ratings.remove       
                    * @example 		
// articleRating is a resource previously fetched using get action.					
baasicArticleService.remove(articleRating)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				    **/
                    remove: function (data) {
                        return baasicApp.articleModule.articles.ratings.remove(data);
                    },
                    /**
                    * Returns a promise that is resolved once the removeAll article rating action has been performed. If the action is successfully completed, the article rating resources will be permanently removed from the system for a specified article resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(article);
var uri = params['model'].links('delete-ratings-by-article').href;
```
                    * @method ratings.removeAll
                    * @example 	
// article is a resource previously fetched using get action.					
baasicArticleService.removeAll(article)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				    **/
                    removeAll: function (data) {
                        return baasicApp.articleModule.articles.ratings.removeAll(data);
                    }
                },
                tags: {
                    /**
                    * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article tag resources matching the given criteria.
                    * @method tags.find    
                    * @example 
baasicArticleService.tags.find('<article-id>')
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                    **/
                    find: function (articleId, options) {
                        return baasicApp.articleModule.articles.tags.find(articleId, options);
                    },
                    /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns the specified article tag resource.
                    * @method tags.get       
                    * @example 
baasicArticleService.tags.get('<article-id>', '<tag>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/
                    get: function (articleId, id, options) {
                        return baasicApp.articleModule.articles.tags.get(articleId, id, options);
                    },
                    /**
                    * Returns a promise that is resolved once the create article tag action has been performed; this action creates a new tag for an article.
                    * @method tags.create      
                    * @example 
baasicArticleService.tags.create({
  articleId : '<article-id>',
  tag : {
    slug : '<slug>',
    sortOrder : 1,
    tag : '<tag>'
  }
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/
                    create: function (data) {
                        return baasicApp.articleModule.articles.tags.create(data);
                    },
                    /**
                    * Returns a promise that is resolved once the remove article tag action has been performed. This action will remove a tag from an article if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(articleTag);
var uri = params['model'].links('delete').href;
```
                    * @method tags.remove       
                    * @example 
// articleTag is a resource previously fetched using get action.					 
baasicArticleService.tags.remove(articleTag)
.success(function (data) {
 // perform success action here
})
.error(function (response, status, headers, config) {
 // perform error handling here
});		
                   **/
                    remove: function (data) {
                        return baasicApp.articleModule.articles.tags.remove(data);
                    },
                    /**
                    * Returns a promise that is resolved once the removeAll article tag action has been performed. This action will remove all tags from an article if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(article);
var uri = params['model'].links('delete-tags-by-article').href;
```
                    * @method tags.removeAll
                    * @example 		
// article is a resource previously fetched using get action.					
baasicArticleService.tags.removeAll(article)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				    **/
                    removeAll: function (data) {
                        return baasicApp.articleModule.articles.tags.removeAll(data);
                    }
                },
                comments: {
                    /**
                     * Contains a reference to valid list of article comment states. It returns an object containing all article comment states.
                     * @method comments.statuses      
                     * @example baasicArticleService.comments.statuses.approved;
                     **/
                    statuses: baasicApp.articleModule.articles.comments.statuses,
                    /**
                    * Returns a promise that is resolved once the approve article comment action has been performed. This action sets the state of an article comment to "approved". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleComment);
var uri = params['model'].links('comment-approve').href;
```
                     * @method comments.approve       
                     * @example 	
// articleComment is a resource previously fetched using get action.				 
baasicArticleService.comments.approve(articleComment, commentOptions)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				    **/
                    approve: function (data, options) {
                        return baasicApp.articleModule.articles.comments.approve(data, options);
                    },
                    /**
                    * Returns a promise that is resolved once the unapprove article comment action has been performed. This action sets the state of an article comment to "unapproved". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleComment);
var uri = params['model'].links('comment-unapprove').href;
```
                     * @method comments.unapprove       
                     * @example 	
// articleComment is a resource previously fetched using get action.				 
baasicArticleService.comments.unapprove(articleComment, commentOptions)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				    **/
                    unapprove: function (data) {
                        return baasicApp.articleModule.articles.comments.unapprove(data);
                    },
                    /**
                    * Returns a promise that is resolved once the create article comment action has been performed; this action creates a new comment for an article.
                    * @method  comments.create      
                    * @example 
baasicArticleService.comments.create({
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
                        return baasicApp.articleModule.articles.comments.create(data);
                    },
                    /**
                    * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article comment resources matching the given criteria.
                    * @method comments.find
                    * @example 
baasicArticleService.comments.find('<article-id>', {
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
                    find: function (articleId, options) {
                        return baasicApp.articleModule.articles.comments.find(articleId, options);
                    },
                    /**
                    * Returns a promise that is resolved once the flag article comment action has been performed. This action sets the state of an article comment to "flagged". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleComment);
var uri = params['model'].links('comment-flag').href;
```
                     * @method comments.flag       
                     * @example 	
// articleComment is a resource previously fetched using get action.				 
baasicArticleService.comments.flag(articleComment)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				    **/
                    flag: function (data) {
                        return baasicApp.articleModule.articles.comments.flag(data);
                    },
                    /**
                    * Returns a promise that is resolved once the unflag article comment action has been performed. This action removes the "flagged" comment state. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleComment);
var uri = params['model'].links('comment-unflag').href;
```
                     * @method comments.unflag       
                     * @example 	
// articleComment is a resource previously fetched using get action.				 
baasicArticleService.comments.unflag(articleComment)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				    **/
                    unflag: function (data) {
                        return baasicApp.articleModule.articles.comments.unflag(data);
                    },
                    /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns the specified article comment resource.
                    * @method comments.get       
                    * @example 
baasicArticleService.comments.get('<article-id>', '<comment-id>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/
                    get: function (articleId, commentId, options) {
                        return baasicApp.articleModule.articles.comments.get(articleId, commentId, options);
                    },
                    /**
                    * Returns a promise that is resolved once the remove article comment action has been performed. If the action is successfully completed, the article comment resource and its replies will be permanently removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(articleComment);
var uri = params['model'].links('delete').href;
```
                    * @method comments.remove   
                    * @example 
// articleComment is a resource previously fetched using get action.				 
baasicArticleService.comments.remove(articleComment)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				    **/
                    remove: function (data) {
                        return baasicApp.articleModule.articles.comments.remove(data);
                    },
                    /**
                    * Returns a promise that is resolved once the removeAll article comment action has been performed. This action will remove all comments and comment replies from an article if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(articleComment);
var uri = params['model'].links('delete-comments-by-article').href;
```
                    * @method comments.removeAll
                    * @example 		
// articleComment is a resource previously fetched using get action.					
baasicArticleService.comments.removeAll(articleComment)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				    **/
                    removeAll: function (data) {
                        return baasicApp.articleModule.articles.comments.removeAll(data);
                    },
                    /**
                    * Returns a promise that is resolved once the report article comment action has been performed. This action sets the state of an article comment to "reported". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleComment);
var uri = params['model'].links('comment-report').href;
```
                     * @method comments.report      
                     * @example 	
// articleComment is a resource previously fetched using get action.				 
baasicArticleService.comments.report(articleComment, commentOptions)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				    **/
                    report: function (data, options) {
                        return baasicApp.articleModule.articles.comments.report(data, options);
                    },
                    /**
                    * Returns a promise that is resolved once the unreport article comment action has been performed. This action removes the "reported" comment state. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleComment);
var uri = params['model'].links('comment-unreport').href;
```
                     * @method comments.unreport     
                     * @example 	
// articleComment is a resource previously fetched using get action.				 
baasicArticleService.comments.unreport(articleComment, commentOptions)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				    **/
                    unreport: function (data) {
                        return baasicApp.articleModule.articles.comments.unreport(data);
                    },
                    /**
                    * Returns a promise that is resolved once the mark as spam article comment action has been performed. This action sets the state of an article comment to "spam". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleComment);
var uri = params['model'].links('comment-spam').href;
```
                     * @method comments.spam       
                     * @example 	
// articleComment is a resource previously fetched using get action.				 
baasicArticleService.comments.spam(articleComment)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				    **/
                    spam: function (data) {
                        return baasicApp.articleModule.articles.comments.spam(data);
                    },
                    /**
                    * Returns a promise that is resolved once the unspam article comment action has been performed. This action removes the "spam" comment state. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleComment);
var uri = params['model'].links('comment-unspam').href;
```
                     * @method comments.unspam       
                     * @example 	
// articleComment is a resource previously fetched using get action.				 
baasicArticleService.comments.unspam(articleComment)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				    **/
                    unspam: function (data) {
                        return baasicApp.articleModule.articles.comments.unspam(data);
                    },
                    /**
                    * Returns a promise that is resolved once the update article comment action has been performed; this action updates an article comment resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleComment);
var uri = params['model'].links('put').href;
```
                     * @method comments.update
                     * @example 	
// articleComment is a resource previously fetched using get action.				 
baasicArticleService.comments.update(articleComment)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				    **/
                    update: function (data) {
                        return baasicApp.articleModule.articles.comments.update(data);
                    },
                    replies: {
                        /**
                         * Contains a reference to valid list of article comment reply states. It returns an object containing all article comment reply states.
                         * @method comments.replies.statuses    
                         * @example baasicArticleService.comments.replies.statuses.approved;
                         **/
                        statuses: baasicApp.articleModule.articles.comments.statuses,
                        /**
                        * Returns a promise that is resolved once the approve article comment reply action has been performed. This action sets the state of an article comment reply to "approved". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('comment-approve').href;
```
                        * @method comments.replies.approve       
                        * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleService.comments.replies.approve(articleCommentReply, commentOptions)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				        **/
                        approve: function (data, options) {
                            return baasicApp.articleModule.articles.comments.replies.approve(data, options);
                        },
                        /**
                        * Returns a promise that is resolved once the unapprove article comment reply action has been performed. This action sets the state of an article comment reply to "unapproved". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('comment-unapprove').href;
```
                        * @method comments.replies.unapprove       
                        * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleService.comments.replies.unapprove(articleCommentReply, commentOptions)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				        **/
                        unapprove: function (data) {
                            return baasicApp.articleModule.articles.comments.replies.unapprove(data);
                        },
                        /**
                        * Returns a promise that is resolved once the create article comment reply action has been performed; this action creates a new comment reply for an article.
                        * @method  comments.replies.create      
                        * @example 
baasicArticleService.comments.replies.create('<article-id>', {
  commentId : '<comment-id>',
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
                        create: function (articleId, data) {
                            return baasicApp.articleModule.articles.comments.replies.create(data);
                        },
                        /**
                        * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article comment reply resources matching the given criteria.
                        * @method comments.replies.find
                        * @example 
baasicArticleService.comments.replies.find('<article-id>, <comment-id>', {
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
                        find: function (articleId, commentId, options) {
                            return baasicApp.articleModule.articles.comments.replies.find(articleId, commentId, options);
                        },
                        /**
                        * Returns a promise that is resolved once the flag article comment reply action has been performed. This action sets the state of an article comment reply to "flagged". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('comment-flag').href;
```
                        * @method comments.replies.flag       
                        * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleService.comments.replies.flag(articleCommentReply)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				        **/
                        flag: function (data) {
                            return baasicApp.articleModule.articles.comments.replies.flag(data);
                        },
                        /**
                        * Returns a promise that is resolved once the unflag article comment reply action has been performed. This action removes the "flagged" comment reply state. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('comment-unflag').href;
```
                        * @method comments.replies.unflag       
                        * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleService.comments.replies.unflag(articleCommentReply)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				        **/
                        unflag: function (data) {
                            return baasicApp.articleModule.articles.comments.replies.unflag(data);
                        },
                        /**
                        * Returns a promise that is resolved once the get action has been performed. Success response returns the specified article comment reply resource.
                        * @method comments.replies.get       
                        * @example 
baasicArticleService.comments.replies.get('<article-id>', '<comment-id>', '<comment-reply-id>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                        **/
                        get: function (articleId, commentId, replyId, options) {
                            return baasicApp.articleModule.articles.comments.replies.get(articleId, commentId, replyId, options);
                        },
                        /**
                        * Returns a promise that is resolved once the remove article comment reply action has been performed. If the action is successfully completed, the article comment reply resource will be permanently removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(articleCommentReply);
var uri = params['model'].links('delete').href;
```
                        * @method comments.replies.remove  
                        * @example 
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleService.comments.replies.remove(articleCommentReply)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/
                        remove: function (data) {
                            return baasicApp.articleModule.articles.comments.replies.remove(data);
                        },
                        /**
                        * Returns a promise that is resolved once the removeAll article comment reply action has been performed. This action will remove all comment replies from an article comment if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(articleCommentReply);
var uri = params['model'].links('delete-comments-by-article').href;
```
                        * @method comments.replies.removeAll
                        * @example 		
// articleCommentReply is a resource previously fetched using get action.					
baasicArticleService.comments.replies.removeAll(articleCommentReply)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
                        **/
                        removeAll: function (data) {
                            return baasicApp.articleModule.articles.comments.replies.removeAll(data);
                        },
                        /**
                        * Returns a promise that is resolved once the report article comment reply action has been performed. This action sets the state of an article comment reply to "reported". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('comment-report').href;
```
                        * @method comments.replies.report       
                        * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleService.comments.replies.report(articleCommentReply, commentOptions)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				        **/
                        report: function (data, options) {
                            return baasicApp.articleModule.articles.comments.replies.report(data, options);
                        },
                        /**
                        * Returns a promise that is resolved once the unreport article comment reply action has been performed. This action removes the "reported" comment reply state. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('comment-unreport').href;
```
                        * @method comments.replies.unreport       
                        * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleService.comments.replies.unreport(articleCommentReply, commentOptions)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				        **/
                        unreport: function (data) {
                            return baasicApp.articleModule.articles.comments.replies.unreport(data);
                        },
                        /**
                        * Returns a promise that is resolved once the mark as spam article comment reply action has been performed. This action sets the state of an article comment reply to "spam". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('comment-spam').href;
```
                        * @method comments.replies.spam       
                        * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleService.comments.replies.spam(articleCommentReply)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				        **/
                        spam: function (data) {
                            return baasicApp.articleModule.articles.comments.replies.spam(data);
                        },
                        /**
                        * Returns a promise that is resolved once the unspam article comment reply action has been performed. This action removes the "spam" comment reply state. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('comment-unspam').href;
```
                        * @method comments.replies.unspam       
                        * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleService.comments.replies.unspam(articleCommentReply)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				        **/
                        unspam: function (data) {
                            return baasicApp.articleModule.articles.comments.replies.unspam(data);
                        },
                        /**
                        * Returns a promise that is resolved once the update article comment reply action has been performed; this action updates an article comment reply resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('put').href;
```
                        * @method comments.replies.update       
                        * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleService.comments.replies.update(articleCommentReply)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				        **/
                        update: function (data) {
                            return baasicApp.articleModule.articles.comments.replies.update(data);
                        }
                    }
                },
                files: {
                    /**
                     * Returns a promise that is resolved once the find action has been performed. Success response returns a list of file resources matching the given criteria.
                     * @method files.find   
                     * @example 
baasicArticleService.files.find('<article-id>', {
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
                    find: function (articleId, options) {
                        return baasicApp.articleModule.articles.files.find(articleId, options);
                    },

                    /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns requested file resource.
                    * @method files.get     
                    * @example 
baasicArticleService.files.get('<article-id>', '<file-id>')
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                    **/
                    get: function (articleId, id, options) {
                        return baasicApp.articleModule.articles.files.get(articleId, id, options);
                    },

                    /**
                     * Returns a promise that is resolved once the unlink action has been performed. This action will remove one or many file resources from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply baasicArticleService route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(fileEntry);
var uri = params['model'].links('unlink').href;
```
                    * @method files.unlink     
                    * @example 
// fileEntry is a file resource previously fetched using get action. The following action will remove the original file resource and all accompanying derived file resources.			 
baasicArticleService.files.unlink(fileEntry)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                    **/
                    unlink: function (articleId, data, options) {
                        return baasicApp.articleModule.articles.files.unlink(articleId, data, options);
                    },

                    /**
                     * Returns a promise that is resolved once the unlink by article action has been performed. This action will remove all file resources from the system related to the requested article if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply baasicArticleService route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(fileEntry);
var uri = params['model'].links('unlink-by-article').href;
```
                    * @method files.unlinkByArticle     
                    * @example 
// fileEntry is a file resource previously fetched using get action.		 
baasicArticleService.files.unlinkByArticle(fileEntry)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                    **/
                    unlinkByArticle: function (articleId, data, options) {
                        return baasicApp.articleModule.articles.files.unlinkByArticle(articleId, data, options);
                    },

                    /**
                     * Returns a promise that is resolved once the update file action has been performed; this action will update a file resource if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicArticleService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(fileEntry);
var uri = params['model'].links('put').href;
```
                    * @method files.update      
                    * @example 
// fileEntry is a file resource previously fetched using get action.
fileEntry.description = '<description>';
baasicArticleService.files.update(fileEntry)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                    **/
                    update: function (articleId, data) {
                        return baasicApp.articleModule.articles.files.update(articleId, data);
                    },

                    /**
                     * Returns a promise that is resolved once the link action has been performed; this action links file resource from other modules into the Article Files module (For example: file resources from the Media Vault module can be linked directly into the Article Files module).
                     * @method files.link   
                     * @example 
baasicArticleService.files.link(fileObject)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                    **/
                    link: function (articleId, data) {
                        return baasicApp.articleModule.articles.files.link(articleId, data);
                    },

                    streams: {
                        /**
                        * Returns a promise that is resolved once the get action has been performed. Success response returns the file stream if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will return a stream of the derived resource. Otherwise, stream of the original file resource will be retrieved.
                        * @method files.streams.get        
                        * @example 
// Request the original file stream              
baasicArticleService.files.streams.get({id: '<file-id>'})
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});                    
// Request derived file stream                
baasicArticleService.files.streams.get({id: '<file-id>', width: <width>, height: <height>})
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                        **/
                        get: function (articleId, data) {
                            return baasicApp.articleModule.articles.files.streams.get(articleId, data);
                        },

                        /**
                        * Returns a promise that is resolved once the get action has been performed. Success response returns the file stream as a blob. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will return a blob of the derived file resource. Otherwise, blob of the original file resource will be retrieved. For more information on Blob objects please see [Blob Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
                        * @method files.streams.getBlob        
                        * @example 
// Request the original blob                
baasicArticleService.files.streams.getBlob('<article-id>', '<file-id>')
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
// Request derived blob                 
baasicArticleService.files.streams.getBlob('<article-id>', {id: '<file-id>', width: <width>, height: <height>})
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                        **/
                        getBlob: function (articleId, data) {
                            return baasicApp.articleModule.articles.files.streams.getBlob(articleId, data);
                        },

                        /**
                         * Returns a promise that is resolved once the update file stream action has been performed; this action will replace the existing stream with a new one. Alternatively, if a derived stream is being updated it will either create a new derived stream or replace the existing one. In order to update a derived stream, format needs to be passed (For example: `width` and `height` for the image type of file stream data type).
                         * @method files.streams.update
                         * @example
// Update original file stream 
baasicArticleService.files.streams.update('<article-id>', '<file-id>', <file-stream>)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
// Update derived file stream 
baasicArticleService.files.streams.update('<article-id>', {id: '<file-id>', width: <width>, height: <height>}, <file-stream>)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                        **/
                        update: function (articleId, data, stream) {
                            return baasicApp.articleModule.articles.files.streams.update(articleId, data, stream);
                        },

                        /**
                         * Returns a promise that is resolved once the create file stream action has been performed; this action will upload the specified blob. For more information on Blob objects please see [Blob Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
                         * @method files.streams.create
                         * @example 
baasicArticleService.files.streams.create('<article-id>', '<filename>', <blob>)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                        **/
                        create: function (articleId, data, stream) {
                            return baasicApp.articleModule.articles.files.streams.create(articleId, data, stream);
                        }
                    },

                    batch: {
                        /**
                         * Returns a promise that is resolved once the unlink action has been performed. This action will remove file resources from the system if successfully completed. Specified file and all its accompanying derived resources will be removed from the system.
                        * @method files.batch.unlink       
                        * @example
// Remove original file resources                
baasicArticleService.files.batch.unlink('<article-id>', [{ id: '<file-id>' }])
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		  
                        **/
                        unlink: function (articleId, data) {
                            return baasicApp.articleModule.articles.files.batch.unlink(articleId, data);
                        },

                        /**
                         * Returns a promise that is resolved once the update action has been performed; this action updates specified file resources.
                        * @method files.batch.update       
                        * @example 
baasicArticleService.batch.update('<article-id>', files)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                        **/
                        update: function (articleId, data) {
                            return baasicApp.articleModule.articles.files.batch.update(articleId, data);
                        },
                        /**
                         * Returns a promise that is resolved once the link action has been performed; this action links file resources from other modules into the Article Files module (For example: file resources from the Media Vault module can be linked directly into the Article Files module).
                        * @method files.batch.link       
                        * @example 
baasicArticleService.batch.link(files)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                        **/
                        link: function (articleId, data) {
                            return baasicApp.articleModule.articles.files.batch.link(articleId, data);
                        }
                    }
                },
                acl: {
                    /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns a list of ACL policies established for the specified article resource.
                    * @method acl.get       
                    * @example 
baasicArticleService.acl.get({id: '<article-id>'})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/
                    get: function (options) {
                        return baasicApp.articleModule.articles.acl.get(options);
                    },
                    /**
                    * Returns a promise that is resolved once the update acl action has been performed, this action creates new ACL policy for the specified article resource.
                    * @method acl.update      
                    * @example 
var options = {id : '<article-id>'};
var aclObj =  {
 actionId: '<action-id'>,
 roleId: '<roleId>',
 userId: '<userId>'
};
options[baasicConstants.modelPropertyName] = aclObj;
baasicArticleService.acl.update(options)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				    **/
                    update: function (options) {
                        return baasicApp.articleModule.articles.acl.update(options);
                    },
                    /**
                    * Returns a promise that is resolved once the removeByUser action has been performed. This action deletes ACL policy assigned to the specified user and article resource.
                    * @method acl.deleteByUser      
                    * @example 
baasicArticleService.acl.removeByUser('<article-id>', '<access-action>', '<username>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				    **/
                    removeByUser: function (articleId, action, user, data) {
                        return baasicApp.articleModule.articles.acl.removeByUser(articleId, action, user, data);
                    },
                    /**
                    * Returns a promise that is resolved once the removeByRole action has been performed. This action deletes ACL policy assigned to the specified role and article resource.
                    * @method acl.deleteByRole      
                    * @example 
baasicArticleService.acl.removeByRole('<article-id>', '<access-action>', '<role-name>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				    **/
                    removeByRole: function (articleId, action, role, data) {
                        return baasicApp.articleModule.articles.acl.removeByRole(articleId, action, role, data);
                    }
                },
                /**
                 * Provides direct access to `baasicArticleRouteService`.
                 * @method        
                 * @example baasicArticleService.routeService.get(expandObject);
                 **/
                routeService: baasicApp.articleModule.articles.routeDefinition
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