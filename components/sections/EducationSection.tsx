'use client';

import { resumeData } from '@/data/resume';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function EducationSection() {
  if (!resumeData.education || resumeData.education.length === 0) return null;

  return (
    <section id="education" className="container py-20">
        <h2 className="text-3xl font-bold tracking-tight mb-10 text-center">
          Education
        </h2>
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {resumeData.education.map((edu, index) => (
             <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                             <div>
                                <CardTitle className="text-lg">{edu.school}</CardTitle>
                                <CardDescription className="text-base font-medium text-muted-foreground">{edu.degree}</CardDescription>
                             </div>
                             <Badge variant="secondary" className="w-fit whitespace-nowrap bg-muted text-foreground">{edu.period}</Badge>
                        </div>
                    </CardHeader>
                </Card>
             </div>
          ))}
        </div>
    </section>
  )
}
