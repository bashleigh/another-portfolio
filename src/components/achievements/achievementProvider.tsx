import { FC, useState } from "react"
import { Achievement, AchievementContext } from "./achievementContext"
import "./achievements.scss"

export const AchievementProvider: FC = ({ children }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [latestAchievement, setLatestAchievement] = useState<
    Achievement | undefined
  >(undefined)

  const addAchievement = (achievement: Achievement) => {
    if (!achievements.map(stored => stored.title).includes(achievement.title)) {
      setAchievements(stored => [...stored, achievement])
      setLatestAchievement(achievement)

      setTimeout(() => {
        setLatestAchievement(undefined)
      }, 4800)
    }
  }

  return (
    <AchievementContext.Provider value={{ achievements, addAchievement }}>
      {children}
      <div id="achievement-window">
        {latestAchievement && (
          <div className="achievement">
            <div className="achievement-throphy">🏆</div>
            <div>
              <p className="title">{latestAchievement.title}</p>
              <p className="description">{latestAchievement.description}</p>
            </div>
          </div>
        )}
      </div>
    </AchievementContext.Provider>
  )
}
