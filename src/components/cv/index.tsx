import React, { FC, useContext, useLayoutEffect, useState } from "react"
import "./cv.scss"
import { Bingo } from "./bingo"
import { TimeMachine } from "./time-machine"
import { SpaceInvaders } from "./space-invaders"
import { AchievementContext } from "../achievements"

const cells = {
  languages: [
    "JavaScript",
    "TypeScript",
    "PHP",
    "Python",
    "Dart",
    "Pascal",
    "C++",
    "CSS/SCSS",
  ],
  frameworks: [
    "ExpressJS",
    "NestJS",
    "React",
    "React Native",
    "Jest",
    "Flutter",
    "Symfony",
    "Laravel",
  ],
  libraries: ["NodeJS"],
  databases: ["MySQL", "PostGresSQL", "MongoDB", "DynamoDB"],
  protocols: [
    "I2C",
    "SPI",
    "AMQP",
    "MQTT",
    "HTTP",
    "HTTPS",
    "WS",
    "WSS",
    "SOAP",
    "JWT",
    "RPC",
    "gRPC",
    "TCP",
  ],
  "cloud platforms": ["AWS", "Google Cloud Platform"],
  methodologies: ["REST", "SOLID", "IaaS", "IaC", "IoT", "Serverless"],
}

const WhatIKnow: FC<{ searchPhrase: string }> = ({ searchPhrase }) => {
  const colours = ["primary", "danger", "warning", "info", "link"]
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const mobileSize = 768

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth <= mobileSize) setIsMobile(true)
      else setIsMobile(false)
    }

    window.addEventListener("resize", updateSize)
    updateSize()
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return (
    <div id="what-i-know" className={`hero is-black`}>
      <div className="hero-body">
        <div className="container">
          <div
            className={`grid is-col-min-12 is-row-gap-6${searchPhrase !== "" ? " searching" : ""}${isMobile ? " is-mobile" : ""}`}
          >
            {Object.keys(cells).map(key => (
              <div
                className={`cell${cells[key].some(word => word.toLowerCase().includes(searchPhrase.toLowerCase())) ? " is-active" : ""}`}
                key={key}
              >
                <h4
                  className={`subtitle has-text-${colours[Math.floor(Math.random() * (colours.length - 1 + 1))]} ${cells[key].some(word => word.toLowerCase().includes(searchPhrase.toLowerCase())) ? "highlighted" : ""}`}
                >
                  {key}
                </h4>
                <ul>
                  {cells[key].map(word => (
                    <li
                      className={
                        word.toLowerCase().includes(searchPhrase.toLowerCase())
                          ? "highlighted"
                          : ""
                      }
                      key={`${key}-${word}`}
                    >
                      {word}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const CV = () => {
  const [searchPhrase, setSearchPhrase] = useState<string>("")
  const [bingoEnabled, setBingoEnabled] = useState<boolean>(false)
  const [gameActive, setGameActive] = useState<boolean>(false)

  const { addAchievement } = useContext(AchievementContext)

  const allWords = Object.values(cells).flat(1)

  return (
    <>
      <Bingo
        isActive={bingoEnabled}
        setBingoEnabled={setBingoEnabled}
        words={Object.values(cells).flat(1)}
      />
      <div className={`cv-section ${gameActive ? "game-active" : ""}`}>
        {!gameActive && (
          <>
            <div className="hero is-black">
              <div className="hero-body"></div>
            </div>
            <div className="navbar is-black">
              <div className="container">
                <h3 className="title">What do I know?</h3>
                <div className="navbar-end">
                  <div className="navbar-item">
                    <form onSubmit={(event) => event.preventDefault()}>
                      <div className="field">
                        <div className="control">
                          <input
                            className="input search"
                            placeholder="Search..."
                            value={searchPhrase}
                            onChange={event => {
                              addAchievement({
                                title: "Search...",
                                description:
                                  "You used the search highlight feature to find out what I know quicker.",
                              })
                              setSearchPhrase(event.target.value)
                            }}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="navbar-item">
                    <button
                      className="button is-primary"
                      onClick={() => setGameActive(true)}
                    >
                      Space Invaders
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {gameActive ? (
          <SpaceInvaders words={allWords} onGameEnd={() => setGameActive(false)} />
        ) : (
          <WhatIKnow searchPhrase={searchPhrase} />
        )}
      </div>
      <section className="hero is-timemachine">
        <div className="hero-body">
          <div className="timemachine-container">
            <h1 className="title is-size-1 has-text-centered mt-6 mb-6 has-text-white">
              Where have I been all your life?
            </h1>
            <TimeMachine />
          </div>
        </div>
      </section>
    </>
  )
}
