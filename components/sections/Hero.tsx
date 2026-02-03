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
        <div className="animate-fade-in-up animate-duration-500">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl mb-4">
            Hi, I'm <span className="text-gradient">{resumeData.personalInfo.name}</span>
          </h1>
          <h2 className="text-2xl font-medium text-muted-foreground">
            {resumeData.personalInfo.title}
          </h2>
        </div>

        <p className="text-lg text-muted-foreground animate-fade-in-up animate-delay-200 animate-duration-500">
          {resumeData.personalInfo.summary}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start animate-fade-in-up animate-delay-300 animate-duration-500">
          <Button size="lg" onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}>
            View Experience
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => document.getElementById('ai-expertise')?.scrollIntoView({ behavior: 'smooth' })}>
            AI Expertise
          </Button>
        </div>
      </div>

      <div className="relative flex-1 flex justify-center animate-fade-in animate-duration-1000">
        <div className="relative h-64 w-64 overflow-hidden rounded-full border border-border shadow-xl md:h-80 md:w-80 bg-muted">
          <Image
            src="https://github.com/soy4rias.png"
            alt={resumeData.personalInfo.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
