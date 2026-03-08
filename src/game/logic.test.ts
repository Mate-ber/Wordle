import { describe, it, expect } from "vitest"
import {
  createState,
  addLetter,
  deleteLetter,
  submitGuess,
  getLetterState,
} from "./logic"

describe("createState", () => {
  it("creates initial state with empty guesses and currentGuess", () => {
    const state = createState()
    expect(state.guesses).toEqual([])
    expect(state.currentGuess).toBe("")
    expect(state.gameOver).toBe(false)
    expect(state.won).toBe(false)
  })

  it("includes a word", () => {
    const state = createState()
    expect(state.word.length).toBe(5)
  })
})

describe("addLetter", () => {
  it("adds a letter to currentGuess", () => {
    const state = createState()
    const next = addLetter(state, "a")
    expect(next.currentGuess).toBe("a")
  })

  it("does not exceed word length", () => {
    let state = createState()
    for (const letter of "abcde") state = addLetter(state, letter)
    const next = addLetter(state, "z")
    expect(next.currentGuess).toBe("abcde")
  })

  it("does nothing when game is over", () => {
    const state = { ...createState(), gameOver: true }
    const next = addLetter(state, "a")
    expect(next.currentGuess).toBe("")
  })
})

describe("deleteLetter", () => {
  it("removes the last letter", () => {
    let state = createState()
    state = addLetter(state, "a")
    state = addLetter(state, "b")
    const next = deleteLetter(state)
    expect(next.currentGuess).toBe("a")
  })

  it("does nothing on empty currentGuess", () => {
    const state = createState()
    const next = deleteLetter(state)
    expect(next.currentGuess).toBe("")
  })

  it("does nothing when game is over", () => {
    const state = { ...createState(), gameOver: true, currentGuess: "ab" }
    const next = deleteLetter(state)
    expect(next.currentGuess).toBe("ab")
  })
})

describe("submitGuess", () => {
  it("does not submit if guess is too short", () => {
    let state = createState()
    state = addLetter(state, "a")
    const next = submitGuess(state)
    expect(next.guesses).toHaveLength(0)
  })

  it("adds guess to guesses list", () => {
    let state = createState()
    for (const letter of "abcde") state = addLetter(state, letter)
    const next = submitGuess(state)
    expect(next.guesses).toHaveLength(1)
    expect(next.currentGuess).toBe("")
  })

  it("sets won when guess matches word", () => {
    let state = createState()
    for (const letter of state.word) state = addLetter(state, letter)
    const next = submitGuess(state)
    expect(next.won).toBe(true)
    expect(next.gameOver).toBe(true)
  })

  it("sets gameOver after 6 wrong guesses", () => {
    let state = createState()
    const wrongWord = state.word === "abcde" ? "fghij" : "abcde"
    for (let i = 0; i < 6; i++) {
      for (const letter of wrongWord) state = addLetter(state, letter)
      state = submitGuess(state)
    }
    expect(state.gameOver).toBe(true)
    expect(state.won).toBe(false)
  })

  it("does nothing when game is already over", () => {
    const state = { ...createState(), gameOver: true }
    const next = submitGuess(state)
    expect(next.guesses).toHaveLength(0)
  })
})

describe("getLetterState", () => {
  it("returns unknown for a letter not yet guessed", () => {
    const state = createState()
    expect(getLetterState(state, "a")).toBe("#333333")
  })

  it("returns correct color for a correct letter in position", () => {
    const state = createState()
    const firstLetter = state.word[0]
    let s = state
    for (const letter of state.word) s = addLetter(s, letter)
    s = submitGuess(s)
    expect(getLetterState(s, firstLetter, 0)).toBe("#538d4e")
  })

})
