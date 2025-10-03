import { Nullable, UUID }   from '../../types';
import { CollectionResult } from '../types';


export type GameData = {
  id: UUID;
  createdAt: string;
  startedAt: string;
  finishedAt: string;
};

export type GameStatistics = {
  totalScore: number;
  score: number;
  tapsCount: number;
  winner: Nullable<{
    user: {
      id: UUID;
      name: string;
    };
    score: number;
  }>;
};

export type GameDetailsResponse = GameData & { statistics: GameStatistics };
export type GamesListResponse = CollectionResult<GameData>;

export type GameTapResponse = {
  score: number;
};