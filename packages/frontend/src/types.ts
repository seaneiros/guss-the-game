export type AjaxDefaultStatus = { success: false; request: false; failure: false }
export type AjaxRequestStatus = { success: false; request: true; failure: false }
export type AjaxSuccessStatus = { success: true; request: false; failure: false }
export type AjaxFailureStatus = {
  success: false
  request: false
  failure: { status: number; message: string }
};

export type IAjaxStatus = AjaxDefaultStatus | AjaxRequestStatus | AjaxSuccessStatus | AjaxFailureStatus;
export type ChildrenFunc<Args> = (args: Args) => React.ReactNode;
export interface IResponseFormat<DataType> {
  data: DataType;
  status: number;
  statusText: string;
}

export type HttpParams = Record<string, string | number | boolean>;

export interface IHttpClient {
  head<ResponseData>(url: string, params: HttpParams, signal: AbortSignal, config?: Record<string, unknown>): Promise<IResponseFormat<ResponseData>>;
  get<ResponseData>(url: string, params: HttpParams, signal: AbortSignal, config?: Record<string, unknown>): Promise<IResponseFormat<ResponseData>>;
  put<ResponseData>(url: string, data: unknown, params: HttpParams, signal: AbortSignal, config?: Record<string, unknown>): Promise<IResponseFormat<ResponseData>>;
  post<ResponseData>(url: string, data: unknown, params: HttpParams, signal: AbortSignal, config?: Record<string, unknown>): Promise<IResponseFormat<ResponseData>>;
  patch<ResponseData>(url: string, data: unknown, params: HttpParams, signal: AbortSignal, config?: Record<string, unknown>): Promise<IResponseFormat<ResponseData>>;
  delete<ResponseData>(url: string, params: HttpParams, signal: AbortSignal, config?: Record<string, unknown>): Promise<IResponseFormat<ResponseData>>;
}

export interface ICommonProps {
  className?: string;
  style?: React.CSSProperties;
}

export type Collection<T> = {
  total: number;
  collection: T[];
};