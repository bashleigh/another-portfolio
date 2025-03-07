import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import './time-machine.scss'
import { workexperience } from './work-experience';
import { useOnScreen } from './useOneScreen';

export const TimeMachine = () => {
  const [textSize, setTextSize] = useState(1)
  const [previousScrollVal, setPreviousScrollVal] = useState<number>(0)
  const [textComplete, setTextComplete] = useState<boolean>(false)
  const date = new Date()
  const thisYear = date.getFullYear()
  const experienceInYears = thisYear - 2015

  const onScreenRef = useRef<any>(null)

  const onScreen = useOnScreen(onScreenRef)

  const handleNavigation = useCallback(
    (event) => {
      const window = event.currentTarget
      if (previousScrollVal > window.scrollY) {
        if (!onScreen) {
          // need to set where the last position was instead of guessing
          setTextComplete(false)
        }
        console.log("scrolling up", previousScrollVal, window.scrollY)
        if (textSize > 1 && onScreen) setTextSize(textSize - .05)
      } else if (previousScrollVal < window.scrollY) {
        console.log("scrolling down", previousScrollVal, window.scrollY)
        if (textSize < 4 && onScreen) setTextSize(textSize + .05)
          else if (textSize >= 4) {
            setTextComplete(true)
          }
      }
      setPreviousScrollVal(window.scrollY)
    }, [previousScrollVal]
  )

  console.log('text complete', textSize, textComplete)

  useEffect(() => {
    setPreviousScrollVal(window.scrollY)
    window.addEventListener("scroll", handleNavigation)

    return () => {
      window.removeEventListener("scroll", handleNavigation)
    };
  }, [handleNavigation])

  return (<div className='time-machine'>
    <div className='card-stack'>
      {workexperience.map((job, index) => (<div className='card' key={job.company}>
        <div className='level'>
          <div className='level-item level-left'>
            <small>{job.startDate.month}/{job.startDate.year} - {job.endDate.month}/{job.endDate.year}</small>
            <h3 className='subtitle has-text-primary'>{job.title}</h3>            
          </div>
          <div className='level-item level-right'>
            {(index + 1).toString().padStart(2, '0')}
          </div>
        </div>
        <h1 className='title mb-4 mt-2 has-text-info'>{job.company}</h1>
        <div className='content'>

          {job.description.map(desc => <p key={desc}>{desc}</p>)}
        </div>
      </div>))}
    </div>
    <div ref={onScreenRef}></div>
    <div className={`bottom-reveal hero is-halfheight${onScreen || textComplete ? ' active' : ''}`}>
      <div className='hero-body is-justify-content-center is-align-content-center'>
        <h2 className="title has-text-centered" style={{fontSize: `${textSize}rem`}}>
          That's {experienceInYears} years
          experience!
        </h2>
      </div>
    </div>
  </div>
  )
}
