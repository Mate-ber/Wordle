import { createContext } from "react"

import { type Game } from "../../../shared/types"

export type LeaderboardContextValue = {
  games: Game[] | undefined
  loading: boolean
}

export const LeaderboardContext = createContext<
  LeaderboardContextValue | undefined
>(undefined)
