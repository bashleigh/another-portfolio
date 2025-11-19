import { FC, useState } from "react"
import { Achievement, AchievementContext } from "./achievementContext"
import "./achievements.scss"

// Declare analytics globals for TypeScript
declare global {
  interface Window {
    dataLayer?: any[]
  }
}

export const AchievementProvider: FC = ({ children }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [latestAchievement, setLatestAchievement] = useState<
    Achievement | undefined
  >(undefined)

  const addAchievement = (achievement: Achievement) => {
    if (!achievements.map(stored => stored.title).includes(achievement.title)) {
      setAchievements(stored => [...stored, achievement])
      setLatestAchievement(achievement)

      // Track achievement unlock in Google Analytics 4
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: "achievement_unlocked",
          achievement_title: achievement.title,
          achievement_description: achievement.description,
          achievement_count: achievements.length + 1,
        })
      }

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
          <a className="achievement" href="#achievements">
            <div className="achievement-trophy">🏆</div>
            <div>
              <p className="title">{latestAchievement.title}</p>
              <p className="description">{latestAchievement.description}</p>
            </div>
          </a>
        )}
      </div>
    </AchievementContext.Provider>
  )
}
