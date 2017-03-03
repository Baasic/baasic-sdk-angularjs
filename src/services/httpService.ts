import { IHttpService, IHttpHeadersGetter, isArray } from "angular";
import { IHttpClient, IHttpHeaders, IHttpRequest, IHttpResponse } from "baasic-sdk-core";


export function getHttpService($http: IHttpService) {

    let httpService: IHttpClient = <ResponseType>(request: IHttpRequest): PromiseLike<IHttpResponse<ResponseType>> => 
    {
        return $http<ResponseType>({
            method: request.method,
            url: request.url.toString()
        })
        .then<IHttpResponse<ResponseType>>((value) => {
            return {
                headers: value.headers() as IHttpHeaders,
                body: value.data,
                statusCode: value.status,
                statusText: value.statusText
            };
        });
    };

    return httpService;
}