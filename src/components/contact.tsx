import React, { useState } from "react";
import "./contact.scss";

export let openContact;

type Message = {
  body: string | JSX.Element;
  from: "user" | "bot";
};

export const Contact = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      body: "Not quite ready to take messages yet!",
      from: "bot",
    },
    {
      body: (
        <img
          className="message-bubble"
          src="https://media.giphy.com/media/PiQejEf31116URju4V/giphy.gif"
        />
      ),
      from: "bot",
    },
    {
      body: "I'm working on it! :d come back in a few weeks!",
      from: "bot",
    },
    {
      body: (
        <p className="message-bubble">
          You can contact me via{" "}
          <a href="https://www.facebook.com/ashleigh.simonelliWeb">Facebook</a>{" "}
          or{" "}
          <a href="https://www.linkedin.com/in/ashleigh-simonelli-01b5a1b6/">
            Linkedin
          </a>{" "}
          for now.
        </p>
      ),
      from: "bot",
    },
  ]);

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
            {messages
              .reduceRight<{ from: string; messages: Message[] }[]>(
                (blocks, message) => {
                  if (blocks.length === 0) {
                    blocks.push({
                      from: message.from,
                      messages: [message],
                    });
                    return blocks;
                  }

                  if (blocks[blocks.length - 1].from === message.from) {
                    blocks[blocks.length - 1].messages.unshift(message);
                  } else {
                    blocks.push({
                      from: message.from,
                      messages: [message],
                    });
                  }

                  return blocks;
                },
                []
              )
              .map((block, index) => (
                <div
                  className={`message-input is-${block.from}`}
                  key={`message-${index}`}
                >
                  <div className="message-avatar"></div>
                  <div className="message-stack">
                    {block.messages.map((message, messageIndex) =>
                      typeof message.body === "string" ? (
                        <div
                          key={`bubble-${messageIndex}-${index}`}
                          className="message-bubble"
                        >
                          {message.body}
                        </div>
                      ) : (
                        message.body
                      )
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <form
          className="contact-input"
          onSubmit={event => {
            event.preventDefault();
            setMessages([
              ...messages,
              {
                from: "user",
                body: message,
              },
            ]);
          }}
        >
          <textarea
            value={message}
            onChange={event => {
              setMessage(event.target.value);
            }}
          />
          <button className="button is-primary is-rounded">Send</button>
        </form>
      </div>
    </>
  );
};
