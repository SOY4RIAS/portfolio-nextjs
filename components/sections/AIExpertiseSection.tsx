'use client';

import { resumeData } from '@/data/resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Cpu, Code2, Database } from 'lucide-react';

export function AIExpertiseSection() {
  const getIcon = (title: string) => {
    if (title.includes("Workflow")) return <Code2 className="h-6 w-6" />;
    if (title.includes("Context")) return <Brain className="h-6 w-6" />;
    return <Cpu className="h-6 w-6" />;
  };

  return (
    <section id="ai-expertise" className="container py-24 bg-muted/20">
      <div className="flex flex-col items-start gap-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tight">AI Engineering & Expertise</h2>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Leveraging cutting-edge large language models and modern tooling to redefine development workflows and build intelligent applications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resumeData.aiExpertise.map((area, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl border border-border bg-background p-6 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
             style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                {getIcon(area.title)}
            </div>

            <h3 className="text-xl font-semibold mb-3 flex items-center gap-3">
                <span className="p-2 rounded-md bg-muted text-foreground">
                    {getIcon(area.title)}
                </span>
                {area.title}
            </h3>

            <p className="text-muted-foreground mb-6">
                {area.description}
            </p>

            <div className="flex flex-col gap-3">
                {area.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
                        <span className="text-sm font-medium">{item}</span>
                    </div>
                ))}
            </div>
          </div>
        ))}

        {/* Bento Grid style 'Skills' block */}
         <div className="col-span-1 md:col-span-2 mt-4">
            <h3 className="text-xl font-bold mb-6">Tooling & Technologies</h3>
            <div className="flex flex-wrap gap-2">
                {resumeData.skills.filter(s => s.category === "AI").map((skill, i) => (
                    <Badge
                        key={i}
                        variant="secondary"
                        className="text-md py-2 px-4 hover:bg-foreground hover:text-background transition-colors cursor-default animate-fade-in"
                        style={{ animationDelay: `${i * 50 + 500}ms` }}
                    >
                        {skill.name}
                    </Badge>
                ))}
            </div>
         </div>
      </div>
    </section>
  );
}
