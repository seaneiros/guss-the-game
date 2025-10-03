import React             from 'react';
import type { GameData } from './types';
import { AjaxStatus }    from 'src/constants';


export const GameDetailsContext = React.createContext<GameData>({
  status: AjaxStatus.default(),
  game: null,
  statistics: null,
  reload: () => void(0),
});
GameDetailsContext.displayName = 'GameDetailsContext';