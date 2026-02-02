'use client';

import { resumeData } from '@/data/resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Brain, Cpu, Sparkles } from 'lucide-react';

export function AIExpertiseSection() {
  const icons = [Brain, Cpu, Sparkles];

  return (
    <section id="ai-expertise" className="bg-secondary/20 py-20">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">
          AI Expertise & Integration
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Leveraging cutting-edge AI tools to enhance development workflows and create intelligent applications.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {resumeData.aiExpertise.map((area, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-muted-foreground/10 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-6 text-muted-foreground">{area.description}</p>
                    <div className="space-y-3">
                      {area.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span className="text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex flex-wrap gap-2 justify-center max-w-3xl">
            {resumeData.skills.filter(s => s.category === 'AI').map((skill, i) => (
               <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Badge variant="vibrant" className="text-md py-1 px-3">
                  {skill.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
