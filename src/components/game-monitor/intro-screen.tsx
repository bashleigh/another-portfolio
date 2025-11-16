import React, { useState, useEffect } from "react"
import Typewriter from "typewriter-effect"
import "./intro-screen.scss"

type IntroScreenProps = {
  onComplete: () => void
}

const rickIntroLines = [
  "MORTY!!!",
  "You're not gonna believe this, Morty...",
  "I'm—I'm in this terminal, Morty!",
  "I'm terminal Rick, baby!",
  "Oh no Morty! I'm stuck in here! I need you to get me out...",
  "You're going to have to play some old games to get me out...",
  "It looks like AI code Morty, this is going to be a pain in the ass...",
]

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [showContinue, setShowContinue] = useState(false)

  // Calculate total time needed and show button after
  useEffect(() => {
    const totalTime = 2000 // 3 seconds per line
    const timer = setTimeout(() => {
      setShowContinue(true)
    }, totalTime)

    return () => clearTimeout(timer)
  }, [])

  // Auto-advance lines
  useEffect(() => {
    if (currentLineIndex < rickIntroLines.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1)
      }, 3000) // Show next line after 3 seconds
      return () => clearTimeout(timer)
    } else if (currentLineIndex >= rickIntroLines.length - 1) {
      // Last line shown, wait a bit then show button
      const timer = setTimeout(() => {
        setShowContinue(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [currentLineIndex])

  return (
    <div className="intro-screen">
      <div className="intro-content">
        <div className="rick-ascii">
          <pre>
            {`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀  ⣄⠀⠀⠀⠀⢀⣴⡀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣷⣄⠀⣠⣾⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢆
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⢸⠿⣛⣛⣛⡻⢿⣇⣤⣤⣶⠆⠀⠀⠀⠀⠀⠀⠀⠀⠈⡳⣴⡄
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⡟⣵⣿⣿⣿⣿⣿⣷⡝⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⡴⢿⣿⣷
⠀⠀⢰⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⢱⡿⣟⡿⣿⢟⣭⣭⡛⣸⣧⣤⣤⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⢿⣿
⢀⣠⠏⠀⠀⠀⠀⠀⠀⠀⠀⠠⢶⣿⣿⠈⣾⣟⣿⣞⡸⣿⣽⡟⡇⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⠶⣀
⢸⣿⣾⡤⡀⠀⠀⠀⠀⠀⠀⠀⠀⣨⣿⡜⣮⠟⠯⡾⣿⣶⣒⣺⣿⢙⢦⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿
⠀⣿⣿⠈⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠛⢥⡻⠋⠍⠟⡉⠛⠙⠈⠀⠁⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿
⠀⢘⣯⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠓⠡⡀⠀⠀⠰⡂⡀⢀⡴⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿
⠀⢲⣾⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠒⢓⣛⣛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿
⠀⢸⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⣶⢰⣿⣶⢹⣿⣿⣿⣿⣿⣷⣶⣶⣶⣶⣶⣦⣤⣤⣤⣽⣿⡆
⠀⠀⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣴⣾⣿⣿⡟⣿⡟⣿⣿⢸⣿⣿⡇⠀⠉⠉⠉⠉⠉⠙⠛⠛⠛⠛⠛⠛⠛⠁
⠀⠀⢸⣿⣇⠀⠀⠀⣀⣤⣶⣿⡿⠟⠋⠁⠀⡟⣼⣿⡇⣿⣿⢸⣿⣿⡇
⠀⠀⠀⢿⣿⣤⣶⣿⠿⠛⠉⠀⠀⠀⠀⠀⠀⣿⣶⢝⡇⣿⣿⣾⣿⣿⡇
⠀⠀⠀⠈⠛⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⢱⣿⣿⣿⣿⡇⣿⣿⣷
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣯⢿⣿⢸⣿⣇⠿⠿⠻`}
          </pre>
        </div>

        <div className="dialogue-container">
          <div className="dialogue-box">
            {rickIntroLines
              .slice(0, currentLineIndex + 1)
              .map((line, index) => (
                <div key={index} className="dialogue-line">
                  {index === currentLineIndex ? (
                    <Typewriter
                      key={`typewriter-${index}`}
                      options={{
                        delay: 10,
                        cursor: "",
                      }}
                      onInit={typewriter => {
                        typewriter.typeString(line).start()
                      }}
                    />
                  ) : (
                    <span>{line}</span>
                  )}
                </div>
              ))}
          </div>

          {showContinue && (
            <button
              className="continue-button"
              onClick={() => {
                onComplete()
              }}
            >
              Continue →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
