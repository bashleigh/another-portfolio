export type StatusEffect = {
  type:
    | "attackBoost"
    | "defenseBoost"
    | "attackReduction"
    | "defenseReduction"
    | "dodge"
  value: number // Percentage or flat value depending on effect type
  duration: number // Number of turns remaining
}

export const ABILITY_SOUND_NAMES = [
  "absorb",
  "assimilate",
  "beep-attack",
  "im-a-bender",
  "bite",
  "blackjack-hookers",
  "blizzard",
  "bender-panic",
  "bubblebeam",
  "buff",
  "bullet-time",
  "debuff",
  "defensive-curl",
  "joke",
  "machine-swarm",
  "matrix-punch",
  "power-grab",
  "protocol-attack",
  "red-pill",
  "release-virus",
  "sparks",
  "steve",
  "steve-excited",
  "steve-loud",
  "steve-soft",
  "system-override",
  "thunder",
  "thunderbolt",
  "virus-attack",
  "virus-conversion",
  "world-domination",
  "quick-attack",
  "resistance-is-futile",
  "we-are-the-borg",
  "ill-be-back",
  "machine-gun",
  "targeting-information",
  "terminate",
  "i-know-kung-fu",
  "portal-gun",
  "woo-vu-luvub-dub-dub",
  "borg-tractor-beam",
] as const

export const ENTRANCE_SOUND_NAMES = [
  "rico-entrance",
  "captain-everton-entrance",
  "alien-entity-entrance",
  "bender-entrance",
  "locutus-entrance",
  "morpheus-entrance",
  "neo-entrance",
  "pikachu-entrance",
  "rick-entrance",
  "terminator-entrance",
] as const

export const FAINT_SOUND_NAMES = [
  "rico-faint",
  "captain-everton-faint",
  "alien-entity-faint",
  "bender-faint",
  "locutus-faint",
  "morpheus-faint",
  "neo-faint",
  "pikachu-faint",
  "rick-faint",
  "terminator-faint",
] as const

export type AbilitySoundName = (typeof ABILITY_SOUND_NAMES)[number]
export type EntranceSoundName = (typeof ENTRANCE_SOUND_NAMES)[number]
export type FaintSoundName = (typeof FAINT_SOUND_NAMES)[number]

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
  entranceSound: EntranceSoundName // Sound to play when character is selected/enters battle
  faintSound: FaintSoundName // Sound to play when character faints
}

export type Ability = {
  name: string
  type: "attack" | "buff" | "debuff" | "joke"
  damage?: number | { min: number; max: number } // Single value or damage range
  description: string
  effect?: string
  soundEffect: AbilitySoundName // Unique sound effect identifier for this ability
}
