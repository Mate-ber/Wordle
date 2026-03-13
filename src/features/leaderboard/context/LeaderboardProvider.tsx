import { useMemo } from "react"

import { useLeaderboard } from "../api/useLeaderboard"

import { LeaderboardContext } from "./LeaderboardContext"

export const LeaderboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [games, { loading }] = useLeaderboard()

  const context = useMemo(() => ({ games, loading }), [games, loading])

  return <LeaderboardContext value={context}>{children}</LeaderboardContext>
}
