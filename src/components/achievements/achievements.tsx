import React, { useContext } from "react"
import { AchievementContext } from "./achievementContext"

export const Achievements = () => {
  const { achievements } = useContext(AchievementContext)
  const achievementCount = 17

  const percentageComplete = Math.floor(
    (achievements.length / achievementCount) * 100,
  )

  return (
    <div className="hero is-dark-primary">
      <div className="hero-body">
        <section className="section">
          <h2 className="title">Achievements</h2>
          <p className="mb-3">
            There's some hidden gems on site, when you find them, you'll get an
            achievement. I stopped counting at {achievementCount}. Come on!
            Chop, chop! There's {achievementCount} achievements to find!
          </p>
          <label className="label">Completed {percentageComplete}%</label>
          <progress
            className="progress is-primary mb-6"
            value={achievements.length}
            max={achievementCount}
          >
            {percentageComplete}%
          </progress>

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
