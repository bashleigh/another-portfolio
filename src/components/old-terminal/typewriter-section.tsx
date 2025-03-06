import { FC, useState } from "react"
import Typewriter from "typewriter-effect"

export const TypewriterSection: FC<{ lines: string[] }> = ({ lines }) => {
  const [activeLines, setActiveLines] = useState<string[]>([lines[0]])

  return (
    <div>
      {activeLines.map((line) => (
        <Typewriter
          key={line}
          options={{
            cursor: '',
            delay: 20,
          }} onInit={(type) => {
            type.typeString(line)
            .pauseFor(100)
            .callFunction(() => {
              if (lines.length !== activeLines.length) setActiveLines([...activeLines, lines[activeLines.length] ])
            })
            .start()
          }} />
      ))}
    </div>
  )
}
