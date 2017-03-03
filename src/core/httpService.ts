import { IHttpService, IHttpHeadersGetter, isArray } from "angular";
import { IHttpClient, IHttpHeaders, IHttpRequest, IHttpResponse } from "baasic-sdk-core";


export function getHttpService($http: IHttpService) {
    var wwwAuthenticateTokenizer = (function () {
		var ws = '(?:(?:\\r\\n)?[ \\t])+',
		token = '(?:[\\x21\\x23-\\x27\\x2A\\x2B\\x2D\\x2E\\x30-\\x39\\x3F\\x41-\\x5A\\x5E-\\x7A\\x7C\\x7E]+)',
		quotedString = '"(?:[\\x00-\\x0B\\x0D-\\x21\\x23-\\x5B\\\\x5D-\\x7F]|'+ws+'|\\\\[\\x00-\\x7F])*"';
		
		return new RegExp(token+'(?:=(?:'+quotedString+'|'+token+'))?', 'g');
	})();

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

	function unquote(quotedString: string) : string {
		return quotedString.substr(1, quotedString.length-2).replace(/(?:(?:\r\n)?[ \t])+/g, ' ');
	}
	
	function parseWWWAuthenticateHeader(value) {
		if (value) {
			var tokens = value.match(wwwAuthenticateTokenizer);
			if (tokens && tokens.length > 0) {
				var wwwAutheniticate : any = {
					scheme: tokens[0]
				};
				
				if (tokens.length > 1) {
					var details = {};
					for (var i=1,l=tokens.length;i<l;i++) {
						var values = tokens[i].split('=');
						details[values[0]] = unquote(values[1]);
					}
					
					wwwAutheniticate.details = details;
				}
				
				return wwwAutheniticate;
			}
		}
	}
	
    function startsWith(target: string, input: string) : boolean {
        return target.substring(0, input.length) === input;
    }

    function isAbsoluteUrl(url: string): boolean {
        var lowerUrl = url.toLowerCase();
        return startsWith(lowerUrl, 'http://') || startsWith(lowerUrl, 'https://');
    }

    function tail(array) {
        return Array.prototype.slice.call(array, 1);
    }
}