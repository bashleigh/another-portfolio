import React, { useRef, useState } from "react";
import "./terminal.scss";
import { openContact } from "./contact";

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
        ✅ Football Fanatic ⚽ (forza Biancazzurri!){" "}
      </li>
    </ul>
    <br />
  </>
);

const getCommandOptions = (string: string): string[] => {
  const options: string[] = [];
  string.split(" ").forEach(st => {
    if (st.includes("--")) {
      options.push(st.replace("--", ""));
    } else if (st.includes("-")) {
      st.replace("-", "")
        .split("")
        .forEach(s => options.push(s));
    }
  });

  return options;
};

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
        { text: "Hello command", bold: true },
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
      <img src="https://media.giphy.com/media/uC8SQoaY5EHhC/giphy.gif" />,
    ]),
  clear: ({ setOutput }) => {
    setOutput([] as LineOut[]);
  },
  facts: ({ setOutput, output }) => {
    setOutput([...output, facts]);
  },
  ls: ({ output, setOutput, input }) => {
    const options = getCommandOptions(input.join(" "));

    const results = ["/.", "/.."];
    if (options.includes("a")) {
      results.push(".cv.json");
    }

    return options.includes("l")
      ? setOutput([...output, ...results.map(re => ({ text: re }))])
      : setOutput([...output, { text: results.join(" ") }]);
  },
  cat: ({ output, setOutput, input }) => {
    if (input[0] === ".cv.json") {
      setOutput([
        ...output,
        { text: "you discovered my secret :O" },
        <a
          target="_blank"
          href="https://gist.github.com/bashleigh/3bdd8052db7617a9ca3b31976a8cffa0"
        >
          View my CV
        </a>,
      ]);
    }
  },
  git: ({ output, setOutput }) =>
    setOutput([...output, { text: "Bit rude..." }]),
  ssh: ({ output, setOutput }) =>
    setOutput([
      ...output,
      {
        text:
          "ermmmm.... don't think you can ssh into css I'm afraid. I'm just a pretty terminal window made out of HTML. Soz haxer, you canny hack meh 🙃",
      },
    ]),
  hacker: ({ output, setOutput }) =>
    setOutput([
      ...output,
      {
        text:
          "This is what my girlfriend says I look like. Don't know why, I don't code with bananas 🤷‍♀️",
      },
      <img src="https://media.giphy.com/media/YQitE4YNQNahy/giphy.gif" />,
    ]),
  info: ({ output, setOutput }) => {
    setOutput([
      <h1 className="title is-rainbow-text">Info</h1>,
      <h3 className="subtitle">Version 1.0.0</h3>,
      {
        text:
          "This little terminal window I built in a few hours (at 2am like a true programmer)",
        class: "is-rainbow-red",
      },
      <p className="is-rainbow-orange">
        Was pretty fun! Thinking of opening sourcing the terminal design and
        input,{" "}
        <a
          target="_blank"
          href="https://github.com/bashleigh/another-portfolio"
        >
          click here to check out the repo if you want!
        </a>
      </p>,
      <p className="is-rainbow-yellow">
        To find out more about me, <a href="#about-me">Click here</a>
      </p>,
      <p className="is-rainbow-green">
        To view my current projects and work <a href="#my-work">Click here</a>
      </p>,
      <p className="is-rainbow-blue">
        To get in concact{" "}
        <a href="#" onClick={() => openContact()}>
          Click here
        </a>
      </p>,
    ]);
  },
  contact: ({ output, setOutput }) => {
    setOutput([
      ...output,
      {
        text: "Opening contact window on port 3000...",
        class: "is-rainbow-green",
      },
    ]);

    setTimeout(() => openContact(), 1500);
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
    if (!input[0] || input[0] === "") {
      setOutput([...output, { text: `❯ ${input}`, class: "is-rainbow-green" }]);
      return;
    }

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
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [terminalHistoryPresses, setTerminalHistoryPresses] = useState<number>(
    0
  );

  const inputElement = useRef();

  return (
    <div id="terminal">
      <header className="terminal-header">
        <div className="terminal-header-buttons">
          <div className="terminal-button close"></div>
          <div className="terminal-button minimise"></div>
          <div className="terminal-button expand"></div>
        </div>
      </header>
      <div
        className="terminal-body"
        onClick={() => {
          // TODO focus on input
          // @ts-ignore
          inputElement.current.focus();
        }}
      >
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
              setTerminalHistory([...terminalHistory, input]);
              runCommand({ input, output, setOutput });
              setInput("");
            }}
          >
            <div className="field">
              <label className="label">~</label>

              <div className="control has-icons-left">
                <span className="icon is-left">❯</span>
                <input
                  className={`input ${commandExists ? " command-exists" : ""}`}
                  name=""
                  autoCorrect="off"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoFocus={true}
                  onChange={event => {
                    const input = event.target.value;
                    const command = input.split(" ").shift();
                    setCommandExists(Object.keys(commands).includes(command));
                    setInput(input);
                  }}
                  value={input}
                  ref={inputElement}
                  onKeyUp={event => {
                    if (event.key === "ArrowUp") {
                      // TODO cycle through history
                      setTerminalHistoryPresses(terminalHistoryPresses + 1);
                    }
                  }}
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
