import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"

import {
  type State,
  addLetter,
  deleteLetter,
  getLetterState,
  submitGuess,
} from "./game/logic"
import { useWord } from "./game/useWord"
import Guesses from "./game/Guesses"
import Keyboard from "./game/Keyboard"
import LeaderboardList from "./leaderboard/LeaderboardList"
import LeaderboardDetail from "./leaderboard/LeaderboardDetail"

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return "Something went wrong"
}

const GameWrapper: React.FC = () => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <>
          <div>{getErrorMessage(error)}</div>
          <button onClick={() => resetErrorBoundary()}>Retry</button>
        </>
      )}
    >
      <Game />
    </ErrorBoundary>
  )
}

function makeState(word: string): State {
  return { word, guesses: [], currentGuess: "", gameOver: false, won: false }
}

const Game: React.FC = () => {
  const [wordData, { loading, refresh: refreshWord }] = useWord()
  const [state, setState] = useState<State | undefined>(undefined)

  useEffect(() => {
    if (wordData?.word) {
      setState(makeState(wordData.word))
    }
  }, [wordData?.word])

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

  if (loading || !state) return <div>Loading word...</div>

  const handleNewGame = () => {
    setState(undefined)
    refreshWord()
  }

  return (
    <>
      <h1>Wordlish</h1>
      {state.won && (
        <>
          <p>You won!</p>
          <button onClick={handleNewGame}>Play again</button>
        </>
      )}
      {state.gameOver && !state.won && (
        <>
          <p>The word was: {state.word}</p>
          <button onClick={handleNewGame}>Play again</button>
        </>
      )}
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
        <Route path="/" element={<GameWrapper />} />
        <Route path="/leaderboard" element={<LeaderboardList />} />
        <Route path="/leaderboard/:id" element={<LeaderboardDetail />} />
      </Routes>
    </>
  )
}

export default App
