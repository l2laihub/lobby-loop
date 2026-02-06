import styles from './UseCases.module.css'

const GYM_SIZES = [
  {
    title: 'Small Gyms',
    members: '1\u201350 members',
    description: 'Start with 1 tablet + 1 TV. Perfect for building community on a budget.',
  },
  {
    title: 'Growing Gyms',
    members: '50\u2013150 members',
    description: 'Add tablets at kids entrance, training floor displays. Same monthly price.',
  },
  {
    title: 'Multi-Location',
    members: '150+ members',
    description: 'Deploy across all locations. Centralized dashboard. No per-location fees.',
  },
]

const USE_CASES = [
  '\uD83E\uDD4B Martial Arts Gyms',
  '\uD83E\uDDD8 Yoga Studios',
  '\uD83D\uDCAA CrossFit Boxes',
  '\uD83D\uDC87 Hair Salons',
  '\uD83D\uDC85 Nail Studios',
  '\uD83D\uDCDA Tutoring Centers',
  '\uD83C\uDFA8 Art Classes',
  '\uD83C\uDFB9 Music Schools',
  '\uD83C\uDFCA Swim Schools',
  '\uD83D\uDC15 Dog Daycares',
  '\uD83E\uDDD6 Spas & Wellness',
  '\uD83C\uDFE2 Coworking Spaces',
]

export default function UseCases() {
  return (
    <section className={styles.section}>
      <div className="container">
        <p className="section-label">Perfect For</p>
        <h2 className="section-title">Built for Every Size Business</h2>

        <div className={styles.sizeGrid}>
          {GYM_SIZES.map((size) => (
            <div key={size.title} className={styles.sizeCard}>
              <p className={styles.sizeTitle}>{size.title}</p>
              <p className={styles.sizeMembers}>{size.members}</p>
              <p className={styles.sizeDesc}>{size.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.divider} />
        <p className={styles.subLabel}>Works for any business with a lobby</p>

        <div className={styles.list}>
          {USE_CASES.map((useCase) => (
            <span key={useCase} className={styles.tag}>
              {useCase}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
