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
  category: "Frontend" | "AI" | "Backend" | "Tools" | "Soft Skills";
}

export interface Education {
  school: string;
  degree: string;
  period: string;
}

export interface AIExpertise {
  title: string;
  description: string;
  items: string[];
}

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    website: string;
    github: string;
    linkedin: string;
    location: string;
    summary: string;
  };
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  aiExpertise: AIExpertise[];
}

export const resumeData: ResumeData = {
  personalInfo: {
    name: "Santiago Arias",
    title: "Senior Full Stack Developer & AI Integration Specialist",
    email: "me@santiagoarias.dev",
    phone: "+573193292571",
    website: "https://santiagoarias.dev",
    github: "https://github.com/SOY4RIAS",
    linkedin: "https://www.linkedin.com/in/csarias/",
    location: "Colombia (Remote)",
    summary: "Senior Full Stack Developer with 8 years of experience, focused on creating robust technology solutions. My expertise lies in frontend development with ReactJS and NextJS, where I've gained a strong grasp of clean architectures and design patterns. I also have solid backend skills with NestJS and experience in deploying applications on cloud platforms like AWS and Vercel. I am committed to technical excellence and improving team performance through mentoring and knowledge sharing, which enhances deliverable quality and fosters a collaborative learning environment.",
  },
  skills: [
    // Frontend
    { name: "ReactJS / NextJS", category: "Frontend", level: "Expert" },
    { name: "TypeScript", category: "Frontend", level: "Expert" },
    { name: "Tailwind CSS", category: "Frontend", level: "Expert" },
    { name: "Micro-Frontends", category: "Frontend", level: "Expert" },
    { name: "React Native", category: "Frontend", level: "Advanced" },
    { name: "Remix", category: "Frontend", level: "Advanced" },
    // AI
    { name: "Claude Code", category: "AI", level: "Expert" },
    { name: "Cursor", category: "AI", level: "Expert" },
    { name: "LM Studio", category: "AI", level: "Advanced" },
    { name: "RAG Strategies", category: "AI", level: "Advanced" },
    { name: "Slash Commands", category: "AI", level: "Expert" },
    { name: "AI Memory Tooling", category: "AI", level: "Advanced" },
    // Backend
    { name: "Node.js", category: "Backend", level: "Advanced" },
    { name: "NestJS", category: "Backend", level: "Advanced" },
    { name: "Golang", category: "Backend", level: "Intermediate" },
    // Concepts/Soft Skills
    { name: "Clean Architectures", category: "Tools", level: "Expert" },
    { name: "Leadership", category: "Soft Skills", level: "Expert" },
    { name: "Mentoring", category: "Soft Skills", level: "Expert" },
  ],
  experience: [
    {
      company: "BitcoinIRA",
      role: "Senior Frontend Developer",
      period: "Apr 2025 - Present",
      description: "Maintain new features across React Native App and Remix web app. Define and implement proposals of improvements for the system.",
      achievements: [
        "Maintain new features across React Native App and Remix web app",
        "Define and implement proposals of improvements for the system"
      ],
      technologies: ["React Native", "Remix", "TypeScript", "AI Integration"]
    },
    {
      company: "Lean Tech",
      role: "Senior Frontend Developer",
      period: "Mar 2024 - Present",
      description: "Comprehensive development and analysis of frontend implementations for assigned clients. Definition and implementation of system architectures. Leadership in code quality and frontend development standards.",
      achievements: [
        "Implemented code standards and best practices that increased the productivity of the team of 5 developers, resulting in a significant improvement in project maintainability",
        "Designed and implemented a robust architecture that proactively anticipated and mitigated potential production issues, strengthening the future stability of the system",
        "Successfully completed a critical set of unplanned deliverables within a one-month timeframe, facilitating progress towards crucial project phases for deployment to production"
      ],
      technologies: ["Next.js", "React", "TypeScript", "System Architecture", "AI Workflows"]
    },
    {
      company: "Rootstrap",
      role: "Senior Frontend Developer",
      period: "Mar 2022 - Sep 2023",
      description: "Development and implementation of new functionality for critical business systems. Leading new technology adoption and implementation initiatives. Mentoring and professional development of developer team.",
      achievements: [
        "Successfully led the complete migration of the codebase to TypeScript, significantly improving the maintainability and robustness of the system",
        "Developed and implemented a TypeScript training program for client team, raising the overall quality of development",
        "Successfully implemented critical functionality for the Black Friday campaign, ensuring the system's ability to handle the seasonal traffic surge"
      ],
      technologies: ["TypeScript", "React", "Next.js", "Team Leadership"]
    },
    {
      company: "Wolox",
      role: "Senior Frontend Developer",
      period: "Nov 2020 - Mar 2022",
      description: "Strategic involvement in multiple teams managing critical projects for the company. Overseeing and executing enterprise-wide code review processes. Leading strategic initiatives to strengthen the value proposition in staff augmentation services.",
      achievements: [
        "Expanded the company's technology portfolio through the successful introduction and implementation of Flutter, including the development of a proof of concept and training program",
        "Successfully led a team through a critical delivery phase, ensuring that all objectives were met within the established timeline",
        "Designed and implemented a micro-frontend architecture for a top-tier banking institution, successfully modernizing a legacy product and enhancing its value delivery capability"
      ],
      technologies: ["React", "Flutter", "Micro-Frontends", "Enterprise Architecture"]
    },
    {
      company: "JIKKOSOFT",
      role: "Software Developer Lead",
      period: "Oct 2019 - Nov 2020",
      description: "Led the engineering department with a team of 30 developers and spearheaded strategic architecture and development initiatives. Primary responsibilities included overseeing the engineering department, designing and implementing architectural improvements, and leading technical contracting processes.",
      achievements: [
        "Led and managed a team of 30 developers, overseeing multiple projects and ensuring technical excellence",
        "Successfully orchestrated the migration to the cloud using a microservices architecture in Golang, which improved system scalability and efficiency",
        "Developed and implemented a real-time monitoring system during the COVID-19 pandemic using Node.js and React, enabling effective measurement of project outcomes",
        "Led the implementation of a micro-frontend architecture that significantly enhanced team autonomy and development efficiency"
      ],
      technologies: ["Node.js", "React", "Golang", "Microservices", "Cloud Architecture"]
    },
    {
      company: "Decondux",
      role: "Software Developer",
      period: "Feb 2019 - Jul 2019",
      description: "Worked as a senior developer focused on continuous system improvement and customer relationship management. Role involved both technical responsibilities and direct interaction with stakeholders to ensure effective delivery of solutions.",
      achievements: [
        "Managed strategic meetings with clients to define and refine new functionality",
        "Led system improvement initiatives by identifying optimization opportunities and implementing effective solutions",
        "Successfully executed the migration of a critical functionality to a mobile app using React Native, which improved accessibility and user experience",
        "Developed significant extensions for SugarCRM, contributing to the open-source ecosystem and enhancing the platform's functionality",
        "Resolved a critical issue in production with limited information, minimizing downtime and strengthening system stability"
      ],
      technologies: ["React Native", "SugarCRM", "System Optimization"]
    },
    {
      company: "Crear Publicitarios",
      role: "Software Developer",
      period: "May 2018 - Jan 2019",
      description: "Focused on developing and implementing new functionalities that significantly improved the user experience and automated key business processes.",
      achievements: [
        "Developed and implemented new features using a modern technology stack, including PHP, Laravel, and ReactJS",
        "Managed the resolution of critical system issues to ensure stability and operational continuity",
        "Redesigned and improved the system's user interface, resulting in a more intuitive and efficient experience for end users",
        "Developed and implemented a real-time dashboard integrated with an automated quoting system, significantly optimizing business processes"
      ],
      technologies: ["ReactJS", "PHP", "Laravel", "Real-time Systems"]
    }
  ],
  education: [
    {
      school: "Servicio Nacional de Aprendizaje (SENA)",
      degree: "Analyst and Developer of Software - Computer Software Technology/Technician",
      period: "2016 - 2018"
    }
  ],
  aiExpertise: [
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
  ]
};

// Knowledge base for RAG-like chat functionality
export const knowledgeBase = {
  greeting: [
    "Hi! I'm Santiago's AI assistant. I can tell you about his experience, skills, and projects.",
    "Hello! Ask me anything about Santiago's background, expertise in AI development, or his work experience."
  ],
  experience: {
    total: "8 years of professional experience in software development",
    current: "Currently working at BitcoinIRA as Senior Frontend Developer (since Apr 2025) and Lean Tech (since Mar 2024)",
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
};
