import styles from './Hardware.module.css'

const HARDWARE_ITEMS = [
  {
    emoji: '📱',
    title: 'Android Tablet',
    description: '11" tablet from Amazon',
    price: '~$78',
  },
  {
    emoji: '📺',
    title: 'Any TV or Monitor',
    description: 'Use a spare TV you already have',
    price: '$0',
  },
  {
    emoji: '📦',
    title: 'Android TV Box',
    description: 'Small streaming box from Amazon',
    price: '~$32',
  },
]

export default function Hardware() {
  return (
    <section className={styles.section}>
      <div className="container">
        <p className="section-label">Budget-Friendly Setup</p>
        <h2 className="section-title">No expensive hardware required</h2>

        <div className={styles.grid}>
          {HARDWARE_ITEMS.map((item) => (
            <div key={item.title} className={styles.item}>
              <div className={styles.emoji}>{item.emoji}</div>
              <p className={styles.itemTitle}>{item.title}</p>
              <p className={styles.itemDesc}>{item.description}</p>
              <p className={styles.itemPrice}>{item.price}</p>
            </div>
          ))}
        </div>

        <div className={styles.total}>
          <p className={styles.totalLabel}>Total hardware investment</p>
          <p className={styles.totalPrice}>~$110</p>
          <p className={styles.totalNote}>vs. $500+ for iPad-based setups</p>
        </div>
      </div>
    </section>
  )
}
