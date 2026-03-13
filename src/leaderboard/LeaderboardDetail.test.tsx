import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { describe, it, expect } from "vitest"

import { getGames } from "./leaderboardData"
import LeaderboardDetail from "./LeaderboardDetail"
import { LeaderboardProvider } from "./LeaderboardProvider"

function renderDetail(id: string) {
  return render(
    <LeaderboardProvider>
      <MemoryRouter initialEntries={[`/leaderboard/${id}`]}>
        <Routes>
          <Route path="/leaderboard/:id" element={<LeaderboardDetail />} />
        </Routes>
      </MemoryRouter>
    </LeaderboardProvider>,
  )
}

describe("LeaderboardDetail", () => {
  const game = getGames()[0]

  it("renders the game name", async () => {
    renderDetail(game.id)
    expect(
      await screen.findByText(new RegExp(game.name, "i")),
    ).toBeInTheDocument()
  })

  it("renders top 10 scores", async () => {
    renderDetail(game.id)
    for (const entry of game.scores.slice(0, 10)) {
      expect(await screen.findByText(entry.name)).toBeInTheDocument()
    }
  })

  it("renders a back link", async () => {
    renderDetail(game.id)
    expect(
      await screen.findByRole("link", { name: /back/i }),
    ).toBeInTheDocument()
  })

  it("shows not found message for unknown game", async () => {
    renderDetail("unknown-game-id")
    expect(await screen.findByText(/not found/i)).toBeInTheDocument()
  })
})
