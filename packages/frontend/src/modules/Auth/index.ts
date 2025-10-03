import { useContext }      from 'react';
import { AuthContext }     from './auth.context';
import { UserAuthContext } from './userAuth.context';


export { AuthContext }      from './auth.context';
export { AuthProvider }     from './auth.provider';
export { UserAuthContext }  from './userAuth.context';
export { UserAuthProvider } from './userAuth.provider';

export const useAuthContext = () => useContext(AuthContext);
export const useUserAuthContext = () => useContext(UserAuthContext);