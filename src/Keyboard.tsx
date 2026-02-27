const keyboard = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
]

const Keyboard: React.FC<{
  getState: (letter: string) => string
}> = ({ getState }) => {
  return (
    <div>
      {keyboard.map((row, index) => (
        <div key={index}>
          {row.map((letter) => (
            <span
              key={letter}
              style={{
                display: "inline-block",
                border: "1px solid black",
                margin: "0.25em",
                padding: "0.25em",
                color: "white",
                background: getState(letter),
              }}
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

// ',.pyfgcrl
// aoeuidhtns-
// ;qjkxbmwvz
