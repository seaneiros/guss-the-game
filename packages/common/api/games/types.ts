import { ApiError }     from '../../error';
import { UUID }         from '../../types';
import { Result }       from '../../utils/result';
import { ApiIntent }    from '../types';
import {
  GameTapResponse,
  GamesListResponse,
  GameDetailsResponse } from './games.dto';

export interface IGamesService {
  createGame(): ApiIntent<Result<UUID, ApiError>>;
  getGamesList(): ApiIntent<Result<GamesListResponse, ApiError>>;
  getGameDetails(id: UUID): ApiIntent<Result<GameDetailsResponse, ApiError>>;
  sendTapAction(gameId: UUID): ApiIntent<Result<GameTapResponse, ApiError>>;
}