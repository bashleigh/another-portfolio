import React, { useState } from "react";
import "./terminal.scss";

const facts = (
  <>
    <p className="has-text-weight-bold">Hello! I'm Ashleigh 🇬🇧</p>
    <br />
    <p>Here's some facts about me:</p>
    <ul>
      <li className="is-rainbow-red">✅ Web Developer</li>
      <li className="is-rainbow-orange">✅ App Developer</li>
      <li className="is-rainbow-yellow">✅ TypeScript Expert</li>
      <li className="is-rainbow-green">✅ Backend Specialist</li>
      <li className="is-rainbow-blue">✅ EPOS Builder</li>
      <li className="is-rainbow-violet">
        ✅ Football Fanatic ⚽ (viva Biancazzurri!){" "}
      </li>
    </ul>
    <br />
  </>
);

const commands: {
  [s: string]: (values: {
    input: string[];
    output: LineOut[];
    setOutput: (out: LineOut[]) => void;
  }) => void;
} = {
  hello: ({ input, output, setOutput }) => {
    if (input[0] && input[0] === "--help") {
      setOutput([
        ...output,
        { text: "Hello command" },
        { text: "returns a greeting" },
        { text: "hello [name]" },
        { text: "" },
        { text: 'hello Bob: returns "Hello Bob"' },
      ]);
    }
    setOutput([...output, { text: `Hello! ${input[0] || ""}` }]);
  },
  commands: ({ output, setOutput }) => {
    setOutput([
      ...output,
      { text: "Commands available:", bold: true },
      { text: " " },
      ...Object.keys(commands).map(key => ({ text: key })),
    ]);
  },
  echo: ({ input, output, setOutput }) =>
    setOutput([...output, { text: input.join(" ") }]),
  kill: ({ output, setOutput }) =>
    setOutput([
      ...output,
      { text: "goodbye curel world! 💀", class: "is-rainbow-red" },
    ]),
  clear: ({ setOutput }) => {
    setOutput([] as LineOut[]);
  },
  facts: ({ setOutput, output }) => {
    setOutput([...output, facts]);
  },
  //   neofetch: () => [
  // "               +",
  // "               #",
  // "              ###",
  // "             #####            Arsh leignux",
  // "             ######           ",
  // "            ; #####;          ",
  // "           +##.#####          ",
  // "          +##########         ",
  // "         #############;       ",
  // "        ###############+     ",
  // "       #######   #######      ",
  // "     .######;     ;###;`\".      ",
  // "    .#######;     ;#####.       ",
  // "    #########.   .########`     ",
  // "   ######'           '######    ",
  // "  ;####                 ####;   ",
  // "  ##'                     '##   ",
  // " #'                         `#",
  //   ].map(lin => <p>{lin}</p>),
};

const runCommand = ({
  input,
  setOutput,
  output,
}: {
  input: string;
  setOutput: (lines: LineOut[]) => void;
  output: LineOut[];
}): void => {
  if (input === "") {
    setOutput([...output, { text: "" }]);
  }

  const inputs = input.split(" ");
  if (!inputs[0] || !Object.keys(commands).includes(inputs[0])) {
    setOutput([...output, { text: `command: "${inputs[0]}" not found` }]);
    return;
  }

  output.push({ text: `❯ ${input}`, class: "is-rainbow-green" });

  commands[inputs.shift()]({ input: inputs, setOutput, output });
};
type TextLine = { text: string; class?: string; bold?: boolean };
type LineOut = TextLine | JSX.Element;

const isJsxElement = (value: LineOut): value is JSX.Element =>
  value.hasOwnProperty("type");

export const Terminal = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<LineOut[]>([
    facts,
    <p className="text-info">
      Type "commands" into the terminal window and hit enter to see all commands
    </p>,
  ]);
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
        {output.map((line, index) =>
          isJsxElement(line) ? (
            <div key={`output-line-${index}`}>{line}</div>
          ) : (
            <p
              key={`${line}-${index}`}
              className={[line.class, line.bold ? "has-text-bold" : ""].join(
                " "
              )}
            >
              {line.text}
            </p>
          )
        )}
        <br />
        <div className="terminal-control">
          <form
            className="terminal-input"
            onSubmit={event => {
              event.preventDefault();
              runCommand({ input, output, setOutput });
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
