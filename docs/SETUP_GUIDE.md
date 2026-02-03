# LobbyLoop Environment Setup Guide

This guide walks you through setting up all required services and obtaining API keys for the LobbyLoop landing page.

---

## Overview

You'll need accounts and API keys from three services:

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| **PostHog** | User analytics & behavior tracking | 1M events/month |
| **MailerLite** | Email list management & marketing | 1,000 subscribers |
| **Resend** | Transactional confirmation emails | 3,000 emails/month |

---

## 1. PostHog Setup (Analytics)

PostHog tracks user behavior on your landing page - page views, button clicks, form submissions, etc.

### Create Account

1. Go to [posthog.com](https://posthog.com)
2. Click **Get started free**
3. Sign up with Google or email
4. Choose **PostHog Cloud** (not self-hosted)
5. Select **US** or **EU** region based on your preference

### Get Your Project API Key

1. After signup, you'll land in your project dashboard
2. Click the **gear icon** (Settings) in the left sidebar
3. Select **Project settings**
4. Scroll to **Project API Key** section
5. Copy the key that looks like: `phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Your Environment Variables

```env
VITE_POSTHOG_KEY=phc_your_project_key_here
VITE_POSTHOG_HOST=https://us.i.posthog.com
```

> **Note**: Use `https://eu.i.posthog.com` if you selected the EU region.

---

## 2. MailerLite Setup (Email List)

MailerLite stores your waitlist subscribers and lets you send marketing emails later.

### Create Account

1. Go to [mailerlite.com](https://www.mailerlite.com)
2. Click **Sign up free**
3. Complete the registration form
4. Verify your email address
5. Complete the account setup wizard

### Verify Your Domain (Optional but Recommended)

For better deliverability when you send marketing emails:

1. Go to **Settings** > **Domains**
2. Click **Add domain**
3. Enter `lobbyloop.io` (or your domain)
4. Add the DNS records shown to your domain provider
5. Click **Verify**

### Create a Subscriber Group

1. In the left sidebar, click **Subscribers**
2. Click **Groups** tab
3. Click **Create group**
4. Name it `LobbyLoop Waitlist`
5. Click **Create**
6. After creation, click into the group
7. Look at the URL - it will contain the group ID:
   ```
   https://dashboard.mailerlite.com/subscribers/groups/123456789/subscribers
                                                    ^^^^^^^^^
                                                    This is your GROUP_ID
   ```

### Get Your API Key

1. Click your **profile icon** (bottom left)
2. Select **Integrations**
3. Click **API** in the left menu
4. Click **Generate new token**
5. Name it `LobbyLoop Landing Page`
6. Click **Create token**
7. **Copy the token immediately** (you won't see it again!)

### Your Environment Variables

```env
MAILERLITE_API_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJS...your_long_token_here
MAILERLITE_GROUP_ID=123456789
```

---

## 3. Resend Setup (Transactional Email)

Resend sends the instant confirmation email when someone joins your waitlist.

### Create Account

1. Go to [resend.com](https://resend.com)
2. Click **Get Started**
3. Sign up with GitHub or email
4. Verify your email address

### Add and Verify Your Domain

**Important**: You must verify a domain to send emails from your own address (e.g., `hello@lobbyloop.io`).

1. Click **Domains** in the left sidebar
2. Click **Add Domain**
3. Enter `lobbyloop.io` (or your domain)
4. Add the DNS records shown to your domain provider:
   - **SPF record** (TXT)
   - **DKIM record** (TXT)
   - **Optional**: DMARC record
5. Click **Verify DNS Records**
6. Wait for verification (usually 5-30 minutes)

> **Testing without a domain**: Resend provides a test domain `onboarding@resend.dev` you can use during development, but emails will only go to your verified email address.

### Get Your API Key

1. Click **API Keys** in the left sidebar
2. Click **Create API Key**
3. Name it `LobbyLoop Production`
4. Select **Full access** permission
5. Click **Create**
6. **Copy the key immediately** (starts with `re_`)

### Your Environment Variables

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 4. Create Your .env File

Now that you have all the keys, create your local environment file:

1. In your project root, copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in your values:
   ```env
   # PostHog Analytics
   VITE_POSTHOG_KEY=phc_your_actual_key_here
   VITE_POSTHOG_HOST=https://us.i.posthog.com

   # MailerLite Email List
   MAILERLITE_API_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJS...
   MAILERLITE_GROUP_ID=123456789

   # Resend Transactional Email
   RESEND_API_KEY=re_your_actual_key_here
   ```

3. Save the file

---

## 5. Test Your Setup

### Test PostHog

1. Start the dev server: `npm run dev`
2. Open http://localhost:3000
3. Go to your PostHog dashboard > **Activity** or **Events**
4. You should see a `$pageview` event within a few seconds

### Test the Full Waitlist Flow

1. Fill in the waitlist form with your email
2. Select a plan and submit
3. Check:
   - **MailerLite**: New subscriber should appear in your group
   - **Resend**: Check your inbox for the confirmation email
   - **PostHog**: Check for `waitlist_submitted` event

---

## 6. Netlify Deployment

When deploying to Netlify, add these same environment variables:

1. Go to your Netlify site dashboard
2. Click **Site configuration** > **Environment variables**
3. Add each variable:

| Key | Value |
|-----|-------|
| `VITE_POSTHOG_KEY` | Your PostHog key |
| `VITE_POSTHOG_HOST` | `https://us.i.posthog.com` |
| `MAILERLITE_API_KEY` | Your MailerLite token |
| `MAILERLITE_GROUP_ID` | Your group ID |
| `RESEND_API_KEY` | Your Resend key |

4. Trigger a new deploy for changes to take effect

---

## Troubleshooting

### PostHog events not showing

- Check browser console for errors
- Ensure `VITE_POSTHOG_KEY` starts with `phc_`
- Events may take 30-60 seconds to appear in dashboard

### MailerLite "Unauthorized" error

- API tokens expire if not used for 60 days - generate a new one
- Ensure you copied the full token (they're very long)

### Resend "Domain not verified" error

- DNS propagation can take up to 48 hours
- Use `onboarding@resend.dev` for testing in development
- Check that all DNS records are added correctly

### Form submission fails locally

- Netlify Functions only work in production
- For local testing, you can:
  1. Use `netlify dev` instead of `npm run dev` (requires Netlify CLI)
  2. Or temporarily mock the API response

---

## Security Notes

- **Never commit `.env` to git** - it's already in `.gitignore`
- Keep API keys secure and rotate them if compromised
- Use environment variables in Netlify rather than hardcoding
- The `VITE_` prefix exposes variables to the browser - only PostHog keys should use this prefix

---

## Quick Reference

| Variable | Where to Find |
|----------|---------------|
| `VITE_POSTHOG_KEY` | PostHog > Settings > Project settings > Project API Key |
| `VITE_POSTHOG_HOST` | `https://us.i.posthog.com` or `https://eu.i.posthog.com` |
| `MAILERLITE_API_KEY` | MailerLite > Integrations > API > Generate token |
| `MAILERLITE_GROUP_ID` | MailerLite > Subscribers > Groups > (in URL after clicking group) |
| `RESEND_API_KEY` | Resend > API Keys > Create API Key |
