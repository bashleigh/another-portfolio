import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import "./time-machine.scss"
import { workexperience } from "./work-experience"
import { useOnScreen } from "../useOneScreen"
import { AchievementContext } from "../achievements"
import { ACHIEVEMENTS } from "../achievements/achievementsList"

export const TimeMachine = () => {
  const [previousScrollVal, setPreviousScrollVal] = useState<number>(0)
  const [showText, setShowText] = useState<boolean>(false)
  const date = new Date()
  const thisYear = date.getFullYear()
  const experienceInYears = thisYear - 2015

  const { addAchievement } = useContext(AchievementContext)

  const onScreenRef = useRef<any>(null)
  const onScreenExperienceRef = useRef<any>(null)
  const onScreen2Ref = useRef<any>(null)

  const onScreen = useOnScreen(onScreenRef)
  const onScreenExperience = useOnScreen(onScreenExperienceRef)
  const onScreen2 = useOnScreen(onScreen2Ref)

  const handleScrollingText = useCallback(
    event => {
      const window = event.currentTarget
      if (previousScrollVal > window.scrollY) {
        if (onScreen && onScreenExperience) {
          setShowText(false)
        }
      } else if (previousScrollVal < window.scrollY) {
        if (onScreen && onScreenExperience) {
          setShowText(true)
          addAchievement(ACHIEVEMENTS.YEARS_YEARS_AND_YEARS)
        }
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

  useEffect(() => {
    if (onScreen2) addAchievement(ACHIEVEMENTS.YEARS_YEARS_AND_YEARS)
  }, [onScreen2])

  // console.log('onscreen', onScreen, showText, onScreenExperience)

  return (
    <div className="time-machine">
      <div className={`card-stack card-length-${workexperience.length}`}>
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
              <div className="level-item level-right mobile-hidden">
                {(workexperience.length - index).toString().padStart(2, "0")}
              </div>
            </div>
            <h1 className="title mb-4 mt-2">{job.company}</h1>
            <div className="content">
              <p className="excert">{job.exert}</p>
              {job.description.map(desc => (
                <p key={desc}>{desc}</p>
              ))}
            </div>
          </div>
        ))}
        <div className="work-experience-years card">
          <div ref={onScreen2Ref}></div>
          <h1 className="title has-text-centered">
            That's {experienceInYears} years experience!
          </h1>
        </div>
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
