'use client';

import { resumeData } from '@/data/resume';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ExperienceSection() {
  return (
    <section id="experience" className="container py-24">
      <h2 className="text-3xl font-bold tracking-tight mb-12 text-left">
        Work Experience
      </h2>
      <div className="relative border-l border-border/50 ml-3 md:ml-6 space-y-12 pb-4">
        {resumeData.experience.map((job, index) => (
          <div key={index} className="relative pl-8 md:pl-12 group">
            {/* Timeline dot */}
            <div className="absolute -left-[5px] top-2 h-3 w-3 rounded-full border border-border bg-background group-hover:bg-foreground transition-colors duration-300" />

            <div className="flex flex-col gap-2 mb-4 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3 className="text-xl font-semibold tracking-tight group-hover:text-foreground/80 transition-colors">
                        {job.role}
                    </h3>
                    <span className="text-sm text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                        {job.period}
                    </span>
                </div>
                <div className="text-lg font-medium text-foreground">
                    {job.company}
                </div>
                <p className="text-muted-foreground max-w-3xl leading-relaxed">
                    {job.description}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: `${index * 100 + 100}ms` }}>
                <Card className="bg-muted/10 hover:bg-muted/30 transition-all border-border/60 hover:border-foreground/20">
                    <CardHeader className="pb-2">
                         <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-4 space-y-2 text-sm text-foreground/90">
                            {job.achievements.map((achievement, i) => (
                                <li key={i}>{achievement}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                 <Card className="bg-muted/10 hover:bg-muted/30 transition-all border-border/60 hover:border-foreground/20 flex flex-col justify-center">
                    <CardHeader className="pb-2">
                         <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tech Stack</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {job.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="bg-background/50 hover:bg-background border-border hover:border-foreground transition-colors">
                                {tech}
                            </Badge>
                        ))}
                    </CardContent>
                </Card>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
