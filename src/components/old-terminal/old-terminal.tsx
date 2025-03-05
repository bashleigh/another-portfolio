import React, { useState, useRef, useEffect } from "react"
import "./old-terminal.scss"

export const OldTerminal = () => {
  const [lines, setLines] = useState<string[]>(["test", "test", "again"])
  const [cariage, setCariage] = useState<string>("")

  const inputElement = useRef<HTMLInputElement>()

  useEffect(() => {
    inputElement.current?.focus()
  }, [inputElement])

  return (
    <div id="old-terminal" className="is-fullscreen">
      <img className="monitor-image" src="/images/monitor.png" />
      <div className="boot-screen">
        <div>
          <h1 className="title is-size-1">AshleighOS</h1>
        </div>
        <p>2025© - v2.0.1 - London</p>
      </div>
      <div
        className="screen"
        onClick={() => {
          console.log("inputElement", inputElement)
          inputElement.current?.focus()
        }}
      >
        <form
          className="text-input"
          onSubmit={event => {
            event.preventDefault()
            setLines([...lines, cariage])
            setCariage("")
          }}
        >
          <span>$&gt;</span>
          <input
            name=""
            autoCorrect="off"
            autoCapitalize="none"
            autoComplete="off"
            autoFocus={true}
            onChange={event => {
              const input = event.target.value
              setCariage(input)
            }}
            value={cariage}
            ref={inputElement}
          />
          <span
            className="cursor"
            style={{ left: `${cariage.length * 10 + 25}px` }}
          ></span>
        </form>
        <div className="content">
          {lines.map(line => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
