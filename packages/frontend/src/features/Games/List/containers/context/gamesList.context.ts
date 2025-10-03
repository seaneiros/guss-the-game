import React                  from 'react';
import type { GamesListData } from './types';
import { AjaxStatus }         from  'src/constants';


export const GamesListContext = React.createContext<GamesListData>({
  status: AjaxStatus.default(),
  total: 0,
  collection: [],
});
GamesListContext.displayName = 'GamesListContext';