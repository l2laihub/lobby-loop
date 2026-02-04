import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'

// Plan limits (business constants)
const PLAN_LIMITS = {
  lifetime: 50,
  yearly: 100,
}

// Fallback values when API fails and no cache available
const FALLBACK_COUNTS = {
  lifetime: { used: 3, total: 50, remaining: 47 },
  yearly: { used: 0, total: 100, remaining: 100 },
}

// In-memory cache for serverless function warm instances
interface CacheEntry {
  data: CountsResponse
  timestamp: number
}

let cache: CacheEntry | null = null
const CACHE_TTL_MS = 60 * 1000 // 1 minute

interface PlanCount {
  used: number
  total: number
  remaining: number
}

interface CountsResponse {
  lifetime: PlanCount
  yearly: PlanCount
  cached?: boolean
  stale?: boolean
  cachedAt?: string
}

async function fetchMailerLiteCount(plan: 'lifetime' | 'yearly', apiKey: string): Promise<number> {
  // MailerLite API: filter subscribers by custom field "plan"
  const url = new URL('https://connect.mailerlite.com/api/subscribers')
  url.searchParams.set('filter[fields][plan]', plan)
  url.searchParams.set('limit', '1') // We only need the count from meta, not the data

  console.log(`Fetching MailerLite count for plan: ${plan}`)
  console.log(`URL: ${url.toString()}`)

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  })

  const responseText = await response.text()
  console.log(`MailerLite response for ${plan}: status=${response.status}, body=${responseText.substring(0, 500)}`)

  if (!response.ok) {
    console.error(`MailerLite API error for ${plan}:`, response.status, responseText)
    throw new Error(`MailerLite API returned ${response.status}: ${responseText}`)
  }

  const data = JSON.parse(responseText)

  // MailerLite response includes a "total" field in meta
  console.log(`MailerLite count for ${plan}: ${data.meta?.total || 0}`)
  return data.meta?.total || 0
}

async function getCountsFromMailerLite(apiKey: string): Promise<CountsResponse> {
  const [lifetimeCount, yearlyCount] = await Promise.all([
    fetchMailerLiteCount('lifetime', apiKey),
    fetchMailerLiteCount('yearly', apiKey),
  ])

  return {
    lifetime: {
      used: lifetimeCount,
      total: PLAN_LIMITS.lifetime,
      remaining: Math.max(0, PLAN_LIMITS.lifetime - lifetimeCount),
    },
    yearly: {
      used: yearlyCount,
      total: PLAN_LIMITS.yearly,
      remaining: Math.max(0, PLAN_LIMITS.yearly - yearlyCount),
    },
    cached: false,
  }
}

const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  // CORS headers for frontend access
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, max-age=60, s-maxage=60',
  }

  const apiKey = process.env.MAILERLITE_API_KEY

  // If no API key, return fallback values
  if (!apiKey) {
    console.warn('MAILERLITE_API_KEY not configured, returning fallback values')
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ...FALLBACK_COUNTS,
        cached: false,
        fallback: true,
      }),
    }
  }

  try {
    // Check in-memory cache first
    const now = Date.now()
    if (cache && now - cache.timestamp < CACHE_TTL_MS) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          ...cache.data,
          cached: true,
          cachedAt: new Date(cache.timestamp).toISOString(),
        }),
      }
    }

    // Fetch fresh data from MailerLite
    const counts = await getCountsFromMailerLite(apiKey)

    // Update cache
    cache = {
      data: counts,
      timestamp: now,
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(counts),
    }
  } catch (error) {
    console.error('Counts API error:', error)

    // If we have stale cache, return it with a flag
    if (cache) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          ...cache.data,
          cached: true,
          stale: true,
          cachedAt: new Date(cache.timestamp).toISOString(),
        }),
      }
    }

    // No cache available, return fallback values
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ...FALLBACK_COUNTS,
        fallback: true,
        error: 'Failed to fetch counts',
      }),
    }
  }
}

export { handler }
