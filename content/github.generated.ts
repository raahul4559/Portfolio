/**
 * GENERATED FILE — do not edit by hand.
 *
 * Produced by `scripts/sync-github.ts` from raahul4559's real GitHub
 * repositories, merged with content/featured.ts (manual featured override)
 * and content/project-stories.ts (hand-authored narrative). Regenerate with
 * `npm run sync:github`, or just `npm run build` — it runs automatically.
 *
 * Last synced: 2026-09-06T02:24:26.968Z
 */
import type {
  ActivityStats,
  ContributionYear,
  GitHubProfile,
  Project,
  RecentActivityItem,
  StreakStats,
} from "./types";

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
      "github": "https://github.com/raahul4559/Portfolio",
      "live": "https://portfolio-smoky-xi-71.vercel.app/"
    },
    "retro": "The split-pane view earns its keep on a wide monitor and almost nowhere else. If I rebuilt it, I'd ship the terminal first and let it drive more of the navigation.",
    "github": {
      "stars": 0,
      "forks": 0,
      "watchers": 0,
      "openIssues": 0,
      "createdAt": "2026-09-04T12:42:17Z",
      "updatedAt": "2026-09-06T02:20:23Z",
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
      "commits": [
        {
          "sha": "078f6ef",
          "message": "feat: update stack content with refined language skills and project contributions",
          "date": "2026-09-06T02:19:59Z",
          "url": "https://github.com/raahul4559/Portfolio/commit/078f6ef36c9fd5c07683392245a648e57e5fdd1d"
        },
        {
          "sha": "49336cc",
          "message": "feat: add support for contribution projects with fetching and displaying commit data",
          "date": "2026-09-06T01:55:02Z",
          "url": "https://github.com/raahul4559/Portfolio/commit/49336ccf45e1b1a2373ebc10d3d44788506cf777"
        },
        {
          "sha": "9e35dcf",
          "message": "feat: add activity module with contribution stats and recent activity",
          "date": "2026-09-06T01:44:45Z",
          "url": "https://github.com/raahul4559/Portfolio/commit/9e35dcff0c62dd2dc861ce483b079b8b0fb79b5c"
        },
        {
          "sha": "7837dd0",
          "message": "feat: add example environment configuration for GitHub integration",
          "date": "2026-09-05T07:41:44Z",
          "url": "https://github.com/raahul4559/Portfolio/commit/7837dd0f2c53aa8b48c8b5cb488cae5dbcc03df0"
        },
        {
          "sha": "fa3ace3",
          "message": "feat: Enhance GitHub integration with new data structures and syncing script",
          "date": "2026-09-05T07:41:19Z",
          "url": "https://github.com/raahul4559/Portfolio/commit/fa3ace37cad876a578d583893d086388f53ba7a3"
        },
        {
          "sha": "8c804d2",
          "message": "feat: centralize site URL configuration and update references across the application",
          "date": "2026-09-04T19:14:15Z",
          "url": "https://github.com/raahul4559/Portfolio/commit/8c804d2da9a302e38f80d71f92c1f03011824b25"
        },
        {
          "sha": "fe0e23d",
          "message": "feat: implement recruiter mode with quick view page and integrate into navigation",
          "date": "2026-09-04T19:03:37Z",
          "url": "https://github.com/raahul4559/Portfolio/commit/fe0e23db34a252f9a5a580f75014e037e096fc29"
        },
        {
          "sha": "3ab584e",
          "message": "feat: add animation classes for smoother transitions in various components",
          "date": "2026-09-04T18:53:18Z",
          "url": "https://github.com/raahul4559/Portfolio/commit/3ab584ed07731dbb485cfc04c8e11549ba154e04"
        },
        {
          "sha": "c0b808d",
          "message": "feat: add /dev/now module with dynamic content and integrate into the application",
          "date": "2026-09-04T18:44:41Z",
          "url": "https://github.com/raahul4559/Portfolio/commit/c0b808d370747c88bb40962907f42d550eff9ffa"
        },
        {
          "sha": "773250d",
          "message": "refactor: replace ProjectDetail with ProjectRepo and update related components",
          "date": "2026-09-04T18:34:33Z",
          "url": "https://github.com/raahul4559/Portfolio/commit/773250db953a1847cec436aba666ebdbd61577dc"
        },
        {
          "sha": "89f3159",
          "message": "feat: add FrameBar component for consistent rendered document headers; update ProjectDetail and Timeline components to use FrameBar",
          "date": "2026-09-04T18:21:47Z",
          "url": "https://github.com/raahul4559/Portfolio/commit/89f31592d1ccc1a00d5059442baa5269e419b5dc"
        },
        {
          "sha": "bd733b9",
          "message": "feat: rename stack.md to skills.md and update references in StackModule and modules",
          "date": "2026-09-04T18:05:21Z",
          "url": "https://github.com/raahul4559/Portfolio/commit/bd733b9838460eca8f3235c3f6aa214995badf44"
        }
      ]
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
      "commits": [
        {
          "sha": "0bfff84",
          "message": "Add INSTALL_STATUS.md and requirements.txt for project setup and dependencies",
          "date": "2026-07-27T19:29:56Z",
          "url": "https://github.com/raahul4559/sign-language-detection/commit/0bfff840768ed03c69465971216433736c226b67"
        },
        {
          "sha": "3f9a0a3",
          "message": "Add README.md with project overview, features, and setup instructions",
          "date": "2026-07-27T19:27:54Z",
          "url": "https://github.com/raahul4559/sign-language-detection/commit/3f9a0a36edbb4e195aa14a0d16e3b4aa2de16e2e"
        },
        {
          "sha": "ba0e272",
          "message": "Add initial implementation for Indian Sign Language Detector",
          "date": "2026-07-27T19:24:59Z",
          "url": "https://github.com/raahul4559/sign-language-detection/commit/ba0e272b82586363cccdca3fc223b39fa39773e3"
        }
      ]
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
      "commits": [
        {
          "sha": "031dca7",
          "message": "Update website link in About page",
          "date": "2026-07-11T07:44:03Z",
          "url": "https://github.com/raahul4559/consultancy/commit/031dca7528aa79c9218df67fcdfc3d3f64ebe422"
        },
        {
          "sha": "047ddd0",
          "message": "Update contact information and address details across multiple files",
          "date": "2026-07-11T07:38:08Z",
          "url": "https://github.com/raahul4559/consultancy/commit/047ddd00b3d1ad0cc0da6f823a6fbf64550ea179"
        },
        {
          "sha": "bfeeee5",
          "message": "Update header style in README.md",
          "date": "2026-07-09T08:32:03Z",
          "url": "https://github.com/raahul4559/consultancy/commit/bfeeee5c91eabb7432d7831f60ced0e0527b6409"
        },
        {
          "sha": "f7eac34",
          "message": "Update README with consultancy name",
          "date": "2026-07-09T08:31:41Z",
          "url": "https://github.com/raahul4559/consultancy/commit/f7eac344c9c44a2dd18af94a775c0fa9447b5fe8"
        },
        {
          "sha": "a5ef64f",
          "message": "Add company registration and legal status section to About page",
          "date": "2026-07-09T08:13:15Z",
          "url": "https://github.com/raahul4559/consultancy/commit/a5ef64f2890f169006ec9b336fb294010ae4fbf4"
        },
        {
          "sha": "aa3ae26",
          "message": "Update college name from RV College to RV University",
          "date": "2026-07-02T19:27:21Z",
          "url": "https://github.com/raahul4559/consultancy/commit/aa3ae26e70adba14c024796bc54851996feabd91"
        },
        {
          "sha": "9cfd829",
          "message": "Remove title from README.md",
          "date": "2026-07-02T19:26:38Z",
          "url": "https://github.com/raahul4559/consultancy/commit/9cfd829255870d98037560bb8039dd15d30b0886"
        },
        {
          "sha": "f2ad0c1",
          "message": "Update RVEI Legacy duration from \"80+ Yrs\" to \"5+ Yrs\" in RV University admissions page",
          "date": "2026-07-02T11:30:40Z",
          "url": "https://github.com/raahul4559/consultancy/commit/f2ad0c1e413076759404c8d50b0fe74aefec2167"
        },
        {
          "sha": "a79f083",
          "message": "Refactor branding from \"Binayak Consultancy\" to \"Shree Vinayak Consultancy\" across all relevant files, including CSS, HTML, and scripts. Update meta descriptions, titles, and content to reflect the new branding. Ensure consistency in legal disclaimers and contact information throughout the site.",
          "date": "2026-07-02T09:57:09Z",
          "url": "https://github.com/raahul4559/consultancy/commit/a79f08382c1257a467ba40c85818584df990269a"
        },
        {
          "sha": "7579de5",
          "message": "Add college template HTML for admissions 2026-27 with dynamic placeholders",
          "date": "2026-07-01T12:51:49Z",
          "url": "https://github.com/raahul4559/consultancy/commit/7579de59a8a175e01a0737a65f7aa02b9855e81c"
        },
        {
          "sha": "b59e072",
          "message": "Remove contact details from README",
          "date": "2026-07-01T06:35:52Z",
          "url": "https://github.com/raahul4559/consultancy/commit/b59e072358d869c15536e4cbc266a5e34247e75e"
        },
        {
          "sha": "2d9968b",
          "message": "Add Vercel configuration for headers and rewrites",
          "date": "2026-06-30T20:44:30Z",
          "url": "https://github.com/raahul4559/consultancy/commit/2d9968b2e2431a2da83c6a54c78be2e47075b3f5"
        }
      ]
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
      "commits": [
        {
          "sha": "7bc1c02",
          "message": "Add getAllAddresses and getAddressById functions; improve error handling in deleteAddress",
          "date": "2026-07-18T18:33:58Z",
          "url": "https://github.com/raahul4559/Ecommerce-backend/commit/7bc1c02a056ee8a0f98f4992662a723d269fdc46"
        },
        {
          "sha": "7c74264",
          "message": "Revise README for Ecommerce Backend API",
          "date": "2026-07-05T05:40:10Z",
          "url": "https://github.com/raahul4559/Ecommerce-backend/commit/7c7426462bb4bf33a667976b73c5b0f1fc8cfecf"
        },
        {
          "sha": "74d6639",
          "message": "Remove unnecessary comments and imports in user controllers and model",
          "date": "2026-07-05T05:31:58Z",
          "url": "https://github.com/raahul4559/Ecommerce-backend/commit/74d6639b4b08a4ef48ba827d7650938c177a8c9e"
        },
        {
          "sha": "8dff6a7",
          "message": "Address controllers is added",
          "date": "2026-06-28T11:15:22Z",
          "url": "https://github.com/raahul4559/Ecommerce-backend/commit/8dff6a7d3e73dd4208f2c2d786eb2201d458dbc5"
        },
        {
          "sha": "f091f56",
          "message": "change the code and added an accesstoken and refreshtoken",
          "date": "2026-06-27T19:23:39Z",
          "url": "https://github.com/raahul4559/Ecommerce-backend/commit/f091f5638a79f9a2e6bba52c471dcb4230637ab8"
        },
        {
          "sha": "0ed8550",
          "message": "new file has been added",
          "date": "2026-06-27T19:17:51Z",
          "url": "https://github.com/raahul4559/Ecommerce-backend/commit/0ed8550e7a9a0af8cc11e9a19a480633c86bc925"
        },
        {
          "sha": "0f58c60",
          "message": "Enhance README with comprehensive project details",
          "date": "2026-06-16T05:35:37Z",
          "url": "https://github.com/raahul4559/Ecommerce-backend/commit/0f58c607c75f8910ff10211b387d3a5dadcf4977"
        },
        {
          "sha": "43e654d",
          "message": "first commit",
          "date": "2026-05-25T18:54:53Z",
          "url": "https://github.com/raahul4559/Ecommerce-backend/commit/43e654d82209f07b6cb5272fc25566cc76ba914b"
        },
        {
          "sha": "ffffe72",
          "message": "first commit",
          "date": "2026-05-25T18:53:08Z",
          "url": "https://github.com/raahul4559/Ecommerce-backend/commit/ffffe723e61e5c4a0248120c38a746020ba813ee"
        },
        {
          "sha": "91aad68",
          "message": "first commit",
          "date": "2026-05-25T18:52:01Z",
          "url": "https://github.com/raahul4559/Ecommerce-backend/commit/91aad68688d63978a8088242a96353abce8d1741"
        }
      ]
    }
  },
  {
    "slug": "deepak-inventory",
    "year": "2026",
    "status": "live",
    "featured": false,
    "name": "deepak-inventory",
    "description": "A simple Windows desktop app for recording Sales and Purchases, keeping a live Stock ledger, and tracking running totals per Party (vendor). All data is stored in plain Excel files you can open in Excel any time.",
    "problem": "",
    "solution": [],
    "role": "Contributor",
    "technologies": [
      "Python",
      "PowerShell",
      "Inno Setup",
      "Batchfile",
      "Mako",
      "PostgreSQL"
    ],
    "features": [],
    "architecture": [],
    "challenges": [],
    "results": [
      "46 commits merged into avinrique/deepak-inventory"
    ],
    "lessons": [],
    "screenshots": [],
    "links": {
      "github": "https://github.com/avinrique/deepak-inventory"
    },
    "github": {
      "stars": 0,
      "forks": 0,
      "watchers": 0,
      "openIssues": 0,
      "createdAt": "2026-08-13T12:54:36Z",
      "updatedAt": "2026-09-01T18:17:23Z",
      "topics": [],
      "defaultBranch": "main",
      "isFork": false,
      "isArchived": false,
      "languages": [
        "Python",
        "PowerShell",
        "Inno Setup",
        "Batchfile",
        "Mako"
      ],
      "categories": [
        "experiment",
        "open-source"
      ],
      "commits": [
        {
          "sha": "fca79e4",
          "message": "Merge pull request #1 from avinrique/fix/legacy-app-hardening",
          "date": "2026-09-01T17:52:24Z",
          "url": "https://github.com/avinrique/deepak-inventory/commit/fca79e40a4070769199ecfd7b3836c8fbcb89aef"
        },
        {
          "sha": "0b72b54",
          "message": "Improve role loading in UserFormDialog and add tests for role handling",
          "date": "2026-08-27T15:46:33Z",
          "url": "https://github.com/avinrique/deepak-inventory/commit/0b72b548008ed36fa29460e03df504e853c36447"
        },
        {
          "sha": "486bb9f",
          "message": "Merge pull request #2 from avinrique/windows-packaging",
          "date": "2026-08-27T10:59:43Z",
          "url": "https://github.com/avinrique/deepak-inventory/commit/486bb9f65956837473220148786813f2941feaa6"
        },
        {
          "sha": "3b711d8",
          "message": "Make the packaged self-test actually observable on Windows",
          "date": "2026-08-27T10:55:06Z",
          "url": "https://github.com/avinrique/deepak-inventory/commit/3b711d801360abfbcc7be6352344ade65328311e"
        },
        {
          "sha": "7ae7c23",
          "message": "Make the missing-tool test neutralise all three discovery sources",
          "date": "2026-08-27T10:40:08Z",
          "url": "https://github.com/avinrique/deepak-inventory/commit/7ae7c23258895c05d860aca9c0182fbe2b2f9469"
        },
        {
          "sha": "59bd0d0",
          "message": "Fix the three Windows test failures CI surfaced",
          "date": "2026-08-27T10:35:56Z",
          "url": "https://github.com/avinrique/deepak-inventory/commit/59bd0d092bd98c52e8250643e472fa3e52cb34f4"
        },
        {
          "sha": "0f46974",
          "message": "Surface CI test failures as annotations, and force UTF-8 on Windows",
          "date": "2026-08-27T10:30:03Z",
          "url": "https://github.com/avinrique/deepak-inventory/commit/0f46974aef063dacb9ddeb670fc6f3c60aace465"
        },
        {
          "sha": "0c31737",
          "message": "Fix Windows DPAPI config encryption and broaden CI triggers",
          "date": "2026-08-27T10:26:06Z",
          "url": "https://github.com/avinrique/deepak-inventory/commit/0c317375e3dc123a15087b79502e77646e9ede03"
        },
        {
          "sha": "428e5e2",
          "message": "Add comprehensive tests for logging, crash handling, and UI responsiveness",
          "date": "2026-08-27T10:13:30Z",
          "url": "https://github.com/avinrique/deepak-inventory/commit/428e5e2856a46b7bc161e5fa9a12a4f2cc7346d1"
        },
        {
          "sha": "ba67dcc",
          "message": "Add tests for product and inventory features",
          "date": "2026-08-23T17:47:33Z",
          "url": "https://github.com/avinrique/deepak-inventory/commit/ba67dccbdaa60ed51987b6abab8d82435c966453"
        },
        {
          "sha": "559ef34",
          "message": "Add comprehensive tests for transaction totals and permissions",
          "date": "2026-08-23T07:54:56Z",
          "url": "https://github.com/avinrique/deepak-inventory/commit/559ef34a8f4f9565ae6d9080b3223c658cd5d494"
        },
        {
          "sha": "9dadc1f",
          "message": "feat: Update confirmation dialog styling and ensure stylesheet application after button creation",
          "date": "2026-08-21T03:06:47Z",
          "url": "https://github.com/avinrique/deepak-inventory/commit/9dadc1f4e369d8fa1f493421a0ab4661c85d956b"
        }
      ],
      "contributionOwner": "avinrique"
    }
  },
  {
    "slug": "easygo",
    "year": "2026",
    "status": "live",
    "featured": false,
    "name": "EasyGo",
    "description": "An end-to-end MVP that turns a single prompt — \"Plan a trip from Patna to Goa for 5 days with a budget of ₹30,000\" — into a complete, personalized travel plan: multimodal transport routes, hotels, attractions, restaurants, weather, a day-wise AI-generated itinerary, and a budget breakdown.",
    "problem": "",
    "solution": [],
    "role": "Contributor",
    "technologies": [
      "TypeScript",
      "CSS",
      "Dockerfile",
      "JavaScript",
      "Batchfile",
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "PostgreSQL"
    ],
    "features": [],
    "architecture": [],
    "challenges": [],
    "results": [
      "22 commits merged into nitish-sah-js/EasyGo"
    ],
    "lessons": [],
    "screenshots": [],
    "links": {
      "github": "https://github.com/nitish-sah-js/EasyGo"
    },
    "github": {
      "stars": 0,
      "forks": 0,
      "watchers": 0,
      "openIssues": 0,
      "createdAt": "2026-08-19T20:03:34Z",
      "updatedAt": "2026-08-22T09:32:17Z",
      "topics": [],
      "defaultBranch": "main",
      "isFork": false,
      "isArchived": false,
      "languages": [
        "TypeScript",
        "CSS",
        "Dockerfile",
        "JavaScript",
        "Batchfile"
      ],
      "categories": [
        "ai",
        "web",
        "open-source"
      ],
      "commits": [
        {
          "sha": "a453a87",
          "message": "fix: catch images that finish loading before React hydrates",
          "date": "2026-08-22T09:30:59Z",
          "url": "https://github.com/nitish-sah-js/EasyGo/commit/a453a87e036418d0f3e702694f10b92e211a17c9"
        },
        {
          "sha": "9009da1",
          "message": "perf: preconnect to Wikimedia's CDN for place/city photos",
          "date": "2026-08-22T09:24:08Z",
          "url": "https://github.com/nitish-sah-js/EasyGo/commit/9009da1f65f1606d435f2cf7a81c3e43991c2179"
        },
        {
          "sha": "4a9943c",
          "message": "fix: remove PageTransition's AnimatePresence wrapper — invisible in Safari",
          "date": "2026-08-22T09:14:28Z",
          "url": "https://github.com/nitish-sah-js/EasyGo/commit/4a9943cef23b99703a4be10f7314c53d7ca6d154"
        },
        {
          "sha": "aecf12a",
          "message": "fix: default Reveal/StaggerGroup to mount-time animation, not scroll-triggered",
          "date": "2026-08-22T09:07:47Z",
          "url": "https://github.com/nitish-sah-js/EasyGo/commit/aecf12a142733921984a3312cc381b64a63ad199"
        },
        {
          "sha": "c986099",
          "message": "fix: proxy API through the web app's own origin to fix Safari auth",
          "date": "2026-08-22T08:49:55Z",
          "url": "https://github.com/nitish-sah-js/EasyGo/commit/c986099e615b03474cbfd1d0f553e7c09c2ee02d"
        },
        {
          "sha": "1909f62",
          "message": "perf: join trip result query instead of ~10 sequential round trips",
          "date": "2026-08-22T06:21:19Z",
          "url": "https://github.com/nitish-sah-js/EasyGo/commit/1909f628d765b226a263ef1fcd731b2aac0d251b"
        },
        {
          "sha": "783f385",
          "message": "fix: prevent stale post-navigation redirects and add root error boundary",
          "date": "2026-08-22T05:13:24Z",
          "url": "https://github.com/nitish-sah-js/EasyGo/commit/783f385ba0396d0a85b17b7f0657f225cd3e9460"
        },
        {
          "sha": "a021b0a",
          "message": "chore: remove stray Railway config-as-code scaffold",
          "date": "2026-08-22T04:54:42Z",
          "url": "https://github.com/nitish-sah-js/EasyGo/commit/a021b0a99c51951eda8d0e3561859938cf566046"
        },
        {
          "sha": "758a305",
          "message": "feat: set trust proxy for express to handle real client IP in Railway environment",
          "date": "2026-08-22T04:52:42Z",
          "url": "https://github.com/nitish-sah-js/EasyGo/commit/758a30573852d3d9292f9f1449540918f57e340f"
        },
        {
          "sha": "9b36ca9",
          "message": "feat: update Dockerfile for improved dependency handling; add Railway configuration files and update Prisma schema for binary target compatibility",
          "date": "2026-08-22T04:44:40Z",
          "url": "https://github.com/nitish-sah-js/EasyGo/commit/9b36ca92ec76ba793a2a0d92e08656d327cdb24c"
        },
        {
          "sha": "0303464",
          "message": "feat: add Dockerfile and .dockerignore for containerization; update auth service cookie options for cross-site compatibility",
          "date": "2026-08-22T03:23:11Z",
          "url": "https://github.com/nitish-sah-js/EasyGo/commit/030346401c8a1242468ca00244a6780db1194add"
        },
        {
          "sha": "c16b95d",
          "message": "Refactor code structure for improved readability and maintainability",
          "date": "2026-08-21T18:42:56Z",
          "url": "https://github.com/nitish-sah-js/EasyGo/commit/c16b95d213df1ba013802b8b63c1a3db2399ab8e"
        }
      ],
      "contributionOwner": "nitish-sah-js"
    }
  },
  {
    "slug": "medconsul",
    "year": "2026",
    "status": "live",
    "featured": false,
    "name": "MedConsul",
    "description": "The webApp to find my  university based on my scores and ranks. ",
    "problem": "",
    "solution": [],
    "role": "Contributor",
    "technologies": [
      "TypeScript",
      "Python",
      "JavaScript",
      "HTML",
      "Shell",
      "CSS",
      "React",
      "Node.js",
      "Express",
      "MongoDB"
    ],
    "features": [],
    "architecture": [],
    "challenges": [],
    "results": [
      "9 commits merged into swarajsah143/MedConsul"
    ],
    "lessons": [],
    "screenshots": [],
    "links": {
      "github": "https://github.com/swarajsah143/MedConsul"
    },
    "github": {
      "stars": 0,
      "forks": 0,
      "watchers": 0,
      "openIssues": 1,
      "createdAt": "2026-06-28T11:24:22Z",
      "updatedAt": "2026-08-06T10:29:01Z",
      "topics": [],
      "defaultBranch": "main",
      "isFork": false,
      "isArchived": false,
      "languages": [
        "TypeScript",
        "Python",
        "JavaScript",
        "HTML",
        "Shell",
        "CSS"
      ],
      "categories": [
        "ai",
        "web",
        "open-source"
      ],
      "commits": [
        {
          "sha": "be98f87",
          "message": "feat: enhance admin and student management with role-specific adjustments and document workflow restrictions",
          "date": "2026-08-02T17:33:48Z",
          "url": "https://github.com/swarajsah143/MedConsul/commit/be98f871771b25d95a8564f6e0d1bf0b97be2a54"
        },
        {
          "sha": "f568c9f",
          "message": "feat: update plan management to include counsellors as staff with full authority and no subscription gating",
          "date": "2026-07-28T20:32:07Z",
          "url": "https://github.com/swarajsah143/MedConsul/commit/f568c9fae3fb6ce1eb820a90386293a4f88d0d06"
        },
        {
          "sha": "fe819b8",
          "message": "feat: enhance role management by adding counsellor role and updating permissions",
          "date": "2026-07-28T19:07:41Z",
          "url": "https://github.com/swarajsah143/MedConsul/commit/fe819b815f18bbaa4823a2b162169eb2be06efc0"
        },
        {
          "sha": "b7936e4",
          "message": "feat: add counsellor role with dedicated dashboard and lookup tools",
          "date": "2026-07-28T18:32:42Z",
          "url": "https://github.com/swarajsah143/MedConsul/commit/b7936e47a2823aa2982b6de8d5be53cdc5bdf410"
        },
        {
          "sha": "bc350b6",
          "message": "fix(auth): rename getProfile method to getProfileEmail for clarity",
          "date": "2026-07-28T17:19:16Z",
          "url": "https://github.com/swarajsah143/MedConsul/commit/bc350b67c86bd7fe36cf56dae4c48b81d86b6066"
        },
        {
          "sha": "5bca7a3",
          "message": "feat: add Google Sign-In support",
          "date": "2026-07-28T10:21:05Z",
          "url": "https://github.com/swarajsah143/MedConsul/commit/5bca7a373a19437105971967f8638a092299070d"
        },
        {
          "sha": "713462c",
          "message": "fix(auth): add user not found check in getProfile method",
          "date": "2026-07-28T09:33:04Z",
          "url": "https://github.com/swarajsah143/MedConsul/commit/713462cad1775646e788a9a4f258871d1ab85bbb"
        },
        {
          "sha": "7c96e56",
          "message": "fix(auth): add user existence check in forgot password flow",
          "date": "2026-07-28T09:31:14Z",
          "url": "https://github.com/swarajsah143/MedConsul/commit/7c96e564deba22ba704722b07c47cfc2f093a8db"
        },
        {
          "sha": "f79e21f",
          "message": "fix(package-lock): update peer dependencies in client and server",
          "date": "2026-07-26T20:06:03Z",
          "url": "https://github.com/swarajsah143/MedConsul/commit/f79e21fe11599058c8fef5e86a1430f9fe70d99d"
        }
      ],
      "contributionOwner": "swarajsah143"
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
      "JavaScript",
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
    "slug": "project-with-backend",
    "year": "2026",
    "status": "live",
    "featured": false,
    "name": "PROJECT-WITH-BACKEND",
    "description": "This the backend # PROJECT-WITH-BACKEND",
    "problem": "",
    "solution": [],
    "role": "Solo",
    "technologies": [
      "JavaScript"
    ],
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
    "slug": "basic-backend",
    "year": "2025",
    "status": "live",
    "featured": false,
    "name": "basic-backend",
    "description": "A JavaScript project.",
    "problem": "",
    "solution": [],
    "role": "Solo",
    "technologies": [
      "JavaScript"
    ],
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
      "languages": [
        "JavaScript"
      ],
      "categories": [
        "web",
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
    "description": "Enterprise-grade real-time audio-visual speaker detection system with web interface, database logging, and monitoring.",
    "problem": "",
    "solution": [],
    "role": "Solo",
    "technologies": [
      "Python",
      "JavaScript",
      "CSS",
      "Mako",
      "HTML",
      "Dockerfile",
      "React",
      "Node.js",
      "FastAPI",
      "PostgreSQL"
    ],
    "features": [
      "Real-time speaker detection using existing audio-visual algorithms",
      "FastAPI backend with REST and WebSocket endpoints",
      "PostgreSQL database for storing detection history",
      "React frontend with real-time video streaming",
      "JWT authentication and security",
      "Prometheus & Grafana monitoring",
      "Docker containerization",
      "WebRTC support (ready for integration)"
    ],
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
      "languages": [
        "Python",
        "JavaScript",
        "CSS",
        "Mako",
        "HTML",
        "Dockerfile"
      ],
      "categories": [
        "web"
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
    "description": "A JavaScript project.",
    "problem": "",
    "solution": [],
    "role": "Solo",
    "technologies": [
      "JavaScript"
    ],
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
      "languages": [
        "JavaScript"
      ],
      "categories": [
        "web",
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
    "description": "A Python project.",
    "problem": "",
    "solution": [],
    "role": "Solo",
    "technologies": [
      "Python"
    ],
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
      "languages": [
        "Python"
      ],
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

export const activityStats: ActivityStats | null = {
  "year": 2026,
  "totalCommits": 118,
  "totalPRs": 1,
  "totalIssues": 0,
  "totalReviews": 0,
  "reposActive": 9
};

export const contributionYears: ContributionYear[] = [
  {
    "year": 2026,
    "total": 125,
    "days": [
      {
        "date": "2026-01-01",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-01-02",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-01-03",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-01-04",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-01-05",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-01-06",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-01-07",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-01-08",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-01-09",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-01-10",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-01-11",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-01-12",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-01-13",
        "count": 2,
        "weekday": 2
      },
      {
        "date": "2026-01-14",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-01-15",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-01-16",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-01-17",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-01-18",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-01-19",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-01-20",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-01-21",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-01-22",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-01-23",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-01-24",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-01-25",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-01-26",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-01-27",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-01-28",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-01-29",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-01-30",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-01-31",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-02-01",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-02-02",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-02-03",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-02-04",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-02-05",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-02-06",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-02-07",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-02-08",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-02-09",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-02-10",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-02-11",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-02-12",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-02-13",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-02-14",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-02-15",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-02-16",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-02-17",
        "count": 1,
        "weekday": 2
      },
      {
        "date": "2026-02-18",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-02-19",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-02-20",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-02-21",
        "count": 1,
        "weekday": 6
      },
      {
        "date": "2026-02-22",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-02-23",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-02-24",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-02-25",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-02-26",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-02-27",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-02-28",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-03-01",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-03-02",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-03-03",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-03-04",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-03-05",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-03-06",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-03-07",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-03-08",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-03-09",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-03-10",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-03-11",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-03-12",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-03-13",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-03-14",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-03-15",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-03-16",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-03-17",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-03-18",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-03-19",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-03-20",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-03-21",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-03-22",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-03-23",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-03-24",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-03-25",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-03-26",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-03-27",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-03-28",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-03-29",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-03-30",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-03-31",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-04-01",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-04-02",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-04-03",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-04-04",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-04-05",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-04-06",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-04-07",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-04-08",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-04-09",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-04-10",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-04-11",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-04-12",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-04-13",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-04-14",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-04-15",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-04-16",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-04-17",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-04-18",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-04-19",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-04-20",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-04-21",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-04-22",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-04-23",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-04-24",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-04-25",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-04-26",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-04-27",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-04-28",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-04-29",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-04-30",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-05-01",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-05-02",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-05-03",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-05-04",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-05-05",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-05-06",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-05-07",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-05-08",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-05-09",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-05-10",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-05-11",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-05-12",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-05-13",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-05-14",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-05-15",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-05-16",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-05-17",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-05-18",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-05-19",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-05-20",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-05-21",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-05-22",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-05-23",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-05-24",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-05-25",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-05-26",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-05-27",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-05-28",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-05-29",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-05-30",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-05-31",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-06-01",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-06-02",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-06-03",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-06-04",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-06-05",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-06-06",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-06-07",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-06-08",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-06-09",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-06-10",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-06-11",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-06-12",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-06-13",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-06-14",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-06-15",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-06-16",
        "count": 3,
        "weekday": 2
      },
      {
        "date": "2026-06-17",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-06-18",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-06-19",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-06-20",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-06-21",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-06-22",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-06-23",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-06-24",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-06-25",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-06-26",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-06-27",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-06-28",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-06-29",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-06-30",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-07-01",
        "count": 4,
        "weekday": 3
      },
      {
        "date": "2026-07-02",
        "count": 2,
        "weekday": 4
      },
      {
        "date": "2026-07-03",
        "count": 2,
        "weekday": 5
      },
      {
        "date": "2026-07-04",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-07-05",
        "count": 2,
        "weekday": 0
      },
      {
        "date": "2026-07-06",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-07-07",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-07-08",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-07-09",
        "count": 3,
        "weekday": 4
      },
      {
        "date": "2026-07-10",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-07-11",
        "count": 2,
        "weekday": 6
      },
      {
        "date": "2026-07-12",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-07-13",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-07-14",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-07-15",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-07-16",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-07-17",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-07-18",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-07-19",
        "count": 1,
        "weekday": 0
      },
      {
        "date": "2026-07-20",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-07-21",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-07-22",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-07-23",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-07-24",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-07-25",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-07-26",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-07-27",
        "count": 1,
        "weekday": 1
      },
      {
        "date": "2026-07-28",
        "count": 8,
        "weekday": 2
      },
      {
        "date": "2026-07-29",
        "count": 3,
        "weekday": 3
      },
      {
        "date": "2026-07-30",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-07-31",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-08-01",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-08-02",
        "count": 1,
        "weekday": 0
      },
      {
        "date": "2026-08-03",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-08-04",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-08-05",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-08-06",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-08-07",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-08-08",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-08-09",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-08-10",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-08-11",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-08-12",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-08-13",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-08-14",
        "count": 11,
        "weekday": 5
      },
      {
        "date": "2026-08-15",
        "count": 14,
        "weekday": 6
      },
      {
        "date": "2026-08-16",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-08-17",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-08-18",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-08-19",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-08-20",
        "count": 8,
        "weekday": 4
      },
      {
        "date": "2026-08-21",
        "count": 11,
        "weekday": 5
      },
      {
        "date": "2026-08-22",
        "count": 13,
        "weekday": 6
      },
      {
        "date": "2026-08-23",
        "count": 2,
        "weekday": 0
      },
      {
        "date": "2026-08-24",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-08-25",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-08-26",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-08-27",
        "count": 9,
        "weekday": 4
      },
      {
        "date": "2026-08-28",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-08-29",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-08-30",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-08-31",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-09-01",
        "count": 1,
        "weekday": 2
      },
      {
        "date": "2026-09-02",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-09-03",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-09-04",
        "count": 10,
        "weekday": 5
      },
      {
        "date": "2026-09-05",
        "count": 7,
        "weekday": 6
      },
      {
        "date": "2026-09-06",
        "count": 3,
        "weekday": 0
      },
      {
        "date": "2026-09-07",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-09-08",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-09-09",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-09-10",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-09-11",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-09-12",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-09-13",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-09-14",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-09-15",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-09-16",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-09-17",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-09-18",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-09-19",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-09-20",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-09-21",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-09-22",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-09-23",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-09-24",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-09-25",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-09-26",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-09-27",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-09-28",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-09-29",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-09-30",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-10-01",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-10-02",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-10-03",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-10-04",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-10-05",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-10-06",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-10-07",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-10-08",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-10-09",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-10-10",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-10-11",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-10-12",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-10-13",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-10-14",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-10-15",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-10-16",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-10-17",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-10-18",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-10-19",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-10-20",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-10-21",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-10-22",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-10-23",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-10-24",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-10-25",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-10-26",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-10-27",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-10-28",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-10-29",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-10-30",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-10-31",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-11-01",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-11-02",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-11-03",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-11-04",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-11-05",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-11-06",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-11-07",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-11-08",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-11-09",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-11-10",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-11-11",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-11-12",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-11-13",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-11-14",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-11-15",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-11-16",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-11-17",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-11-18",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-11-19",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-11-20",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-11-21",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-11-22",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-11-23",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-11-24",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-11-25",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-11-26",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-11-27",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-11-28",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-11-29",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-11-30",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-12-01",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-12-02",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-12-03",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-12-04",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-12-05",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-12-06",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-12-07",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-12-08",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-12-09",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-12-10",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-12-11",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-12-12",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-12-13",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-12-14",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-12-15",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-12-16",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-12-17",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-12-18",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-12-19",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-12-20",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-12-21",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-12-22",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-12-23",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-12-24",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2026-12-25",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2026-12-26",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2026-12-27",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2026-12-28",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2026-12-29",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2026-12-30",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-12-31",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2027-01-01",
        "count": 0,
        "weekday": 5
      }
    ]
  },
  {
    "year": 2025,
    "total": 10,
    "days": [
      {
        "date": "2025-01-01",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-01-02",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-01-03",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-01-04",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-01-05",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-01-06",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-01-07",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-01-08",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-01-09",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-01-10",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-01-11",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-01-12",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-01-13",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-01-14",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-01-15",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-01-16",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-01-17",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-01-18",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-01-19",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-01-20",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-01-21",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-01-22",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-01-23",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-01-24",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-01-25",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-01-26",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-01-27",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-01-28",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-01-29",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-01-30",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-01-31",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-02-01",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-02-02",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-02-03",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-02-04",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-02-05",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-02-06",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-02-07",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-02-08",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-02-09",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-02-10",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-02-11",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-02-12",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-02-13",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-02-14",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-02-15",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-02-16",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-02-17",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-02-18",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-02-19",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-02-20",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-02-21",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-02-22",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-02-23",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-02-24",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-02-25",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-02-26",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-02-27",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-02-28",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-03-01",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-03-02",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-03-03",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-03-04",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-03-05",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-03-06",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-03-07",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-03-08",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-03-09",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-03-10",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-03-11",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-03-12",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-03-13",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-03-14",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-03-15",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-03-16",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-03-17",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-03-18",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-03-19",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-03-20",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-03-21",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-03-22",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-03-23",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-03-24",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-03-25",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-03-26",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-03-27",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-03-28",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-03-29",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-03-30",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-03-31",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-04-01",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-04-02",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-04-03",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-04-04",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-04-05",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-04-06",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-04-07",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-04-08",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-04-09",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-04-10",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-04-11",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-04-12",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-04-13",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-04-14",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-04-15",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-04-16",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-04-17",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-04-18",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-04-19",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-04-20",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-04-21",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-04-22",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-04-23",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-04-24",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-04-25",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-04-26",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-04-27",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-04-28",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-04-29",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-04-30",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-05-01",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-05-02",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-05-03",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-05-04",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-05-05",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-05-06",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-05-07",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-05-08",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-05-09",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-05-10",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-05-11",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-05-12",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-05-13",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-05-14",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-05-15",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-05-16",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-05-17",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-05-18",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-05-19",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-05-20",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-05-21",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-05-22",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-05-23",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-05-24",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-05-25",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-05-26",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-05-27",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-05-28",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-05-29",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-05-30",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-05-31",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-06-01",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-06-02",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-06-03",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-06-04",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-06-05",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-06-06",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-06-07",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-06-08",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-06-09",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-06-10",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-06-11",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-06-12",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-06-13",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-06-14",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-06-15",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-06-16",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-06-17",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-06-18",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-06-19",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-06-20",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-06-21",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-06-22",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-06-23",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-06-24",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-06-25",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-06-26",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-06-27",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-06-28",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-06-29",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-06-30",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-07-01",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-07-02",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-07-03",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-07-04",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-07-05",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-07-06",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-07-07",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-07-08",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-07-09",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-07-10",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-07-11",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-07-12",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-07-13",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-07-14",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-07-15",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-07-16",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-07-17",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-07-18",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-07-19",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-07-20",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-07-21",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-07-22",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-07-23",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-07-24",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-07-25",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-07-26",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-07-27",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-07-28",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-07-29",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-07-30",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-07-31",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-08-01",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-08-02",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-08-03",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-08-04",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-08-05",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-08-06",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-08-07",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-08-08",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-08-09",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-08-10",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-08-11",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-08-12",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-08-13",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-08-14",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-08-15",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-08-16",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-08-17",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-08-18",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-08-19",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-08-20",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-08-21",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-08-22",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-08-23",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-08-24",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-08-25",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-08-26",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-08-27",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-08-28",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-08-29",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-08-30",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-08-31",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-09-01",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-09-02",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-09-03",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-09-04",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-09-05",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-09-06",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-09-07",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-09-08",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-09-09",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-09-10",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-09-11",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-09-12",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-09-13",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-09-14",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-09-15",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-09-16",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-09-17",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-09-18",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-09-19",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-09-20",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-09-21",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-09-22",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-09-23",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-09-24",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-09-25",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-09-26",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-09-27",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-09-28",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-09-29",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-09-30",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-10-01",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-10-02",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-10-03",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-10-04",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-10-05",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-10-06",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-10-07",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-10-08",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-10-09",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-10-10",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-10-11",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-10-12",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-10-13",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-10-14",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-10-15",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-10-16",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-10-17",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-10-18",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-10-19",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-10-20",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-10-21",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-10-22",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-10-23",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-10-24",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-10-25",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-10-26",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-10-27",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-10-28",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-10-29",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-10-30",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-10-31",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-11-01",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-11-02",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-11-03",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-11-04",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-11-05",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-11-06",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-11-07",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-11-08",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-11-09",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-11-10",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-11-11",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-11-12",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-11-13",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-11-14",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-11-15",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-11-16",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-11-17",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-11-18",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-11-19",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-11-20",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-11-21",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-11-22",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-11-23",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-11-24",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-11-25",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-11-26",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-11-27",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-11-28",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-11-29",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-11-30",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-12-01",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-12-02",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-12-03",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-12-04",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-12-05",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-12-06",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-12-07",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-12-08",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-12-09",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-12-10",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-12-11",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-12-12",
        "count": 8,
        "weekday": 5
      },
      {
        "date": "2025-12-13",
        "count": 1,
        "weekday": 6
      },
      {
        "date": "2025-12-14",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-12-15",
        "count": 1,
        "weekday": 1
      },
      {
        "date": "2025-12-16",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-12-17",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-12-18",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-12-19",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-12-20",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-12-21",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-12-22",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-12-23",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-12-24",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2025-12-25",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2025-12-26",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2025-12-27",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2025-12-28",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2025-12-29",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2025-12-30",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-12-31",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2026-01-01",
        "count": 0,
        "weekday": 4
      }
    ]
  },
  {
    "year": 2024,
    "total": 0,
    "days": [
      {
        "date": "2024-01-01",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-01-02",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-01-03",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-01-04",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-01-05",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-01-06",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-01-07",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-01-08",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-01-09",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-01-10",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-01-11",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-01-12",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-01-13",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-01-14",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-01-15",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-01-16",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-01-17",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-01-18",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-01-19",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-01-20",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-01-21",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-01-22",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-01-23",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-01-24",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-01-25",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-01-26",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-01-27",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-01-28",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-01-29",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-01-30",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-01-31",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-02-01",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-02-02",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-02-03",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-02-04",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-02-05",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-02-06",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-02-07",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-02-08",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-02-09",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-02-10",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-02-11",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-02-12",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-02-13",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-02-14",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-02-15",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-02-16",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-02-17",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-02-18",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-02-19",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-02-20",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-02-21",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-02-22",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-02-23",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-02-24",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-02-25",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-02-26",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-02-27",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-02-28",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-02-29",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-03-01",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-03-02",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-03-03",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-03-04",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-03-05",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-03-06",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-03-07",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-03-08",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-03-09",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-03-10",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-03-11",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-03-12",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-03-13",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-03-14",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-03-15",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-03-16",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-03-17",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-03-18",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-03-19",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-03-20",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-03-21",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-03-22",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-03-23",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-03-24",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-03-25",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-03-26",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-03-27",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-03-28",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-03-29",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-03-30",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-03-31",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-04-01",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-04-02",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-04-03",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-04-04",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-04-05",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-04-06",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-04-07",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-04-08",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-04-09",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-04-10",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-04-11",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-04-12",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-04-13",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-04-14",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-04-15",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-04-16",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-04-17",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-04-18",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-04-19",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-04-20",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-04-21",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-04-22",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-04-23",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-04-24",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-04-25",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-04-26",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-04-27",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-04-28",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-04-29",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-04-30",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-05-01",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-05-02",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-05-03",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-05-04",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-05-05",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-05-06",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-05-07",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-05-08",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-05-09",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-05-10",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-05-11",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-05-12",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-05-13",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-05-14",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-05-15",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-05-16",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-05-17",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-05-18",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-05-19",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-05-20",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-05-21",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-05-22",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-05-23",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-05-24",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-05-25",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-05-26",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-05-27",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-05-28",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-05-29",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-05-30",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-05-31",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-06-01",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-06-02",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-06-03",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-06-04",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-06-05",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-06-06",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-06-07",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-06-08",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-06-09",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-06-10",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-06-11",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-06-12",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-06-13",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-06-14",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-06-15",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-06-16",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-06-17",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-06-18",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-06-19",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-06-20",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-06-21",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-06-22",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-06-23",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-06-24",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-06-25",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-06-26",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-06-27",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-06-28",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-06-29",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-06-30",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-07-01",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-07-02",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-07-03",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-07-04",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-07-05",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-07-06",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-07-07",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-07-08",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-07-09",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-07-10",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-07-11",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-07-12",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-07-13",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-07-14",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-07-15",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-07-16",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-07-17",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-07-18",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-07-19",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-07-20",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-07-21",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-07-22",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-07-23",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-07-24",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-07-25",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-07-26",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-07-27",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-07-28",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-07-29",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-07-30",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-07-31",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-08-01",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-08-02",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-08-03",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-08-04",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-08-05",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-08-06",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-08-07",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-08-08",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-08-09",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-08-10",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-08-11",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-08-12",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-08-13",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-08-14",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-08-15",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-08-16",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-08-17",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-08-18",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-08-19",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-08-20",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-08-21",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-08-22",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-08-23",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-08-24",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-08-25",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-08-26",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-08-27",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-08-28",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-08-29",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-08-30",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-08-31",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-09-01",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-09-02",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-09-03",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-09-04",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-09-05",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-09-06",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-09-07",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-09-08",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-09-09",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-09-10",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-09-11",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-09-12",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-09-13",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-09-14",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-09-15",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-09-16",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-09-17",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-09-18",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-09-19",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-09-20",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-09-21",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-09-22",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-09-23",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-09-24",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-09-25",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-09-26",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-09-27",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-09-28",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-09-29",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-09-30",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-10-01",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-10-02",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-10-03",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-10-04",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-10-05",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-10-06",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-10-07",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-10-08",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-10-09",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-10-10",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-10-11",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-10-12",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-10-13",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-10-14",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-10-15",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-10-16",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-10-17",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-10-18",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-10-19",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-10-20",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-10-21",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-10-22",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-10-23",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-10-24",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-10-25",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-10-26",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-10-27",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-10-28",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-10-29",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-10-30",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-10-31",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-11-01",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-11-02",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-11-03",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-11-04",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-11-05",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-11-06",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-11-07",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-11-08",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-11-09",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-11-10",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-11-11",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-11-12",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-11-13",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-11-14",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-11-15",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-11-16",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-11-17",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-11-18",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-11-19",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-11-20",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-11-21",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-11-22",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-11-23",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-11-24",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-11-25",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-11-26",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-11-27",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-11-28",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-11-29",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-11-30",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-12-01",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-12-02",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-12-03",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-12-04",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-12-05",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-12-06",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-12-07",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-12-08",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-12-09",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-12-10",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-12-11",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-12-12",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-12-13",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-12-14",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-12-15",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-12-16",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-12-17",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-12-18",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-12-19",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-12-20",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-12-21",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-12-22",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-12-23",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-12-24",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2024-12-25",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2024-12-26",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2024-12-27",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2024-12-28",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2024-12-29",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-12-30",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2024-12-31",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2025-01-01",
        "count": 0,
        "weekday": 3
      }
    ]
  },
  {
    "year": 2023,
    "total": 11,
    "days": [
      {
        "date": "2023-01-01",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-01-02",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-01-03",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-01-04",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-01-05",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-01-06",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-01-07",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-01-08",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-01-09",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-01-10",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-01-11",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-01-12",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-01-13",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-01-14",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-01-15",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-01-16",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-01-17",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-01-18",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-01-19",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-01-20",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-01-21",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-01-22",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-01-23",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-01-24",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-01-25",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-01-26",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-01-27",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-01-28",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-01-29",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-01-30",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-01-31",
        "count": 1,
        "weekday": 2
      },
      {
        "date": "2023-02-01",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-02-02",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-02-03",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-02-04",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-02-05",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-02-06",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-02-07",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-02-08",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-02-09",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-02-10",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-02-11",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-02-12",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-02-13",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-02-14",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-02-15",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-02-16",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-02-17",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-02-18",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-02-19",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-02-20",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-02-21",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-02-22",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-02-23",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-02-24",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-02-25",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-02-26",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-02-27",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-02-28",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-03-01",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-03-02",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-03-03",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-03-04",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-03-05",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-03-06",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-03-07",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-03-08",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-03-09",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-03-10",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-03-11",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-03-12",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-03-13",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-03-14",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-03-15",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-03-16",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-03-17",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-03-18",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-03-19",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-03-20",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-03-21",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-03-22",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-03-23",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-03-24",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-03-25",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-03-26",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-03-27",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-03-28",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-03-29",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-03-30",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-03-31",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-04-01",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-04-02",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-04-03",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-04-04",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-04-05",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-04-06",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-04-07",
        "count": 10,
        "weekday": 5
      },
      {
        "date": "2023-04-08",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-04-09",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-04-10",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-04-11",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-04-12",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-04-13",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-04-14",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-04-15",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-04-16",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-04-17",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-04-18",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-04-19",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-04-20",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-04-21",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-04-22",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-04-23",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-04-24",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-04-25",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-04-26",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-04-27",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-04-28",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-04-29",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-04-30",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-05-01",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-05-02",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-05-03",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-05-04",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-05-05",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-05-06",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-05-07",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-05-08",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-05-09",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-05-10",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-05-11",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-05-12",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-05-13",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-05-14",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-05-15",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-05-16",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-05-17",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-05-18",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-05-19",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-05-20",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-05-21",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-05-22",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-05-23",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-05-24",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-05-25",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-05-26",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-05-27",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-05-28",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-05-29",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-05-30",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-05-31",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-06-01",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-06-02",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-06-03",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-06-04",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-06-05",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-06-06",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-06-07",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-06-08",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-06-09",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-06-10",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-06-11",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-06-12",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-06-13",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-06-14",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-06-15",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-06-16",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-06-17",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-06-18",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-06-19",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-06-20",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-06-21",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-06-22",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-06-23",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-06-24",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-06-25",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-06-26",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-06-27",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-06-28",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-06-29",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-06-30",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-07-01",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-07-02",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-07-03",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-07-04",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-07-05",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-07-06",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-07-07",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-07-08",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-07-09",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-07-10",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-07-11",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-07-12",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-07-13",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-07-14",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-07-15",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-07-16",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-07-17",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-07-18",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-07-19",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-07-20",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-07-21",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-07-22",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-07-23",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-07-24",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-07-25",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-07-26",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-07-27",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-07-28",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-07-29",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-07-30",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-07-31",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-08-01",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-08-02",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-08-03",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-08-04",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-08-05",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-08-06",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-08-07",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-08-08",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-08-09",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-08-10",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-08-11",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-08-12",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-08-13",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-08-14",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-08-15",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-08-16",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-08-17",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-08-18",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-08-19",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-08-20",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-08-21",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-08-22",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-08-23",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-08-24",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-08-25",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-08-26",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-08-27",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-08-28",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-08-29",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-08-30",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-08-31",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-09-01",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-09-02",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-09-03",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-09-04",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-09-05",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-09-06",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-09-07",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-09-08",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-09-09",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-09-10",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-09-11",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-09-12",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-09-13",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-09-14",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-09-15",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-09-16",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-09-17",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-09-18",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-09-19",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-09-20",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-09-21",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-09-22",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-09-23",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-09-24",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-09-25",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-09-26",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-09-27",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-09-28",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-09-29",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-09-30",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-10-01",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-10-02",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-10-03",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-10-04",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-10-05",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-10-06",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-10-07",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-10-08",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-10-09",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-10-10",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-10-11",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-10-12",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-10-13",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-10-14",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-10-15",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-10-16",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-10-17",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-10-18",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-10-19",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-10-20",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-10-21",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-10-22",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-10-23",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-10-24",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-10-25",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-10-26",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-10-27",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-10-28",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-10-29",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-10-30",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-10-31",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-11-01",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-11-02",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-11-03",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-11-04",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-11-05",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-11-06",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-11-07",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-11-08",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-11-09",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-11-10",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-11-11",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-11-12",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-11-13",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-11-14",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-11-15",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-11-16",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-11-17",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-11-18",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-11-19",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-11-20",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-11-21",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-11-22",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-11-23",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-11-24",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-11-25",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-11-26",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-11-27",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-11-28",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-11-29",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-11-30",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-12-01",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-12-02",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-12-03",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-12-04",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-12-05",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-12-06",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-12-07",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-12-08",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-12-09",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-12-10",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-12-11",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-12-12",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-12-13",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-12-14",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-12-15",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-12-16",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-12-17",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-12-18",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-12-19",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-12-20",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-12-21",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-12-22",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-12-23",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-12-24",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2023-12-25",
        "count": 0,
        "weekday": 1
      },
      {
        "date": "2023-12-26",
        "count": 0,
        "weekday": 2
      },
      {
        "date": "2023-12-27",
        "count": 0,
        "weekday": 3
      },
      {
        "date": "2023-12-28",
        "count": 0,
        "weekday": 4
      },
      {
        "date": "2023-12-29",
        "count": 0,
        "weekday": 5
      },
      {
        "date": "2023-12-30",
        "count": 0,
        "weekday": 6
      },
      {
        "date": "2023-12-31",
        "count": 0,
        "weekday": 0
      },
      {
        "date": "2024-01-01",
        "count": 0,
        "weekday": 1
      }
    ]
  }
];

export const streaks: StreakStats | null = {
  "current": 0,
  "longest": 4,
  "longestFrom": "2026-08-20",
  "longestTo": "2026-08-23"
};

export const recentActivity: RecentActivityItem[] = [
  {
    "id": "14278270749",
    "kind": "star",
    "repo": "liquidslr/system-design-notes",
    "repoUrl": "https://github.com/liquidslr/system-design-notes",
    "title": "Starred system-design-notes",
    "url": "https://github.com/liquidslr/system-design-notes",
    "date": "2026-09-02T12:06:58Z"
  },
  {
    "id": "14254338183",
    "kind": "star",
    "repo": "asgeirtj/system_prompts_leaks",
    "repoUrl": "https://github.com/asgeirtj/system_prompts_leaks",
    "title": "Starred system_prompts_leaks",
    "url": "https://github.com/asgeirtj/system_prompts_leaks",
    "date": "2026-09-02T04:02:48Z"
  },
  {
    "id": "14005864462",
    "kind": "star",
    "repo": "AkashSingh3031/The-Complete-FAANG-Preparation",
    "repoUrl": "https://github.com/AkashSingh3031/The-Complete-FAANG-Preparation",
    "title": "Starred The-Complete-FAANG-Preparation",
    "url": "https://github.com/AkashSingh3031/The-Complete-FAANG-Preparation",
    "date": "2026-08-28T06:33:14Z"
  },
  {
    "id": "13953293730",
    "kind": "pull_request",
    "repo": "avinrique/deepak-inventory",
    "repoUrl": "https://github.com/avinrique/deepak-inventory",
    "title": "Merged PR #2 in deepak-inventory",
    "date": "2026-08-27T10:59:44Z"
  },
  {
    "id": "13952720757",
    "kind": "pull_request",
    "repo": "avinrique/deepak-inventory",
    "repoUrl": "https://github.com/avinrique/deepak-inventory",
    "title": "Opened PR #2 in deepak-inventory",
    "date": "2026-08-27T10:47:37Z"
  },
  {
    "id": "13643285107",
    "kind": "star",
    "repo": "raahul4559/sign-language-detection",
    "repoUrl": "https://github.com/raahul4559/sign-language-detection",
    "title": "Starred sign-language-detection",
    "url": "https://github.com/raahul4559/sign-language-detection",
    "date": "2026-08-21T12:06:53Z"
  }
];
