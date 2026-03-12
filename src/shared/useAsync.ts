import { useCallback, useEffect, useRef, useState } from "react"

type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; value: T }
  | { status: "error"; error: unknown }

export default function useAsync<Type>(
  fn: (initial: boolean) => Promise<Type>,
): [
  Type | undefined,
  {
    loading: boolean
    error: unknown
    refresh: () => void
  },
] {
  const fnRef = useRef(fn)
  fnRef.current = fn

  const [state, setState] = useState<AsyncState<Type>>({ status: "loading" })

  const run = useCallback((initial: boolean) => {
    setState({ status: "loading" })
    fnRef.current(initial).then(
      (value) => setState({ status: "success", value }),
      (error: unknown) => setState({ status: "error", error }),
    )
  }, [])

  useEffect(() => {
    run(true)
  }, [run])

  const refresh = useCallback(() => {
    run(false)
  }, [run])

  if (state.status === "error") throw state.error

  return [
    state.status === "success" ? state.value : undefined,
    { loading: state.status === "loading", error: null, refresh },
  ]
}
