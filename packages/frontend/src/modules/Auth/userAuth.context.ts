import type {
  UUID,
  Role,
  Nullable }                from '@guss/common';
import React                from 'react';
import { AjaxStatus }       from 'src/constants';
import type { IAjaxStatus } from 'src/types';


export const UserAuthContext = React.createContext<UserAuthData>({
  user: null,
  status: AjaxStatus.default(),
});
UserAuthContext.displayName = 'UserAuthContext';


/* HELPERS */

export type UserData = Nullable<{
  id: UUID;
  name: string;
  role: Role;
}>;

export type UserAuthData = {
  user: UserData;
  status: IAjaxStatus;
};