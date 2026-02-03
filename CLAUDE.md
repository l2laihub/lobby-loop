# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LobbyLoop is a two-screen check-in + promotional display system landing page. Members check in on a tablet; a wall TV shows announcements. This repository contains the validation-phase landing page for capturing waitlist signups.

## Commands

```bash
# Development
npm run dev        # Start Vite dev server on port 3000

# Build
npm run build      # TypeScript check + Vite production build to dist/

# Preview production build
npm run preview    # Serve production build locally
```

## Tech Stack

- **Frontend**: React 18 + TypeScript 5.6 + Vite 5.4
- **Styling**: CSS Modules (component-scoped) + globals.css
- **Analytics**: PostHog (client-side tracking)
- **Backend**: Netlify Functions (serverless)
- **Email**: MailerLite (subscribers) + Resend (transactional)
- **Hosting**: Netlify

## Architecture

```
src/
├── components/          # Each component has .tsx + .module.css pair
│   ├── Hero.tsx        # Landing section with email signup form
│   ├── DeviceMockups.tsx # Animated tablet + TV mockups
│   ├── HowItWorks.tsx  # 4-step setup guide
│   ├── Features.tsx    # Feature highlights
│   ├── Hardware.tsx    # $110 hardware breakdown
│   ├── SocialProof.tsx # HEVA BJJ testimonial
│   ├── UseCases.tsx    # Business type filter tags
│   ├── Pricing.tsx     # 3-tier pricing cards
│   └── Footer.tsx
├── lib/
│   └── posthog.ts      # Analytics: initPostHog, trackEvent, identifyUser
├── styles/
│   └── globals.css     # Global utilities, animations, color palette
├── App.tsx             # Main component rendering all sections
└── main.tsx            # React DOM entry point

netlify/functions/
└── waitlist.ts         # POST /api/waitlist - validates email/plan,
                        # adds to MailerLite, sends Resend confirmation
```

## Path Alias

Import from `src/` using `@/`:
```typescript
import { trackEvent } from '@/lib/posthog'
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Client/Server | Purpose |
|----------|---------------|---------|
| `VITE_POSTHOG_KEY` | Client | PostHog project key |
| `VITE_POSTHOG_HOST` | Client | PostHog endpoint |
| `MAILERLITE_API_KEY` | Server | Email subscriber API |
| `MAILERLITE_GROUP_ID` | Server | MailerLite group |
| `RESEND_API_KEY` | Server | Transactional email |

## Netlify Functions

API routes are proxied: `/api/*` → `/.netlify/functions/*`

The `waitlist.ts` function:
1. Validates email format and plan (lifetime | yearly | monthly)
2. Adds subscriber to MailerLite
3. Sends HTML confirmation via Resend
4. Returns JSON with success status

## Key Patterns

- **CSS Modules**: `ComponentName.module.css` with scoped class names
- **Analytics**: Track events via `trackEvent('event_name', { metadata })`
- **Animations**: Use `animate-in` class with `animate-delay-{1-5}` from globals.css
- **Plan types**: `'lifetime' | 'yearly' | 'monthly'` throughout the codebase
