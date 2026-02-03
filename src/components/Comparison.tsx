import { useEffect } from 'react'
import { trackEvent } from '../lib/posthog'
import styles from './Comparison.module.css'

const COMPARISONS = [
  {
    vs: 'Paper Sign-in',
    icon: '📋',
    lobbyloopWins: [
      'Automatic attendance tracking',
      'Know peak hours at a glance',
      'Member data searchable forever',
      'TV displays your announcements',
    ],
    otherWins: [
      'Zero cost',
      'Works offline',
    ],
    verdict: '$39/mo replaces guesswork with data you can act on.',
  },
  {
    vs: 'Full Gym Software',
    icon: '🏢',
    subtitle: 'Mindbody, Zen Planner, etc.',
    lobbyloopWins: [
      '10x cheaper ($39 vs $400/mo)',
      'Setup in 30 min vs days',
      'No training required',
      'Works alongside existing tools',
    ],
    otherWins: [
      'All-in-one scheduling & payments',
      'Established ecosystem',
    ],
    verdict: 'Perfect if you just need check-in + TV. Use with what you have.',
  },
]

export default function Comparison() {
  useEffect(() => {
    trackEvent('comparison_section_viewed')
  }, [])

  return (
    <section className={styles.section}>
      <div className="container">
        <p className="section-label">Why LobbyLoop?</p>
        <h2 className="section-title">The right tool for the job</h2>

        <div className={styles.grid}>
          {COMPARISONS.map((item) => (
            <div key={item.vs} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.icon}>{item.icon}</span>
                <div>
                  <p className={styles.vs}>vs. {item.vs}</p>
                  {item.subtitle && <p className={styles.subtitle}>{item.subtitle}</p>}
                </div>
              </div>

              <div className={styles.columns}>
                <div className={styles.column}>
                  <p className={styles.columnLabel}>
                    <span className={styles.checkIcon}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    LobbyLoop
                  </p>
                  <ul className={styles.list}>
                    {item.lobbyloopWins.map((win) => (
                      <li key={win}>{win}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.column}>
                  <p className={styles.columnLabel}>
                    <span className={styles.neutralIcon}>~</span>
                    {item.vs}
                  </p>
                  <ul className={`${styles.list} ${styles.listMuted}`}>
                    {item.otherWins.map((win) => (
                      <li key={win}>{win}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.verdict}>
                <span className={styles.verdictIcon}>💡</span>
                <p>{item.verdict}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
