import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { describe, it, expect } from "vitest"

import { getGame } from "./leaderboardData.ts"
import LeaderboardDetail from "./LeaderboardDetail"

const renderWithId = (id: string) =>
  render(
    <MemoryRouter initialEntries={[`/leaderboard/${id}`]}>
      <Routes>
        <Route path="/leaderboard/:id" element={<LeaderboardDetail />} />
      </Routes>
    </MemoryRouter>,
  )

describe("LeaderboardDetail", () => {
  it("renders the game name", () => {
    renderWithId("wordlish")
    expect(screen.getByText(/wordlish/i)).toBeInTheDocument()
  })

  it("renders top 10 scores", () => {
    const game = getGame("wordlish")
    if (!game) throw new Error("Game not found")
    renderWithId("wordlish")
    for (const entry of game.scores.slice(0, 10)) {
      expect(screen.getByText(entry.name)).toBeInTheDocument()
    }
  })

  it("renders a back link", () => {
    renderWithId("wordlish")
    expect(screen.getByText(/back/i)).toBeInTheDocument()
  })

  it("shows not found message for unknown game", () => {
    renderWithId("unknown-game")
    expect(screen.getByText(/not found/i)).toBeInTheDocument()
  })
})
