/**
 * GENERATED FILE — do not edit by hand.
 *
 * Produced by `scripts/sync-github.ts` from raahul4559's real GitHub
 * repositories, merged with content/featured.ts (manual featured override)
 * and content/project-stories.ts (hand-authored narrative). Regenerate with
 * `npm run sync:github`, or just `npm run build` — it runs automatically.
 *
 * Last synced: 2026-09-05T03:50:35.693Z
 */
import type { ActivityStats, GitHubProfile, Project } from "./types";

export const githubProjects: Project[] = [
  {
    "slug": "portfolio",
    "year": "2026",
    "status": "live",
    "featured": true,
    "name": "Portfolio",
    "description": "This site — a portfolio built as an operating system, with a boot sequence, a module rail, editor tabs, a command palette, and a terminal that all read one virtual filesystem derived from the site's own content — including, now, the projects themselves, synced from GitHub at build time.",
    "problem": "Every developer portfolio makes the same argument — here is a hero, here are some cards, here is a contact form — without demonstrating the thing it claims. I wanted the site itself to be the evidence: real interaction design, real keyboard support, real state management, and nothing that falls apart under a screen reader or a 375px viewport.",
    "solution": [
      "Modeled the whole site as one typed content layer; the rail, tabs, palette, terminal filesystem, routes, and OG images are all derived from it",
      "Built the shell as a persistent App Router layout so navigation never remounts the chrome",
      "Wrote a real terminal parser that walks the derived filesystem — ls, cat, open, tab completion, history — rather than scripting fake output",
      "Held a strict motion budget: 120–220ms, opacity and small translates only, everything gated behind prefers-reduced-motion"
    ],
    "role": "Design and engineering",
    "technologies": [
      "TypeScript",
      "CSS",
      "JavaScript",
      "Next.js",
      "Vercel"
    ],
    "features": [],
    "architecture": [
      "A single typed content layer (content/*.ts) is the only source of truth; the module rail, tab bar, command palette, terminal filesystem, and OG images are all pure functions of it — nothing is hand-duplicated across surfaces",
      "The shell — rail, tabs, status bar — lives in a persistent App Router layout, so route changes only swap the document pane; the chrome itself never remounts",
      "A build-time sync script fetches and scores real GitHub repository data — READMEs, languages, commits — and generates a typed content file the app reads exactly like its hand-authored content; the browser never talks to the GitHub API or sees a token",
      "Zustand holds transient UI state (open tabs, terminal height, explorer expansion) with a hand-rolled localStorage sync; content stays server-rendered and typed"
    ],
    "challenges": [
      "Keeping the rail, the terminal, and the tab bar reading from one filesystem instead of three copies of the same data quietly drifting apart",
      "Shipping a boot sequence and a command palette without either one reading as a gimmick under a strict no-glow, no-gradient constraint",
      "Scoring real repositories well enough that tutorial and practice projects don't crowd out the work that actually represents the skill level here"
    ],
    "results": [
      "100 Lighthouse accessibility score",
      "Roughly 45KB of first-load JS on the interactive shell",
      "The whole site skims in under twenty seconds through ordinary UI, or runs entirely from the keyboard"
    ],
    "lessons": [
      "Building the filesystem, rail, and terminal against one shared object graph from day one avoided an entire category of bugs — the three-copies-of-the-same-list drift never had a chance to happen",
      "The boot sequence and command palette only stopped feeling like a gimmick once every stage became skippable and keyboard-first; delight that gets in the way of a returning visitor isn't delight"
    ],
    "screenshots": [],
    "links": {
      "github": "https://github.com/raahul4559/Portfolio"
    },
    "retro": "The split-pane view earns its keep on a wide monitor and almost nowhere else. If I rebuilt it, I'd ship the terminal first and let it drive more of the navigation.",
    "github": {
      "stars": 0,
      "forks": 0,
      "watchers": 0,
      "openIssues": 0,
      "createdAt": "2026-09-04T12:42:17Z",
      "updatedAt": "2026-09-04T19:14:27Z",
      "topics": [],
      "defaultBranch": "main",
      "isFork": false,
      "isArchived": false,
      "languages": [
        "TypeScript",
        "CSS",
        "JavaScript"
      ],
      "categories": [
        "web"
      ],
      "commits": []
    }
  },
  {
    "slug": "sign-language-detection",
    "year": "2026",
    "status": "live",
    "featured": true,
    "name": "sign-language-detection",
    "description": "A real-time Indian Sign Language detection web app.",
    "problem": "",
    "solution": [],
    "role": "Solo",
    "technologies": [
      "Python",
      "JavaScript",
      "CSS",
      "HTML",
      "Flask",
      "Keras",
      "MediaPipe"
    ],
    "features": [
      "Real-time detection — Live webcam feed, in-browser MediaPipe hand tracking, landmark overlay, FPS counter, multi-hand detection",
      "Recognition — Neural-net classifier for letters A–Z and digits 0–9 (after training); works out-of-the-box in heuristic digit mode (0–5); per-prediction confidence",
      "Text output — Auto-append stable letters, Space / Backspace / Clear, large translation box",
      "Extras — 🔊 Text-to-Speech, ⬇ download .txt, prediction history panel, error handling when no hand is detected",
      "UI — Modern responsive layout, dark mode (default) + light theme, mobile-friendly",
      "ML pipeline — Data collection, preprocessing, data augmentation, training, evaluation, save/load"
    ],
    "architecture": [],
    "challenges": [],
    "results": [],
    "lessons": [],
    "screenshots": [],
    "links": {
      "github": "https://github.com/raahul4559/sign-language-detection"
    },
    "github": {
      "stars": 0,
      "forks": 0,
      "watchers": 0,
      "openIssues": 0,
      "createdAt": "2026-07-27T19:18:30Z",
      "updatedAt": "2026-08-21T12:06:54Z",
      "topics": [],
      "defaultBranch": "main",
      "isFork": false,
      "isArchived": false,
      "languages": [
        "Python",
        "JavaScript",
        "CSS",
        "HTML"
      ],
      "categories": [
        "ai",
        "web"
      ],
      "commits": []
    }
  },
  {
    "slug": "consultancy",
    "year": "2026",
    "status": "live",
    "featured": true,
    "name": "consultancy",
    "description": "Premium educational counseling website helping students navigate admission processes for top engineering colleges in India.",
    "problem": "",
    "solution": [],
    "role": "Solo · client project",
    "technologies": [
      "HTML",
      "CSS",
      "JavaScript",
      "Python",
      "Express",
      "MongoDB",
      "Vercel"
    ],
    "features": [
      "18 Pages — Homepage, 10 college detail pages, about, contact, privacy policy, terms & conditions, disclaimer",
      "Premium Design — Glassmorphism cards, animated gradient meshes, 3D card tilt effects, canvas particle system, gradient text animations",
      "Lead Capture — Timed popup form (10s/30s/2min), contact form, WhatsApp integration",
      "Responsive — Fully mobile-optimized with touch gestures, frosted glass mobile nav, safe-area support",
      "Backend — Express.js + MongoDB Atlas API for lead storage and admin authentication"
    ],
    "architecture": [],
    "challenges": [],
    "results": [],
    "lessons": [],
    "screenshots": [],
    "links": {
      "github": "https://github.com/raahul4559/consultancy",
      "live": "https://consultancy-beta-flax.vercel.app"
    },
    "github": {
      "stars": 0,
      "forks": 0,
      "watchers": 0,
      "openIssues": 0,
      "createdAt": "2026-06-30T20:42:39Z",
      "updatedAt": "2026-07-11T07:44:14Z",
      "topics": [],
      "defaultBranch": "main",
      "isFork": false,
      "isArchived": false,
      "languages": [
        "HTML",
        "CSS",
        "JavaScript",
        "Python"
      ],
      "categories": [
        "web"
      ],
      "commits": []
    }
  },
  {
    "slug": "ecommerce-backend",
    "year": "2026",
    "status": "live",
    "featured": true,
    "name": "Ecommerce-backend",
    "description": "A robust and scalable RESTful API for an E-commerce application built with Node.js, Express.js, and MongoDB. This backend provides authentication, product management, order processing, and other essential features required for an online shopping platform.",
    "problem": "",
    "solution": [],
    "role": "Solo",
    "technologies": [
      "JavaScript",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Mongoose"
    ],
    "features": [
      "🔐 User Authentication (JWT)",
      "👤 User Registration & Login",
      "🛍️ Product Management (CRUD)",
      "📦 Category Management",
      "🛒 Shopping Cart API",
      "💳 Order Management",
      "📄 Pagination & Search",
      "🔍 Product Filtering"
    ],
    "architecture": [],
    "challenges": [],
    "results": [],
    "lessons": [],
    "screenshots": [],
    "links": {
      "github": "https://github.com/raahul4559/Ecommerce-backend"
    },
    "github": {
      "stars": 0,
      "forks": 0,
      "watchers": 0,
      "openIssues": 0,
      "createdAt": "2026-02-20T19:04:34Z",
      "updatedAt": "2026-07-18T18:34:11Z",
      "topics": [],
      "defaultBranch": "main",
      "isFork": false,
      "isArchived": false,
      "languages": [
        "JavaScript"
      ],
      "categories": [
        "web"
      ],
      "commits": []
    }
  },
  {
    "slug": "bootstrap-project",
    "year": "2023",
    "status": "live",
    "featured": false,
    "name": "bootstrap_project",
    "description": "A responsive web page built using Bootstrap 4 that showcases various Bootstrap UI components including a navigation bar, image carousel, navigation tabs, jumbotron, pagination, and progress bar.",
    "problem": "",
    "solution": [],
    "role": "Solo",
    "technologies": [
      "HTML",
      "Bootstrap"
    ],
    "features": [
      "Responsive Navigation Bar",
      "Dropdown Menu",
      "Search Form",
      "Image Carousel with Captions",
      "Navigation Tabs",
      "Jumbotron Section",
      "Pagination Component",
      "Animated Progress Bar"
    ],
    "architecture": [],
    "challenges": [],
    "results": [],
    "lessons": [],
    "screenshots": [],
    "links": {
      "github": "https://github.com/raahul4559/bootstrap_project",
      "live": "https://raahul4559.github.io/bootstrap_project/"
    },
    "github": {
      "stars": 0,
      "forks": 0,
      "watchers": 0,
      "openIssues": 0,
      "createdAt": "2023-04-07T12:56:36Z",
      "updatedAt": "2026-06-16T05:41:56Z",
      "topics": [],
      "defaultBranch": "main",
      "isFork": false,
      "isArchived": false,
      "languages": [
        "HTML"
      ],
      "categories": [
        "web",
        "experiment"
      ],
      "commits": []
    }
  },
  {
    "slug": "urlshortlist",
    "year": "2026",
    "status": "live",
    "featured": false,
    "name": "urlshortlist",
    "description": "A simple URL shortening service built with Node.js, Express, MongoDB, and NanoID.",
    "problem": "",
    "solution": [],
    "role": "Solo",
    "technologies": [
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "NanoID"
    ],
    "features": [
      "Generate short URLs from long URLs",
      "Store URL mappings in MongoDB",
      "REST API endpoint for URL creation",
      "Unique short IDs generated using NanoID",
      "Environment variable support using dotenv"
    ],
    "architecture": [],
    "challenges": [],
    "results": [],
    "lessons": [],
    "screenshots": [],
    "links": {
      "github": "https://github.com/raahul4559/urlshortlist"
    },
    "github": {
      "stars": 0,
      "forks": 0,
      "watchers": 0,
      "openIssues": 0,
      "createdAt": "2026-01-13T10:11:19Z",
      "updatedAt": "2026-06-16T05:37:48Z",
      "topics": [],
      "defaultBranch": "main",
      "isFork": false,
      "isArchived": false,
      "languages": [],
      "categories": [
        "experiment"
      ],
      "commits": []
    }
  },
  {
    "slug": "project-with-backend",
    "year": "2026",
    "status": "live",
    "featured": false,
    "name": "PROJECT-WITH-BACKEND",
    "description": "A code project.",
    "problem": "",
    "solution": [],
    "role": "Solo",
    "technologies": [],
    "features": [],
    "architecture": [],
    "challenges": [],
    "results": [],
    "lessons": [],
    "screenshots": [],
    "links": {
      "github": "https://github.com/raahul4559/PROJECT-WITH-BACKEND"
    },
    "github": {
      "stars": 0,
      "forks": 0,
      "watchers": 0,
      "openIssues": 0,
      "createdAt": "2026-02-17T03:05:09Z",
      "updatedAt": "2026-02-18T06:01:35Z",
      "topics": [],
      "defaultBranch": "main",
      "isFork": false,
      "isArchived": false,
      "languages": [],
      "categories": [
        "experiment"
      ],
      "commits": []
    }
  },
  {
    "slug": "basic-backend",
    "year": "2025",
    "status": "live",
    "featured": false,
    "name": "basic-backend",
    "description": "A code project.",
    "problem": "",
    "solution": [],
    "role": "Solo",
    "technologies": [],
    "features": [],
    "architecture": [],
    "challenges": [],
    "results": [],
    "lessons": [],
    "screenshots": [],
    "links": {
      "github": "https://github.com/raahul4559/basic-backend"
    },
    "github": {
      "stars": 0,
      "forks": 0,
      "watchers": 0,
      "openIssues": 0,
      "createdAt": "2025-12-15T11:16:38Z",
      "updatedAt": "2026-01-10T18:35:37Z",
      "topics": [],
      "defaultBranch": "main",
      "isFork": false,
      "isArchived": false,
      "languages": [],
      "categories": [
        "experiment"
      ],
      "commits": []
    }
  },
  {
    "slug": "final-code",
    "year": "2025",
    "status": "live",
    "featured": false,
    "name": "final-code",
    "description": "A code project.",
    "problem": "",
    "solution": [],
    "role": "Solo",
    "technologies": [],
    "features": [],
    "architecture": [],
    "challenges": [],
    "results": [],
    "lessons": [],
    "screenshots": [],
    "links": {
      "github": "https://github.com/raahul4559/final-code"
    },
    "github": {
      "stars": 0,
      "forks": 0,
      "watchers": 0,
      "openIssues": 0,
      "createdAt": "2025-12-13T05:59:00Z",
      "updatedAt": "2025-12-13T06:04:15Z",
      "topics": [],
      "defaultBranch": "main",
      "isFork": false,
      "isArchived": false,
      "languages": [],
      "categories": [
        "experiment"
      ],
      "commits": []
    }
  },
  {
    "slug": "learning-backend",
    "year": "2025",
    "status": "live",
    "featured": false,
    "name": "LEARNING-BACKEND",
    "description": "A code project.",
    "problem": "",
    "solution": [],
    "role": "Solo",
    "technologies": [],
    "features": [],
    "architecture": [],
    "challenges": [],
    "results": [],
    "lessons": [],
    "screenshots": [],
    "links": {
      "github": "https://github.com/raahul4559/LEARNING-BACKEND"
    },
    "github": {
      "stars": 0,
      "forks": 0,
      "watchers": 0,
      "openIssues": 0,
      "createdAt": "2025-12-12T13:31:49Z",
      "updatedAt": "2025-12-12T13:35:44Z",
      "topics": [],
      "defaultBranch": "main",
      "isFork": false,
      "isArchived": false,
      "languages": [],
      "categories": [
        "experiment"
      ],
      "commits": []
    }
  },
  {
    "slug": "codered",
    "year": "2025",
    "status": "live",
    "featured": false,
    "name": "codered",
    "description": "A code project.",
    "problem": "",
    "solution": [],
    "role": "Solo",
    "technologies": [],
    "features": [],
    "architecture": [],
    "challenges": [],
    "results": [],
    "lessons": [],
    "screenshots": [],
    "links": {
      "github": "https://github.com/raahul4559/codered"
    },
    "github": {
      "stars": 0,
      "forks": 0,
      "watchers": 0,
      "openIssues": 0,
      "createdAt": "2025-12-12T13:21:45Z",
      "updatedAt": "2025-12-12T13:30:38Z",
      "topics": [],
      "license": "Apache-2.0",
      "defaultBranch": "main",
      "isFork": false,
      "isArchived": false,
      "languages": [],
      "categories": [
        "open-source"
      ],
      "commits": []
    }
  }
];

export const githubProfile: GitHubProfile = {
  "login": "raahul4559",
  "name": "Rahul",
  "avatarUrl": "https://avatars.githubusercontent.com/u/124065713?v=4",
  "bio": null,
  "location": null,
  "blog": null,
  "htmlUrl": "https://github.com/raahul4559",
  "followers": 0,
  "following": 0,
  "publicRepos": 11
};

export const activityStats: ActivityStats | null = null;
