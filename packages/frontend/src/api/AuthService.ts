import type {
  AuthorizationResponse,
  IAuthorizationService } from '@guss/common';
import type { ApiIntent } from '@guss/common';
import type { ApiError }  from '@guss/common';
import { Result }         from '@guss/common';
import { ApiService }     from 'src/utils/ApiService';


export class AuthApiService extends ApiService implements IAuthorizationService {

  login(name: string, password: string): ApiIntent<Result<AuthorizationResponse, ApiError>> {
    const [ loginHandler, abort ] = this.createPostIntent<AuthorizationResponse>('auth/sign-in', { name, password });

    return [
      () => loginHandler().then(
        ({ data }) => Result.Ok(data),
        (err: ApiError) => Result.Error(err),
      ),
      abort,
    ];
  }
}