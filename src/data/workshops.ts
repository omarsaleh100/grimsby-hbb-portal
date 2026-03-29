import { Workshop } from '@/types';

export const workshops: Workshop[] = [
  {
    slug: 'digitize-grimsby',
    title: 'Digitize Grimsby: Building Your Business Online',
    subtitle: 'Build your digital presence in one half-day session',
    purpose:
      'OECD identifies digitalization as the most significant growth enabler for HBBs. 2,235 self-employed residents and 28.3% work-from-home rate in Grimsby.',
    targetAudience: 'Stabilizing and growth-focused HBBs',
    outreachStrategy:
      'Physical/community-based: door-to-door flyers, library/community centre posters, Farmers\u2019 Market outreach, Grimsby Lincoln News ads. Digital secondary.',
    format: 'Half-day (3.5 hours), Saturday morning, municipal venue',
    fee: '$10 registration fee (reduces no-show rates)',
    budget: '$5,000 CAD',
    participants: '20-30',
    learningObjectives: [
      'Create or optimize a Google Business Profile',
      'Identify suitable website platform and begin building a landing page',
      'Set up a free digital bookkeeping account (Wave)',
      'Develop a basic social media content plan',
      'Understand e-commerce, online booking, and digital payment acceptance fundamentals',
    ],
    modules: [
      {
        time: '9:00\u20139:15',
        title: 'Welcome, introductions, Wi-Fi setup',
        format: 'Plenary',
      },
      {
        time: '9:15\u201310:00',
        title: 'Module 1: Your Digital Storefront',
        format: 'Guided hands-on',
        description:
          'Google Business Profile setup and optimization',
      },
      {
        time: '10:00\u201310:45',
        title: 'Module 2: Building a Website',
        format: 'Demo + guided activity',
        description:
          'Wix, Squarespace, Shopify comparison; domain registration; SEO fundamentals; begin building a landing page',
      },
      {
        time: '10:45\u201311:00',
        title: 'Break (refreshments)',
        format: '\u2014',
      },
      {
        time: '11:00\u201311:30',
        title: 'Module 3: Digital Bookkeeping and Payments',
        format: 'Guided hands-on',
        description:
          'Wave setup; Square, Stripe, Interac e-Transfer overview',
      },
      {
        time: '11:30\u201312:00',
        title: 'Module 4: Social Media and Online Visibility',
        format: 'Interactive + small-group exercise',
        description:
          'Platform selection, content calendars, paid advertising intro, managing online reviews',
      },
      {
        time: '12:00\u201312:20',
        title: 'Module 5: Cybersecurity Essentials',
        format: 'Presentation + checklist',
        description:
          'Password management, phishing awareness, data backup',
      },
      {
        time: '12:20\u201312:30',
        title: 'Wrap-up, resource kit distribution, feedback forms',
        format: 'Plenary',
      },
    ],
    facilitation:
      'Digital Main Street squad member or Niagara College NC Innovation. Supported by Business Ambassador volunteers. Local HBB owner testimonial.',
    budgetBreakdown: [
      {
        item: 'Venue rental',
        description: 'Municipal community centre or library (half-day)',
        cost: '$0\u2013$150',
      },
      {
        item: 'Lead facilitator',
        description:
          'DMS squad (provincially funded) or NC partnership; fallback: consultant',
        cost: '$0\u2013$1,500',
      },
      {
        item: 'Guest speaker honorarium',
        description: 'Local HBB owner',
        cost: '$100',
      },
      {
        item: 'Materials and printing',
        description: 'Workbooks, checklists, USB drives, name tags',
        cost: '$400',
      },
      {
        item: 'Technology support',
        description: 'Wi-Fi hotspot, extension cords for 30 connections',
        cost: '$200',
      },
      {
        item: 'Catering',
        description: 'Coffee, tea, water, light snacks for 30',
        cost: '$250',
      },
      {
        item: 'Marketing and promotion',
        description:
          'Geo-targeted social ads, flyers, Eventbrite, Town website',
        cost: '$350',
      },
      {
        item: 'Post-workshop follow-up',
        description: '30-min digital check-ins for up to 15 participants',
        cost: '$0\u2013$200',
      },
      {
        item: 'Resource kits',
        description: 'Quick-reference cards, free tools list, DMS info',
        cost: '$150',
      },
      {
        item: 'Contingency (~10%)',
        description: 'Unforeseen costs, accessibility',
        cost: '$500',
      },
    ],
    totalCost: '$2,150\u2013$3,800',
    budgetReserve: '$1,200\u2013$2,850',
  },
  {
    slug: 'protect-your-business',
    title: 'Protect Your Business: Legal, IP, and Compliance Essentials',
    subtitle:
      'Navigate legal, insurance, and compliance requirements with confidence',
    purpose:
      'Many HBBs begin without registering, understanding zoning, securing insurance, or considering IP protection. Grimsby doesn\u2019t publicly summarize By-law 14-45 rules.',
    targetAudience: 'All HBB stages (emerging, stabilizing, growth-focused)',
    outreachStrategy:
      'Blend of digital (Facebook/Instagram geo-targeted, Town/Chamber social media, e-newsletter) and traditional (HBB registry emails, referrals from Enterprise Centre/Venture Niagara, printed materials at Town Hall/Planning Dept)',
    format: 'Half-day (3.5 hours), weekday evening 5:30\u20139:00 PM, municipal venue',
    fee: '$10',
    budget: '$5,000 CAD',
    participants: '20-30',
    learningObjectives: [
      'Understand Ontario business name registration requirements and sole proprietorship vs partnership vs incorporation',
      'Conduct a preliminary trademark search on CIPO database',
      'Understand Grimsby home occupation rules under By-law 14-45',
      'Identify home-based business insurance needs and coverage types',
      'Understand PIPEDA obligations for customer data and HST registration threshold',
      'Receive a template service agreement or terms of sale',
    ],
    modules: [
      {
        time: '5:30\u20135:45',
        title: 'Welcome, introductions, overview',
        format: 'Plenary',
      },
      {
        time: '5:45\u20136:30',
        title: 'Module 1: Business Structure and Registration',
        format: 'Presentation + Q&A',
        description:
          'Sole proprietorship vs incorporation; Ontario Business Registry ($60 name, ~$360 incorporation)',
      },
      {
        time: '6:30\u20137:15',
        title: 'Module 2: Protecting Your Brand',
        format: 'Guided hands-on',
        description:
          'Trademark fundamentals; CIPO database walkthrough ($347 filing, $200 registration); when to consult a trademark agent',
      },
      {
        time: '7:15\u20137:30',
        title: 'Break (refreshments)',
        format: '\u2014',
      },
      {
        time: '7:30\u20138:00',
        title: 'Module 3: Zoning, Insurance, and Compliance',
        format: 'Presentation + self-assessment checklist',
        description:
          'By-law 14-45 walkthrough; insurance riders ($25\u2013$75/mo), commercial liability ($400\u2013$800/yr); HST threshold ($30,000)',
      },
      {
        time: '8:00\u20138:30',
        title: 'Module 4: Contracts, Privacy, and Consumer Protection',
        format: 'Presentation + small-group review',
        description:
          'Template agreement walkthrough; PIPEDA obligations; Ontario Consumer Protection Act basics',
      },
      {
        time: '8:30\u20138:50',
        title: 'Panel Q&A',
        format: 'Moderated panel',
        description: 'Open questions to all facilitators',
      },
      {
        time: '8:50\u20139:00',
        title: 'Wrap-up, legal resource kit, feedback forms, pro bono clinic referrals',
        format: 'Plenary',
      },
    ],
    facilitation:
      'Niagara-region lawyer (pro bono/reduced fee), Town Planning Dept staff (in-kind), local insurance broker, Enterprise Centre advisory support',
    budgetBreakdown: [
      {
        item: 'Venue rental',
        description: 'Municipal venue (evening, 3.5 hours)',
        cost: '$0\u2013$150',
      },
      {
        item: 'Legal facilitator honorarium',
        description: 'Local lawyer, pro bono or community rate',
        cost: '$0\u2013$750',
      },
      {
        item: 'Insurance presenter honorarium',
        description: 'Local broker (business dev opportunity)',
        cost: '$0\u2013$200',
      },
      {
        item: 'Town Planning staff',
        description: 'In-kind municipal contribution',
        cost: '$0',
      },
      {
        item: 'Materials and printing',
        description:
          'Workbooks, zoning summary, CIPO guide, contract templates, insurance checklist, PIPEDA guide',
        cost: '$500',
      },
      {
        item: 'Legal resource kit',
        description:
          'Reference cards with OBR links, CIPO steps, legal aid contacts, insurance worksheet',
        cost: '$200',
      },
      {
        item: 'Contract templates',
        description:
          'Professional review of 2 generic templates (service agreement, terms of sale) \u2014 reusable',
        cost: '$500',
      },
      {
        item: 'Catering',
        description: 'Coffee, tea, water, evening snacks for 30',
        cost: '$250',
      },
      {
        item: 'Marketing and promotion',
        description:
          'Social ads, flyers, Town/Chamber/Ambassador outreach',
        cost: '$350',
      },
      {
        item: 'Post-workshop follow-up',
        description:
          'Email with digital copies of all templates and resource links',
        cost: '$50',
      },
      {
        item: 'Contingency (~10%)',
        description: 'Unforeseen costs, accessibility',
        cost: '$500',
      },
    ],
    totalCost: '$2,350\u2013$3,450',
    budgetReserve: '$1,550\u2013$2,650',
  },
  {
    slug: 'start-here-grimsby',
    title: 'Start Here Grimsby: Your Entrepreneurship Launchpad',
    subtitle: 'Your first step into Grimsby\u2019s entrepreneurship ecosystem',
    purpose:
      'Dual purpose \u2014 promotional/onboarding event for the HBB Framework + accessible entry point for aspiring entrepreneurs. Drives visibility and registry sign-ups.',
    targetAudience:
      'Aspiring entrepreneurs, emerging HBBs, recently launched businesses',
    outreachStrategy:
      'Predominantly digital \u2014 Instagram/Facebook ads (18-45, Grimsby/Niagara West), Town/Chamber/BIA social media, e-newsletter. Also: Niagara College/Brock campus boards, student entrepreneur clubs, Welcome Centre display.',
    format:
      'Half-day (3.5 hours), Saturday morning, Grimsby Public Library or Peach King Centre',
    fee: '$10',
    budget: '$5,000 CAD',
    participants: '20-30',
    learningObjectives: [
      'Understand the Grimsby HBB Portal including voluntary registry and self-assessment checklist',
      'Identify business stage (emerging/stabilizing/growth-focused) and corresponding support pathways',
      'Learn how to access Starter Company Plus ($5,000), Venture Niagara ($250K), Innovate Niagara, Enterprise Centre',
      'Connect with Business Ambassador Program and understand mentorship',
      'Begin developing a one-page business concept outline',
      'Network with other aspiring and current Grimsby entrepreneurs',
    ],
    modules: [
      {
        time: '9:00\u20139:15',
        title: 'Welcome and introductions by Economic Development Officer',
        format: 'Plenary',
      },
      {
        time: '9:15\u20139:45',
        title: 'Module 1: The Grimsby HBB Portal',
        format: 'Live demo + guided registration',
        description:
          'Live walkthrough of portal, registry, self-assessment, HBB Guide; participants register on-site',
      },
      {
        time: '9:45\u201310:15',
        title: 'Module 2: "Where Do I Start?"',
        format: 'Interactive presentation + self-assessment',
        description:
          'Business stages overview; how framework matches businesses to support; Business Ambassador Program intro',
      },
      {
        time: '10:15\u201310:45',
        title: 'Module 3: Funding and Support Navigator',
        format: 'Presentation + individual worksheet',
        description:
          'Starter Company Plus, Summer Company, Venture Niagara, Innovate Niagara, Futurpreneur, BDC, Digital Main Street; eligibility worksheet',
      },
      {
        time: '10:45\u201311:00',
        title: 'Break (refreshments and networking)',
        format: '\u2014',
      },
      {
        time: '11:00\u201311:30',
        title: 'Module 4: Business Concept Workshop',
        format: 'Facilitated small-group activity (tables of 4-5)',
        description:
          'One-page business concept outline using template, table-group feedback',
      },
      {
        time: '11:30\u201311:55',
        title: 'Module 5: Grimsby Success Stories and Networking',
        format: 'Panel + networking',
        description:
          '2-3 local HBB owner testimonials (5 min each), open networking with facilitators/Ambassadors/partners',
      },
      {
        time: '11:55\u201312:10',
        title: 'Module 6: "Made in Grimsby" and Tourism',
        format: 'Brief presentation',
        description:
          'Tourism directories, Shop Local campaigns, Welcome Centre, Farmers\u2019 Market, seasonal events',
      },
      {
        time: '12:10\u201312:30',
        title: 'Wrap-up, resource kit distribution, feedback forms, Ambassador mentorship sign-ups',
        format: 'Plenary + registration stations',
      },
    ],
    facilitation:
      'Town Economic Development Officer (lead), St. Catharines Enterprise Centre rep, Chamber of Commerce rep, Business Ambassadors as table facilitators, 2-3 local HBB owners, Downtown BIA',
    budgetBreakdown: [
      {
        item: 'Venue rental',
        description:
          'Grimsby Public Library or Peach King Centre (half-day Saturday)',
        cost: '$0\u2013$200',
      },
      {
        item: 'Lead facilitation',
        description: 'Town Economic Development staff (in-kind)',
        cost: '$0',
      },
      {
        item: 'Partner facilitators',
        description: 'Enterprise Centre, Chamber (within mandates)',
        cost: '$0',
      },
      {
        item: 'Guest speaker honoraria',
        description: '2-3 local HBB owners ($100 each)',
        cost: '$200\u2013$300',
      },
      {
        item: 'Business Ambassador coordination',
        description: 'Volunteer facilitators (pre-workshop training)',
        cost: '$0',
      },
      {
        item: 'Materials and printing',
        description:
          'Welcome packages: portal guide, funding worksheet, concept template, self-assessment, resource directory',
        cost: '$500',
      },
      {
        item: 'Branded materials',
        description:
          '"Start Here Grimsby" folders/bookmarks/tote bags; "Friendly by Nature" branding',
        cost: '$600',
      },
      {
        item: 'Signage and display',
        description: 'Pull-up banners, table signage (reusable)',
        cost: '$400',
      },
      {
        item: 'Catering',
        description:
          'Coffee, tea, water, snacks from local Grimsby bakery (Shop Local) for 30',
        cost: '$300',
      },
      {
        item: 'Marketing and promotion',
        description: 'Targeted social ads, flyers, Town/Chamber/BIA channels',
        cost: '$500',
      },
      {
        item: 'Technology and registration',
        description:
          'Eventbrite, 2-3 on-site tablets for live portal registration',
        cost: '$150',
      },
      {
        item: 'Post-workshop follow-up',
        description:
          'Personalized emails with portal links, funding matches, Ambassador assignment',
        cost: '$50',
      },
      {
        item: 'Contingency (~10%)',
        description: 'Unforeseen costs, accessibility',
        cost: '$500',
      },
    ],
    totalCost: '$3,200\u2013$3,500',
    budgetReserve: '$1,500\u2013$1,800',
  },
];
