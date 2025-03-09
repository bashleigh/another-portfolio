import React, { useContext } from "react"
import { AchievementContext } from "./achievementContext"

export const Achievements = () => {
  const { achievements } = useContext(AchievementContext)

  return (
    <div className="hero is-dark-primary">
      <div className="hero-body">
        <section className="section">
          <h2 className="title">Achievements</h2>
          <p>
            There's some hidden gems on site, when you find them, they'll appear
            here
          </p>

          <div className="achievements grid is-col-min-14 is-gap-3">
            {achievements.map(achievement => (
              <div key={achievement.title} className="achievement cell">
                <div className="achievement-throphy">🏆</div>
                <div>
                  <p className="title">{achievement.title}</p>
                  <p className="description">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
