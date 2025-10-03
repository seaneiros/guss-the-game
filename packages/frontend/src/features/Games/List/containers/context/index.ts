import { useContext }       from 'react';
import { GamesListContext } from './gamesList.context';


export * from './gamesList.provider';

export const useGamesListContext = () => useContext(GamesListContext);
