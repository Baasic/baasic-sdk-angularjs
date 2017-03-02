import * as angular from "angular";
import { getHttpService } from "./services/httpService";
import { BaasicApp, IBaasicAppOptions } from "baasic-sdk-core";

angular.module("baasic.api", [])
    .provider("baasicApp", (() => {
        let configuration;
        this.configure = (apiKey:string, options?: IBaasicAppOptions) => {
            configuration = {
                apiKey: apiKey,
                options: options
            };
        };

        this.$get = ["$http", ($http) => {
            if (configuration) {
                var options : Partial<IBaasicAppOptions> = angular.extend({}, configuration.options, {
                    httpClient: getHttpService($http)
                });
                
                return new BaasicApp(configuration.apiKey, options);
            } else {
                throw "You must configure baasic application";
            }
        }];
    }) as angular.IServiceProviderFactory);