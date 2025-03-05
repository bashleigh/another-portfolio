import React from "react"
import { Nav } from "./nav"
import { Phone } from "./phone"
import { RecruitmentNotifier } from "./recruitment"
import { Terminal } from "./terminal"

export const Hero = () => (
  <div id="main" className="hero is-fullheight is-primary">
    <div className="hero-body">
      <div className="container">
        <div className="columns is-centered is-vcentered">
          <div className="column is-narrow">
            <Phone />
          </div>
          <div className="column is-narrow">
            <div>
              <RecruitmentNotifier />
              <Terminal />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Nav />
  </div>
)
