import { useCallback, useEffect, useMemo, useState } from "react"

import { GameContext } from "./GameContext"
import {
  type State,
  addLetter as addLetterFn,
  deleteLetter as deleteLetterFn,
  submitGuess as submitGuessFn,
} from "./logic"
import { useWord } from "./useWord"

export { getLetterState } from "./logic"

function makeState(word: string): State {
  return { word, guesses: [], currentGuess: "", gameOver: false, won: false }
}

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wordData, { loading, refresh: refreshWord }] = useWord()
  const [state, setState] = useState<State | undefined>(undefined)

  useEffect(() => {
    if (wordData?.word) {
      setState(makeState(wordData.word))
    }
  }, [wordData?.word])

  const addLetter = useCallback((letter: string) => {
    setState((s) => s && addLetterFn(s, letter))
  }, [])

  const deleteLetter = useCallback(() => {
    setState((s) => s && deleteLetterFn(s))
  }, [])

  const submitGuess = useCallback(() => {
    setState((s) => s && submitGuessFn(s))
  }, [])

  const newGame = useCallback(() => {
    setState(undefined)
    refreshWord()
  }, [refreshWord])

  const context = useMemo(
    () => ({ state, loading, addLetter, deleteLetter, submitGuess, newGame }),
    [state, loading, addLetter, deleteLetter, submitGuess, newGame],
  )

  return <GameContext value={context}>{children}</GameContext>
}
