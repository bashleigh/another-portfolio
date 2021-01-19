import React, { useState } from "react";
import "./contact.scss";

export const Contact = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <div className={`overlay${isActive ? " is-active" : ""}`}></div>
      <div id="contact" className={isActive ? "is-active" : ""}>
        <div className="contact-header">
          <div>
            <h3 className="title is-1">Contact Me</h3>
            <h3 className="subtitle">Via AshleighBOT</h3>
          </div>
          <div className="">
            <a href="#">X</a>
          </div>
        </div>
        <div className="contact-body">
          <div className="contact-body-messages">
            <div className="message-input is-bot">
              <div className="message-avatar"></div>
              <div className="message-stack">
                <div className="message-bubble">
                  this is a test message for padding
                </div>
                <div className="message-bubble">
                  this is a test message for padding this is a test message for
                  padding
                </div>
              </div>
            </div>
            <div className="message-input is-user">
              <div className="message-avatar"></div>
              <div className="message-stack">
                <div className="message-bubble">
                  this is a test message for padding
                </div>
                <div className="message-bubble">
                  this is a test message for padding this is a test message for
                  padding
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-input">
          <textarea />
          <button className="button is-primary is-rounded">Send</button>
        </div>
      </div>
    </>
  );
};
