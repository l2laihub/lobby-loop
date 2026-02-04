# LobbyLoop - Project Documentation

> **Last Updated:** February 3, 2026  
> **Status:** Validation Phase  
> **Domain:** lobbyloop.io

---

## Executive Summary

LobbyLoop is a two-screen check-in + promotional display system for small businesses. Members check in on a tablet; a wall TV shows announcements, tournaments, and promos. The product runs on budget Android hardware (~$110 total) and costs $39/month.

**Core Value Proposition:** Turn your dead lobby TV into a marketing screen while replacing your sign-in clipboard with a professional check-in system.

---

## Table of Contents

1. [Product Overview](#product-overview)
2. [Target Market](#target-market)
3. [Competitive Analysis](#competitive-analysis)
4. [Pricing Strategy](#pricing-strategy)
5. [Technical Stack](#technical-stack)
6. [Hardware Requirements](#hardware-requirements)
7. [Landing Page](#landing-page)
8. [Launch Checklist](#launch-checklist)
9. [Validation Metrics](#validation-metrics)
10. [Marketing Assets](#marketing-assets)

---

## Product Overview

### What It Is

A two-screen lobby system:
1. **Check-in Tablet** — Members tap their name to check in
2. **Wall Display** — TV shows rotating slides: tournaments, announcements, promos, live check-ins

### Key Features

- **Tablet Check-in Kiosk**
  - Search by name or phone
  - One-tap check-in
  - Works on any Android tablet or iPad

- **Wall Display Slideshow**
  - Tournament promotions
  - Announcements (schedule changes, closures)
  - Member specials and promos
  - Live check-in feed
  - **Upload custom images** (flyers, schedules, sponsors, photos)
  - Custom branding

- **Admin Dashboard**
  - Real-time attendance tracking
  - Member management (CSV import)
  - Slide editor
  - Attendance analytics

### Unique Differentiators

1. **Two dedicated screens** — Not a single-device compromise
2. **Budget hardware** — ~$110 vs $500+ for iPad setups
3. **Promotional display** — Not just check-in, it's lobby engagement
4. **Flat pricing** — $39/month, no per-member fees

---

## Target Market

### Primary: Martial Arts Gyms (BJJ, MMA, Karate, etc.)

**Why they're ideal:**
- Tournament culture = need for promotional displays
- Strong community = check-ins build engagement
- Owner-operated = fast decisions
- Price-sensitive = budget hardware matters

**Pain points:**
- Sign-in sheets are unreliable
- No visibility into actual attendance
- Lobby TVs showing cable news or blank
- Mindbody is expensive and overkill

### Secondary: Fitness Studios

- Yoga studios
- CrossFit boxes
- Pilates studios
- Dance studios
- Personal training studios

### Tertiary: Service Businesses

- Hair salons
- Nail studios
- Tutoring centers
- Music schools
- Swim schools
- Dog daycares
- Coworking spaces

### Ideal Customer Profile

| Attribute | Value |
|-----------|-------|
| Business size | 30-200 active members |
| Current solution | Sign-in sheet, nothing, or bloated software |
| Tech comfort | Uses smartphone, basic computer skills |
| Budget | Can afford $39/month |
| Decision maker | Owner or manager |
| Location | Has a lobby with unused/underused TV |

---

## Competitive Analysis

### Market Landscape

| Segment | Examples | Pricing | Gap |
|---------|----------|---------|-----|
| Full gym management | Mindbody, Gymdesk, WellnessLiving | $75-200+/mo | Bloated, expensive |
| Standalone check-in | OneTap | ~$50/mo | No promotional display |
| Digital signage | Yodeck | $7-20/screen/mo | No check-in |
| Visitor management | Envoy, Lobbytrack | $100-300+/mo | Enterprise, overkill |

### Competitive Positioning

**LobbyLoop fills the gap:** Lightweight check-in + promotional display in one affordable package for small businesses.

| Competitor | Check-in | Wall Display | Budget Hardware | Price |
|------------|----------|--------------|-----------------|-------|
| Mindbody | ✅ | ❌ | ❌ (iPad required) | $139+/mo |
| Gymdesk | ✅ | ❌ | ❌ | $75+/mo |
| OneTap | ✅ | ❌ | ❌ | ~$50/mo |
| Yodeck | ❌ | ✅ | ✅ | $7-20/mo |
| **LobbyLoop** | ✅ | ✅ | ✅ | $39/mo |

### Why We Win

1. **Only solution** combining check-in + wall display on budget hardware
2. **80% cheaper** than Mindbody
3. **Dead TV hook** resonates emotionally
4. **Real implementation** at HEVA BJJ proves it works

---

## Pricing Strategy

### Tiered Launch Pricing

| Tier | Price | Limit | Purpose |
|------|-------|-------|---------|
| **Founding Lifetime** | $299 one-time | First 50 | Validation signal, early cash |
| **Early Bird Yearly** | $299/year ($25/mo) | First 100 | Commitment, locked rate |
| **Monthly** | $39/month | Unlimited | Flexible, low barrier |

### Pricing Rationale

- **$39/month** — 72% cheaper than Mindbody ($139+), proportional to hardware cost
- **$299 lifetime** — ~8 months of monthly pricing, strong buying signal
- **$299/year** — 36% savings vs monthly, encourages commitment

### Post-Launch Pricing

| Tier | Price |
|------|-------|
| Yearly | $348/year ($29/mo) |
| Monthly | $39/month |

Lifetime deal disappears after 50 sold. Early bird yearly rate ($299) goes to $348 after first 100.

---

## Technical Stack

### Current (RollFlow - Running at HEVA BJJ)

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, TailwindCSS |
| State | Zustand, React Query |
| Backend | Supabase (PostgreSQL + Auth + Edge Functions + Realtime) |
| Payments | Stripe |
| Hosting | Netlify |

### LobbyLoop Architecture (Planned)

LobbyLoop would be a simplified, standalone version of the RollFlow check-in + display features:

```
┌─────────────────────────────────────────────────────────────┐
│                        Supabase                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  PostgreSQL │  │    Auth     │  │  Realtime Subscr.   │ │
│  │  - tenants  │  │  - users    │  │  - check-in events  │ │
│  │  - members  │  │  - sessions │  │  - slide updates    │ │
│  │  - checkins │  └─────────────┘  └─────────────────────┘ │
│  │  - slides   │                                           │
│  └─────────────┘                                           │
└─────────────────────────────────────────────────────────────┘
           │                    │                    │
           ▼                    ▼                    ▼
    ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
    │   Admin     │     │   Tablet    │     │  Wall TV    │
    │  Dashboard  │     │   Kiosk     │     │  Display    │
    │  (React)    │     │  (React)    │     │  (React)    │
    └─────────────┘     └─────────────┘     └─────────────┘
```

### Key Technical Decisions

1. **Multi-tenant from day 1** — Each business is a tenant
2. **Realtime sync** — Check-ins appear on wall display instantly
3. **Offline-capable** — Kiosk works if internet drops briefly
4. **Browser-based** — No app store approval needed
5. **Responsive** — Same codebase for tablet/TV/desktop

---

## Hardware Requirements

### Recommended Setup

| Device | Recommendation | Price |
|--------|----------------|-------|
| Check-in tablet | 11" Android tablet (Amazon) | ~$78 |
| TV | Any TV or monitor (use existing spare) | $0 |
| TV streaming box | Android TV box (Amazon) | ~$32 |
| **Total** | | **~$110** |

### Specific Product Recommendations (Amazon)

**Tablet Options:**
- TECLAST P30T 10" ($78)
- Samsung Galaxy Tab A8 10.5" ($150 - premium option)
- Amazon Fire HD 10 ($150 - if user prefers Fire OS)

**Android TV Box Options:**
- Walmart ONN 4K Box ($20)
- Xiaomi Mi Box S ($35)
- Amazon Fire TV Stick 4K ($35)

### vs. Competitor Hardware Costs

| Setup | Cost |
|-------|------|
| LobbyLoop (Android) | ~$110 |
| iPad-based kiosk | $500-800 |
| Mindbody recommended | $600+ |

---

## Landing Page

### Domain

- **Primary:** lobbyloop.io
- **Status:** Purchased, ready to configure

### Files Location

- Landing page HTML: `/mnt/user-data/outputs/lobbyloop-v3-index.html`

### Key Sections

1. **Hero** — "Tablet for Check-in. Wall TV for Promotions."
2. **Plan selector** — Radio buttons for lifetime/yearly/monthly
3. **Two-screen mockup** — Animated tablet + TV slideshow demo
4. **How it works** — 4-step setup guide
5. **Features** — Check-in, slideshow, dashboard
6. **Hardware section** — $110 breakdown
7. **Social proof** — HEVA BJJ testimonial (87 members, 3 months)
8. **Use cases** — Tags for different business types
9. **Pricing cards** — Three tiers with CTAs
10. **Money-back guarantee** — 30-day refund policy

### Form Capture

Captures:
- Email address
- Selected plan (lifetime/yearly/monthly)

Currently logs to console. Needs backend integration (Netlify Forms recommended).

---

## Launch Checklist

### Phase 1: Technical Setup (Day 1)

#### Domain & DNS
- [ ] Log into domain registrar
- [ ] Point lobbyloop.io DNS to Netlify:
  - Add `A` record: `75.2.60.5`
  - Add `CNAME` for www: `[your-site].netlify.app`
- [ ] Wait for DNS propagation (up to 48 hours, usually faster)

#### Deploy Landing Page
- [ ] Create Netlify account at netlify.com
- [ ] Drag and drop `lobbyloop-v3-index.html` to Netlify Drop
- [ ] Rename site to something memorable (e.g., lobbyloop)
- [ ] Go to Domain Settings → Add custom domain → lobbyloop.io
- [ ] Enable HTTPS (automatic, may take a few minutes)
- [ ] Test:
  - [ ] Desktop view
  - [ ] Mobile view
  - [ ] Form submission
  - [ ] TV slideshow animation
  - [ ] Plan selector works

#### Email Capture Backend
- [ ] Add Netlify Forms to HTML:
```html
<form name="waitlist" method="POST" data-netlify="true" id="waitlist-form">
    <input type="hidden" name="form-name" value="waitlist">
    <!-- existing form fields -->
</form>
```
- [ ] Redeploy
- [ ] Test form submission in Netlify dashboard

#### Email Setup
- [ ] Set up hello@lobbyloop.io
  - Option A: Use Resend email service (already have pro account)
  - Option B: Use free email from registrar
  - Option C: Zoho Mail free tier
  - Option D: Forward to personal email
- [ ] Test sending/receiving

### Phase 2: Tracking (Day 1-2)

- [ ] Add analytics:
  - Option A: Use Posthog 
  - Option B: Plausible ($9/mo, privacy-focused)
  - Option C: Google Analytics (free)
  - Option D: Netlify Analytics ($9/mo)
- [ ] Set up conversion goal for form submissions
- [ ] Create tracking spreadsheet:

| Date | Email | Plan | Source | Notes |
|------|-------|------|--------|-------|
| | | | | |

- [ ] Enable Netlify form notifications (email on new submission)

### Phase 3: Validation Campaign (Days 2-14)

#### Content Preparation
- [ ] Write Reddit post for r/bjj
- [ ] Write Reddit post for r/yoga or r/yogateachers
- [ ] Write Reddit post for r/smallbusiness
- [ ] Write 2-3 tweets/X posts
- [ ] Write LinkedIn post (optional)

#### Outreach Schedule

| Day | Activity |
|-----|----------|
| 1 | Deploy site, test everything |
| 2 | Post in r/bjj |
| 3 | Post in r/yoga or studio groups |
| 4 | Share on Twitter/X |
| 5-7 | Monitor, reply to comments |
| 7 | Check signup count |
| 8-10 | Email/DM first signups for calls |
| 14 | Decision point |

### Phase 4: Discovery Calls (Days 7-14)

#### Outreach Template
```
Subject: Thanks for signing up for LobbyLoop!

Hey [Name],

Thanks for joining the LobbyLoop waitlist! I saw you're interested in the [plan] option.

I'm building this specifically for small gyms and studios, and I'd love to hear about your current setup. Would you have 15 minutes for a quick call this week?

I want to make sure I'm building exactly what you need.

– Huy
```

#### Discovery Call Questions
1. "What's your current check-in process?"
2. "What's on your lobby TV right now?"
3. "How many members do you have?"
4. "Which plan did you select? Why that one?"
5. "If checkout was ready today, would you pay?"
6. "What features would make this a must-have?"

### Phase 5: Decision Point (Day 14)

#### If Validated (Green Lights)
- 50+ waitlist signups
- 30%+ selecting lifetime
- Multiple "can I pay now?" signals
- Signups from non-BJJ businesses
- 3+ people would pay today on discovery calls

**Next steps if validated:**
- [ ] Set up Stripe account
- [ ] Build checkout flow (Stripe Checkout or custom)
- [ ] Email waitlist: "Founding 50 is live"
- [ ] Start building multi-tenant product

#### If Not Validated (Red Flags)
- <20 signups
- Nobody picks lifetime
- Only friends/BJJ community
- Discovery calls show no payment intent
- Lots of feature requests (scope creep)

**Next steps if not validated:**
- Analyze feedback
- Consider pivot (different positioning? different market?)
- Or shelve and move on (only spent ~$32 and 2 weeks)

---

## Validation Metrics

### Targets

| Metric | Minimum | Target | Stretch |
|--------|---------|--------|---------|
| Waitlist signups (14 days) | 30 | 50 | 100+ |
| Lifetime plan selection | 20% | 30% | 50%+ |
| Discovery calls completed | 3 | 5 | 10 |
| "Would pay today" responses | 2 | 3 | 5+ |
| Non-BJJ signups | 5 | 10 | 25+ |

### Signal Interpretation

| Signal | Meaning |
|--------|---------|
| High lifetime selection | Strong demand, ready to commit |
| "When can I pay?" | Product-market fit indicator |
| Hardware questions | Serious consideration, not just curious |
| Non-BJJ signups | Market breadth, not just your network |
| Feature requests | Interest, but watch for scope creep |

---

## Marketing Assets

### Taglines

- "Tablet for Check-in. Wall TV for Promotions."
- "Turn your dead lobby TV into a marketing screen."
- "$110 hardware. $39/month. Two screens."
- "Replace your clipboard and cable TV in one system."

### Key Messages

1. **Two-screen system** — Dedicated tablet for check-in + TV for promotions
2. **Budget hardware** — Works on ~$110 of Android devices vs $500+ iPads
3. **Turn dead TVs into assets** — Most lobby TVs show nothing useful
4. **Know who shows up** — Real attendance data, not sign-in sheet guesses

### Social Proof (HEVA BJJ)

- 87+ active members
- 3 months live in production
- $110 total hardware cost
- 11" Android tablet for check-in
- 40" spare monitor + $32 Android box for wall display

### Reddit Post Template (r/bjj)

```
Title: Upgraded our gym lobby for $110 - tablet check-in + wall TV for tournaments

Hey everyone,

I help run a small BJJ gym and we were tired of:
- Sign-in sheets nobody fills out
- The lobby TV showing cable news
- No idea who actually shows up to class

Built a simple two-screen setup:
- $78 Android tablet for check-in (members tap their name)
- $32 Android TV box + spare monitor showing tournaments, announcements

Been running it for 3 months with 87 members. Works great.

Thinking about packaging this for other gyms. Would anyone else want something like this?

What would you want it to do?
```

### Objection Handling

| Objection | Response |
|-----------|----------|
| "Why not just use Mindbody?" | Mindbody is $139+/month and requires iPad. We're $39/month on $110 hardware. |
| "I already have a check-in system" | Does it have a promotional display? Most gyms have a dead TV in the lobby. |
| "Can I use my iPad?" | Yes! Works on any tablet with a web browser. Android is just cheaper. |
| "What if internet goes down?" | The kiosk caches recent data and syncs when back online. |
| "Is my data secure?" | Yes, hosted on enterprise-grade infrastructure with encryption. |

---

## Costs Summary

### Validation Phase

| Item | Cost |
|------|------|
| Domain (lobbyloop.io, 1 year) | $31.99 |
| Hosting (Netlify free tier) | $0 |
| Forms (Netlify free tier) | $0 |
| Analytics (optional) | $0-9/mo |
| **Total to validate** | **~$32-41** |

### If Building (Post-Validation)

| Item | Monthly Cost |
|------|--------------|
| Supabase (Pro) | $25 |
| Netlify (Pro) | $19 |
| Email service | $0-10 |
| Stripe fees | 2.9% + $0.30/transaction |
| **Total** | ~$50-60/mo + Stripe |

---

## File Structure

```
lobbyloop/
├── landing/
│   └── index.html          # Production landing page
├── docs/
│   ├── LOBBYLOOP.md        # This document
│   └── POSITIONING.md      # Marketing playbook
├── src/                    # (Future) Application code
│   ├── kiosk/             # Tablet check-in app
│   ├── display/           # Wall TV app
│   └── admin/             # Dashboard app
└── README.md
```

---

## Next Actions (Priority Order)

1. **Deploy landing page to Netlify**
2. **Connect lobbyloop.io domain**
3. **Add Netlify Forms integration**
4. **Set up email forwarding**
5. **Write and post Reddit content**
6. **Monitor signups for 14 days**
7. **Conduct discovery calls**
8. **Make go/no-go decision**

---

## Contact

- **Builder:** Huy Duong
- **Email:** (set up hello@lobbyloop.io)
- **Brand:** huybuilds

---

*This document contains all context needed for Claude Code to assist with LobbyLoop development and launch.*
