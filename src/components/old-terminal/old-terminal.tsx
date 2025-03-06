import React, { useState, useRef, useEffect } from "react"
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

const showOffRick = [
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
]

const panicRick = [
  "⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿",
  "⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⠏⢿⣿⣿⣿⣿⣿",
  "⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⠟⠁⠀⢸⣿⣿⣿⣿⣿",
  "⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠈⢿⡿⠟⠁⠀⠀⠀⢸⣿⣿⣿⣿⣿",
  "⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿",
  "⣿⣿⣿⣆⠀⠀⠈⠉⠉⠉⠁⠀⠀⣀⠠⠤⠐⠒⠢⠤⢀⠀⠀⠀⠛⠛⠛⠛⠋⣹",
  "⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⢀⠔⠉⠀⠀⠀⠀⠀⠀⠀⠀⠉⠂⠀⠀⠀⠀⠀⣼⣿",
  "⣿⣿⣿⣿⣿⡄⠀⠀⠀⡐⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⠀⠀⢀⣾⣿⣿",
  "⣿⣿⣿⣿⣿⠿⠀⠀⢰⠀⠀⠀⢀⣀⣀⣀⣀⡀⠀⠀⠀⠄⠀⠀⣥⠀⠻⣿⣿⣿",
  "⣿⡿⠟⠋⠀⠀⠀⠀⡆⠀⠀⠀⠧⠤⠀⠒⠒⢶⠒⡒⠒⠒⠒⠒⠲⡀⠀⠈⠙⠿",
  "⣧⣄⡀⠀⠀⠀⠀⠀⡇⠀⢀⣃⣀⣀⠀⠀⠀⠀⣆⠁⠀⣀⠠⠄⠀⢰⠀⢀⣴⣾",
  "⣿⣿⣿⣷⣦⡀⠀⠀⡇⠀⠈⡄⠀⠉⠀⠀⠀⢀⠃⠄⠀⠉⠀⠀⠀⡈⢰⣿⣿⣿",
  "⣿⣿⣿⡿⠟⠁⠀⠀⣇⠀⠀⠈⠂⠄⠤⠤⠔⠁⠀⠈⡖⠠⠤⠐⢪⠁⠈⠻⣿⣿",
  "⣿⡿⠋⠀⠀⠀⠀⡠⠛⠀⠀⠑⠢⠤⠄⠀⠀⠀⢇⠀⢃⠀⠒⠀⢡⠓⡀⢀⣈⣿",
  "⣿⣿⣶⣦⣄⡀⠸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠢⠋⠀⠀⠀⢸⢀⣿⣿⣿⣿",
  "⣿⣿⣿⣿⣿⠃⠀⠑⠠⡄⠀⠀⡀⠀⠀⠀⢀⣀⣀⣀⣀⡀⠀⠀⠜⠉⠻⣿⣿⣿",
  "⣿⣿⣿⣿⣷⣶⣶⣶⡆⢣⠀⠀⠁⠠⠒⠈⠀⠀⣿⣿⣿⠃⠉⠀⡸⢻⣿⣿⣿⣿",
  "⣿⣿⣿⣿⣿⣿⣿⣿⣁⣀⣦⠀⠑⠒⠀⠀⠀⣄⢹⠏⠤⠀⠀⣲⣿⣿⣿⣿⣿⣿",
  "⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠁⠀⠀⠀⣀⣼⣿⣿⣿⣿⣿⣿⣿",
  "⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠐⠂⠤⠤⢤⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿",
  "⣿⣿⣿⣿⣿⣿⣿⠿⠟⠛⠋⠉⠉⠹⠢⠄⠀⠠⠚⡉⠉⠉⠛⠿⣿⣿⣿⣿⣿⣿",
  "⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⢀⠃⠀⡆⠀⠀⠀⠀⡇⢡⠀⠀⠀⠈⣿⣿⣿⣿⣿",
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
  'pid        name            user',
  ' 1         security        ashleigh',
  ' 2         rick            lordOfTheTerminal',
]

const typeWriters = {
  start: (typewriter: TypewriterClass) => {
    typewriter.typeString('Morty!\n\r')
      .pauseFor(1000)
      .typeString('Morty, check it out! I\'m in this terminal Morty!\n\r')
      .pauseFor(100)
      .pauseFor(100)
      .typeString('Like that film virus from 1995!')
      .callFunction(() => {
        console.log('done')
      })
      .start()
  }
}

export const OldTerminal = () => {
  const [lines, setLines] = useState<string[][]>([])
  const [cariage, setCariage] = useState<string>("")
  const [showBoot, setShowBoot] = useState<boolean>(true)

  const inputElement = useRef<HTMLInputElement>()

  useEffect(() => {
    setTimeout(() => {
      setShowBoot(false)
      setLines([[
          'Morty!',
          'Check it out Morty, I\'m in this terminal!',
          ...showOffRick,
          'It\'s like that film virus from 1995! Haha!',
          'The security Morty, it was no good.',
          'Wait, there\'s a security process still running, Morty',
          'I need you to run the top command, Morty',
      ],])
    }, 5000)

    // setTimeout(() => {
    //   setLines([...lines, [
    //     'I need you to run the top command, Morty.',
    //     'Then kill the process',
    //   ]])
    //   inputElement.current?.focus()
    // }, 8000)
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
            // switch (cariage) {
            //   case 'clear':
            //     setLines([])
            //     break;
            //   case 'ls':
            //     setLines([...lines, 'bin root usr .super-secret-folder'])
            //     break;
            //   default:
            //     setLines([...lines, `Ash: Command not found: ${cariage}`])
            // }
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
          {lines.map((set => (
            <TypewriterSection lines={set}/>
          )))}
          {/* {lines.map(line => (
              <Typewriter
                key={line}
                options={{
                  cursor: "",
                  delay: 20,
                }}
                onInit={typewriter => {
                  if (line.charAt(0) === '#') {
                    typeWriters.start(typewriter)
                  } else {
                    typewriter.typeString(line).start()
                  }
                }}
              />
          ))} */}
        </div>
      </div>
    </div>
  )
}
