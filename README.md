# Grimsby Home-Based Business Portal

A proof-of-concept web portal for the Town of Grimsby's Home-Based Business (HBB) Identification and Growth Framework. Built as part of a group research project for ECON 4110 at York University.

> **Disclaimer:** This website is an academic proof of concept and is **not affiliated with, endorsed by, or associated with the Town of Grimsby** in any way. All partner service integrations are simulated demonstrations. No real data is collected or transmitted.

## About the Project

The Town of Grimsby currently lacks a dedicated system to identify, track, or support home-based businesses. Existing resources are fragmented across multiple regional organizations, and there is no clear municipal pathway for HBB owners to follow.

This portal demonstrates what a centralized, user-friendly digital hub could look like — one that connects Grimsby's estimated 2,235 self-employed residents to local zoning guidance, support programs, funding opportunities, and community resources through a single entry point.

The research behind this portal includes a literature review, municipal best-practice scan, policy framework, 2-year implementation plan, KPI system, and funding strategy — all developed for the Town of Grimsby's Economic Development Office.

**Researchers:** Omar Saleh & Kavisha Jain

## What the Portal Includes

### Pages
- **Home** — Overview of the HBB Hub with how-it-works steps, resources, workshops, and Grimsby statistics
- **Self-Assessment Tool** — 8-step interactive questionnaire that checks zoning compliance against By-law 14-45
- **Business Registration** — Voluntary HBB registry form (data stored locally in the browser)
- **Dashboard** — Personalized view with matched programs, checklist, and upcoming events
- **HBB Guide** — Plain-language guide to home occupation rules, department contacts, and municipal comparison table
- **Resources & Programs** — 10 partner/program pages with simulated service integrations
- **Events & Workshops** — 3 real researched workshops with full schedules + simulated event examples
- **Made in Grimsby Directory** — Searchable business directory with tourism integration
- **Contact** — Economic Development Office info and contact form

### Simulated Partner Integrations
Each partner page includes a realistic demonstration of how the portal would integrate with their services:

| Partner | Simulated Feature |
|---------|------------------|
| Starter Company Plus | Grant eligibility checker + application preview |
| St. Catharines Enterprise Centre | Service browser + consultation booking |
| Innovate Niagara | Intake form + mentor matching |
| Venture Niagara | Loan pre-qualification calculator |
| Digital Main Street | Digital readiness quiz + improvement plan |
| Made in Grimsby | Directory listing creator + preview |
| Futurpreneur Canada | Eligibility check + funding calculator |
| Grimsby Chamber of Commerce | Event browser + RSVP + membership info |
| Brock University (VPMI) | R&D needs assessment + resource matching |
| Niagara College | Service selection + project brief builder |

### Researched Workshops
Three fully designed capacity-building workshops with schedules, learning objectives, and facilitation plans:
1. **Digitize Grimsby** — Building your digital presence (Google Business Profile, websites, bookkeeping, social media)
2. **Protect Your Business** — Legal, IP, zoning, insurance, and compliance essentials
3. **Start Here Grimsby** — Entrepreneurship launchpad and HBB Framework onboarding

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** (custom theme matching grimsby.ca)
- **React Hook Form + Zod** (form validation)
- **Recharts** (dashboard charts)
- **Lucide React** (icons)
- No backend — all data persists in browser localStorage

## Design

The portal's visual identity matches [grimsby.ca](https://www.grimsby.ca):
- Official Town of Grimsby logo and favicon (crest)
- Nunito Sans (body) + Overpass (headings) fonts
- Green color palette (`#29853D` primary, `#216A31` dark)
- Square button corners, sticky header navigation

## Project Structure

```
src/
├── app/                    # Next.js pages
│   ├── page.tsx            # Home
│   ├── self-assessment/    # Zoning compliance checker
│   ├── register/           # Voluntary HBB registry
│   ├── dashboard/          # Personalized dashboard
│   ├── guide/              # Plain-language HBB guide
│   ├── resources/          # Resources hub + 10 partner pages
│   ├── events/             # Events listing + 3 workshop detail pages
│   ├── directory/          # Made in Grimsby business directory
│   └── contact/            # Contact & about
├── components/
│   ├── layout/             # Header, Footer, Breadcrumb
│   ├── ui/                 # Hero, StepCard, ResourceCard, CTABanner, etc.
│   └── features/           # SelfAssessmentForm, RegistrationForm, ProgramMatcher, etc.
├── data/                   # All content data (resources, events, workshops, zoning, directory)
├── lib/                    # Utilities (localStorage, program matching)
└── types/                  # TypeScript interfaces
```

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## License

This project is for academic purposes only. The Town of Grimsby name, logo, and crest are used solely for demonstration within the context of this research project.
