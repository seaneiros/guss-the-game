import type { IAuthManager }     from 'src/utils/auth-manager';
import type { onRequestSuccess } from 'src/utils/axiosClient';


export class AuthRequestInterceptor {

  constructor(private auth: IAuthManager) {}

  create(): onRequestSuccess {
    return request => {
      if (this.auth.hasValidToken) {
        request.headers!['Authorization'] = this.auth.token;
      }

      return request;
    };
  }
}