module.config(["$provide",	
	function config($provide) {
		function browserSupportCredentialsWithCookies() {
			return ('withCredentials' in new XMLHttpRequest())
				&& !(window.ActiveXObject || "ActiveXObject" in window);
		}
	
		if (!browserSupportCredentialsWithCookies()) {
			$provide.decorator("$httpBackend", ["$delegate", "$q", "$rootScope", "$window", "$document", "baasicApp", function initBaasicProxy($delegate, $q, $rootScope, $window, $document, baasicApp) {
				var apps = baasicApp.all();
				var proxies = [];
				var requestHash = {};
				var nextRequestId = 0;
					
				for (var i=0;l = apps.length;i<l;i++) {
					var app = apps[i];
					
					(function (app) {
						var apiUrl = app.get_apiUrl();
						var proxy = {
							proxyFrame: [],
							apiUrlRegex: new RegExp("^" + regExpEscape(apps[i].get_apiUrl()))
						};
						
						proxies.push(proxy);
						
						var sendMessage = sendMessageToQueue;
						
						var injectFrame = angular.element('<iframe src="' + apiUrl + 'proxy/angular" style="display:none"></iframe>');
						injectFrame.bind("load", function () {
							var queue = proxy.proxyFrame;
							
							proxy.proxyFrame = this;
							sendMessage = sendMessageToProxy;
							
							while (queue.length > 0) {
								sendMessage(queue.shift());
							}
						});
						$document.find("body").append(injectFrame);
}					)(app);
					
				}
				
				angular.element($window).bind("message", function readMessageFromProxy (e) {
					var event = e.originalEvent || e;
					var response = JSON.parse(event.data);
					var request = requestHash[response.requestId];
					if (request && event.source == request.proxy.proxyFrame.contentWindow) {
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

				function sendNewMessage(proxy, message, callback) {

					message.requestId = nextRequestId;

					var request = {
						proxy: proxy
						callback: callback,
						message: message
					};

					requestHash[message.requestId] = request;

					sendMessage(proxy.proxyFrame, request);

					nextRequestId += 1;
				}

				function sendMessageToProxy(proxyFrame, request) {
					proxyFrame.contentWindow.postMessage(JSON.stringify(request.message), apiUrl);
				}
				
				function sendMessageToQueue(proxyFrame, request) {
					proxyFrame.push[request];
				}
				
			}]);
		}			
		
		// copied from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
		function regExpEscape(s) {
			return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
		};
	}
]);
