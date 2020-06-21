import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";
import "./Sidebar.css";
import logo from "../../images/logo.png";
import {
  TeamOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  CheckCircleOutlined,
  FormOutlined,
  ExclamationCircleOutlined,
  IssuesCloseOutlined,
  DollarCircleOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;

class Sidebar extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Sider
        className="mailSider"
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        width="250px"
      >
        <div style={{ height: "60px" }} className="logo">
          <img src={logo} alt="Smiley face" />
        </div>

        <Menu
          style={{ textAlign: "left" }}
          theme="dark"
          defaultSelectedKeys={[""]}
          mode="inline"
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Strona główna</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<SnippetsOutlined />}>
            <Link to="/multiplication">Mnożenie</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<PlusCircleOutlined />}>
            <Link to="/division">Dzielenie</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<FormOutlined />}>
            <Link to="/addition">Dodawanie</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<CheckCircleOutlined />}>
            <Link to="/subtraction">Odejmowanie</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<ExclamationCircleOutlined />}>
            <Link to="/addition-subtraction">Dodawanie i odejmowanie</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<TeamOutlined />}>
            <Link to="/multiplication-division">Dzielenie i mnożenie</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<TeamOutlined />}>
            <Link to="/all-math">Wszystko</Link>
          </Menu.Item>

          {/* 
          <SubMenu key="sub1" icon={<CopyOutlined />} title="Zamówienia">
            <Menu.Item key="3">Złóż zamówienie</Menu.Item>
            <Menu.Item key="4">Aktualnie realizowane</Menu.Item>
            <Menu.Item key="5">Zakończone</Menu.Item>
          </SubMenu> */}
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;
