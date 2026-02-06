import { useEffect } from 'react'
import { trackEvent } from '../lib/posthog'
import styles from './Comparison.module.css'

const COMPARISON_TABLE = [
  { feature: 'Check-in Tablet', pos: '1 at front desk', signage: 'No', lobbyloop: 'Unlimited' },
  { feature: 'Wall Display', pos: 'No', signage: 'Yes', lobbyloop: 'Unlimited' },
  { feature: 'Multi-Location', pos: 'Separate accounts', signage: 'Per-screen pricing', lobbyloop: 'One dashboard' },
  { feature: 'Self-Service Kiosks', pos: 'Staff only', signage: 'No', lobbyloop: 'Yes' },
  { feature: 'Price for 2 screens', pos: '$75\u2013139/mo', signage: '$16\u201340/mo', lobbyloop: '$29/mo' },
  { feature: 'Price for 5 screens', pos: '$75\u2013139/mo + extra', signage: '$40\u2013100/mo', lobbyloop: '$29/mo' },
]

const COMPARISONS = [
  {
    vs: 'Paper Sign-in',
    icon: '\uD83D\uDCCB',
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
    verdict: '$29/mo replaces guesswork with data you can act on.',
  },
  {
    vs: 'Full Gym Software',
    icon: '\uD83C\uDFE2',
    subtitle: 'Mindbody, Zen Planner, etc.',
    lobbyloopWins: [
      '10x cheaper ($29 vs $400/mo)',
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
        <h2 className="section-title">Why Gyms Choose LobbyLoop Over Alternatives</h2>

        {/* Comparison Table - Desktop */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Feature</th>
                <th>POS Systems</th>
                <th>Digital Signage</th>
                <th className={styles.tableHighlight}>LobbyLoop</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_TABLE.map((row) => (
                <tr key={row.feature}>
                  <td className={styles.tableFeature}>{row.feature}</td>
                  <td>{row.pos}</td>
                  <td>{row.signage}</td>
                  <td className={styles.tableHighlight}>{row.lobbyloop}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.tableFootnotes}>
            <p>POS: Mindbody, GymDesk, Zenplanner</p>
            <p>Signage: Yodeck, OptiSigns, ScreenCloud</p>
          </div>
        </div>

        {/* Comparison Table - Mobile (stacked cards) */}
        <div className={styles.tableCards}>
          {COMPARISON_TABLE.map((row) => (
            <div key={row.feature} className={styles.tableCard}>
              <p className={styles.tableCardLabel}>{row.feature}</p>
              <div className={styles.tableCardValues}>
                <div className={styles.tableCardValue}>
                  <span className={styles.tableCardTag}>POS</span>
                  <span>{row.pos}</span>
                </div>
                <div className={styles.tableCardValue}>
                  <span className={styles.tableCardTag}>Signage</span>
                  <span>{row.signage}</span>
                </div>
                <div className={`${styles.tableCardValue} ${styles.tableCardValueHighlight}`}>
                  <span className={styles.tableCardTag}>LobbyLoop</span>
                  <span>{row.lobbyloop}</span>
                </div>
              </div>
            </div>
          ))}
          <div className={styles.tableFootnotes}>
            <p>POS: Mindbody, GymDesk, Zenplanner</p>
            <p>Signage: Yodeck, OptiSigns, ScreenCloud</p>
          </div>
        </div>

        <h3 className={styles.subsectionTitle}>How We Stack Up</h3>

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
                <span className={styles.verdictIcon}>{'\uD83D\uDCA1'}</span>
                <p>{item.verdict}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
