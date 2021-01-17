import React from "react";
import { Phone } from "./phone";
import { Terminal } from "./terminal";

export const Hero = () => (
  <div className="hero is-fullheight">
    <div className="hero-body">
      <div className="container">
        <div className="columns is-centered is-vcentered">
          <div className="column is-narrow">
            <Phone />
          </div>
          <div className="column is-narrow">
            <Terminal />
          </div>
        </div>
      </div>
    </div>
  </div>
);
