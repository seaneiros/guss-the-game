import { useContext }         from 'react';
import { GameDetailsContext } from './gameDetails.context';


export * from './gameDetails.provider';

export const useGameDetailsContext = () => useContext(GameDetailsContext);
