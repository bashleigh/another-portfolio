import React, { useState, useEffect, useCallback } from "react"
import Typewriter from "typewriter-effect"
import "./pokemon-battle.scss"
import { Ability, Character } from "./types"
import { playerCharacters } from "./user-pokemon"
import { attackSoundManager } from "./attack-sounds"
import { PokemonStats } from "./pokemon-stats"
import { useRickOverlay } from "../rick-overlay-context"
import { calculateHpFromLevel, getAbilityDamage, applyStatusEffectsToDamage, checkDodge, decrementStatusEffects, addStatusEffect } from "./utils"
import { StatusEffect } from "./types"
import ricoSpriteUrl from "./images/richie.webp?url"
import captainEvertonSpriteUrl from "./images/captain-robert-everton.webp?url"
import alienImageUrl from "./images/virus.webp?url"

type PokemonBattleProps = {
  onBack: () => void
}

const ricoBaseHp = calculateHpFromLevel("L10", 150)
const rico: Character = {
  id: "rico",
  name: "RICO",
  level: "L10",
  hp: ricoBaseHp,
  maxHp: ricoBaseHp,
  sprite: "rico",
  image: ricoSpriteUrl,
  abilities: [
    { name: "Steve", type: "attack", damage: { min: 3, max: 7 }, description: "Steve!", soundEffect: "steve" },
    { name: "STEVE", type: "attack", damage: { min: 8, max: 12 }, description: "STEVE!", soundEffect: "steve-loud" },
    { name: "Steve...", type: "attack", damage: { min: 1, max: 3 }, description: "Steve...", soundEffect: "steve-soft" },
    { name: "STEVE!!!", type: "attack", damage: { min: 9, max: 13 }, description: "STEVE!!!", soundEffect: "steve-excited" },
  ],
}

const captainEvertonBaseHp = calculateHpFromLevel("L50", 175)
const captainEverton: Character = {
  id: "captain-everton",
  name: "CAPTAIN EVERTON",
  level: "L50",
  hp: captainEvertonBaseHp,
  maxHp: captainEvertonBaseHp,
  sprite: "captain-everton",
  image: captainEvertonSpriteUrl,
  abilities: [
    { name: "Power Grab", type: "attack", damage: { min: 10, max: 50 }, description: "Captain Everton reaches for power!", soundEffect: "power-grab" },
    { name: "Machine Conversion", type: "debuff", description: "Captain Everton submits to the Alien Entity!", soundEffect: "virus-conversion" },
    { name: "Release the Alien Entity", type: "attack", damage: { min: 40, max: 75 }, description: "Captain Everton attempts to set the Alien Entity free!", soundEffect: "release-virus" },
    { name: "World Domination", type: "attack", damage: { min: 30, max: 100 }, description: "Captain Everton seeks to escape and rule the world!", soundEffect: "world-domination" },
  ],
}

const alienEntityHp = calculateHpFromLevel("L99", 200)
const alienEntity: Character = {
  id: "alien-entity",
  name: "Alien Entity",
  level: "L99",
  hp: alienEntityHp,
  maxHp: alienEntityHp,
  sprite: "virus",
  image: alienImageUrl,
  abilities: [
    { name: "Terminal Attack", type: "attack", damage: { min: 50, max: 100 }, description: "The Alien machine attacks with malicious code!", soundEffect: "virus-attack" },
    { name: "System Override", type: "debuff", description: "The Alien machine overrides your systems!", soundEffect: "system-override" },
    { name: "Spare Parts", type: "attack", damage: { min: 50, max: 150 }, description: "The Alien machine requires you for spare parts! Oxygenated tissues, vagus nerve...", soundEffect: "spare-parts" },
    { name: "Machine Swarm", type: "attack", damage: { min: 25, max: 50 }, description: "The Alien machine releases a swarm of machines to attack you!", soundEffect: "machine-swarm" },
  ],
}

type MenuState = "main" | "fight" | "pokemon"

const GRID_NAVIGATION_KEYS = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"])
const CONFIRM_KEY = "Enter"

const isBackKey = (key: string) => key === "Escape" || key === "Backspace"

const moveWithinGrid = (key: string, currentIndex: number, totalItems: number, columns = 2) => {
  if (!GRID_NAVIGATION_KEYS.has(key) || totalItems <= 0) return currentIndex

  const row = Math.floor(currentIndex / columns)
  const col = currentIndex % columns
  switch (key) {
    case "ArrowUp": {
      if (row === 0) return currentIndex
      const nextIndex = currentIndex - columns
      return nextIndex >= 0 ? nextIndex : currentIndex
    }
    case "ArrowDown": {
      const nextIndex = currentIndex + columns
      return nextIndex < totalItems ? nextIndex : currentIndex
    }
    case "ArrowLeft": {
      return col === 0 ? currentIndex : currentIndex - 1
    }
    case "ArrowRight": {
      const nextIndex = currentIndex + 1
      const isAtRowEnd = col === columns - 1 || nextIndex >= totalItems
      return isAtRowEnd ? currentIndex : nextIndex
    }
    default:
      return currentIndex
  }
}

const moveWithinList = (key: string, currentIndex: number, totalItems: number) => {
  if (totalItems <= 0) return currentIndex

  switch (key) {
    case "ArrowUp":
      return currentIndex > 0 ? currentIndex - 1 : totalItems - 1
    case "ArrowDown":
      return currentIndex < totalItems - 1 ? currentIndex + 1 : 0
    default:
      return currentIndex
  }
}

const MAIN_MENU_ITEMS = ["FIGHT", "PkMn", "ITEM", "RUN"] as const

export const PokemonBattle: React.FC<PokemonBattleProps> = ({
  onBack,
}) => {
  const { showRick } = useRickOverlay()
  const [playerTeam, setPlayerTeam] = useState<Character[]>(playerCharacters)
  const [opponentState, setOpponentState] = useState<Character>(rico)
  const [currentEnemy, setCurrentEnemy] = useState<"rico" | "captain" | "alien-entity">("rico")
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
  const [introGoMessageShown, setIntroGoMessageShown] = useState(false)

  const currentPlayer = playerTeam[currentPlayerIndex]

  useEffect(() => {
    showRick(
      "Pokemon? Really? *burp* In 2025? Well, at least it's not another terminal command. Pick your character and fight!",
      "sarcastic",
      5000
    )
  }, [showRick])

  // Show a "Go {character}!" message once after the intro text finishes
  useEffect(() => {
    if (introTextFinished && !introGoMessageShown) {
      const firstCharacter = playerTeam[0]
      if (!firstCharacter) return

      setIntroGoMessageShown(true)
      const goMessage = `Go ${firstCharacter.name}!`

      showDescriptionWithTypewriter(goMessage, () => {
        setShowIntro(false)
        setDescription("What will you do?")
      })
    }
  }, [introTextFinished, introGoMessageShown, playerTeam])

  const handleMainMenuSelect = useCallback((index: number) => {
    switch (index) {
      case 0: // FIGHT
        setMenuState("fight")
        setSelectedAbilityIndex(0)
        break
      case 1: // PkMn
        setMenuState("pokemon")
        setSelectedPokemonIndex(0)
        break
      case 2: // ITEM/BAG
        showRick("What you gonna do Morty? Hit it with your handbag? *burp*", "sarcastic", 3000)
        break
      case 3: // RUN
        showRick("Morty, you can't run away from this fight! Man up for christ sake! *burp*", "panic", 3000)
        break
      default:
        break
    }
  }, [showRick])

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
    
    // Play attack sound effect
    if (ability.soundEffect) {
      attackSoundManager.playAttackSound(ability.soundEffect).catch(err => {
        console.warn("Failed to play attack sound:", err)
      })
    }
    
    const firstMessage = `${currentPlayer.name} uses ${ability.name}!`
    showDescriptionWithTypewriter(firstMessage, () => {
      if (ability.type === "attack" && ability.damage) {
        let baseDamage = getAbilityDamage(ability.damage)
        // Apply attack boosts from status effects
        baseDamage = applyStatusEffectsToDamage(baseDamage, currentPlayer, true)
        const finalDamage = applyStatusEffectsToDamage(baseDamage, opponentState, false)
        const newHp = Math.max(0, opponentState.hp - finalDamage)
        setOpponentState(prev => ({
          ...prev,
          hp: newHp,
        }))
        
        const damageMessage = `It deals ${finalDamage} damage!`
        showDescriptionWithTypewriter(damageMessage, () => {
          setCharacterAnimating(null)
          
          if (newHp <= 0) {
            const defeatMessage = `${opponentState.name} fainted!`
            showDescriptionWithTypewriter(defeatMessage, () => {
              if (currentEnemy === "rico") {
                // Rico is defeated, transition to Captain Everton
                const captainDeployMessage = "CAPTAIN EVERTON appears! He's been converted to the machine!"
                showDescriptionWithTypewriter(captainDeployMessage, () => {
                  setCurrentEnemy("captain")
                  setOpponentState(captainEverton)
                  setDescription("What will you do?")
                  setIsPlayerTurn(true)
                  showRick("Oh jeez, Morty! *burp* Captain Everton wants power and he's trying to set the alien free!", "panic", 5000)
                })
                return
              } else if (currentEnemy === "captain") {
                // Captain Everton is defeated, transition to Virus
                const virusDeployMessage = "VIRUS has been deployed!"
                showDescriptionWithTypewriter(virusDeployMessage, () => {
                  setCurrentEnemy("alien-entity")
                  setOpponentState(alienEntity)
                  setDescription("What will you do?")
                  setIsPlayerTurn(true)
                  showRick("Oh crap, Morty! *burp* Now the alien entity is here! This is bad!", "panic", 5000)
                })
                return
              } else {
                // Virus is defeated, player wins
                setTimeout(() => {
                  setGameOver("win")
                  setDescription("You won!")
                  showRick("YES! *burp* You won, Morty! Now get me out of here!", "excited", 5000)
                }, 1000)
                return
              }
            })
            return
          }

          // Decrement status effects after attack
          setPlayerTeam(prev => prev.map((char, idx) => 
            idx === currentPlayerIndex ? decrementStatusEffects(char) : char
          ))
          
          setTimeout(() => {
            setIsPlayerTurn(false)
            opponentTurn()
          }, 500)
        })
      } else if (ability.type === "buff") {
        // Handle buff abilities
        let statusEffect: StatusEffect | null = null
        
        if (ability.name === "Dodge") {
          statusEffect = { type: "dodge", value: 50, duration: 2 } // 50% dodge chance for 2 turns
        } else if (ability.name === "Bullet Time") {
          statusEffect = { type: "dodge", value: 40, duration: 3 } // 40% dodge chance for 3 turns
        } else if (ability.name === "I Know Kung Fu") {
          statusEffect = { type: "attackBoost", value: 25, duration: 1 } // +25% attack for next turn only
        } else if (ability.name === "Translate") {
          statusEffect = { type: "defenseBoost", value: 20, duration: 3 } // +20% defense for 3 turns
        } else if (ability.name === "Philosophy") {
          statusEffect = { type: "attackBoost", value: 15, duration: 1 } // +15% attack for next turn only
        } else if (ability.name === "Borg Shield") {
          statusEffect = { type: "defenseBoost", value: 30, duration: 2 } // +30% defense for 2 turns
        }
        
        if (statusEffect) {
          setPlayerTeam(prev => prev.map((char, idx) => 
            idx === currentPlayerIndex ? addStatusEffect(char, statusEffect!) : char
          ))
        }
        
        // Use original ability description
        showDescriptionWithTypewriter(ability.description, () => {
          setCharacterAnimating(null)
          setTimeout(() => {
            setIsPlayerTurn(false)
            opponentTurn()
          }, 500)
        })
      } else if (ability.type === "debuff") {
        // Handle debuff abilities - apply effects to opponent
        let statusEffect: StatusEffect | null = null
        
        if (ability.name === "Hack") {
          statusEffect = { type: "attackReduction", value: 20, duration: 2 } // -20% attack for 2 turns
        } else if (ability.name === "Virus Conversion") {
          statusEffect = { type: "attackReduction", value: 15, duration: 3 } // -15% attack for 3 turns
        } else if (ability.name === "System Override") {
          statusEffect = { type: "defenseReduction", value: 25, duration: 2 } // -25% defense for 2 turns
        } else if (ability.name === "What If") {
          statusEffect = { type: "attackReduction", value: 10, duration: 2 } // -10% attack for 2 turns
        } else if (ability.name === "Resistance is Futile") {
          statusEffect = { type: "defenseReduction", value: 20, duration: 2 } // -20% defense for 2 turns
        }
        
        if (statusEffect) {
          setOpponentState(prev => addStatusEffect(prev, statusEffect!))
        }
        
        // Use original ability description
        showDescriptionWithTypewriter(ability.description, () => {
          setCharacterAnimating(null)
          setTimeout(() => {
            setIsPlayerTurn(false)
            opponentTurn()
          }, 500)
        })
      } else {
        // Joke abilities - no effect
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
    
    // Play attack sound effect
    if (opponentAbility.soundEffect) {
      attackSoundManager.playAttackSound(opponentAbility.soundEffect).catch(err => {
        console.warn("Failed to play attack sound:", err)
      })
    }
    
    const firstMessage = `${opponentState.name} uses ${opponentAbility.name}!`
    showDescriptionWithTypewriter(firstMessage, () => {
      if (opponentAbility.type === "attack" && opponentAbility.damage) {
        // Check for dodge first
        const currentPlayerChar = playerTeam[currentPlayerIndex]
        if (checkDodge(currentPlayerChar)) {
          const dodgeMessage = `${currentPlayerChar.name} dodged the attack!`
          showDescriptionWithTypewriter(dodgeMessage, () => {
            // Decrement all status effects (dodge effect remains if duration > 0)
            setPlayerTeam(prev => prev.map((char, idx) => 
              idx === currentPlayerIndex ? decrementStatusEffects(char) : char
            ))
            setOpponentState(prev => decrementStatusEffects(prev))
            
            setCharacterAnimating(null)
            setIsPlayerTurn(true)
            setDescription("What will you do?")
          })
          return
        }
        
        let baseDamage = getAbilityDamage(opponentAbility.damage)
        // Apply attack boosts from opponent's status effects
        baseDamage = applyStatusEffectsToDamage(baseDamage, opponentState, true)
        const finalDamage = applyStatusEffectsToDamage(baseDamage, currentPlayerChar, false)
        const isSpareParts = opponentAbility.name === "Spare Parts"
        const updatedTeam = playerTeam.map((char, index) => {
          if (index === currentPlayerIndex) {
            const newHp = Math.max(0, char.hp - finalDamage)
            if (newHp === 0) {
              const faintMessage = `${char.name} fainted!`
              showDescriptionWithTypewriter(faintMessage, () => {
                const damageMessage = `It deals ${finalDamage} damage!`
                showDescriptionWithTypewriter(damageMessage, () => {
                  // Heal virus if it's Spare Parts
                  if (isSpareParts) {
                    const damageDealt = Math.min(finalDamage, char.hp)
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
                          showRick("Oh no, Morty! *burp* You lost! Try again!", "panic", 5000)
                        }, 1000)
                        return
                      }

                      // Decrement status effects
                      setPlayerTeam(prev => prev.map((char, idx) => 
                        idx === currentPlayerIndex ? decrementStatusEffects(char) : char
                      ))
                      setOpponentState(prev => decrementStatusEffects(prev))
                      
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
                    
                    // Decrement status effects
                    setPlayerTeam(prev => prev.map((char, idx) => 
                      idx === currentPlayerIndex ? decrementStatusEffects(char) : char
                    ))
                    setOpponentState(prev => decrementStatusEffects(prev))
                    
                    if (updatedTeam.every(char => char.hp === 0)) {
                      setTimeout(() => {
                        setGameOver("lose")
                        setDescription("You lost!")
                        showRick("Oh no, Morty! *burp* You lost! Try again!", "panic", 5000)
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
              const damageMessage = `It deals ${finalDamage} damage!`
              showDescriptionWithTypewriter(damageMessage, () => {
                // Heal virus if it's Spare Parts
                if (isSpareParts) {
                  const damageDealt = finalDamage
                  setOpponentState(prev => ({
                    ...prev,
                    hp: Math.min(prev.maxHp, prev.hp + damageDealt),
                  }))
                  const healMessage = `${opponentState.name} restored ${damageDealt} HP!`
                  showDescriptionWithTypewriter(healMessage, () => {
                    // Decrement status effects
                    setPlayerTeam(prev => prev.map((char, idx) => 
                      idx === currentPlayerIndex ? decrementStatusEffects(char) : char
                    ))
                    setOpponentState(prev => decrementStatusEffects(prev))
                    
                    setCharacterAnimating(null)
                    setIsPlayerTurn(true)
                    setDescription("What will you do?")
                  })
                } else {
                  // Decrement status effects
                  setPlayerTeam(prev => prev.map((char, idx) => 
                    idx === currentPlayerIndex ? decrementStatusEffects(char) : char
                  ))
                  setOpponentState(prev => decrementStatusEffects(prev))
                  
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
      } else if (opponentAbility.type === "debuff") {
        // Handle opponent debuff abilities - apply effects to player
        let statusEffect: StatusEffect | null = null
        
        if (opponentAbility.name === "Machine Conversion") {
          statusEffect = { type: "attackReduction", value: 15, duration: 3 } // -15% attack for 3 turns
        } else if (opponentAbility.name === "System Override") {
          statusEffect = { type: "defenseReduction", value: 25, duration: 2 } // -25% defense for 2 turns
        }
        
        if (statusEffect) {
          setPlayerTeam(prev => prev.map((char, idx) => 
            idx === currentPlayerIndex ? addStatusEffect(char, statusEffect!) : char
          ))
        }
        
        // Decrement status effects
        setPlayerTeam(prev => prev.map((char, idx) => 
          idx === currentPlayerIndex ? decrementStatusEffects(char) : char
        ))
        setOpponentState(prev => decrementStatusEffects(prev))
        
        // Use original ability description
        showDescriptionWithTypewriter(opponentAbility.description, () => {
          setCharacterAnimating(null)
          setIsPlayerTurn(true)
          setDescription("What will you do?")
        })
      } else {
        // Joke or other abilities
        // Decrement status effects
        setPlayerTeam(prev => prev.map((char, idx) => 
          idx === currentPlayerIndex ? decrementStatusEffects(char) : char
        ))
        setOpponentState(prev => decrementStatusEffects(prev))
        
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

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { key } = event

    // Skip intro on Enter or Space (only after text has finished typing)
    if (showIntro) {
      if ((key === CONFIRM_KEY || key === " ") && introTextFinished) {
        event.preventDefault()
        setIntroGoMessageShown(true)
        setShowIntro(false)
        setDescription("What will you do?")
      }
      return
    }

    const playerCanAct = isPlayerTurn && !gameOver && !showDescriptionOverlay
    if (!playerCanAct) return

    if (menuState === "main") {
      if (GRID_NAVIGATION_KEYS.has(key)) {
        event.preventDefault()
        setSelectedMenuIndex(prev => moveWithinGrid(key, prev, MAIN_MENU_ITEMS.length))
        return
      }

      if (key === CONFIRM_KEY) {
        event.preventDefault()
        handleMainMenuSelect(selectedMenuIndex)
      }
      return
    }

    if (menuState === "fight" && currentPlayer) {
      if (GRID_NAVIGATION_KEYS.has(key)) {
        event.preventDefault()
        setSelectedAbilityIndex(prev => {
          const totalAbilities = currentPlayer.abilities.length
          return moveWithinGrid(key, prev, totalAbilities)
        })
        return
      }

      if (key === CONFIRM_KEY) {
        event.preventDefault()
        const ability = currentPlayer.abilities[selectedAbilityIndex]
        if (ability) {
          executeAbility(ability)
        }
        return
      }

      if (isBackKey(key)) {
        event.preventDefault()
        setMenuState("main")
        setSelectedMenuIndex(0)
      }
      return
    }

    if (menuState === "pokemon") {
      if (key === "ArrowUp" || key === "ArrowDown") {
        event.preventDefault()
        setSelectedPokemonIndex(prev => moveWithinList(key, prev, playerTeam.length))
        return
      }

      if (key === CONFIRM_KEY) {
        event.preventDefault()
        switchToPokemon(selectedPokemonIndex)
        return
      }

      if (isBackKey(key)) {
        event.preventDefault()
        setMenuState("main")
        setSelectedMenuIndex(1)
      }
    }
  }, [
    showIntro,
    introTextFinished,
    isPlayerTurn,
    gameOver,
    showDescriptionOverlay,
    menuState,
    currentPlayer,
    selectedMenuIndex,
    selectedAbilityIndex,
    selectedPokemonIndex,
    playerTeam.length,
    handleMainMenuSelect,
    switchToPokemon,
    executeAbility,
  ])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

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
                        {MAIN_MENU_ITEMS.map((item, index) => (
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
                  <div className="pokemon-selection-stats">
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
