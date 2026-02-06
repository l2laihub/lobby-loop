import { useState, useEffect } from 'react'
import { trackEvent } from '../lib/posthog'
import styles from './FAQ.module.css'

const FAQ_ITEMS = [
  {
    category: 'Technical',
    question: 'Do I need internet for this to work?',
    answer: 'Yes, LobbyLoop requires an internet connection. Both the check-in tablet and the wall display sync in real-time through our servers. A standard WiFi connection is all you need. If your internet drops briefly, check-ins are cached locally and sync when you reconnect.',
  },
  {
    category: 'Technical',
    question: 'What devices are supported?',
    answer: 'Check-in works on any tablet with a web browser — Android, iPad, or Fire tablet. The wall display runs on any Android TV, Fire TV Stick, Chromecast with Google TV, or any device with a modern web browser. Most gyms use a ~$55 budget tablet and a ~$25 streaming box.',
  },
  {
    category: 'Technical',
    question: 'Can I use the TV I already have?',
    answer: 'Absolutely. If your TV is less than 10 years old, it probably works. Just plug in a small streaming box (~$25 on Amazon) and open our display URL. No app installation needed on the TV itself.',
  },
  {
    category: 'Pricing',
    question: 'Are there any hidden fees or extra costs?',
    answer: 'None. The price you see is the price you pay. No setup fees, no transaction fees, no per-member charges. Unlimited members, unlimited check-ins, unlimited slides. The only additional cost is the hardware you provide (as low as ~$80).',
  },
  {
    category: 'Pricing',
    question: 'Is there a contract or can I cancel anytime?',
    answer: 'Monthly plans can be canceled anytime with no penalty. Yearly plans are billed annually but include a 30-day money-back guarantee. Lifetime access is a one-time purchase with no recurring charges ever.',
  },
  {
    category: 'Pricing',
    question: 'What happens to my data if I cancel?',
    answer: 'You can export all your member data and attendance history as a CSV anytime. After cancellation, we retain your data for 30 days in case you want to reactivate, then it\'s permanently deleted.',
  },
  {
    category: 'Pricing',
    question: 'How many screens/devices can I use?',
    answer: 'Unlimited. Use 1 tablet or 10 tablets, 1 TV or 20 TVs — it\'s the same price. Unlike competitors who charge $8-20 per screen, LobbyLoop includes unlimited devices on every plan.',
  },
  {
    category: 'Pricing',
    question: 'Do you charge per location?',
    answer: 'Nope. Manage all your locations from one dashboard at one price. Whether you have one gym or five, your monthly cost stays the same.',
  },
  {
    category: 'Pricing',
    question: 'What if I want to add more screens later?',
    answer: 'Just buy the hardware (~$110 for a tablet + streaming stick) and log into LobbyLoop. There\'s no extra subscription cost, no per-device fee, and no need to contact us. Add as many as you want.',
  },
  {
    category: 'Setup',
    question: 'How long does setup take?',
    answer: 'Most gyms are fully operational in under 30 minutes. Import your member list (CSV upload or manual entry), create a few slides for your TV, and open LobbyLoop on your devices. That\'s it.',
  },
  {
    category: 'Setup',
    question: 'Do you offer support if I get stuck?',
    answer: 'Yes. Email support is included with all plans. Founding Lifetime members get priority support with faster response times. We also have step-by-step setup guides and video tutorials.',
  },
  {
    category: 'Setup',
    question: 'Can I import members from my current system?',
    answer: 'Yes. Export your members from any system (Mindbody, Zen Planner, spreadsheet, etc.) as a CSV with name and phone/email. Upload it to LobbyLoop and you\'re ready to go.',
  },
  {
    category: 'Comparison',
    question: 'How is this different from Mindbody or Zen Planner?',
    answer: 'Those are full gym management systems with scheduling, payments, and dozens of features you may not need. LobbyLoop does two things exceptionally well: fast member check-in and lobby TV displays. It\'s simpler, cheaper, and works alongside your existing tools.',
  },
  {
    category: 'Comparison',
    question: 'Why not just use a paper sign-in sheet?',
    answer: 'Paper works, but you lose the data. With LobbyLoop, you instantly know attendance trends, peak hours, and who hasn\'t shown up lately. Plus, your lobby TV becomes a marketing channel instead of a blank screen or cable news.',
  },
  {
    category: 'Comparison',
    question: 'Why don\'t you charge per screen like other digital signage companies?',
    answer: 'We think your business shouldn\'t be penalized for growing. Per-screen pricing ($8-20/screen) adds up fast when you have multiple check-in points and displays. We charge a flat rate so you can deploy as many screens as you need without worrying about the cost.',
  },
  {
    category: 'Security',
    question: 'Is member data secure?',
    answer: 'Yes. All data is encrypted in transit (HTTPS) and at rest. We store only what\'s needed: names and contact info. No payment data, no sensitive health information. We never sell or share member data with third parties.',
  },
]

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  useEffect(() => {
    trackEvent('faq_section_viewed')
  }, [])

  const toggleItem = (index: number) => {
    const isExpanding = expandedIndex !== index
    setExpandedIndex(isExpanding ? index : null)

    if (isExpanding) {
      trackEvent('faq_item_expanded', { question: FAQ_ITEMS[index].question })
    }
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <p className="section-label">Common Questions</p>
        <h2 className="section-title">Everything you need to know</h2>

        <div className={styles.list}>
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className={`${styles.item} ${expandedIndex === index ? styles.itemExpanded : ''}`}
            >
              <button
                className={styles.question}
                onClick={() => toggleItem(index)}
                aria-expanded={expandedIndex === index}
              >
                <span className={styles.questionText}>{item.question}</span>
                <span className={styles.icon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d={expandedIndex === index ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'} />
                  </svg>
                </span>
              </button>
              <div className={styles.answerWrapper}>
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
