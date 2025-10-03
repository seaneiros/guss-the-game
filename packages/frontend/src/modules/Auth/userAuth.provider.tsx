import React                 from 'react';
import {
  useRef,
  useState,
  useEffect }                from 'react';
import { useAuthContext }    from '.';
import {
  useAjaxStatus,
  useRequestKey }            from 'src/hooks';

import type {
  IUsersService,
  UserProfileResponse }      from '@guss/common';
import type { ChildrenFunc } from 'src/types';
import {
  UserAuthContext,
  type UserData,
  type UserAuthData }        from './userAuth.context';


export const UserAuthProvider = (props: IUserAuthProviderProps) => {
  const {
    children,
    userService,
  } = props;

  const { userSession } = useAuthContext();

  const [ user, setUser ] = useState<UserData>(null);

  const { engage, isCurrentRequest } = useRequestKey();
  const { status, setRequest, setSuccess, setFailure } = useAjaxStatus();

  const { current: setupUserState } = useRef((userInfo: UserProfileResponse) => {
    const { id, name, role } = userInfo;

    setUser({ id, name, role });
  });

  useEffect(() => {
    const [ getUserInfo, abort ] = userService.getCurrentUser();

    if (!userSession) {
      setUser(null);
      return;
    }

    const key = engage();

    setRequest();

    getUserInfo()
      .then(userInfoResult => {
        userInfoResult.match({
          ok: userData => {
            setupUserState(userData);
            setSuccess();
          },
          error: err => {
            if (isCurrentRequest(key)) {
              setFailure(err);
            }
          }
        });
      });

    return () => abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ userSession ]);

  const value = {
    user,
    status,
  };

  return (
    <UserAuthContext.Provider value={value}>
      { typeof children === 'function' ? children(value) : children }
    </UserAuthContext.Provider>
  );
};

/* HELPERS */

interface IUserAuthProviderProps {
  children?: React.ReactNode | ChildrenFunc<UserAuthData>;
  userService: IUsersService;
}


