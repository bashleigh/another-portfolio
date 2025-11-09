import React, { useState, useEffect, useCallback } from "react"
import Typewriter from "typewriter-effect"
import "./pokemon-battle.scss"
import { Ability, Character } from "./types"
import { playerCharacters } from "./user-pokemon"
import { battleMusicManager } from "./battle-music"
import { PokemonStats } from "./pokemon-stats"
import ricoSpriteUrl from "./images/richie.webp?url"
import captainEvertonSpriteUrl from "./images/captain-robert-everton.webp?url"

type PokemonBattleProps = {
  onBack: () => void
  setRickNarration: (narration: string, expression?: "normal" | "panic" | "excited" | "sarcastic" | "showoff") => void
  clearRickNarration: () => void
}

const rico: Character = {
  id: "rico",
  name: "RICO",
  level: "L10",
  hp: 150,
  maxHp: 150,
  sprite: "rico",
  image: ricoSpriteUrl,
  abilities: [
    { name: "Steve", type: "attack", damage: 5, description: "Steve!" },
    { name: "STEVE", type: "attack", damage: 10, description: "STEVE!" },
    { name: "Steve...", type: "attack", damage: 2, description: "Steve..." },
    { name: "STEVE!!!", type: "attack", damage: 11, description: "STEVE!!!" },
  ],
}

const captainEverton: Character = {
  id: "captain-everton",
  name: "CAPTAIN EVERTON",
  level: "L11",
  hp: 175,
  maxHp: 175,
  sprite: "captain-everton",
  image: captainEvertonSpriteUrl,
  abilities: [
    { name: "Power Grab", type: "attack", damage: 20, description: "Captain Everton reaches for power!" },
    { name: "Virus Conversion", type: "debuff", description: "Captain Everton tries to convert you to the virus!" },
    { name: "Release the Virus", type: "attack", damage: 22, description: "Captain Everton attempts to set the virus free!" },
    { name: "World Domination", type: "attack", damage: 18, description: "Captain Everton seeks to escape and rule the world!" },
  ],
}

const virus: Character = {
  id: "virus",
  name: "VIRUS",
  level: "L12",
  hp: 200,
  maxHp: 200,
  sprite: "virus",
  abilities: [
    { name: "Virus Attack", type: "attack", damage: 25, description: "The virus machine attacks with malicious code!" },
    { name: "System Override", type: "debuff", description: "The virus overrides your systems!" },
    { name: "Spare Parts", type: "attack", damage: 30, description: "The virus machine demands spare parts!" },
  ],
}

type MenuState = "main" | "fight" | "pokemon"

export const PokemonBattle: React.FC<PokemonBattleProps> = ({
  onBack,
  setRickNarration,
}) => {
  const [playerTeam, setPlayerTeam] = useState<Character[]>(playerCharacters)
  const [opponentState, setOpponentState] = useState<Character>(rico)
  const [currentEnemy, setCurrentEnemy] = useState<"rico" | "captain" | "virus">("rico")
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [description, setDescription] = useState<string>("")
  const [descriptionOverlay, setDescriptionOverlay] = useState<string>("")
  const [showDescriptionOverlay, setShowDescriptionOverlay] = useState(false)
  const [menuState, setMenuState] = useState<MenuState>("main")
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0)
  const [selectedAbilityIndex, setSelectedAbilityIndex] = useState(0)
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(0)
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [gameOver, setGameOver] = useState<"win" | "lose" | null>(null)
  const [characterAnimating, setCharacterAnimating] = useState<string | null>(null)
  const [showIntro, setShowIntro] = useState(true)
  const [introTextFinished, setIntroTextFinished] = useState(false)

  const currentPlayer = playerTeam[currentPlayerIndex]

  useEffect(() => {
    setRickNarration(
      "Pokemon? Really? *burp* In 2025? Well, at least it's not another terminal command. Pick your character and fight!",
      "sarcastic"
    )
    
    // Start battle music (async, but we don't need to await)
    battleMusicManager.start().catch(err => {
      console.warn("Failed to start battle music:", err)
    })
    
    return () => {
      // Stop music when component unmounts
      battleMusicManager.stop()
    }
  }, [setRickNarration])

  // Handle transition after intro text finishes typing + 5000ms wait
  useEffect(() => {
    if (introTextFinished) {
      const transitionTimer = setTimeout(() => {
        setShowIntro(false)
        setDescription("What will you do?")
      }, 5000)
      
      return () => {
        clearTimeout(transitionTimer)
      }
    }
  }, [introTextFinished])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Skip intro on Enter or Space (only after text has finished typing)
    if (showIntro) {
      if ((e.key === "Enter" || e.key === " ") && introTextFinished) {
        e.preventDefault()
        setShowIntro(false)
        setDescription("What will you do?")
      }
      return
    }
    
    if (gameOver || !isPlayerTurn) return

    if (menuState === "main") {
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedMenuIndex(prev => (prev === 0 || prev === 1 ? prev : prev - 2))
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedMenuIndex(prev => (prev === 2 || prev === 3 ? prev : prev < 2 ? prev + 2 : prev))
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        setSelectedMenuIndex(prev => (prev % 2 === 1 ? prev - 1 : prev))
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        setSelectedMenuIndex(prev => (prev % 2 === 0 ? prev + 1 : prev))
      } else if (e.key === "Enter") {
        e.preventDefault()
        handleMainMenuSelect(selectedMenuIndex)
      }
    } else if (menuState === "fight") {
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedAbilityIndex(prev => (prev === 0 || prev === 1 ? prev : prev - 2))
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedAbilityIndex(prev => (prev === 2 || prev === 3 ? prev : prev < 2 ? prev + 2 : prev))
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        setSelectedAbilityIndex(prev => (prev % 2 === 1 ? prev - 1 : prev))
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        setSelectedAbilityIndex(prev => (prev % 2 === 0 ? prev + 1 : prev))
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (currentPlayer?.abilities[selectedAbilityIndex]) {
          executeAbility(currentPlayer.abilities[selectedAbilityIndex])
        }
      } else if (e.key === "Escape" || e.key === "Backspace") {
        e.preventDefault()
        setMenuState("main")
        setSelectedMenuIndex(0)
      }
    } else if (menuState === "pokemon") {
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedPokemonIndex(prev => (prev > 0 ? prev - 1 : playerTeam.length - 1))
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedPokemonIndex(prev => (prev < playerTeam.length - 1 ? prev + 1 : 0))
      } else if (e.key === "Enter") {
        e.preventDefault()
        switchToPokemon(selectedPokemonIndex)
      } else if (e.key === "Escape" || e.key === "Backspace") {
        e.preventDefault()
        setMenuState("main")
        setSelectedMenuIndex(1)
      }
    }
  }, [menuState, selectedMenuIndex, selectedAbilityIndex, selectedPokemonIndex, gameOver, isPlayerTurn, currentPlayer, playerTeam, showIntro, introTextFinished, currentEnemy])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const handleMainMenuSelect = (index: number) => {
    if (index === 0) {
      // FIGHT
      setMenuState("fight")
      setSelectedAbilityIndex(0)
    } else if (index === 1) {
      // PkMn
      setMenuState("pokemon")
      setSelectedPokemonIndex(0)
    } else if (index === 2) {
      // ITEM/BAG
      setRickNarration("What you gonna do Morty? Hit it with your handbag? *burp*", "sarcastic")
    } else if (index === 3) {
      // RUN
      setRickNarration("Morty, you can't run away from this fight! Man up for christ sake! *burp*", "panic")
    }
  }

  const showDescriptionWithTypewriter = (text: string, onComplete?: () => void) => {
    setDescriptionOverlay(text)
    setShowDescriptionOverlay(true)
    
    // Calculate time for typewriter (rough estimate: 30ms per character + 2000ms display time)
    const typeTime = text.length * 30
    const displayTime = 2000
    
    setTimeout(() => {
      setShowDescriptionOverlay(false)
      setDescriptionOverlay("")
      if (onComplete) {
        setTimeout(onComplete, 100)
      }
    }, typeTime + displayTime)
  }

  const executeAbility = (ability: Ability) => {
    if (!isPlayerTurn || !currentPlayer) return

    setMenuState("main")
    setSelectedMenuIndex(0)
    setCharacterAnimating(currentPlayer.id)
    setDescription("")
    
    const firstMessage = `${currentPlayer.name} uses ${ability.name}!`
    showDescriptionWithTypewriter(firstMessage, () => {
      if (ability.type === "attack" && ability.damage) {
        const newHp = Math.max(0, opponentState.hp - ability.damage!)
        setOpponentState(prev => ({
          ...prev,
          hp: newHp,
        }))
        
        const damageMessage = `It deals ${ability.damage} damage!`
        showDescriptionWithTypewriter(damageMessage, () => {
          setCharacterAnimating(null)
          
          if (newHp <= 0) {
            const defeatMessage = `${opponentState.name} fainted!`
            showDescriptionWithTypewriter(defeatMessage, () => {
              if (currentEnemy === "rico") {
                // Rico is defeated, transition to Captain Everton
                const captainDeployMessage = "CAPTAIN EVERTON appears! He's been converted to the virus!"
                showDescriptionWithTypewriter(captainDeployMessage, () => {
                  setCurrentEnemy("captain")
                  setOpponentState(captainEverton)
                  setDescription("What will you do?")
                  setIsPlayerTurn(true)
                  setRickNarration("Oh jeez, Morty! *burp* Captain Everton wants power and he's trying to set the virus free!", "panic")
                })
                return
              } else if (currentEnemy === "captain") {
                // Captain Everton is defeated, transition to Virus
                const virusDeployMessage = "VIRUS has been deployed!"
                showDescriptionWithTypewriter(virusDeployMessage, () => {
                  setCurrentEnemy("virus")
                  setOpponentState(virus)
                  setDescription("What will you do?")
                  setIsPlayerTurn(true)
                  setRickNarration("Oh crap, Morty! *burp* Now the virus is here! This is bad!", "panic")
                })
                return
              } else {
                // Virus is defeated, player wins
                setTimeout(() => {
                  setGameOver("win")
                  setDescription("You won!")
                  setRickNarration("YES! *burp* You won, Morty! Now get me out of here!", "excited")
                }, 1000)
                return
              }
            })
            return
          }

          setTimeout(() => {
            setIsPlayerTurn(false)
            opponentTurn()
          }, 500)
        })
      } else {
        showDescriptionWithTypewriter(ability.description, () => {
          setCharacterAnimating(null)
          setTimeout(() => {
            setIsPlayerTurn(false)
            opponentTurn()
          }, 500)
        })
      }
    })
  }

  const opponentTurn = () => {
    const opponentAbility = opponentState.abilities[Math.floor(Math.random() * opponentState.abilities.length)]
    setCharacterAnimating(opponentState.id)
    setDescription("")
    
    const firstMessage = `${opponentState.name} uses ${opponentAbility.name}!`
    showDescriptionWithTypewriter(firstMessage, () => {
      if (opponentAbility.type === "attack" && opponentAbility.damage) {
        const isSpareParts = opponentAbility.name === "Spare Parts"
        const updatedTeam = playerTeam.map((char, index) => {
          if (index === currentPlayerIndex) {
            const newHp = Math.max(0, char.hp - opponentAbility.damage!)
            if (newHp === 0) {
              const faintMessage = `${char.name} fainted!`
              showDescriptionWithTypewriter(faintMessage, () => {
                const damageMessage = `It deals ${opponentAbility.damage} damage!`
                showDescriptionWithTypewriter(damageMessage, () => {
                  // Heal virus if it's Spare Parts
                  if (isSpareParts) {
                    const damageDealt = Math.min(opponentAbility.damage!, char.hp)
                    setOpponentState(prev => ({
                      ...prev,
                      hp: Math.min(prev.maxHp, prev.hp + damageDealt),
                    }))
                    const healMessage = `${opponentState.name} restored ${damageDealt} HP!`
                    showDescriptionWithTypewriter(healMessage, () => {
                      setCharacterAnimating(null)
                      setIsPlayerTurn(true)
                      
                      if (updatedTeam.every(char => char.hp === 0)) {
                        setTimeout(() => {
                          setGameOver("lose")
                          setDescription("You lost!")
                          setRickNarration("Oh no, Morty! *burp* You lost! Try again!", "panic")
                        }, 1000)
                        return
                      }

                      // Open pokemon selection panel
                      const firstAliveIndex = updatedTeam.findIndex(char => char.hp > 0)
                      if (firstAliveIndex !== -1) {
                        setSelectedPokemonIndex(firstAliveIndex)
                      }
                      setMenuState("pokemon")
                    })
                  } else {
                    setCharacterAnimating(null)
                    setIsPlayerTurn(true)
                    
                    if (updatedTeam.every(char => char.hp === 0)) {
                      setTimeout(() => {
                        setGameOver("lose")
                        setDescription("You lost!")
                        setRickNarration("Oh no, Morty! *burp* You lost! Try again!", "panic")
                      }, 1000)
                      return
                    }

                    // Open pokemon selection panel
                    const firstAliveIndex = updatedTeam.findIndex(char => char.hp > 0)
                    if (firstAliveIndex !== -1) {
                      setSelectedPokemonIndex(firstAliveIndex)
                    }
                    setMenuState("pokemon")
                  }
                })
              })
            } else {
              const damageMessage = `It deals ${opponentAbility.damage} damage!`
              showDescriptionWithTypewriter(damageMessage, () => {
                // Heal virus if it's Spare Parts
                if (isSpareParts) {
                  const damageDealt = opponentAbility.damage!
                  setOpponentState(prev => ({
                    ...prev,
                    hp: Math.min(prev.maxHp, prev.hp + damageDealt),
                  }))
                  const healMessage = `${opponentState.name} restored ${damageDealt} HP!`
                  showDescriptionWithTypewriter(healMessage, () => {
                    setCharacterAnimating(null)
                    setIsPlayerTurn(true)
                    setDescription("What will you do?")
                  })
                } else {
                  setCharacterAnimating(null)
                  setIsPlayerTurn(true)
                  setDescription("What will you do?")
                }
              })
            }
            return { ...char, hp: newHp }
          }
          return char
        })
        setPlayerTeam(updatedTeam)
      } else {
        showDescriptionWithTypewriter(opponentAbility.description, () => {
          setCharacterAnimating(null)
          setIsPlayerTurn(true)
          setDescription("What will you do?")
        })
      }
    })
  }

  const switchToPokemon = (index: number) => {
    // Allow switching if target is alive and it's a different pokemon
    if (playerTeam[index].hp > 0 && index !== currentPlayerIndex) {
      setCurrentPlayerIndex(index)
      setMenuState("main")
      setSelectedMenuIndex(0)
      setDescription(`Go! ${playerTeam[index].name}!`)
    }
  }

  const mainMenuItems = ["FIGHT", "PkMn", "ITEM", "RUN"]

  return (
    <div className="pokemon-battle">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <div className="battle-arena">
        {/* Top Section - Battle Area */}
        <div className="battle-area">
          {/* Enemy Stats - Top Left */}
          {/* <div className="enemy-stats">
            <div className="stat-name">{opponentState.name}</div>
            <div className="stat-level">{opponentState.level}</div>
            <div className="hp-label">HP:</div>
            <div className="hp-bar-container">
              <div
                className="hp-bar-fill"
                style={{ width: `${(opponentState.hp / opponentState.maxHp) * 100}%` }}
              />
            </div>
          </div> */}
          <PokemonStats opponentState={opponentState} isOpponent={true} />

          {/* Enemy Sprite - Top Right */}
          <div className={`enemy-sprite ${characterAnimating === opponentState.id ? "attacking" : ""} ${showIntro && currentEnemy === "rico" ? "bursting-through" : ""}`}>
            {opponentState.image ? (
              <img src={opponentState.image} alt={opponentState.name} className="sprite-image" />
            ) : (
              <div className="sprite-placeholder">
                <p>{opponentState.name}</p>
                <p className="small">(Sprite placeholder)</p>
              </div>
            )}
          </div>

          {/* Player Sprite - Bottom Left */}
          <div className={`player-sprite ${characterAnimating === currentPlayer?.id ? "attacking" : ""}`}>
            {currentPlayer?.image ? (
              <img src={currentPlayer.image} alt={currentPlayer.name} className="sprite-image" />
            ) : (
              <div className="sprite-placeholder">
                <p>{currentPlayer?.name}</p>
                <p className="small">(Sprite placeholder)</p>
              </div>
            )}
          </div>

          {/* Player Stats - Bottom Right */}
          {/* <div className="player-stats">
            <div className="stat-name">{currentPlayer?.name}</div>
            <div className="stat-level">{currentPlayer?.level}</div>
            <div className="hp-label">HP:</div>
            <div className="hp-bar-container">
              <div
                className="hp-bar-fill"
                style={{ width: `${currentPlayer ? (currentPlayer.hp / currentPlayer.maxHp) * 100 : 0}%` }}
              />
            </div>
            <div className="hp-numbers">
              {currentPlayer?.hp} / {currentPlayer?.maxHp}
            </div>
          </div> */}
          <PokemonStats opponentState={currentPlayer} isOpponent={false} />

        </div>

        {/* Bottom Section - Description and Menu */}
        {menuState !== "pokemon" && (
          <div className="bottom-panels">
            {showDescriptionOverlay ? (
              /* Description Overlay - Full width when shown */
              <div className="description-overlay">
                <div className="description-overlay-content">
                  <Typewriter
                    options={{
                      delay: 30,
                      cursor: "",
                    }}
                    onInit={typewriter => {
                      typewriter
                        .typeString(descriptionOverlay)
                        .start()
                    }}
                  />
                </div>
              </div>
            ) : (
              <>
                {/* Left Panel - Description */}
                <div className="description-panel">
                  {showIntro ? (
                    <Typewriter
                      options={{
                        delay: 50,
                        cursor: "",
                      }}
                      onInit={typewriter => {
                        typewriter
                          .typeString("Rico bursts through the wall! He wants your organs for spare parts!")
                          .callFunction(() => {
                            setIntroTextFinished(true)
                          })
                          .start()
                      }}
                    />
                  ) : (
                    <p>{description || "What will you do?"}</p>
                  )}
                </div>

                {/* Right Panel - Menu (hidden during intro) */}
                {!showIntro && (
                  <div className="menu-panel">
                    {menuState === "main" && (
                      <div className="menu-grid">
                        {mainMenuItems.map((item, index) => (
                          <div
                            key={index}
                            className={`menu-item ${index === selectedMenuIndex ? "selected" : ""}`}
                            onClick={() => {
                              setSelectedMenuIndex(index)
                              handleMainMenuSelect(index)
                            }}
                            onMouseEnter={() => setSelectedMenuIndex(index)}
                          >
                            {index === selectedMenuIndex && <span className="cursor">▶</span>}
                            {item}
                          </div>
                        ))}
                      </div>
                    )}

                    {menuState === "fight" && currentPlayer && (
                      <div className="menu-grid">
                        {currentPlayer.abilities.map((ability, index) => (
                          <div
                            key={index}
                            className={`menu-item ${index === selectedAbilityIndex ? "selected" : ""}`}
                            onClick={() => executeAbility(ability)}
                            onMouseEnter={() => setSelectedAbilityIndex(index)}
                          >
                            {index === selectedAbilityIndex && <span className="cursor">▶</span>}
                            {ability.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Full Screen Pokemon Selection */}
        {menuState === "pokemon" && (
          <div className="pokemon-selection-fullscreen">
            <div className="pokemon-list-fullscreen">
              {playerTeam.map((char, index) => (
                <div
                  key={char.id}
                  className={`pokemon-list-item ${index === selectedPokemonIndex ? "selected" : ""} ${char.hp === 0 ? "fainted" : ""}`}
                  onClick={() => switchToPokemon(index)}
                  onMouseEnter={() => setSelectedPokemonIndex(index)}
                >
                  <div className="pokemon-icon">
                    {index === selectedPokemonIndex && <span className="cursor">▶</span>}
                    <div className="sprite-placeholder small">
                      {char.name}
                    </div>
                  </div>
                  <div className="pokemon-stats">
                    <div className="pokemon-name">{char.name}</div>
                    <div className="pokemon-level">{char.level}</div>
                    <div className="pokemon-hp">HP: {char.hp} / {char.maxHp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {gameOver && (
        <div className="game-over-overlay">
          <div className="game-over-screen">
            <h2>{gameOver === "win" ? "Victory!" : "Defeat!"}</h2>
            <button onClick={onBack}>Return to Menu</button>
          </div>
        </div>
      )}
    </div>
  )
}
