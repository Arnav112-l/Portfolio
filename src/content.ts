export const site = {
  name: "Arnav Singh",
  initials: "AS.",
  location: "IND",
  timezone: "Asia/Kolkata",
  email: "singharnav7763809@gmail.com",
  phone: "+91 8825111505",
  resume: "/Arnav-Singh-Resume.pdf",
  github: "https://github.com/Arnav112-l",
  linkedin: "https://linkedin.com/in/singh-1502-arnav/",
  twitter: "https://x.com/Arnav_Singh_1",
  cal: "https://cal.com/arnav-singh",
  availability: "available for 2026 — internships & collabs",
};

export const hero = {
  badge: "cs @ bits pilani · building stayid",
  headline: "Making renting in India",
  rotating: ["less painful.", "more verifiable.", "actually trackable.", "worth trusting."],
  now: "Now — first year at BITS, heads-down on StayID",
};

export const thesis =
  "I build products that reach real users — not just hackathon demos. StayID is identity and ops for India's PG economy. Everything else is practice for shipping faster.";

export const marquee = [
  "REACT", "NESTJS", "POSTGRESQL", "TYPESCRIPT", "PG OPS", "FULL STACK",
  "RAG", "WEBSOCKETS", "BITS PILANI", "OPEN SOURCE", "HACKATHONS",
];

export const log = [
  { date: "2020", text: "started shipping on github" },
  { date: "2024-11", text: "built TruthLens — misinformation + RAG" },
  { date: "2025", text: "Hack4Health finalist · SuperHack · Gen AI Exchange" },
  { date: "2025", text: "joined BITS Pilani — CS" },
  { date: "2026", text: "building StayID — beta with PG operators" },
  { date: "now", text: "reading: you, on this portfolio" },
];

export const roles = [
  {
    title: "Founder",
    org: "StayID",
    detail: "identity & ops for PGs and hostels",
    status: "building",
    period: "beta",
    accent: "#2438FF",
  },
  {
    title: "CS Student",
    org: "BITS Pilani",
    detail: "concurrent specialization in CS",
    status: "current",
    period: "2025 —",
    accent: "#0CAF9B",
  },
  {
    title: "DevRel",
    org: "Devnovate",
    detail: "workshops & developer onboarding",
    status: "recent",
    period: "2025",
    accent: "#FFAA00",
  },
] as const;

export const stayid = {
  name: "StayID",
  tagline: "One identity, every stay.",
  category: "Identity · Operations",
  why: "because every PG operator I talked to was drowning in WhatsApp and Excel.",
  signal: "one identity layer for every stay in India",
  pitch:
    "Identity and operations for PGs, hostels, and co-living in India — verify tenants, manage stays, collect rent, and prevent fraud in one place.",
  problem: [
    "50M+ Indians in PGs — operators run on WhatsApp and Excel.",
    "No identity layer → duplicate tenants and fraud.",
    "No single record of who stayed where and whether they paid.",
  ],
  solution: [
    "Aadhaar-backed tenant identity across properties.",
    "Full stay lifecycle: check-in, rent, check-out.",
    "Owner dashboard + admin console with Razorpay signup.",
  ],
  beta: "Under beta testing with a small group of PG operators in India.",
  stack: ["React", "NestJS", "PostgreSQL", "Prisma", "Razorpay"],
  github: `${site.github}/Stay-ID`,
  shots: [
    { src: "/stayid/landing.png", label: "Landing", alt: "StayID landing page" },
    { src: "/stayid/dashboard.png", label: "Dashboard", alt: "StayID owner dashboard" },
    { src: "/stayid/admin.png", label: "Admin", alt: "StayID admin console" },
  ],
};

export const projects = [
  {
    name: "MediScan",
    tag: "Healthcare · OCR",
    why: "medicine prices in India shouldn't take an hour to compare.",
    signal: "prescription in, comparable prices out",
    desc: "Prescription OCR, pharmacy scraping, and a Flutter app for structured medical data.",
    highlights: [
      "Prescription OCR with structured medical data extraction",
      "Pharmacy price scraping for comparable listings",
      "Flutter app for end-to-end prescription workflows",
    ],
    stack: ["Python", "Flutter", "Playwright", "Azure"],
    github: `${site.github}/MediScan`,
    accent: "#7A2BF5",
    sim: "triage" as const,
  },
  {
    name: "TruthLens",
    tag: "AI · Misinformation",
    why: "fake news spreads faster than fact-checkers.",
    signal: "verify before you share",
    desc: "Credibility scoring and RAG-based verification before you share.",
    highlights: [
      "Credibility scoring on incoming claims",
      "RAG-grounded verification before sharing",
      "Refusal paths when retrieval confidence is low",
    ],
    stack: ["JavaScript", "RAG", "NLP"],
    github: `${site.github}/TruthLens`,
    accent: "#FF4D5E",
    sim: "triage" as const,
  },
  {
    name: "Zenith-Collab",
    tag: "Real-time",
    why: "live editing merge conflicts are genuinely annoying.",
    signal: "collaborative editing without the chaos",
    desc: "OT-based collaborative editor with optimized WebSocket sync.",
    highlights: [
      "Operational transform for conflict-free edits",
      "Optimized WebSocket sync for low latency",
      "Multi-user sessions without merge hell",
    ],
    stack: ["TypeScript", "React", "Node.js", "WebSockets"],
    github: `${site.github}/Zenith-Collab`,
    accent: "#0CAF9B",
    sim: "watershed" as const,
  },
];

export const about = {
  title: "about",
  availability: site.availability,
  headline: "Founder · full-stack builder · CS @ BITS Pilani",
  bio: "I ship products that solve real problems — identity systems for India's PG economy, RAG pipelines, and real-time tools. Looking for internships and teams that care about production, not just demos.",
  bioEmphasis: "real problems",
  chips: ["stayid founder", "full-stack", "internships 2026"],
  building: {
    name: stayid.name,
    detail: "founder · beta",
    pitch: stayid.pitch,
    stack: stayid.stack,
    github: stayid.github,
  },
  education: {
    degree: "B.Sc. Computer Science",
    school: "BITS Pilani",
    period: "2025 – 2028",
  },
  coreStack: ["React", "TypeScript", "NestJS", "PostgreSQL", "Prisma", "RAG / LLMs", "WebSockets"],
  achievements: [
    { name: "Hack4Health", detail: "Finalist · IIIT Delhi", featured: true },
    { name: "SuperHack", detail: "AWS & SuperOps · 2025" },
    { name: "Gen AI Exchange", detail: "Google Cloud · 2025" },
    { name: "OpenAI Buildathon", detail: "NxtWave Regional · 2025" },
  ],
  proof: {
    githubHandle: "@Arnav112-l",
    repos: "24 public repos since 2020",
  },
  leadership: [
    "Hack Club Game Jam organizer",
    "E-Cell core team",
    "Devnovate DevRel · workshops",
  ],
  quickLinks: [
    { label: "Résumé ↗", href: site.resume, download: true },
    { label: "Book a call ↗", href: site.cal, external: true },
    { label: "Email ↗", href: `mailto:${site.email}` },
    { label: "LinkedIn ↗", href: site.linkedin, external: true },
  ],
};

export const skills = [
  { label: "interface", items: "react · typescript · next.js · tailwind" },
  { label: "api & services", items: "nestjs · node · rest · websockets · prisma" },
  { label: "intelligence", items: "llms · rag · ocr · ml pipelines" },
  { label: "infra", items: "postgres · aws · gcp · docker · git" },
];

export const hackathons = [
  { symbol: "✦", name: "Gen AI Exchange", org: "Google Cloud · 2025", year: "2025" },
  { symbol: "⟁", name: "SuperHack", org: "AWS & SuperOps · 2025", year: "2025" },
  { symbol: "⊹", name: "Hack4Health", org: "IIIT Delhi · Finalist", year: "2025" },
  { symbol: "◈", name: "OpenAI Buildathon", org: "NxtWave Regional · 2025", year: "2025" },
  { symbol: "⌘", name: "This site", org: "a work in progress, like me", year: "2026" },
];

export const nav = [
  { id: "work", label: "work" },
  { id: "about", label: "about" },
  { id: "build", label: "build" },
  { id: "contact", label: "contact" },
] as const;

export const contact = {
  headline: "Let's build something worth shipping.",
  bullets: [
    "● founder · stayid",
    "● cs · bits pilani",
    "● open for internships & collabs",
  ],
};

export const paletteCommands = [
  { id: "home", label: "Go to home", section: "home" },
  { id: "work", label: "See the work", section: "work" },
  { id: "about", label: "About", section: "about" },
  { id: "build", label: "How I build", section: "build" },
  { id: "contact", label: "Contact", section: "contact" },
  { id: "copy-email", label: "Copy email", action: "copy-email" as const },
  { id: "phase", label: "Toggle light / dark", action: "cycle-phase" as const },
  { id: "email", label: "Open mail", href: `mailto:${site.email}` },
  { id: "github", label: "GitHub", href: site.github },
  { id: "linkedin", label: "LinkedIn", href: site.linkedin },
  { id: "resume", label: "Résumé", href: site.resume },
] as const;
