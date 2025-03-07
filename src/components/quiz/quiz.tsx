import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import "./quiz.scss"

const Question: FC<{
  submit: (selectedAnswerIndex: number) => void
  title: string
  questionIndex: number
  answers: string[]
}> = ({ submit, questionIndex, title, answers }) => {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<
    number | undefined
  >()

  return (
    <div className="hero is-fullheight">
      <div className="hero-body is-justify-content-center">
        <div className="columns">
          <div className="column" style={{ width: "50vw" }}>
            <div className="container">
              <h3 className="title mb-6">
                {questionIndex}&#41; {title}
              </h3>
              <form
                onSubmit={event => {
                  console.log("submitted")
                  event.preventDefault()
                  if (typeof selectedAnswerIndex !== "undefined")
                    submit(selectedAnswerIndex)
                }}
              >
                <div className="field mb-6">
                  <div className="control">
                    <div className="radios is-flex-direction-column">
                      {answers.map((answer, index) => (
                        <label key={`${answer}-${index}`} className="radio">
                          <input
                            onChange={event => {
                              setSelectedAnswerIndex(index)
                            }}
                            className="radio mr-2"
                            type="radio"
                            name="answer"
                            value={answer}
                          />
                          {answer}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <div className="is-flex is-flex-direction-row is-justify-content-flex-end">
                      <button className="button is-primary">Next</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Quiz = () => {
  const [score, setScore] = useState<number>(0)
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const [calledMeOld, setCalledMeOld] = useState<boolean>(false)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [warning, setWarning] = useState<boolean>(false)
  const [warningCount, setWarningCount] = useState<number>(0)

  const quizRef = useRef<HTMLDivElement>()

  const reset = () => {
    setScore(0)
    setQuestionIndex(1)
    setCalledMeOld(false)
    setIsActive(true)
  }

  const handleScrollSnap = useCallback(
    event => {
      const window = event.currentTarget

      const topOfQuiz =
        document.body.scrollHeight - (quizRef.current?.offsetHeight || 0)
      const boundary = topOfQuiz - 300

      console.log("isActive", isActive)

      if (isActive && window.scrollY <= boundary) {
        window.scrollTo({
          top: topOfQuiz,
          behavior: "smooth",
        })
        setWarning(true)
      }
    },
    [quizRef, isActive],
  )

  useEffect(() => {
    console.log("isActive changed")
    if (warning) setWarningCount(warning => warning + 1)
  }, [warning])

  useEffect(() => {
    window.addEventListener("scroll", handleScrollSnap)

    return () => {
      window.removeEventListener("scroll", handleScrollSnap)
    }
  }, [handleScrollSnap])

  const questions = () => {
    switch (questionIndex) {
      case 0:
        return (
          <div className="hero-body">
            <div className="container">
              <div className="is-flex is-flex-direction-column is-justify-content-center">
                <h5 className="subtitle has-text-centered">The</h5>
                <h1 className="title has-text-centered">
                  Were you paying attention?
                </h1>
                <h3 className="subtitle has-text-centered">Quiz</h3>
                <div className="is-flex is-flex-direction-row is-justify-content-center mt-4">
                  <button
                    className="button is-primary"
                    onClick={() => {
                      setQuestionIndex(1)
                      setIsActive(true)
                    }}
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      case 1:
        return (
          <Question
            questionIndex={questionIndex}
            submit={selectedAnswerIndex => {
              if (selectedAnswerIndex === 2) setScore(score + 1)
              setQuestionIndex(questionIndex + 1)
            }}
            title="What is the correct spelling of my name?"
            answers={[
              "Ashley Siminelli",
              "Ashleigh Simonelly",
              "Ashleigh Simonelli",
              "Ashlee Semonilli",
            ]}
          />
        )
      case 2:
        return (
          <Question
            questionIndex={questionIndex}
            submit={selectedAnswerIndex => {
              if (selectedAnswerIndex === 3) setScore(score + 1)
              setQuestionIndex(questionIndex + 1)
            }}
            title="What language have I no experience with?"
            answers={["JavaScript", "Pascal", "Python", "COLBOT"]}
          />
        )
      case 3:
        return (
          <Question
            questionIndex={questionIndex}
            submit={selectedAnswerIndex => {
              if (selectedAnswerIndex === 0) setScore(score + 1)
              else if (selectedAnswerIndex === 3) {
                setScore(score - 1)
                setCalledMeOld(true)
              }
              setQuestionIndex(questionIndex + 1)
            }}
            title="What year did I start my career as a developer?"
            answers={["2015", "2016", "2017", "you're old"]}
          />
        )
      case 4:
        return (
          <Question
            questionIndex={questionIndex}
            submit={() => {
              setScore(score + 1)
              setQuestionIndex(questionIndex + 1)
            }}
            title="What is shit code?"
            answers={["shit", "shit", "shit", "shit"]}
          />
        )
      case 5:
        return (
          <Question
            questionIndex={questionIndex}
            submit={selectedAnswerIndex => {
              if (selectedAnswerIndex === 0) setScore(score + 1)
              setQuestionIndex(questionIndex + 1)
            }}
            title="What is my prefered OS?"
            answers={["MacOS", "Windows", "Arch", "Kali"]}
          />
        )
      case 6:
        return (
          <Question
            questionIndex={questionIndex}
            submit={() => {
              setScore(score + 1)
              setQuestionIndex(questionIndex + 1)
            }}
            title="What are West Ham everywhere they go?"
            answers={["Massive", "Massive", "Massive", "Massive"]}
          />
        )
      case 7:
        return (
          <Question
            questionIndex={questionIndex}
            submit={selectedAnswerIndex => {
              if (selectedAnswerIndex === 1) setScore(score + 1)
              setQuestionIndex(questionIndex + 1)
              setIsActive(false)
            }}
            title="What are the correct films that were used as inspiration in the design of this site?"
            answers={[
              "Virus, Short Circuit, The Matrix",
              "Wall-e, Virus, The Matrix",
              "Matrix, Virus, Robot Wars",
            ]}
          />
        )
      case 8:
        return (
          <div className="hero-body is-justify-content-center">
            <div className="columns">
              <div className="column" style={{ width: "50vw" }}>
                <div className="container">
                  {calledMeOld ? (
                    <>
                      <h1 className="title has-text-centered is-danger-text">
                        You called me old.
                      </h1>
                      <h3 className="title has-text-centered mb-4">
                        Your score is -100. 🖕
                      </h3>
                    </>
                  ) : (
                    <>
                      <h3 className="title has-text-centered">
                        Congrats! Your score was
                      </h3>
                      <h1 className="title mb-4 has-text-centered is-size-1">
                        {score}
                      </h1>
                    </>
                  )}
                  <div className="is-flex is-flex-direction-row is-justify-content-center">
                    <button
                      onClick={() => reset()}
                      className="button is-primary"
                    >
                      Try again?
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <section ref={quizRef} className={`quiz hero is-fullheight`}>
      {questions()}
      <div className={`modal${warning ? " is-active" : ""}`}>
        <div
          className="modal-background"
          onClick={() => setWarning(false)}
        ></div>
        <div className="modal-content">
          <p className="has-text-white is-size-1 has-text-centered has-text-weight-bold">
            No cheating the very important quiz!
          </p>
          <div className="is-flex is-flex-direction-row is-justify-content-center">
            <div className="buttons mt-2">
              <button
                onClick={() => setWarning(false)}
                className="button is-primary"
              >
                Ok
              </button>
              {warningCount >= 3 && (
                <button
                  onClick={() => {
                    setWarning(false)
                    setQuestionIndex(0)
                    setIsActive(false)
                  }}
                  className="button is-info"
                >
                  I give up, I'm a cheater
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
