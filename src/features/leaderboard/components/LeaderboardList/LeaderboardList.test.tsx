import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it, expect } from "vitest"

import { getGames } from "../../api/leaderboard"
import { LeaderboardProvider } from "../../context/LeaderboardProvider"

import LeaderboardList from "./LeaderboardList"

function renderList() {
  return render(
    <LeaderboardProvider>
      <MemoryRouter>
        <LeaderboardList />
      </MemoryRouter>
    </LeaderboardProvider>,
  )
}

describe("LeaderboardList", () => {
  it("renders a heading", async () => {
    renderList()
    expect(await screen.findByText(/leaderboard/i)).toBeInTheDocument()
  })

  it("renders a card for each game", async () => {
    renderList()
    const games = getGames()
    for (const game of games) {
      expect(await screen.findByText(game.name)).toBeInTheDocument()
    }
  })

  it("shows top 3 scores per game", async () => {
    renderList()
    const games = getGames()
    for (const game of games) {
      for (const entry of game.scores.slice(0, 3)) {
        expect(await screen.findByText(entry.name)).toBeInTheDocument()
      }
    }
  })

  it("renders 'See all' links pointing to detail pages", async () => {
    renderList()
    const links = await screen.findAllByText(/see all/i)
    expect(links.length).toBe(getGames().length)
  })
})
