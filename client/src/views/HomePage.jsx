import React, { Component } from "react";
// import UserCard from "../components/UsersCard/UsersCard";
import Navbar from "../components/Navbar/Navbar";
import Navbargroup from "../components/Navbar/Navbargroup";
import OrdersTable from "../components/Tables/OrdersTable";

import { Button, Card } from "antd";

const outside = { Component: <Card>abc</Card> };

class HomePage extends Component {
  render() {
    return (
      <>
        {/* <Navbar
          className="bg-red">
          </Navbar> */}

        {/* <Navbargroup align="left">Hello</Navbargroup> */}

        {/* <div>Welcome home</div> */}
        {/* {outside.Component} */}
        {/* <UserCard height={240}></UserCard> */}
        <OrdersTable></OrdersTable>
      </>
    );
  }
}

export default HomePage;
