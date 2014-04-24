module.config(["$provide",
	function config($provide) {
		if (!browserSupportCredentialsWithCookies()) {
			$provide.decorator("$httpBackend", ["$delegate", "$q", "$rootScope", "$window", "$document", "baasicApp", function initBaasicProxy($delegate, $q, $rootScope, $window, $document, baasicApp) {
				var apps = baasicApp.all();
				
				var apiUrlRegexPattern = "";
				for (var i=0;i<apps.length;i++) {
					apiUrlRegexPattern += "|" + regExpEscape(apps[i].get_apiUrl());
				}
				
				var apiUrlRegex = new RegExp("^" + apiUrlRegexPattern.substring(1));

				var proxyFrame = [];
				var requestHash = {};
				var nextRequestId = 0;
				var sendMessage = sendMessageToQueue;
				
				var injectFrame = angular.element('<iframe src="' + apiUrl + 'proxy/angular" style="display:none"></iframe>');
				injectFrame.bind("load", function () {
					var queue = proxyFrame;
					
					proxyFrame = this;
					sendMessage = sendMessageToProxy;
					
					while (queue.length > 0) {
						sendMessage(queue.shift());
					}
				});
				$document.find("body").append(injectFrame);

				angular.element($window).bind("message", function readMessageFromProxy (e) {
					var event = e.originalEvent || e;
					if (event.source == proxyFrame.contentWindow) {
						var response = JSON.parse(event.data);
						var request = requestHash[response.requestId];
						if (request) {
							delete requestHash[response.requestId];

							request.callback(response.status, response.response, response.headersString);
						}
					}
				});

				return function (method, url, post, callback, headers, timeout, withCredentials, responseType) {
					if (apiUrlRegex.test(url)) {

						sendNewMessage({
							method: method,
							url: url,
							post: post,
							headers: headers,
							timeout: timeout,
							withCredentials: withCredentials,
							responseType: responseType
						}, callback);
						
					} else {
						$delegate(method, url, post, callback, headers, timeout, withCredentials, responseType);
					}
				};

				function sendNewMessage(message, callback) {

					message.requestId = nextRequestId;

					var request = {
						callback: callback,
						message: message
					};

					requestHash[message.requestId] = request;

					sendMessage(request);

					nextRequestId += 1;
				}

				function sendMessageToProxy(request) {
					proxyFrame.contentWindow.postMessage(JSON.stringify(request.message), apiUrl);
				}
				
				function sendMessageToQueue(request) {
					proxyFrame.push[request];
				}
				
				
			}]);
		}
		
		function browserSupportCredentialsWithCookies() {
			return ('withCredentials' in new XMLHttpRequest())
				&& !(window.ActiveXObject || "ActiveXObject" in window);
		};
		
		// copied from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
		function regExpEscape(s) {
			return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
		};
	}
]);
