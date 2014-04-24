module.service("baasicSystemApp", ["systemApiConfig", 
	function baasicSystemAppService(systemApiConfig) {
		return MonoSoftware.Baasic.Application.init("system", systemApiConfig);
	}
]);
