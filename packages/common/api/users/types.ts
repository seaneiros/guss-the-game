import type { ApiError }            from '../../error/ApiError';
import type { Result }              from '../../utils/result';
import type { ApiIntent }           from '../types';
import type { UserProfileResponse } from './users.dto';


export interface IUsersService {
  getCurrentUser(): ApiIntent<Result<UserProfileResponse, ApiError>>;
}