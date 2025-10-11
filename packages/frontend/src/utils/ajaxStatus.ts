import type {
  IAjaxStatus,
  AjaxDefaultStatus,
  AjaxFailureStatus,
  AjaxRequestStatus,
  AjaxSuccessStatus }          from 'src/types';
import { MANUAL_ERROR_STATUS } from 'src/constants';
import type { ApiError }       from '@guss/common/error/ApiError';


export type AjaxStatusError = string | ApiError;

export class AjaxStatusFactory {
  private readonly _default: AjaxDefaultStatus = Object.freeze({ request: false, success: false, failure: false });
  private readonly _request: AjaxRequestStatus = Object.freeze({ request: true, success: false, failure: false });
  private readonly _success: AjaxSuccessStatus = Object.freeze({ request: false, success: true, failure: false });

  default() { return this._default; }

  request() { return this._request; }

  success() { return this._success; }

  failure(error: AjaxStatusError): AjaxFailureStatus {
    // for custom errors thrown from the app itself
    if (typeof error === 'string') {
      return {
        ...this._default,
        failure: {
          status: MANUAL_ERROR_STATUS,
          message: error,
        },
      };
    }

    // for api errors thrown from services
    const { status, message } = error;

    return {
      ...this._default,
      failure: {
        status,
        message,
      },
    };
  }

  isIdle(status: IAjaxStatus): boolean {
    return status === this._default;
  }

  all(...statuses: IAjaxStatus[]): IAjaxStatus {
    if (statuses.some(s => s.request)) {
      return this.request();
    }

    if (statuses.every(s => s.success)) {
      return this.success();
    }

    return statuses.find(s => !!s.failure) || this.default();
  }
}