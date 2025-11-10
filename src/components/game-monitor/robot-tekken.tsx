import React, { useState, useEffect } from "react"
import "./robot-tekken.scss"
import { useRickOverlay } from "./rick-overlay-context"

type RobotTekkenProps = {
  onBack: () => void
}

type Fighter = {
  id: string
  name: string
  hp: number
  maxHp: number
  sprite: string
  moves: Move[]
}

type Move = {
  name: string
  damage: number
  description: string
}

const fighters: Fighter[] = [
  {
    id: "ash",
    name: "Ash (Alien)",
    hp: 100,
    maxHp: 100,
    sprite: "ash",
    moves: [
      { name: "Acid Attack", damage: 25, description: "Ash sprays acid!" },
      { name: "Tail Whip", damage: 20, description: "Ash whips with tail!" },
      { name: "Pounce", damage: 30, description: "Ash pounces on opponent!" },
    ],
  },
  {
    id: "walle",
    name: "Wall-E",
    hp: 120,
    maxHp: 120,
    sprite: "walle",
    moves: [
      { name: "Trash Compress", damage: 20, description: "Wall-E compresses trash at opponent!" },
      { name: "Eva Call", damage: 25, description: "Wall-E calls Eva for help!" },
      { name: "Solar Charge", damage: 15, description: "Wall-E charges up!" },
    ],
  },
  {
    id: "johnny-five",
    name: "Johnny Five",
    hp: 110,
    maxHp: 110,
    sprite: "johnny-five",
    moves: [
      { name: "Laser Beam", damage: 30, description: "Johnny Five shoots laser!" },
      { name: "Data Input", damage: 20, description: "Johnny Five processes data attack!" },
      { name: "No Disassemble", damage: 25, description: "Johnny Five refuses to disassemble!" },
    ],
  },
  {
    id: "matilda",
    name: "Matilda",
    hp: 130,
    maxHp: 130,
    sprite: "matilda",
    moves: [
      { name: "Flipper Attack", damage: 25, description: "Matilda flips opponent!" },
      { name: "Robot Wars", damage: 35, description: "Matilda's signature move!" },
      { name: "Crush", damage: 30, description: "Matilda crushes opponent!" },
    ],
  },
  {
    id: "t800",
    name: "T-800",
    hp: 150,
    maxHp: 150,
    sprite: "t800",
    moves: [
      { name: "I'll Be Back", damage: 40, description: "T-800's iconic phrase hits hard!" },
      { name: "Metal Punch", damage: 30, description: "T-800's metal fist strikes!" },
      { name: "Terminate", damage: 35, description: "T-800 terminates opponent!" },
    ],
  },
]

export const RobotTekken: React.FC<RobotTekkenProps> = ({
  onBack,
}) => {
  const { showRick } = useRickOverlay()
  const [playerFighter, setPlayerFighter] = useState<Fighter | null>(null)
  const [opponentFighter, setOpponentFighter] = useState<Fighter | null>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [battleLog, setBattleLog] = useState<string[]>([])
  const [gameOver, setGameOver] = useState<"win" | "lose" | null>(null)
  const [playerAnimating, setPlayerAnimating] = useState(false)
  const [opponentAnimating, setOpponentAnimating] = useState(false)

  useEffect(() => {
    showRick(
      "Now THIS is more like it! *burp* Robots fighting robots! Classic! Pick your fighter, Morty!",
      "excited",
      5000
    )
  }, [showRick])

  const selectFighter = (fighter: Fighter) => {
    setPlayerFighter({ ...fighter })
    const randomOpponent = fighters[Math.floor(Math.random() * fighters.filter(f => f.id !== fighter.id).length)]
    setOpponentFighter({ ...randomOpponent })
    setGameStarted(true)
    showRick(
      `Alright Morty! *burp* ${fighter.name} vs ${randomOpponent.name}! Let's see who wins!`,
      "excited",
      4000
    )
  }

  const executeMove = (move: Move, isPlayer: boolean) => {
    if (!playerFighter || !opponentFighter) return

    if (isPlayer) {
      setPlayerAnimating(true)
      setBattleLog(prev => [...prev, `${playerFighter.name} uses ${move.name}!`])
      setBattleLog(prev => [...prev, move.description])

      setTimeout(() => {
        setOpponentFighter(prev => {
          if (!prev) return prev
          const newHp = Math.max(0, prev.hp - move.damage)
          if (newHp === 0) {
            setGameOver("win")
            showRick("YES! *burp* You won, Morty! Great job!", "excited", 5000)
          }
          return { ...prev, hp: newHp }
        })
        setPlayerAnimating(false)
        setIsPlayerTurn(false)

        if (opponentFighter.hp - move.damage > 0) {
          setTimeout(() => {
            opponentTurn()
          }, 1500)
        }
      }, 500)
    }
  }

  const opponentTurn = () => {
    if (!opponentFighter || !playerFighter) return

    const randomMove = opponentFighter.moves[Math.floor(Math.random() * opponentFighter.moves.length)]
    setOpponentAnimating(true)
    setBattleLog(prev => [...prev, `${opponentFighter.name} uses ${randomMove.name}!`])
    setBattleLog(prev => [...prev, randomMove.description])

    setTimeout(() => {
      setPlayerFighter(prev => {
        if (!prev) return prev
        const newHp = Math.max(0, prev.hp - randomMove.damage)
        if (newHp === 0) {
          setGameOver("lose")
          showRick("Oh no, Morty! *burp* You lost! Try again!", "panic", 5000)
        }
        return { ...prev, hp: newHp }
      })
      setOpponentAnimating(false)
      setIsPlayerTurn(true)
    }, 1000)
  }

  if (!gameStarted) {
    return (
      <div className="robot-tekken">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <div className="fighter-selection">
          <h2>Select Your Fighter</h2>
          <div className="fighters-grid">
            {fighters.map(fighter => (
              <div
                key={fighter.id}
                className="fighter-card"
                onClick={() => selectFighter(fighter)}
              >
                <div className="sprite-placeholder">
                  <p>{fighter.name}</p>
                  <p className="small">(Sprite placeholder)</p>
                </div>
                <h3>{fighter.name}</h3>
                <p>HP: {fighter.maxHp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="robot-tekken">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <div className="battle-arena">
        <div className="fighter opponent">
          <div className={`sprite-container ${opponentAnimating ? "attacking" : ""}`}>
            <div className="sprite-placeholder">
              <p>{opponentFighter?.name}</p>
              <p className="small">(Sprite placeholder)</p>
            </div>
          </div>
          <div className="fighter-info">
            <h3>{opponentFighter?.name}</h3>
            <div className="hp-bar">
              <div
                className="hp-fill"
                style={{ width: `${opponentFighter ? (opponentFighter.hp / opponentFighter.maxHp) * 100 : 0}%` }}
              />
            </div>
            <p>{opponentFighter?.hp} / {opponentFighter?.maxHp}</p>
          </div>
        </div>

        <div className="battle-log">
          {battleLog.slice(-5).map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>

        <div className="fighter player">
          <div className={`sprite-container ${playerAnimating ? "attacking" : ""}`}>
            <div className="sprite-placeholder">
              <p>{playerFighter?.name}</p>
              <p className="small">(Sprite placeholder)</p>
            </div>
          </div>
          <div className="fighter-info">
            <h3>{playerFighter?.name}</h3>
            <div className="hp-bar">
              <div
                className="hp-fill"
                style={{ width: `${playerFighter ? (playerFighter.hp / playerFighter.maxHp) * 100 : 0}%` }}
              />
            </div>
            <p>{playerFighter?.hp} / {playerFighter?.maxHp}</p>
          </div>
        </div>

        {gameOver ? (
          <div className="game-over">
            <h2>{gameOver === "win" ? "Victory!" : "Defeat!"}</h2>
            <button onClick={onBack}>Return to Menu</button>
          </div>
        ) : (
          <div className="moves-panel">
            {isPlayerTurn && playerFighter ? (
              <>
                <h3>Choose a Move:</h3>
                <div className="moves-list">
                  {playerFighter.moves.map((move, index) => (
                    <button
                      key={index}
                      className="move-button"
                      onClick={() => executeMove(move, true)}
                      disabled={!isPlayerTurn}
                    >
                      <div className="move-name">{move.name}</div>
                      <div className="move-damage">Damage: {move.damage}</div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p>Opponent's turn...</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

