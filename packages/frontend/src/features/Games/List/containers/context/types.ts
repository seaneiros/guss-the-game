import type { IAjaxStatus }     from 'src/types';
import type { GameListElement } from '../../models/GameListElement';


export type GamesListData = {
  status: IAjaxStatus;
  total: number;
  collection: GameListElement[];
};