import React, { FC, useEffect, useRef, useState, useContext, useCallback } from "react"
import "./space-invaders.scss"
import { AchievementContext } from "../achievements"
import { soundManager } from "./sounds"

type Letter = {
  char: string
  x: number
  y: number
  destroyed: boolean
  wordIndex: number
  letterIndex: number
}

type Word = {
  letters: Letter[]
  row: number
  col: number
  baseX: number
  baseY: number
  color: string
}

type Bullet = {
  x: number
  y: number
  active: boolean
}

interface SpaceInvadersProps {
  words: string[]
  onGameEnd: () => void
}

export const SpaceInvaders: FC<SpaceInvadersProps> = ({ words, onGameEnd }) => {
  const { addAchievement } = useContext(AchievementContext)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)

  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  // Reset game state when starting
  const handleStartGame = () => {
    setGameStarted(true)
    setScore(0)
    setLives(3)
    setGameOver(false)
    setGameWon(false)
    setBullets([])
    setEnemyBullets([])
    setIsBlinking(false)
    setIsInvincible(false)
    setDirection(1)
    setMoveDown(false)
    lastShotTimeRef.current = 0
    lastEnemyShotTimeRef.current = 0
  }
  const [playerX, setPlayerX] = useState(0)
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({})
  const [bullets, setBullets] = useState<Bullet[]>([])
  const [enemyBullets, setEnemyBullets] = useState<Bullet[]>([])
  const [isBlinking, setIsBlinking] = useState(false)
  const [isInvincible, setIsInvincible] = useState(false)
  const [wordsData, setWordsData] = useState<Word[]>([])
  const [direction, setDirection] = useState(1) // 1 = right, -1 = left
  const [moveDown, setMoveDown] = useState(false)
  const [gameArea, setGameArea] = useState({ width: 0, height: 0 })
  const wordsDataRef = useRef<Word[]>([])
  const bulletsRef = useRef<Bullet[]>([])
  const enemyBulletsRef = useRef<Bullet[]>([])
  const lastShotTimeRef = useRef<number>(0)
  const lastEnemyShotTimeRef = useRef<number>(0)

  // Initialize words
  useEffect(() => {
    if (!gameStarted || !gameAreaRef.current) return

    const area = gameAreaRef.current
    const width = area.clientWidth
    const height = area.clientHeight
    setGameArea({ width, height })

    // Calculate grid layout
    const rows = 5
    const cols = Math.min(10, Math.floor(width / 120))
    const letterWidth = 20
    const wordSpacing = 10
    const rowSpacing = 50

    const colors = ["#0f0", "#0ff", "#ff0", "#f0f", "#f00", "#0ff", "#ff0", "#0f0"]
    const newWords: Word[] = []
    let wordIndex = 0

    for (let row = 0; row < rows && wordIndex < words.length; row++) {
      const y = 50 + row * rowSpacing
      let x = 50

      for (let col = 0; col < cols && wordIndex < words.length; col++) {
        const word = words[wordIndex]
        const letters: Letter[] = []
        const wordColor = colors[wordIndex % colors.length]

        for (let i = 0; i < word.length; i++) {
          letters.push({
            char: word[i],
            x: x + i * letterWidth,
            y,
            destroyed: false,
            wordIndex,
            letterIndex: i,
          })
        }

        newWords.push({
          letters,
          row,
          col,
          baseX: x,
          baseY: y,
          color: wordColor,
        })

        x += word.length * letterWidth + wordSpacing + 50
        wordIndex++

        // If next word won't fit, move to next row
        if (x + 100 > width - 50) {
          break
        }
      }
    }

    setWordsData(newWords)
    wordsDataRef.current = newWords
    setPlayerX(width / 2)
  }, [words, gameStarted])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        setKeys(prev => ({ ...prev, left: true }))
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        setKeys(prev => ({ ...prev, right: true }))
      }
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault()
        setKeys(prev => ({ ...prev, shoot: true }))
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        setKeys(prev => ({ ...prev, left: false }))
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        setKeys(prev => ({ ...prev, right: false }))
      }
      if (e.key === " " || e.key === "Spacebar") {
        setKeys(prev => ({ ...prev, shoot: false }))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])


  const shootBullet = useCallback(() => {
    if (gameArea.height === 0) return
    const now = Date.now()
    // Allow shooting every 150ms (increased fire rate)
    if (now - lastShotTimeRef.current < 150) return
    lastShotTimeRef.current = now
    
    // Play pew pew sound!
    soundManager.playShootSound()
    
    setBullets(prev => {
      // Allow multiple bullets (increased fire rate)
      return [...prev, { x: playerX, y: gameArea.height - 40, active: true }]
    })
  }, [playerX, gameArea.height])

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver || gameWon || wordsData.length === 0) return

    const gameLoop = (currentTime: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime
      }

      const deltaTime = currentTime - lastTimeRef.current
      lastTimeRef.current = currentTime

      // Update player position
      if (keys.left) {
        setPlayerX(prev => Math.max(20, prev - 5))
      }
      if (keys.right) {
        setPlayerX(prev => Math.min(gameArea.width - 20, prev + 5))
      }

      // Handle shooting
      if (keys.shoot) {
        shootBullet()
      }

      // Update player bullets
      setBullets(prev => {
        const updated = prev.map(bullet => {
          if (!bullet.active) return bullet
          const newY = bullet.y - 8
          if (newY < 0) {
            return { ...bullet, active: false }
          }
          return { ...bullet, y: newY }
        })
        bulletsRef.current = updated
        return updated
      })

      // Enemy shooting logic
      const wordsForShooting = wordsDataRef.current
      const now = Date.now()
      // Enemies shoot every 1-2 seconds (randomized)
      if (now - lastEnemyShotTimeRef.current > 1000 + Math.random() * 1000) {
        lastEnemyShotTimeRef.current = now
        
        // Find a random active letter to shoot from
        const activeLetters: { wordIdx: number; letterIdx: number; x: number; y: number }[] = []
        wordsForShooting.forEach((word, wordIdx) => {
          word.letters.forEach((letter, letterIdx) => {
            if (!letter.destroyed) {
              activeLetters.push({ wordIdx, letterIdx, x: letter.x, y: letter.y })
            }
          })
        })
        
        if (activeLetters.length > 0) {
          // Pick a random letter from the bottom rows (more dangerous!)
          const bottomLetters = activeLetters.filter(l => {
            const letter = wordsForShooting[l.wordIdx].letters[l.letterIdx]
            return letter.y > gameArea.height * 0.3 // Only bottom 70% of screen
          })
          const sourceLetter = bottomLetters.length > 0 
            ? bottomLetters[Math.floor(Math.random() * bottomLetters.length)]
            : activeLetters[Math.floor(Math.random() * activeLetters.length)]
          
          // Play enemy shoot sound
          soundManager.playEnemyShootSound()
          
          setEnemyBullets(prev => {
            const newBullet = {
              x: sourceLetter.x,
              y: sourceLetter.y + 20,
              active: true
            }
            enemyBulletsRef.current = [...prev, newBullet]
            return [...prev, newBullet]
          })
        }
      }

      // Update enemy bullets
      setEnemyBullets(prev => {
        const updated = prev.map(bullet => {
          if (!bullet.active) return bullet
          const newY = bullet.y + 5 // Move down
          if (newY > gameArea.height) {
            return { ...bullet, active: false }
          }
          return { ...bullet, y: newY }
        })
        enemyBulletsRef.current = updated
        return updated
      })

      // Update word positions
      setWordsData(prev => {
        if (prev.length === 0) return prev

        let shouldMoveDown = false
        let shouldReverse = false
        let lowestY = 0

        // Find the lowest (closest to bottom) letter position
        prev.forEach(word => {
          word.letters.forEach(letter => {
            if (!letter.destroyed && letter.y > lowestY) {
              lowestY = letter.y
            }
          })
        })

        // Calculate speed multiplier based on how close to bottom
        // Speed increases as letters get closer to bottom (higher Y value)
        // Base speed: 0.3, max speed multiplier: 2x when near bottom
        const maxY = gameArea.height - 100 // Near bottom threshold
        const speedMultiplier = 1 + (lowestY / maxY) * 1 // 1x to 2x speed
        const moveSpeed = 0.3 * speedMultiplier

        // Check if any word hits the edge
        prev.forEach(word => {
          word.letters.forEach(letter => {
            if (!letter.destroyed) {
              const newX = letter.x + direction * moveSpeed
              if (newX <= 0 || newX >= gameArea.width - 20) {
                shouldReverse = true
              }
            }
          })
        })

        if (shouldReverse) {
          setDirection(prevDir => -prevDir)
          setMoveDown(true)
        }

        let updated: Word[]
        if (moveDown) {
          setMoveDown(false)
          updated = prev.map(word => ({
            ...word,
            letters: word.letters.map(letter => ({
              ...letter,
              y: letter.y + 15,
            })),
            baseY: word.baseY + 15,
            color: word.color,
          }))
        } else {
          updated = prev.map(word => ({
            ...word,
            letters: word.letters.map(letter => ({
              ...letter,
              x: letter.x + direction * moveSpeed,
            })),
            baseX: word.baseX + direction * moveSpeed,
            color: word.color,
          }))
        }
        wordsDataRef.current = updated
        return updated
      })

      // Collision detection - player bullets vs enemies
      const currentWords = wordsDataRef.current
      const currentBullets = bulletsRef.current
      let wordsUpdated = false
      const newWords = currentWords.map(word => ({
        ...word,
        letters: [...word.letters],
        color: word.color,
      }))

      const newBullets = currentBullets.map(bullet => {
        if (!bullet.active) return bullet

        let hit = false
        for (let wordIdx = 0; wordIdx < newWords.length; wordIdx++) {
          const word = newWords[wordIdx]
          for (let letterIdx = 0; letterIdx < word.letters.length; letterIdx++) {
            const letter = word.letters[letterIdx]
            if (
              !letter.destroyed &&
              bullet.x >= letter.x - 10 &&
              bullet.x <= letter.x + 10 &&
              bullet.y >= letter.y - 15 &&
              bullet.y <= letter.y + 15
            ) {
              hit = true
              wordsUpdated = true
              newWords[wordIdx].letters[letterIdx].destroyed = true
              setScore(prev => prev + 10)
              // Play hit sound!
              soundManager.playHitSound()
              break
            }
          }
          if (hit) break
        }

        return hit ? { ...bullet, active: false } : bullet
      })

      // Collision detection - enemy bullets vs player
      if (!isInvincible) {
        const currentEnemyBullets = enemyBulletsRef.current
        const playerY = gameArea.height - 40
        const playerWidth = 20
        const playerHeight = 30

        let playerHit = false
        const updatedEnemyBullets: Bullet[] = []
        
        // Process bullets and check for collision - only process first hit
        for (const bullet of currentEnemyBullets) {
          if (!bullet.active) {
            updatedEnemyBullets.push(bullet)
            continue
          }

          // Check collision with player
          if (
            !playerHit && // Only check if we haven't been hit yet this frame
            bullet.x >= playerX - playerWidth / 2 &&
            bullet.x <= playerX + playerWidth / 2 &&
            bullet.y >= playerY - playerHeight / 2 &&
            bullet.y <= playerY + playerHeight / 2
          ) {
            playerHit = true
            // Don't add this bullet (it hit the player)
          } else {
            updatedEnemyBullets.push(bullet)
          }
        }

        if (playerHit) {
          // Play hit sound
          soundManager.playPlayerHitSound()
          
          // Start blinking and invincibility immediately
          setIsBlinking(true)
          setIsInvincible(true)
          
          // Remove hit enemy bullets
          enemyBulletsRef.current = updatedEnemyBullets
          setEnemyBullets(updatedEnemyBullets)
          
          // Lose a life (only once per hit)
          setLives(prevLives => {
            const newLives = prevLives - 1
            if (newLives <= 0 && !gameOver) {
              setGameOver(true)
              addAchievement({
                title: "Defeated",
                description: "The skills got the better of you this time. Better luck next time!",
              })
            }
            return newLives
          })
          
          // Stop blinking and invincibility after 2 seconds
          setTimeout(() => {
            setIsBlinking(false)
            setIsInvincible(false)
          }, 2000)
        } else {
          // Update enemy bullets even if no hit (for cleanup)
          enemyBulletsRef.current = updatedEnemyBullets
          setEnemyBullets(updatedEnemyBullets)
        }
      }
      // Note: Enemy bullets are already updated earlier in the game loop, 
      // so we don't need to update them again when invincible

      if (wordsUpdated) {
        wordsDataRef.current = newWords
        setWordsData(newWords)
      }
      const bulletsChanged = newBullets.some((bullet, idx) => 
        !currentBullets[idx] || bullet.active !== currentBullets[idx].active || 
        bullet.x !== currentBullets[idx].x || bullet.y !== currentBullets[idx].y
      )
      if (bulletsChanged || newBullets.length !== currentBullets.length) {
        bulletsRef.current = newBullets
        setBullets(newBullets)
      }

      // Check if words reached bottom
      setWordsData(prev => {
        let lostLife = false
        prev.forEach(word => {
          word.letters.forEach(letter => {
            if (!letter.destroyed && letter.y >= gameArea.height - 100) {
              lostLife = true
            }
          })
        })

        if (lostLife) {
          setLives(prevLives => {
            const newLives = prevLives - 1
            if (newLives <= 0 && !gameOver) {
              setGameOver(true)
              addAchievement({
                title: "Defeated",
                description: "The skills got the better of you this time. Better luck next time!",
              })
            }
            return newLives
          })
        }

        return prev
      })

      // Check if all letters destroyed
      setWordsData(prev => {
        const allDestroyed = prev.every(word =>
          word.letters.every(letter => letter.destroyed)
        )
        if (allDestroyed && prev.length > 0 && !gameWon) {
          setGameWon(true)
          addAchievement({
            title: "Space Invader",
            description: "You cleared all the skills! Impressive shooting!",
          })
        }
        return prev
      })

      animationFrameRef.current = requestAnimationFrame(gameLoop)
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [keys, gameOver, gameWon, gameArea, direction, moveDown, shootBullet, addAchievement, gameStarted, wordsData.length])

  const handleClose = () => {
    onGameEnd()
  }

  const handleRetry = () => {
    setGameStarted(false)
    setScore(0)
    setLives(3)
    setGameOver(false)
    setGameWon(false)
    setBullets([])
    setEnemyBullets([])
    setIsBlinking(false)
    setIsInvincible(false)
    setWordsData([])
    setDirection(1)
    setMoveDown(false)
    lastShotTimeRef.current = 0
    lastEnemyShotTimeRef.current = 0
  }

  if (!gameStarted) {
    return (
      <div className="space-invaders-game start-screen">
        <div className="how-to-play">
          <h2 className="title">How to Play</h2>
          <div className="instructions">
            <div className="instruction-item">
              <div className="key-icon-container">
                <div className="key-icon arrow-left">←</div>
                <div className="key-icon arrow-right">→</div>
              </div>
              <p>Move left and right</p>
            </div>
            <div className="instruction-item">
              <div className="key-icon-container">
                <div className="key-icon spacebar">
                  <span>SPACE</span>
                </div>
              </div>
              <p>Shoot bullets</p>
            </div>
            <div className="instruction-item">
              <p className="instruction-text">
                Destroy all the letters to win! Each letter is worth 10 points.
                You have 3 lives - game over if you lose all your lives or the words reach the bottom.
                <br />
                <br />
                <strong>Desktop:</strong> Use arrow keys (or A/D) to move, SPACE to shoot.
                <br />
                <strong>Mobile:</strong> Use the on-screen buttons at the bottom.
              </p>
            </div>
          </div>
          <button
            className="button is-primary start-button"
            onClick={handleStartGame}
          >
            Start Game
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-invaders-game">
      <div className="game-header">
        <div className="score">Score: {score}</div>
        <div className="header-right">
          <div className="lives">Lives: {lives}</div>
          <button
            className="button close-button"
            onClick={handleClose}
            title="Close game"
          >
            ✕
          </button>
        </div>
      </div>
      <div ref={gameAreaRef} className="game-area">
        {wordsData.map((word, wordIdx) =>
          word.letters.map((letter, letterIdx) =>
            !letter.destroyed ? (
              <div
                key={`${wordIdx}-${letterIdx}`}
                className="letter"
                style={{
                  left: `${letter.x}px`,
                  top: `${letter.y}px`,
                  color: word.color,
                }}
              >
                {letter.char}
              </div>
            ) : null
          )
        )}
        {bullets.map(
          (bullet, idx) =>
            bullet.active && (
              <div
                key={idx}
                className="bullet"
                style={{
                  left: `${bullet.x}px`,
                  top: `${bullet.y}px`,
                }}
              />
            )
        )}
        {enemyBullets.map(
          (bullet, idx) =>
            bullet.active && (
              <div
                key={`enemy-${idx}`}
                className="bullet enemy-bullet"
                style={{
                  left: `${bullet.x}px`,
                  top: `${bullet.y}px`,
                }}
              />
            )
        )}
        <div
          className={`player-ship ${isBlinking ? 'blinking' : ''}`}
          style={{
            left: `${playerX}px`,
            bottom: "20px",
          }}
        >
          ▲
        </div>
        {(gameOver || gameWon) && (
          <div className="game-overlay">
            <div className="game-message">
              <h2 className="title">{gameWon ? "You Win!" : "Game Over"}</h2>
              <p>Final Score: {score}</p>
              <div className="game-buttons">
                <button
                  className="button is-primary retry-button"
                  onClick={handleRetry}
                >
                  Retry
                </button>
                <button
                  className="button close-game-button"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Mobile touch controls */}
      <div className="mobile-controls">
        <button
          className="control-button left-button"
          onTouchStart={(e) => {
            e.preventDefault()
            setKeys(prev => ({ ...prev, left: true }))
          }}
          onTouchEnd={(e) => {
            e.preventDefault()
            setKeys(prev => ({ ...prev, left: false }))
          }}
          onTouchCancel={(e) => {
            e.preventDefault()
            setKeys(prev => ({ ...prev, left: false }))
          }}
          onMouseDown={(e) => {
            e.preventDefault()
            setKeys(prev => ({ ...prev, left: true }))
          }}
          onMouseUp={(e) => {
            e.preventDefault()
            setKeys(prev => ({ ...prev, left: false }))
          }}
          onMouseLeave={(e) => {
            e.preventDefault()
            setKeys(prev => ({ ...prev, left: false }))
          }}
        >
          ←
        </button>
        <button
          className="control-button shoot-button"
          onTouchStart={(e) => {
            e.preventDefault()
            setKeys(prev => ({ ...prev, shoot: true }))
          }}
          onTouchEnd={(e) => {
            e.preventDefault()
            setKeys(prev => ({ ...prev, shoot: false }))
          }}
          onTouchCancel={(e) => {
            e.preventDefault()
            setKeys(prev => ({ ...prev, shoot: false }))
          }}
          onMouseDown={(e) => {
            e.preventDefault()
            setKeys(prev => ({ ...prev, shoot: true }))
          }}
          onMouseUp={(e) => {
            e.preventDefault()
            setKeys(prev => ({ ...prev, shoot: false }))
          }}
          onMouseLeave={(e) => {
            e.preventDefault()
            setKeys(prev => ({ ...prev, shoot: false }))
          }}
        >
          ⚡
        </button>
        <button
          className="control-button right-button"
          onTouchStart={(e) => {
            e.preventDefault()
            setKeys(prev => ({ ...prev, right: true }))
          }}
          onTouchEnd={(e) => {
            e.preventDefault()
            setKeys(prev => ({ ...prev, right: false }))
          }}
          onTouchCancel={(e) => {
            e.preventDefault()
            setKeys(prev => ({ ...prev, right: false }))
          }}
          onMouseDown={(e) => {
            e.preventDefault()
            setKeys(prev => ({ ...prev, right: true }))
          }}
          onMouseUp={(e) => {
            e.preventDefault()
            setKeys(prev => ({ ...prev, right: false }))
          }}
          onMouseLeave={(e) => {
            e.preventDefault()
            setKeys(prev => ({ ...prev, right: false }))
          }}
        >
          →
        </button>
      </div>
    </div>
  )
}

