import { Achievement } from "./achievementContext"

export const ACHIEVEMENTS = {
  // Statement section
  // ALL_THE_CONTENT: {
  //   title: "All the content",
  //   description: "Congratulations, you've viewed all of my slider content!",
  // },

  // Quiz section
  SHAME: {
    title: "SHAME",
    description:
      "You tried to cheat at the most important quiz in the world!",
  },
  IMPRESSED: {
    title: "I'm Impressed!",
    description:
      "You did it! You must know me or something because you got every question correct!",
  },
  NOT_IMPRESSED: {
    title: "Not impressed.",
    description: "How dare you call me old!",
  },
  BOOO: {
    title: "Booo!",
    description: "At least you admitted you're a cheater...",
  },

  // Terminal section
  // IDENTITY_CRISIS: {
  //   title: "Identity Crisis",
  //   description:
  //     'You ran "whoami" on the terminal to try and find out what user was logged in.',
  // },
  // CLEAN_FREAK: {
  //   title: "Clean Freak",
  //   description: "You really like being clean don't you?",
  // },
  // HACKER: {
  //   title: "Hacker",
  //   description:
  //     "You ran the top command to try and save rick from the security process!",
  // },
  // SPARE_PARTS: {
  //   title: "Spare Parts",
  //   description: "Virus detected, oxigenated tissues, nerous systems...",
  // },
  // C137: {
  //   title: "C137",
  //   description:
  //     "You decided the first terminal wasn't good enough and started all over again!",
  // },
  // DOOM: {
  //   title: "DOOM!",
  //   description: "You tried to run DOOM.",
  // },
  // NOT_FOUND: {
  //   title: "NOT FOUND!",
  //   description:
  //     "You ran a command that didn't exist! In a HTML/CSS terminal. Who'd have thought it!",
  // },
  // RICKLESS_AND_DANGEROUS: {
  //   title: "Rickless & Dangerous",
  //   description:
  //     "Well, you got Rick killed and now you're a Rickless Morty. Destined to dwell with the other Rickless Morty's in the Citadel.",
  // },

  // Time Machine section
  YEARS_YEARS_AND_YEARS: {
    title: "Years, years and years.",
    description:
      "It's always about how many years you've worked, never what you know.",
  },

  // Space Invaders section
  DEFEATED: {
    title: "Defeated",
    description:
      "The skills got the better of you this time. Better luck next time!",
  },
  SPACE_INVADER: {
    title: "Space Invader",
    description: "You cleared all the skills! Impressive shooting!",
  },

  // CV section
  SEARCH: {
    title: "Search...",
    description:
      "You used the search highlight feature to find out what I know quicker.",
  },

  // Bingo section
  PLAYED_BINGO: {
    title: "Played Bingo",
    description:
      "Congratulations! You've played a game of Software Buzzword Bingo!",
  },
  WINNER_WINNER_CHICKEN_DINNER: {
    title: "Winner, Winner, Chicken Dinner!",
    description:
      "You're an absolute wiz at Software Buzzword Bingo! you've won a prize! It's this achievement. Don't be ungrateful!",
  },

  // Pokemon Battle section
  POKEMON_BATTLE_COMPLETE: {
    title: "Pokemon Battle Complete",
    description:
      "You've completed the Pokemon battle! Whether you won or lost, you gave it your all!",
  },
} as const satisfies Record<string, Achievement>

