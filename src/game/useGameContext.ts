import { useContext } from "react"

import { GameContext, type GameContextValue } from "./GameContext"

export function useGameContext(): GameContextValue {
  const context = useContext(GameContext)
  if (!context) throw new Error("Requires GameContext.")
  return context
}
