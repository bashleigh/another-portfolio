import React from "react";
import { Terminal } from "./terminal";

export const Hero = () => (
  <div className="hero is-fullheight">
    <div className="hero-body">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-6">
            <Terminal />
          </div>
        </div>
      </div>
    </div>
  </div>
);
