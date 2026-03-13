import { LetterStatus, type GameState } from "../../../types"

export function createState(word: string): GameState {
  return {
    word,
    guesses: [],
    currentGuess: "",
    gameOver: false,
    won: false,
  }
}

function scoreGuess(guess: string, word: string): LetterStatus[] {
  const result: LetterStatus[] = Array(word.length).fill(LetterStatus.Unknown)
  const remaining: Array<string | null> = word.split("")

  for (let i = 0; i < word.length; i++) {
    if (guess[i] === word[i]) {
      result[i] = LetterStatus.Correct
      remaining[i] = null
    }
  }

  for (let i = 0; i < word.length; i++) {
    if (result[i] === LetterStatus.Correct) continue
    const idx = remaining.indexOf(guess[i])
    if (idx !== -1) {
      result[i] = LetterStatus.Present
      remaining[idx] = null
    }
  }

  return result
}

export function getLetterState(
  state: GameState,
  letter: string,
  position?: number,
): LetterStatus {
  if (position !== undefined) {
    for (let g = state.guesses.length - 1; g >= 0; g--) {
      if (state.guesses[g][position] === letter) {
        return scoreGuess(state.guesses[g], state.word)[position]
      }
    }
    return LetterStatus.Unknown
  }

  const priority: Record<LetterStatus, number> = {
    [LetterStatus.Correct]: 2,
    [LetterStatus.Present]: 1,
    [LetterStatus.Unknown]: 0,
  }

  let best: LetterStatus = LetterStatus.Unknown

  for (const guess of state.guesses) {
    const scores = scoreGuess(guess, state.word)
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === letter && priority[scores[i]] > priority[best]) {
        best = scores[i]
      }
    }
  }

  return best
}

export function addLetter(state: GameState, letter: string): GameState {
  if (state.gameOver || state.currentGuess.length >= state.word.length) {
    return state
  }
  return { ...state, currentGuess: state.currentGuess + letter }
}

export function deleteLetter(state: GameState): GameState {
  if (state.gameOver) return state
  return { ...state, currentGuess: state.currentGuess.slice(0, -1) }
}

export function submitGuess(state: GameState): GameState {
  if (state.gameOver || state.currentGuess.length !== state.word.length) {
    return state
  }
  const newGuesses = [...state.guesses, state.currentGuess]
  const won = state.currentGuess === state.word
  const gameOver = won || newGuesses.length >= 6
  return { ...state, guesses: newGuesses, currentGuess: "", gameOver, won }
}
