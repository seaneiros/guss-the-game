import  { ApiError, Result } from '@guss/common';
import type {
  UUID,
  ApiIntent,
  IGamesService,
  GameTapResponse,
  GamesListResponse,
  GameDetailsResponse }      from '@guss/common';
import { ApiService }        from 'src/utils/ApiService';


export class GamesApiService extends ApiService implements IGamesService {

  getGameDetails(id: UUID): ApiIntent<Result<GameDetailsResponse, ApiError>> {
    const [ getDetails, abort ] = this.createGetIntent<GameDetailsResponse>(`games/${id}`);

    return [
      () => getDetails().then(
        ({ data }) => Result.Ok(data),
        (err: ApiError) => Result.Error(err),
      ),
      abort,
    ];
  }

  getGamesList(): ApiIntent<Result<GamesListResponse, ApiError>> {
    const [ getGames, abort ] = this.createGetIntent<GamesListResponse>('games');

    return [
      () => getGames().then(
        ({ data }) => Result.Ok(data),
        (err: ApiError) => Result.Error(err),
      ),
      abort,
    ];
  }

  createGame(): ApiIntent<Result<UUID, ApiError>> {
    const [ create, abort ] = this.createPostIntent<{ id: UUID; }>('games', void(0));

    return [
      () => create().then(
        ({ data: { id } }) => Result.Ok(id),
        (err: ApiError) => Result.Error(err),
      ),
      abort,
    ];
  }

  sendTapAction(gameId: UUID): ApiIntent<Result<GameTapResponse, ApiError>> {
    const [ tap, abort ] = this.createPostIntent<GameTapResponse>(`games/${gameId}/action`, void(0));

    return [
      () => tap().then(
        ({ data }) => Result.Ok(data),
        (err: ApiError) => Result.Error(err),
      ),
      abort,
    ];
  }
}