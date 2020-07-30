import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      msg: "",
    };
  }

  validate = (creds) => {
    if (creds.name !== undefined && creds.name !== "") {
      if (creds.email !== undefined && creds.email !== "") {
        if (creds.password && creds.password !== "") {
          return true;
        } else {
          this.setState({ ...this.state, msg: "Please enter a password" });
          return false;
        }
      } else {
        this.setState({
          ...this.state,
          msg: "Please enter your email address",
        });
        return false;
      }
    } else {
      this.setState({ ...this.state, msg: "Please enter your name" });
      return false;
    }
  };

  register = (creds) => {
    axios
      .post("/api/users", creds)
      .then((res) => {
        this.props.readUser(res.data);
        this.setState({
          name: "",
          email: "",
          password: "",
          msg: "",
        });
      })
      .catch((err) => {
        if (err.response.status === 400) {
          this.setState({ ...this.state, msg: err.response.data.msg });
        } else if (err.response.status === 500) {
          this.setState({
            ...this.state,
            msg: "Can't seem to reach the server at the moment!",
          });
        }
      });
  };

  onNameChange = (e) => this.setState({ ...this.state, name: e.target.value });
  onEmailChange = (e) =>
    this.setState({ ...this.state, email: e.target.value });
  onPasswordChange = (e) =>
    this.setState({ ...this.state, password: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const creds = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    if (this.validate(creds)) {
      this.register(creds);
    }
  };

  render() {
    const { name, email, password, msg } = this.state;
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
            <Link className="nav-link" to="/">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/register">
              Register
            </Link>
          </li>
        </ul>

        <div
          hidden={msg === "" ? true : false}
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {msg}
        </div>

        <form onSubmit={this.onSubmit} id="form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={this.onNameChange}
              value={name}
              className="form-control"
              aria-describedby="nameHelp"
            />
            <small id="nameHelp" className="form-text text-muted">
              Eg: John Doe
            </small>
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              onChange={this.onEmailChange}
              value={email}
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
              value={password}
              className="form-control"
              minLength="6"
              aria-describedby="passwordHelp"
            />
            <small id="passwordHelp" className="form-text text-muted">
              Password should be more than 5 characters
            </small>
          </div>
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </React.Fragment>
    );
  }
}
