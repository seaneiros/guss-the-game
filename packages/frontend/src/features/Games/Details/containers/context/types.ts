import type { IAjaxStatus } from 'src/types';
import type { GameDetails } from 'src/features/Games/models/GameBase';
import type {Nullable }     from '@guss/common';
import type { GameStats }   from '../../models/GameDetails';


export type GameData = {
  status: IAjaxStatus;
  game: Nullable<GameDetails>;
  statistics: Nullable<GameStats>;
  reload(): void;
};