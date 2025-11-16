import React, { useEffect, useState, useCallback } from "react"
import "./level-selection.scss"
import { useRickOverlay } from "./rick-overlay-context"

type GameId = "jurassic-park" | "pokemon-battle" | "robot-tekken"

type LevelSelectionProps = {
  completedGames: Set<GameId>
  onSelectGame: (game: GameId) => void
}

const games = [
  {
    id: "jurassic-park" as const,
    title: "Not without the magic word",
    rickComment:
      "Oh great, a password game. *burp* Just what I needed while trapped in here...",
  },
  {
    id: "pokemon-battle" as const,
    title: "YOU ARE POKEMON",
    rickComment:
      "Pokemon? Really? In 2025? *burp* At least it's not another terminal command...",
  },
  {
    id: "robot-tekken" as const,
    title: "Johnny 5 street fighter",
    rickComment:
      "Now THIS is more like it! *burp* Robots fighting robots! Classic!",
  },
]

export const LevelSelection: React.FC<LevelSelectionProps> = ({
  completedGames,
  onSelectGame,
}) => {
  const { showRick, hideRick } = useRickOverlay()
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    showRick(
      "Alright Morty, pick a game! *burp* Any of these should help me escape... I think...",
      "normal",
    )
  }, [showRick])

  useEffect(() => {
    // Update Rick's comment when selection changes
    const game = games[selectedIndex]
    if (game) {
      if (completedGames.has(game.id)) {
        showRick(
          "You already beat this one, Morty! *burp* But hey, you can play it again if you want!",
          "sarcastic",
          3000,
        )
      } else {
        showRick(game.rickComment, "sarcastic", 3000)
      }
    }
  }, [selectedIndex, showRick, completedGames])

  const handleGameSelect = useCallback(
    (gameId: GameId) => {
      // Allow selecting any game, even if completed (for replay)
      hideRick()
      setTimeout(() => {
        onSelectGame(gameId)
      }, 300)
    },
    [onSelectGame, hideRick],
  )

  const getNextIndex = useCallback(
    (currentIndex: number, direction: "up" | "down"): number => {
      // Allow navigation to all games, including completed ones
      if (direction === "down") {
        return (currentIndex + 1) % games.length
      } else {
        return (currentIndex - 1 + games.length) % games.length
      }
    },
    [],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex(prev => getNextIndex(prev, "up"))
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex(prev => getNextIndex(prev, "down"))
      } else if (e.key === "Enter") {
        e.preventDefault()
        const game = games[selectedIndex]
        if (game) {
          handleGameSelect(game.id)
        }
      }
    },
    [selectedIndex, handleGameSelect, getNextIndex],
  )

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
        {games.map((game, index) => {
          const isCompleted = completedGames.has(game.id)
          const isSelected = index === selectedIndex

          return (
            <div
              key={game.id}
              className={`game-item ${isSelected ? "selected" : ""} ${isCompleted ? "completed" : ""}`}
              onMouseEnter={() => handleGameHover(index)}
              onClick={() => handleGameSelect(game.id)}
            >
              <span className="game-arrow">&gt;</span>
              <span className="game-title">
                {game.title}
                {isCompleted && (
                  <span className="completed-badge"> ✓ Completed</span>
                )}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
