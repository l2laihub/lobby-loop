import { trackEvent } from '../lib/posthog'
import { usePlanCountsContext } from '../context/PlanCountsContext'
import styles from './Pricing.module.css'

export default function Pricing() {
  const { yearly, lifetimeRemainingText, loading } = usePlanCountsContext()

  const PRICING_TIERS = [
    {
      id: 'lifetime',
      tier: 'Founding 50',
      price: 299,
      period: 'one-time payment',
      equivalent: 'Never pay again',
      badge: 'Best Value',
      badgeType: 'gold',
      featured: true,
      spots: loading ? 'Loading...' : lifetimeRemainingText,
      features: [
        'Lifetime access forever',
        'All future updates included',
        'Priority support',
        'Founding member badge',
      ],
      cta: 'Get Lifetime Access',
    },
    {
      id: 'yearly',
      tier: 'Early Bird Yearly',
      price: 299,
      period: 'per year',
      equivalent: 'Just $25/month',
      badge: 'Save 36%',
      badgeType: 'teal',
      featured: false,
      spots: loading ? 'Loading...' : `First ${yearly.total} only`,
      features: [
        'Unlimited check-ins',
        'Upload custom images & slides',
        'Live attendance dashboard',
        'Custom branding',
      ],
      cta: 'Go Yearly',
    },
    {
      id: 'monthly',
      tier: 'Monthly',
      price: 39,
      period: 'per month',
      equivalent: '',
      badge: '',
      badgeType: '',
      featured: false,
      spots: '',
      features: [
        'Unlimited check-ins',
        'Upload custom images & slides',
        'Live attendance dashboard',
        'Cancel anytime',
      ],
      cta: 'Start Monthly',
    },
  ]
  const handlePricingClick = (plan: string) => {
    trackEvent('pricing_card_clicked', { plan })

    // Scroll to top and focus email input
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Pre-select the plan radio button
    const radioBtn = document.querySelector(`input[name="plan"][value="${plan}"]`) as HTMLInputElement
    if (radioBtn) {
      radioBtn.checked = true
      radioBtn.dispatchEvent(new Event('change', { bubbles: true }))
    }

    // Focus email input after scroll
    setTimeout(() => {
      const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement
      emailInput?.focus()
    }, 500)
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">Early Access Pricing</p>
          <h2 className="section-title">Lock in founding member rates</h2>
        </div>

        <div className={styles.grid}>
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`${styles.card} ${tier.featured ? styles.cardFeatured : ''}`}
            >
              {tier.badge && (
                <span className={`${styles.badge} ${tier.badgeType === 'gold' ? styles.badgeGold : styles.badgeTeal}`}>
                  {tier.badge}
                </span>
              )}

              <p className={`${styles.tier} ${tier.featured ? styles.tierFeatured : ''}`}>
                {tier.tier}
              </p>

              <div className={styles.amount}>
                <span className={styles.currency}>$</span>
                <span className={`${styles.price} ${tier.featured ? styles.priceFeatured : ''}`}>
                  {tier.price}
                </span>
              </div>

              <p className={styles.period}>{tier.period}</p>
              <p className={`${styles.equivalent} ${tier.featured ? styles.equivalentFeatured : ''}`}>
                {tier.equivalent || '\u00A0'}
              </p>

              {tier.spots && (
                <div className={`${styles.spots} ${tier.featured ? styles.spotsGold : styles.spotsTeal}`}>
                  <span className={styles.spotsDot} />
                  <span>{tier.spots}</span>
                </div>
              )}

              <div className={styles.features}>
                {tier.features.map((feature) => (
                  <div key={feature} className={styles.feature}>
                    <span className={styles.check}>
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`${styles.btn} ${tier.featured ? styles.btnFeatured : ''}`}
                onClick={() => handlePricingClick(tier.id)}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        <div className={styles.guarantee}>
          <p className={styles.guaranteeTitle}>🛡️ 30-Day Money-Back Guarantee</p>
          <p className={styles.guaranteeDesc}>
            Try LobbyLoop risk-free. If it's not right for your business, get a full refund within 30 days. No questions asked.
          </p>
        </div>
      </div>
    </section>
  )
}
