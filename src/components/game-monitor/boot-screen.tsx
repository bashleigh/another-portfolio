import React, { useEffect, useState } from "react"
import "./boot-screen.scss"

type BootScreenProps = {
  onComplete: () => void
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [showBoot, setShowBoot] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBoot(false)
      setTimeout(() => {
        onComplete()
      }, 500)
    }, 5000)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!showBoot) return null

  return (
    <div className="boot-screen">
      <div>
        <h1 className="title is-size-1">Ashleigh_OS</h1>
      </div>
      <p>2025© - London - v2.0.1</p>
      <div className="loading-dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  )
}
