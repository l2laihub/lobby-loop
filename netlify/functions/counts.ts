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
const CACHE_TTL_MS = 0 // Disabled for debugging

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

interface Subscriber {
  email: string
  fields?: {
    plan?: string
  }
}

async function fetchAllSubscribersAndCount(apiKey: string): Promise<{ lifetime: number; yearly: number }> {
  // Fetch all subscribers and count by plan field
  const url = new URL('https://connect.mailerlite.com/api/subscribers')
  url.searchParams.set('limit', '100') // Get up to 100 subscribers

  console.log(`Fetching all MailerLite subscribers`)
  console.log(`URL: ${url.toString()}`)

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  })

  const responseText = await response.text()
  console.log(`MailerLite response: status=${response.status}`)

  if (!response.ok) {
    console.error(`MailerLite API error:`, response.status, responseText)
    throw new Error(`MailerLite API returned ${response.status}: ${responseText}`)
  }

  const data = JSON.parse(responseText)
  const subscribers: Subscriber[] = data.data || []

  console.log(`Total subscribers fetched: ${subscribers.length}`)

  // Count by plan
  let lifetimeCount = 0
  let yearlyCount = 0

  for (const sub of subscribers) {
    // Log the full subscriber object to see the actual structure
    console.log(`Subscriber data:`, JSON.stringify(sub, null, 2))
    const plan = sub.fields?.plan?.toLowerCase()
    console.log(`Subscriber ${sub.email}: plan=${plan}`)
    if (plan === 'lifetime') lifetimeCount++
    else if (plan === 'yearly') yearlyCount++
  }

  console.log(`Counts: lifetime=${lifetimeCount}, yearly=${yearlyCount}`)
  return { lifetime: lifetimeCount, yearly: yearlyCount }
}

async function getCountsFromMailerLite(apiKey: string): Promise<CountsResponse> {
  const counts = await fetchAllSubscribersAndCount(apiKey)

  return {
    lifetime: {
      used: counts.lifetime,
      total: PLAN_LIMITS.lifetime,
      remaining: Math.max(0, PLAN_LIMITS.lifetime - counts.lifetime),
    },
    yearly: {
      used: counts.yearly,
      total: PLAN_LIMITS.yearly,
      remaining: Math.max(0, PLAN_LIMITS.yearly - counts.yearly),
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
