import React from "react";
import type { MenuProps } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Outlet,useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  //菜单数据
  const [menuItems, setMenuItems] = useState([
    {
      name: "财务管理",
      icon: LaptopOutlined,
      children: [
        { name: "财务报表", path: "financeList" },
        { name: "数据可视化", path: "visual" },
      ],
    },
    {
      name: "管理员管理",
      icon: UserOutlined,
      children: [
        { name: "管理员列表", path: "ManagerList" },
        { name: "人员管理", path: "Manager" },
      ],
    },
  ]);
  //遍历设置菜单数据
  const menuItems2: MenuProps["items"] = menuItems.map((items, index) => {
    const key = String(index + 1);

    return {
      key: `lv1${key}`,
      icon: React.createElement(items.icon),
      label: ` ${items.name}`,

      children: items.children.map((childrenItems, childrenIndex) => {
        const subKey = childrenItems.path;
        return {
          key: subKey,
          label: `${childrenItems.name}`,
        };
      }),
    };
  });
  //设置菜单点击事件
  function menuClick({ item, key, keyPath, selectedKeys, domEvent }) {
    console.log('items',item, 'key',key, 'keyPath',keyPath, 'selectedKeys',selectedKeys, 'domEvent',domEvent,item.props.children[keyPath[0]-1]);
    navigate(`/Main/${keyPath[0]}`)

  }
  return (
    <div>
      {/* 头部 */}
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#031429",
            color: "white",
            fontSize: "16px",
          }}
        >
          <span style={{ marginLeft: "50px" }}>宏粤会计信息系统</span>
        </Header>
      </Layout>
      {/* 侧边栏 */}
      <Layout style={{ height: "100vh" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={menuItems2}
            onSelect={menuClick}
          />
        </Sider>
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </div>
          </Content>
          {/* 底部 */}
          <Footer style={{ textAlign: "center" }}>
            accounting System created by xiaolai
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainPage;