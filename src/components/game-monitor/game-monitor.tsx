import { useState } from "react"
import "./game-monitor.scss"
import { BootScreen } from "./boot-screen"
import { IntroScreen } from "./intro-screen"
import { LevelSelection } from "./level-selection"
import { JurassicParkGame } from "./jurassic-park-game"
import { PokemonBattle } from "./pokemon-battle/pokemon-battle"
import { RobotTekken } from "./robot-tekken"
import { RickOverlay } from "./rick-overlay"
import { RickOverlayProvider } from "./rick-overlay-context"

export type Screen = "boot" | "intro" | "level-select" | "jurassic-park" | "pokemon-battle" | "robot-tekken"

export type GameState = {
  screen: Screen
}

export const GameMonitor = () => {
  const [gameState, setGameState] = useState<GameState>({
    screen: "boot",
  })

  const navigateToScreen = (screen: Screen) => {
    setGameState({ screen })
  }

  return (
    <RickOverlayProvider>
      <div id="game-monitor" className="is-fullscreen">
        <img className="monitor-image" src="/images/monitor.png" alt="Monitor" />
        
        <div className="screen-container">
          {gameState.screen === "boot" && (
            <BootScreen onComplete={() => navigateToScreen("intro")} />
          )}
          
          {gameState.screen === "intro" && (
            <IntroScreen onComplete={() => navigateToScreen("level-select")} />
          )}
          
          {gameState.screen === "level-select" && (
            <LevelSelection
              onSelectGame={(game: "jurassic-park" | "pokemon-battle" | "robot-tekken") =>
                navigateToScreen(game)
              }
            />
          )}
          
          {gameState.screen === "jurassic-park" && (
            <JurassicParkGame
              onBack={() => navigateToScreen("level-select")}
            />
          )}
          
          {gameState.screen === "pokemon-battle" && (
            <PokemonBattle
              onBack={() => navigateToScreen("level-select")}
            />
          )}
          
          {gameState.screen === "robot-tekken" && (
            <RobotTekken
              onBack={() => navigateToScreen("level-select")}
            />
          )}
        </div>

        <RickOverlay />
      </div>
    </RickOverlayProvider>
  )
}

