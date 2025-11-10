import React, { useEffect, useState, useCallback } from "react"
import "./level-selection.scss"
import { useRickOverlay } from "./rick-overlay-context"

type LevelSelectionProps = {
  onSelectGame: (game: "jurassic-park" | "pokemon-battle" | "robot-tekken") => void
}

const games = [
  {
    id: "jurassic-park" as const,
    title: "Jurassic Park Game",
    rickComment: "Oh great, a password game. *burp* Just what I needed while trapped in here...",
  },
  {
    id: "pokemon-battle" as const,
    title: "Pokemon Virus",
    rickComment: "Pokemon? Really? In 2025? *burp* At least it's not another terminal command...",
  },
  {
    id: "robot-tekken" as const,
    title: "Johnny five Tekken",
    rickComment: "Now THIS is more like it! *burp* Robots fighting robots! Classic!",
  },
]

export const LevelSelection: React.FC<LevelSelectionProps> = ({
  onSelectGame,
}) => {
  const { showRick, hideRick } = useRickOverlay()
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    showRick(
      "Alright Morty, pick a game! *burp* Any of these should help me escape... I think...",
      "normal"
    )
  }, [showRick])

  useEffect(() => {
    // Update Rick's comment when selection changes
    showRick(games[selectedIndex].rickComment, "sarcastic", 3000)
  }, [selectedIndex, showRick])

  const handleGameSelect = useCallback((gameId: typeof games[number]["id"]) => {
    hideRick()
    setTimeout(() => {
      onSelectGame(gameId)
    }, 300)
  }, [onSelectGame, hideRick])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : games.length - 1))
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex(prev => (prev < games.length - 1 ? prev + 1 : 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      handleGameSelect(games[selectedIndex].id)
    }
  }, [selectedIndex, handleGameSelect])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const handleGameHover = (index: number) => {
    setSelectedIndex(index)
  }

  return (
    <div className="level-selection">
      <h2 className="title">Select a Game</h2>
      <div className="games-list">
        {games.map((game, index) => (
          <div
            key={game.id}
            className={`game-item ${index === selectedIndex ? "selected" : ""}`}
            onMouseEnter={() => handleGameHover(index)}
            onClick={() => handleGameSelect(game.id)}
          >
            <span className="game-arrow">&gt;</span>
            <span className="game-title">{game.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

