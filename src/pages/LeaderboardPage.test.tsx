import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it, expect } from "vitest"

import { LeaderboardPage } from "./LeaderboardPage"

function renderLeaderboardPage() {
  return render(
    <MemoryRouter>
      <LeaderboardPage />
    </MemoryRouter>,
  )
}

describe("LeaderboardPage", () => {
  it("shows loading state initially", () => {
    renderLeaderboardPage()
    expect(screen.getByText(/loading leaderboard/i)).toBeInTheDocument()
  })

  it("renders game names after loading", async () => {
    renderLeaderboardPage()
    expect(await screen.findByText("Wordlish")).toBeInTheDocument()
  })
})
