import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import Guesses from "./Guesses"
import { createState, addLetter, submitGuess } from "./logic"

describe("Guesses", () => {
  it("renders 6 rows", () => {
    const state = createState()
    const { container } = render(
      <Guesses state={state} getState={() => "#333333"} />,
    )
    const rows = container.querySelectorAll("[class*='row']")
    expect(rows).toHaveLength(6)
  })

  it("renders 5 tiles per row", () => {
    const state = createState()
    const { container } = render(
      <Guesses state={state} getState={() => "#333333"} />,
    )
    const rows = container.querySelectorAll("[class*='row']")
    rows.forEach((row) => {
      expect(row.querySelectorAll("[class*='tile']")).toHaveLength(5)
    })
  })

  it("shows letters of the current guess", () => {
    let state = createState()
    state = addLetter(state, "h")
    state = addLetter(state, "e")
    const { container } = render(
      <Guesses state={state} getState={() => "#333333"} />,
    )
    const tiles = container.querySelectorAll("[class*='tile']")
    expect(tiles[0].textContent).toBe("h")
    expect(tiles[1].textContent).toBe("e")
  })

  it("shows submitted guesses in uppercase", () => {
    let state = createState()
    for (const letter of "abcde") state = addLetter(state, letter)
    state = submitGuess(state)
    const { container } = render(
      <Guesses state={state} getState={() => "#538d4e"} />,
    )
    const firstRowTiles = container
      .querySelectorAll("[class*='row']")[0]
      .querySelectorAll("[class*='tile']")
    expect(firstRowTiles[0].textContent).toBe("a")
  })
})
