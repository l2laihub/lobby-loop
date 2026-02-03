import { useState, useEffect } from 'react'
import styles from './DeviceMockups.module.css'

const SLIDES = [
  {
    id: 'tournament',
    label: '🏆 Upcoming Tournament',
    title: 'Seattle Open\nChampionship',
    details: 'March 15, 2026 · Early bird ends Feb 20',
    bgClass: 'tournament',
  },
  {
    id: 'announcement',
    label: '📢 Announcement',
    title: 'No Classes\nThis Saturday',
    details: 'Private event · Regular schedule resumes Monday',
    bgClass: 'announcement',
  },
  {
    id: 'promo',
    label: '🎁 Member Special',
    title: 'Refer a Friend\nGet 1 Month Free',
    details: 'Ask at the front desk for details',
    bgClass: 'promo',
  },
  {
    id: 'checkins',
    label: '👋 Recently Checked In',
    title: 'Live Feed',
    details: '',
    bgClass: 'checkins',
  },
  {
    id: 'custom',
    label: '📷 Custom Image',
    title: 'Your Custom Image',
    details: 'Upload any image — flyers, schedules, sponsors, photos',
    bgClass: 'custom',
  },
]

const CHECKINS = [
  { initials: 'MK', name: 'Marcus K.', time: 'just now', color: '#f97316' },
  { initials: 'JT', name: 'Jessica T.', time: '2 min ago', color: '#6366f1' },
  { initials: 'SL', name: 'Sarah L.', time: '5 min ago', color: '#00d4aa' },
]

export default function DeviceMockups() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const handleDotClick = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.layout}>
          {/* Tablet Mockup */}
          <div className={styles.tabletWrapper}>
            <div className={styles.tablet}>
              <div className={styles.tabletCamera} />
              <div className={styles.tabletScreen}>
                <div className={styles.tabletContent}>
                  <div className={styles.tabletHeader}>
                    <div className={styles.tabletLogo}>⬡</div>
                    <div className={styles.tabletTime}>
                      <span className={styles.timeDisplay}>7:17 AM</span>
                      <span className={styles.timeDate}>Tuesday, February 3</span>
                    </div>
                  </div>

                  <div className={styles.tabletMain}>
                    <h3 className={styles.tabletTitle}>Check In</h3>
                    <p className={styles.tabletSubtitle}>Welcome to Your Studio</p>

                    <button className={styles.tabletBtn}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="7" r="4" />
                        <path d="M5.5 21a7.5 7.5 0 0 1 13 0" />
                      </svg>
                      <span>Find My Name</span>
                      <small>Tap to check in</small>
                    </button>
                  </div>

                  <p className={styles.tabletHint}>Tap your name to check in</p>
                </div>
              </div>
            </div>
            <div className={styles.deviceLabel}>
              <p className={styles.labelTitle}>Check-in Tablet</p>
              <p className={styles.labelPrice}>11" Android tablet · ~$78</p>
            </div>
          </div>

          {/* TV Mockup */}
          <div className={styles.tvWrapper}>
            <div className={styles.connectionLine}>
              <div className={styles.connectionDot} />
              <div className={styles.connectionBar} />
            </div>

            <div className={styles.tv}>
              <div className={styles.tvScreen}>
                {SLIDES.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`${styles.slide} ${styles[slide.bgClass]} ${index === currentSlide ? styles.slideActive : ''}`}
                  >
                    <div className={styles.slideHeader}>
                      <span className={styles.tvBrand}>Your Logo</span>
                      <span className={styles.tvLive}>
                        <span className={styles.liveDot} />
                        {slide.id === 'checkins' ? 'Live' : '47 checked in'}
                      </span>
                    </div>

                    <div className={styles.slideMain}>
                      <p className={styles.slideLabel}>{slide.label}</p>

                      {slide.id === 'checkins' ? (
                        <div className={styles.checkinList}>
                          {CHECKINS.map((person) => (
                            <div key={person.initials} className={styles.checkinItem}>
                              <div
                                className={styles.checkinAvatar}
                                style={{ background: person.color }}
                              >
                                {person.initials}
                              </div>
                              <div className={styles.checkinInfo}>
                                <span className={styles.checkinName}>{person.name}</span>
                                <span className={styles.checkinTime}>{person.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : slide.id === 'custom' ? (
                        <div className={styles.customPlaceholder}>
                          <div className={styles.customIcon}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <path d="M21 15l-5-5L5 21" />
                            </svg>
                          </div>
                          <p className={styles.customTitle}>{slide.title}</p>
                          <p className={styles.customDesc}>{slide.details}</p>
                        </div>
                      ) : (
                        <>
                          <h2 className={styles.slideTitle}>
                            {slide.title.split('\n').map((line, i) => (
                              <span key={i}>
                                {line}
                                {i < slide.title.split('\n').length - 1 && <br />}
                              </span>
                            ))}
                          </h2>
                          <p className={styles.slideDetails}>{slide.details}</p>
                        </>
                      )}
                    </div>

                    <div className={styles.slideFooter}>
                      {slide.id === 'promo' && (
                        <span className={styles.promoBadge}>Limited Time</span>
                      )}
                      {slide.id === 'checkins' && (
                        <div className={styles.checkinCount}>
                          <span className={styles.countNumber}>47</span>
                          <span className={styles.countLabel}>checked in today</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Slide Dots */}
              <div className={styles.dots}>
                {SLIDES.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
                    onClick={() => handleDotClick(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className={styles.tvStand} />
            <div className={styles.deviceLabel}>
              <p className={styles.labelTitle}>Wall Display</p>
              <p className={styles.labelPrice}>Any TV + Android box · ~$32 (or use spare TV)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
