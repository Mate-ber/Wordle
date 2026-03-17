import { ErrorBoundary } from "react-error-boundary"
import { Route, Routes } from "react-router-dom"

import LeaderboardDetail from "../../features/leaderboard/components/LeaderboardDetail"
import LeaderboardList from "../../features/leaderboard/components/LeaderboardList"
import { LeaderboardProvider } from "../../features/leaderboard/context/LeaderboardProvider"

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return "Something went wrong"
}

export function LeaderboardPage(): React.ReactElement {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div>
          <p>{getErrorMessage(error)}</p>
          <button onClick={() => resetErrorBoundary()}>Retry</button>
        </div>
      )}
    >
      <LeaderboardProvider>
        <Routes>
          <Route path="/" element={<LeaderboardList />} />
          <Route path=":id" element={<LeaderboardDetail />} />
        </Routes>
      </LeaderboardProvider>
    </ErrorBoundary>
  )
}
