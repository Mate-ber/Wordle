import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it, expect } from "vitest"

import { getGames } from "./leaderboardData.ts"
import LeaderboardList from "./LeaderboardList"

describe("LeaderboardList", () => {
  it("renders a heading", () => {
    render(
      <MemoryRouter>
        <LeaderboardList />
      </MemoryRouter>,
    )
    expect(screen.getByText(/leaderboard/i)).toBeInTheDocument()
  })

  it("renders a card for each game", () => {
    const games = getGames()
    render(
      <MemoryRouter>
        <LeaderboardList />
      </MemoryRouter>,
    )
    for (const game of games) {
      expect(screen.getByText(game.name)).toBeInTheDocument()
    }
  })

  it("shows top 3 scores per game", () => {
    render(
      <MemoryRouter>
        <LeaderboardList />
      </MemoryRouter>,
    )
    const games = getGames()
    for (const game of games) {
      const top3 = game.scores.slice(0, 3)
      for (const entry of top3) {
        expect(screen.getAllByText(entry.name).length).toBeGreaterThan(0)
      }
    }
  })

  it("renders 'See all' links pointing to detail pages", () => {
    render(
      <MemoryRouter>
        <LeaderboardList />
      </MemoryRouter>,
    )
    const links = screen.getAllByText(/see all/i)
    expect(links.length).toBe(getGames().length)
  })
})
