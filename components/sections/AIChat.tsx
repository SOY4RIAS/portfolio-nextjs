'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Terminal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resumeData, knowledgeBase } from '@/data/resume';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isTyping?: boolean;
}

const suggestedQuestions = [
  "What's your experience with AI tools?",
  "Tell me about your leadership experience",
  "What tech stack do you use?",
  "How do you use RAG in development?",
];

// Simple RAG-like response generator based on keywords
function generateResponse(query: string): string {
  const q = query.toLowerCase();

  // Greeting patterns
  if (q.match(/^(hi|hello|hey|hola)/)) {
    return `Hey! I'm Santiago's AI assistant, powered by a simple RAG system built into this portfolio. I have access to Santiago's resume and can answer questions about his experience, skills, and AI expertise. What would you like to know?`;
  }

  // Experience queries
  if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('career')) {
    const exp = resumeData.experience;
    return `Santiago has **${knowledgeBase.experience.total}**. Here's a quick overview:

**Current Positions:**
• **${exp[0].company}** - ${exp[0].role} (${exp[0].period})
• **${exp[1].company}** - ${exp[1].role} (${exp[1].period})

**Previous Highlights:**
• Led a team of 30 developers at JIKKOSOFT
• Implemented micro-frontend architectures at Wolox for banking institutions
• Led complete TypeScript migrations at Rootstrap

Would you like details about any specific role?`;
  }

  // Leadership queries
  if (q.includes('lead') || q.includes('team') || q.includes('manage')) {
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
  if (q.includes('ai') || q.includes('artificial intelligence') || q.includes('llm') || q.includes('claude') || q.includes('cursor')) {
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
  if (q.includes('rag') || q.includes('retrieval') || q.includes('context')) {
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
  if (q.includes('tech') || q.includes('stack') || q.includes('skill') || q.includes('language') || q.includes('framework')) {
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
  if (q.includes('slash') || q.includes('command')) {
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
\`/doc\` - Auto-generate documentation

Try the interactive demo on this page to see slash commands in action!`;
  }

  // Contact queries
  if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach')) {
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
  if (q.includes('education') || q.includes('study') || q.includes('degree') || q.includes('school')) {
    return `**Education:**
${resumeData.education[0].school}
${resumeData.education[0].degree}
${resumeData.education[0].period}

Santiago believes in continuous learning and has maintained expertise through:
• Hands-on experience with cutting-edge technologies
• Contributing to open-source projects
• Training and mentoring other developers
• Experimenting with new AI tools and workflows`;
  }

  // Portfolio/This site queries
  if (q.includes('portfolio') || q.includes('this site') || q.includes('website') || q.includes('built')) {
    return `This portfolio is itself a demonstration of AI-augmented development:

**Tech Stack:**
• Next.js 16 with React 19
• TypeScript for type safety
• Tailwind CSS for styling
• Framer Motion for animations

**AI Features Demonstrated:**
• **This Chat** - A RAG-like system that answers questions from resume data
• **Slash Command Demo** - Interactive demonstration of AI workflows
• **AI Terminal** - Shows real-time AI development patterns

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

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hey! 👋 I'm a RAG-powered assistant built into this portfolio. I have access to Santiago's resume and can answer questions about his experience, skills, and AI expertise.\n\nThis chat demonstrates how **Retrieval Augmented Generation** works - I retrieve relevant information from a knowledge base to answer your questions.\n\nTry asking me something!`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Only scroll after user has interacted with the chat
  useEffect(() => {
    if (hasInteracted) {
      scrollToBottom();
    }
  }, [messages, hasInteracted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    setHasInteracted(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    const response = generateResponse(userMessage.content);

    // Simulate typing effect
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleSuggestionClick = (question: string) => {
    setHasInteracted(true);
    setInput(question);
    inputRef.current?.focus();
  };

  return (
    <section id="ai-chat" className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">RAG-Powered Chat</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Ask Me Anything
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This chat demonstrates <strong>Retrieval Augmented Generation</strong> - it retrieves relevant information from my resume to answer your questions. Try it out!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-background border rounded-xl shadow-lg overflow-hidden">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b bg-muted/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Santiago's AI Assistant</h3>
                <p className="text-sm text-muted-foreground">Powered by RAG • Knowledge base: Resume data</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-muted-foreground">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-6 space-y-4">
              <AnimatePresence mode="popLayout">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}>
                      {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}>
                      <div className="text-sm whitespace-pre-wrap prose prose-sm dark:prose-invert max-w-none [&_strong]:font-semibold [&_code]:bg-background/50 [&_code]:px-1 [&_code]:rounded">
                        {message.content.split('\n').map((line, i) => (
                          <span key={i}>
                            {line.split(/(\*\*[^*]+\*\*|\`[^`]+\`)/g).map((part, j) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={j}>{part.slice(2, -2)}</strong>;
                              }
                              if (part.startsWith('`') && part.endsWith('`')) {
                                return <code key={j} className="bg-background/50 px-1 rounded text-xs">{part.slice(1, -1)}</code>;
                              }
                              return part;
                            })}
                            {i < message.content.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            <div className="px-6 py-3 border-t bg-muted/30">
              <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(question)}
                    className="text-xs px-3 py-1.5 rounded-full bg-background border hover:bg-muted transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about experience, skills, AI expertise..."
                  className="flex-1 px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  disabled={isTyping}
                />
                <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
