import React, { useEffect, useState } from "react";
import "./contact.scss";
import { validateEmail } from "./validation";

const Message = ({ message, receipient }: Message) => (
  <div
    className={`message-container${
      receipient === "bot" ? " is-bot" : " is-user"
    }`}
  >
    <div className="message-avatar-container">
      <div className="message-avatar"></div>
    </div>
    <div className={`message${receipient === "bot" ? " is-bot" : " is-user"}`}>
      <p>{message}</p>
    </div>
  </div>
);

enum Receipient {
  BOT = "bot",
  USER = "user",
}

enum MessageType {
  GENERIC = "generic",
  NAME = "name",
  GREETING = "greeting",
  EMAIL = "email",
  BODY = "body",
}

type Message = {
  receipient: Receipient;
  message: string;
  sentAt: Date;
  type: MessageType;
};

export const Contact = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [name, setName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [emailCheck, setEmailCheck] = useState<boolean>(false);
  const [body, setBody] = useState<string | undefined>();
  const [input, setInput] = useState<string | undefined>();

  const stage =
    name && email && body
      ? "ready"
      : name && email
      ? "body"
      : name
      ? "email"
      : "name";

  const addBotMessage = (toSend: { message: string; type?: MessageType }[]) => {
    setIsTyping(true);

    setTimeout(() => {
      setMessages([
        ...messages,
        ...toSend.map(({ message, type }) => ({
          message,
          receipient: Receipient.BOT,
          sentAt: new Date(),
          type: type || MessageType.GENERIC,
        })),
      ]);
      setIsTyping(false);
    }, 2000);
  };

  useEffect(() => {
    if (messages.length === 0 && !isTyping) {
      addBotMessage([
        {
          message:
            "Hey Stranger! 👋  I'm Ashleigh-BOT, Ashleigh is currently busy or asleep. I'll help you with contacting her.",
          type: MessageType.GREETING,
        },
        {
          message: "What's your name? I can't keep calling you stranger...",
          type: MessageType.NAME,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    console.log("effect", stage, email, !email, emailCheck);
    if (messages.length >= 2) {
      if (
        stage === "email" &&
        messages.find(message => message.type === MessageType.NAME) &&
        !messages.find(message => message.type === MessageType.EMAIL)
      ) {
        addBotMessage([
          { message: `Cool! Thanks, ${name.split(" ").shift()}` },
          { message: "What's your email address?", type: MessageType.EMAIL },
        ]);
      } else if (stage === "body" && email && emailCheck) {
        console.log("email", email, validateEmail(email));

        if (!validateEmail(email)) {
          setEmailCheck(false);
          addBotMessage([
            { message: "Doesn't look like that email is correct?" },
          ]);
          return;
        }

        setEmailCheck(false);
        addBotMessage([
          { message: `Cool Thanks, ${name.split(" ").shift()}` },
          {
            message:
              "Now just write your message and let me know when you're ready to send!",
          },
        ]);
      }
    }
  }, [messages]);

  const addUserMessage = (message: string) => {
    console.log("stage", stage);
    switch (stage) {
      case "name":
        setName(message);
        setMessages([
          ...messages,
          {
            message,
            type: MessageType.NAME,
            sentAt: new Date(),
            receipient: Receipient.USER,
          },
        ]);
        break;
      case "email":
        setEmail(message);
        setEmailCheck(true);
        setMessages([
          ...messages,
          {
            message,
            type: MessageType.EMAIL,
            sentAt: new Date(),
            receipient: Receipient.USER,
          },
        ]);
        break;

      default:
        setMessages([
          ...messages,
          {
            message,
            type: MessageType.GENERIC,
            sentAt: new Date(),
            receipient: Receipient.USER,
          },
        ]);
    }
  };

  return (
    <div id="contact">
      <div className="contact-header">Ashleigh-Bot</div>
      <div className="contact-body">
        {messages.map((message, index) => (
          <Message {...message} key={`message-${index}`} />
        ))}
        <div className={`typing-indicator${isTyping ? " is-active" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="message-content">
        <div className="field">
          <div className="control has-icons">
            <form
              onSubmit={event => {
                event.preventDefault();

                if (input === "" || !input) {
                  return;
                }
                addUserMessage(input);
                setInput(undefined);
              }}
            >
              <textarea
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    if (input === "" || !input) {
                      return;
                    }
                    addUserMessage(input);
                    setInput("");
                  }
                }}
                onChange={event => {
                  setInput(event.target.value);
                }}
                value={input}
              />
            </form>
            <div className="icon is-right"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
