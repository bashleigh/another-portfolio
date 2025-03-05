import React from "react"
import "./nav.scss"
import { openContact } from "./contact"

export const Nav = () => (
  <div className="navbar-container">
    <nav className="navbar is-main">
      <a className="nav-item" href="#about-me">
        About Me
      </a>
      <a className="nav-item" href="#my-work">
        My Work
      </a>
      <a
        className="nav-item button is-primary is-rounded"
        href="#contact"
        onClick={event => {
          event.preventDefault()
          openContact()
        }}
      >
        Contact Me
      </a>
    </nav>
  </div>
)
