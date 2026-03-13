import { useCallback, useEffect, useMemo, useState } from "react"

import { ThemeContext, type ThemeMode } from "./ThemeContext"

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>("light")

  useEffect(() => {
    document.body.setAttribute("data-theme", mode)
  }, [mode])

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"))
  }, [])

  const context = useMemo(() => ({ mode, toggleTheme }), [mode, toggleTheme])

  return <ThemeContext value={context}>{children}</ThemeContext>
}
