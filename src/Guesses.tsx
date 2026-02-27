const NUM_GUESSES = 6

const Guesses: React.FC<{
  getState: (letter: string, position: number) => string
}> = ({ getState }) => {
  return (
    <div>
      {Array.from<string>({ length: NUM_GUESSES })
        .fill("     ")
        .map((word, index) => (
          <div key={index}>
            {word.split("").map((letter, index) => (
              <span
                key={index}
                style={{
                  display: "inline-block",
                  margin: "0.25em",
                  padding: "0.25em",
                  color: "white",
                  background: getState(letter, index),
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
