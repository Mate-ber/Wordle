export type State = {
  word: string
  guesses: string[]
  currentGuess: string
  gameOver: boolean
  won: boolean
}

const states = {
  correct: "#538d4e",
  present: "#b59f3b",
  unknown: "#333333",
}

export function createState(): State {
  return {
    word: "dizzy",
    guesses: [],
    currentGuess: "",
    gameOver: false,
    won: false,
  }
}

function scoreGuess(guess: string, word: string): string[] {
  const result: string[] = Array(word.length).fill(states.unknown)
  const remaining: (string | null)[] = word.split("")

  for (let i = 0; i < word.length; i++) {
    if (guess[i] === word[i]) {
      result[i] = states.correct
      remaining[i] = null
    }
  }

  for (let i = 0; i < word.length; i++) {
    if (result[i] === states.correct) continue
    const idx = remaining.indexOf(guess[i])
    if (idx !== -1) {
      result[i] = states.present
      remaining[idx] = null
    }
  }

  return result
}

export function getLetterState(
  state: State,
  letter: string,
  position?: number,
): string {
  if (position !== undefined) {
    for (let g = state.guesses.length - 1; g >= 0; g--) {
      if (state.guesses[g][position] === letter) {
        return scoreGuess(state.guesses[g], state.word)[position]
      }
    }
    return states.unknown
  }

  const priority: Record<string, number> = {
    [states.correct]: 2,
    [states.present]: 1,
    [states.unknown]: 0
  }

  let best = states.unknown

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

export function addLetter(state: State, letter: string): State {
  if (state.gameOver || state.currentGuess.length >= state.word.length) return state

  return {
    word: state.word,
    guesses: state.guesses,
    currentGuess: state.currentGuess + letter,
    gameOver: state.gameOver,
    won: state.won
  }
}

export function deleteLetter(state: State): State {
  if (state.gameOver) return state

  return {
    word: state.word,
    guesses: state.guesses,
    currentGuess: state.currentGuess.slice(0, -1),
    gameOver: state.gameOver,
    won: state.won
  }
}

export function submitGuess(state: State): State {
  if (state.gameOver || state.currentGuess.length !== state.word.length) return state

  const newGuesses = [...state.guesses, state.currentGuess]
  const won = state.currentGuess === state.word
  const gameOver = won || newGuesses.length >= 6

  return {
    word: state.word,
    guesses: newGuesses,
    currentGuess: "",
    gameOver: gameOver,
    won: won
  }
}
