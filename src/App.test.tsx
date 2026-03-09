import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { describe, it, expect } from "vitest"

import App from "./App"

const renderApp = (initialPath = "/") =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>,
  )

describe("App", () => {
  it("renders the nav with Game and Leaderboard links", () => {
    renderApp()
    expect(screen.getByText(/^game$/i)).toBeInTheDocument()
    expect(screen.getByText(/^leaderboard$/i)).toBeInTheDocument()
  })

  it("shows the game page by default", () => {
    renderApp()
    expect(screen.getByText(/wordlish/i)).toBeInTheDocument()
    expect(screen.getByText(/begin/i)).toBeInTheDocument()
  })

  it("navigates to leaderboard when link is clicked", async () => {
    renderApp()
    await userEvent.click(screen.getByRole("link", { name: /^leaderboard$/i }))
    expect(screen.getAllByText(/wordlish/i).length).toBeGreaterThan(0)
  })

  it("renders leaderboard list at /leaderboard", () => {
    renderApp("/leaderboard")
    expect(
      screen.getByRole("heading", { name: /leaderboard/i }),
    ).toBeInTheDocument()
  })
})
