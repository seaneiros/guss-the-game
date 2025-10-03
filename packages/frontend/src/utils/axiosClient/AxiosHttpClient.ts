import axios                         from 'axios'
import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  CreateAxiosDefaults,
  AxiosInterceptorOptions }          from 'axios';
import type {
  RequestConfig,
  IAxiosInterceptorErrorCreator,
  IAxiosInterceptorRequestCreator,
  IAxiosInterceptorResponseCreator } from './types';
import type {
  IHttpClient,
  IResponseFormat }                  from 'src/types';
import { ACTION_CANCELED_STATUS }    from 'src/constants';
import { ApiError }                  from '@guss/common/error/ApiError';


export class AxiosHttpClient implements IHttpClient {
  private http: AxiosInstance;

  constructor(config?: CreateAxiosDefaults<unknown>) {
    this.http = axios.create(config);
  }

  private handleResponse<T>(response: AxiosResponse<T>): IResponseFormat<T> {
    const { data, status, statusText } = response;

    return { data, status, statusText };
  }

  private handleError(error: AxiosError<{ error: { message: string; } }>): never {
    const { response: { data, status, statusText } = {}, message } = error;

    if (error.code === 'ERR_CANCELED') {
      throw new ApiError('Action was canceled', ACTION_CANCELED_STATUS);
    }

    throw new ApiError(data?.error?.message || message || statusText || '', status ?? 0);
  }

  addRequestInterceptor(onSuccessHandler?: IAxiosInterceptorRequestCreator, onErrorHandler?: IAxiosInterceptorErrorCreator, options?: AxiosInterceptorOptions) {
    this.http.interceptors.request.use(onSuccessHandler?.create(this.http), onErrorHandler?.create(this.http), options);

    return this;
  }

  addResponseInterceptor(onSuccessHandler?: IAxiosInterceptorResponseCreator, onErrorHandler?: IAxiosInterceptorErrorCreator) {
    this.http.interceptors.response.use(onSuccessHandler?.create(this.http), onErrorHandler?.create(this.http));

    return this;
  }

  head(url: string, params = {}, signal?: AbortSignal, config?: RequestConfig) {
    return this.http.head(url, { ...config, params, signal }).then(this.handleResponse, this.handleError);
  }

  get(url: string, params = {}, signal?: AbortSignal, config?: RequestConfig) {
    return this.http.get(url, { ...config, params, signal }).then(this.handleResponse, this.handleError);
  }

  put(url: string, data: unknown, params = {}, signal?: AbortSignal, config?: RequestConfig) {
    return this.http.put(url, data, { ...config, params, signal }).then(this.handleResponse, this.handleError);
  }

  post(url: string, data: unknown, params = {}, signal?: AbortSignal, config?: RequestConfig) {
    return this.http.post(url, data, { ...config, params, signal }).then(this.handleResponse, this.handleError);
  }

  patch(url: string, data: unknown, params = {}, signal?: AbortSignal, config?: RequestConfig) {
    return this.http.patch(url, data, { ...config, params, signal }).then(this.handleResponse, this.handleError);
  }

  delete(url: string, params = {}, signal?: AbortSignal, config?: RequestConfig) {
    return this.http.delete(url, { ...config, params, signal }).then(this.handleResponse, this.handleError);
  }
}
