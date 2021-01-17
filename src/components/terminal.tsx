import React, { useState } from "react";
import "./terminal.scss";

const commands: { [s: string]: (input: string[]) => string[] } = {
  hello: (input: string[]) => {
    if (input[0] && input[0] === "--help") {
      return [
        "Hello command",
        "returns a greeting",
        "hello [name]",
        "",
        'hello Bob: returns "Hello Bob"',
      ];
    }
    return [`Hello! ${input[0] || ""}`];
  },
  commands: (input: string[]) => [
    'Commands available:',
    ' ',
    'hello',
    'commands',
  ],
};

const runCommand = (input: string): string[] => {
  if (input === "") {
    return [""];
  }

  const inputs = input.split(" ");
  if (!inputs[0] || !Object.keys(commands).includes(inputs[0])) {
    return [`command: "${inputs[0]}" not found`];
  }

  return commands[inputs.shift()](inputs);
};

export const Terminal = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string[]>([]);
  const [commandExists, setCommandExists] = useState<boolean>(false);

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
        <p className="has-text-weight-bold">Hello! I'm Ashleigh 🇬🇧</p>
        <br />
        <p>Here's some facts about me:</p>
        <ul>
          <li className="is-rainbow-red">✅ Web Developer</li>
          <li className="is-rainbow-orange">✅ App Developer</li>
          <li className="is-rainbow-yellow">✅ TypeScript Expert</li>
          <li className="is-rainbow-green">✅ Backend Specialist</li>
          <li className="is-rainbow-blue">✅ EPOS Builder</li>
          <li className="is-rainbow-violet">✅ Football Fanatic ⚽ (viva Biancazzurri!) </li>
        </ul>
        <br />
        <p className="text-info">
          Type "hello" into the terminal window and hit enter
        </p>
        {output.map((txt, index) => (
          <p key={`${txt}-${index}`}>{txt}</p>
        ))}
        <br />
        <div className="terminal-control">
          <form
            className="terminal-input"
            onSubmit={event => {
              event.preventDefault();
              const result = runCommand(input);
              const command = `❯ ${input}`;
              setOutput([...output, command, ...result]);
              setInput("");
            }}
            onClick={() => {
              // TODO focus on input
            }}
          >
            <div className="field">
              <label className="label">~</label>

              <div className="control has-icons-left">
                <span className="icon is-left">❯</span>
                <input
                  className={`input ${commandExists ? " command-exists" : ""}`}
                  name=""
                  autoFocus={true}
                  onChange={event => {
                    const input = event.target.value;
                    const command = input.split(" ").shift();
                    setCommandExists(Object.keys(commands).includes(command));
                    setInput(input);
                  }}
                  value={input}
                />
                <span
                  className="cursor"
                  style={{ left: `${input.length * 10 + 15}px` }}
                ></span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <nav className="terminal-tmux-bar">
        <div className="screen">0</div>
        <div className="bar">zsh</div>
        <div className="battery">&hearts; 100%</div>
        <div className="name">Ashleigh's Laptop</div>
      </nav>
    </div>
  );
};
