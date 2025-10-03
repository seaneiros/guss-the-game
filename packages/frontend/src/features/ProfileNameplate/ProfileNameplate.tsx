import {
  useAuthContext,
  useUserAuthContext } from 'src/modules/Auth';

import {
  Flex,
  Button,
  Typography }         from 'antd';
import {
  UserOutlined,
  LogoutOutlined }     from '@ant-design/icons/';


const ProfileNameplateContainer = () => {
  const { user } = useUserAuthContext();
  const { logout } = useAuthContext();

  return (
    <Flex gap={'1em'} align="center">
      <UserOutlined />

      <Typography.Text>{ user?.name }</Typography.Text>

      <Button
        type="text"
        shape="circle"
        icon={<LogoutOutlined />}
        onClick={logout}
      />

    </Flex>
  );
};

export default ProfileNameplateContainer;