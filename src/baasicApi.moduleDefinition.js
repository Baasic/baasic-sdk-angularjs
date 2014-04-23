(function (BaasicApi) {

    var dependencies = [
        "HALParser"
    ];

    BaasicApi.module = angular.module("baasic.baasicApi", dependencies)
                    .config(BaasicApi.configDefinition)
                    .constant("baasicApiConfig", BaasicApi.apiConfig)
                    .constant("systemApiConfig", BaasicApi.systemApiConfig)
                    .value("baasicApiKey", "")
                    .service("baasicSystemApp", BaasicApi.baasicSystemAppServiceDefinition)
                    .service("baasicSystemApiHttp", BaasicApi.baasicSystemApiHttpDefinition)
                    .service("baasicApp", BaasicApi.baasicAppServiceDefinition)
                    .service("baasicApiHttp", BaasicApi.baasicApiHttpDefinition);

})(MonoSoftware.BaasicApi);

            