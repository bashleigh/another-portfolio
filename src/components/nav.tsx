import React from "react";
import "./nav.scss";

export const Nav = () => (
  <div className="navbar-container">
    <nav className="navbar">
      <a className="nav-item" href="#about-me">
        About Me
      </a>
      <a className="nav-item button is-primary is-rounded" href="#contact">
        Contact Me
      </a>
      <a className="nav-item" href="#my-work">
        My Work
      </a>
    </nav>
  </div>
);
