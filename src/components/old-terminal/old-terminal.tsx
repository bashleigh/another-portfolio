import React, { useState, useRef, useEffect } from "react"
import "./old-terminal.scss"
import Typewriter from "typewriter-effect"

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

export const OldTerminal = () => {
  const [lines, setLines] = useState<string[]>([])
  const [cariage, setCariage] = useState<string>("")
  const [showBoot, setShowBoot] = useState<boolean>(true)

  const inputElement = useRef<HTMLInputElement>()

  useEffect(() => {
    setTimeout(() => {
      setShowBoot(false)
      inputElement.current?.focus()
      setLines(initialLines)
    }, 5000)

    setTimeout(() => {
      setLines(lines => [...lines, 'Ahhh this person\'s security wasn\'t that great Morty'])
    }, 7000)

    setTimeout(() => {
      setLines(lines => [...lines, 'Glad I\'m not using something like google chrome or firefox, the viruses I\'d catch, yeeesh.',])
    }, 10000)

    setTimeout(() => {
      setLines(lines => [...lines, 'Anyway, why don\'t you try and use the terminal huh?',])
      inputElement.current?.focus()
    }, 15000)

    setTimeout(() => {
      setLines(lines => [...lines, 'Downloading viruses...........................'])
    }, 20000)

    setTimeout(() => {
      setLines(lines => [...lines, 
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
        'Oh no Morty! What have you done! You\'re downloading viruses!',
        'Morty!!!',
        'This is what happens when backend developers learn React Morty, they build dumb terminals in the browser',
      ])
    }, 24000)
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
            switch (cariage) {
              case 'clear':
                setLines([])
                break;
              case 'ls':
                setLines([...lines, 'bin root usr .super-secret-folder'])
                break;
              default:
                setLines([...lines, `Ash: Command not found: ${cariage}`])
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
          {lines.map(line => (
              <Typewriter
                key={line}
                options={{
                  cursor: "",
                  delay: 20,
                }}
                onInit={typewriter => {
                  typewriter.typeString(line).pauseFor(2500).start()
                }}
              />
          ))}
        </div>
      </div>
    </div>
  )
}
