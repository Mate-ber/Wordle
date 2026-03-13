import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it, expect } from "vitest"

import { ThemeProvider } from "../context/ThemeProvider"

import { GamePage } from "./GamePage"

function renderGamePage() {
  return render(
    <ThemeProvider>
      <MemoryRouter>
        <GamePage />
      </MemoryRouter>
    </ThemeProvider>,
  )
}

describe("GamePage", () => {
  it("shows loading state initially", () => {
    renderGamePage()
    expect(screen.getByText(/loading word/i)).toBeInTheDocument()
  })

  it("renders without crashing", () => {
    renderGamePage()
    expect(document.body).toBeTruthy()
  })
})
