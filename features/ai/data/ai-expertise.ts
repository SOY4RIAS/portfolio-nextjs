// AI Feature - Expertise Data

export interface AIExpertiseArea {
  title: string;
  description: string;
  items: string[];
}

export const aiExpertise: AIExpertiseArea[] = [
  {
    title: "AI-First Development Workflow",
    description: "Pioneer in integrating AI tools into every phase of the software development lifecycle.",
    items: [
      "Planning with AI: Using LLMs to break down complex requirements into actionable tasks",
      "Coding with AI: Leveraging Claude Code and Cursor for intelligent pair programming",
      "Review with AI: Automated code review and quality assurance using AI agents"
    ]
  },
  {
    title: "Slash Commands & Custom Tools",
    description: "Creating custom AI interactions that accelerate development velocity.",
    items: [
      "Custom slash commands for repetitive development tasks",
      "AI-powered code generation templates",
      "Automated documentation and testing workflows"
    ]
  },
  {
    title: "RAG & Context Engineering",
    description: "Advanced techniques for maximizing AI effectiveness through context management.",
    items: [
      "Retrieval Augmented Generation (RAG) implementations",
      "Context window optimization strategies",
      "Memory tooling for persistent AI knowledge",
      "Codebase-aware AI assistants"
    ]
  },
  {
    title: "AI Integration Architecture",
    description: "Designing systems that seamlessly incorporate AI capabilities.",
    items: [
      "LLM API integration patterns",
      "Streaming responses and real-time AI interactions",
      "Cost-effective AI usage strategies",
      "AI observability and monitoring"
    ]
  }
];

export const aiSkills: string[] = [
  "Claude Code",
  "Cursor",
  "LM Studio",
  "RAG Strategies",
  "Slash Commands",
  "AI Memory Tooling",
];
