import React from "react"
import Ashleigh from "../images/ashleigh.svg"
import "./phone.scss"
import { openContact } from "./contact"

export const Phone = () => (
  <div id="phone">
    <div className="inner-skin">
      <div className="phone-content">
        <h1 className="title">Hello There, Stranger!</h1>
        <Ashleigh className="bounce" />
        <h2 className="subtitle">Let's build together...</h2>
        <button
          className="button has-rainbow-background has-text-white is-rounded"
          onClick={() => {
            openContact()
          }}
        >
          Let's Talk
        </button>
      </div>
    </div>
  </div>
)
