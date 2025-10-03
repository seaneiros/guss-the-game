import type { Nullable } from '@guss/common';
import type {
  AuthEvents,
  IAuthManager,
  AuthEventHandler,
  ClearEventHandler,
  ChangeEventHandler }   from './types';


export class Authorization implements IAuthManager {
  private readonly _tokenType = 'Bearer';
  private readonly eventHandlers: Map<AuthEvents, Set<AuthEventHandler>> = new Map([
    ['change', new Set<ChangeEventHandler>()],
    ['clear', new Set<ClearEventHandler>()],
  ]);

  constructor(
    private _accessToken: string = '',
    private _refreshToken: string = ''
  ) {}

  get accessToken() {
    return this._accessToken;
  }

  get tokenType() {
    return this._tokenType;
  }

  get token() {
    return this.tokenType && this.accessToken
      ? `${this.tokenType} ${this.accessToken}`
      : '';
  }

  get refreshToken() {
    return this._refreshToken;
  }

  get hasValidToken() {
    return !!this.token;
  }

  on(event: AuthEvents, handler: AuthEventHandler) {
    this.eventHandlers.get(event)!.add(handler);
  }

  off(event: AuthEvents, handler: AuthEventHandler) {
    this.eventHandlers.get(event)!.delete(handler);
  }

  update(authData: Nullable<{ accessToken: string; refreshToken: string; }>) {
    if (!authData) {
      this._accessToken = '';
      this._refreshToken = '';
    } else {
      const {
        accessToken,
        refreshToken
      } = authData;

      if (!accessToken) {
        throw new Error('Invalid auth data format');
      }

      this._accessToken = accessToken;
      this._refreshToken = refreshToken;
    }

    const handlers = this.eventHandlers.get('change');

    handlers?.forEach(handler => handler({
      accessToken: this._accessToken,
      refreshToken: this._refreshToken,
    }));

    return this;
  }

  clear() {
    this.update(null);

    const handlers = this.eventHandlers.get('clear') as Set<ClearEventHandler>;
    handlers.forEach(handler => handler());

    return this;
  }
}