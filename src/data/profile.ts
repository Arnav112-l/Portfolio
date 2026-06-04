import { routes } from "../resources/config";
import type { NavIconName } from "../components/NavIcon";

const GITHUB = "https://github.com/Arnav112-l";

export const person = {
  name: "Arnav Singh",
  email: "singharnav7763809@gmail.com",
  phone: "+91 8825111505",
  timezone: "Asia/Kolkata",
  currentLocation: "India",
};

export const home = {
  headline: "Making renting in India a little less painful.",
  subline:
    "Hey, I'm Arnav — CS at BITS Pilani. I build full-stack apps and spend most of my free time on StayID.",
  featured: {
    display: true,
    title: "Let's connect!",
    href: "https://linkedin.com/in/singh-1502-arnav/",
  },
};

export const profile = {
  githubUsername: "Arnav112-l",
  email: person.email,
  phone: person.phone,
  resumeUrl: "/Arnav-Singh-Resume.pdf",
  links: {
    github: GITHUB,
    linkedin: "https://linkedin.com/in/singh-1502-arnav/",
    twitter: "https://x.com/Arnav_Singh_1",
  },
  calLink: "https://cal.com/arnav-singh",
};

export const now = {
  focus:
    "StayID takes most of my time — the boring parts of renting in India (verification, trust, repeat bookings). On the side I'm still poking at MediScan and smaller weekend builds.",
  lookingFor: "Reach out if you run PGs, work in health tech, or just want to build something together.",
};

export const education = {
  degree: "Bachelor of Science (B.Sc.) in Computer Science",
  school: "Birla Institute of Technology and Science (BITS), Pilani",
  period: "2025 – 2028",
  note: "Concurrent specialization in Computer Science",
};

export const skills = {
  languages: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "Dart"],
  backend: ["Node.js", "NestJS", "REST APIs", "Microservices", "WebSockets"],
  ai: ["Machine Learning", "Generative AI", "LLM Integration", "RAG Pipelines", "AI Agents"],
  frontend: ["React.js", "Tailwind CSS", "State Management"],
  cloud: ["AWS", "Google Cloud Platform (GCP)", "Azure"],
};

export type ProjectLink = {
  github?: string;
  demo?: string;
  video?: string;
};

export type Screenshot = {
  src: string;
  alt: string;
  caption: string;
};

export const currentVenture = {
  name: "StayID",
  tagline: "One identity, every stay.",
  status: "Building · Beta testing",
  pitch:
    "StayID is identity and operations infrastructure for PGs, hostels, and co-living operators in India. We give property managers one system to verify tenants, manage stays, collect rent, and prevent fraud — replacing WhatsApp groups, Excel sheets, and paper registers.",
  problem: {
    title: "The problem",
    points: [
      "50M+ Indians live in PGs and hostels, but operators run on fragmented tools with zero tenant identity layer.",
      "Duplicate tenants, fake documents, and manual check-ins create fraud risk and operational chaos.",
      "No single source of truth for who stayed where, when, and whether they paid.",
    ],
  },
  solution: {
    title: "What we built",
    points: [
      "Aadhaar-backed tenant identity — one person, one record, across properties.",
      "Full stay lifecycle: check-in, room assignment, rent ledger, check-out.",
      "Owner dashboard + admin console with fraud reporting and self-serve signup via Razorpay.",
    ],
  },
  betaStatus:
    "StayID is under beta testing with a small group of PG operators. We're iterating on check-in, verification, and rent flows before a wider rollout.",
  stack: ["React", "NestJS", "PostgreSQL", "Prisma", "Razorpay", "TypeScript"],
  links: {
    github: `${GITHUB}/Stay-ID`,
  } satisfies ProjectLink,
  screenshots: [
    {
      src: "/stayid/landing.png",
      alt: "StayID marketing landing page for PG and hostel operators",
      caption: "Landing page",
    },
    {
      src: "/stayid/dashboard.png",
      alt: "StayID owner dashboard with occupancy, tenants, and recent payments",
      caption: "Owner dashboard",
    },
    {
      src: "/stayid/admin.png",
      alt: "StayID admin console with platform-wide metrics and fraud monitoring",
      caption: "Admin console",
    },
  ] satisfies Screenshot[],
};

export type Project = {
  name: string;
  tagline: string;
  description: string;
  publishedAt: string;
  stack: string[];
  links: ProjectLink;
};

export const otherProjects: Project[] = [
  {
    name: "MediScan",
    tagline: "OCR + healthcare data extraction",
    description:
      "Medicine price comparison and prescription OCR for India — live scraping across pharmacy storefronts, structured medical JSON from handwritten prescriptions, and a Flutter mobile app.",
    publishedAt: "2026-06-01",
    stack: ["Python", "Flutter", "OCR", "Playwright", "Azure"],
    links: {
      github: `${GITHUB}/MediScan`,
    } satisfies ProjectLink,
  },
  {
    name: "TruthLens",
    tagline: "Misinformation detection platform",
    description:
      "AI-driven platform to combat fake news, deepfakes, and misinformation — real-time credibility verification, reliability scoring, and cross-referencing against trusted knowledge sources.",
    publishedAt: "2024-11-01",
    stack: ["JavaScript", "Deep Learning", "RAG", "NLP"],
    links: {
      github: `${GITHUB}/TruthLens`,
    } satisfies ProjectLink,
  },
  {
    name: "Zenith-Collab",
    tagline: "Real-time distributed collaborative editor",
    description:
      "Real-time collaborative editor using Operational Transformation to reduce multi-user editing conflicts. Distributed sync logic with 40% lower synchronization latency via optimized WebSocket pipelines.",
    publishedAt: "2025-04-01",
    stack: ["TypeScript", "React.js", "Node.js", "WebSockets"],
    links: {
      github: `${GITHUB}/Zenith-Collab`,
    } satisfies ProjectLink,
  },
  {
    name: "SpendTracker",
    tagline: "Personal finance dashboard",
    description:
      "A simple web app to log expenses, set monthly budgets, and see where your money goes. Built to practice CRUD, charts, and auth without overcomplicating it.",
    publishedAt: "2025-02-01",
    stack: ["React", "Node.js", "PostgreSQL", "Chart.js"],
    links: {} satisfies ProjectLink,
  },
  {
    name: "CampusBoard",
    tagline: "Campus events & notices",
    description:
      "Students can post events, clubs can share updates, and everything stays searchable by date and category. Started as a class project and kept iterating on the UI.",
    publishedAt: "2024-09-01",
    stack: ["Next.js", "Tailwind CSS", "Supabase"],
    links: {} satisfies ProjectLink,
  },
  {
    name: "RecipeBox",
    tagline: "Save recipes you actually use",
    description:
      "Save links and notes for recipes, tag them (breakfast, quick, veg), and filter when you don't know what to cook. Nothing fancy — just useful.",
    publishedAt: "2024-06-01",
    stack: ["React", "Firebase", "Tailwind CSS"],
    links: {} satisfies ProjectLink,
  },
];

export const productImpact = [
  "Reduced collaboration latency by 40% in multi-user editing environments.",
  "Automated Tier-1 IT monitoring workflows using agent-triggered execution pipelines.",
  "Improved healthcare record digitization efficiency by 3× using OCR + NLP extraction.",
  "Designed misinformation verification workflows improving reliability scoring using RAG.",
];

export const achievements = [
  {
    name: "Gen AI Exchange Hackathon",
    org: "Google Cloud",
    year: "2025",
    detail: "Built a GenAI legal-document simplification system using Vertex AI.",
  },
  {
    name: "SuperHack",
    org: "AWS & SuperOps",
    year: "2025",
    detail: "Built a business analytics dashboard on AWS in a 48-hour hackathon sprint.",
  },
  {
    name: "OpenAI Academy x NxtWave Buildathon",
    org: "Regional",
    year: "2025",
    detail: "Developed an AI-driven application using OpenAI models during a 2-day sprint.",
  },
  {
    name: "Hack4Health",
    org: "IIIT Delhi",
    year: "2025",
    detail: "Finalist — rapidly prototyped a healthcare MVP (H4N) under tight hackathon timelines.",
  },
];

export const experience = [
  {
    role: "Developer Relations (DevRel)",
    org: "Devnovate",
    points: [
      "Supported developer onboarding and ecosystem engagement through technical sessions.",
      "Assisted workshops promoting adoption of developer tools in student communities.",
    ],
  },
  {
    role: "Student Developer",
    org: "Personal projects",
    points: [
      "Built and shipped small web apps — expense trackers, campus tools, and side projects on GitHub.",
    ],
  },
  {
    role: "Organizer",
    org: "Hack Club Game Jam Bengaluru",
    points: [
      "Organized a city-level Game Jam enabling student builders to prototype interactive projects.",
    ],
  },
  {
    role: "Core Member",
    org: "Entrepreneurship Cell",
    points: [
      "Organized startup workshops and speaker sessions with industry mentors.",
    ],
  },
];

export const founderStory = {
  paragraphs: [
    "I'm a builder who ships end-to-end — from database schema to AI pipelines to production deployment. I don't wait for a team to start; I write the code, talk to users, and iterate.",
    "23 public repos on GitHub since 2020 — StayID, MediScan, TruthLens, and a bunch of smaller builds in between.",
    "StayID is my current focus: India's PG economy is massive, underserved, and ready for proper identity and operations infrastructure.",
  ],
  strengths: [
    "Ships full products solo — API, dashboard, payments, and AI pipelines",
    "Hackathon-proven: Google Cloud, AWS SuperHack, OpenAI Buildathon, Hack4Health finalist",
    "Open source contributor · DevRel · E-Cell · Hack Club organizer",
  ],
};

export const navItems = [
  { id: "home", label: "Home", href: "#", icon: "home" as NavIconName },
  routes.about && { id: "about", label: "About", href: "#about", icon: "person" as NavIconName },
  routes.work && { id: "work", label: "Work", href: "#work", icon: "grid" as NavIconName },
  routes.contact && { id: "contact", label: "Contact", href: "#contact", icon: "mail" as NavIconName },
].filter(Boolean) as {
  id: string;
  label: string;
  href: string;
  icon: NavIconName;
}[];

export const socialLinks = [
  { label: "GitHub", href: profile.links.github, icon: "github" as const },
  { label: "LinkedIn", href: profile.links.linkedin, icon: "linkedin" as const },
  { label: "Twitter", href: profile.links.twitter, icon: "twitter" as const },
].filter((link) => link.href);
