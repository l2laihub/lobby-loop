import posthog from 'posthog-js'

export const initPostHog = () => {
  const key = import.meta.env.VITE_POSTHOG_KEY
  const host = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com'

  if (key && typeof window !== 'undefined') {
    posthog.init(key, {
      api_host: host,
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
      persistence: 'localStorage',
    })
  }
}

// Track custom events
export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && import.meta.env.VITE_POSTHOG_KEY) {
    posthog.capture(eventName, properties)
  }
}

// Identify user (optional, for when you have user info)
export const identifyUser = (email: string, properties?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && import.meta.env.VITE_POSTHOG_KEY) {
    posthog.identify(email, properties)
  }
}

export { posthog }
