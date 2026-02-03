'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, Building2, CheckCircle, Code } from 'lucide-react';

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Briefcase className="w-4 h-4" />
            <span className="text-sm font-medium">Career Journey</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Work Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            8+ years of professional experience building production applications,
            leading teams, and driving technical excellence.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

          {resumeData.experience.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative mb-8 md:mb-12 ${
                index % 2 === 0 ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%] md:ml-auto'
              }`}
            >
              {/* Timeline dot */}
              <div className={`absolute top-6 w-4 h-4 rounded-full border-4 border-background bg-primary z-10 ${
                index % 2 === 0 ? 'left-0 md:left-1/2 md:-translate-x-1/2' : 'left-0 md:left-1/2 md:-translate-x-1/2'
              }`} />

              {/* Content card */}
              <div className={`ml-8 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className={`flex flex-col gap-2 ${index % 2 === 0 ? 'md:items-end' : ''}`}>
                      {/* Period badge */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span className="font-mono">{job.period}</span>
                      </div>

                      {/* Role */}
                      <CardTitle className="text-xl">{job.role}</CardTitle>

                      {/* Company */}
                      <div className="flex items-center gap-2 text-primary">
                        <Building2 className="w-4 h-4" />
                        <span className="font-semibold">{job.company}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Description */}
                    <p className={`text-sm text-muted-foreground ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      {job.description}
                    </p>

                    {/* Achievements */}
                    <div>
                      <h4 className={`text-sm font-semibold mb-2 flex items-center gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Key Achievements
                      </h4>
                      <ul className={`space-y-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                        {job.achievements.slice(0, 3).map((achievement, i) => (
                          <li key={i} className="text-sm text-muted-foreground">
                            {achievement}
                          </li>
                        ))}
                        {job.achievements.length > 3 && (
                          <li className="text-xs text-muted-foreground/60">
                            +{job.achievements.length - 3} more achievements
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Tech stack */}
                    <div>
                      <h4 className={`text-sm font-semibold mb-2 flex items-center gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <Code className="w-4 h-4 text-blue-500" />
                        Tech Stack
                      </h4>
                      <div className={`flex flex-wrap gap-1 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        {job.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Years Experience', value: '8+' },
              { label: 'Companies', value: '7' },
              { label: 'Team Size Led', value: '30' },
              { label: 'Projects Delivered', value: '50+' },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-background border">
                <span className="text-2xl font-bold text-primary">{stat.value}</span>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
