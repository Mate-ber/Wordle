import { useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"

import Guesses from "../features/game/components/Guesses"
import Keyboard from "../features/game/components/Keyboard"
import { GameProvider } from "../features/game/context/GameProvider"
import { useGameContext } from "../features/game/context/useGameContext"
import { getLetterState } from "../features/game/utils/gameUtils"

import styles from "./GamePage.module.css"

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return "Something went wrong"
}

const GameBoard: React.FC = () => {
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

  if (loading || !state)
    return <div className={styles.loading}>Loading word...</div>

  return (
    <div className={styles.game}>
      <h1 className={styles.title}>Wordlish</h1>

      {state.won && (
        <div className={styles.status}>
          <p>You won!</p>
          <button onClick={newGame}>Play again</button>
        </div>
      )}

      {state.gameOver && !state.won && (
        <div className={styles.status}>
          <p>The word was: {state.word}</p>
          <button onClick={newGame}>Play again</button>
        </div>
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
    </div>
  )
}

export function GamePage(): React.ReactElement {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div>
          <p>{getErrorMessage(error)}</p>
          <button onClick={() => resetErrorBoundary()}>Retry</button>
        </div>
      )}
    >
      <GameProvider>
        <GameBoard />
      </GameProvider>
    </ErrorBoundary>
  )
}
