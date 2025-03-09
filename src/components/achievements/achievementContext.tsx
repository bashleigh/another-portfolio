import { createContext } from "react"

export type Achievement = {
  title: string
  description: string
}

export type AchievementContextType = {
  achievements: Achievement[]
  addAchievement: (achievement: Achievement) => void
}

export const AchievementContext = createContext<AchievementContextType>(
  {} as AchievementContextType,
)
