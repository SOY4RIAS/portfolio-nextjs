// AI Feature - Knowledge Base for RAG Chat
// This data powers the AI chat responses

export const knowledgeBase = {
  greeting: [
    "Hi! I'm Santiago's AI assistant. I can tell you about his experience, skills, and projects.",
    "Hello! Ask me anything about Santiago's background, expertise in AI development, or his work experience."
  ],
  experience: {
    total: "8 years of professional experience in software development",
    current: "Currently working at BitcoinIRA as Senior Frontend Developer (since Apr 2025). Previously at Lean Tech (Mar 2024 - Jan 2025)",
    leadership: "Led teams of up to 30 developers at JIKKOSOFT, managed critical projects across multiple companies",
    highlights: [
      "Led complete TypeScript migrations",
      "Implemented micro-frontend architectures for banking institutions",
      "Built real-time monitoring systems during COVID-19",
      "Orchestrated cloud migrations using Golang microservices"
    ]
  },
  skills: {
    frontend: "Expert in React, Next.js, TypeScript, Tailwind CSS, and React Native",
    backend: "Strong Node.js and NestJS skills, intermediate Golang",
    ai: "Proficient with Claude Code, Cursor, LM Studio, RAG strategies, and custom slash commands",
    architecture: "Experienced in micro-frontends, clean architectures, and cloud deployments"
  },
  aiWorkflow: {
    planning: "I use AI to break down complex requirements into actionable tasks, identify edge cases, and create comprehensive implementation plans.",
    coding: "Claude Code and Cursor are my primary tools for intelligent pair programming. I create custom slash commands for repetitive tasks.",
    review: "AI-assisted code review helps catch bugs, security issues, and maintainability problems before they reach production."
  },
  contact: {
    email: "me@santiagoarias.dev",
    phone: "+573193292571",
    linkedin: "linkedin.com/in/csarias",
    github: "github.com/SOY4RIAS"
  }
} as const;

export type KnowledgeBase = typeof knowledgeBase;
