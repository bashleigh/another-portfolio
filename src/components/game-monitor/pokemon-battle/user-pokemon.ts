import { Character } from "./types";
import { calculateHpFromLevel } from "./utils";
import pikachuSpriteUrl from "./images/pikachu.webp?url"
import locutusImageUrl from "./images/locutus.webp?url"

export const playerCharacters: Character[] = [
  {
    id: "c3po-r2d2",
    name: "C-3PO & R2D2",
    level: "L10",
    hp: calculateHpFromLevel("L10", 100),
    maxHp: calculateHpFromLevel("L10", 100),
    sprite: "C-3PO & R2D2",
    abilities: [
      { name: "Protocol Attack", type: "attack", damage: { min: 18, max: 22 }, description: "C-3PO uses protocol knowledge to confuse the enemy!", soundEffect: "protocol-attack" },
      { name: "Robot Agro", type: "buff", description: "R2D2 winds up C-3PO, his anger is rising!", soundEffect: "buff" },
      { name: "Complain", type: "joke", description: "C-3PO complains about the situation. Nothing happens.", soundEffect: "joke" },
      { name: "Sparky", type: "attack", damage: { min: 13, max: 17 }, description: "R2D2 sends sparks everywhere, confusing the enemy.", soundEffect: "sparks" },
    ],
  },
  {
    id: "neo",
    name: "NEO",
    level: "L40",
    hp: calculateHpFromLevel("L40", 150),
    maxHp: calculateHpFromLevel("L40", 150),
    sprite: "neo",
    abilities: [
      { name: "Matrix Punch", type: "attack", damage: { min: 38, max: 42 }, description: "Neo bends reality and punches through the matrix!", soundEffect: "matrix-punch" },
      { name: "Dodge", type: "buff", description: "Neo dodges like in the matrix, increasing evasion!", soundEffect: "buff" },
      { name: "Bullet Time", type: "attack", damage: { min: 28, max: 32 }, description: "Neo slows time and attacks multiple times!", soundEffect: "bullet-time" },
      { name: "I Know Kung Fu", type: "buff", description: "Neo remembers he knows kung fu. Attack power increases!", soundEffect: "buff" },
    ],
  },
  {
    id: "morpheus",
    name: "MORPHEUS",
    level: "L32",
    hp: calculateHpFromLevel("L32", 130),
    maxHp: calculateHpFromLevel("L32", 130),
    sprite: "morpheus",
    abilities: [
      { name: "Red Pill", type: "attack", damage: { min: 33, max: 37 }, description: "Morpheus offers the red pill. Reality hits hard!", soundEffect: "red-pill" },
      { name: "Philosophy", type: "buff", description: "Morpheus gives a speech. Team morale increases!", soundEffect: "buff" },
      { name: "What If", type: "debuff", description: "Morpheus asks 'What if I told you...' Enemy is confused.", soundEffect: "debuff" },
      { name: "Spoon", type: "joke", description: "There is no spoon. Nothing happens, but it's deep.", soundEffect: "joke" },
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
    id: "Pikachu",
    name: "Pikachu",
    level: "L50",
    hp: calculateHpFromLevel("L50", 96),
    maxHp: calculateHpFromLevel("L50", 96),
    sprite: "placeholder",
    image: pikachuSpriteUrl,
    abilities: [
      { name: "Thunderbolt", type: "attack", damage: { min: 18, max: 22 }, description: "A thunderbolt ripped through the enemy!", soundEffect: "default" },
      { name: "Quick Attack", type: "attack", damage: { min: 8, max: 12 }, description: "Quick Attack!", soundEffect: "buff" },
      { name: "Sand Attack", type: "debuff", description: "The enemy's accuracy fell!", soundEffect: "buff" },
    ],
  },
  {
    id: "rick",
    name: "Rick",
    level: "L99",
    hp: calculateHpFromLevel("L99", 200),
    maxHp: calculateHpFromLevel("L99", 200),
    sprite: "Rick",
    abilities: [
      { name: "Go Go gadget arms", type: "attack", damage: { min: 23, max: 80 }, description: "Rick's Go Go gadget arms attack the enemy!", soundEffect: "beep-attack" },
      { name: "Wormhole", type: "debuff", description: "Rick creates a wormhole to the enemy, reducing their attack!", soundEffect: "debuff" },
      { name: "Portal Gun", type: "attack", damage: { min: 13, max: 100 }, description: "Rick's Portal Gun attacks the enemy!", soundEffect: "sparks" },
      { name: "Morty", type: "joke", description: "Shut up Morty I'm battling this guy!", soundEffect: "joke" },
    ],
  },
]
