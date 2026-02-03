'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { Badge } from '@/components/ui/badge';
import { Brain, Cpu, Code2, Sparkles, Terminal, Workflow, Database, Zap } from 'lucide-react';

export function AIExpertiseSection() {
  const getIcon = (title: string) => {
    if (title.includes("Workflow")) return <Workflow className="h-6 w-6" />;
    if (title.includes("Slash") || title.includes("Commands")) return <Terminal className="h-6 w-6" />;
    if (title.includes("RAG") || title.includes("Context")) return <Database className="h-6 w-6" />;
    if (title.includes("Integration") || title.includes("Architecture")) return <Zap className="h-6 w-6" />;
    return <Brain className="h-6 w-6" />;
  };

  const getGradient = (index: number) => {
    const gradients = [
      'from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20',
      'from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20',
      'from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20',
      'from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20',
    ];
    return gradients[index % gradients.length];
  };

  const getIconColor = (index: number) => {
    const colors = ['text-blue-500', 'text-purple-500', 'text-amber-500', 'text-green-500'];
    return colors[index % colors.length];
  };

  return (
    <section id="ai-expertise" className="py-20">
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
            <span className="text-sm font-medium">AI Expertise</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            AI Engineering & Integration
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Leveraging cutting-edge AI tools and techniques to build intelligent applications
            and optimize development workflows.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {resumeData.aiExpertise.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${getGradient(index)} p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
            >
              {/* Background icon */}
              <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <div className="w-32 h-32">
                  {getIcon(area.title)}
                </div>
              </div>

              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-background/50 ${getIconColor(index)}`}>
                  {getIcon(area.title)}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{area.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{area.description}</p>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3 relative">
                {area.items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 + 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-background/50 transition-colors"
                  >
                    <Sparkles className={`w-4 h-4 mt-0.5 ${getIconColor(index)}`} />
                    <span className="text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Skills Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-bold text-center mb-8">AI Tools & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {resumeData.skills.filter(s => s.category === "AI").map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Badge
                  variant="outline"
                  className="text-md py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                >
                  <Cpu className="w-3 h-3 mr-2" />
                  {skill.name}
                  {skill.level && (
                    <span className="ml-2 text-xs opacity-60">({skill.level})</span>
                  )}
                </Badge>
              </motion.div>
            ))}
          </div>

          {/* Additional context */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-8 p-6 rounded-xl bg-muted/50 border text-center"
          >
            <p className="text-muted-foreground">
              <strong className="text-foreground">This portfolio itself</strong> is a demonstration of AI-augmented development.
              Built with Next.js 16, it features interactive RAG-powered chat, slash command demos,
              and real-time AI workflow visualizations.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
