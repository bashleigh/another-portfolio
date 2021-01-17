import React from "react";
import "./nav.scss";

export const Nav = () => (
  <div className="navbar-container">
    <nav className="navbar">
      <a className="nav-item" href="#about">
        About Me
      </a>
      <a className="nav-item button is-primary" href="#contact">
        Contact Me
      </a>
      <a className="nav-item" href="#work">
        My Work
      </a>
    </nav>
  </div>
);
