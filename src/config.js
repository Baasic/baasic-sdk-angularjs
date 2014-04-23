(function (BaasicApi) {

    BaasicApi.configDefinition = ["$provide", config];

    function config($provide) {

        $provide.decorator("$httpBackend", ["$delegate", "$q", "$rootScope", "$window", "$document", "baasicApp", function initApiKey($delegate, $q, $rootScope, $window, $document, baasicApp) {
            if (browserSupportCredentialsWithCookies()) {
                return $delegate;
            } else {
                var apiUrl = baasicApp.get_apiUrl();

                var proxyFrame = null;
                var requestHash = new Object();
                var nextRequestId = 0;

                var injectFrame = angular.element('<div style="display:none"><iframe src="' + apiUrl + 'proxy/angular"></iframe></div>');
                injectFrame.find("iframe").bind("load", function () {
                    proxyFrame = this;
                    flush();
                });
                $document.find("body").append(injectFrame);

                angular.element($window).bind("message", function (e) {
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
                    if (url.indexOf(apiUrl) == 0) {

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
                        message: message,
                        posted: false
                    };

                    requestHash[message.requestId] = request;

                    sendMessage(request);

                    nextRequestId += 1;
                }

                function flush() {
                    for (var requestId in requestHash) {
                        var request = requestHash[requestId];
                        if (!request.posted) {
                            sendMessage(request)
                        }
                    }
                }

                function sendMessage(request) {
                    if (proxyFrame) {
                        proxyFrame.contentWindow.postMessage(JSON.stringify(request.message), apiUrl);
                        request.posted = true;
                    }
                }
            }
        }]);

    };

    function browserSupportCredentialsWithCookies() {
        return ('withCredentials' in new XMLHttpRequest())
            && !(window.ActiveXObject || "ActiveXObject" in window);
    }

})(MonoSoftware.BaasicApi);