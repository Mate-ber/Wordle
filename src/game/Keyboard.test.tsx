import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"

import Keyboard from "./Keyboard"

describe("Keyboard", () => {
  it("renders all letter keys", () => {
    render(
      <Keyboard
        getState={() => "#d3d6da"}
        onLetter={vi.fn()}
        onDelete={vi.fn()}
        onSubmit={vi.fn()}
      />,
    )
    expect(screen.getByText("a")).toBeInTheDocument()
    expect(screen.getByText("z")).toBeInTheDocument()
    expect(screen.getByText("p")).toBeInTheDocument()
  })

  it("renders Enter and Backspace keys", () => {
    render(
      <Keyboard
        getState={() => "#d3d6da"}
        onLetter={vi.fn()}
        onDelete={vi.fn()}
        onSubmit={vi.fn()}
      />,
    )
    expect(screen.getByText("Enter")).toBeInTheDocument()
    expect(screen.getByText("Backspace")).toBeInTheDocument()
  })

  it("calls onLetter when a letter key is clicked", async () => {
    const onLetter = vi.fn()
    render(
      <Keyboard
        getState={() => "#d3d6da"}
        onLetter={onLetter}
        onDelete={vi.fn()}
        onSubmit={vi.fn()}
      />,
    )
    await userEvent.click(screen.getByText("a"))
    expect(onLetter).toHaveBeenCalledWith("a")
  })

  it("calls onDelete when backspace key is clicked", async () => {
    const onDelete = vi.fn()
    render(
      <Keyboard
        getState={() => "#d3d6da"}
        onLetter={vi.fn()}
        onDelete={onDelete}
        onSubmit={vi.fn()}
      />,
    )
    await userEvent.click(screen.getByText("Backspace"))
    expect(onDelete).toHaveBeenCalled()
  })

  it("calls onSubmit when Enter key is clicked", async () => {
    const onSubmit = vi.fn()
    render(
      <Keyboard
        getState={() => "#d3d6da"}
        onLetter={vi.fn()}
        onDelete={vi.fn()}
        onSubmit={onSubmit}
      />,
    )
    await userEvent.click(screen.getByText("Enter"))
    expect(onSubmit).toHaveBeenCalled()
  })
})
