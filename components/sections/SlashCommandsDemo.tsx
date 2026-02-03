'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Zap, Code, FileSearch, TestTube, BookOpen, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SlashCommand {
  command: string;
  description: string;
  icon: React.ReactNode;
  output: string[];
  category: 'planning' | 'coding' | 'review';
}

const slashCommands: SlashCommand[] = [
  {
    command: '/plan',
    description: 'Break down a feature into actionable tasks',
    icon: <FileSearch className="w-4 h-4" />,
    category: 'planning',
    output: [
      '📋 Planning: User Authentication Feature',
      '',
      '## Analysis',
      'Breaking down the authentication feature into tasks...',
      '',
      '## Tasks Generated:',
      '1. [ ] Set up authentication provider (NextAuth.js)',
      '2. [ ] Create login/signup pages with form validation',
      '3. [ ] Implement JWT token management',
      '4. [ ] Add protected route middleware',
      '5. [ ] Create user session context',
      '6. [ ] Write unit tests for auth flows',
      '',
      '## Dependencies Identified:',
      '- next-auth@5.x',
      '- @auth/prisma-adapter',
      '- bcryptjs',
      '',
      '✅ Plan complete. Ready to start implementation.',
    ]
  },
  {
    command: '/code',
    description: 'Generate code with AI assistance',
    icon: <Code className="w-4 h-4" />,
    category: 'coding',
    output: [
      '🚀 Generating: Authentication Middleware',
      '',
      '```typescript',
      '// middleware.ts',
      'import { NextResponse } from "next/server";',
      'import { getToken } from "next-auth/jwt";',
      'import type { NextRequest } from "next/server";',
      '',
      'const protectedRoutes = ["/dashboard", "/profile"];',
      '',
      'export async function middleware(req: NextRequest) {',
      '  const token = await getToken({ req });',
      '  const isProtected = protectedRoutes.some(',
      '    (route) => req.nextUrl.pathname.startsWith(route)',
      '  );',
      '',
      '  if (isProtected && !token) {',
      '    return NextResponse.redirect(',
      '      new URL("/login", req.url)',
      '    );',
      '  }',
      '',
      '  return NextResponse.next();',
      '}',
      '```',
      '',
      '✅ Code generated. Review and adjust as needed.',
    ]
  },
  {
    command: '/review',
    description: 'AI-powered code review and suggestions',
    icon: <TestTube className="w-4 h-4" />,
    category: 'review',
    output: [
      '🔍 Code Review: authentication.ts',
      '',
      '## Security Analysis:',
      '✅ JWT tokens properly validated',
      '✅ Password hashing uses bcrypt with salt',
      '⚠️ Consider adding rate limiting to login endpoint',
      '',
      '## Performance:',
      '✅ Token caching implemented correctly',
      '⚠️ Suggestion: Add request deduplication',
      '',
      '## Best Practices:',
      '✅ TypeScript types are comprehensive',
      '✅ Error handling follows conventions',
      '💡 Consider extracting magic strings to constants',
      '',
      '## Suggested Improvements:',
      '```diff',
      '- const TOKEN_EXPIRY = 3600;',
      '+ const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY ?? 3600;',
      '```',
      '',
      '📊 Overall Score: 8.5/10',
    ]
  },
  {
    command: '/test',
    description: 'Generate comprehensive test cases',
    icon: <TestTube className="w-4 h-4" />,
    category: 'review',
    output: [
      '🧪 Generating Tests: Authentication Module',
      '',
      '```typescript',
      'describe("Authentication", () => {',
      '  describe("login", () => {',
      '    it("should authenticate valid credentials", async () => {',
      '      const result = await login({',
      '        email: "test@example.com",',
      '        password: "validPassword123"',
      '      });',
      '      expect(result.success).toBe(true);',
      '      expect(result.token).toBeDefined();',
      '    });',
      '',
      '    it("should reject invalid password", async () => {',
      '      await expect(login({',
      '        email: "test@example.com",',
      '        password: "wrong"',
      '      })).rejects.toThrow("Invalid credentials");',
      '    });',
      '',
      '    it("should rate limit after 5 attempts", async () => {',
      '      // Test implementation...',
      '    });',
      '  });',
      '});',
      '```',
      '',
      '✅ Generated 12 test cases. Coverage: 94%',
    ]
  },
  {
    command: '/doc',
    description: 'Auto-generate documentation',
    icon: <BookOpen className="w-4 h-4" />,
    category: 'review',
    output: [
      '📚 Generating Documentation',
      '',
      '# Authentication API',
      '',
      '## Overview',
      'This module handles user authentication using JWT tokens.',
      '',
      '## Endpoints',
      '',
      '### POST /api/auth/login',
      'Authenticates a user and returns a JWT token.',
      '',
      '**Request Body:**',
      '```json',
      '{',
      '  "email": "string",',
      '  "password": "string"',
      '}',
      '```',
      '',
      '**Response:**',
      '```json',
      '{',
      '  "token": "string",',
      '  "user": { "id": "string", "email": "string" }',
      '}',
      '```',
      '',
      '✅ Documentation generated for 4 endpoints.',
    ]
  },
];

export function SlashCommandsDemo() {
  const [selectedCommand, setSelectedCommand] = useState<SlashCommand | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const runCommand = async (command: SlashCommand) => {
    setSelectedCommand(command);
    setIsRunning(true);
    setOutputLines([]);
    setCurrentLineIndex(0);

    // Simulate typing effect
    for (let i = 0; i < command.output.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
      setOutputLines(prev => [...prev, command.output[i]]);
      setCurrentLineIndex(i + 1);
    }

    setIsRunning(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'planning': return 'text-blue-500 bg-blue-500/10';
      case 'coding': return 'text-green-500 bg-green-500/10';
      case 'review': return 'text-amber-500 bg-amber-500/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  return (
    <section id="slash-commands" className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Terminal className="w-4 h-4" />
            <span className="text-sm font-medium">Interactive Demo</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Slash Commands in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I create custom slash commands to accelerate AI-assisted development.
            Click any command below to see it in action.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Commands List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Available Commands</h3>
            {slashCommands.map((cmd, index) => (
              <motion.button
                key={cmd.command}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                viewport={{ once: true }}
                onClick={() => runCommand(cmd)}
                disabled={isRunning}
                className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all text-left ${
                  selectedCommand?.command === cmd.command
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className={`p-2 rounded-lg ${getCategoryColor(cmd.category)}`}>
                  {cmd.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <code className="font-mono font-semibold">{cmd.command}</code>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(cmd.category)}`}>
                      {cmd.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{cmd.description}</p>
                </div>
                <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${
                  selectedCommand?.command === cmd.command ? 'rotate-90' : ''
                }`} />
              </motion.button>
            ))}
          </motion.div>

          {/* Terminal Output */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Output</h3>
            <div className="bg-[#0d1117] rounded-xl overflow-hidden border border-[#30363d] shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
                </div>
                <span className="text-sm text-gray-400 ml-2 font-mono">
                  claude-code ~ {selectedCommand ? selectedCommand.command : 'ready'}
                </span>
                {isRunning && (
                  <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse ml-auto" />
                )}
              </div>

              {/* Terminal Content */}
              <div className="p-4 h-[400px] overflow-y-auto font-mono text-sm">
                {!selectedCommand ? (
                  <div className="text-gray-500">
                    <p>Welcome to the Slash Commands demo!</p>
                    <p className="mt-2">Click a command on the left to see it in action.</p>
                    <p className="mt-4 text-gray-600">
                      $ <span className="animate-pulse">_</span>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-0">
                    <p className="text-green-400">$ {selectedCommand.command}</p>
                    <AnimatePresence mode="popLayout">
                      {outputLines.map((line, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.1 }}
                          className={`${
                            line.startsWith('```') ? 'text-gray-500' :
                            line.startsWith('#') ? 'text-blue-400 font-bold' :
                            line.startsWith('✅') ? 'text-green-400' :
                            line.startsWith('⚠️') ? 'text-yellow-400' :
                            line.startsWith('💡') ? 'text-purple-400' :
                            line.startsWith('📋') || line.startsWith('🚀') || line.startsWith('🔍') || line.startsWith('🧪') || line.startsWith('📚') ? 'text-cyan-400 font-bold' :
                            line.startsWith('-') || line.startsWith('+') ? (line.startsWith('-') ? 'text-red-400' : 'text-green-400') :
                            line.includes('[ ]') ? 'text-gray-300' :
                            'text-gray-300'
                          }`}
                        >
                          {line || '\u00A0'}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {isRunning && (
                      <span className="text-gray-400 animate-pulse">▊</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Workflow Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-3 gap-4">
            {[
              { phase: 'Planning', icon: <FileSearch className="w-5 h-5" />, color: 'blue', commands: ['/plan'] },
              { phase: 'Coding', icon: <Code className="w-5 h-5" />, color: 'green', commands: ['/code'] },
              { phase: 'Review', icon: <TestTube className="w-5 h-5" />, color: 'amber', commands: ['/review', '/test', '/doc'] },
            ].map((item, index) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl border bg-muted/30"
              >
                <div className={`inline-flex p-3 rounded-full bg-${item.color}-500/10 text-${item.color}-500 mb-3`}>
                  {item.icon}
                </div>
                <h4 className="font-semibold mb-2">{item.phase}</h4>
                <div className="flex flex-wrap justify-center gap-1">
                  {item.commands.map(cmd => (
                    <code key={cmd} className="text-xs px-2 py-1 rounded bg-muted">{cmd}</code>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
