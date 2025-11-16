import { Character } from "./types"
import "./pokemon-stats.scss"

export const PokemonStats = ({
  opponentState,
  isOpponent,
}: {
  opponentState: Character
  isOpponent: boolean
}) => {
  const hpPercentage = (opponentState.hp / opponentState.maxHp) * 100
  let hpBarClass = "hp-high" // Green (default)

  if (hpPercentage < 10) {
    hpBarClass = "hp-critical" // Red
  } else if (hpPercentage < 30) {
    hpBarClass = "hp-low" // Amber
  }

  return (
    <div
      className={`pokemon-stats ${isOpponent ? "is-opponent" : "is-player"}`}
    >
      <div className="stat-name">{opponentState.name}</div>
      <div className="stat-level">{opponentState.level}</div>
      <div className="hp-container">
        <div className="hp-label">HP:</div>
        <div className="hp-bar-container">
          <div
            className={`hp-bar-fill ${hpBarClass}`}
            style={{ width: `${hpPercentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
