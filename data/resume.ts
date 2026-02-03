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
  education: Education[];
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
    location: "Remote",
    summary: "Senior Frontend Developer and AI Specialist with extensive experience in leading engineering teams and architectural transformations. Expert in Next.js, React, and integrating advanced AI workflows to optimize development processes.",
  },
  skills: [
    // Frontend
    { name: "Next.js 16", category: "Frontend", level: "Expert" },
    { name: "React 19", category: "Frontend", level: "Expert" },
    { name: "TypeScript", category: "Frontend", level: "Expert" },
    { name: "Tailwind CSS", category: "Frontend", level: "Expert" },
    { name: "Micro-Frontends", category: "Frontend", level: "Expert" },
    { name: "React Native", category: "Frontend", level: "Advanced" },
    { name: "Remix", category: "Frontend", level: "Advanced" },
    // AI
    { name: "Claude Code", category: "AI", level: "Expert" },
    { name: "Cursor", category: "AI", level: "Expert" },
    { name: "LM Studio", category: "AI", level: "Advanced" },
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
      role: "Head of Engineering / Senior Frontend Developer",
      period: "2019 - Present",
      description: "Led a team of 30 developers and spearheaded strategic architecture initiatives, including cloud migration and micro-frontend implementation.",
      achievements: [
        "Led and managed a team of 30 developers, overseeing multiple projects and ensuring technical excellence.",
        "Orchestrated migration to the cloud using a microservices architecture in Golang, improving scalability and efficiency.",
        "Implemented a micro-frontend architecture that significantly enhanced team autonomy and development efficiency.",
        "Developed a real-time monitoring system using Node.js and React during the COVID-19 pandemic.",
        "Significantly improved LLM context usage, enhancing AI-driven feature capabilities.",
        "Implemented 'Planning, Coding, and Review' strategy to streamline AI-assisted development."
      ],
      technologies: ["Next.js", "React", "Node.js", "Golang", "Micro-frontends", "AI Integration"]
    },
    {
      company: "Decodux",
      role: "Software Developer",
      period: "Feb 2019 - Jul 2019",
      description: "Focused on continuous system improvement, customer relationship management, and effective delivery of solutions.",
      achievements: [
        "Managed strategic meetings with clients to define and refine new functionality.",
        "Successfully executed the migration of critical functionality to a mobile app using React Native.",
        "Developed significant extensions for SugarCRM, enhancing the platform's functionality.",
        "Resolved critical production incidents, minimizing downtime and strengthening system stability."
      ],
      technologies: ["React Native", "SugarCRM", "System Optimization"]
    },
    {
      company: "Crear Publicitarios",
      role: "Software Developer",
      period: "May 2018 - Jan 2019",
      description: "Developed and implemented new functionalities using a modern technology stack, significantly improving user experience.",
      achievements: [
        "Developed new features using PHP, Laravel, and ReactJS.",
        "Redesigned the system's user interface, resulting in a more intuitive and efficient experience.",
        "Developed a real-time dashboard integrated with an automated quoting system.",
        "Drove strategic initiatives aligning technical development with business objectives."
      ],
      technologies: ["ReactJS", "PHP", "Laravel", "Real-time Systems"]
    }
  ],
  education: [
    {
      school: "Servicio Nacional de Aprendizaje (SENA)",
      degree: "Computer Software Technology/Technician",
      period: "2016 - 2018"
    }
  ],
  aiExpertise: [
    {
      title: "AI Workflow Optimization",
      description: "Expertise in integrating AI tools into the development lifecycle.",
      items: [
        "Mastery of 'Planning, Coding, and Review' strategy",
        "Claude Code & Cursor integration",
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
