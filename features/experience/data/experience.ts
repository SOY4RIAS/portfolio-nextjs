// Experience Feature - Work Experience Data

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
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
    period: "Mar 2024 - Jan 2025",
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
];

// Derived statistics
export const experienceStats = {
  totalYears: '8+',
  totalCompanies: experiences.length.toString(),
  maxTeamSize: '30+',
  projectsDelivered: '50+'
} as const;
