# Wordlish

A Wordle-inspired game built with React, TypeScript, and Material UI. Guess the 5-letter word in 6 tries.

## Features

- Guess a random 5-letter word fetched from a public API
- Click or type to enter guesses
- Reveals the word on loss and prompts to play again
- Can browse top scores across multiple game modes with a detail view

## Potential Features

- Hard mode (must use correct letters in subsequent guesses)
- Daily word mode
- Score submission after winning
- Animated tile flipping

## Architecture Overview

```
src/
  features/
    game/             # Core Wordle game feature
      api/            # Word fetching
      components/
        Guesses/      # Guess board modlet
        Keyboard/     # On-screen keyboard modlet
      context/        # GameContext, GameProvider, useGameContext
      utils/          # gameUtils
    leaderboard/      # Leaderboard feature
      api/            # leaderboard.ts, useLeaderboard.ts
      components/
        LeaderboardList/    # List of games modlet
        LeaderboardDetail/  # Detail view modlet
      context/        # LeaderboardContext, LeaderboardProvider
  layouts/
    MainLayout/       # Nav bar with theme toggle
  pages/
    GamePage/         # Main game view
    LeaderboardPage/  # Leaderboard with nested routes
  context/
    Theme/            # ThemeContext, ThemeProvider, useTheme
  shared/
    types.ts          # Shared TypeScript types
    useAsync.ts       # Reusable async hook
```

# Getting Started

## Prerequisites

- Node.js
- npm

## Install

```bash
git clone https://github.com/Mate-ber/Wordle.git
cd hs-react-408
npm install
```

## Run

```bash
npm run dev
```

## Check and Use

Open http://localhost:5173

# CI/CD

GitHub Actions runs on every push via .github/workflows/verify-and-deploy.yml:

1. Verify — runs typecheck, ESLint, Prettier, and depcheck in parallel
2. Test — runs the full Vitest suite
3. Build — production Vite build
4. Deploy — deploys to GitHub Pages
