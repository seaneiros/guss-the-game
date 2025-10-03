import { GameStatus }          from '../../enums';
import { UnhandledValueError } from '@guss/common';
import { Tag }                 from 'antd';


const GameStatusTag = (props: IGameStatusPropsTag) => {
  const { status } = props;

  let color = '';
  let label = '';

  switch(status) {
    case GameStatus.Cooldown:
      color = 'volcano';
      label = 'Cooldown'
      break;
    case GameStatus.Active:
      color = 'green';
      label = 'Active'
      break;
    case GameStatus.Completed:
      color = 'blue';
      label = 'Finished'
      break;
    default:
      throw new UnhandledValueError(status);
  }

  return <Tag color={color}>{ label }</Tag>;
};

export default GameStatusTag;


/* HELPERS */

interface IGameStatusPropsTag {
  status: GameStatus;
}