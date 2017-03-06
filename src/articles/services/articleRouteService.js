/* globals module */
/**
 * @module baasicArticleRouteService
 * @description Baasic Article Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Article Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
            return {
                /**
                * Parses find article route which can be expanded with additional options. Supported items are: 
                * - `searchQuery` - A string referencing article properties using the phrase or BQL (Baasic Query Language) search.
                * - `page` - A value used to set the page number, i.e. to retrieve certain article subset from the storage.
                * - `rpp` - A value used to limit the size of result set per page.
                * - `sort` - A string used to set the article property to sort the result collection by.
				* - `embed` - Comma separated list of resources to be contained within the current representation.
                * - `startDate` - A value used to specify the article creation, publish or archive date date starting from which article resource collection should be returned.
                * - `endDate` - A value used to specify the article creation, publish or archive date until (and including) which article resource collection should be returned.
                * - `statuses` - Comma separated list of article statuses that specify where search should be done (Allowed statuses: Published, Draft and Archived).
                * -  `tags` - A value used to restrict the search to article resources with these tags. Multiple tags should be comma separated.        				
                * @method        
                * @example 
baasicArticleRouteService.find.expand(
	{searchQuery: '<search-phrase>'}
);               
                **/
                find: uriTemplateService.parse('articles/{?searchQuery,page,rpp,sort,embed,fields,statuses,tags,startDate,endDate}'),
                /**
                * Parses get article route which must be expanded with the Id of the previously created article resource in the system. Additional expand supported items are:
				* - `embed` - Comma separated list of resources to be contained within the current representation.
                * @method        
                * @example 
baasicArticleRouteService.get.expand(
	{id: '<article-id>'}
);               
                **/
                get: uriTemplateService.parse('articles/{id}/{?embed,fields}'),
                /**
                * Parses publish article route which must be expanded with the Id of the previously created article resource in the system.
                * @method        
                * @example 
baasicArticleRouteService.publish.expand(
	{id: '<article-id>'}
);               
                **/
                publish: uriTemplateService.parse('articles/{id}/publish/'),
                /**
                * Parses purge article route, this URI template doesn't expose any additional properties.
                * @method        
                * @example baasicArticleRouteService.purge.expand({});               
                **/
                purge: uriTemplateService.parse('articles/purge/'),
                /**
                * Parses create article route; this URI template doesn't expose any additional properties.
                * @method        
                * @example baasicArticleRouteService.create.expand({});               
                **/
                create: uriTemplateService.parse('articles'),
                /**
                * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                * @method
                * @example 
baasicArticleRouteService.parse(
	'<route>/{?embed,fields,options}'
).expand(
	{embed: '<embedded-resource>'}
);
                **/
                parse: uriTemplateService.parse,
                subscriptions: {
                    articleModule: {
                        /**
                         * Parses article module subscribe route which doesn't support any additional options.
                         * @method subscriptions.articleModule.subscribe
                         * @example baasicArticleRouteService.subscriptions.articleModule.subscribe.expand({});   
                        **/
                        subscribe: uriTemplateService.parse('articles/subscriptions'), 
                        /**
                         * Parses article module isSubscribed route which must be expanded with subscriber Id
                         * @method subscriptions.articleModule.isSubscribed
                         * @example baasicArticleRouteService.subscriptions.articleModule.isSubscribed.expand({subscriberId: '<subscriber-id>'});   
                        **/
                        isSubscribed: uriTemplateService.parse('articles/subscriptions/{subscriberId}'),                              
                        /**
                        * Parses article module unSubscribe route which doesn't support any additional options.
                        * @method subscriptions.articleModule.unSubscribe
                        * @example baasicArticleRouteService.subscriptions.articleModule.unSubscribe.expand({});   
                       **/
                        unSubscribe: uriTemplateService.parse('articles/subscriptions'),
                    },
                    article: {
                        /**
                        * Parses article subscribe route which must be expanded with id of the article.
                        * @method subscriptions.article.subscribe
                        * @example 
baasicArticleRouteService.subscriptions.article.subscribe.expand(
   {id: '<article-id>'}
);   
                       **/
                        subscribe: uriTemplateService.parse('articles/{id}/subscriptions'),   
                        /**
                         * Parses article isSubscribed route which must be expanded with subscriber Id and the id of the article.
                         * @method subscriptions.article.isSubscribed
                         * @example 
baasicArticleRouteService.subscriptions.article.isSubscribed.expand({
    id: '<article-id>', 
    subscriberId: '<subscriber-id>'
});   
                        **/
                        isSubscribed: uriTemplateService.parse('articles/{id}/subscriptions/{subscriberId}'),                              
                        /**
                        * Parses article unSubscribe route which must be expanded with the id of the article.
                        * @method subscriptions.articleModule.unSubscribe
                        * @example 
baasicArticleRouteService.subscriptions.article.unSubscribe.expand(
   {id: '<article-id>'}
);                             
                       **/
                        unSubscribe: uriTemplateService.parse('articles/{id}/subscriptions'),
                    },
                    commentReported: {
                        /**
                        * Parses commentReported subscribe route which doesn't support any additional options.
                        * @method subscriptions.commentReported.subscribe
                        * @example baasicArticleRouteService.subscriptions.commentReported.subscribe.expand({});
                       **/
                        subscribe: uriTemplateService.parse('articles/subscriptions/comment-reported'),   
                        /**
                         * Parses commentReported isSubscribed route which must be expanded with subscriber Id.
                         * @method subscriptions.commentReported.isSubscribed
                         * @example 
baasicArticleRouteService.subscriptions.article.isSubscribed.expand({ 
    subscriberId: '<subscriber-id>'
});   
                        **/
                        isSubscribed: uriTemplateService.parse('articles/subscriptions/comment-reported/{subscriberId}'),                              
                        /**
                        * Parses commentReported unSubscribe route which doesn't support any additional options.
                        * @method subscriptions.commentReported.unSubscribe
                        * @example baasicArticleRouteService.subscriptions.article.unSubscribe.expand({})
                       **/
                        unSubscribe: uriTemplateService.parse('articles/subscriptions/comment-reported'),
                    },
                    commentRequiresModeration: {
                        /**
                         * Parses commentRequiresModeration subscribe route which doesn't support any additional options.
                         * @method subscriptions.commentRequiresModeration.subscribe
                         * @example baasicArticleRouteService.subscriptions.commentRequiresModeration.subscribe.expand({});
                        **/
                        subscribe: uriTemplateService.parse('articles/subscriptions/comment-requires-moderation'),   
                        /**
                         * Parses commentRequiresModeration isSubscribed route which must be expanded with subscriber Id.
                         * @method subscriptions.commentRequiresModeration.isSubscribed
                         * @example 
baasicArticleRouteService.subscriptions.commentRequiresModeration.isSubscribed.expand({ 
    subscriberId: '<subscriber-id>'
});   
                        **/
                        isSubscribed: uriTemplateService.parse('articles/subscriptions/comment-requires-moderation/{subscriberId}'),                              
                        /**
                        * Parses commentRequiresModeration unSubscribe route which doesn't support any additional options.
                        * @method subscriptions.commentRequiresModeration.unSubscribe
                        * @example baasicArticleRouteService.subscriptions.commentRequiresModeration.unSubscribe.expand({})
                       **/
                        unSubscribe: uriTemplateService.parse('articles/subscriptions/comment-requires-moderation'),
                    }
                },
                ratings: {
                    /**
                    * Parses get article rating route which must be expanded with the Id of the previously created article rating resource in the system and the ArticleId. Additional expand supported items are:
                    * - `embed` - Comma separated list of resources to be contained within the current representation.
                    * @method        
                    * @example 
    baasicArticleRouteService.ratings.get.expand(
        {
            articleId: '<article-id>'
            id: '<articleRating-id>'
        }
    );               
                    **/
                    get: uriTemplateService.parse('articles/{articleId}/ratings/{id}/{?embed,fields}'),                        
					/**
					* Parses find article rating route which can be expanded with additional options. Supported items are: 
					* - `articleId` - Id of the article.
					* - `page` - A value used to set the page number, i.e. to retrieve certain article rating subset from the storage.
					* - `rpp` - A value used to limit the size of result set per page.
					* - `sort` - A string used to set the article rating property to sort the result collection by.
					* - `embed` - Comma separated list of resources to be contained within the current representation.
					* @method ratings.find       
					* @example 
baasicArticleRouteService.ratings.find.expand(
	{articleId: '<article-id>'}
);               
					**/
                    find: uriTemplateService.parse('articles/{articleId}/ratings{?page,rpp,sort,embed,fields}'),
					/**
					* Parses findByUser article rating route which can be expanded with additional options. Supported items are: 
					* - `articleId` - Id of the article.
					* - `username` - A value that uniquely identifies a user which has created an article rating.
					* - `embed` - Comma separated list of resources to be contained within the current representation.
					* @method ratings.findByUsername       
					* @example 
baasicArticleRouteService.ratings.findByUsername.expand({
    articleId: '<article-id>', 
    username: '<username>'
});
					**/
                    findByUsername: uriTemplateService.parse('articles/{articleId}/users/{username}/ratings/{?embed,fields}'),
					/**
					* Parses create article rating route; this URI template should be expanded with the Id of the article.
					* @method ratings.create       
					* @example 
baasicArticleRouteService.ratings.create.expand(
	{articleId: '<article-id>'}
);
					**/
                    create: uriTemplateService.parse('articles/{articleId}/ratings/'),
                    /**
                    * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                    * @method ratings.parse
                    * @example 
baasicArticleRouteService.ratings.parse(
	'<route>/{?embed,fields,options}'
).expand(
	{embed: '<embedded-resource>'}
);
                    **/
                    parse: uriTemplateService.parse
                },
                tags: {
					/**
					* Parses find article tags route which can be expanded with additional options. Supported items are: 
					* - `id` - Id of the article.
					* - `searchQuery` - A string value used to identify article tag resources using the phrase search.
					* - `page` - A value used to set the page number, i.e. to retrieve certain article tag subset from the storage.
					* - `rpp` - A value used to limit the size of result set per page.
					* - `sort` - A string used to set the article tag property to sort the result collection by.
					* - `embed` - Comma separated list of resources to be contained within the current representation.
					* @method tags.find       
					* @example 
baasicArticleRouteService.tags.find.expand({
    id: '<article-id>', 
    searchQuery: '<search-phrase>'
});
					**/
                    find: uriTemplateService.parse('articles/{id}/tags/{?searchQuery,page,rpp,sort,embed,fields}'),
					/**
					* Parses get article tags route which can be expanded with additional options. Supported items are: 
					* - `id` - Id of the article.					
					* - `tag` - Article slug which uniquely identifies article tag resource that needs to be retrieved.
					* - `embed` - Comma separated list of resources to be contained within the current representation.
					* @method tags.get       
					* @example 
baasicArticleRouteService.tags.get.expand({
	id: '<article-id>', 
	tag: '<tag>'
});
					**/
                    get: uriTemplateService.parse('articles/{id}/tags/{tag}/{?embed,fields}'),
					/**
					* Parses create article tag route; this URI template should be expanded with the tag and Id of the article.
					* @method tags.create       
					* @example 
baasicArticleRouteService.tags.create.expand({
    id: '<article-id>', 
    tag: '<tag>'
});
					**/
                    create: uriTemplateService.parse('articles/{id}/tags/{tag}/'),
                    /**
                    * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                    * @method tags.parse
                    * @example 
baasicArticleRouteService.tags.parse(
	'<route>/{?embed,fields,options}'
).expand(
	{embed: '<embedded-resource>'}
);
                    **/
                    parse: uriTemplateService.parse
                },
                comments: {
                    /**
                    * Parses find article comments route which can be expanded with additional options. Supported items are:
                    * - `articleId` - Id of the article.
                    * - `searchQuery` - A string value used to identify article comment resources using the phrase search.
                    * - `page` - A value used to set the page number, i.e. to retrieve certain article comment subset from the storage.
                    * - `rpp` - A value used to limit the size of result set per page.
                    * - `sort` - A string used to set the article comment property to sort the result collection by.
                    * - `embed` - Comma separated list of resources to be contained within the current representation.
                    * - `statuses` - Comma separated list of article comment states that specify where search should be done (Allowed states: Approved, Spam, Reported, Flagged and UnApproved).
                    * @method comments.find
                    * @example
baasicArticleRouteService.comment.find.expand({
  articleId: '<article-id>',
  searchQuery: '<search-phrase>'
});
                    **/
                    find: uriTemplateService.parse('articles/{articleId}/comments/{?searchQuery,statuses,page,rpp,sort,embed,fields}'),
                    /**
                    * Parses get article comments route which can be expanded with additional options. Supported items are:
                    * - `articleId` - Id of the article.
                    * - `id` - Id which uniquely identifies article comment resource that needs to be retrieved.
                    * - `embed` - Comma separated list of resources to be contained within the current representation.
                    * @method comments.get
                    * @example
baasicArticleRouteService.comments.get.expand({
  articleId: '<article-id>',
  id: '<comment-id>'
});
                    **/
                    get: uriTemplateService.parse('articles/{articleId}/comments/{id}/{?embed,fields}'),
					/**
					* Parses create article comments route; this URI template should be expanded with the Id of the article.
					* @method comments.create       
					* @example 
baasicArticleRouteService.comments.create.expand({
    id: '<article-id>'
});
					**/
                    create: uriTemplateService.parse('articles/{articleId}/comments/'),
                    /**
                    * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                    * @method comments.parse
                    * @example 
baasicArticleRouteService.comments.parse(
  '<route>/{?embed,fields,options}').expand({
  embed: '<embedded-resource>'
});
                    **/
                    parse: uriTemplateService.parse,
                    replies: {
                        /**
                        * Parses find article comment replies route which can be expanded with additional options. Supported items are:
                        * - `articleId` - Id of the article.
                        * - `commentId` - Id of the parent comment.
                        * - `searchQuery` - A string value used to identify article comment reply resources using the phrase search.
                        * - `page` - A value used to set the page number, i.e. to retrieve certain article comment reply subset from the storage.
                        * - `rpp` - A value used to limit the size of result set per page.
                        * - `sort` - A string used to set the article comment reply property to sort the result collection by.
                        * - `embed` - Comma separated list of resources to be contained within the current representation.
                        * - `statuses` - Comma separated list of article comment reply states that specify where search should be done (Allowed states: Approved, Spam, Reported, Flagged and UnApproved).
                        * @method comments.replies.find
                        * @example
baasicArticleRouteService.comment.replies.find.expand({
  articleId: '<article-id>',
  commentId: '<comment-id>',
  searchQuery: '<search-phrase>'
});
                        **/
                        find: uriTemplateService.parse('articles/{articleId}/comments/{commentId}/replies/{?searchQuery,statuses,page,rpp,sort,embed,fields}'),
                        /**
                        * Parses get article comment reply route which can be expanded with additional options. Supported items are:
                        * - `articleId` - Id of the article.
                        * - `commentId` - Id of the parent comment.
                        * - `id` - Id which uniquely identifies article comment reply resource that needs to be retrieved.
                        * - `embed` - Comma separated list of resources to be contained within the current representation.
                        * @method comments.replies.get
                        * @example
baasicArticleRouteService.comments.replies.get.expand({
  articleId: '<article-id>',
  commentId: '<comment-id>',
  id: '<comment-reply-id>'
});
                        **/
                        get: uriTemplateService.parse('articles/{articleId}/comments/{commentId}/replies/{id}/{?embed,fields}'),
                        /**
                        * Parses create article comment reply route; this URI template should be expanded with the:
                        * - `articleId` - Id of the article.
                        * - `commentId` - Id of the parent comment.                        
                        * @method comments.replies.create       
                        * @example 
baasicArticleRouteService.comments.replies.create.expand({
  articleId: '<article-id>',
  commentId: '<comment-id>'  
});
					   **/
                        create: uriTemplateService.parse('articles/{articleId}/comments/{commentId}/replies'),                        
                        /**
                        * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                        * @method comments.replies.parse
                        * @example 
baasicArticleRouteService.comments.replies.parse(
  '<route>/{?embed,fields,options}').expand({
  embed : '<embedded-resource>'
});
                        **/
                        parse: uriTemplateService.parse,
                    }
                },
                files: {
                    /**
                    * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                    * @method files.parse
                    * @example 
baasicArticleRouteService.files.parse(
'<route>/{?embed,fields,options}').expand({
embed : '<embedded-resource>'
});
                    **/
                    parse: uriTemplateService.parse,                     
                    /**
                    * Parses find route which should be expanded with articleId additionally it can be expanded with additional options. Supported items are: 
                    * - `searchQuery` - A string referencing file properties using the phrase search.
                    * - `page` - A value used to set the page number, i.e. to retrieve certain file subset from the storage.
                    * - `rpp` - A value used to limit the size of result set per page.
                    * - `sort` - A string used to set the file property to sort the result collection by.
                    * - `embed` - Comma separated list of resources to be contained within the current representation.
                    * @method files.find
                    * @example 
baasicArticleRouteService.files.find.expand(
{
    articleId: '<article-id>',
    searchQuery: '<search-phrase>'
}
);               
                    **/
                    find: uriTemplateService.parse('articles/{articleId}/files/{?searchQuery,page,rpp,sort,embed,fields}'),    
                    /**
                    * Parses get route; this route should be expanded with the Id of the file resource and parent articleId.
                    * @method files.get     
                    * @example 
baasicArticleRouteService.get.expand(
{
    articleId: '<article-id>',
    id: '<file-id>'
}
);               
                    **/
                    get: uriTemplateService.parse('articles/{articleId}/files/{id}/{?embed,fields}'),             
                        
                    /**
                    * Parses link route; this URI template should be expanded with the parent articleId.
                    * @method files.link      
                    * @example baasicArticleRouteService.link.expand({articleId: '<article-id>'});              
                    **/
                    link: uriTemplateService.parse('articles/{articleId}/files/link'),

                    streams: {
                        /**
                        * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                        * @method files.streams.parse
                        * @example 
baasicArticleRouteService.files.streams.parse(
'<route>/{?embed,fields,options}').expand({
embed : '<embedded-resource>'
});
                        **/
                        parse: uriTemplateService.parse,                              
                        /**
                        * Parses get route; this route should be expanded with id of desired file stream and parent articleId. Additional supported items are:
                        * - `width` - width of desired derived image.
                        * - `height` - height of desired derived image.
                        * @method files.streams.get
                        * @example 
baasicArticleRouteService.streams.get.expand(
{
    id: '<filename>',
    articleId: '<article-id>'
},
);               
                        **/
                        get: uriTemplateService.parse('articles/{articleId}/file-streams/{id}/{?width,height}'),  
                            
                        /**
                        * Parses create route; this route should be expanded with the filename which indicates where the stream will be saved and additionally it should be expanded with parent articleId.
                        * @method files.streams.create
                        * @example 
baasicArticleRouteService.streams.create.expand(
{
    filename: '<filename>',
    articleId: '<article-id>'
}
);               
                        **/
                        create: uriTemplateService.parse('articles/{articleId}/file-streams/{filename}'), 
                            
                        /**
                        * Parses update route; this route should be expanded with the id of the previously saved resource and parent articleId. Additional supported items are:
                        * - `width` - width of derived image to update.
                        * - `height` - height of derived image to update.                    
                        * @method files.streams.update    
                        * @example 
baasicArticleRouteService.streams.update.expand(
{
    id: '<filename>',
    articleId: '<article-id>'
}
);               
                        **/
                        update: uriTemplateService.parse('articles/{articleId}/file-streams/{id}/{?width,height}')
                    },
                    batch: {
                        /**
                        * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                        * @method files.batch.parse
                        * @example 
baasicArticleRouteService.files.streams.parse(
'<route>/{?embed,fields,options}').expand({
embed : '<embedded-resource>'
});
                        **/
                        parse: uriTemplateService.parse,                                
                        /**
                        * Parses unlink route; this URI template should be expanded with parent articleId.                                    
                        * @method files.batch.unlink       
                        * @example baasicArticleRouteService.files..batch.unlink.expand({articleId: '<article-id>'});              
                        **/
                        unlink: uriTemplateService.parse('articles/{articleId}/files/batch/unlink'),      
                            
                        /**
                        * Parses update route; this URI template should be expanded with parent articleId.
                        * @method files.batch.update       
                        * @example baasicArticleRouteService.files.batch.update.expand({articleId: '<article-id>'});              
                        **/
                        update: uriTemplateService.parse('articles/{articleId}/files/batch'),          
                            
                        /**
                        * Parses update route; this URI template should be expanded with parent articleId.
                        * @method files.batch.link       
                        * @example baasicArticleRouteService.files.batch.link.expand({articleId: '<article-id>'});              
                        **/
                        link: uriTemplateService.parse('articles/{articleId}/files/batch/link')
                    }
                },
                acl: {
					/**
					* Parses get article acl route; this URI template should be expanded with the Id of the article.					
					* @method acl.get       
					* @example 
baasicArticleRouteService.acl.get.expand(
	{id: '<article-id>'}
);
					**/
                    get: uriTemplateService.parse('articles/{id}/acl/{?fields}'),
					/**
					* Parses update article acl route; this URI template should be expanded with the Id of the article.					
					* @method acl.update       
					* @example 
baasicArticleRouteService.acl.update.expand(
	{id: '<article-id>'}
);
					**/
                    update: uriTemplateService.parse('articles/{id}/acl/{?fields}'),
					/**
					* Parses deleteByUser article acl route which can be expanded with additional options. Supported items are:
					* - `id` - Id of the article.
					* - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified user and article resource.
					* - `user` - A value which uniquely identifies user for which ACL policy needs to be removed.					
					* @method acl.deleteByUser       
					* @example 
baasicArticleRouteService.acl.deleteByUser.expand({
    id: '<article-id>', 
    accessAction: '<access-action>', 
    user: '<username>'
});
					**/
                    deleteByUser: uriTemplateService.parse('articles/{id}/acl/actions/{accessAction}/users/{user}/'),
					/**
					* Parses deleteByUser article acl route which can be expanded with additional options. Supported items are:
					* - `id` - Id of the article.
					* - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified role and article resource.
					* - `role` - A value which uniquely identifies role for which ACL policy needs to be removed.					
					* @method acl.deleteByRole       
					* @example 
baasicArticleRouteService.acl.deleteByRole.expand({
    id: '<article-id>', 
    accessAction: '<access-action>', 
    role: '<role-name>'
});
					**/
                    deleteByRole: uriTemplateService.parse('articles/{id}/acl/actions/{accessAction}/roles/{role}/')
                }
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
 - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
 - All end-point objects are transformed by the associated route service.
*/