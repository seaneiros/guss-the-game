import { useBem }            from '@seaneiros/react-bem';

import { Layout }            from 'antd';
import { Outlet }            from 'react-router-dom';
import type { ICommonProps } from 'src/types';

import './GuestPageLayout.scss';


const GuestPageLayout = (props: ICommonProps) => {
  const bem = useBem({ block: 'guest-page-layout' }, props);

  return (
    <Layout className={bem.block()}>
      <Layout.Content className={bem.element('content')}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default GuestPageLayout;