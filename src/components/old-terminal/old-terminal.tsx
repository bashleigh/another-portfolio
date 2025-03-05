import React, { useState, useRef, useEffect } from "react"
import "./old-terminal.scss"
import Typewriter from "typewriter-effect"

const initialLines = [
  "Hello",
  "Welcome to Ashleigh Simonelli's website",
  "",
  "",
  "I'm programs to help. Can I help in any way?",
]

const useTypewriter = (text, speed = 20) => {
  const [displayText, setDisplayText] = useState("")
  useEffect(() => {
    let i = 0

    const typeCharacter = () => {
      if (i < text.length) {
        setDisplayText(prevText => prevText + text.charAt(i))
        setTimeout(typeCharacter, speed)
      }
      i++
    }

    typeCharacter()
  }, [text, speed])

  return displayText
}

export const OldTerminal = () => {
  const [lines, setLines] = useState<string[]>([])
  const [cariage, setCariage] = useState<string>("")
  const [showBoot, setShowBoot] = useState<boolean>(true)

  const inputElement = useRef<HTMLInputElement>()

  useEffect(() => {
    inputElement.current?.focus()
  }, [inputElement])

  useEffect(() => {
    setTimeout(() => {
      setShowBoot(false)
    }, 5000)

    setTimeout(() => {
      setLines([...lines, "Hello"])
    }, 7000)
  }, [])

  return (
    <div id="old-terminal" className="is-fullscreen">
      <img className="monitor-image" src="/images/monitor.png" />
      <div className={`boot-screen${showBoot ? " show-boot" : ""}`}>
        <div>
          <h1 className="title is-size-1">AshleighOS</h1>
        </div>
        <p>2025© - v2.0.1 - London</p>
      </div>
      <div
        className={`screen${showBoot ? " off" : ""}`}
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
            <p key={line}>
              <Typewriter
                options={{
                  cursor: "",
                }}
                onInit={typewriter => {
                  typewriter.typeString(line).pauseFor(2500).start()
                }}
              />
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
