import type { Nullable } from '@guss/common';


export interface IAuthManager {
  accessToken: string;
  tokenType: string;
  token: string;
  refreshToken: string;
  hasValidToken: boolean;
  on(event: AuthEvents, handler: AuthEventHandler): void;
  off(event: AuthEvents, handler: AuthEventHandler): void;
  update(authData: Nullable<{ accessToken: string; refreshToken: string; }>): this;
  clear(): void;
}

export type AuthEvents = 'change' | 'clear';

export type AuthEventHandler = ChangeEventHandler | ClearEventHandler;
export type ChangeEventHandler = (authData: { accessToken: string; refreshToken: string; }) => void;
export type ClearEventHandler = () => void;