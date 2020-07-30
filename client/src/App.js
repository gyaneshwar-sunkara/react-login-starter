import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import Update from "./components/Update";
import Delete from "./components/Delete";
import GenericNotFound from "./components/GenericNotFound";

import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      token: "xxx",
      auth: false,
    };
  }

  readUser = (userData) => {
    const { token, user } = userData;
    const { name, email } = user;
    const auth = true;
    this.setState({ name, email, token, auth });
  };

  updateUser = (userData) => {
    const { name, email } = userData.user;
    this.setState({ ...this.state, name, email });
  };

  deleteUser = () => {
    this.setState({ name: "", email: "", token: "xxx", auth: false });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="container-sm mt-5">
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Login auth={this.state.auth} readUser={this.readUser} />
                )}
              />
              <Route
                path="/register"
                render={(props) => (
                  <Register auth={this.state.auth} readUser={this.readUser} />
                )}
              />

              <Route
                path="/update"
                render={(props) => (
                  <Update
                    user={this.state}
                    updateUser={this.updateUser}
                    deleteUser={this.deleteUser}
                  />
                )}
              />
              <Route
                path="/delete"
                render={(props) => (
                  <Delete user={this.state} deleteUser={this.deleteUser} />
                )}
              />

              <Route path="/about" component={About} />
              <Route component={GenericNotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
