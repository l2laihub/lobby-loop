import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.text}>
          Questions?{' '}
          <a href="mailto:hello@lobbyloop.io" className={styles.link}>
            hello@lobbyloop.io
          </a>{' '}
          · Built in Seattle 🌲
        </p>
      </div>
    </footer>
  )
}
