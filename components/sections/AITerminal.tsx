'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TerminalLine {
  text: string;
  type: 'command' | 'output' | 'success' | 'info' | 'warning' | 'code' | 'comment';
  delay?: number;
}

const aiWorkflowDemo: TerminalLine[] = [
  { text: '# AI-Assisted Development Workflow Demo', type: 'comment', delay: 0 },
  { text: '# Watch how I use AI tools in my daily workflow', type: 'comment', delay: 100 },
  { text: '', type: 'output', delay: 200 },
  { text: '$ claude --version', type: 'command', delay: 500 },
  { text: 'Claude Code v1.0.23 (claude-opus-4-5-20251101)', type: 'output', delay: 200 },
  { text: '', type: 'output', delay: 100 },
  { text: '$ claude "analyze this codebase and suggest improvements"', type: 'command', delay: 800 },
  { text: '', type: 'output', delay: 200 },
  { text: '🔍 Analyzing codebase structure...', type: 'info', delay: 400 },
  { text: '   ├── Reading package.json', type: 'output', delay: 200 },
  { text: '   ├── Scanning src/ directory (47 files)', type: 'output', delay: 300 },
  { text: '   ├── Analyzing TypeScript configuration', type: 'output', delay: 200 },
  { text: '   └── Building dependency graph', type: 'output', delay: 400 },
  { text: '', type: 'output', delay: 100 },
  { text: '📊 Analysis Complete! Here are my findings:', type: 'success', delay: 500 },
  { text: '', type: 'output', delay: 100 },
  { text: '## Code Quality', type: 'info', delay: 300 },
  { text: '✅ TypeScript strict mode enabled', type: 'success', delay: 150 },
  { text: '✅ ESLint configured with recommended rules', type: 'success', delay: 150 },
  { text: '⚠️  3 components missing proper error boundaries', type: 'warning', delay: 200 },
  { text: '', type: 'output', delay: 100 },
  { text: '## Suggested Improvements', type: 'info', delay: 300 },
  { text: '1. Add React.Suspense boundaries for async components', type: 'output', delay: 200 },
  { text: '2. Implement proper loading states in data fetching', type: 'output', delay: 200 },
  { text: '3. Consider extracting shared hooks to /hooks directory', type: 'output', delay: 200 },
  { text: '', type: 'output', delay: 100 },
  { text: '$ claude "implement error boundary for the Dashboard"', type: 'command', delay: 1000 },
  { text: '', type: 'output', delay: 200 },
  { text: '🚀 Generating error boundary...', type: 'info', delay: 400 },
  { text: '', type: 'output', delay: 100 },
  { text: '// components/ErrorBoundary.tsx', type: 'code', delay: 300 },
  { text: 'class ErrorBoundary extends React.Component<Props, State> {', type: 'code', delay: 100 },
  { text: '  state = { hasError: false, error: null };', type: 'code', delay: 100 },
  { text: '', type: 'code', delay: 50 },
  { text: '  static getDerivedStateFromError(error: Error) {', type: 'code', delay: 100 },
  { text: '    return { hasError: true, error };', type: 'code', delay: 100 },
  { text: '  }', type: 'code', delay: 100 },
  { text: '', type: 'code', delay: 50 },
  { text: '  render() {', type: 'code', delay: 100 },
  { text: '    if (this.state.hasError) {', type: 'code', delay: 100 },
  { text: '      return <ErrorFallback error={this.state.error} />;', type: 'code', delay: 100 },
  { text: '    }', type: 'code', delay: 100 },
  { text: '    return this.props.children;', type: 'code', delay: 100 },
  { text: '  }', type: 'code', delay: 100 },
  { text: '}', type: 'code', delay: 100 },
  { text: '', type: 'output', delay: 100 },
  { text: '✅ Created: components/ErrorBoundary.tsx', type: 'success', delay: 300 },
  { text: '✅ Updated: components/Dashboard.tsx (wrapped with ErrorBoundary)', type: 'success', delay: 200 },
  { text: '', type: 'output', delay: 100 },
  { text: '$ npm run test', type: 'command', delay: 800 },
  { text: '', type: 'output', delay: 200 },
  { text: 'PASS  src/components/ErrorBoundary.test.tsx', type: 'success', delay: 400 },
  { text: 'PASS  src/components/Dashboard.test.tsx', type: 'success', delay: 200 },
  { text: '', type: 'output', delay: 100 },
  { text: 'Test Suites: 2 passed, 2 total', type: 'output', delay: 200 },
  { text: 'Tests:       8 passed, 8 total', type: 'output', delay: 100 },
  { text: 'Time:        2.34s', type: 'output', delay: 100 },
  { text: '', type: 'output', delay: 100 },
  { text: '$ git add . && git commit -m "feat: add error boundaries"', type: 'command', delay: 600 },
  { text: '[main 3f7a2b1] feat: add error boundaries', type: 'output', delay: 300 },
  { text: ' 3 files changed, 47 insertions(+)', type: 'output', delay: 200 },
  { text: '', type: 'output', delay: 100 },
  { text: '✨ AI-assisted development complete!', type: 'success', delay: 500 },
  { text: '', type: 'output', delay: 100 },
  { text: '# This workflow demonstrates:', type: 'comment', delay: 400 },
  { text: '# • Codebase analysis with Claude Code', type: 'comment', delay: 200 },
  { text: '# • Intelligent code generation', type: 'comment', delay: 200 },
  { text: '# • Automated testing integration', type: 'comment', delay: 200 },
  { text: '# • Seamless git workflow', type: 'comment', delay: 200 },
];

export function AITerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying && currentIndex < aiWorkflowDemo.length) {
      const currentLine = aiWorkflowDemo[currentIndex];
      const delay = currentLine.delay || 100;

      timeoutRef.current = setTimeout(() => {
        setLines(prev => [...prev, currentLine]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    } else if (currentIndex >= aiWorkflowDemo.length) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentIndex]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handlePlay = () => {
    if (currentIndex >= aiWorkflowDemo.length) {
      setLines([]);
      setCurrentIndex(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setLines([]);
    setCurrentIndex(0);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command': return 'text-green-400';
      case 'success': return 'text-emerald-400';
      case 'info': return 'text-blue-400';
      case 'warning': return 'text-yellow-400';
      case 'code': return 'text-purple-300';
      case 'comment': return 'text-gray-500';
      default: return 'text-gray-300';
    }
  };

  return (
    <section id="ai-terminal" className="py-20 bg-muted/30">
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
            <span className="text-sm font-medium">Live Demo</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            AI Development Workflow
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch a real-world example of how I use AI tools like Claude Code
            to analyze, generate, and improve code in my daily workflow.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-[#0d1117] rounded-xl overflow-hidden border border-[#30363d] shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
                </div>
                <span className="text-sm text-gray-400 font-mono">
                  ai-workflow-demo ~ zsh
                </span>
              </div>
              <div className="flex items-center gap-2">
                {!isPlaying ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handlePlay}
                    className="text-gray-400 hover:text-white hover:bg-[#30363d]"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    {currentIndex > 0 && currentIndex < aiWorkflowDemo.length ? 'Resume' : 'Play'}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handlePause}
                    className="text-gray-400 hover:text-white hover:bg-[#30363d]"
                  >
                    <Pause className="w-4 h-4 mr-1" />
                    Pause
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleReset}
                  className="text-gray-400 hover:text-white hover:bg-[#30363d]"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Terminal Content */}
            <div
              ref={terminalRef}
              className="p-4 h-[500px] overflow-y-auto font-mono text-sm"
            >
              {lines.length === 0 && !isPlaying && (
                <div className="text-gray-500 text-center py-20">
                  <Sparkles className="w-8 h-8 mx-auto mb-4 opacity-50" />
                  <p>Click "Play" to start the AI workflow demo</p>
                  <p className="text-xs mt-2 text-gray-600">
                    This demonstrates real-world Claude Code usage patterns
                  </p>
                </div>
              )}
              {lines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                  className={`${getLineColor(line.type)} ${line.type === 'code' ? 'pl-4 border-l-2 border-purple-500/30' : ''}`}
                >
                  {line.text || '\u00A0'}
                </motion.div>
              ))}
              {isPlaying && (
                <span className="text-green-400 animate-pulse">▊</span>
              )}
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-[#161b22]">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${(currentIndex / aiWorkflowDemo.length) * 100}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Codebase Analysis', icon: '🔍' },
              { label: 'Code Generation', icon: '🚀' },
              { label: 'Auto Testing', icon: '🧪' },
              { label: 'Git Integration', icon: '📦' },
            ].map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="text-center p-4 rounded-lg border bg-background"
              >
                <span className="text-2xl">{feature.icon}</span>
                <p className="text-sm font-medium mt-2">{feature.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
