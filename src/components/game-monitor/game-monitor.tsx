import { useState, useEffect } from "react"
import "./game-monitor.scss"
import { BootScreen } from "./boot-screen"
import { IntroScreen } from "./intro-screen"
import { LevelSelection } from "./level-selection"
import { JurassicParkGame } from "./jurassic-park-game"
import { PokemonBattle } from "./pokemon-battle/pokemon-battle"
import { RobotTekken } from "./robot-tekken"
import { RickOverlay } from "./rick-overlay"
import { RickOverlayProvider } from "./rick-overlay-context"

export type Screen =
  | "boot"
  | "intro"
  | "level-select"
  | "jurassic-park"
  | "pokemon-battle"
  | "robot-tekken"

export type GameState = {
  screen: Screen
}

type GameId = "jurassic-park" | "pokemon-battle" | "robot-tekken"

const COMPLETED_GAMES_KEY = "game-monitor-completed-games"

const loadCompletedGames = (): Set<GameId> => {
  try {
    const stored = localStorage.getItem(COMPLETED_GAMES_KEY)
    if (stored) {
      return new Set(JSON.parse(stored) as GameId[])
    }
  } catch (e) {
    console.warn("Failed to load completed games from localStorage", e)
  }
  return new Set<GameId>()
}

const saveCompletedGames = (completed: Set<GameId>) => {
  try {
    localStorage.setItem(
      COMPLETED_GAMES_KEY,
      JSON.stringify(Array.from(completed)),
    )
  } catch (e) {
    console.warn("Failed to save completed games to localStorage", e)
  }
}

export const GameMonitor = () => {
  const [gameState, setGameState] = useState<GameState>({
    screen: "boot",
  })
  const [completedGames, setCompletedGames] = useState<Set<GameId>>(() =>
    loadCompletedGames(),
  )

  useEffect(() => {
    saveCompletedGames(completedGames)
  }, [completedGames])

  const navigateToScreen = (screen: Screen) => {
    setGameState({ screen })
  }

  const markGameCompleted = (gameId: GameId) => {
    setCompletedGames(prev => {
      const updated = new Set(prev)
      updated.add(gameId)
      return updated
    })
  }

  return (
    <RickOverlayProvider initialOverlayPosition="bottom-right">
      <div id="game-monitor" className="is-fullscreen">
        <img
          className="monitor-image"
          src="/images/monitor.png"
          alt="Monitor"
        />

        <div className="screen-container">
          {gameState.screen === "boot" && (
            <BootScreen onComplete={() => navigateToScreen("intro")} />
          )}

          {gameState.screen === "intro" && (
            <IntroScreen onComplete={() => navigateToScreen("level-select")} />
          )}

          {gameState.screen === "level-select" && (
            <LevelSelection
              completedGames={completedGames}
              onSelectGame={(
                game: "jurassic-park" | "pokemon-battle" | "robot-tekken",
              ) => navigateToScreen(game)}
            />
          )}

          {gameState.screen === "jurassic-park" && (
            <JurassicParkGame
              onBack={() => navigateToScreen("level-select")}
              onComplete={() => markGameCompleted("jurassic-park")}
            />
          )}

          {gameState.screen === "pokemon-battle" && (
            <PokemonBattle
              onBack={() => navigateToScreen("level-select")}
              onComplete={() => markGameCompleted("pokemon-battle")}
            />
          )}

          {gameState.screen === "robot-tekken" && (
            <RobotTekken
              onBack={() => navigateToScreen("level-select")}
              onComplete={() => markGameCompleted("robot-tekken")}
            />
          )}
        </div>

        <RickOverlay />
      </div>
    </RickOverlayProvider>
  )
}
