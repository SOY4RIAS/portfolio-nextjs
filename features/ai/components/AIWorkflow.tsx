'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Code, CheckCircle, ArrowRight, Lightbulb, Wrench, Shield, Sparkles } from 'lucide-react';

// Types colocated with component

interface WorkflowPhase {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  aiTools: string[];
  activities: string[];
  output: string;
}

const workflowPhases: WorkflowPhase[] = [
  {
    id: 'planning',
    title: 'Planning',
    icon: <Lightbulb className="w-6 h-6" />,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    description: 'AI-assisted requirement analysis and task breakdown',
    aiTools: ['Claude Code', 'ChatGPT', 'Custom Prompts'],
    activities: [
      'Analyze requirements with LLM',
      'Break down into atomic tasks',
      'Identify edge cases',
      'Estimate complexity',
      'Define acceptance criteria'
    ],
    output: 'Detailed implementation plan with prioritized tasks'
  },
  {
    id: 'coding',
    title: 'Coding',
    icon: <Wrench className="w-6 h-6" />,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    description: 'Intelligent pair programming with AI assistants',
    aiTools: ['Claude Code', 'Cursor', 'GitHub Copilot'],
    activities: [
      'Generate boilerplate code',
      'Implement business logic',
      'Write type definitions',
      'Create helper functions',
      'Refactor for clarity'
    ],
    output: 'Clean, type-safe code following best practices'
  },
  {
    id: 'review',
    title: 'Review',
    icon: <Shield className="w-6 h-6" />,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    description: 'AI-powered code review and quality assurance',
    aiTools: ['Claude Code', 'Custom Review Prompts', 'Automated Tests'],
    activities: [
      'Security vulnerability scan',
      'Performance analysis',
      'Code style review',
      'Generate test cases',
      'Documentation generation'
    ],
    output: 'Production-ready code with comprehensive tests'
  }
];

export function AIWorkflow() {
  const [activePhase, setActivePhase] = useState<string>('planning');
  const [isAnimating, setIsAnimating] = useState(false);

  const runWorkflow = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    for (const phase of workflowPhases) {
      setActivePhase(phase.id);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    setIsAnimating(false);
  };

  const currentPhase = workflowPhases.find(p => p.id === activePhase)!;

  return (
    <section id="ai-workflow" className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Brain className="w-4 h-4" />
            <span className="text-sm font-medium">Development Philosophy</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Planning → Coding → Review
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My AI-first development methodology integrates artificial intelligence
            into every phase of the software development lifecycle.
          </p>
        </motion.div>

        {/* Workflow Navigation */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-4">
            {workflowPhases.map((phase, index) => (
              <div key={phase.id} className="flex items-center">
                <motion.button
                  onClick={() => setActivePhase(phase.id)}
                  className={`relative flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all ${
                    activePhase === phase.id
                      ? `${phase.bgColor} ${phase.borderColor} ${phase.color}`
                      : 'bg-muted/50 border-transparent hover:border-muted-foreground/20'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`p-2 rounded-lg ${activePhase === phase.id ? phase.bgColor : 'bg-muted'}`}>
                    <span className={activePhase === phase.id ? phase.color : 'text-muted-foreground'}>
                      {phase.icon}
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="font-semibold block">{phase.title}</span>
                    <span className="text-xs text-muted-foreground">Phase {index + 1}</span>
                  </div>
                  {activePhase === phase.id && isAnimating && (
                    <motion.div
                      className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${phase.color.replace('text-', 'bg-')}`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  )}
                </motion.button>
                {index < workflowPhases.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-muted-foreground mx-2" />
                )}
              </div>
            ))}
          </div>

          {/* Auto-run button */}
          <div className="flex justify-center mt-6">
            <motion.button
              onClick={runWorkflow}
              disabled={isAnimating}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isAnimating
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
              whileHover={!isAnimating ? { scale: 1.02 } : {}}
              whileTap={!isAnimating ? { scale: 0.98 } : {}}
            >
              <Sparkles className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
              {isAnimating ? 'Running workflow...' : 'Run workflow animation'}
            </motion.button>
          </div>
        </div>

        {/* Phase Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto"
          >
            <div className={`grid md:grid-cols-3 gap-6 p-8 rounded-2xl border-2 ${currentPhase.bgColor} ${currentPhase.borderColor}`}>
              {/* Description */}
              <div className="md:col-span-3 text-center pb-6 border-b border-current/10">
                <h3 className={`text-2xl font-bold mb-2 ${currentPhase.color}`}>
                  {currentPhase.title} Phase
                </h3>
                <p className="text-muted-foreground">{currentPhase.description}</p>
              </div>

              {/* AI Tools */}
              <div>
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  AI Tools Used
                </h4>
                <ul className="space-y-2">
                  {currentPhase.aiTools.map((tool, i) => (
                    <motion.li
                      key={tool}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${currentPhase.color.replace('text-', 'bg-')}`} />
                      {tool}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Activities */}
              <div>
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Key Activities
                </h4>
                <ul className="space-y-2">
                  {currentPhase.activities.map((activity, i) => (
                    <motion.li
                      key={activity}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CheckCircle className={`w-4 h-4 ${currentPhase.color}`} />
                      {activity}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Output */}
              <div>
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Phase Output
                </h4>
                <div className={`p-4 rounded-lg bg-background/50 border ${currentPhase.borderColor}`}>
                  <p className="text-sm">{currentPhase.output}</p>
                </div>

                {/* Transition indicator */}
                {activePhase !== 'review' && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="w-4 h-4" />
                    <span>Feeds into next phase</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-bold text-center mb-8">Why This Workflow Works</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Faster Delivery', value: '3x', description: 'Development speed increase' },
              { label: 'Fewer Bugs', value: '70%', description: 'Reduction in production issues' },
              { label: 'Better Coverage', value: '95%', description: 'Test coverage achieved' },
              { label: 'Code Quality', value: 'A+', description: 'Maintainability score' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl border bg-muted/30"
              >
                <span className="text-3xl font-bold text-primary">{stat.value}</span>
                <h4 className="font-semibold mt-2">{stat.label}</h4>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
