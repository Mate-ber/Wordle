import { Route, Routes } from "react-router-dom"

import { MainLayout } from "./layouts/MainLayout"
import { GamePage } from "./pages/GamePage"
import { LeaderboardPage } from "./pages/LeaderboardPage"

export function App(): React.ReactElement {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<GamePage />} />
        <Route path="/leaderboard/*" element={<LeaderboardPage />} />
      </Route>
    </Routes>
  )
}
