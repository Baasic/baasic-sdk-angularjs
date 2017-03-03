/* globals module */

module.config(['$provide', function config($provide) {
    // copied from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function regExpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    if (!('withCredentials' in new XMLHttpRequest())) {
			
        $provide.decorator('$httpBackend', ['$delegate', '$q', '$rootScope', '$window', '$document', 'baasicApp', function initBaasicProxy($delegate, $q, $rootScope, $window, $document, baasicApp) {
            var apps = baasicApp.all(),
				proxies = [],
				requestHash = {},
				nextRequestId = 0;
				
            function sendNewMessage(proxy, message, callback) {

                message.requestId = nextRequestId;

                var request = {
                    proxy: proxy,
                    callback: callback,
                    message: message
                };

                requestHash[message.requestId] = request;

                proxy.sendMessage(request);

                nextRequestId += 1;
            }
			
			function createProxy(app) {
				var apiUrl = app.getApiUrl();
				var proxy = {
					proxyFrame: [],
					apiUrlRegex: new RegExp('^' + regExpEscape(apiUrl)),
					sendMessage: function sendMessageToQueue(request) {
						this.proxyFrame.push(request);
					}
				};

				var injectFrame = angular.element('<iframe src="' + apiUrl + 'proxy/angular" style="display:none"></iframe>');
				injectFrame.bind('load', function () {
					var queue = proxy.proxyFrame;

					proxy.proxyFrame = this;
					proxy.sendMessage =  function sendMessageToProxy(request) {
						this.proxyFrame.contentWindow.postMessage(JSON.stringify(request.message), apiUrl);
					};

					while (queue.length > 0) {
						proxy.sendMessage(queue.shift());
					}
				});

				$document.find('body').append(injectFrame);
				
				return proxy;
			}
                
            for (var i=0,l=apps.length;i<l;i++) {
                proxies.push(createProxy(apps[i]));
            }
				
            angular.element($window).bind('message', function readMessageFromProxy (e) {
                var event = e.originalEvent || e;
                var response = JSON.parse(event.data);
                var request = requestHash[response.requestId];
                if (request && event.source === request.proxy.proxyFrame.contentWindow) {
                    delete requestHash[response.requestId];
                    request.callback(response.status, response.response, response.headersString);
                }
            });
				
            return function (method, url, post, callback, headers, timeout, withCredentials, responseType) {
                for (var i=0, l=proxies.length;i<l;i++) {
                    var proxy = proxies[i];
                    if (proxy.apiUrlRegex.test(url)) {

                        sendNewMessage(proxy, {
                            method: method,
                            url: url,
                            post: post,
                            headers: headers,
                            timeout: timeout,
                            withCredentials: withCredentials,
                            responseType: responseType
                        }, callback);
							
                        return;
                    }
                }
					
                $delegate(method, url, post, callback, headers, timeout, withCredentials, responseType);
            };
        }]);
    }			
}]);
