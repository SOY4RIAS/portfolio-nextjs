// AI Feature - RAG Service
// Handles response generation for the AI chat

import { knowledgeBase } from '../data/knowledge-base';

interface ResumeExperience {
  company: string;
  role: string;
  period: string;
}

interface ResumeEducation {
  school: string;
  degree: string;
  period: string;
}

interface ResumeSkill {
  name: string;
  category: string;
}

interface ResumeData {
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: ResumeSkill[];
}

/**
 * RAG-like response generator based on keyword matching
 * In a production app, this would use embeddings and vector search
 */
export function generateRAGResponse(query: string, resumeData: ResumeData): string {
  const q = query.toLowerCase();

  // Greeting patterns
  if (q.match(/^(hi|hello|hey|hola)/)) {
    return `Hey! I'm Santiago's AI assistant, powered by a simple RAG system built into this portfolio. I have access to Santiago's resume and can answer questions about his experience, skills, and AI expertise. What would you like to know?`;
  }

  // Experience queries
  if (matchesTopics(q, ['experience', 'work', 'job', 'career'])) {
    const exp = resumeData.experience;
    return `Santiago has **${knowledgeBase.experience.total}**. Here's a quick overview:

**Current Position:**
• **${exp[0].company}** - ${exp[0].role} (${exp[0].period})

**Previous Highlights:**
• Led a team of 30 developers at JIKKOSOFT
• Implemented micro-frontend architectures at Wolox for banking institutions
• Led complete TypeScript migrations at Rootstrap

Would you like details about any specific role?`;
  }

  // Leadership queries
  if (matchesTopics(q, ['lead', 'team', 'manage'])) {
    return `Santiago has extensive leadership experience:

**Team Leadership:**
• Led and managed a **team of 30 developers** at JIKKOSOFT
• Oversaw multiple projects ensuring technical excellence
• Conducted technical hiring processes, including interviews and assessments

**Key Achievements:**
• Orchestrated migration to cloud using microservices architecture in Golang
• Implemented micro-frontend architecture that enhanced team autonomy
• Built real-time monitoring systems during COVID-19 pandemic

He's passionate about **mentoring** and **knowledge sharing** to improve team performance.`;
  }

  // AI tools queries
  if (matchesTopics(q, ['ai', 'artificial intelligence', 'llm', 'claude', 'cursor'])) {
    return `Santiago is deeply invested in AI-augmented development:

**AI Tools Expertise:**
• **Claude Code** - Expert level, primary tool for intelligent pair programming
• **Cursor** - Expert level, AI-powered code editor
• **LM Studio** - Advanced, local LLM experimentation
• **Custom Slash Commands** - Creates custom AI interactions

**AI Development Philosophy:**
1. **Planning** - Uses LLMs to break down complex requirements
2. **Coding** - Intelligent pair programming with AI assistants
3. **Review** - AI-assisted code review for quality assurance

This portfolio itself demonstrates RAG concepts - I'm answering based on Santiago's resume data!`;
  }

  // RAG queries
  if (matchesTopics(q, ['rag', 'retrieval', 'context'])) {
    return `Santiago specializes in **RAG (Retrieval Augmented Generation)** strategies:

**RAG Expertise:**
• Implements RAG for codebase-aware AI assistants
• Optimizes context windows for maximum AI effectiveness
• Builds memory tooling for persistent AI knowledge

**Real-World Applications:**
• This chat interface is a simplified RAG demo - it retrieves relevant information from Santiago's resume data based on your query
• Uses keyword matching and semantic understanding to find relevant context
• Demonstrates how AI can be integrated into web applications

Want to know more about context engineering or AI integration patterns?`;
  }

  // Tech stack queries
  if (matchesTopics(q, ['tech', 'stack', 'skill', 'language', 'framework'])) {
    const skills = resumeData.skills;
    const frontend = skills.filter(s => s.category === 'Frontend').map(s => s.name).join(', ');
    const backend = skills.filter(s => s.category === 'Backend').map(s => s.name).join(', ');
    const ai = skills.filter(s => s.category === 'AI').map(s => s.name).join(', ');

    return `Here's Santiago's technical stack:

**Frontend (Expert):**
${frontend}

**Backend (Advanced):**
${backend}

**AI & Tooling:**
${ai}

**Architecture:**
• Clean Architectures
• Micro-Frontends
• Cloud deployments (AWS, Vercel)

Santiago stays current with the latest tech - this portfolio uses **Next.js 16** with **React 19**!`;
  }

  // Slash commands queries
  if (matchesTopics(q, ['slash', 'command'])) {
    return `Santiago creates **custom slash commands** to accelerate development:

**What are Slash Commands?**
In AI coding tools like Claude Code and Cursor, slash commands are shortcuts that trigger specific AI behaviors or templates.

**Santiago's Approach:**
• Creates custom commands for repetitive development tasks
• Builds AI-powered code generation templates
• Automates documentation and testing workflows

**Example Use Cases:**
\`/plan\` - Break down a feature into tasks
\`/review\` - AI-assisted code review
\`/test\` - Generate test cases
\`/doc\` - Auto-generate documentation`;
  }

  // Contact queries
  if (matchesTopics(q, ['contact', 'email', 'hire', 'reach'])) {
    return `You can reach Santiago through:

**Email:** ${knowledgeBase.contact.email}
**Phone:** ${knowledgeBase.contact.phone}
**LinkedIn:** ${knowledgeBase.contact.linkedin}
**GitHub:** ${knowledgeBase.contact.github}

He's available for:
• Full-time senior/lead positions
• AI integration consulting
• Technical architecture advisory
• Team mentoring and training`;
  }

  // Education queries
  if (matchesTopics(q, ['education', 'study', 'degree', 'school'])) {
    const edu = resumeData.education[0];
    return `**Education:**
${edu.school}
${edu.degree}
${edu.period}

Santiago believes in continuous learning and has maintained expertise through:
• Hands-on experience with cutting-edge technologies
• Contributing to open-source projects
• Training and mentoring other developers
• Experimenting with new AI tools and workflows`;
  }

  // Portfolio queries
  if (matchesTopics(q, ['portfolio', 'this site', 'website', 'built'])) {
    return `This portfolio is itself a demonstration of AI-augmented development:

**Tech Stack:**
• Next.js 16 with React 19
• TypeScript for type safety
• Tailwind CSS for styling
• Framer Motion for animations

**AI Features Demonstrated:**
• **This Chat** - A RAG-like system that answers questions from resume data
• **AI Workflow** - Interactive visualization of Planning/Coding/Review methodology

The entire site showcases Santiago's philosophy: **AI should augment every part of the development process**.`;
  }

  // Default response
  return `I can help you learn about Santiago! Here are some topics I know about:

• **Experience** - 8 years of software development, leadership roles
• **AI Expertise** - Claude Code, Cursor, RAG strategies, slash commands
• **Tech Stack** - React, Next.js, TypeScript, Node.js, and more
• **Leadership** - Managed teams of up to 30 developers
• **Contact** - How to reach Santiago for opportunities

Try asking something specific, or click one of the suggested questions above!`;
}

/**
 * Helper function to check if query matches any of the given topics
 */
function matchesTopics(query: string, topics: string[]): boolean {
  return topics.some(topic => query.includes(topic));
}
