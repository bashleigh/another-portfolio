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

// Status effect mappings for player buff abilities
const getPlayerBuffStatusEffect = (abilityName: string): StatusEffect | null => {
  const effects: Record<string, StatusEffect> = {
    "Dodge": { type: "dodge", value: 50, duration: 2 },
    "Bullet Time": { type: "dodge", value: 40, duration: 3 },
    "I Know Kung Fu": { type: "attackBoost", value: 25, duration: 1 },
    "Translate": { type: "defenseBoost", value: 20, duration: 3 },
    "Philosophy": { type: "attackBoost", value: 15, duration: 1 },
    "Borg Shield": { type: "defenseBoost", value: 30, duration: 2 },
    "Robot Agro": { type: "attackBoost", value: 20, duration: 2 },
    "Shields": { type: "defenseBoost", value: 25, duration: 2 },
  }
  return effects[abilityName] || null
}

// Status effect mappings for player debuff abilities (applied to opponent)
const getPlayerDebuffStatusEffect = (abilityName: string): StatusEffect | null => {
  const effects: Record<string, StatusEffect> = {
    "Hack": { type: "attackReduction", value: 20, duration: 2 },
    "Virus Conversion": { type: "attackReduction", value: 15, duration: 3 },
    "System Override": { type: "defenseReduction", value: 25, duration: 2 },
    "What If": { type: "attackReduction", value: 10, duration: 2 },
    "Resistance is Futile": { type: "defenseReduction", value: 20, duration: 2 },
  }
  return effects[abilityName] || null
}

// Status effect mappings for opponent debuff abilities (applied to player)
const getOpponentDebuffStatusEffect = (abilityName: string): StatusEffect | null => {
  const effects: Record<string, StatusEffect> = {
    "Machine Conversion": { type: "attackReduction", value: 15, duration: 3 },
    "System Override": { type: "defenseReduction", value: 25, duration: 2 },
  }
  return effects[abilityName] || null
}

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
        showRick("Morty, you can't run away from this fight!", "sarcastic", 3000)
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

  // Helper: Decrement status effects for both player and opponent
  const decrementAllStatusEffects = useCallback(() => {
    setPlayerTeam(prev => prev.map((char, idx) => 
      idx === currentPlayerIndex ? decrementStatusEffects(char) : char
    ))
    setOpponentState(prev => decrementStatusEffects(prev))
  }, [currentPlayerIndex])

  // Helper: End opponent turn and return to player
  const endOpponentTurn = useCallback(() => {
    setCharacterAnimating(null)
    setIsPlayerTurn(true)
    setDescription("What will you do?")
  }, [])

  // Helper: Check if all players are fainted and handle game over
  const checkGameOver = useCallback((team: Character[]) => {
    if (team.every(char => char.hp === 0)) {
      setTimeout(() => {
        setGameOver("lose")
        setDescription("You lost!")
        showRick("Oh no, Morty! *burp* You lost! Try again!", "panic", 5000)
      }, 1000)
      return true
    }
    return false
  }, [showRick])

  // Helper: Open pokemon selection when current player faints
  const openPokemonSelection = useCallback((team: Character[]) => {
    const firstAliveIndex = team.findIndex(char => char.hp > 0)
    if (firstAliveIndex !== -1) {
      setSelectedPokemonIndex(firstAliveIndex)
    }
    setMenuState("pokemon")
  }, [])

  // Helper: Handle spare parts healing
  const handleSparePartsHealing = useCallback((damageDealt: number) => {
    setOpponentState(prev => ({
      ...prev,
      hp: Math.min(prev.maxHp, prev.hp + damageDealt),
    }))
    const healMessage = `${opponentState.name} restored ${damageDealt} HP!`
    return healMessage
  }, [opponentState])

  // Helper: Handle player fainting from opponent attack
  const handlePlayerFainting = useCallback((updatedTeam: Character[], damageDealt: number, isSpareParts: boolean) => {
    if (isSpareParts) {
      const healMessage = handleSparePartsHealing(damageDealt)
      showDescriptionWithTypewriter(healMessage, () => {
        endOpponentTurn()
        if (!checkGameOver(updatedTeam)) {
          decrementAllStatusEffects()
          openPokemonSelection(updatedTeam)
        }
      })
    } else {
      endOpponentTurn()
      if (!checkGameOver(updatedTeam)) {
        decrementAllStatusEffects()
        openPokemonSelection(updatedTeam)
      }
    }
  }, [handleSparePartsHealing, showDescriptionWithTypewriter, endOpponentTurn, checkGameOver, decrementAllStatusEffects, openPokemonSelection])

  // Helper: Handle opponent attack damage (non-fainting)
  const handleOpponentAttackDamage = useCallback((finalDamage: number, isSpareParts: boolean) => {
    const damageMessage = `It deals ${finalDamage} damage!`
    showDescriptionWithTypewriter(damageMessage, () => {
      if (isSpareParts) {
        const healMessage = handleSparePartsHealing(finalDamage)
        showDescriptionWithTypewriter(healMessage, () => {
          decrementAllStatusEffects()
          endOpponentTurn()
        })
      } else {
        decrementAllStatusEffects()
        endOpponentTurn()
      }
    })
  }, [showDescriptionWithTypewriter, handleSparePartsHealing, decrementAllStatusEffects, endOpponentTurn])

  // Helper: Handle enemy transitions
  const transitionToNextEnemy = useCallback((onComplete: () => void) => {
    if (currentEnemy === "rico") {
      const message = "CAPTAIN EVERTON appears! He's been converted to the machine!"
      showDescriptionWithTypewriter(message, () => {
        setCurrentEnemy("captain")
        setOpponentState(captainEverton)
        setDescription("What will you do?")
        setIsPlayerTurn(true)
        showRick("Oh jeez, Morty! *burp* Captain Everton wants power and he's trying to set the alien free!", "panic", 5000)
        onComplete()
      })
    } else if (currentEnemy === "captain") {
      const message = "Alien Entity has been deployed!"
      showDescriptionWithTypewriter(message, () => {
        setCurrentEnemy("alien-entity")
        setOpponentState(alienEntity)
        setDescription("What will you do?")
        setIsPlayerTurn(true)
        showRick("Put me in Morty! I can take this thing!", "excited", 5000)
        onComplete()
      })
    } else {
      // Alien entity defeated - player wins
      setTimeout(() => {
        setGameOver("win")
        setDescription("You won!")
        showRick("YES! *burp* You won, Morty! Now get me out of here!", "excited", 5000)
        onComplete()
      }, 1000)
    }
  }, [currentEnemy, showRick, showDescriptionWithTypewriter])

  // Helper: Play ability sound effect
  const playAbilitySound = useCallback((soundEffect?: string) => {
    if (soundEffect) {
      attackSoundManager.playAttackSound(soundEffect).catch(err => {
        console.warn("Failed to play attack sound:", err)
      })
    }
  }, [])

  // Handle opponent attack
  const handleOpponentAttack = useCallback((ability: Ability) => {
    if (!ability.damage) return

    const currentPlayerChar = playerTeam[currentPlayerIndex]
    
    // Check for dodge
    if (checkDodge(currentPlayerChar)) {
      const dodgeMessage = `${currentPlayerChar.name} dodged the attack!`
      showDescriptionWithTypewriter(dodgeMessage, () => {
        decrementAllStatusEffects()
        endOpponentTurn()
      })
      return
    }
    
    // Calculate damage
    let baseDamage = getAbilityDamage(ability.damage)
    baseDamage = applyStatusEffectsToDamage(baseDamage, opponentState, true)
    const finalDamage = applyStatusEffectsToDamage(baseDamage, currentPlayerChar, false)
    const isSpareParts = ability.name === "Spare Parts"
    
    // Apply damage
    const updatedTeam = playerTeam.map((char, index) => {
      if (index === currentPlayerIndex) {
        const newHp = Math.max(0, char.hp - finalDamage)
        return { ...char, hp: newHp }
      }
      return char
    })
    setPlayerTeam(updatedTeam)
    
    const damagedChar = updatedTeam[currentPlayerIndex]
    if (damagedChar.hp === 0) {
      // Player fainted
      const faintMessage = `${damagedChar.name} fainted!`
      showDescriptionWithTypewriter(faintMessage, () => {
        const damageMessage = `It deals ${finalDamage} damage!`
        showDescriptionWithTypewriter(damageMessage, () => {
          const damageDealt = Math.min(finalDamage, currentPlayerChar.hp)
          handlePlayerFainting(updatedTeam, damageDealt, isSpareParts)
        })
      })
    } else {
      // Player survived
      handleOpponentAttackDamage(finalDamage, isSpareParts)
    }
  }, [playerTeam, currentPlayerIndex, opponentState, showDescriptionWithTypewriter, decrementAllStatusEffects, endOpponentTurn, handlePlayerFainting, handleOpponentAttackDamage])

  // Handle opponent debuff
  const handleOpponentDebuff = useCallback((ability: Ability) => {
    const statusEffect = getOpponentDebuffStatusEffect(ability.name)
    if (statusEffect) {
      setPlayerTeam(prev => prev.map((char, idx) => 
        idx === currentPlayerIndex ? addStatusEffect(char, statusEffect) : char
      ))
    }
    
    decrementAllStatusEffects()
    showDescriptionWithTypewriter(ability.description, () => {
      endOpponentTurn()
    })
  }, [currentPlayerIndex, showDescriptionWithTypewriter, decrementAllStatusEffects, endOpponentTurn])

  // Handle opponent joke ability
  const handleOpponentJoke = useCallback((ability: Ability) => {
    decrementAllStatusEffects()
    showDescriptionWithTypewriter(ability.description, () => {
      endOpponentTurn()
    })
  }, [showDescriptionWithTypewriter, decrementAllStatusEffects, endOpponentTurn])

  const opponentTurn = useCallback(() => {
    const opponentAbility = opponentState.abilities[Math.floor(Math.random() * opponentState.abilities.length)]
    setCharacterAnimating(opponentState.id)
    setDescription("")
    
    playAbilitySound(opponentAbility.soundEffect)
    
    const firstMessage = `${opponentState.name} uses ${opponentAbility.name}!`
    showDescriptionWithTypewriter(firstMessage, () => {
      if (opponentAbility.type === "attack" && opponentAbility.damage) {
        handleOpponentAttack(opponentAbility)
      } else if (opponentAbility.type === "debuff") {
        handleOpponentDebuff(opponentAbility)
      } else {
        handleOpponentJoke(opponentAbility)
      }
    })
  }, [opponentState, playAbilitySound, showDescriptionWithTypewriter, handleOpponentAttack, handleOpponentDebuff, handleOpponentJoke])

  // Helper: End player turn and start opponent turn
  const endPlayerTurn = useCallback(() => {
    setTimeout(() => {
      setIsPlayerTurn(false)
      opponentTurn()
    }, 500)
  }, [opponentTurn])

  // Handle player attack ability
  const handlePlayerAttack = useCallback((ability: Ability) => {
    if (!currentPlayer || !ability.damage) return

    let baseDamage = getAbilityDamage(ability.damage)
    baseDamage = applyStatusEffectsToDamage(baseDamage, currentPlayer, true)
    const finalDamage = applyStatusEffectsToDamage(baseDamage, opponentState, false)
    const newHp = Math.max(0, opponentState.hp - finalDamage)
    
    setOpponentState(prev => ({ ...prev, hp: newHp }))
    
    const damageMessage = `It deals ${finalDamage} damage!`
    showDescriptionWithTypewriter(damageMessage, () => {
      setCharacterAnimating(null)
      
      if (newHp <= 0) {
        const defeatMessage = `${opponentState.name} fainted!`
        showDescriptionWithTypewriter(defeatMessage, () => {
          transitionToNextEnemy(() => {})
        })
        return
      }

      decrementAllStatusEffects()
      endPlayerTurn()
    })
  }, [currentPlayer, opponentState, showDescriptionWithTypewriter, transitionToNextEnemy, decrementAllStatusEffects, endPlayerTurn])

  // Handle player buff ability
  const handlePlayerBuff = useCallback((ability: Ability) => {
    if (!currentPlayer) return

    const statusEffect = getPlayerBuffStatusEffect(ability.name)
    if (statusEffect) {
      setPlayerTeam(prev => prev.map((char, idx) => 
        idx === currentPlayerIndex ? addStatusEffect(char, statusEffect) : char
      ))
    }
    
    showDescriptionWithTypewriter(ability.description, () => {
      setCharacterAnimating(null)
      endPlayerTurn()
    })
  }, [currentPlayer, currentPlayerIndex, showDescriptionWithTypewriter, endPlayerTurn])

  // Handle player debuff ability
  const handlePlayerDebuff = useCallback((ability: Ability) => {
    const statusEffect = getPlayerDebuffStatusEffect(ability.name)
    if (statusEffect) {
      setOpponentState(prev => addStatusEffect(prev, statusEffect))
    }
    
    showDescriptionWithTypewriter(ability.description, () => {
      setCharacterAnimating(null)
      endPlayerTurn()
    })
  }, [showDescriptionWithTypewriter, endPlayerTurn])

  // Handle joke ability (no effect)
  const handleJokeAbility = useCallback((ability: Ability) => {
    showDescriptionWithTypewriter(ability.description, () => {
      setCharacterAnimating(null)
      endPlayerTurn()
    })
  }, [showDescriptionWithTypewriter, endPlayerTurn])

  const executeAbility = useCallback((ability: Ability) => {
    if (!isPlayerTurn || !currentPlayer) return

    setMenuState("main")
    setSelectedMenuIndex(0)
    setCharacterAnimating(currentPlayer.id)
    setDescription("")
    
    playAbilitySound(ability.soundEffect)
    
    const firstMessage = `${currentPlayer.name} uses ${ability.name}!`
    showDescriptionWithTypewriter(firstMessage, () => {
      if (ability.type === "attack" && ability.damage) {
        handlePlayerAttack(ability)
      } else if (ability.type === "buff") {
        handlePlayerBuff(ability)
      } else if (ability.type === "debuff") {
        handlePlayerDebuff(ability)
      } else {
        handleJokeAbility(ability)
      }
    })
  }, [isPlayerTurn, currentPlayer, playAbilitySound, showDescriptionWithTypewriter, handlePlayerAttack, handlePlayerBuff, handlePlayerDebuff, handleJokeAbility])

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
