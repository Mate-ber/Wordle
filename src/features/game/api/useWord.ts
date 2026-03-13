import useAsync from "../../../shared/useAsync"

import { getWord } from "./word"
import { type Word } from "./word"

export type { Word }

export function useWord(): [
  Word | undefined,
  {
    loading: boolean
    error: unknown
    refresh: () => void
  },
] {
  return useAsync(getWord)
}
