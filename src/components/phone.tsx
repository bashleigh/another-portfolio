import React from "react";
import Ashleigh from "../images/ashleigh.svg";
import "./phone.scss";

export const Phone = () => (
  <div id="phone">
    <div className="inner-skin">
      <div className="phone-content">
        <h1 className="title">Hello There, Stranger!</h1>
        <Ashleigh className="bounce" />
        <h2 className="subtitle">Let's build together...</h2>
        <button className="button is-primary is-rounded">Let's Talk</button>
      </div>
    </div>
  </div>
);
