import { describe, it, expect } from "vitest"

import { getGames, getGame, getTopScores } from "./leaderboardData.ts"

describe("getGames", () => {
  it("returns an array of games", () => {
    const games = getGames()
    expect(Array.isArray(games)).toBe(true)
    expect(games.length).toBeGreaterThan(0)
  })

  it("each game has an id, name, and scores", () => {
    const games = getGames()
    for (const game of games) {
      expect(game).toHaveProperty("id")
      expect(game).toHaveProperty("name")
      expect(Array.isArray(game.scores)).toBe(true)
    }
  })
})

describe("getGame", () => {
  it("returns the correct game by id", () => {
    const game = getGame("wordlish")
    expect(game).toBeDefined()
    expect(game?.name).toBe("Wordlish")
  })

  it("returns undefined for an unknown id", () => {
    const game = getGame("does-not-exist")
    expect(game).toBeUndefined()
  })
})

describe("getTopScores", () => {
  it("returns the correct number of scores", () => {
    const scores = getTopScores("wordlish", 3)
    expect(scores).toHaveLength(3)
  })

  it("returns scores in order (highest first)", () => {
    const scores = getTopScores("wordlish", 10)
    for (let i = 1; i < scores.length; i++) {
      expect(scores[i - 1].score).toBeGreaterThanOrEqual(scores[i].score)
    }
  })

  it("returns empty array for unknown game id", () => {
    const scores = getTopScores("does-not-exist", 3)
    expect(scores).toEqual([])
  })
})
