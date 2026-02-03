import styles from './HowItWorks.module.css'

const STEPS = [
  {
    number: 1,
    title: 'Import your members',
    description: 'Upload a CSV or add manually. Name + phone is all you need.',
  },
  {
    number: 2,
    title: 'Create your slides',
    description: 'Add announcements, tournament info, promos, or custom images.',
  },
  {
    number: 3,
    title: 'Open on your devices',
    description: 'Tablet runs check-in mode. TV runs slideshow mode. Both sync live.',
  },
  {
    number: 4,
    title: 'Watch it work',
    description: 'Members tap to check in. TV updates with live attendance. You see it all in your dashboard.',
  },
]

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className="container">
        <p className="section-label">How It Works</p>
        <h2 className="section-title">Set up in under 30 minutes</h2>

        <div className={styles.grid}>
          {STEPS.map((step) => (
            <div key={step.number} className={styles.card}>
              <div className={styles.number}>{step.number}</div>
              <div className={styles.content}>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.description}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
