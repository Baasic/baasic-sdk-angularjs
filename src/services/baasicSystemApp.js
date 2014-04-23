(function (BaasicApi) {

    BaasicApi.baasicSystemAppServiceDefinition = ["systemApiConfig", baasicSystemAppService];

    function baasicSystemAppService(systemApiConfig) {
        return MonoSoftware.Baasic.Application.init("system", systemApiConfig);
    };

})(MonoSoftware.BaasicApi);