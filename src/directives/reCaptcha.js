(function (angular, module, undefined) {
    "use strict";
    module.directive("recaptcha", ["recaptchaService",
        function recaptcha(recaptchaService) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    recaptchaService.create(elem,
                        {
                            theme: "clean"
                        }
                    );

                    scope.$on("$destroy", function () {
                        if (recaptchaService) {
                            recaptchaService.destroy();
                        }
                    });
                }
            };
        }]);
}(angular, module));