import { IModule } from "angular";
import { BaasicApiHttpService } from "./baasicApiHttpService";

export function register(module: IModule) {
    module.service("baasicApiHttp", BaasicApiHttpService);
}