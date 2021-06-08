import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav id="navbar">
        <ul>
          <li className="logo">
            <Link to="/">JFLAP</Link>
            {/* <a href="#home">JFLAP</a> */}
          </li>
          <li>
            <Link to="/">Home</Link>

            {/* <a href="#home">Home</a> */}
          </li>
          <li>{/* <a href="#home">Home</a> */}</li>
          <li>
            <Link to="/team">Team</Link>

            {/* <a href="#team">Team</a> */}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
