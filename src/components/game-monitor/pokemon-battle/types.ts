export type StatusEffect = {
  type: "attackBoost" | "defenseBoost" | "attackReduction" | "defenseReduction" | "dodge"
  value: number // Percentage or flat value depending on effect type
  duration: number // Number of turns remaining
}

export type Character = {
  id: string
  name: string
  level: string
  hp: number
  maxHp: number
  abilities: Ability[]
  sprite: string
  image?: string
  statusEffects?: StatusEffect[] // Active status effects
}

export type Ability = {
  name: string
  type: "attack" | "buff" | "debuff" | "joke"
  damage?: number | { min: number; max: number } // Single value or damage range
  description: string
  effect?: string
  soundEffect?: string // Unique sound effect identifier for this ability
}
