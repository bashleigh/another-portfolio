import { FC, useState } from "react"
import Typewriter from "typewriter-effect"

export const TypewriterSection: FC<{ delay?: number, delayEach?: number, lines: string[], isComplete: () => void, delayStart?: number }> = ({ lines, isComplete, delay = 10, delayEach = 100, delayStart = 0 }) => {
  const [activeLines, setActiveLines] = useState<string[]>([lines[0]])

  // console.log('props', lines, delay, delayEach)

  return (
    <div>
      {activeLines.map((line) => (
        <Typewriter
          key={line}
          options={{
            cursor: '',
            delay: delay,
          }} onInit={(type) => {
            type
            .pauseFor(delayStart)
            .typeString(line)
            .pauseFor(delayEach)
            .callFunction(() => {
              if (lines.length !== activeLines.length) setActiveLines([...activeLines, lines[activeLines.length] ])

              if (lines.length === activeLines.length) isComplete()
            })
            .start()
          }} />
      ))}
    </div>
  )
}
