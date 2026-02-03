import { useState, useEffect } from 'react'
import { trackEvent, identifyUser } from '../lib/posthog'
import styles from './FinalCTA.module.css'

export default function FinalCTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    trackEvent('final_cta_viewed')
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === 'loading') return

    setStatus('loading')
    setErrorMessage('')

    trackEvent('final_cta_form_submitted', { email, plan: 'lifetime' })

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plan: 'lifetime' }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist')
      }

      identifyUser(email, { plan: 'lifetime', signup_date: new Date().toISOString(), source: 'final_cta' })
      trackEvent('final_cta_signup_success', { email })

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
      trackEvent('final_cta_signup_error', { email, error: errorMessage })
    }
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.card}>
          <p className="section-label">Ready to Get Started?</p>
          <h2 className={styles.headline}>
            Ditch the sign-in sheet.
            <br />
            <span className={styles.accent}>Light up your lobby.</span>
          </h2>
          <p className={styles.subtitle}>
            Join 87+ members already checking in at HEVA BJJ. Your gym could be next.
          </p>

          {/* Value Pills */}
          <div className={styles.pills}>
            <div className={styles.pill}>
              <span className={styles.pillIcon}>30 min</span>
              <span className={styles.pillText}>setup</span>
            </div>
            <div className={styles.pill}>
              <span className={styles.pillIcon}>~$110</span>
              <span className={styles.pillText}>hardware</span>
            </div>
            <div className={styles.pill}>
              <span className={styles.pillIcon}>Unlimited</span>
              <span className={styles.pillText}>members</span>
            </div>
          </div>

          {status === 'success' ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <p className={styles.successTitle}>You're on the list!</p>
              <p className={styles.successDesc}>We'll email you when checkout is ready.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === 'loading'}
                />
                <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Joining...' : 'Get Early Access'}
                </button>
              </div>
              {status === 'error' && (
                <p className={styles.error}>{errorMessage}</p>
              )}
            </form>
          )}

          <p className={styles.note}>
            No credit card required · 30-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  )
}
