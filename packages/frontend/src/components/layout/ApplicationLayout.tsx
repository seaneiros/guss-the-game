import { useBem }            from '@seaneiros/react-bem';

import { Layout }            from 'antd';
import ProfileNameplate      from 'src/features/ProfileNameplate';
import { Outlet }            from 'react-router-dom';

import type { ICommonProps } from 'src/types';

import './ApplicationLayout.scss';


const ApplicationLayout = (props: ICommonProps) => {

  const bem = useBem({ block: 'application-layout' }, props);

  return (
    <Layout className={bem.block()}>
      <Layout.Header className={bem.element('header')}>
        <ProfileNameplate />
      </Layout.Header>

      <Layout.Content className={bem.element('content')}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default ApplicationLayout;
