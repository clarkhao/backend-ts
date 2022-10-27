import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import axios from 'axios';

enum ContentType {
    json = "application/json;charset=UTF-8",
    params = "application/x-www-form-urlencoded",
}

abstract class AbstractAPI {
    protected readonly http: AxiosInstance;
    protected constructor(
        protected readonly baseURL: string,
        protected readonly path?: string,
        protected readonly contentType: keyof typeof ContentType = 'params',
    ) {
        baseURL = path ? baseURL.concat(path) : baseURL;
        this.http = axios.create({
            baseURL,
            headers: {
                'Content-Type': ContentType[contentType],
            },
        })
    }
    protected paramsSerialized(data: Record<string,string>) {
        if(this.contentType === 'json')
            return data;
        else
            return new URLSearchParams(data);
    }
    protected handleResponse(response: AxiosResponse): string {
        return response.data;
    }
    protected handleResponseStatus<T>(response: AxiosResponse<T>): number {
        return response.status;
    }
    protected isAxiosError(value: any): value is AxiosError {
        return typeof value?.response === 'object';
    }
    protected handleError(error: unknown): never {
        if(error instanceof Error) {
            if(this.isAxiosError(error)) {
                if(error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    throw error;
                } else if (error.request) {
                    console.log(error.request);
                    throw new Error(error as any);
                }
            } else {
                console.log('Error', error.message);
                throw new Error(error.message);
            }
        }
        throw new Error(error as any);
    }
}

export {AbstractAPI};