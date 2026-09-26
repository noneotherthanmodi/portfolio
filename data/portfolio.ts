export const portfolio = {
  name: "Udit Narayan Modi",
  email: "uditmodi03@gmail.com",
  location: "Bengaluru, India",
  coordinates: "12.97° N, 77.59° E",
  role: "GenAI & backend engineer",
  employer: "Zebra Technologies",
  introduction:
    "I turn language models into systems that do useful work — routing intent, calling real tools, moving real data, and surviving production.",

  thesis:
    "Most AI never leaves the demo. The model answers, the room nods — and then Monday arrives: real users, rate limits, stale data, an API that times out at the worst possible moment.",
  thesisTurn: "That’s where my work begins.",

  projects: [
    {
      id: "translation",
      number: "01",
      title: "Language, delivered.",
      category: "Enterprise document translation",
      description:
        "A document translation platform built around parallel processing, live progress, and enterprise delivery — not a blocking request behind a spinner.",
      flow: ["PDF / DOCX", "Parallel workers", "SSE progress", "OneDrive"],
      evidence:
        "Owned architecture through deployment. Azure Blob and Table Storage handled persistence; Microsoft Graph enabled delivery straight to OneDrive.",
      tags: ["Flask", "SSE", "Azure", "OAuth 2.0", "ThreadPoolExecutor"],
      collection: "Zebra Technologies",
      status: "In production",
      figure: "Parallel, streamed.",
      medium: "Flask, server-sent events, thread pools, Azure storage, Microsoft Graph",
      caption:
        "One document enters. Workers split the pages, stream honest progress back to the browser, and deliver the result where people already work.",
    },
    {
      id: "agentic",
      number: "02",
      title: "One prompt. Actual action.",
      category: "Agentic IT platform",
      description:
        "A LangGraph system that classifies intent and orchestrates ServiceNow workflows for tickets, knowledge retrieval, and application access.",
      flow: ["User intent", "LangGraph router", "Specialist tools", "ServiceNow"],
      evidence:
        "Built with FastAPI and shipped through Cloud Build to Cloud Run. Model decisions are wired to real APIs — not simulated tool responses.",
      tags: ["LangGraph", "FastAPI", "Tool calling", "GCP", "CI/CD"],
      collection: "Zebra Technologies",
      status: "In production",
      figure: "Intent, routed.",
      medium: "LangGraph, FastAPI, tool calling, Cloud Build, Cloud Run",
      caption:
        "Every request is classified, then handed to the one specialist that can act on it — a ticket, an answer, or an access grant — through real ServiceNow APIs.",
    },
    {
      id: "ingestion",
      number: "03",
      title: "Before intelligence: good data.",
      category: "Backend ingestion & APIs",
      description:
        "Django REST Framework ingestion services connecting automated collection, structured data processing, and ML classification.",
      flow: ["Web ingestion", "DRF APIs", "Classification", "Structured data"],
      evidence:
        "JWT authentication, field-level encryption, and targeted query optimization — the unglamorous layer every model downstream depends on.",
      tags: ["Django", "DRF", "Python", "JWT", "Data pipelines"],
      collection: "Navyojan AI",
      status: "Shipped",
      figure: "Noise, sorted.",
      medium: "Django REST Framework, JWT, field-level encryption, ML classification",
      caption:
        "Raw collected data passes through authenticated APIs and a classifier, and lands as structured records the models downstream can trust.",
    },
    {
      id: "agentic-engineering",
      number: "04",
      title: "Built with agents. Owned end to end.",
      category: "Agentic engineering · Claude Code & Codex",
      description:
        "I build complete products with Claude Code and Codex as a full engineering workflow — not autocomplete. Planning, multi-file implementation, tests, review, and deployment, with the architecture and every merged line owned by me.",
      flow: ["Spec & plan", "Parallel agents", "Tests & review", "Deploy"],
      evidence:
        "End-to-end products built and delivered on agentic coding platforms — including the site you’re reading. Context engineering with CLAUDE.md and AGENTS.md, subagents, hooks, MCP servers, and verification loops that keep agent output production-grade.",
      tags: ["Claude Code", "Codex", "Subagents", "MCP", "Hooks", "Context engineering"],
      collection: "Independent & freelance",
      status: "Delivered",
      figure: "Many hands, one owner.",
      medium: "Claude Code, Codex, subagents, MCP servers, hooks, human review",
      caption:
        "Two agents write in parallel; nothing ships until it passes review — the tests first, then me. Delegation is the tool. Ownership stays human.",
    },
  ],

  designStudy: {
    note: "I study system design the way I build: requirements first, numbers second, boxes last. One worked study below — and a static edition of it running on this very site.",
    lede: "A classic design problem, worked end to end: requirements, capacity, API, storage, and the trade-offs that decide it.",
    functional: [
      "Shorten a long URL into a compact code",
      "Redirect a code to its original URL",
      "Custom aliases and optional expiry",
      "Click analytics per link",
    ],
    nonFunctional: [
      "Read-heavy: ~100 redirects per new link",
      "Redirects fast and highly available",
      "Codes unique and not guessable in sequence",
      "Analytics never slow a redirect down",
    ],
    assumptions: "100M new links a month · 100:1 reads to writes · 5-year retention · ~500 bytes a record",
    estimates: [
      { label: "New links", value: "~40/s", working: "100M ÷ 2.6M s a month" },
      { label: "Redirects", value: "~4K/s", working: "× 100 reads per write" },
      { label: "Links in 5 years", value: "6B", working: "100M × 60 months" },
      { label: "Keyspace, 7 chars", value: "3.5T", working: "62⁷ — far above 6B" },
      { label: "Storage", value: "~3 TB", working: "6B × 500 B" },
      { label: "Hot cache", value: "~33 GB", working: "20% of 333M daily reads × 500 B" },
    ],
    api: [
      "POST /api/v1/urls",
      '  { "long_url", "alias"?, "expires_at"? }',
      '  → 201 { "code", "short_url" }',
      "",
      "GET /{code}",
      "  → 302 Location: long_url",
      "  → 404 unknown or expired",
    ],
    model: [
      "urls",
      "  code        PK  varchar(7)",
      "  long_url        text",
      "  owner_id        bigint",
      "  created_at      timestamp",
      "  expires_at      timestamp?",
      "",
      "clicks → queue → analytics store",
    ],
    decisions: [
      {
        question: "How are codes generated?",
        choice: "Counter + base62, from pre-allocated ID ranges",
        why: "No collisions and no coordination on the hot path — each write node leases a block of IDs. A bijective scramble stops codes being guessable in order. Hash-and-truncate would need a collision check on every write.",
      },
      {
        question: "301 or 302?",
        choice: "302, because analytics matter",
        why: "A 301 is cached by the browser — cheaper, but those clicks never reach you. A 302 keeps every redirect observable.",
      },
      {
        question: "Where do reads go?",
        choice: "Cache-aside Redis, CDN for the hottest links",
        why: "At 100:1 this is really a read system. Most redirects should never touch the database.",
      },
      {
        question: "How is storage split?",
        choice: "Key-value store, sharded by code with consistent hashing",
        why: "Every lookup is a single key. Shards scale out without reshuffling everything; replicas absorb reads.",
      },
      {
        question: "What about analytics?",
        choice: "Asynchronous — click events go to a queue",
        why: "A redirect never waits on a write. Counting happens off the hot path.",
      },
      {
        question: "Abuse and expiry?",
        choice: "Rate limits, URL scanning, lazy expiry + a sweeper",
        why: "Limits per key and IP stop floods; expired links 404 on read, and a background job reclaims them.",
      },
    ],
  },

  freelance: {
    note: "Small fix or full product, a sharp spec or a vague idea — if it needs building and it has to actually work, I want to hear about it.",
    offers: [
      {
        title: "End-to-end products",
        body: "From idea to deployed — backend, frontend, auth, data, and cloud. A working product, not a prototype.",
      },
      {
        title: "AI & agentic features",
        body: "LLM features, RAG over your own data, tool-calling agents, and automations wired into the systems you already run.",
      },
      {
        title: "Backends, APIs & integrations",
        body: "Django, FastAPI, and Flask services, third-party integrations, data pipelines, and performance work.",
      },
      {
        title: "Rescue & ship",
        body: "A stalled prototype, a flaky pipeline, a demo that has to survive real users — taken to production.",
      },
    ],
    process: [
      { title: "Brief", body: "Tell me the problem in a few lines. No deck required." },
      { title: "Scope", body: "We agree on what done looks like, the timeline, and the cost — up front." },
      { title: "Build", body: "Working demos as it takes shape, not status reports." },
      { title: "Hand over", body: "Deployed, documented, and yours — code, access, and a clear path forward." },
    ],
    types: [
      { id: "product", label: "A full product" },
      { id: "ai-feature", label: "AI / agent feature" },
      { id: "backend", label: "Backend or API" },
      { id: "automation", label: "Automation" },
      { id: "rescue", label: "Fix or rescue" },
      { id: "other", label: "Something else" },
    ],
    timelines: [
      { id: "asap", label: "As soon as possible" },
      { id: "month", label: "This month" },
      { id: "flexible", label: "Flexible" },
    ],
  },

  principles: [
    {
      title: "Stream progress. Never spin.",
      body: "Long-running work deserves live feedback. Parallel workers, server-sent events, and progress that tells the truth.",
    },
    {
      title: "Ground every answer.",
      body: "Models reason over live organizational data and act through real APIs. A tool call that isn’t real isn’t a feature.",
    },
    {
      title: "Ship the boring parts first.",
      body: "Auth, encryption, retries, query plans. The unglamorous layer is the part users actually trust.",
    },
    {
      title: "Own it past the deploy.",
      body: "CI/CD, logs, security remediation, zero-downtime migrations. Shipping is where the job starts, not where it ends.",
    },
  ],

  capabilities: [
    {
      title: "Agentic systems",
      body: "LangGraph, LangChain, tool calling, RAG, retrieval, grounded workflows.",
    },
    {
      title: "Backend platforms",
      body: "Python, Django / DRF, FastAPI, Flask, REST, SSE, WebSockets, authentication.",
    },
    {
      title: "Production delivery",
      body: "Azure, GCP, Cloud Run, CI/CD, logging, security remediation, operational ownership.",
    },
    {
      title: "Agentic engineering",
      body: "Claude Code, Codex, subagents, MCP, hooks — and AI-assisted frontends that make the systems underneath usable and clear.",
    },
  ],

  experience: [
    {
      start: "2025-07",
      end: null,
      company: "Zebra Technologies",
      role: "Enterprise Systems Analyst",
      description:
        "Enterprise AI platforms, agentic workflows, chatbot migrations, cloud delivery, security remediation, and production observability.",
    },
    {
      start: "2025-01",
      end: "2025-07",
      company: "Zebra Technologies",
      role: "GenAI Intern",
      description:
        "LangGraph multi-agent orchestration, Azure OpenAI function calling, intent routing, and structured extraction grounded in live data.",
    },
    {
      start: "2024-07",
      end: "2024-12",
      company: "Navyojan AI",
      role: "Backend Developer Intern",
      description:
        "Django REST Framework APIs, automated ingestion, ML integration, authentication, and database optimization.",
    },
    {
      start: "2024-03",
      end: "2024-05",
      company: "Recount AI",
      role: "AI Research & Development Intern",
      description:
        "NLP processing, recommendation systems, and RAG retrieval with FAISS and OpenAI embeddings.",
    },
  ],

  credentials: [
    {
      kind: "Recognition",
      title: "CIO recognition",
      detail: "Zero-downtime migration of three enterprise chatbots to MIAW Enhanced Live Agent.",
    },
    {
      kind: "Foundation",
      title: "B.E., AI & Machine Learning",
      detail: "Bangalore Institute of Technology · 2025 · CGPA 8.6",
    },
    {
      kind: "Competition",
      title: "Smart India Hackathon",
      detail: "National finalist · 2023 · public transit & predictive analytics",
    },
  ],
} as const;

export type Project = (typeof portfolio.projects)[number];
