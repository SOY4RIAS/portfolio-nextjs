"use client";

import { resumeData } from "@/data/resume";
import { Badge } from "@/components/ui/badge";
import { Spotlight } from "@/components/ui/Spotlight";
import { motion } from "framer-motion";

export function ExperienceSection() {
  return (
    <section id="experience" className="container py-32 relative">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
        <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
          Work Logs
        </h2>
        <span className="font-mono text-accent text-sm tracking-widest uppercase mt-4 md:mt-0">
          // Career Trajectory
        </span>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {resumeData.experience.map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Spotlight className="h-full bg-neutral-900/50 border-neutral-800 p-8 md:p-12 relative overflow-hidden">
                {/* Large Index Number */}
                <div className="absolute top-0 right-0 p-8 opacity-10 font-heading text-9xl font-bold leading-none select-none">
                    0{index + 1}
                </div>

                <div className="relative z-10 grid md:grid-cols-[1fr_2fr] gap-10">
                    <div className="space-y-4">
                         <div className="space-y-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                                {job.role}
                            </h3>
                            <div className="text-xl text-accent font-medium">
                                {job.company}
                            </div>
                        </div>
                        <div className="font-mono text-sm text-muted-foreground border border-white/10 inline-block px-3 py-1 rounded-full">
                            {job.period}
                        </div>

                        <div className="flex flex-wrap gap-2 pt-4">
                            {job.technologies.slice(0, 5).map((tech) => (
                                <Badge key={tech} variant="secondary" className="bg-white/5 hover:bg-white/10 text-neutral-300 border-transparent rounded-sm font-mono text-xs">
                                    {tech}
                                </Badge>
                            ))}
                             {job.technologies.length > 5 && (
                                <Badge variant="outline" className="text-xs border-white/10 text-muted-foreground">+{job.technologies.length - 5}</Badge>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <p className="text-lg text-neutral-300 leading-relaxed font-light">
                            {job.description}
                        </p>

                        <div className="space-y-3">
                            <h4 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Key Protocols</h4>
                             <ul className="grid gap-3">
                                {job.achievements.map((achievement, i) => (
                                    <li key={i} className="flex items-start gap-3 text-neutral-400 text-sm group">
                                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent group-hover:shadow-[0_0_8px_rgba(var(--accent),0.8)] transition-all" />
                                        <span className="group-hover:text-neutral-200 transition-colors">{achievement}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Spotlight>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
