import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.text}>
          A{' '}
          <a href="https://huybuilds.com" className={styles.link} target="_blank" rel="noopener noreferrer">
            huybuilds
          </a>{' '}
          project · Built in Seattle 🌲
        </p>
      </div>
    </footer>
  )
}
