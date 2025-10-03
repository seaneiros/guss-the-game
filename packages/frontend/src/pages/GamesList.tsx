import { useUserAuthContext } from 'src/modules/Auth';
import { useNavigate }        from 'react-router-dom';

import { Card }               from 'antd';
import { GamesListProvider }  from 'src/features/Games/List/containers/context';
import CreateButton           from 'src/features/Games/containers/CreateButton';
import GamesList              from 'src/features/Games/List/containers/List';

import urls                   from 'src/urls';

import { Role }               from '@guss/common';


const GamesListPage = () => {
  const { user } = useUserAuthContext();
  const canCreateGame = user?.role === Role.Admin;

  const navigate = useNavigate();

  return (
    <Card
      title="Games"
      extra={canCreateGame
        ? <CreateButton type="primary" onCreated={id => navigate(urls.gameDetails(id))}>Start New Game</CreateButton>
        : null
      }
    >
      <GamesListProvider>
        <GamesList />
      </GamesListProvider>
    </Card>
  );
};

export default GamesListPage;