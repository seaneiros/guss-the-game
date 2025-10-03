
import type {
  HttpParams,
  IHttpClient,
  IResponseFormat }           from 'src/types';
import type { RequestConfig } from './axiosClient';
import type { ApiIntent }     from '@guss/common/api/types';


export abstract class ApiService {
  constructor(private httpClient: IHttpClient) {}

  private createAbortHandler() {
    const controller = new AbortController();
    const { signal } = controller;

    return {
      signal,
      abort: () => controller.abort(),
    };
  }

  protected createHeadIntent<ResponseData>(url: string, params: HttpParams = {}, config: RequestConfig = {}): ApiIntent<IResponseFormat<ResponseData>> {
    const { signal, abort } = this.createAbortHandler();

    return [
      () => this.httpClient.head(url, params, signal, config),
      abort,
    ];
  }

  protected createGetIntent<ResponseData>(url: string, params: HttpParams = {}, config: RequestConfig = {}): ApiIntent<IResponseFormat<ResponseData>> {
    const { signal, abort } = this.createAbortHandler();

    return [() => this.httpClient.get(url, params, signal, config), abort];
  }

  protected createPutIntent<ResponseData>(url: string, data: unknown, params: HttpParams = {}, config: RequestConfig = {}): ApiIntent<IResponseFormat<ResponseData>> {
    const { signal, abort } = this.createAbortHandler();

    return [() => this.httpClient.put(url, data, params, signal, config), abort];
  }

  protected createPostIntent<ResponseData>(url: string, data: unknown, params: HttpParams = {}, config: RequestConfig = {}): ApiIntent<IResponseFormat<ResponseData>> {
    const { signal, abort } = this.createAbortHandler();

    return [() => this.httpClient.post(url, data, params, signal, config), abort];
  }

  protected createPatchIntent<ResponseData>(url: string, data: unknown, params: HttpParams = {}, config: RequestConfig = {}): ApiIntent<IResponseFormat<ResponseData>> {
    const { signal, abort } = this.createAbortHandler();

    return [() => this.httpClient.patch(url, data, params, signal, config), abort];
  }

  protected createDeleteIntent<ResponseData>(url: string, params: HttpParams = {}, config: RequestConfig = {}): ApiIntent<IResponseFormat<ResponseData>> {
    const { signal, abort } = this.createAbortHandler();

    return [() => this.httpClient.delete(url, params, signal, config), abort];
  }
}

export const HttpClientToken = Symbol('HttpClient');