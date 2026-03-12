import useAsync from "../shared/useAsync"
import { getWord, type Word } from "./api"

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
