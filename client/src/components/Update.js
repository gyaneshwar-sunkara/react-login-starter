import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default class Update extends Component {
  constructor(props) {
    super(props);
    const { name, email } = this.props.user;
    this.state = { name, email, err: "", msg: "" };
  }

  validate = (creds) => {
    if (
      creds.name !== this.props.user.name ||
      creds.email !== this.props.user.email
    ) {
      return true;
    } else {
      this.setState({ ...this.state, err: "Modify a field to update" });
      return false;
    }
  };

  update = (creds) => {
    axios({
      method: "patch",
      url: "/api/users",
      data: creds,
      headers: {
        "x-auth-token": this.props.user.token,
      },
    })
      .then((res) => {
        this.setState({ ...this.state, msg: "Updated Successfully!" });
        setTimeout(() => {
          this.props.updateUser(res.data);
          this.setState({ ...this.state, msg: "" });
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

  onNameChange = (e) =>
    this.setState({ ...this.state, name: e.target.value, err: "" });
  onEmailChange = (e) =>
    this.setState({ ...this.state, email: e.target.value, err: "" });

  onSubmit = (e) => {
    e.preventDefault();
    const creds = {
      name: this.state.name,
      email: this.state.email,
    };
    if (this.validate(creds)) {
      this.update(creds);
    }
  };

  render() {
    const { name, email, err, msg } = this.state;
    const { auth } = this.props.user;

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
            <Link className="nav-link active" to="/update">
              Update
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/delete">
              Delete
            </Link>
          </li>
        </ul>

        <div
          hidden={err === "" ? true : false}
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {err}
        </div>

        <div>
          <h1 className="h5 mb-3">Hello {name}, </h1>
          <p className="mb-3">You can edit your details here </p>
        </div>

        <form onSubmit={this.onSubmit} id="form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={this.onNameChange}
              value={name}
              className="form-control mb-3"
            />
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
            <small id="emailHelp" className="form-text text-muted mb-3">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div
            hidden={msg === "" ? true : false}
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            {msg}
          </div>
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </React.Fragment>
    );
  }
}
