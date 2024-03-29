import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

import "./index.scss"

export default function Navigation() {
  const token = useSelector(selectToken);
  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar bg="light" expand="lg">
      <span className="navbar-border"></span>
      <Navbar.Brand 
      classname="Brand name"
      as={NavLink} 
      to="/"
      >
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill>
          <NavbarItem path="/" linkText="Home" />
          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
