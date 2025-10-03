import { useBem }            from '@seaneiros/react-bem';

import { Card, Divider }     from 'antd';

import type { ICommonProps } from 'src/types';
import type { GameStats }    from '../models/GameDetails';

import pic                   from '../assets/finished.webp';

import './Game.scss';


const FinishedGame = (props: IFinishedGameProps) => {
  const { statistics } = props;

  const bem = useBem({ block: 'game' }, props);

  return (
    <Card
      title="Round Finished"
      className={bem.block()}
      type="inner"
    >
      <img src={pic} className={bem.element('picture')} />

      <Divider />

      <table className={bem.element('stats')}>
        <tbody>
          <tr>
            <td>Total Score:</td>
            <td>{statistics.totalScore}</td>
          </tr>
          {
            statistics.winner ? (
              <tr>
                <td>Winner - {statistics.winner.name}</td>
                <td>{statistics.winner.score}</td>
              </tr>
            ) : null
          }
          <tr>
            <td>Score</td>
            <td>{statistics.score}</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

export default FinishedGame;


/* HELPERS */

interface IFinishedGameProps extends ICommonProps {
  statistics: GameStats;
}