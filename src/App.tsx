import { useState } from "react"

import Guesses from "./Guesses"
import Keyboard from "./Keyboard"
import { type State, createState, getLetterState } from "./logic"

const App: React.FC = () => {
  const [state, setState] = useState<State>()

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
      <Guesses
        getState={(letter: string, position: number) =>
          getLetterState(state, letter, position)
        }
      />
      <Keyboard getState={(letter: string) => getLetterState(state, letter)} />
    </>
  )
}

export default App
