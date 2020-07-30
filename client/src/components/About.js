import React, { Component } from "react";

export default class About extends Component {
  render() {
    return (
      <div>
        <h1 className="font-weight-bold mb-3">
          Designed as an assignment for <span>Delicon</span>
        </h1>
        <p className="font-weight-normal mb-3 p-1">
          A Login/Registration page with CRUD functionalities
        </p>

        <h1 className="font-weight-bold mb-3">Live Server</h1>
        <a
          href="https://react-login-starter.herokuapp.com"
          className="page-link font-weight-light mb-3"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://react-login-starter.herokuapp.com
        </a>

        <h1 className="font-weight-bold mb-3">Github Repo</h1>
        <a
          href="https://github.com/gyani-sunkara/react-login-starter"
          className="page-link font-weight-normal mb-3"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/gyani-sunkara/react-login-starter
        </a>

        <h1 className="font-weight-bold mb-3">Developer</h1>
        <p className="font-weight-normal mb-1 p-1">Gyani Sunkara</p>
        <p className="font-weight-light mb-1 p-1">
          <span className="dark-gray">Phone: </span>8247490939
        </p>
        <p className="font-weight-light mb-1 p-1">
          <span className="dark-gray">Email: </span>gyanisunkara1@gmail.com
        </p>
      </div>
    );
  }
}
