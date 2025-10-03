import { useAjaxStatus }         from 'src/hooks';

import { Button }                from 'antd';

import { gamesService }          from 'src/services';
import { type ButtonProps }      from 'antd';
import { isFunction, type UUID } from '@guss/common';


const CreateGameButtonContainer = (props: ICreateGameButtonContainerProps) => {
  const { onCreated, loading, ...rest } = props;

  const {
    status,
    setRequest,
    setSuccess,
    setFailure
  } = useAjaxStatus();

  const createGame = async () => {
    setRequest();

    const [ create ] = gamesService.createGame();
    const creationResult = await create();

    creationResult.match({
      ok: id => {
        setSuccess();

        if (isFunction(onCreated)) {
          onCreated(id);
        }
      },
      error: setFailure
    });
  };

  return (
    <Button
      onClick={createGame}
      loading={loading || status.request}
      {...rest}
    />
  );
};

export default CreateGameButtonContainer;


/* HELPERS */

interface ICreateGameButtonContainerProps extends Omit<ButtonProps, 'onClick'>{
  onCreated?(id: UUID): void;
}