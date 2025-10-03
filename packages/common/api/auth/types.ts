import type { ApiIntent }             from '../types';
import type { AuthorizationResponse } from './auth.dto';
import { Result }                     from '../../utils/result';
import type { ApiError }              from '../../error/ApiError';


export interface IAuthorizationService {
  login(name: string, password: string): ApiIntent<Result<AuthorizationResponse, ApiError>>;
}