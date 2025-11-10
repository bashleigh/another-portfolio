import React, { useEffect, useState, useCallback, useMemo } from "react"
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
    rickComment: "Oh great, a password game. *burp* Just what I needed while trapped in here...",
  },
  {
    id: "pokemon-battle" as const,
    title: "YOU ARE POKEMON",
    rickComment: "Pokemon? Really? In 2025? *burp* At least it's not another terminal command...",
  },
  {
    id: "robot-tekken" as const,
    title: "Johnny 5 street fighter",
    rickComment: "Now THIS is more like it! *burp* Robots fighting robots! Classic!",
  },
]

export const LevelSelection: React.FC<LevelSelectionProps> = ({
  completedGames,
  onSelectGame,
}) => {
  const { showRick, hideRick } = useRickOverlay()
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Get available (non-completed) games for navigation
  const availableGames = useMemo(() => {
    return games.filter(game => !completedGames.has(game.id))
  }, [completedGames])

  // Initialize selectedIndex to first available game
  useEffect(() => {
    if (availableGames.length > 0) {
      const firstAvailableIndex = games.findIndex(g => g.id === availableGames[0].id)
      if (firstAvailableIndex !== -1) {
        setSelectedIndex(firstAvailableIndex)
      }
    }
  }, [availableGames])

  useEffect(() => {
    showRick(
      "Alright Morty, pick a game! *burp* Any of these should help me escape... I think...",
      "normal"
    )
  }, [showRick])

  useEffect(() => {
    // Update Rick's comment when selection changes
    const game = games[selectedIndex]
    if (game) {
      if (completedGames.has(game.id)) {
        showRick("You already completed this one, Morty! *burp* Pick something else!", "sarcastic", 3000)
      } else {
        showRick(game.rickComment, "sarcastic", 3000)
      }
    }
  }, [selectedIndex, showRick, completedGames])

  const handleGameSelect = useCallback((gameId: GameId) => {
    // Don't allow selecting completed games
    if (completedGames.has(gameId)) {
      return
    }
    hideRick()
    setTimeout(() => {
      onSelectGame(gameId)
    }, 300)
  }, [onSelectGame, hideRick, completedGames])

  const getNextAvailableIndex = useCallback((currentIndex: number, direction: "up" | "down"): number => {
    let nextIndex = currentIndex
    let attempts = 0
    const maxAttempts = games.length

    while (attempts < maxAttempts) {
      if (direction === "down") {
        nextIndex = (nextIndex + 1) % games.length
      } else {
        nextIndex = (nextIndex - 1 + games.length) % games.length
      }

      if (!completedGames.has(games[nextIndex].id)) {
        return nextIndex
      }

      attempts++
    }

    // If all games are completed, return current index
    return currentIndex
  }, [completedGames])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex(prev => getNextAvailableIndex(prev, "up"))
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex(prev => getNextAvailableIndex(prev, "down"))
    } else if (e.key === "Enter") {
      e.preventDefault()
      const game = games[selectedIndex]
      if (game && !completedGames.has(game.id)) {
        handleGameSelect(game.id)
      }
    }
  }, [selectedIndex, handleGameSelect, completedGames, getNextAvailableIndex])

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
              onMouseEnter={() => !isCompleted && handleGameHover(index)}
              onClick={() => !isCompleted && handleGameSelect(game.id)}
            >
              <span className="game-arrow">&gt;</span>
              <span className="game-title">
                {game.title}
                {isCompleted && <span className="completed-badge"> ✓ Completed</span>}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

