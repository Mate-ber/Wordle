import useAsync from "../../../shared/useAsync"

import { fetchLeaderboard } from "./leaderboard"
import { type Game } from "./leaderboard"

export type { Game }

export function useLeaderboard(): [
  Game[] | undefined,
  {
    loading: boolean
    error: unknown
    refresh: () => void
  },
] {
  return useAsync(fetchLeaderboard)
}
