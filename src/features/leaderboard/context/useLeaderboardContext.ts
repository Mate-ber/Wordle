import { useContext } from "react"

import {
  LeaderboardContext,
  type LeaderboardContextValue,
} from "./LeaderboardContext"

export function useLeaderboardContext(): LeaderboardContextValue {
  const context = useContext(LeaderboardContext)
  if (!context) throw new Error("Requires LeaderboardContext.")
  return context
}
