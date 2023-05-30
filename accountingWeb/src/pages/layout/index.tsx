import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileExcelOutlined,
  LineChartOutlined,
  UserOutlined,
  LogoutOutlined,
  ApartmentOutlined,
  UsergroupAddOutlined,
  EditOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme, Popover, Space, Button } from 'antd';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const logOutFc = () => {
    navigate('/')
    localStorage.removeItem('ac-jwt-token')
    localStorage.removeItem('auth')
  }
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
          defaultSelectedKeys={['/dashboard/reserves']}
          style={{ paddingTop: '30%' }}
          items={[
            {
              key: '01',
              icon: <ApartmentOutlined />,
              label: '快捷工作',
              children: [
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
              ]
            },
            {
              key: '02',
              icon:<UserOutlined />,
              label: '人员管理',
              children: [
                {
                  key: '/dashboard/userAdd',
                  icon: <UsergroupAddOutlined />,
                  label: '新增人员',
                },
                {
                  key: '/dashboard/userEdit',
                  icon: <EditOutlined />,
                  label: '权限管理',
                },
              ]
            }
          ]}
        />
      </Sider>
      <Layout className="site-layout">

        <Header style={{ paddingLeft: 30, background: colorBgContainer }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <Space style={{ float: 'right', marginRight: '30px' }}>
            <Popover trigger='click' placement='bottom' content={<Space><Button onClick={logOutFc} type='dashed' size='small'><LogoutOutlined />退出登录</Button></Space>}><UserOutlined /></Popover>
          </Space>
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