import { Character } from "./types";
import { calculateHpFromLevel } from "./utils";
import pikachuSpriteUrl from "./images/pikachu.webp?url"
import locutusImageUrl from "./images/locutus.webp?url"
import rickImageUrl from "./images/rick.webp?url"
import neoImageUrl from "./images/neo.webp?url"
import morpheusImageUrl from "./images/morpheus.webp?url"
import benderImageUrl from "./images/bender.webp?url"

export const playerCharacters: Character[] = [
  {
    id: "Bender",
    name: "Bender",
    level: "L10",
    hp: calculateHpFromLevel("L10", 69),
    maxHp: calculateHpFromLevel("L10", 69),
    sprite: "Bender",
    image: benderImageUrl,
    abilities: [
      { name: "Bending", type: "attack", damage: { min: 18, max: 25 }, description: "Bender bends the enemy!", soundEffect: "protocol-attack" },
      { name: "Alcohol consumption", type: "buff", description: "Chug, Chug, Chug!", soundEffect: "buff" },
      { name: "Blackjack & hookers", type: "joke", description: "Bender leaves, saying he's going to build his own pokemon game.", soundEffect: "joke" },
      { name: "Rambling", type: "debuff", description: "Bender starts rambling about his life, confusing the enemy.", soundEffect: "sparks" },
    ],
  },
  {
    id: "locutus",
    name: "Locutus",
    level: "L29",
    hp: calculateHpFromLevel("L29", 110),
    maxHp: calculateHpFromLevel("L29", 110),
    sprite: "Locutus",
    image: locutusImageUrl,
    abilities: [
      { name: "Assimilate", type: "attack", damage: { min: 48, max: 52 }, description: "Locutus attempts to assimilate the enemy!", soundEffect: "assimilate" },
      { name: "Resistance is Futile", type: "debuff", description: "Locutus states the obvious. Enemy loses hope.", soundEffect: "debuff" },
      { name: "Borg Shield", type: "buff", description: "Borg technology adapts. Defense increases!", soundEffect: "buff" },
      { name: "We are Borg", type: "joke", description: "Locutus states 'We are Borg'. Everyone is slightly confused.", soundEffect: "joke" },
    ],
  },
  {
    id: "morpheus",
    name: "MORPHEUS",
    level: "L32",
    hp: calculateHpFromLevel("L32", 130),
    maxHp: calculateHpFromLevel("L32", 130),
    sprite: "morpheus",
    image: morpheusImageUrl,
    abilities: [
      { name: "Red Pill", type: "attack", damage: { min: 33, max: 37 }, description: "Morpheus offers the red pill. Reality hits hard!", soundEffect: "red-pill" },
      { name: "Philosophy", type: "buff", description: "Morpheus gives a speech. Team morale increases!", soundEffect: "buff" },
      { name: "What If", type: "debuff", description: "Morpheus asks 'What if I told you...' Enemy is confused.", soundEffect: "debuff" },
      { name: "Spoon", type: "joke", description: "There is no spoon. Nothing happens, but it's deep.", soundEffect: "joke" },
    ],
  },
  {
    id: "neo",
    name: "NEO",
    level: "L40",
    hp: calculateHpFromLevel("L40", 150),
    maxHp: calculateHpFromLevel("L40", 150),
    sprite: "neo",
    image: neoImageUrl,
    abilities: [
      { name: "Matrix Punch", type: "attack", damage: { min: 38, max: 42 }, description: "Neo bends reality and punches through the matrix!", soundEffect: "matrix-punch" },
      { name: "Dodge", type: "buff", description: "Neo dodges like in the matrix, increasing evasion!", soundEffect: "buff" },
      { name: "Bullet Time", type: "attack", damage: { min: 28, max: 32 }, description: "Neo slows time and attacks multiple times!", soundEffect: "bullet-time" },
      { name: "I Know Kung Fu", type: "buff", description: "Neo remembers he knows kung fu. Attack power increases!", soundEffect: "buff" },
    ],
  },
  {
    id: "Pikachu",
    name: "Pikachu",
    level: "L50",
    hp: calculateHpFromLevel("L50", 96),
    maxHp: calculateHpFromLevel("L50", 96),
    sprite: "placeholder",
    image: pikachuSpriteUrl,
    abilities: [
      { name: "Thunderbolt", type: "attack", damage: { min: 20, max: 50 }, description: "A thunderbolt ripped through the enemy!", soundEffect: "default" },
      { name: "Quick Attack", type: "attack", damage: { min: 10, max: 30 }, description: "Quick Attack!", soundEffect: "buff" },
      { name: "Sand Attack", type: "debuff", description: "The enemy's accuracy fell!", soundEffect: "buff" },
      { name: "Thunder", type: "attack", damage: { min: 60, max: 100 }, description: "A thunderbolt ripped through the enemy!", soundEffect: "default" },
    ],
  },
  {
    id: "rick",
    name: "Rick",
    level: "L99",
    image: rickImageUrl,
    hp: calculateHpFromLevel("L99", 200),
    maxHp: calculateHpFromLevel("L99", 200),
    sprite: "Rick",
    abilities: [
      { name: "Go Go gadget arms", type: "attack", damage: { min: 50, max: 200 }, description: "Rick's Go Go gadget arms attack the enemy!", soundEffect: "beep-attack" },
      { name: "Shields", type: "debuff", description: "Rick creates a shield to protect himself, reducing the enemy's attack!", soundEffect: "debuff" },
      { name: "Arm rocket", type: "attack", damage: { min: 10, max: 200 }, description: "Rick's Arm Rocket attacks the enemy!", soundEffect: "sparks" },
      { name: "Morty", type: "joke", description: "Shut up Morty I'm battling this guy! Pick an attack!", soundEffect: "joke" },
    ],
  },
]
