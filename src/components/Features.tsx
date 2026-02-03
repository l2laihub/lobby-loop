import styles from './Features.module.css'

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12" y2="18" />
      </svg>
    ),
    title: 'Tablet Check-in',
    description: 'Members search by name or phone. One tap and they\'re in. Works on any Android tablet or iPad.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8m-4-4v4" />
      </svg>
    ),
    title: 'Wall Display Slideshow',
    description: 'Upload your own images, announcements, and promos. Rotates automatically. Show tournaments, schedules, or anything you want.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M3 3v18h18" />
        <path d="M18 17V9m-5 8v-4m-5 4v-6" />
      </svg>
    ),
    title: 'Live Dashboard',
    description: 'See who\'s checked in right now. Track attendance trends. Know your peak hours at a glance.',
  },
]

export default function Features() {
  return (
    <section className={styles.section}>
      <div className="container">
        <p className="section-label">Features</p>
        <h2 className="section-title">Everything you need. Nothing you don't.</h2>

        <div className={styles.grid}>
          {FEATURES.map((feature) => (
            <div key={feature.title} className={styles.card}>
              <div className={styles.icon}>{feature.icon}</div>
              <h3 className={styles.title}>{feature.title}</h3>
              <p className={styles.description}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
