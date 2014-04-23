(function (BaasicApi) {

    BaasicApi.baasicAppServiceDefinition = ["baasicApiKey", "baasicApiConfig", baasicAppService];

    function baasicAppService(baasicApiKey, baasicApiConfig) {
        return MonoSoftware.Baasic.Application.init(baasicApiKey, baasicApiConfig);
    };

})(MonoSoftware.BaasicApi);