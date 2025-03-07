import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import "./time-machine.scss"
import { workexperience } from "./work-experience"
import { useOnScreen } from "./useOneScreen"

export const TimeMachine = () => {
  const [previousScrollVal, setPreviousScrollVal] = useState<number>(0)
  const [showText, setShowText] = useState<boolean>(false)
  const date = new Date()
  const thisYear = date.getFullYear()
  const experienceInYears = thisYear - 2015

  const onScreenRef = useRef<any>(null)
  const onScreenExperienceRef = useRef<any>(null)

  const onScreen = useOnScreen(onScreenRef)
  const onScreenExperience = useOnScreen(onScreenExperienceRef)

  const handleScrollingText = useCallback(
    event => {
      const window = event.currentTarget
      if (previousScrollVal > window.scrollY) {
        if (onScreen && onScreenExperience) {
          setShowText(false)
        }
      } else if (previousScrollVal < window.scrollY) {
        if (onScreen && onScreenExperience) setShowText(true)
      }
      setPreviousScrollVal(window.scrollY)
    },
    [previousScrollVal],
  )

  useEffect(() => {
    setPreviousScrollVal(window.scrollY)
    window.addEventListener("scroll", handleScrollingText)

    return () => {
      window.removeEventListener("scroll", handleScrollingText)
    }
  }, [handleScrollingText])

  return (
    <div className="time-machine">
      <div className="card-stack">
        {workexperience.map((job, index) => (
          <div className="card" key={job.company}>
            <div className="level">
              <div className="level-item level-left">
                <small>
                  {job.startDate.month}/{job.startDate.year} -{" "}
                  {job.endDate.month}/{job.endDate.year}
                </small>
                <h3 className="subtitle">{job.title}</h3>
              </div>
              <div className="level-item level-right">
                {(workexperience.length - index).toString().padStart(2, "0")}
              </div>
            </div>
            <h1 className="title mb-4 mt-2">{job.company}</h1>
            <div className="content">
              {job.description.map(desc => (
                <p key={desc}>{desc}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div ref={onScreenRef}></div>
      <div
        ref={onScreenExperienceRef}
        className={`bottom-reveal hero is-fullheight${onScreen || showText ? " active" : ""}`}
      >
        <div className="hero-body is-justify-content-center is-align-content-center">
          <h2 className="title has-text-centered is-size-1">
            That's {experienceInYears} years experience!
          </h2>
        </div>
      </div>
    </div>
  )
}
