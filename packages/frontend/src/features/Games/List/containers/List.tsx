import { useGamesListContext } from './context';
import {
  Card,
  Divider,
  List,
  Space,
  Typography }                 from 'antd';
import Status                  from '../components/Status';
import { Link }                from 'react-router-dom';

import { format }              from 'date-fns';

import urls                    from 'src/urls';


const GamesListContainer = () => {
  const { status, collection } = useGamesListContext();

  return (
    <List
      itemLayout='horizontal'
      dataSource={collection}
      loading={status.request}
      bordered={false}
      split={false}
      renderItem={game => {
        return (
          <List.Item>
            <Card
              title={
                <Space>
                  <Typography.Text>Round ID</Typography.Text>
                  <Link to={urls.gameDetails(game.id)} style={{ fontWeight: 'normal' }}>{ game.id }</Link>
                </Space>
              }
              type="inner"
            >
              <table cellSpacing={10}>
                <tbody>
                  <tr>
                    <td>
                      <Typography.Text>Start</Typography.Text>
                    </td>
                    <td>
                      <Typography.Text>{ format(game.startDate, 'P, pp ') }</Typography.Text>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography.Text>End</Typography.Text>
                    </td>
                    <td>
                      <Typography.Text>{ format(game.finishDate, 'P, pp ') }</Typography.Text>
                    </td>
                  </tr>
                </tbody>
              </table>

              <Divider />

              <Space>
                <Typography.Text type="secondary">Status:</Typography.Text>
                <Status status={game.status}/>
              </Space>
            </Card>
          </List.Item>
        );
      }}
    />
  );
};

export default GamesListContainer;