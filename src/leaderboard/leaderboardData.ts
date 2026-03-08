export type Score = {
  rank: number
  name: string
  score: number
}

export type Game = {
  id: string
  name: string
  scores: Score[]
}

const games: Game[] = [
  {
    id: "wordlish",
    name: "Wordlish",
    scores: [
      { rank: 1, name: "Alice", score: 980 },
      { rank: 2, name: "Bob", score: 910 },
      { rank: 3, name: "Carol", score: 870 },
      { rank: 4, name: "Dave", score: 840 },
      { rank: 5, name: "Eve", score: 800 },
      { rank: 6, name: "Frank", score: 760 },
      { rank: 7, name: "Grace", score: 730 },
      { rank: 8, name: "Hank", score: 700 },
      { rank: 9, name: "Ivy", score: 670 },
      { rank: 10, name: "Jack", score: 640 },
    ],
  },
  {
    id: "speed-wordlish",
    name: "Speed Wordlish",
    scores: [
      { rank: 1, name: "Zara", score: 1200 },
      { rank: 2, name: "Omar", score: 1150 },
      { rank: 3, name: "Nina", score: 1090 },
      { rank: 4, name: "Leo", score: 1020 },
      { rank: 5, name: "Mia", score: 980 },
      { rank: 6, name: "Kai", score: 940 },
      { rank: 7, name: "Jess", score: 900 },
      { rank: 8, name: "Hugo", score: 860 },
      { rank: 9, name: "Isla", score: 820 },
      { rank: 10, name: "Felix", score: 780 },
    ],
  },
  {
    id: "hard-mode",
    name: "Hard Mode",
    scores: [
      { rank: 1, name: "Sam", score: 750 },
      { rank: 2, name: "Taylor", score: 700 },
      { rank: 3, name: "Jordan", score: 660 },
      { rank: 4, name: "Morgan", score: 620 },
      { rank: 5, name: "Casey", score: 580 },
      { rank: 6, name: "Riley", score: 540 },
      { rank: 7, name: "Drew", score: 510 },
      { rank: 8, name: "Quinn", score: 480 },
      { rank: 9, name: "Avery", score: 450 },
      { rank: 10, name: "Blake", score: 420 },
    ],
  },
]

export function getGames(): Game[] {
  return games
}

export function getGame(id: string): Game | undefined {
  return games.find((g) => g.id === id)
}

export function getTopScores(id: string, limit: number): Score[] {
  const game = getGame(id)
  if (!game) return []
  return game.scores.slice(0, limit)
}
