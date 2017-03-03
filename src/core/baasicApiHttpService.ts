import { BaasicApp } from "baasic-sdk-core";

export class BaasicApiHttpService {
    public get() {
        const app = new BaasicApp();
        app.get();
    }
}