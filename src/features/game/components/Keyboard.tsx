import { type LetterStatus } from "../../../types"

import styles from "./Keyboard.module.css"

const keyboard = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
]

const Keyboard: React.FC<{
  getState: (letter: string) => LetterStatus
  onLetter: (letter: string) => void
  onDelete: () => void
  onSubmit: () => void
}> = ({ getState, onLetter, onDelete, onSubmit }) => {
  const handleClick = (key: string) => {
    if (key === "Enter") onSubmit()
    else if (key === "Backspace") onDelete()
    else onLetter(key)
  }

  return (
    <div className={styles.keyboard}>
      {keyboard.map((row, index) => (
        <div key={index} className={styles.row}>
          {row.map((letter) => (
            <span
              key={letter}
              className={styles.key}
              onClick={() => handleClick(letter)}
              style={{ background: getState(letter), color: "white" }}
            >
              {letter}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
