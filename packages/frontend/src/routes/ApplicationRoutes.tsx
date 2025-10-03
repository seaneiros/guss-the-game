import {
  useAuthContext,
  useUserAuthContext }    from 'src/modules/Auth';

import {
  Spin,
  Space,
  Result,
  Button }                from 'antd';
import UnauthorizedRoutes from './UnauthorizedRoutes';
import AuthorizedRoutes   from './AuthorizedRoutes';


const ApplicationRoutes = () => {
  const { userSession, logout } = useAuthContext();
  const { user, status: loadUserStatus } = useUserAuthContext();

  const authorized = !!userSession;
  const userReady = authorized && !!user;

  if (userReady) {
    return <AuthorizedRoutes />;
  }

  if (!authorized) {
    return <UnauthorizedRoutes />;
  }

  if (loadUserStatus.request) {
    return (
      <Space
        direction="horizontal"
        style={{
          display: 'flex',
          height: '100vh',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <Spin tip="Loading..." size="large" />
      </Space>
    );
  }

  if (loadUserStatus.failure) {
    return (
      <Result
        status="403"
        title="Session has expired"
        subTitle="You must login before continue"
        extra={
          <Button type="primary" onClick={logout}>Back to Login Page</Button>
        }
      />
    );
  }

  return null;
};

export default ApplicationRoutes;
