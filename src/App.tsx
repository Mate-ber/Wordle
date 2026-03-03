import { useEffect, useState } from "react"

import Guesses from "./Guesses"
import Keyboard from "./Keyboard"
import { type State, addLetter, createState, deleteLetter, getLetterState, submitGuess } from "./logic"

const App: React.FC = () => {
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

export default App
