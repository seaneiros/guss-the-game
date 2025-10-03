import React                          from 'react';
import {
  useRef,
  useMemo,
  useState,
  useEffect }                         from 'react';
import { useAjaxStatus }              from 'src/hooks';

import type { IAuthManager }          from 'src/utils/auth-manager';
import type { IAuthorizationService } from '@guss/common/api/auth/types';
import type { ChildrenFunc }          from 'src/types';
import type { ApiIntent }             from '@guss/common/api/types';
import { AuthContext, type AuthData } from './auth.context';


export const AuthProvider = (props: IAuthProviderProps) => {
  const {
    authService,
    authManager,
    children
  } = props;

  const [ userSession, setUserSession ] = useState(() => authManager.hasValidToken ? Symbol() : null);
  const {
    status,
    setRequest,
    setSuccess,
    setFailure
  } = useAjaxStatus();

  const startNewSession = () => setUserSession(Symbol());

  useEffect(() => {
    const closeSession = () => setUserSession(null);

    authManager.on('clear', closeSession);

    return () => {
      authManager.off('clear', closeSession);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginWithPassword = useRef((email: string, password: string) => {
    const [ login, abort ] = authService.login(email, password);

    return [
      async () => {
        setRequest();
        const loginResult = await login();

        loginResult.match({
          ok: ({ access_token: accessToken }) => {
            authManager.update({ accessToken, refreshToken: '' });
            startNewSession();
            setSuccess();
          },
          error: setFailure,
        });
      },
      abort,
    ] as ApiIntent<void>;
  });

  const logout = useRef(() => authManager.clear());

  const value = useMemo<AuthData>(() => ({
    userSession,
    loginWithPasswordIntent: loginWithPassword.current,
    logout: logout.current,
    loginStatus: status,
  }), [ userSession, status ]);

  return (
    <AuthContext.Provider value={value}>
      { typeof children === 'function' ? children(value) : children }
    </AuthContext.Provider>
  );
};

/* HELPERS */

interface IAuthProviderProps {
  children?: React.ReactNode | ChildrenFunc<AuthData>;
  authService: IAuthorizationService;
  authManager: IAuthManager;
}
