import { createContext } from "react"

import { type State } from "./logic"

export type GameContextValue = {
  state: State | undefined
  loading: boolean
  addLetter: (letter: string) => void
  deleteLetter: () => void
  submitGuess: () => void
  newGame: () => void
}

export const GameContext = createContext<GameContextValue | undefined>(
  undefined,
)
