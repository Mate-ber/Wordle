import { useCallback, useEffect, useMemo, useState } from "react"

import { type GameState } from "../../../shared/types"
import { useWord } from "../api/useWord"
import {
  addLetter as addLetterFn,
  createState,
  deleteLetter as deleteLetterFn,
  submitGuess as submitGuessFn,
} from "../utils/gameUtils"

import { GameContext } from "./GameContext"

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wordData, { loading, refresh: refreshWord }] = useWord()
  const [state, setState] = useState<GameState | undefined>(undefined)

  useEffect(() => {
    if (wordData?.word) {
      setState(createState(wordData.word))
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
