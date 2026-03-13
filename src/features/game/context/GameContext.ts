import { createContext } from "react"

import { type GameState } from "../../../types"

export type GameContextValue = {
  state: GameState | undefined
  loading: boolean
  addLetter: (letter: string) => void
  deleteLetter: () => void
  submitGuess: () => void
  newGame: () => void
}

export const GameContext = createContext<GameContextValue | undefined>(
  undefined,
)
