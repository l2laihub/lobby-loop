import { useState, useEffect, useCallback } from 'react'

// Fallback values (same as current hardcoded values)
const FALLBACK_COUNTS = {
  lifetime: { used: 3, total: 50, remaining: 47 },
  yearly: { used: 0, total: 100, remaining: 100 },
}

export interface PlanCount {
  used: number
  total: number
  remaining: number
}

export interface CountsData {
  lifetime: PlanCount
  yearly: PlanCount
  cached?: boolean
  stale?: boolean
  fallback?: boolean
}

export interface UsePlanCountsResult {
  counts: CountsData
  loading: boolean
  error: string | null
  refetch: () => void
}

// Module-level cache for SPA navigation
let clientCache: CountsData | null = null
let clientCacheTimestamp = 0
const CLIENT_CACHE_TTL = 30 * 1000 // 30 seconds client-side

export function usePlanCounts(): UsePlanCountsResult {
  const [counts, setCounts] = useState<CountsData>(clientCache || FALLBACK_COUNTS)
  const [loading, setLoading] = useState(!clientCache)
  const [error, setError] = useState<string | null>(null)

  const fetchCounts = useCallback(async (force = false) => {
    // Check client cache unless forced
    const now = Date.now()
    if (!force && clientCache && now - clientCacheTimestamp < CLIENT_CACHE_TTL) {
      setCounts(clientCache)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // In development without Netlify, use fallback values
      if (import.meta.env.DEV && window.location.port === '3000') {
        console.log('Dev mode: using fallback counts')
        setCounts(FALLBACK_COUNTS)
        setLoading(false)
        return
      }

      const response = await fetch('/api/counts')

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      // Handle empty response body
      const text = await response.text()
      if (!text) {
        throw new Error('Empty response')
      }

      const data: CountsData = JSON.parse(text)

      // Update client cache
      clientCache = data
      clientCacheTimestamp = now

      setCounts(data)
    } catch (err) {
      console.error('Failed to fetch plan counts:', err)
      setError(err instanceof Error ? err.message : 'Failed to load')

      // Use cached data if available, otherwise fallback
      setCounts(clientCache || FALLBACK_COUNTS)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCounts()
  }, [fetchCounts])

  return {
    counts,
    loading,
    error,
    refetch: () => fetchCounts(true),
  }
}

// Utility function for progress bar calculation
export function calculateProgress(used: number, total: number): number {
  if (total === 0) return 100
  return Math.round((used / total) * 100)
}

// Utility to get remaining spots text
export function getRemainingText(remaining: number, total: number): string {
  return `${remaining} of ${total} remaining`
}
