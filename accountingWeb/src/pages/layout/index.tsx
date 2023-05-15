import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileExcelOutlined,
  LineChartOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme, Typography } from 'antd';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          title='宏粤汽修'
          onClick={val => {
            navigate(val.key)
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ paddingTop: '30%' }}
          items={[
            {
              key: '/dashboard/reserves',
              icon: <FileExcelOutlined />,
              label: '表格',
            },
            {
              key: '/dashboard/visual',
              icon: <LineChartOutlined />,
              label: '业绩',
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