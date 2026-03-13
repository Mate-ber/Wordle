import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import IconButton from "@mui/material/IconButton"
import { Link, Outlet } from "react-router-dom"

import { useTheme } from "../context/useTheme"

export function MainLayout(): React.ReactElement {
  const { mode, toggleTheme } = useTheme()

  return (
    <>
      <nav>
        <Link to="/">Game</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </nav>
      <Outlet />
    </>
  )
}
