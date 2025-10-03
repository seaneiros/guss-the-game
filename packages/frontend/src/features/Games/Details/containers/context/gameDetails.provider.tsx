import {
  useState,
  useEffect,
  useCallback}                from 'react';
import {
  useAjaxStatus,
  useRequestKey }             from 'src/hooks';

import { gamesService }       from 'src/services';

import type { ChildrenFunc }  from 'src/types';
import type { GameData }      from './types';
import { GameDetailsContext } from './gameDetails.context';
import {
  isFunction,
  type UUID,
  type Nullable,
  parseUtcAsLocal}            from '@guss/common';
import { GameDetails }        from 'src/features/Games/models/GameBase';
import { GameStats, Winner }  from '../../models/GameDetails';



export const GameDetailsProvider = (props: IGameDetailsProviderProps) => {
  const { id, children } = props;

  const {
    status,
    setRequest,
    setSuccess,
    setFailure
  } = useAjaxStatus();

  const [ gameDetails, setGameDetails ] = useState<{
    game: Nullable<GameDetails>;
    statistics: Nullable<GameStats>;
  }>({ game: null, statistics: null });

  const reload = useCallback(async () => {
    const [ loadDetails ] = gamesService.getGameDetails(id);

    const result = await loadDetails();

    if (!result.ok) {
      return;
    }

    const { statistics: { score, tapsCount, totalScore, winner } } = result.unwrap();
    setGameDetails(({ game }) => ({
      game,
      statistics: new GameStats(
        totalScore,
        score,
        tapsCount,
        winner ? new Winner(
          winner.user.id,
          winner.user.name,
          winner.score
        ) : null,
      ),
    }));
  }, [ id ]);

  const { engage, isCurrentRequest } = useRequestKey();

  useEffect(() => {
    setRequest();

    const key = engage();

    const [ loadDetails, abort ] = gamesService.getGameDetails(id);

    loadDetails()
      .then(result => {
        result.match({
          ok: gameData => {
            const { statistics: { score, tapsCount, totalScore, winner } } = gameData;

            setGameDetails({
              game: new GameDetails(
                gameData.id,
                parseUtcAsLocal(gameData.createdAt),
                parseUtcAsLocal(gameData.startedAt),
                parseUtcAsLocal(gameData.finishedAt),
              ),
              statistics: new GameStats(
                totalScore,
                score,
                tapsCount,
                winner ? new Winner(
                  winner.user.id,
                  winner.user.name,
                  winner.score
                ) : null,
              ),
            });
            setSuccess();
          },
          error: err => {
            if (isCurrentRequest(key)) {
              setFailure(err);
            }
          },
        });
      });

    return () => abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ id ]);

  const value: GameData = {
    ...gameDetails,
    status,
    reload,
  };

  return (
    <GameDetailsContext.Provider value={value}>
      { isFunction(children) ? children(value) : children }
    </GameDetailsContext.Provider>
  );
};


/* HELPERS */

interface IGameDetailsProviderProps {
  id: UUID;
  children?: React.ReactNode | ChildrenFunc<GameData>;
}
