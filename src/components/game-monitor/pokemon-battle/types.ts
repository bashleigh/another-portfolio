export type Character = {
  id: string
  name: string
  level: string
  hp: number
  maxHp: number
  abilities: Ability[]
  sprite: string
  image?: string
}

export type Ability = {
  name: string
  type: "attack" | "buff" | "debuff" | "joke"
  damage?: number
  description: string
  effect?: string
}
