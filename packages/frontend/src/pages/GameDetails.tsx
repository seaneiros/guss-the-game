import { useNavigate, useParams } from 'react-router-dom';

import { Navigate }               from 'react-router-dom';
import { Button, Card }           from 'antd';
import { GameDetailsProvider }    from 'src/features/Games/Details/containers/context';
import GameDetails                from 'src/features/Games/Details/containers/Details';

import type { UUID }              from '@guss/common';

import urls                       from 'src/urls';


const GameDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id || !isUuid(id)) {
    return <Navigate to={urls.index()} />;
  }

  return (
    <GameDetailsProvider id={id}>
      {
        ({ status }) => (
          <Card
            title="Round Details"
            extra={
              <Button onClick={() => navigate(urls.games())}>Back To List</Button>
            }
          >
            { status.success && <GameDetails /> }
          </Card>
        )
      }
    </GameDetailsProvider>
  );
};

export default GameDetailsPage;


/* HELPERS */

function isUuid(str: string): str is UUID {
  const UUID_V4_REGEXP = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

  return UUID_V4_REGEXP.test(str);
}