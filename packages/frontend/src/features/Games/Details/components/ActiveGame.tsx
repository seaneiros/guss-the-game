import { useBem }            from '@seaneiros/react-bem';
import {
  useState,
  useEffect,
  useOptimistic,
  startTransition }          from 'react';
import { useCountdown }      from '../hooks';

import { Card, Typography }  from 'antd';

import type { ICommonProps } from 'src/types';
import type { GameDetails }  from '../../models/GameBase';
import {
  max,
  differenceInSeconds }      from 'date-fns';
import type { IScoring }     from '@guss/common';
import { formatDiff }        from '../../utils';

import pic                   from '../assets/active.jpeg';

import './Game.scss';


const ActiveGame = (props: IActiveGameProps) => {
  const { game, score, tapsCount, scoring, onTap, onTimeExceeded } = props;

  const diffSeconds = useCountdown(() => differenceInSeconds(game.finishDate, max([game.startDate, new Date()])));
  const [ stats, setStats ] = useState<ClientStats>({ points: score, taps: tapsCount })

  const [ clientScore, increment ] = useOptimistic<ClientStats, void>(stats, ({ taps }) => {
    const count = taps + 1;

    return {
      taps: count,
      points: scoring.calculate(count),
    };
  })

  const tap = async () => {
    increment();

    startTransition(async () => {
      try {
        const score = await onTap();
        setStats(({ points, taps }) => ({ points: Math.max(score, points), taps: taps + 1 }));
      } catch (e) {
        console.error(e);
      }
    });
  };

  useEffect(() => {
    if (diffSeconds <= 0) {
      onTimeExceeded();
    }
  }, [ diffSeconds, onTimeExceeded ]);

  const bem = useBem({ block: 'game' }, props);

  return (
    <Card
      title="Active Round"
      className={bem.block()}
      type="inner"
    >
      <img src={pic} className={bem.element('picture', { clickable: true })} onClick={tap} />

      <Typography.Title level={3}>
        Tap it HARD!
      </Typography.Title>

      <Typography.Paragraph>
        Round'll end in { formatDiff(diffSeconds) }
      </Typography.Paragraph>

      <Typography.Paragraph>
        score { clientScore.points }
      </Typography.Paragraph>
    </Card>
  );
};

export default ActiveGame;


/* HELPERS */

interface IActiveGameProps extends ICommonProps {
  game: GameDetails;
  score: number;
  tapsCount: number;
  scoring: IScoring;
  onTap(): Promise<number>;
  onTimeExceeded(): void;
}

type ClientStats = {
  taps: number;
  points: number;
};