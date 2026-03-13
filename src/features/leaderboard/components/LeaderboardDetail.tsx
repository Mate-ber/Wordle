import { Link, useParams } from "react-router-dom"

import { useLeaderboardContext } from "../context/useLeaderboardContext"

import styles from "./LeaderboardDetail.module.css"

const LeaderboardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { games, loading } = useLeaderboardContext()

  if (loading || !games) return <div>Loading...</div>

  const game = games.find((g) => g.id === id)

  if (!game) {
    return (
      <div>
        <p>Game not found.</p>
        <Link to="/leaderboard">← Back</Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <Link to="/leaderboard" className={styles.back}>
        ← Back
      </Link>
      <h2>{game.name} — Top 10</h2>
      <ol className={styles.scores}>
        {game.scores.slice(0, 10).map((entry) => (
          <li key={entry.rank} className={styles.scoreRow}>
            <span className={styles.rank}>#{entry.rank}</span>
            <span className={styles.name}>{entry.name}</span>
            <span className={styles.score}>{entry.score}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default LeaderboardDetail
