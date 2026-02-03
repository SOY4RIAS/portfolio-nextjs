'use client';

import { resumeData } from '@/data/resume';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export function EducationSection() {
  if (!resumeData.education || resumeData.education.length === 0) return null;

  return (
    <section id="education" className="container py-20 bg-muted/30">
        <h2 className="text-3xl font-bold tracking-tight mb-10 text-center">
          Education
        </h2>
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {resumeData.education.map((edu, index) => (
             <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                             <div>
                                <CardTitle className="text-lg">{edu.school}</CardTitle>
                                <CardDescription className="text-base font-medium">{edu.degree}</CardDescription>
                             </div>
                             <Badge variant="secondary" className="w-fit whitespace-nowrap">{edu.period}</Badge>
                        </div>
                    </CardHeader>
                </Card>
             </motion.div>
          ))}
        </div>
    </section>
  )
}
