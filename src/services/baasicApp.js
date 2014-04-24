module.service("baasicApp", ["baasicApiConfig", 
	function baasicAppService(baasicApiConfig) {
		return MonoSoftware.Baasic.Application.init(baasicApiConfig.apiKey, baasicApiConfig);
	}
]);
