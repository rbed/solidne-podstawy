import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../views/HomePage";
import Login from "../views/Login/Login";
import Register from "../views/Register/Register";
import Home from "../views/Home/Home";
import Multiplication from "./../views/Games/multiplication";
import Client from "../modules/Client/Client";

class Routes extends Component {
  state = {};

  // componentDidMount() {
  //   this.showUsers();
  // }

  // async showUsers() {
  //   const users = await Client.Services.UsersService.get(
  //     Client.API.ROUTES.Users
  //   );
  //   this.setState({ users: users.data });
  //   // console.log(JSON.stringify(users.data));
  // }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute
            exact
            path="/multiplication"
            component={Multiplication}
          />
          {/* <PrivateRoute exact path="" component={} /> */}
          {/* <PrivateRoute exact path="" component={} /> */}
          {/* <PrivateRoute exact path="" component={} /> */}
          {/* <PrivateRoute exact path="" component={} /> */}
          {/* <PrivateRoute exact path="" component={} /> */}
          <Route exact path="/homepage" component={HomePage} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
