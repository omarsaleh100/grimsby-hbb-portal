# Grimsby Home-Based Business Portal — Implementation Plan

## Overview

A full TypeScript website (Next.js + Tailwind CSS) that serves as the Town of Grimsby's one-stop digital hub for home-based businesses. The design matches the mockup's color scheme (navy `#1a3a5c`, green `#2e7d32`) and layout language. All partner integrations are simulated with realistic UI showing how they'd work if partners agreed to collaborate.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS (custom theme matching mockup colors)
- **State:** React Context for user session (registered business data persists in localStorage)
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **Charts:** Recharts (for dashboard KPIs)
- **No backend** — all data stored client-side (localStorage). Partner "APIs" are simulated with mock data and realistic loading states.

---

## Pages & Features

### 1. Home Page (`/`)
- Top bar (grimsby.ca branding, accessibility, contact, sitemap links)
- Main nav: Home, Living Here, Build & Invest, Tourism, Town Hall
- Hero section with CTA buttons (Register, Self-Assessment)
- "How It Works" 4-step cards (Register → Understand Rules → Get Matched → Grow & Connect)
- Resources & Programs grid (6 cards matching mockup)
- CTA banner ("Ready to get started?")
- Footer with links

### 2. Self-Assessment Tool (`/self-assessment`)
- Multi-step interactive questionnaire:
  - **Step 1:** Business type (professional services, creative/artisan, food/beverage, retail/e-commerce, trades, other)
  - **Step 2:** Where you operate (dedicated room, garage/basement, shared space, fully digital)
  - **Step 3:** Floor area used (< 25% of home, 25-50%, > 50%)
  - **Step 4:** Employees (just me, 1 non-resident, 2+)
  - **Step 5:** Client visits (none, occasional, frequent)
  - **Step 6:** Signage needs, parking impact, noise/odor considerations
- **Results page:** Traffic-light eligibility verdict (Green/Yellow/Red)
  - Green: Likely compliant — proceed to register
  - Yellow: May need permits — contact Planning/Building dept (shows which)
  - Red: Likely not permitted as home occupation — suggests alternatives
- Each result shows relevant Zoning By-law 14-45 provisions in plain language
- "Next Steps" section with direct links to relevant pages

### 3. Business Registration (`/register`)
- Multi-step form (voluntary HBB registry):
  - **Step 1:** Personal info (name, email, phone, address)
  - **Step 2:** Business details (name, type/sector dropdown, description)
  - **Step 3:** Stage of operation (Emerging / Stabilizing / Growth-focused)
  - **Step 4:** Full-time or Part-time, years in operation
  - **Step 5:** Goals & needs checklist (funding, mentorship, workspace, marketing, networking, zoning help)
  - **Step 6:** Tourism interest (farmers market, Made in Grimsby directory, events)
- Confirmation page with registry ID
- Data saved to localStorage, redirects to Dashboard

### 4. HBB Guide (`/guide`)
Plain-language guide to running a home-based business in Grimsby:
- **What's Allowed:** Home occupation rules explained simply (floor area, employees, signage, prohibited uses)
- **Zoning Basics:** Interactive section — enter your zone to see what applies
- **Which Department to Contact:** Decision tree (Planning, Building, Public Health)
- **Permits & Compliance:** What you need vs. what's optional
- **FAQ section** addressing common concerns
- Comparison table (Grimsby vs other Ontario municipalities)

### 5. Resources & Programs (`/resources`)
Hub page with cards for each program. Each links to a dedicated sub-page:

- `/resources/starter-company-plus` — $5,000 grant details, eligibility, simulated application flow
- `/resources/enterprise-centre` — Free consultations, workshop calendar (simulated)
- `/resources/innovate-niagara` — Mentorship, market intelligence, simulated intake
- `/resources/venture-niagara` — Loans up to $250K, simulated pre-qualification
- `/resources/digital-main-street` — $2,500 grant, simulated digital assessment
- `/resources/made-in-grimsby` — Directory listing, tourism integration
- `/resources/futurpreneur` — Youth entrepreneur loans + mentorship
- `/resources/chamber-of-commerce` — Networking events, membership
- `/resources/brock-university` — VPMI access, MBA consulting, co-op students
- `/resources/niagara-college` — Applied research, BCIC support

Each partner page includes:
- Program overview with real details from research
- **"How it would work" section** — simulated UI showing the integrated experience (e.g., booking a consultation, checking grant eligibility, submitting a pre-application)
- Banner: "This integration is a demonstration of how the Town of Grimsby portal would connect with [Partner] if they participate in the HBB framework."

### 6. Dashboard (`/dashboard`)
Appears after registration. Shows:
- **Your Business Profile** summary (editable)
- **Matched Programs** — based on registration answers, shows recommended resources with match % and reasoning
- **Your Checklist** — personalized to-do list (e.g., "Contact Planning Dept", "Apply to Starter Company Plus")
- **Local Events** — upcoming workshops, networking events (mock data)
- **KPI Widget** — community stats (businesses registered, programs accessed — simulated counters)

### 7. Events & Workshops (`/events`)
- Calendar view of upcoming events (mock data):
  - "Starting a Business: Beginner's Guide" workshop
  - "Marketing Basics for HBBs" seminar
  - "Understanding Local Requirements" info session
  - Chamber of Commerce networking breakfast
  - Business Ambassador meet & greet
  - Farmers Market vendor info session
- Event detail pages with registration (simulated)

### 8. Made in Grimsby Directory (`/directory`)
- Searchable/filterable business directory
- Categories: Food & Beverage, Creative & Artisan, Professional Services, Trades, Tech & Digital
- Each listing: business name, description, photo placeholder, category tags, "Visit Website" link
- Map placeholder showing Grimsby
- "Get Listed" CTA linking to registration
- Tourism integration: "Discover local businesses when you visit Grimsby"

### 9. Contact & About (`/contact`)
- Economic Development Office contact info
- GEDAC info
- Business Ambassador Program
- Contact form (simulated submission)
- Office hours, address, map embed placeholder

---

## Simulated Partner Integrations (Key Feature)

For each partner, we build a realistic "what it would look like" experience:

| Partner | Simulated Feature |
|---------|------------------|
| **Starter Company Plus** | Grant eligibility checker → simulated application form → confirmation with next steps |
| **Enterprise Centre** | Browse consultants → book appointment (calendar picker) → confirmation email preview |
| **Innovate Niagara** | Intake questionnaire → mentor matching → simulated meeting scheduler |
| **Venture Niagara** | Loan pre-qualification calculator → simulated document upload → status tracker |
| **Digital Main Street** | Digital readiness assessment quiz → improvement plan → grant application flow |
| **Chamber of Commerce** | Browse events → RSVP → member directory search |
| **Brock VPMI** | R&D needs form → matched lab resources → simulated project proposal |
| **Niagara College** | Student placement request → project brief builder → simulated matching |

Each shows a clear banner: *"This is a demonstration of the proposed integrated experience."*

---

## Shared Components

- `TopBar` — Town branding bar
- `Header` — Logo + main navigation
- `Breadcrumb` — Dynamic breadcrumb trail
- `Hero` — Reusable hero with gradient background
- `StepCard` — Numbered step cards
- `ResourceCard` — Program/resource cards
- `CTABanner` — Call-to-action banner
- `Footer` — Site footer
- `FormStepper` — Multi-step form wrapper
- `TrafficLight` — Green/Yellow/Red eligibility indicator
- `SimulationBanner` — "This is a demo" notice for partner pages
- `DashboardCard` — Dashboard widget card

---

## Work Streams (Parallel Agent Deployment)

### Agent 1: Project Scaffolding & Layout
- Initialize Next.js project with TypeScript + Tailwind
- Configure theme colors and fonts (Inter)
- Build all shared components (TopBar, Header, Footer, etc.)
- Set up routing structure

### Agent 2: Home Page & Static Pages
- Home page (matching mockup exactly)
- HBB Guide page (plain-language zoning guide)
- Contact & About page
- Events & Workshops page

### Agent 3: Self-Assessment Tool
- Multi-step questionnaire UI
- Scoring logic and eligibility engine
- Results page with traffic-light system
- Next-steps recommendations

### Agent 4: Registration & Dashboard
- Multi-step registration form with validation
- localStorage persistence layer
- Dashboard with matched programs, checklist, profile
- Business directory page

### Agent 5: Resources & Partner Simulations
- Resources hub page
- All 10 partner sub-pages with real content
- Simulated integration UIs (forms, calendars, calculators)
- Simulation banners

---

## Design Tokens (from mockup)

```
Navy:     #1a3a5c (primary dark)
Blue:     #2e5f8a (secondary)
Green:    #2e7d32 (accent/CTA)
Lt Green: #4caf50 (success)
BG:       #f5f7fa (page background)
Card BG:  #f8faf8 (step cards)
Border:   #e0e8e0 (card borders)
Text:     #1a1a2e (body)
Muted:    #666666 (secondary text)
Font:     Inter (400, 500, 600, 700)
```

---

## File Structure

```
portal/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (TopBar, Header, Footer)
│   │   ├── page.tsx                # Home page
│   │   ├── self-assessment/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── guide/
│   │   │   └── page.tsx
│   │   ├── resources/
│   │   │   ├── page.tsx            # Resources hub
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Dynamic partner pages
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── events/
│   │   │   └── page.tsx
│   │   ├── directory/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopBar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Breadcrumb.tsx
│   │   ├── ui/
│   │   │   ├── Hero.tsx
│   │   │   ├── StepCard.tsx
│   │   │   ├── ResourceCard.tsx
│   │   │   ├── CTABanner.tsx
│   │   │   ├── FormStepper.tsx
│   │   │   ├── TrafficLight.tsx
│   │   │   ├── SimulationBanner.tsx
│   │   │   └── DashboardCard.tsx
│   │   └── features/
│   │       ├── SelfAssessmentForm.tsx
│   │       ├── RegistrationForm.tsx
│   │       ├── ProgramMatcher.tsx
│   │       └── DirectoryGrid.tsx
│   ├── data/
│   │   ├── resources.ts            # All partner/program data
│   │   ├── events.ts               # Mock event data
│   │   ├── directory.ts            # Mock business listings
│   │   ├── assessment.ts           # Self-assessment questions & scoring
│   │   └── zoning.ts               # Zoning rules & guide content
│   ├── lib/
│   │   ├── storage.ts              # localStorage helpers
│   │   └── matching.ts             # Program matching logic
│   └── types/
│       └── index.ts                # TypeScript interfaces
└── PLAN.md
```

---

## What's Real vs. Simulated

| Feature | Status |
|---------|--------|
| All page content & program details | **Real** (from research) |
| Self-assessment logic & zoning rules | **Real** (based on By-law 14-45 provisions) |
| Registration form | **Real** (functional, saves locally) |
| Program matching algorithm | **Real** (matches based on business stage/needs) |
| Partner service integrations | **Simulated** (realistic UI, clearly labeled) |
| Event data | **Mock** (realistic examples from research) |
| Directory listings | **Mock** (sample businesses) |
| Dashboard KPIs | **Simulated** (counters with mock data) |

---

## Confirm to proceed?

Once approved, I'll deploy 5 parallel agents to build all work streams simultaneously.
