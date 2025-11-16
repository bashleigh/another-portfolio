import { createRoot } from "react-dom/client"
import { GameMonitor } from "./components/game-monitor"
import "./styles/index.scss"
import { Quiz } from "./components/quiz"
import { Statement } from "./components/statement"
import { CV } from "./components/cv"
import { AchievementProvider, Achievements } from "./components/achievements"
import { RoleModels } from "./components/role-models"
import { BlockBuster } from "./components/blockbuster"

const root = document.getElementById("root")

console.log(
  "Hello, I see you've opened the console. The source code is here https://github.com/bashleigh/another-portfolio",
)
console.log("That'll save you some time!")
console.log("I'll be here. Waiting for you to get back...")

// Hide initial loading screen once React is ready
const hideLoadingScreen = () => {
  const loadingScreen = document.getElementById("initial-loading")
  if (loadingScreen) {
    loadingScreen.classList.add("hidden")
    // Remove loading class from html and body to restore scrolling
    document.documentElement.classList.remove("loading")
    document.body.classList.remove("loading")
    // Remove from DOM after fade out
    setTimeout(() => {
      loadingScreen.remove()
    }, 300)
  }
}

createRoot(root).render(
  // <React.StrictMode>
  <>
    <AchievementProvider>
      <GameMonitor />
      <BlockBuster />
      {/* <Statement /> */}
      <CV />
      <RoleModels />
      <Achievements />
      <Quiz />
    </AchievementProvider>
  </>,
  // </React.StrictMode>,
)

// Hide loading screen after React renders
// Use requestAnimationFrame to ensure DOM is ready
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    hideLoadingScreen()
  })
})
