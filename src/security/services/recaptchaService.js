/* globals module, grecaptcha */
/**
 * @module baasicRecaptchaService
 * @description `baasicRecaptchaService` provides an easy way to consume ReCapctcha REST API end-points. For more information please visit [reCaptcha documentation](https://code.google.com/p/recaptcha/wiki/HowToSetUpRecaptcha).
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicRecaptchaService', ['recaptchaKey', '$q', '$timeout',
        function (recaptchaKey, $q, $timeout) {
            var wInstances = [];
            var initialize = function (elem, options) {
                var id = elem.attr('id');
                if (!id) {
                    id = 'recaptcha-' + Math.random() * 10000;
                    elem.attr('id', id);
                }

                var response = grecaptcha.render(id, angular.extend({
                    'sitekey': recaptchaKey
                }, options));

                wInstances[response] = elem;
                return response;
            };
            var checkRecaptchaState = function () {
                if (typeof grecaptcha === 'undefined') {
                    return false;
                }
                return true;
            };
            var evaluateRecaptchaState = function (deferred, element, options) {
                if (!checkRecaptchaState()) {
                    $timeout(function () { evaluateRecaptchaState(deferred, element, options); }, 100);
                } else {
                    deferred.resolve(initialize(element, options));
                }
            };

            return {
                /**
                * Creates a new reCaptcha instance with provided options and injects a reCaptcha DOM onto a given element.
                * @method        
                * @example baasicRecaptchaService.create(element, {theme: 'clean'});
                **/
                create: function (elem, options) {
                    var deferred = $q.defer();
                    evaluateRecaptchaState(deferred, elem, options);                    
                    return deferred.promise;
                },
                /**
                * Communicates with reCaptcha service and provides a reCaptcha challenge identifier.
                * @method        
                * @example baasicRecaptchaService.challenge();
                **/
                challenge: function () {
                    /* jshint camelcase: false */
                    return {};
                },
                /**
                * Communicates with reCaptcha service and returns users response to a reCaptcha challenge.
                * @method        
                * @example baasicRecaptchaService.response();
                **/
                response: function (widgetId) {
                    /* jshint camelcase: false */
                    var result;
                    if (typeof widgetId === 'undefined') {
                        angular.forEach(wInstances, function (value, key) {
                            if (typeof key !== 'undefined') {
                                result = grecaptcha.getResponse(key);
                            }
                        });
                    } else {
                        result = grecaptcha.getResponse(widgetId);
                    }
                    return result;
                },
                /**
                * Communicates with reCaptcha service and displays a new reCaptcha challenge.
                * @method        
                * @example baasicRecaptchaService.reload();
                **/
                reload: function (widgetId) {
                    var result;
                    if (typeof widgetId === 'undefined') {
                        angular.forEach(wInstances, function (value, key) {
                            if (typeof key !== 'undefined') {
                                result = grecaptcha.reset(key);
                            }
                        });
                    } else {
                        result = grecaptcha.reset(widgetId);
                    }
                    return result;
                },
                /**
                * Communicates with reCaptcha service and unloads a reCaptcha instance.
                * @method        
                * @example baasicRecaptchaService.destroy();
                **/
                destroy: function (widgetId) {
                    if (typeof widgetId !== 'undefined' && widgetId !== '') {
                        delete wInstances[widgetId];
                    }
                }
            };
        }]);
}(angular, module));
/**
 * @copyright (c) 2017 Mono Ltd
 * @license MIT
 * @author Mono Ltd
*/