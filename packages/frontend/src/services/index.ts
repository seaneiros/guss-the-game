import { AxiosHttpClient }        from 'src/utils/axiosClient';
import { Authorization }          from 'src/utils/auth-manager';
import { AuthRequestInterceptor } from 'src/utils/http/interceptors/auth.request';
import { AuthApiService }         from 'src/api/AuthService';
import { UsersApiService }        from 'src/api/UsersService';
import { GamesApiService }        from 'src/api/GamesService';


const ACCESS_TOKEN_KEY = 'access_token';
const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) ?? '';

export const authManager = new Authorization(accessToken, '');
authManager.on('change', ({ accessToken }) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
})

const httpClient = new AxiosHttpClient({ baseURL: import.meta.env.VITE_API_ALIAS });
httpClient.addRequestInterceptor(new AuthRequestInterceptor(authManager));

export const authService = new AuthApiService(httpClient);
export const usersService = new UsersApiService(httpClient);
export const gamesService = new GamesApiService(httpClient);
