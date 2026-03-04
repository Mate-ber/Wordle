import { type State } from "./logic"
import styles from "./Guesses.module.css"

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
    <div className={styles.board}>
      {rows.map((word, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {word.split("").map((letter, colIndex) => (
            <span
              key={colIndex}
              className={styles.tile}
              style={{ background: getState(letter, colIndex) }}
            >
              {letter === " " ? "" : letter}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Guesses
