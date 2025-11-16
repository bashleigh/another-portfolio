import React, { useState, useEffect } from "react"
import "./jurassic-park-game.scss"
import { useRickOverlay } from "./rick-overlay-context"

type JurassicParkGameProps = {
  onBack: () => void
  onComplete?: () => void
}

const PASSWORD = "clever_girl"

export const JurassicParkGame: React.FC<JurassicParkGameProps> = ({
  onBack,
  onComplete,
}) => {
  const { showRick } = useRickOverlay()
  const [password, setPassword] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [solvedPuzzles, setSolvedPuzzles] = useState<string[]>([])
  const [showPuzzle, setShowPuzzle] = useState(false)
  const [currentPuzzle, setCurrentPuzzle] = useState<string | null>(null)
  const [clues, setClues] = useState<string[]>([])
  const [gameWon, setGameWon] = useState(false)

  useEffect(() => {
    showRick(
      "Oh great, a password game. *burp* Just what I needed. Look Morty, there's an IT guy in the middle. You need to guess the password. Solve puzzles to get clues!",
      "sarcastic",
      6000,
    )
  }, [showRick])

  const puzzles = [
    {
      id: "puzzle1",
      question: "What is 2 + 2?",
      answer: "4",
      clue: "The password starts with 'c'",
    },
    {
      id: "puzzle2",
      question: "What comes after 'cle'?",
      answer: "ver",
      clue: "The password contains 'ver'",
    },
    {
      id: "puzzle3",
      question: "What is the opposite of 'boy'?",
      answer: "girl",
      clue: "The password ends with 'girl'",
    },
  ]

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.toLowerCase() === PASSWORD.toLowerCase()) {
      setGameWon(true)
      showRick(
        "YES! *burp* You did it Morty! The password was correct! Now get me out of here!",
        "excited",
        5000,
      )
      // Call onComplete callback when game is won
      if (onComplete) {
        onComplete()
      }
    } else {
      setAttempts(prev => prev + 1)
      setPassword("")
      showRick(
        `Wrong password, Morty! *burp* You've tried ${attempts + 1} times. Maybe solve some puzzles for clues?`,
        "panic",
        4000,
      )
    }
  }

  const handleSolvePuzzle = (puzzleId: string, answer: string) => {
    const puzzle = puzzles.find(p => p.id === puzzleId)
    if (puzzle && answer.toLowerCase() === puzzle.answer.toLowerCase()) {
      setSolvedPuzzles(prev => [...prev, puzzleId])
      setClues(prev => [...prev, puzzle.clue])
      setShowPuzzle(false)
      setCurrentPuzzle(null)
      showRick(
        `Good job Morty! *burp* Here's a clue: ${puzzle.clue}`,
        "normal",
        4000,
      )
    } else {
      showRick("Wrong answer, Morty! *burp* Try again!", "sarcastic", 3000)
    }
  }

  const openPuzzle = (puzzleId: string) => {
    setCurrentPuzzle(puzzleId)
    setShowPuzzle(true)
  }

  const availablePuzzles = puzzles.filter(p => !solvedPuzzles.includes(p.id))

  return (
    <div className="jurassic-park-game">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <div className="game-container">
        <div className="it-guy-container">
          <div className="it-guy-placeholder">
            <p>IT Guy Sprite</p>
            <p className="small">(Placeholder - add sprite image here)</p>
          </div>
        </div>

        <div className="game-ui">
          <h2 className="game-title">Jurassic Park Password Game</h2>

          {gameWon ? (
            <div className="win-screen">
              <h3>Congratulations!</h3>
              <p>You guessed the password correctly!</p>
              <button onClick={onBack}>Return to Menu</button>
            </div>
          ) : (
            <>
              <div className="password-section">
                <form onSubmit={handlePasswordSubmit}>
                  <label htmlFor="password">Enter Password:</label>
                  <input
                    id="password"
                    type="text"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    autoFocus
                  />
                  <button type="submit">Submit</button>
                </form>
                <p className="attempts">Attempts: {attempts}</p>
              </div>

              <div className="puzzles-section">
                <h3>Solve Puzzles for Clues</h3>
                <div className="puzzles-list">
                  {availablePuzzles.map(puzzle => (
                    <button
                      key={puzzle.id}
                      className="puzzle-button"
                      onClick={() => openPuzzle(puzzle.id)}
                    >
                      Puzzle {puzzle.id.slice(-1)}
                    </button>
                  ))}
                </div>
              </div>

              {clues.length > 0 && (
                <div className="clues-section">
                  <h3>Clues:</h3>
                  <ul>
                    {clues.map((clue, index) => (
                      <li key={index}>{clue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showPuzzle && currentPuzzle && (
        <div className="puzzle-modal">
          <div className="puzzle-content">
            <h3>Solve this puzzle:</h3>
            <p className="puzzle-question">
              {puzzles.find(p => p.id === currentPuzzle)?.question}
            </p>
            <form
              onSubmit={e => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const answer = formData.get("answer") as string
                handleSolvePuzzle(currentPuzzle, answer)
              }}
            >
              <input
                name="answer"
                type="text"
                placeholder="Your answer..."
                autoFocus
              />
              <div className="puzzle-buttons">
                <button type="submit">Submit</button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPuzzle(false)
                    setCurrentPuzzle(null)
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
