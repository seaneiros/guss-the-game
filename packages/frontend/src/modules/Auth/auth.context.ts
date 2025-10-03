import React                   from 'react';
import type { Nullable, UUID } from '@guss/common';
import type { ApiIntent }      from '@guss/common/api/types';
import { AjaxStatus }          from 'src/constants';
import type { IAjaxStatus }    from 'src/types';


export const AuthContext = React.createContext<AuthData>({
  userSession: null,
  loginWithPasswordIntent: () => [
    () => Promise.resolve(),
    () => void(0),
  ],
  logout: () => void(0),
  loginStatus: AjaxStatus.default(),
});
AuthContext.displayName = 'AuthContext';

export type AuthData = {
  userSession: Nullable<symbol>;
  loginWithPasswordIntent(email: string, password: string, targetRoleId?: UUID): ApiIntent<void>;
  logout(): void;
  loginStatus: IAjaxStatus;
}