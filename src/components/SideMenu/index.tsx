import React from 'react';
import { useHistory } from 'react-router';
import { Layout, Menu } from 'antd';
import { BookOutlined, ClusterOutlined } from '@ant-design/icons';

import './styles.less'

export default function SideMenu() {
  const history = useHistory();
  return (
    <Layout.Sider
      id="main-menu"
      breakpoint="lg"
      collapsedWidth="0"
      width={250}
    >
      <div id="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.ItemGroup key="g1" title="Words">
          <Menu.Item key="1" icon={<BookOutlined />}    onClick={() => history.push('/dashboard/dictionary')}>
            Dictionary
          </Menu.Item>
          <Menu.Item key="2" icon={<ClusterOutlined />} onClick={() => history.push('/dashboard/classifier')}>
            Classify
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </Layout.Sider>
  );
}