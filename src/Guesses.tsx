import { type State } from "./logic"

const NUM_GUESSES = 6
const WORD_LENGTH = 5

const Guesses: React.FC<{
  state: State
  getState: (letter: string, position: number) => string
}> = ({ state, getState }) => {
  const rows: string[] = state.guesses.slice()
  if (!state.gameOver) {
    rows.push(state.currentGuess.padEnd(WORD_LENGTH, " "))
  }
  while (rows.length < NUM_GUESSES) {
    rows.push("     ")
  }

  return (
    <div>
      {rows.map((word, rowIndex) => (
        <div key={rowIndex}>
          {word.split("").map((letter, colIndex) => (
            <span
              key={colIndex}
              style={{
                display: "inline-block",
                margin: "0.25em",
                padding: "0.25em",
                color: "white",
                background: getState(letter, colIndex),
              }}
            >
              {letter === " " ? "_" : letter}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Guesses
