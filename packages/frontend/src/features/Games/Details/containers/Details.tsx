import { useCallback, useMemo, useState } from 'react';
import { useGameDetailsContext }          from './context';
import { useUserAuthContext }             from 'src/modules/Auth';

import FinishedGame                       from '../components/FinishedGame';
import PendingGame                        from '../components/PendingGame';
import ActiveGame                         from '../components/ActiveGame';
import { Result }                         from 'antd';

import { gamesService }                   from 'src/services';
import {
  ApiError,
  UnhandledValueError,
  createScoreCalculator }                 from '@guss/common';
import { GameStatus }                     from '../../enums';


const GameDetailsContainer = () => {
  const { game, statistics, reload } = useGameDetailsContext();
  const { user } = useUserAuthContext();

  console.log(game);


  const [ status, setStatus ] = useState(() => game!.status);

  const makeTap = useCallback(() => new Promise<number>((resolve, reject) => {
    if (!game || game.status === GameStatus.Completed) {
      reject(new ApiError('Invalid game specified', 422));
      return;
    }

    const [ send ] = gamesService.sendTapAction(game.id)

    send()
      .then(tapResult => tapResult.match({
        ok: ({ score }) => resolve(score),
        error: reject,
      }));
  }), [ game ]);

  const scoring = useMemo(() => user ? createScoreCalculator(user.role) : null, [ user ]);

  if (!game || !statistics || !scoring) {
    return <Result status="error" title="Invalid game data" />
  }

  switch(status) {
    case GameStatus.Completed: return <FinishedGame statistics={statistics} />;
    case GameStatus.Cooldown: return <PendingGame game={game} onTimeExceeded={() => setStatus(GameStatus.Active)}/>;
    case GameStatus.Active:
      return (
        <ActiveGame
          game={game}
          score={statistics.score}
          tapsCount={statistics.tapsCount}
          scoring={scoring}
          onTap={makeTap}
          onTimeExceeded={() => {
            reload();
            setStatus(GameStatus.Completed);
          }}
        />
      );
    default: throw new UnhandledValueError(status);
  }
};

export default GameDetailsContainer;