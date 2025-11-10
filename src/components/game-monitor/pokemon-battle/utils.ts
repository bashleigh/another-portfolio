import { Character, StatusEffect } from "./types"

// Helper function to calculate HP based on level
// Level format: "L5", "L10", etc.
export const calculateHpFromLevel = (level: string, baseHp: number = 100): number => {
  const levelNum = parseInt(level.replace("L", ""), 10)
  // Scale HP: level 5 = 0.5x, level 10 = 1x, level 15 = 1.5x, etc.
  const multiplier = levelNum / 10
  return Math.round(baseHp * multiplier)
}

// Helper function to get random damage from ability
export const getAbilityDamage = (damage: number | { min: number; max: number } | undefined): number => {
  if (!damage) return 0
  if (typeof damage === "number") {
    return damage
  }
  // Random damage between min and max (inclusive)
  return Math.floor(Math.random() * (damage.max - damage.min + 1)) + damage.min
}

// Apply status effects to damage calculation
export const applyStatusEffectsToDamage = (baseDamage: number, character: Character, isAttacking: boolean): number => {
  if (!character.statusEffects) return baseDamage
  
  let modifiedDamage = baseDamage
  
  character.statusEffects.forEach(effect => {
    if (isAttacking) {
      // When attacking, apply attack boosts/reductions
      if (effect.type === "attackBoost") {
        modifiedDamage = Math.round(modifiedDamage * (1 + effect.value / 100))
      } else if (effect.type === "attackReduction") {
        modifiedDamage = Math.round(modifiedDamage * (1 - effect.value / 100))
      }
    } else {
      // When defending, apply defense boosts/reductions
      if (effect.type === "defenseBoost") {
        modifiedDamage = Math.round(modifiedDamage * (1 - effect.value / 100))
      } else if (effect.type === "defenseReduction") {
        modifiedDamage = Math.round(modifiedDamage * (1 + effect.value / 100))
      }
    }
  })
  
  return Math.max(1, modifiedDamage) // Minimum 1 damage
}

// Check if character dodges an attack
export const checkDodge = (character: Character): boolean => {
  if (!character.statusEffects) return false
  
  const dodgeEffect = character.statusEffects.find(effect => effect.type === "dodge")
  if (!dodgeEffect) return false
  
  // Dodge chance is the value percentage
  const dodgeChance = dodgeEffect.value
  return Math.random() * 100 < dodgeChance
}

// Decrement status effect durations
export const decrementStatusEffects = (character: Character): Character => {
  if (!character.statusEffects || character.statusEffects.length === 0) {
    return character
  }
  
  const updatedEffects = character.statusEffects
    .map(effect => ({ ...effect, duration: effect.duration - 1 }))
    .filter(effect => effect.duration > 0)
  
  return {
    ...character,
    statusEffects: updatedEffects.length > 0 ? updatedEffects : undefined
  }
}

// Add status effect to character
export const addStatusEffect = (character: Character, effect: StatusEffect): Character => {
  const existingEffects = character.statusEffects || []
  // Replace existing effect of same type, or add new one
  const filteredEffects = existingEffects.filter(e => e.type !== effect.type)
  return {
    ...character,
    statusEffects: [...filteredEffects, effect]
  }
}

