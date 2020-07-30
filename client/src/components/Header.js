import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";

export default class Header extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarToggler onClick={this.toggle} />
            <NavbarBrand href="/">React login Starter</NavbarBrand>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem className="mr-5 mb-3 mt-3">
                  <Link style={linkStyle} to="/">
                    Home
                  </Link>
                </NavItem>
                <NavItem className="mb-3 mt-3">
                  <Link style={linkStyle} to="/about">
                    About
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

// Style
const linkStyle = {
  textDecoration: "none",
  color: "#fff",
};
