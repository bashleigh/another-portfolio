import { Character } from "./types"
import pikachuSpriteUrl from "./images/pikachu.webp?url"
import locutusImageUrl from "./images/locutus.webp?url"
import rickImageUrl from "./images/rick.webp?url"
import neoImageUrl from "./images/neo.webp?url"
import benderImageUrl from "./images/bender.webp?url"
import t800ImageUrl from "./images/t800.webp?url"

export const playerCharacters: Character[] = [
  {
    id: "Bender",
    name: "Bender",
    level: "L10",
    hp: 69,
    maxHp: 69,
    sprite: "Bender",
    image: benderImageUrl,
    entranceSound: "bender-entrance",
    faintSound: "bender-faint",
    abilities: [
      {
        name: "Bending",
        type: "attack",
        damage: { min: 18, max: 25 },
        description: "Bender bends the enemy!",
        soundEffect: "im-a-bender",
      },
      {
        name: "Alcohol consumption",
        type: "buff",
        description: "Chug, Chug, Chug!",
        soundEffect: "buff",
      },
      {
        name: "Blackjack & hookers",
        type: "joke",
        description:
          "Bender leaves, saying he's going to build his own pokemon game.",
        soundEffect: "blackjack-hookers",
      },
      {
        name: "Panic attack",
        type: "debuff",
        description:
          "Bender starts rambling about his life, confusing the enemy.",
        soundEffect: "bender-panic",
      },
    ],
  },
  {
    id: "locutus",
    name: "Locutus",
    level: "L29",
    hp: 80,
    maxHp: 80,
    sprite: "Locutus",
    image: locutusImageUrl,
    entranceSound: "locutus-entrance",
    faintSound: "locutus-faint",
    abilities: [
      {
        name: "Assimilate",
        type: "attack",
        damage: { min: 48, max: 52 },
        description: "Locutus attempts to assimilate the enemy!",
        soundEffect: "borg-tractor-beam",
      },
      {
        name: "Resistance is Futile",
        type: "debuff",
        description: "Locutus states the obvious. Enemy loses hope.",
        soundEffect: "resistance-is-futile",
      },
      {
        name: "Borg Shield",
        type: "buff",
        description: "Borg technology adapts. Defense increases!",
        soundEffect: "buff",
      },
      {
        name: "We are Borg",
        type: "joke",
        description:
          "Locutus states 'We are Borg'. Everyone is slightly confused.",
        soundEffect: "we-are-the-borg",
      },
    ],
  },
  {
    id: "t800",
    name: "T-800",
    level: "L32",
    hp: 91,
    maxHp: 91,
    sprite: "t800",
    image: t800ImageUrl,
    entranceSound: "terminator-entrance",
    faintSound: "terminator-faint",
    abilities: [
      {
        name: "I'll Be Back",
        type: "buff",
        description:
          "T-800's iconic phrase hits hard! Arnie's attack increases",
        soundEffect: "ill-be-back",
      },
      {
        name: "Machine gun",
        type: "attack",
        damage: { min: 20, max: 35 },
        description: "Arnie's machine gun attacks the enemy!",
        soundEffect: "machine-gun",
      },
      {
        name: "Targeting information",
        type: "debuff",
        description: "T-800 gets the enemy's targetting information.",
        soundEffect: "targeting-information",
      },
      {
        name: "Terminate",
        type: "attack",
        damage: { min: 10, max: 45 },
        description: "You have been terminated...",
        soundEffect: "terminate",
      },
    ],
  },
  {
    id: "neo",
    name: "NEO",
    level: "L40",
    hp: 130,
    maxHp: 130,
    sprite: "neo",
    image: neoImageUrl,
    entranceSound: "neo-entrance",
    faintSound: "neo-faint",
    abilities: [
      {
        name: "Matrix Punch",
        type: "attack",
        damage: { min: 38, max: 42 },
        description: "Neo bends reality and punches through the matrix!",
        soundEffect: "matrix-punch",
      },
      {
        name: "Dodge",
        type: "buff",
        description: "Neo dodges like in the matrix, increasing evasion!",
        soundEffect: "buff",
      },
      {
        name: "Bullet Time",
        type: "attack",
        damage: { min: 28, max: 32 },
        description: "Neo slows time and attacks multiple times!",
        soundEffect: "bullet-time",
      },
      {
        name: "I Know Kung Fu",
        type: "buff",
        description: "Neo remembers he knows kung fu. Attack power increases!",
        soundEffect: "i-know-kung-fu",
      },
    ],
  },
  {
    id: "Pikachu",
    name: "Pikachu",
    level: "L50",
    hp: 123,
    maxHp: 123,
    sprite: "placeholder",
    image: pikachuSpriteUrl,
    entranceSound: "pikachu-entrance",
    faintSound: "pikachu-faint",
    abilities: [
      {
        name: "Thunderbolt",
        type: "attack",
        damage: { min: 20, max: 50 },
        description: "A thunderbolt ripped through the enemy!",
        soundEffect: "thunderbolt",
      },
      {
        name: "Quick Attack",
        type: "attack",
        damage: { min: 10, max: 30 },
        description: "Quick Attack!",
        soundEffect: "quick-attack",
      },
      {
        name: "Sand Attack",
        type: "debuff",
        description: "The enemy's accuracy fell!",
        soundEffect: "defensive-curl",
      },
      {
        name: "Thunder",
        type: "attack",
        damage: { min: 50, max: 80 },
        description: "A thunderbolt ripped through the enemy!",
        soundEffect: "thunder",
      },
    ],
  },
  {
    id: "rick",
    name: "Rick",
    level: "L99",
    image: rickImageUrl,
    hp: 200,
    maxHp: 200,
    sprite: "Rick",
    entranceSound: "rick-entrance",
    faintSound: "rick-faint",
    abilities: [
      {
        name: "Go science!",
        type: "attack",
        damage: { min: 70, max: 110 },
        description: "Rick uses science. it's super effective!",
        soundEffect: "beep-attack",
      },
      {
        name: "Portal Gun",
        type: "buff",
        description:
          "Rick goes home to grab some stuff. Totally still needs you to get him out.",
        soundEffect: "portal-gun",
      },
      {
        name: "Arm rocket",
        type: "attack",
        damage: { min: 10, max: 120 },
        description: "Rick's Arm Rocket attacks the enemy!",
        soundEffect: "sparks",
      },
      {
        name: "Woo Vu Luvub dub dub",
        type: "joke",
        description: "Yea I said it. Happy now?",
        soundEffect: "woo-vu-luvub-dub-dub",
      },
    ],
  },
]
