import { FC, useState } from "react"
import { Achievement, AchievementContext } from "./achievementContext"
import "./achievements.scss"

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
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

      // Track achievement unlock in Google Analytics
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "achievement_unlocked", {
          event_category: "achievement",
          event_label: achievement.title,
          value: achievements.length + 1,
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
