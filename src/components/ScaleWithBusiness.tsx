import styles from './ScaleWithBusiness.module.css'

const PROGRESSION = [
  {
    stage: 'Month 1: Start Simple',
    items: [
      '1 check-in tablet',
      '1 lobby TV',
      'Track attendance',
    ],
    price: '$29/month',
    diagram: 'single',
  },
  {
    stage: 'Month 6: Add Depth',
    items: [
      'Kids program tablet',
      'Training floor display',
      'Multiple check-in points',
    ],
    price: 'Still $29/month',
    diagram: 'stacked',
  },
  {
    stage: 'Year 2+: Go Big',
    items: [
      'Multiple locations',
      '10+ screens deployed',
      'Centralized management',
    ],
    price: 'Still $29/month',
    diagram: 'multi',
  },
]

const DEPLOY_LOCATIONS = [
  'Front desk check-in',
  'Kids program entrance',
  'Competition team room',
  'Lobby display',
  'Training floor TV',
  'Locker room announcements',
]

export default function ScaleWithBusiness() {
  return (
    <section className={styles.section}>
      <div className="container">
        <p className="section-label">Unlimited Scalability</p>
        <h2 className="section-title">Start Small. Scale Everywhere.</h2>
        <p className={styles.sectionSubtitle}>
          One location or five. One screen or twenty. LobbyLoop grows with you — at the same price.
        </p>

        {/* Progression Cards */}
        <div className={styles.progressionGrid}>
          {PROGRESSION.map((card, index) => (
            <div key={card.stage} className={styles.progressionCard}>
              <p className={styles.progressionStage}>{card.stage}</p>

              {/* CSS Diagram */}
              <div className={styles.diagram}>
                {card.diagram === 'single' && (
                  <div className={styles.diagramSingle}>
                    <div className={styles.device}>
                      <span className={styles.deviceLabel}>Tablet</span>
                    </div>
                    <div className={styles.connector} />
                    <div className={styles.cloud}>Cloud</div>
                    <div className={styles.connector} />
                    <div className={styles.device}>
                      <span className={styles.deviceLabel}>TV</span>
                    </div>
                  </div>
                )}
                {card.diagram === 'stacked' && (
                  <div className={styles.diagramStacked}>
                    <div className={styles.deviceStack}>
                      <div className={styles.deviceSmall} />
                      <div className={styles.deviceSmall} />
                      <div className={styles.deviceSmall} />
                    </div>
                  </div>
                )}
                {card.diagram === 'multi' && (
                  <div className={styles.diagramMulti}>
                    <div className={styles.locationDot} />
                    <div className={styles.locationDot} />
                    <div className={styles.locationDot} />
                    <div className={styles.connectorCenter} />
                    <div className={styles.dashboard}>1 Dashboard</div>
                  </div>
                )}
              </div>

              <ul className={styles.progressionList}>
                {card.items.map((item) => (
                  <li key={item}>
                    <span className={styles.progressionCheck}>
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className={styles.progressionPrice}>{card.price}</p>

              {index < PROGRESSION.length - 1 && (
                <div className={styles.arrow}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Deploy Anywhere Grid */}
        <div className={styles.deploySection}>
          <h3 className={styles.deployTitle}>Deploy Anywhere</h3>
          <div className={styles.deployGrid}>
            {DEPLOY_LOCATIONS.map((location) => (
              <div key={location} className={styles.deployItem}>
                <span className={styles.deployCheck}>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <span>{location}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Manage Everywhere Callout */}
        <div className={styles.manageCallout}>
          <p className={styles.manageText}>
            One cloud dashboard controls all your screens across all locations.
          </p>
        </div>
      </div>
    </section>
  )
}
