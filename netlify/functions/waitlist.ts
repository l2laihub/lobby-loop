import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'

interface WaitlistRequest {
  email: string
  plan: 'lifetime' | 'yearly' | 'monthly'
}

interface MailerLiteResponse {
  data?: { id: string }
  message?: string
}

const PLAN_LABELS: Record<string, string> = {
  lifetime: 'Founding Lifetime ($249)',
  yearly: 'Early Bird Yearly ($199/yr)',
  monthly: 'Monthly ($29/mo)',
}

// Add subscriber to MailerLite
async function addToMailerLite(email: string, plan: string): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.MAILERLITE_API_KEY
  const groupId = process.env.MAILERLITE_GROUP_ID

  if (!apiKey) {
    console.warn('MailerLite API key not configured')
    return { success: true } // Don't fail if not configured
  }

  try {
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        groups: groupId ? [groupId] : [],
        fields: {
          plan,
          signup_date: new Date().toISOString(),
        },
      }),
    })

    const data: MailerLiteResponse = await response.json()

    if (!response.ok) {
      // 409 means subscriber already exists - that's okay
      if (response.status === 409) {
        return { success: true }
      }
      return { success: false, error: data.message || 'Failed to add to MailerLite' }
    }

    return { success: true }
  } catch (error) {
    console.error('MailerLite error:', error)
    return { success: false, error: 'Failed to connect to MailerLite' }
  }
}

// Send confirmation email via Resend
async function sendConfirmationEmail(email: string, plan: string): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.warn('Resend API key not configured')
    return { success: true } // Don't fail if not configured
  }

  const planLabel = PLAN_LABELS[plan] || plan

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #FF6B6B, #FFB347); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
    <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to LobbyLoop!</h1>
  </div>

  <p style="font-size: 18px;">Hey there! 👋</p>

  <p>Thanks for joining the LobbyLoop waitlist. You're now on the list for early access!</p>

  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 24px 0;">
    <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">Your selected plan:</p>
    <p style="margin: 0; font-size: 18px; font-weight: 600; color: #FF6B6B;">${planLabel}</p>
  </div>

  <p><strong>What's LobbyLoop?</strong></p>
  <p>A simple two-screen system for your business:</p>
  <ul style="padding-left: 20px;">
    <li>📱 <strong>Tablet Check-in</strong> — Members tap their name to check in</li>
    <li>📺 <strong>Wall TV Display</strong> — Shows announcements, promos, and live check-ins</li>
    <li>💰 <strong>Budget Hardware</strong> — Works on any device with a browser (as low as ~$80)</li>
  </ul>

  <p>We'll email you the moment checkout is ready. You'll be among the first to get access!</p>

  <p style="margin-top: 30px;">
    Cheers,<br>
    <strong>Huy Duong</strong><br>
    <span style="color: #666;">Founder, LobbyLoop</span>
  </p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

  <p style="font-size: 12px; color: #999; text-align: center;">
    Questions? Just reply to this email.<br>
    LobbyLoop · Seattle, WA
  </p>
</body>
</html>
`

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'LobbyLoop <hello@lobbyloop.io>',
        to: email,
        subject: "You're on the LobbyLoop waitlist! 🎉",
        html: htmlContent,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Resend error:', errorData)
      return { success: false, error: 'Failed to send confirmation email' }
    }

    return { success: true }
  } catch (error) {
    console.error('Resend error:', error)
    return { success: false, error: 'Failed to connect to Resend' }
  }
}

const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  // Parse request body
  let body: WaitlistRequest
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON body' }),
    }
  }

  // Validate required fields
  const { email, plan } = body
  if (!email || !plan) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Email and plan are required' }),
    }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid email format' }),
    }
  }

  // Validate plan
  const validPlans = ['lifetime', 'yearly', 'monthly']
  if (!validPlans.includes(plan)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid plan selected' }),
    }
  }

  // Process the waitlist signup
  const results = await Promise.allSettled([
    addToMailerLite(email, plan),
    sendConfirmationEmail(email, plan),
  ])

  const [mailerliteResult, resendResult] = results

  // Log results for debugging
  console.log('Waitlist signup:', { email, plan })
  console.log('MailerLite result:', mailerliteResult)
  console.log('Resend result:', resendResult)

  // Check for failures
  const errors: string[] = []
  if (mailerliteResult.status === 'rejected' || (mailerliteResult.status === 'fulfilled' && !mailerliteResult.value.success)) {
    const error = mailerliteResult.status === 'rejected'
      ? 'MailerLite failed'
      : mailerliteResult.value.error
    if (error) errors.push(error)
  }
  if (resendResult.status === 'rejected' || (resendResult.status === 'fulfilled' && !resendResult.value.success)) {
    const error = resendResult.status === 'rejected'
      ? 'Resend failed'
      : resendResult.value.error
    if (error) errors.push(error)
  }

  // Return success even if some services failed (we don't want to block signups)
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      success: true,
      message: "You're on the waitlist!",
      warnings: errors.length > 0 ? errors : undefined,
    }),
  }
}

export { handler }
