import type { ApiIntent } from '@guss/common';
import type {
  IUsersService,
  UserProfileResponse }   from '@guss/common';
import type { ApiError }  from '@guss/common';
import { Result }         from '@guss/common';
import { ApiService }     from 'src/utils/ApiService';


export class UsersApiService extends ApiService implements IUsersService {

  getCurrentUser(): ApiIntent<Result<UserProfileResponse, ApiError>> {
    const [ getUser, abort ] = this.createGetIntent<UserProfileResponse>('users/me');

    return [
      () => getUser().then(
        ({ data }) => Result.Ok(data),
        (err: ApiError) => Result.Error(err),
      ),
      abort,
    ];
  }
}