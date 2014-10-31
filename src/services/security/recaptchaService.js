(function (angular, module, undefined) {
    "use strict";
    module.service("baasicRecaptchaService", ["recaptchaKey",
        function (recaptchaKey) {
            return {
                create: function (elem, options) {
                    var id = elem.attr("id");
                    if (!id) {
                        id = "recaptcha-" + Math.random() * 10000;
                        elem.attr("id", id);
                    }
                    Recaptcha.create(recaptchaKey, id, options);
                },
                challenge: function () {
                    return Recaptcha.get_challenge();
                },
                response: function () {
                    return Recaptcha.get_response();
                },
                reload: function () {
                    Recaptcha.reload();
                },
                destroy: function () {
                    Recaptcha.destroy();
                }
            };
        }]);
}(angular, module));