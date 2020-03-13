import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd'
import { SyncOutlined, WalletOutlined } from '@ant-design/icons';

import { Logo } from 'components/Layout/Logo';

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  return (
    <Layout.Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Logo />
        <Menu theme="dark" selectedKeys={[pathname]} mode="inline">
          <Menu.Item key="/">
            <Link to="/">
              <WalletOutlined />
              <span>Account</span>
            </Link>{' '}
          </Menu.Item>
          <Menu.Item key="/exchange">
            <Link to="/exchange">
              <SyncOutlined />
              <span>Exchange</span>
            </Link>{' '}
          </Menu.Item>
        </Menu>
    </Layout.Sider>
  );
}
