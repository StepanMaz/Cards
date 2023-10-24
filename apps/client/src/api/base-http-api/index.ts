import { ContentType, HTTPHeader } from "@shared/types/http";
import { ValuesOf } from "@shared/types/utils";

type Constructor = {
    baseUrl: string;
    path: string;
    http: HTTP;
};

export class BaseHttpApi implements HTTPApi {
    private baseUrl: string;

    private path: string;

    private http: HTTP;

    public constructor({ baseUrl, path, http }: Constructor) {
        this.baseUrl = baseUrl;
        this.path = path;
        this.http = http;
    }

    async load(
        path: string,
        options: HTTPApiOptions,
    ): Promise<HTTPApiResponse> {
        const { method, contentType, payload = null } = options;

        const headers = await this.getHeaders(contentType);

        const response = await this.http.load(path, {
            method,
            headers,
            payload,
        });

        return response;
    }

    protected getFullEndpoint<T extends Record<string, string>>(
        ...parameters: [...string[], T]
    ): string {
        const copiedParameters = [...parameters];

        const options = copiedParameters.pop() as T;

        return configureString(
            this.baseUrl,
            this.path,
            ...(copiedParameters as string[]),
            options,
        );
    }

    private async getHeaders(
        contentType: ValuesOf<typeof ContentType> | undefined,
    ): Promise<Headers> {
        const headers = new Headers();

        if (contentType) {
            headers.append(HTTPHeader.CONTENT_TYPE, contentType);
        }

        return headers;
    }
}

function configureString<T extends Record<string, string>>(
    ...parameters: [...string[], T]
): string {
    const copiedArguments = [...parameters];

    const options = copiedArguments.pop() as T;

    let result = copiedArguments.join("");

    for (const [key, value] of Object.entries(options)) {
        result = result.replace(`:${key}`, value);
    }

    return result;
}

type HTTP = {
    load(path: string, options: HTTPOptions): Promise<Response>;
};

type HTTPApi = {
    load(path: string, options: HTTPApiOptions): Promise<HTTPApiResponse>;
};

type HTTPApiResponse = Response & {
    json<T = unknown>(): Promise<T> | never;
};

type HTTPApiOptions = Omit<HTTPOptions, "headers" | "payload"> & {
    contentType?: ValuesOf<typeof ContentType>;
    payload?: HTTPOptions["payload"];
};

type HTTPOptions = {
    method: HTTPMethod;
    payload: BodyInit | null;
    headers: Headers;
};

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
