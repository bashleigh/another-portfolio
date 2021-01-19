import React, { useState } from "react";
import "./contact.scss";

export let openContact;

export const Contact = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  openContact = () => setIsActive(!isActive);

  return (
    <>
      <div
        className={`overlay${isActive ? " is-active" : ""}`}
        onClick={() => {
          setIsActive(!isActive);
        }}
      ></div>
      <div id="contact" className={isActive ? "is-active" : ""}>
        <div className="contact-header">
          <div>
            <h3 className="title is-1">Contact Me</h3>
            <h3 className="subtitle">Via AshleighBOT</h3>
          </div>
          <div className="close-button">
            <a
              href="#"
              onClick={event => {
                event.preventDefault();
                setIsActive(!isActive);
              }}
            >
              &times;
            </a>
          </div>
        </div>
        <div className="contact-body">
          <div className="contact-body-messages">
            <div className="message-input is-bot">
              <div className="message-avatar"></div>
              <div className="message-stack">
                <div className="message-bubble">
                  Not quite ready to take messages yet!
                </div>
                <img className="message-bubble" src="https://media.giphy.com/media/PiQejEf31116URju4V/giphy.gif" />
                <div className="message-bubble">
                  I'm working on it! :d come back in a few day!
                </div>
              </div>
            </div>
            {/* <div className="message-input is-user">
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
            </div> */}
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
