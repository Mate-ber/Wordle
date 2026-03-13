export type GameState = {
  word: string
  guesses: string[]
  currentGuess: string
  gameOver: boolean
  won: boolean
}

export type Score = {
  rank: number
  name: string
  score: number
}

export type Game = {
  id: string
  name: string
  scores: Score[]
}

export const LetterStatus = {
  Correct: "#538d4e",
  Present: "#b59f3b",
  Unknown: "#333333",
} as const

export type LetterStatus = (typeof LetterStatus)[keyof typeof LetterStatus]
