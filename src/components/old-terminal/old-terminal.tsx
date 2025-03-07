import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  Ref,
  MutableRefObject,
} from "react"
import "./old-terminal.scss"
import Typewriter, { TypewriterClass } from "typewriter-effect"
import { TypewriterSection } from "./typewriter-section"

// Rick is trapped in the monitor
// He slags off the security of the terminal
// Realises there's a security process running, panics
// Morty (the user) needs to kill the process
// Rick explains that Morty needs to run the top command to see the processes running
// top returns 2 processes, a security process with id 1 and a rick process with id 2
// Rick explains that Morty needs to kill the process with id 1
// If Morty kills process 2, success, they've saved rick and he's free
// If Morty kills process 1, failure, Evil Morty is not impressed. How "unfortuitous"

// this is what happens when backend engineers learn React, Morty. They build stupid terminals into their websites.
// it's like that film virus from 1995

// Morty!
// Morty, check it out! I'm in the terminal, Morty!
// showOffRick
// It's like that film virus from 1995! Haha!
// I'm Terminal Rick baby!
// ahhh shit, oh no, there's a security process trying to kill me.
// Morty, I need your help! I need you to run the top command to find the process id
// Hurry up Morty! It's trying to kill me!
// This is what happens when backend developers learn React, I'm done for!
// Run the top command Morty, how difficult is it? type T O P and hit enter.
// pid      name           user
//  1        security       root
//  2        rick           terminal_hacker_69

// Cool, now use the kill command to kill the security process on pid 1
// Jesus Morty! Type K I L L 1 and kill the process
// Whatever you do, do not kill process 2, that's me.
// sickRick

// kill 1
// Thank christ Morty, you saved me.
// Now get me out of here! Download my output using wget

// kill 2
// evilMorty
// ha, how unfortitous

const showOffRickAscii = [
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣄⠀⠀⠀⠀⢀⣴⡀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣷⣄⠀⣠⣾⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢆",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⢸⠿⣛⣛⣛⡻⢿⣇⣤⣤⣶⠆⠀⠀⠀⠀⠀⠀⠀⠀⠈⡳⣴⡄",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⡟⣵⣿⣿⣿⣿⣿⣷⡝⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⡴⢿⣿⣷",
  "⠀⠀⢰⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⢱⡿⣟⡿⣿⢟⣭⣭⡛⣸⣧⣤⣤⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⢿⣿",
  "⢀⣠⠏⠀⠀⠀⠀⠀⠀⠀⠀⠠⢶⣿⣿⠈⣾⣟⣿⣞⡸⣿⣽⡟⡇⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⠶⣀",
  "⢸⣿⣾⡤⡀⠀⠀⠀⠀⠀⠀⠀⠀⣨⣿⡜⣮⠟⠯⡾⣿⣶⣒⣺⣿⢙⢦⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿",
  "⠀⣿⣿⠈⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠛⢥⡻⠋⠍⠟⡉⠛⠙⠈⠀⠁⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿",
  "⠀⢘⣯⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠓⠡⡀⠀⠀⠰⡂⡀⢀⡴⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿",
  "⠀⢲⣾⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠒⢓⣛⣛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿",
  "⠀⢸⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⣶⢰⣿⣶⢹⣿⣿⣿⣿⣿⣷⣶⣶⣶⣶⣶⣦⣤⣤⣤⣽⣿⡆",
  "⠀⠀⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣴⣾⣿⣿⡟⣿⡟⣿⣿⢸⣿⣿⡇⠀⠉⠉⠉⠉⠉⠙⠛⠛⠛⠛⠛⠛⠛⠁",
  "⠀⠀⢸⣿⣇⠀⠀⠀⣀⣤⣶⣿⡿⠟⠋⠁⠀⡟⣼⣿⡇⣿⣿⢸⣿⣿⡇",
  "⠀⠀⠀⢿⣿⣤⣶⣿⠿⠛⠉⠀⠀⠀⠀⠀⠀⣿⣶⢝⡇⣿⣿⣾⣿⣿⡇",
  "⠀⠀⠀⠈⠛⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⢱⣿⣿⣿⣿⡇⣿⣿⣷",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣯⢿⣿⢸⣿⣇⠿⠿⠻",
]

const panicRickAscii = [
  "⠀⠀⠀⠀⠀⣠⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⣿⠙⢦⡀⠀⠀⣰⢶⠀⠀⠀",
  "⠀⠀⠀⠀⠀⢻⠀⠀⠹⣦⠞⠁⢸⠀⠀⠀",
  "⠀⠸⡟⠓⠒⠛⠀⡀⠤⠤⢀⠀⠾⠶⢶⡆",
  "⠀⠀⢻⡀⠀⡐⠁⠀⠀⠀⠀⠑⡀⢀⡞⠀",
  "⣀⡤⠞⠃⢰⠀⠐⠒⠲⡶⠶⠶⢶⠘⠲⣄",
  "⠙⠲⣤⡀⢸⠀⡒⠖⠒⡲⡒⠒⢒⢢⡞⠉",
  "⢀⡴⠋⠀⡸⠀⠌⠀⠈⢀⢉⠤⢽⡈⣳⡄",
  "⠀⠙⢳⠆⠄⡀⠀⠀⠀⣀⣁⠀⢸⢾⡁⠀",
  "⠀⠀⠙⠛⣷⣣⠠⠎⠀⣠⠔⠉⣼⠏⠁⠀",
  "⠀⠀⠀⠀⠉⢉⣳⡤⠀⢀⣤⡞⠁⠀⠀⠀",
  "⠀⠀⠀⡴⠋⠉⡑⠃⠒⠊⣌⠉⢳⡄⠀⠀",
  "⠀⠀⠀⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠃⠀⠀",
]

const evilMorty = [
  "⠀⠀⠀⠀⠀⠀⠀⡀⠠⠐⠒⠀⠀⠀⠀⠐⠒⠤⢀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⢀⠔⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠐⢄⠀⠀⠀⠀",
  "⠀⠀⠀⡠⠀⠀⠀⠀⣀⠠⠐⠂⠀⠈⠁⠐⠒⠤⣀⠀⠀⠈⡆⠀⠀⠀",
  "⠀⠀⠜⠀⠀⠀⡠⠊⠀⠀⠀⠀⠀⠀⠀⣀⣠⣴⡶⠿⠿⡛⠛⢆⠀⠀",
  "⠀⣸⠀⠀⠠⠊⣀⣀⣠⣤⣤⣀⣠⣶⠿⠛⡉⠥⠤⢀⠀⠐⠄⠀⠆⠀",
  "⠀⡻⢷⣶⣷⣿⣿⣿⣿⣿⣿⣿⣿⠀⢠⠊⠀⠀⠀⠀⠈⠆⠘⡀⢸⠀",
  "⢰⠁⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠀⡆⠀⠀⠰⡧⠀⠀⢸⠀⡇⠘⠀",
  "⠀⢃⠀⠃⢿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠡⡀⠀⠀⠀⠀⢀⠆⠀⢠⢀⠀",
  "⠀⡠⠶⠀⠈⠻⢿⣿⣿⣿⡿⠁⢀⠀⠄⠉⠒⠠⠄⠒⠁⠀⠀⢸⠪⠀",
  "⠀⡇⠀⡆⠀⠀⠀⠀⠈⠀⠀⠀⠀⠑⠁⠀⠀⠀⠀⠀⠀⠀⠀⡄⢀⠇",
  "⠀⠈⠂⠴⡀⠀⠀⠀⠀⠀⠀⢀⡀⠠⠤⠀⢀⡀⠀⠀⠀⠀⡰⠒⠁⠀",
  "⠀⠀⠀⠀⠘⢄⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⢀⠔⠁⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠁⠢⠄⡀⠀⠀⠀⠀⠀⠀⠀⢀⡠⢖⠁⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠔⠁⠀⠀⠉⠁⠀⠒⠂⠀⠉⠁⠀⠈⠢⡀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⢀⠌⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠱⡀⠀⠀⠀",
  "⠀⠀⠀⠀⠘⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢣⠀⠀⠀",
  "⠀⠀⠀⠀⡇⠀⠀⠀⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠀⠀⠀⠘⠀⠀⠀",
  "⠀⠀⠀⠠⠀⠀⠀⠀⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⠀⠀⠀⠀⡇⠀⠀",
]

const initialLines = [
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣄⠀⠀⠀⠀⢀⣴⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣷⣄⠀⣠⣾⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢆⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⢸⠿⣛⣛⣛⡻⢿⣇⣤⣤⣶⠆⠀⠀⠀⠀⠀⠀⠀⠀⠈⡳⣴⡄⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⡟⣵⣿⣿⣿⣿⣿⣷⡝⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⡴⢿⣿⣷⠀⠀",
  "⠀⠀⢰⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⢱⡿⣟⡿⣿⢟⣭⣭⡛⣸⣧⣤⣤⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⢿⣿⠀⠀",
  "⢀⣠⠏⠀⠀⠀⠀⠀⠀⠀⠀⠠⢶⣿⣿⠈⣾⣟⣿⣞⡸⣿⣽⡟⡇⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⠶⣀⠀",
  "⢸⣿⣾⡤⡀⠀⠀⠀⠀⠀⠀⠀⠀⣨⣿⡜⣮⠟⠯⡾⣿⣶⣒⣺⣿⢙⢦⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠀",
  "⠀⣿⣿⠈⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠛⢥⡻⠋⠍⠟⡉⠛⠙⠈⠀⠁⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠀",
  "⠀⢘⣯⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠓⠡⡀⠀⠀⠰⡂⡀⢀⡴⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⠀",
  "⠀⢲⣾⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠒⢓⣛⣛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀",
  "⠀⢸⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⣶⢰⣿⣶⢹⣿⣿⣿⣿⣿⣷⣶⣶⣶⣶⣶⣦⣤⣤⣤⣽⣿⡆",
  "⠀⠀⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣴⣾⣿⣿⡟⣿⡟⣿⣿⢸⣿⣿⡇⠀⠉⠉⠉⠉⠉⠙⠛⠛⠛⠛⠛⠛⠛⠁",
  "⠀⠀⢸⣿⣇⠀⠀⠀⣀⣤⣶⣿⡿⠟⠋⠁⠀⡟⣼⣿⡇⣿⣿⢸⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⢿⣿⣤⣶⣿⠿⠛⠉⠀⠀⠀⠀⠀⠀⣿⣶⢝⡇⣿⣿⣾⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠈⠛⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⢱⣿⣿⣿⣿⡇⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣯⢿⣿⢸⣿⣇⠿⠿⠻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "Morty,",
  "Check this out.",
  "I\'m stick in this monitor on this person's website.",
  "",
  "What do you think of that Morty?",
  "pid        name            user",
  " 1         security        ashleigh",
  " 2         rick            lordOfTheTerminal",
]

enum AfterLineSetEnum {
  GOING_TO_KILL_ME = "GOING_TO_KILL_ME",
  SHOW_OFF_RICK = "SHOW_OFF_RICK",
  ITS_LIKE_THAT_FILM = "ITS_LIKE_THAT_FILM",
  THIS_IS_WHAT_HAPPENS = "THIS_IS_WHAT_HAPPENS",
  PANIC_RICK = "PANIC_RICK",
  RICK_INSTRUCTIONS_ON_KILL = "RICK_INSTRUCTIONS_ON_KILL",
}

type LineSet = {
  delay?: number
  delayStart?: number
  delayBetween?: number
  lines: string[]
  after?: AfterLineSetEnum
}

const showOffRick = (setLines: Dispatch<SetStateAction<LineSet[]>>) => {
  setLines(lines => [
    ...lines,
    {
      delay: 1,
      lines: showOffRickAscii,
      after: AfterLineSetEnum.ITS_LIKE_THAT_FILM,
    },
  ])
}

const itsLikeThatFilm = (setLines: Dispatch<SetStateAction<LineSet[]>>) => {
  setLines(lines => [
    ...lines,
    {
      lines: [
        "",
        "It's like that film virus from 1995! Haha!",
        "I'm terminal Rick baby!",
      ],
      after: AfterLineSetEnum.GOING_TO_KILL_ME,
      delayStart: 1000,
    },
  ])
}

const goingToKillMe = (
  setLines: Dispatch<SetStateAction<LineSet[]>>,
  inputElement: MutableRefObject<HTMLInputElement | undefined>,
) => {
  setTimeout(() => {
    console.log(inputElement.current)
    inputElement?.current?.focus()
    setLines((lines: LineSet[]) => [
      ...lines,
      {
        delay: 20,
        delayBetween: 500,
        lines: [
          "",
          "ahhh shit, oh no, no, NO! There's a security process trying to kill me.",
          "Morty, I, I, I need your help! I need you to run the top command to find the process id",
          "Hurry up Morty! It's trying to kill me!",
        ],
        after: AfterLineSetEnum.THIS_IS_WHAT_HAPPENS,
      },
    ])
  }, 2000)
}

const thisIsWhatHappensWhenBackendLearnReact = (
  setLines: Dispatch<SetStateAction<LineSet[]>>,
) => {
  setLines((lines: LineSet[]) => [
    ...lines,
    {
      delayStart: 5000,
      delay: 10,
      delayBetween: 1000,
      lines: [
        "",
        "This is what happens when backend developers learn React, I'm done for!",
        'Come on Morty, run the top command, how difficult is it? type "T" "O" "P" and hit enter.',
      ],
    },
  ])
}

const rickInstructionsOnKill = (
  setLines: Dispatch<SetStateAction<LineSet[]>>,
) => {
  setLines(lines => [
    ...lines,
    {
      delayStart: 1000,
      delayBetween: 500,
      lines: [
        "",
        "Great, now use the kill command to kill the security process on pid 1",
        'Jesus Morty! Type "KILL 1" and kill the process before it finds me!',
        "Whatever you do, do not kill process id 2, that's me.",
      ],
      after: AfterLineSetEnum.PANIC_RICK,
    },
  ])
}

const panicRick = (setLines: Dispatch<SetStateAction<LineSet[]>>) => {
  setLines(lines => [
    ...lines,
    {
      lines: panicRickAscii,
      delayBetween: 1,
    },
  ])
}

const topCommand = (securityRunning: boolean): LineSet => {
  return {
    delay: 10,
    lines: [
      "pid⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀name⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀user",
      securityRunning ? "⠀1⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀security⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀root" : "",
      "⠀2⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀rick⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀Terminal_hacker_69",
    ],
    after: AfterLineSetEnum.RICK_INSTRUCTIONS_ON_KILL,
  }
}

const killProcess = (
  setLines: Dispatch<SetStateAction<LineSet[]>>,
  processId?: number,
) => {
  console.log("process", processId)
  setLines(lines => [
    ...lines,
    {
      lines: [
        !processId
          ? "no pid provided"
          : processId > 2
            ? `ash: kill (${processId}): no such prcocess.`
            : `Killing process ${processId}`,
      ],
    },
  ])
}

const start = (setLines: Dispatch<SetStateAction<LineSet[]>>) => {
  setLines([
    {
      delayBetween: 1000,
      lines: ["Morty!", "Morty! Check it out! I'm in the terminal, Morty!"],
      after: AfterLineSetEnum.SHOW_OFF_RICK,
    },
  ])
}

export const OldTerminal = () => {
  const [lines, setLines] = useState<LineSet[]>([])
  const [cariage, setCariage] = useState<string>("")
  const [showBoot, setShowBoot] = useState<boolean>(true)
  const [securityProcessRunning, setSecurityProcessRunning] =
    useState<boolean>(true)

  const inputElement = useRef<HTMLInputElement>()

  useEffect(() => {
    setTimeout(() => {
      if (showBoot) {
        setShowBoot(false)
        start(setLines)
      }
    }, 5000)
  }, [])

  return (
    <div id="old-terminal" className="is-fullscreen">
      <img className="monitor-image" src="/images/monitor.png" />
      <div className={`boot-screen${showBoot ? " show-boot" : ""}`}>
        <div>
          <h1 className="title is-size-1">AshleighOS</h1>
        </div>
        <p>2025© - v2.0.1 - London</p>
      </div>
      <div
        className={`screen${showBoot ? " off" : ""}`}
        onClick={() => {
          inputElement.current?.focus()
        }}
      >
        <form
          className="text-input"
          onSubmit={event => {
            event.preventDefault()

            if (cariage.startsWith("kill ")) {
              const number = cariage.split(" ")?.pop()
              killProcess(setLines, number ? parseInt(number) : undefined)
              setCariage("")
              return
            }

            switch (cariage) {
              case "clear":
                setLines([
                  {
                    delayStart: 1000,
                    lines: [
                      "Ahhhh great, you cleared the output stream Morty",
                      "This developer is lazy Morty, they're not writing conditions to tell you the instructions again...",
                      'type in "restart" if you want to do it again I guess?',
                    ],
                  },
                ])
                break
              case "top":
                setLines(lines => [
                  ...lines,
                  topCommand(securityProcessRunning),
                ])
                break
              case "ls":
                setLines(lines => [
                  ...lines,
                  { lines: ["bin root usr .super-secret-folder"] },
                ])
                break
              case "restart":
                start(setLines)
                break
              default:
                setLines(lines => [
                  ...lines,
                  { lines: [`Ash: Command not found: ${cariage}`] },
                ])
            }
            setCariage("")
          }}
        >
          <span>$&gt;</span>
          <input
            name=""
            autoCorrect="off"
            autoCapitalize="none"
            autoComplete="off"
            autoFocus={true}
            onChange={event => {
              const input = event.target.value
              setCariage(input)
            }}
            value={cariage}
            ref={inputElement}
          />
          <span
            className="cursor"
            style={{ left: `${cariage.length * 10 + 25}px` }}
          ></span>
        </form>
        <div className="content">
          {lines.map(set => (
            <TypewriterSection
              key={set.lines.join("-")}
              lines={set.lines}
              delay={set.delay}
              delayEach={set.delayBetween}
              isComplete={() => {
                switch (set.after) {
                  case AfterLineSetEnum.SHOW_OFF_RICK:
                    showOffRick(setLines)
                    break
                  case AfterLineSetEnum.GOING_TO_KILL_ME:
                    goingToKillMe(setLines, inputElement)
                    break
                  case AfterLineSetEnum.ITS_LIKE_THAT_FILM:
                    itsLikeThatFilm(setLines)
                    break
                  case AfterLineSetEnum.THIS_IS_WHAT_HAPPENS:
                    thisIsWhatHappensWhenBackendLearnReact(setLines)
                    break
                  case AfterLineSetEnum.RICK_INSTRUCTIONS_ON_KILL:
                    rickInstructionsOnKill(setLines)
                    break
                  case AfterLineSetEnum.PANIC_RICK:
                    panicRick(setLines)
                    break
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
