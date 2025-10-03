import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';


export type RequestConfig = Omit<AxiosRequestConfig, 'params' | 'signal'>

export type onRequestSuccess = (value: InternalAxiosRequestConfig<unknown>) => InternalAxiosRequestConfig<unknown> | Promise<InternalAxiosRequestConfig<unknown>>;
export type onResponseSuccess = (value: AxiosResponse<unknown, unknown>) => AxiosResponse<unknown, unknown> | Promise<AxiosResponse<unknown, unknown>>;
export type onError = (error: unknown) => unknown;

export interface IAxiosInterceptorCreator<T> {
  create(axios: AxiosInstance): T;
}

export type IAxiosInterceptorErrorCreator = IAxiosInterceptorCreator<onError>
export type IAxiosInterceptorRequestCreator = IAxiosInterceptorCreator<onRequestSuccess>
export type IAxiosInterceptorResponseCreator = IAxiosInterceptorCreator<onResponseSuccess>