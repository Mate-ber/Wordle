import { useMemo } from "react"

import useAsync from "../shared/useAsync"

import { LeaderboardContext } from "./LeaderboardContext"
import { getGames } from "./leaderboardData"

async function fetchLeaderboard() {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return getGames()
}

export const LeaderboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [games, { loading }] = useAsync(fetchLeaderboard)

  const context = useMemo(() => ({ games, loading }), [games, loading])

  return <LeaderboardContext value={context}>{children}</LeaderboardContext>
}
