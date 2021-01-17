import React from "react";
import "./terminal.scss";

export const Terminal = () => (
  <div id="terminal">
    <header className="terminal-header">
      <div className="terminal-header-buttons">
        <div className="terminal-button close"></div>
        <div className="terminal-button minimise"></div>
        <div className="terminal-button expand"></div>
      </div>
    </header>
    <div className="terminal-body">
      <div className="name-output">
        <p>__________ .__ .__ .__ .__ </p>
        <p>\______ \_____ _____| |__ | | ____ |__| ____ | |__ </p>
        <p>| | _/\__ \ / ___/ | \| | _/ __ \| |/ ___\| | \ </p>
        <p>| | \ / __ \_\___ \| Y \ |_\ ___/| / /_/ &gt; Y \</p>
        <p>|______ /(____ /____ &gt;___| /____/\___ &gt;__\___ /|___| /</p>
        <p>\/ \/ \/ \/ \/ /_____/ \/ </p>
        <p></p>
        <ul>
          <li>Web Developer</li>
        </ul>
      </div>
      <div className="terminal-control">
        <p>~</p>
        <p className="terminal-input">
          ❯ <span className="cursor"></span>
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
