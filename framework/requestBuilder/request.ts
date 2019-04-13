import * as request from "request-promise-native";
import {CookieJar, RequestAPI, RequiredUriUrl, Response} from "request";
import {ConsoleLogger} from "../../loggers";

type RequestClient<T> = RequestAPI<request.RequestPromise<TypifiedResponse<T>>, request.RequestPromiseOptions, RequiredUriUrl>;

export interface TypifiedResponse<T = any> extends Response {
    body: T;
}

export class Request<T = any> {
    protected client: RequestClient<T>;
    protected options: request.OptionsWithUri;

    constructor(urn: string) {
        this.options = {
            uri: process.env.WEKAN_DEV_URL + urn,
            method: "GET"
        };

        this.client = request.defaults({
            json: true,
            time: true,
            resolveWithFullResponse: true,
            followAllRedirects: true
        }) as RequestClient<T>;
    }

    public method(method: "POST" | "GET" | "DELETE"): Request {
        this.options.method = method;
        return this;
    }

    public queryParameters(queryParameters: Object): Request {
        this.options.qs = queryParameters;
        return this;
    }

    public headers(headers: Object) {
        this.options.headers = headers;
        return this;
    }

    public cookies(cookiesJar: CookieJar) {
        this.options.jar = cookiesJar;
        return this;
    }

    public auth(token: string) {
        this.options.auth = {
            bearer: token
        };
        return this;
    }

    public body(reqBody) {
        this.options.body = reqBody;
        return this;
    }

    public async send(): Promise<TypifiedResponse<T>> {
        let response = this.client(this.options);
        await this.logResponse(response);
        return response;
    }


    private async logResponse(responsePromise: request.RequestPromise<TypifiedResponse<T>>) {
        try {
            let response = await responsePromise;
            this.logResponseSuccess(response);
        } catch (error) {
            this.logResponseError(error);
        }
    }

    private logResponseSuccess(response) {
        ConsoleLogger.info(
            `${this.options.method}:${response.statusCode}: ${
                this.options.uri
                } took: ${response.timingPhases.total.toFixed()} ms`
        );
        ConsoleLogger.debug(
            `RESPONSE BODY: ${JSON.stringify(response.body, null, 2)}`
        );
    }

    private logResponseError(error) {
        if (error.response) {
            ConsoleLogger.info(
                `${this.options.method}:${error.response.statusCode}: ${
                    this.options.uri
                    } took: ${error.response.timingPhases.total} ms`
            );
            ConsoleLogger.debug(
                `RESPONSE BODY: ${JSON.stringify(
                    error.response.body,
                    null,
                    2
                )}`
            );
        } else {
            console.warn(error.message || error);
        }
    }
}