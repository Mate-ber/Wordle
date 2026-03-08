import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"

import Guesses from "./game/Guesses.tsx"
import Keyboard from "./game/Keyboard.tsx"
import LeaderboardList from "./leaderboard/LeaderboardList.tsx"
import LeaderboardDetail from "./leaderboard/LeaderboardDetail.tsx"
import {
  type State,
  addLetter,
  createState,
  deleteLetter,
  getLetterState,
  submitGuess,
} from "./game/logic.ts"

const Game: React.FC = () => {
  const [state, setState] = useState<State>()

  useEffect(() => {
    if (!state) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") setState((s) => s && submitGuess(s))
      else if (e.key === "Backspace") setState((s) => s && deleteLetter(s))
      else if (e.key.length === 1 && e.key >= "a" && e.key <= "z")
        setState((s) => s && addLetter(s, e.key.toLowerCase()))
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [state])

  if (!state) {
    return (
      <>
        <h1>Wordlish</h1>
        <button onClick={() => setState(createState())}>Begin</button>
      </>
    )
  }

  return (
    <>
      <h1>Wordlish</h1>
      {state.won && <p>You won!</p>}
      {state.gameOver && !state.won && <p>The word was: {state.word}</p>}
      <Guesses
        state={state}
        getState={(letter, position) => getLetterState(state, letter, position)}
      />
      <Keyboard
        getState={(letter) => getLetterState(state, letter)}
        onLetter={(letter) => setState((s) => s && addLetter(s, letter))}
        onDelete={() => setState((s) => s && deleteLetter(s))}
        onSubmit={() => setState((s) => s && submitGuess(s))}
      />
    </>
  )
}

const App: React.FC = () => {
  return (
    <>
      <nav>
        <Link to="/">Game</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/leaderboard" element={<LeaderboardList />} />
        <Route path="/leaderboard/:id" element={<LeaderboardDetail />} />
      </Routes>
    </>
  )
}

export default App
