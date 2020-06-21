import React, { Component } from "react";
import { Layout, Menu, Select } from "antd";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";

const { Option } = Select;

const { Header } = Layout;

class Navbar extends Component {
  render() {
    return (
      <Header
        className="site-layout-background"
        style={{ padding: 0, textAlign: "right" }}
      >
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[""]}>
          <Menu.Item key="1" icon={<SettingOutlined />}>
            Konto
          </Menu.Item>
          <Menu.Item key="2" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

Navbar.defaultProps = {
  appName: "preclarka",
};

export default Navbar;
