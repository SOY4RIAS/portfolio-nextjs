'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { resumeData } from '@/data/resume';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="container flex flex-col-reverse items-center justify-between gap-10 py-20 md:flex-row md:py-32">
      <div className="flex flex-1 flex-col gap-6 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
            Hi, I'm <span className="vibrant-gradient">{resumeData.personalInfo.name}</span>
          </h1>
          <h2 className="text-2xl font-semibold text-muted-foreground">
            {resumeData.personalInfo.title}
          </h2>
        </motion.div>

        <motion.p
          className="text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {resumeData.personalInfo.summary}
        </motion.p>

        <motion.div
          className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button size="lg" variant="vibrant" onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}>
            View Experience
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => document.getElementById('ai-expertise')?.scrollIntoView({ behavior: 'smooth' })}>
            AI Expertise
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="relative flex-1 flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-muted shadow-2xl md:h-80 md:w-80">
          <Image
            src="/img/0.png"
            alt={resumeData.personalInfo.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
