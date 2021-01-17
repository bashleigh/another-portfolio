import React, { useState } from "react";
import "./terminal.scss";

export const Terminal = () => {
  const [input, setInput] = useState<string>("");

  return (
    <div id="terminal">
      <header className="terminal-header">
        <div className="terminal-header-buttons">
          <div className="terminal-button close"></div>
          <div className="terminal-button minimise"></div>
          <div className="terminal-button expand"></div>
        </div>
      </header>
      <div className="terminal-body">
        <p className="has-text-weight-bold">Ashleigh Simonelli</p>
        <ul>
          <li>✅ Web Developer</li>
          <li>✅ App Developer</li>
          <li>✅ TypeScript Expert</li>
          <li>✅ Backend Specialist</li>
          <li>✅ EPOS Builder</li>
          <li>✅ Football Fanatic (viva Biancazzurri!) </li>
        </ul>
        <div className="terminal-control">
          <p className="terminal-input">
            <div className="field">
              <label className="label">~</label>

              <div className="control has-icons-left">
                <span className="icon is-left">❯</span>
                <input
                  className="input"
                  name=""
                  onChange={event => setInput(event.target.value)}
                  value={input}
                />
                <span
                  className="cursor"
                  style={{ left: `${input.length * 9.5 + 10}px` }}
                ></span>
              </div>
            </div>
          </p>
        </div>
      </div>
      <nav className="terminal-tmux-bar">
        <div className="screen">0</div>
        <div className="bar">zsh</div>
        <div className="battery">100%</div>
        <div className="name">Ashleigh's Laptop</div>
      </nav>
    </div>
  );
};
