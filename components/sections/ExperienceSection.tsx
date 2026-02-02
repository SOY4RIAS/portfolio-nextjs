'use client';

import { resumeData } from '@/data/resume';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export function ExperienceSection() {
  return (
    <section id="experience" className="container py-20">
      <h2 className="text-3xl font-bold tracking-tight mb-10 text-center">
        Professional Experience
      </h2>
      <div className="flex flex-col gap-8">
        {resumeData.experience.map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="border-l-4 border-l-primary/50 hover:border-l-primary transition-all">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <CardTitle className="text-xl">{job.role}</CardTitle>
                    <CardDescription className="text-lg font-medium text-foreground/80">
                      {job.company}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="w-fit text-sm">
                    {job.period}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">{job.description}</p>
                <ul className="list-disc pl-5 mb-4 space-y-1 text-sm">
                  {job.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {job.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
