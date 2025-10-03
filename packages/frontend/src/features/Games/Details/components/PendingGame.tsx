import { useBem }                    from '@seaneiros/react-bem';
import { useEffect }                 from 'react';
import { useCountdown }              from '../hooks';

import { Card, Divider, Typography } from 'antd';

import type { ICommonProps }         from 'src/types';
import type { GameDetails }          from '../../models/GameBase';
import { differenceInSeconds }       from 'date-fns';
import { formatDiff }                from '../../utils';

import pic                           from '../assets/pending.jpg';

import './Game.scss';


const PendingGame = (props: IPendingGameProps) => {
  const { game, onTimeExceeded } = props;

  const diffSeconds = useCountdown(() => differenceInSeconds(game.startDate, new Date()));

  useEffect(() => {
    if (diffSeconds <= 0) {
      onTimeExceeded();
    }
  }, [ diffSeconds, onTimeExceeded ]);

  const bem = useBem({ block: 'game' }, props);

  return (
    <Card
      title="Pending Round"
      className={bem.block()}
      type="inner"
    >
      <img src={pic} className={bem.element('picture')} />

      <Divider />

      <Typography.Text>
        Round starts in { formatDiff(diffSeconds) }
      </Typography.Text>
    </Card>
  );
};

export default PendingGame;


/* HELPERS */

interface IPendingGameProps extends ICommonProps {
  game: GameDetails;
  onTimeExceeded(): void;
}