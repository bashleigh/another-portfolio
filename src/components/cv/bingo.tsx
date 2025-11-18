import React, { FC, useContext, useEffect, useRef, useState } from "react"
import "./bingo.scss"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import Confetti from "react-confetti"
import { AchievementContext } from "../achievements"

const BingoCard: FC<{
  words: [string, string, string]
  setSelectedValues: (val: string[]) => void
}> = ({ words, setSelectedValues }) => {
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    setSelectedValues(selected)
  }, [selected])

  return (
    <div className="bingo-card">
      {words.map(word => (
        <div
          onClick={() => {
            setSelected(selected => {
              return selected.includes(word)
                ? selected.filter(selected => selected !== word)
                : [...selected, word]
            })
          }}
          className={`word${selected.includes(word) ? " selected" : ""}`}
        >
          {word}
        </div>
      ))}
    </div>
  )
}

export const Bingo: FC<{
  isActive: boolean
  setBingoEnabled: (value: boolean) => void
  words: string[]
}> = ({ isActive, setBingoEnabled, words }) => {
  const [myCard, setMyCard] = useState<[string, string, string]>(["", "", ""])
  const [called, setCalled] = useState<string[]>([])
  const [state, setState] = useState<"intro" | "running" | "complete">("intro")
  const [mySelectedValues, setSelectedValues] = useState<string[] | undefined>()
  const [result, setResult] = useState<string | undefined>()
  const { addAchievement } = useContext(AchievementContext)

  const nextCallInt = 3000

  const intervalRef = useRef<any>()

  const start = () => {
    addAchievement({
      title: "Played Bingo",
      description:
        "Congratulations! You've played a game of Software Buzzword Bingo!",
    })
    setCalled([])
    const toSelect = [
      ...words
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value),
    ]
    const first = toSelect[Math.floor(Math.random() * toSelect.length)]
    const firstIndex = toSelect.findIndex(val => val === first)
    toSelect.splice(firstIndex, 1)
    const second = toSelect[Math.floor(Math.random() * toSelect.length)]
    const secondIndex = toSelect.findIndex(val => val === second)
    toSelect.splice(secondIndex, 1)
    const third = toSelect[Math.floor(Math.random() * toSelect.length)]

    setMyCard([first, second, third])
    setState("running")
  }

  const validateWinner = () => {
    setState("complete")
    clearTimeout(intervalRef.current)
    if (!mySelectedValues) return

    if (
      mySelectedValues?.every(selected => called.includes(selected)) &&
      mySelectedValues.length === 3
    ) {
      addAchievement({
        title: "Winner, Winner, Chicken Dinner!",
        description:
          "You're an absolute wiz at Software Buzzword Bingo! you've won a prize! It's this achievement. Don't be ungrateful!",
      })
      setResult("Winner")
    } else setResult("Loser")
  }

  useEffect(() => {
    if (state === "running")
      intervalRef.current = setInterval(() => {
        setCalled(previous => {
          if (previous.length === words.length) {
            validateWinner()
          }

          const pool = words.filter(word => !previous.includes(word))

          return [...previous, pool[Math.floor(Math.random() * pool.length)]]
        })
      }, nextCallInt)
  }, [state])

  const close = () => {
    setBingoEnabled(false)
    setState("intro")
    clearTimeout(intervalRef.current)
  }

  return (
    <div className={`modal${isActive ? " is-active" : ""}`}>
      <div className="modal-background" onClick={() => close()}></div>
      <div className="modal-card bingo">
        <header className="modal-card-head">
          <p className="modal-card-title">Software buzzword Bingo!</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => close()}
          ></button>
        </header>
        <section className="modal-card-body">
          {state === "running" ? (
            <div>
              <div className="columns">
                <div className="column">
                  <p>Previously called software buzzwords</p>
                  <div className="tags">
                    {called.map(word => (
                      <span
                        className="tag is-primary is-primary"
                        key={`bingo-called-${word}`}
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="column">
                  <div className="columns">
                    <div className="column">
                      <CountdownCircleTimer
                        key={called[called.length - 1]}
                        isPlaying
                        duration={nextCallInt / 1000}
                        colors={"#00FF00"}
                        trailColor={"#999999"}
                        size={50}
                      >
                        {({ remainingTime }) => remainingTime}
                      </CountdownCircleTimer>
                      <h1 className="title has-text-centered">
                        {called[called.length - 1]}
                      </h1>
                      <BingoCard
                        words={myCard}
                        setSelectedValues={setSelectedValues}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : state === "complete" ? (
            <>
              {result === "Winner" ? (
                <div>
                  <Confetti />
                  <h1 className="title has-text-centered">Winner!!</h1>
                </div>
              ) : (
                <div>
                  <h1 className="title has-text-centered">
                    Unfortunately, you lost.
                  </h1>
                </div>
              )}
            </>
          ) : (
            <p className="has-text-white has-text-centered">
              A Bingo card of 3 software buzzwords will be created. Every 3
              seconds a new buzzword will be called out. Check that your
              buzzwords have been called out. Highlight the called out buzzwords
              by clicking them. Once you have all 3, call bingo!
            </p>
          )}
        </section>
        <footer className="modal-card-foot">
          <div className="buttons">
            {state === "running" ? (
              <button
                className="button is-primary"
                onClick={() => validateWinner()}
              >
                BINGO!
              </button>
            ) : state === "complete" ? (
              <button
                className="button is-info"
                onClick={() => {
                  start()
                }}
              >
                Restart
              </button>
            ) : (
              <button onClick={() => start()} className="button is-primary">
                Start
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>
  )
}
