# Wordlish

A Wordle-inspired game built with React, TypeScript, and Material UI. Guess the 5-letter word in 6 tries.

## Features

- Guess a random 5-letter word fetched from a public API
- Click or type to enter guesses
- Reveals the word on loss and prompts to play again
- Can browse top scores across multiple game modes with a detail view

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
