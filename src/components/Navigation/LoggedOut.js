import React from "react";
import NavbarItem from "./NavbarItem";
import "./index.scss"

export default function LoggedOut() {
  return (
    <>
      <NavbarItem path="/login" linkText="Login" />
    </>
  );
}
