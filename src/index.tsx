import React from "react"
import { createRoot } from "react-dom/client"
import { OldTerminal } from "./components/old-terminal"
import "./styles/index.scss"
import { Quiz } from "./components/quiz"
import { Statement } from "./components/statement"
import { CV } from "./components/cv"
import { AchievementProvider, Achievements } from "./components/achievements"
import { RoleModels } from "./components/role-models"

const root = document.getElementById("root")

console.log(
  "Hello, I see you've opened the console. The source code is here https://github.com/bashleigh/another-portfolio",
)
console.log("That'll save you some time!")
console.log("I'll be here. Waiting for you to get back...")

createRoot(root).render(
  // <React.StrictMode>
  <>
    <AchievementProvider>
      <OldTerminal />
      <Statement />
      <CV />
      <RoleModels />
      <Achievements />
      <Quiz />
    </AchievementProvider>
  </>,
  // </React.StrictMode>,
)
