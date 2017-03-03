/* globals module */
/**
 * @module baasicArticleService
 * @description Baasic Articles Service provides an easy way to consume Baasic Articles REST API end-points. In order to obtain needed routes `baasicArticleService` uses `baasicArticleRouteService`.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicArticleRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, articleRouteService) {
            // https://github.com/yvg/js-replace-diacritics/blob/master/replace-diacritics.js
            var alphabet = {
                a: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/ig,
                aa: /[\uA733]/ig,
                ae: /[\u00E6\u01FD\u01E3]/ig,
                ao: /[\uA735]/ig,
                au: /[\uA737]/ig,
                av: /[\uA739\uA73B]/ig,
                ay: /[\uA73D]/ig,
                b: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/ig,
                c: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/ig,
                d: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/ig,
                dz: /[\u01F3\u01C6]/ig,
                e: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/ig,
                f: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/ig,
                g: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/ig,
                h: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/ig,
                hv: /[\u0195]/ig,
                i: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/ig,
                j: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/ig,
                k: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/ig,
                l: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/ig,
                lj: /[\u01C9]/ig,
                m: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/ig,
                n: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/ig,
                nj: /[\u01CC]/ig,
                o: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/ig,
                oi: /[\u01A3]/ig,
                ou: /[\u0223]/ig,
                oo: /[\uA74F]/ig,
                p: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/ig,
                q: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/ig,
                r: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/ig,
                s: /[\u0073\u24E2\uFF53\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/ig,
                ss: /[\u00DF\u1E9E]/ig,
                t: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/ig,
                tz: /[\uA729]/ig,
                u: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/ig,
                v: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/ig,
                vy: /[\uA761]/ig,
                w: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/ig,
                x: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/ig,
                y: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/ig,
                z: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/ig,
                '': /[\u0300\u0301\u0302\u0303\u0308]/ig
            };
            function replaceDiacritics(str) {
                for (var letter in alphabet) {
                    str = str.replace(alphabet[letter], letter);
                }
                return str;
            }

            var statuses = {
                none: 0,
                published: 2,
                draft: 1,
                archive: 4
            };

            var commentStatuses = {
                approved: 1,
                spam: 2,
                reported: 4,
                flagged: 8,
                unapproved: 16
            };

            function toSlug(str) {
                if (angular.isUndefined(str) || str === null || str === '') {
                    return str;
                }
                str = replaceDiacritics(str);
                str = str.toLowerCase();
                str = str.replace(/[^a-z0-9]+/g, '-');
                str = str.replace(/^-|-$/g, '');
                return str;
            }

            function updateSlug(resource) {
                var newSlug = toSlug(resource.slug);
                if (angular.isUndefined(newSlug) || newSlug === null || newSlug === '') {
                    newSlug = toSlug(resource.title);
                }

                if (!angular.isUndefined(newSlug) || newSlug !== null || newSlug !== '') {
                    if (!angular.equals(resource.slug, newSlug)) {
                        resource.slug = newSlug;
                    }
                }
            }

            return {
                /**
                * Contains a reference to valid list of article statuses. It returns an object containing all article statuses: `{ draft: 1, published: 2, archive: 4 }`
                * @method        
                * @example baasicArticleService.statuses.archive;
                **/
                statuses: statuses,
                /**
                * Parses article object and updates slug of an article.
                * @method        
                * @example baasicArticleService.updateSlug(article);
                **/
                updateSlug: updateSlug,
                /**
                * Generates and returns a valid slug url string.
                * @method        
                * @example baasicArticleService.toSlug('<slug>');
                **/
                toSlug: toSlug,
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
                    function getStartDate() {
                        if (!angular.isUndefined(options.startDate) && options.startDate !== null) {
                            return options.startDate.toISOString();
                        }
                        return undefined;
                    }
                    function getEndDate() {
                        if (!angular.isUndefined(options.endDate) && options.endDate !== null) {
                            return options.endDate.toISOString();
                        }
                        return undefined;
                    }

                    var params = baasicApiService.findParams(options);
                    params.startDate = getStartDate();
                    params.endDate = getEndDate();
                    return baasicApiHttp.get(articleRouteService.find.expand(params));
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
                    return baasicApiHttp.get(articleRouteService.get.expand(baasicApiService.getParams(id, options)));
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
                    return baasicApiHttp.post(articleRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                    var params = baasicApiService.updateParams(data);
                    var articleOptions = baasicApiService.updateParams(options);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('archive').href, articleOptions[baasicConstants.modelPropertyName]);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('restore').href);
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
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('unpublish').href);
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
                    var params = baasicApiService.updateParams(articleOptions);
                    return baasicApiHttp.put(articleRouteService.publish.expand(baasicApiService.getParams(article)), params[baasicConstants.modelPropertyName]);
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
                    return baasicApiHttp.delete(articleRouteService.purge.expand(options));
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
                            return baasicApiHttp.post(articleRouteService.subscriptions.articleModule.subscribe.expand(data), data);
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
                            return baasicApiHttp.get(articleRouteService.subscriptions.articleModule.isSubscribed.expand(data));
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
                            return baasicApiHttp({
                                url: articleRouteService.subscriptions.articleModule.unSubscribe.expand(data),
                                method: 'DELETE',
                                data: data
                            });
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
                            var params = angular.extend(article, data);
                            return baasicApiHttp.post(articleRouteService.subscriptions.article.subscribe.expand(params), params);
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
                            var params = angular.extend(article, data);
                            return baasicApiHttp.get(articleRouteService.subscriptions.article.isSubscribed.expand(params));
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
                            var params = angular.extend(article, data);
                            return baasicApiHttp({
                                url: articleRouteService.subscriptions.article.unSubscribe.expand(params),
                                method: 'DELETE',
                                data: params
                            });
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
                            return baasicApiHttp.post(articleRouteService.subscriptions.commentReported.subscribe.expand(data), data);
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
                            return baasicApiHttp.get(articleRouteService.subscriptions.article.isSubscribed.expand(data));
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
                            return baasicApiHttp({
                                url: articleRouteService.subscriptions.article.unSubscribe.expand(data),
                                method: 'DELETE',
                                data: data
                            });
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
                            return baasicApiHttp.post(articleRouteService.subscriptions.commentRequiresModeration.subscribe.expand(data), data);
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
                            return baasicApiHttp.get(articleRouteService.subscriptions.commentRequiresModeration.isSubscribed.expand(data));
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
                            return baasicApiHttp({
                                url: articleRouteService.subscriptions.commentRequiresModeration.unSubscribe.expand(data),
                                method: 'DELETE',
                                data: data
                            });
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
                        var params = angular.extend({}, options);
                        params.articleId = articleId;
                        params.id = ratingId;
                        return baasicApiHttp.get(articleRouteService.ratings.get.expand(baasicApiService.getParams(params)));
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
                        var params = angular.extend({}, options);
                        params.articleId = articleId;
                        return baasicApiHttp.get(articleRouteService.ratings.find.expand(baasicApiService.findParams(params)));
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
                        var params = angular.extend({}, options);
                        params.articleId = articleId;
                        params.username = username;
                        return baasicApiHttp.get(articleRouteService.ratings.findByUsername.expand(baasicApiService.findParams(params)));
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
                        return baasicApiHttp.post(articleRouteService.ratings.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.updateParams(data);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.removeParams(data);
                        return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                        var params = baasicApiService.removeParams(data);
                        return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete-ratings-by-article').href);
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
                        var params = angular.copy(options);
                        params.articleId = articleId;
                        return baasicApiHttp.get(articleRouteService.tags.find.expand(baasicApiService.findParams(params)));
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
                        var params = angular.copy(options);
                        params.articleId = articleId;
                        return baasicApiHttp.get(articleRouteService.tags.get.expand(baasicApiService.getParams(id, params)));
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
                        return baasicApiHttp.post(articleRouteService.tags.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.removeParams(data);
                        return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                        var params = baasicApiService.removeParams(data);
                        return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete-tags-by-article').href);
                    }
                },
                comments: {
                    /**
                    * Contains a reference to valid list of article comment states. It returns an object containing all article comment states.
                    * @method comments.statuses      
                    * @example baasicArticleService.comments.statuses.approved;
                    **/
                    statuses: commentStatuses,
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
                        var params = baasicApiService.updateParams(data);
                        var commentOptions = baasicApiService.updateParams(options);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-approve').href, commentOptions[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.updateParams(data);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unapprove').href, params[baasicConstants.modelPropertyName]);
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
                        return baasicApiHttp.post(articleRouteService.comments.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.findParams(options);
                        params.articleId = articleId;
                        return baasicApiHttp.get(articleRouteService.comments.find.expand(params));
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
                        var params = baasicApiService.updateParams(data);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-flag').href, params[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.updateParams(data);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unflag').href, params[baasicConstants.modelPropertyName]);
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
                        var params = angular.extend({}, options);
                        params.articleId = articleId;
                        params.id = commentId;
                        return baasicApiHttp.get(articleRouteService.comments.get.expand(baasicApiService.getParams(params)));
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
                        var params = baasicApiService.removeParams(data);
                        return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                        var params = baasicApiService.removeParams(data);
                        return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete-comments-by-article').href);
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
                        var params = baasicApiService.updateParams(data);
                        var commentOptions = baasicApiService.updateParams(options);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-report').href, commentOptions[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.updateParams(data);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unreport').href, params[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.updateParams(data);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-spam').href, params[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.updateParams(data);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unspam').href, params[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.updateParams(data);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                    },
                    replies: {
                        /**
                        * Contains a reference to valid list of article comment reply states. It returns an object containing all article comment reply states.
                        * @method comments.replies.statuses    
                        * @example baasicArticleService.comments.replies.statuses.approved;
                        **/
                        statuses: commentStatuses,
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
                            var params = baasicApiService.updateParams(data);
                            var commentOptions = baasicApiService.updateParams(options);
                            return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-approve').href, commentOptions[baasicConstants.modelPropertyName]);
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
                            var params = baasicApiService.updateParams(data);
                            return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unapprove').href, params[baasicConstants.modelPropertyName]);
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
                            var params = angular.copy(data);
                            params.articleId = articleId;
                            return baasicApiHttp.post(articleRouteService.comments.replies.create.expand(params), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                            var params = baasicApiService.findParams(options);
                            params.articleId = articleId;
                            params.commentId = commentId;
                            return baasicApiHttp.get(articleRouteService.comments.replies.find.expand(params));
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
                            var params = baasicApiService.updateParams(data);
                            return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-flag').href, params[baasicConstants.modelPropertyName]);
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
                            var params = baasicApiService.updateParams(data);
                            return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unflag').href, params[baasicConstants.modelPropertyName]);
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
                            var params = angular.extend({}, options);
                            params.articleId = articleId;
                            params.commentId = commentId;
                            params.id = replyId;
                            return baasicApiHttp.get(articleRouteService.comments.replies.get.expand(baasicApiService.getParams(params)));
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
                            var params = baasicApiService.removeParams(data);
                            return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
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
                            var params = baasicApiService.removeParams(data);
                            return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete-comments-by-article').href);
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
                            var params = baasicApiService.updateParams(data);
                            var commentOptions = baasicApiService.updateParams(options);
                            return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-report').href, commentOptions[baasicConstants.modelPropertyName]);
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
                            var params = baasicApiService.updateParams(data);
                            return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unreport').href, params[baasicConstants.modelPropertyName]);
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
                            var params = baasicApiService.updateParams(data);
                            return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-spam').href, params[baasicConstants.modelPropertyName]);
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
                            var params = baasicApiService.updateParams(data);
                            return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-unspam').href, params[baasicConstants.modelPropertyName]);
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
                            var params = baasicApiService.updateParams(data);
                            return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.findParams(options);
                        params.articleId = articleId;
                        return baasicApiHttp.get(articleRouteService.files.find.expand(params));
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
                        var params = angular.extend({}, options);
                        params.articleId = articleId;
                        params.id = id;
                        return baasicApiHttp.get(articleRouteService.files.get.expand(baasicApiService.getParams(params)));
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
                        if (!options) {
                            options = {};
                        }
                        var params = baasicApiService.removeParams(data);
                        params.articleId = articleId;
                        var href = articleRouteService.parse(params[baasicConstants.modelPropertyName].links('unlink').href).expand(options);
                        return baasicApiHttp.delete(href);
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
                        if (!options) {
                            options = {};
                        }
                        var params = baasicApiService.removeParams(data);
                        params.articleId = articleId;
                        var href = articleRouteService.parse(params[baasicConstants.modelPropertyName].links('unlink-by-article').href).expand(options);
                        return baasicApiHttp.delete(href);
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
                        var params = baasicApiService.updateParams(data);
                        params.articleId = articleId;
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
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
                        var params = angular.copy(data);
                        params.articleId = articleId;
                        return baasicApiHttp.post(articleRouteService.files.link.expand(params), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                            if (!angular.isObject(data)) {
                                data = {
                                    id: data
                                };
                            }
                            var params = angular.copy(data);
                            params.articleId = articleId;
                            return baasicApiHttp.get(articleRouteService.files.streams.get.expand(params));
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
                            if (!angular.isObject(data)) {
                                data = {
                                    id: data
                                };
                            }
                            var params = angular.copy(data);
                            params.articleId = articleId;
                            return baasicApiHttp({
                                url: articleRouteService.files.streams.get.expand(params),
                                method: 'GET',
                                responseType: 'blob'
                            });
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
                            if (!angular.isObject(data)) {
                                data = {
                                    id: data
                                };
                            }
                            var params = angular.copy(data);
                            params.articleId = articleId;
                            var formData = new FormData();
                            formData.append('file', stream);
                            return baasicApiHttp({
                                transformRequest: angular.identity,
                                url: articleRouteService.files.streams.update.expand(params),
                                method: 'PUT',
                                data: formData,
                                headers: {
                                    'Content-Type': undefined
                                }
                            });
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
                            if (!angular.isObject(data)) {
                                data = {
                                    filename: data
                                };
                            }
                            var params = angular.copy(data);
                            params.articleId = articleId;
                            var formData = new FormData();
                            formData.append('file', stream);
                            return baasicApiHttp({
                                transformRequest: angular.identity,
                                url: articleRouteService.files.streams.create.expand(params),
                                method: 'POST',
                                data: formData,
                                headers: {
                                    'Content-Type': undefined
                                }
                            });
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
                            var params = { articleId: articleId };
                            return baasicApiHttp({
                                url: articleRouteService.files.batch.unlink.expand(params),
                                method: 'DELETE',
                                data: data
                            });
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
                            var params = { articleId: articleId };
                            return baasicApiHttp.put(articleRouteService.files.batch.update.expand(params), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
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
                            var params = { articleId: articleId };
                            return baasicApiHttp.post(articleRouteService.files.batch.link.expand(params), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
                        var params = angular.copy(options);
                        return baasicApiHttp.get(articleRouteService.acl.get.expand(params));
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
                        var params = angular.copy(options);
                        return baasicApiHttp.put(articleRouteService.acl.get.expand(params), params[baasicConstants.modelPropertyName]);
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
                        var params = baasicApiService.removeParams(data);
                        params.articleId = articleId;
                        params.user = user;
                        params.accessAction = action;
                        return baasicApiHttp.delete(articleRouteService.acl.deleteByUser.expand(params));
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
                        var params = baasicApiService.removeParams(data);
                        params.articleId = articleId;
                        params.role = role;
                        params.accessAction = action;
                        return baasicApiHttp.delete(articleRouteService.acl.deleteByRole.expand(params));
                    }
                },
                /**
                * Provides direct access to `baasicArticleRouteService`.
                * @method        
                * @example baasicArticleService.routeService.get.expand(expandObject);
                **/
                routeService: articleRouteService,
            };
        }]);
} (angular, module));
/**
 * @copyright (c) 2017 Mono Ltd
 * @license MIT
 * @author Mono Ltd
 * @overview 
 ***Notes:**
 - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/
