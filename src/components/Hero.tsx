import { useState, useEffect } from 'react'
import { trackEvent, identifyUser } from '../lib/posthog'
import { usePlanCountsContext } from '../context/PlanCountsContext'
import styles from './Hero.module.css'

type Plan = 'lifetime' | 'yearly' | 'monthly'

const PLAN_LABELS: Record<Plan, string> = {
  lifetime: 'Founding Lifetime ($299)',
  yearly: 'Early Bird Yearly ($299/yr)',
  monthly: 'Monthly ($39/mo)',
}

export default function Hero() {
  const [email, setEmail] = useState('')
  const [plan, setPlan] = useState<Plan>('lifetime')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const { lifetime, lifetimeProgress, loading } = usePlanCountsContext()

  // Plan options with dynamic badge for lifetime
  const PLAN_OPTIONS = [
    {
      value: 'lifetime' as const,
      name: 'Lifetime',
      price: '$299 once',
      badge: loading ? '...' : `${lifetime.remaining} left`,
      featured: true,
    },
    { value: 'yearly' as const, name: 'Yearly', price: '$299/yr', badge: 'Save 36%', featured: false },
    { value: 'monthly' as const, name: 'Monthly', price: '$39/mo', badge: 'Flexible', featured: false },
  ]

  // Track when hero is viewed
  useEffect(() => {
    trackEvent('hero_viewed')
  }, [])

  const handlePlanChange = (newPlan: Plan) => {
    setPlan(newPlan)
    trackEvent('plan_selected', { plan: newPlan })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === 'loading') return

    setStatus('loading')
    setErrorMessage('')

    trackEvent('waitlist_form_submitted', { email, plan })

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plan }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist')
      }

      // Identify user in PostHog
      identifyUser(email, { plan, signup_date: new Date().toISOString() })
      trackEvent('waitlist_signup_success', { email, plan })

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
      trackEvent('waitlist_signup_error', { email, plan, error: errorMessage })
    }
  }

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.logo}>
            <img src="/LobbyLoop.png" alt="LobbyLoop icon" className={styles.logoImage} />
            <span className={styles.logoText}>
              <span className={styles.logoLobby}>Lobby</span>
              <span className={styles.logoLoop}>Loop</span>
            </span>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          {/* Trust Badge */}
          <div className={`${styles.badge} animate-in`}>
            <span className={styles.badgeDot} />
            <span>Used by HEVA BJJ · 87+ members tracked</span>
          </div>

          {/* Headline */}
          <h1 className={`${styles.headline} animate-in animate-delay-100`}>
            Tablet for Check-in.
            <br />
            <span className={styles.headlineAccent}>Wall TV</span> for Promotions.
          </h1>

          {/* Subtitle */}
          <p className={`${styles.subtitle} animate-in animate-delay-200`}>
            Two-screen system for gyms, studios, and small businesses.
            Members check in on a tablet. Your TV shows announcements, tournaments, and promos.
          </p>

          {/* Form or Success Message */}
          {status === 'success' ? (
            <div className={`${styles.successMessage} animate-in`}>
              <div className={styles.successIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <p className={styles.successTitle}>You're on the list!</p>
              <p className={styles.successDesc}>
                You selected <strong>{PLAN_LABELS[plan]}</strong>. We'll email you when checkout is ready.
              </p>
            </div>
          ) : (
            <form className={`${styles.form} animate-in animate-delay-300`} onSubmit={handleSubmit}>
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

              {/* Plan Selector */}
              <div className={styles.planSelector}>
                <p className={styles.planLabel}>I'm interested in:</p>
                <div className={styles.planOptions}>
                  {PLAN_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className={`${styles.planOption} ${plan === option.value ? styles.planOptionActive : ''} ${option.featured ? styles.planOptionFeatured : ''}`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        value={option.value}
                        checked={plan === option.value}
                        onChange={() => handlePlanChange(option.value)}
                      />
                      <span className={styles.planOptionBox}>
                        <span className={`${styles.planBadge} ${option.featured ? styles.planBadgeFeatured : ''}`}>
                          {option.featured && '🔥 '}{option.badge}
                        </span>
                        <span className={styles.planName}>{option.name}</span>
                        <span className={styles.planPrice}>{option.price}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {status === 'error' && (
                <p className={styles.errorMessage}>{errorMessage}</p>
              )}
            </form>
          )}

          {/* CTA Note */}
          {status !== 'success' && (
            <p className={`${styles.ctaNote} animate-in animate-delay-400`}>
              Join the waitlist · We'll notify you when checkout is ready
            </p>
          )}

          {/* Urgency Bar */}
          <div className={`${styles.urgencyBar} animate-in animate-delay-500`}>
            <div className={styles.urgencyProgress}>
              <div className={styles.urgencyFill} style={{ width: `${lifetimeProgress}%` }} />
            </div>
            <span className={styles.urgencyText}>
              <strong>{lifetime.remaining}/{lifetime.total}</strong> Founding Lifetime spots remaining
            </span>
          </div>

          {/* Hardware Callout */}
          <div className={`${styles.hardwareCallout} animate-in animate-delay-500`}>
            <span className={styles.hardwarePrice}>~$110</span>
            <span className={styles.hardwareLabel}>
              total hardware cost<br />using budget Android devices
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
