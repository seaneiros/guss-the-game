import { useEffect, useState }           from 'react';
import { useAjaxStatus, useRequestKey }  from 'src/hooks';

import { gamesService }                  from 'src/services';

import type { ChildrenFunc, Collection } from 'src/types';
import type { GamesListData }            from './types';
import { GamesListContext }              from './gamesList.context';
import { isFunction, parseUtcAsLocal }   from '@guss/common';
import { GameListElement }               from '../../models/GameListElement';



export const GamesListProvider = (props: IGamesListProviderProps) => {
  const { children } = props;

  const {
    status,
    setRequest,
    setSuccess,
    setFailure
  } = useAjaxStatus();

  const [ collectionState, setCollectionState ] = useState<Collection<GameListElement>>({ collection: [], total: 0 });

  const { engage, isCurrentRequest } = useRequestKey();

  useEffect(() => {
    setRequest();

    const key = engage();

    const [ loadList, abort ] = gamesService.getGamesList();

    loadList()
      .then(result => {
        result.match({
          ok: ({ count, items }) => {
            setCollectionState({
              total: count,
              collection: items.map(({ id, startedAt, createdAt, finishedAt }) => new GameListElement(
                id,
                parseUtcAsLocal(createdAt),
                parseUtcAsLocal(startedAt),
                parseUtcAsLocal(finishedAt),
              )),
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
  }, []);

  const value: GamesListData = { ...collectionState, status };

  return (
    <GamesListContext.Provider value={value}>
      { isFunction(children) ? children(value) : children }
    </GamesListContext.Provider>
  );
};


/* HELPERS */

interface IGamesListProviderProps {
  children?: React.ReactNode | ChildrenFunc<GamesListData>;
}
