import styles from './UseCases.module.css'

const USE_CASES = [
  '🥋 Martial Arts Gyms',
  '🧘 Yoga Studios',
  '💪 CrossFit Boxes',
  '💇 Hair Salons',
  '💅 Nail Studios',
  '📚 Tutoring Centers',
  '🎨 Art Classes',
  '🎹 Music Schools',
  '🏊 Swim Schools',
  '🐕 Dog Daycares',
  '🧖 Spas & Wellness',
  '🏢 Coworking Spaces',
]

export default function UseCases() {
  return (
    <section className={styles.section}>
      <div className="container">
        <p className="section-label">Perfect For</p>
        <h2 className="section-title">Any business with a lobby and a TV</h2>

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
