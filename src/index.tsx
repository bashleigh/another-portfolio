import React from "react"
import { createRoot } from "react-dom/client"
import { OldTerminal } from "./components/old-terminal"
import "./styles/index.scss"
import { Quiz } from "./components/quiz"
import { Statement } from "./components/statement"
import { CV } from "./components/cv"

const root = document.getElementById("root")

createRoot(root).render(
  <React.StrictMode>
    <OldTerminal />
    <Statement />
    <CV />
    <Quiz />
  </React.StrictMode>,
)
