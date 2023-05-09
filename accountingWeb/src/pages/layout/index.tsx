import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileExcelTwoTone,
  LineChartOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme, } from 'antd';
import { Outlet } from 'react-router';
const { Header, Sider, Content } = Layout;

export const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ paddingTop: '30%' }}
          items={[
            {
              key: 'table',
              icon: <FileExcelTwoTone />,
              label: '表格',
            },
            {
              key: 'visual',
              icon: <LineChartOutlined />,
              label: '数据可视化',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">

        <Header style={{ paddingLeft: 30, background: colorBgContainer }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
            overflow: 'auto'
          }}
        >
          <Outlet />

        </Content>
      </Layout>
    </Layout>
  );
};