import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      msg: "",
    };
  }

  validate = (creds) => {
    if (creds.email !== undefined && creds.email !== "") {
      if (creds.password && creds.password !== "") {
        this.setState({ ...this.state, msg: "" });
        return true;
      } else {
        this.setState({ ...this.state, msg: "Please enter your password" });
        return false;
      }
    } else {
      this.setState({ ...this.state, msg: "Please enter your email address" });
      return false;
    }
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();

  auth = (creds) => {
    axios({
      method: "post",
      url: "/api/auth",
      cancelToken: this.source.token,
      data: creds,
    })
      .then((res) => {
        this.props.readUser(res.data);
        this.setState({
          email: "",
          password: "",
          msg: "",
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          this.setState({ ...this.state, msg: "Request cancelled" });
        } else {
          if (err.response) {
            if (err.response.status === 400) {
              this.setState({ ...this.state, msg: err.response.data.msg });
            } else if (err.response.status === 500) {
              this.setState({
                ...this.state,
                msg: "Can't seem to reach the server at the moment!",
              });
            }
          } else {
            console.log({ err });
            this.setState({ ...this.state, msg: err.message });
          }
        }
      });
  };

  componentWillUnmount() {
    this.source.cancel("Request cancelled");
  }

  onSubmit = (e) => {
    e.preventDefault();
    const creds = {
      email: this.state.email,
      password: this.state.password,
    };
    if (this.validate(creds)) {
      this.auth(creds);
    }
  };

  onEmailChange = (e) =>
    this.setState({ ...this.state, email: e.target.value });
  onPasswordChange = (e) =>
    this.setState({ ...this.state, password: e.target.value });

  render() {
    const auth = this.props.auth;

    function Auth(props) {
      if (auth) {
        return <Redirect to="/update" />;
      }
      return null;
    }

    return (
      <React.Fragment>
        <Auth />

        <ul className="nav nav-tabs mb-5">
          <li className="nav-item">
            <Link className="nav-link active" to="/">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
        </ul>

        <div
          hidden={this.state.msg === "" ? true : false}
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {this.state.msg}
        </div>

        <form onSubmit={this.onSubmit} className="mb-5" id="form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              onChange={this.onEmailChange}
              value={this.state.email}
              className="form-control"
              aria-describedby="emailHelp"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={this.onPasswordChange}
              value={this.state.password}
              className="form-control"
              aria-describedby="passwordHelp"
            />
            <small id="passwordHelp" className="form-text text-muted">
              <span style={{ color: "blue" }}>Forgot password?</span> is not
              available at the moment
            </small>
          </div>
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </React.Fragment>
    );
  }
}
