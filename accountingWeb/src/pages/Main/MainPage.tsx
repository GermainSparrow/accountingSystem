import React, { useState, useEffect } from "react";
import { MenuProps, message } from "antd";
import { UserOutlined, LaptopOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, Radio, Button } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Form from "../Tools/From";
import Container from "../Tools/Container";
import "./MainPage.scss";
const { Header, Content, Footer, Sider } = Layout;

const MainPage: React.FC = () => {
  //获取路由
  const location = useLocation();

  //设置中间切换按钮依赖数据
  const [activeKey, setActiveKey] = useState(true);
  const [activeKey2, setActiveKey2] = useState(false);
  const [activeKey3, setActiveKey3] = useState("financeList");
  //默认选中备用金表展示
  const [selectedKey, setSelectedKey] = useState("financeList");
  //设置默认选中的按钮依赖menuop
  const [selectedKeys, setSelectedKeys] = useState(["financeList"]);
  const [open, setOpen] = useState(["sub1"]);
  const [activeKey4, setActiveKey4] = useState(false);

  //中间三按钮事件
  function changeMenu(key: string) {
    setSelectedKey(key);
    if (localStorage.getItem("token")) {
      navigate(`/Main/${key}`);
    } else {
      navigate("/");
      message.error("请先登录");
    }
    setActiveKey3(key);
    setActiveKey2(false);
  }
  const menuClick2 = (e: any) => {
    switch (e.target.innerText) {
      case "个人信息": {
        break;
      }
      case "切换用户": {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("auth");
        navigate("/");
      }
    }
  };
  //设置useEffect 刷新设置key
  useEffect(() => {
    let path = location.pathname.substring(6, location.pathname.length);
    setSelectedKeys([`${path}`]);
    path == "financeList" || path == "visual"
      ? setOpen(() => {
        let temp = ["sub1"];

        return temp;
      })
      : setOpen(() => {
        let temp = ["sub2"];
        return temp;
      });

    localStorage.getItem("auth") ? setActiveKey4(true) : null;
  }, []);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  //菜单数据
  const [menuItems, setMenuItems] = useState([
    {
      name: "财务管理",
      icon: LaptopOutlined,
      key: "sub1",
      children: [
        { name: "财务报表", path: "financeList" },
        { name: "数据可视化", path: "visual" },
      ],
    },
    {
      name: "管理员管理",
      icon: UserOutlined,
      key: "sub2",
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
      key: `${items.key}`,
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
  function menuClick({ item, key, keyPath, selectedKeys, domEvent, openKeys }) {
    setSelectedKeys(selectedKeys);
    if (keyPath[0].trim() == "financeList") {
      setSelectedKey("financeList");
      setActiveKey(true);
    } else {
      setActiveKey(false);
    }

    navigate(`/Main/${keyPath[0]}`);
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
          <div className="personalBox">
            <span>Welcome {localStorage.getItem("user")}</span>
            <div className="userMenu" id="userMenu">
              <ul
                onClick={(e) => {
                  menuClick2(e);
                }}
              >
                <li>
                  <Button size="small" type="text">
                    个人信息
                  </Button>
                </li>
                <li>
                  <Button size="small" type="text">
                    切换用户
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </Header>
      </Layout>
      {/* 侧边栏 */}
      <Layout style={{}}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
          }}
          onCollapse={(collapsed, type) => {
          }}
        >
          <div className="logo" />
          <Menu
            mode="inline"
            style={{ height: "100%", borderRight: 0 }}
            items={menuItems2}
            defaultOpenKeys={open}
            selectedKeys={selectedKeys}
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
                overflow: "hidden",
              }}
            >
              <Container isShow={activeKey}>
                <div>
                  <Radio.Group
                    value={selectedKey}
                    onChange={(e) => changeMenu(e.target.value)}
                    style={{
                      position: "relative",
                      left: "45%",
                      translate: "-70%",
                      marginBottom: "16px",
                    }}
                  >
                    <Radio.Button value="financeList">备用金明细</Radio.Button>
                    <Radio.Button value="oil">油品销售表</Radio.Button>
                    <Radio.Button value="waveBox">波箱维修表</Radio.Button>
                    <Radio.Button value="cash">每日现金表</Radio.Button>
                  </Radio.Group>

                  {/* 控制组件 */}
                  <Container
                    isShow={activeKey4}
                    style={{
                      float: "left",
                    }}
                  >
                    <Button
                      onClick={() => {
                        setActiveKey2(!activeKey2);
                      }}
                    >
                      {" "}
                      点击添加/查询
                    </Button>
                  </Container>
                  <Container isShow={activeKey2}>
                    <Form x={activeKey3} setShow={setActiveKey2} />
                  </Container>
                </div>
              </Container>
              {/* 路由出口 */}
              <Outlet />
              <div style={{ clear: "both" }}></div>
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
