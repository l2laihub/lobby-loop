import styles from './SocialProof.module.css'

export default function SocialProof() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.card}>
          <p className={styles.quote}>
            "We replaced our old sign-in sheet and the unused TV in our lobby. Now members see upcoming tournaments as they walk in, and I finally know exactly who's showing up to each class."
          </p>

          <div className={styles.metrics}>
            <div className={styles.metric}>
              <p className={styles.metricNumber}>87+</p>
              <p className={styles.metricLabel}>Members</p>
            </div>
            <div className={styles.metric}>
              <p className={styles.metricNumber}>2</p>
              <p className={styles.metricLabel}>Months Live</p>
            </div>
            <div className={styles.metric}>
              <p className={styles.metricNumber}>$110</p>
              <p className={styles.metricLabel}>Hardware Cost</p>
            </div>
          </div>

          <div className={styles.author}>
            <div className={styles.avatar} />
            <div className={styles.info}>
              <p className={styles.name}>HEVA BJJ</p>
              <p className={styles.role}>Renton, WA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
