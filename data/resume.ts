export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Skill {
  name: string;
  level?: "Expert" | "Advanced" | "Intermediate";
  category: "Frontend" | "AI" | "Backend" | "Tools";
}

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    github: string;
    linkedin: string;
    location: string;
    summary: string;
  };
  skills: Skill[];
  experience: Experience[];
  aiExpertise: {
    title: string;
    description: string;
    items: string[];
  }[];
}

export const resumeData: ResumeData = {
  personalInfo: {
    name: "Santiago Arias",
    title: "Senior Frontend Developer & AI Specialist",
    email: "me@santiagoarias.dev",
    github: "https://github.com/SOY4RIAS",
    linkedin: "https://www.linkedin.com/in/csarias/",
    location: "Remote", // Assumed based on context
    summary: "Senior Frontend Developer with deep expertise in Next.js and AI integration. Passionate about leveraging the latest technologies to create exceptional user experiences and optimizing development workflows with AI.",
  },
  skills: [
    { name: "Next.js 16", category: "Frontend", level: "Expert" },
    { name: "React 19", category: "Frontend", level: "Expert" },
    { name: "TypeScript", category: "Frontend", level: "Expert" },
    { name: "Tailwind CSS", category: "Frontend", level: "Expert" },
    { name: "Claude Code", category: "AI", level: "Expert" },
    { name: "LM Studio", category: "AI", level: "Advanced" },
    { name: "Cursor", category: "AI", level: "Expert" },
    { name: "AI Memory Tooling", category: "AI", level: "Advanced" },
  ],
  experience: [
    {
      company: "BitcoinIRA",
      role: "Senior Frontend Developer",
      period: "2023 - Present", // inferred
      description: "Leading frontend development and integrating AI solutions.",
      achievements: [
        "Improved LLM context usage significantly, enhancing AI-driven features.",
        "Implemented 'Planning, Coding, and Review' strategy to streamline development.",
        "Optimized frontend performance and maintainability using modern Next.js patterns."
      ],
      technologies: ["Next.js", "React", "TypeScript", "AI Integration"]
    },
    // Add more placeholders if needed, but this covers the specific prompt points
  ],
  aiExpertise: [
    {
      title: "AI Workflow Optimization",
      description: "Expertise in integrating AI tools into the development lifecycle.",
      items: [
        "Claude Code integration",
        "Cursor editor mastery",
        "Slash command development for AI skills"
      ]
    },
    {
      title: "LLM Context Engineering",
      description: "Advanced techniques for managing and optimizing LLM context.",
      items: [
        "Memory tooling for AI",
        "Context window optimization",
        "Retrieval Augmented Generation (RAG) strategies"
      ]
    }
  ]
};
