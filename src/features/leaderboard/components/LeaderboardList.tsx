import { Link } from "react-router-dom"

import { useLeaderboardContext } from "../context/useLeaderboardContext"

import styles from "./LeaderboardList.module.css"

const LeaderboardList: React.FC = () => {
  const { games, loading } = useLeaderboardContext()

  if (loading || !games) return <div>Loading leaderboard...</div>

  return (
    <div className={styles.page}>
      <h2>Leaderboard</h2>
      <div className={styles.games}>
        {games.map((game) => (
          <div key={game.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>{game.name}</h3>
              <Link to={game.id} className={styles.link}>
                See all →
              </Link>
            </div>
            <ol className={styles.scores}>
              {game.scores.slice(0, 3).map((entry) => (
                <li key={entry.rank} className={styles.scoreRow}>
                  <span className={styles.name}>{entry.name}</span>
                  <span className={styles.score}>{entry.score}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeaderboardList
