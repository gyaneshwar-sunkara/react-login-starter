import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = { err: "", msg: "" };
  }

  delete = () => {
    axios({
      method: "delete",
      url: "/api/users",
      headers: {
        "x-auth-token": this.props.user.token,
      },
    })
      .then((res) => {
        this.setState({
          ...this.state,
          msg: "Deleted Successfully! Redirecting...",
        });
        setTimeout(() => {
          this.props.deleteUser();
        }, 2000);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          this.setState({ ...this.state, err: err.response.data.msg });
        } else if (err.response.status === 500) {
          this.setState({
            ...this.state,
            err: "Can't seem to reach the server at the moment!",
          });
        }
      });
  };

  onClick = (e) => {
    this.delete();
  };

  render() {
    const { name, auth } = this.props.user;
    const { msg, err } = this.state;

    function Auth(props) {
      if (!auth) {
        return <Redirect to="/" />;
      }
      return null;
    }

    return (
      <React.Fragment>
        <Auth />
        <button
          onClick={this.props.deleteUser}
          className="btn btn-danger ml-5 float-right"
        >
          Logout
        </button>
        <ul className="nav nav-tabs mb-5">
          <li className="nav-item">
            <Link className="nav-link" to="/update">
              Update
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/delete">
              Delete
            </Link>
          </li>
        </ul>

        <div
          hidden={msg === "" ? true : false}
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {msg}
        </div>

        <div>
          <h1 className="h5 mb-3">Hello {name}, </h1>
          <p className="mb-3">
            Deleted account can not be retrieved, proceed if you are sure of it.
          </p>
        </div>

        <div
          hidden={err === "" ? true : false}
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {err}
        </div>

        <button onClick={this.onClick} className="btn btn-outline-danger mt-2">
          Delete Account Permanently
        </button>
      </React.Fragment>
    );
  }
}
