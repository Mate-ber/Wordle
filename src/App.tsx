import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import IconButton from "@mui/material/IconButton"
import { useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { Link, Route, Routes } from "react-router-dom"

import { GameProvider, getLetterState } from "./game/GameProvider"
import Guesses from "./game/Guesses"
import Keyboard from "./game/Keyboard"
import { useGameContext } from "./game/useGameContext"
import LeaderboardDetail from "./leaderboard/LeaderboardDetail"
import LeaderboardList from "./leaderboard/LeaderboardList"
import { LeaderboardProvider } from "./leaderboard/LeaderboardProvider"
import { useTheme } from "./theme/useTheme"

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
      <GameProvider>
        <Game />
      </GameProvider>
    </ErrorBoundary>
  )
}

const Game: React.FC = () => {
  const { state, addLetter, deleteLetter, submitGuess, newGame, loading } =
    useGameContext()

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") submitGuess()
      else if (e.key === "Backspace") deleteLetter()
      else if (e.key.length === 1 && e.key >= "a" && e.key <= "z")
        addLetter(e.key.toLowerCase())
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [addLetter, deleteLetter, submitGuess])

  if (loading || !state) return <div>Loading word...</div>

  return (
    <>
      <h1>Wordlish</h1>
      {state.won && (
        <>
          <p>You won!</p>
          <button onClick={newGame}>Play again</button>
        </>
      )}
      {state.gameOver && !state.won && (
        <>
          <p>The word was: {state.word}</p>
          <button onClick={newGame}>Play again</button>
        </>
      )}
      <Guesses
        state={state}
        getState={(letter, position) => getLetterState(state, letter, position)}
      />
      <Keyboard
        getState={(letter) => getLetterState(state, letter)}
        onLetter={addLetter}
        onDelete={deleteLetter}
        onSubmit={submitGuess}
      />
    </>
  )
}

const LeaderboardWrapper: React.FC = () => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <>
          <div>{getErrorMessage(error)}</div>
          <button onClick={() => resetErrorBoundary()}>Retry</button>
        </>
      )}
    >
      <LeaderboardProvider>
        <Routes>
          <Route path="/" element={<LeaderboardList />} />
          <Route path=":id" element={<LeaderboardDetail />} />
        </Routes>
      </LeaderboardProvider>
    </ErrorBoundary>
  )
}

const App: React.FC = () => {
  const { mode, toggleTheme } = useTheme()

  return (
    <>
      <nav>
        <Link to="/">Game</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </nav>
      <Routes>
        <Route path="/" element={<GameWrapper />} />
        <Route path="/leaderboard/*" element={<LeaderboardWrapper />} />
      </Routes>
    </>
  )
}

export default App
