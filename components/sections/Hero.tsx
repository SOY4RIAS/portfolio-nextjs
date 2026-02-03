'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { resumeData } from '@/data/resume';
import { ArrowRight, Sparkles, Terminal, Brain, Code, MessageSquare, Github, Linkedin, Mail } from 'lucide-react';

const roles = [
  'Senior Frontend Developer',
  'Technical Lead',
  'React & React Native Expert',
  'AI-First Engineer',
];

const codeSnippets = [
  '> claude "analyze this PR"',
  '> /plan implement auth',
  '> cursor @codebase fix bug',
  '> npm run ai:review',
];

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [displayedSnippet, setDisplayedSnippet] = useState('');

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(roleInterval);
  }, []);

  useEffect(() => {
    const snippet = codeSnippets[currentSnippet];
    let i = 0;
    setDisplayedSnippet('');

    const typeInterval = setInterval(() => {
      if (i < snippet.length) {
        setDisplayedSnippet(snippet.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
        }, 2000);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentSnippet]);

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container relative flex flex-col lg:flex-row items-center justify-between gap-12 py-20 lg:py-32">
        {/* Left side - Content */}
        <div className="flex-1 text-center lg:text-left max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
          >
            <Code className="w-4 h-4" />
            <span className="text-sm font-medium">Senior Frontend Developer & Technical Lead</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4"
          >
            {resumeData.personalInfo.name}
          </motion.h1>

          {/* Animated Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-10 mb-6"
          >
            <motion.h2
              key={currentRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-xl sm:text-2xl font-medium text-muted-foreground"
            >
              {roles[currentRole]}
            </motion.h2>
          </motion.div>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-muted-foreground mb-8 leading-relaxed"
          >
            <strong>8 years</strong> building web & mobile apps with <strong>React, Next.js & React Native</strong>.
            Technical Lead who has managed <strong>teams of 30+ developers</strong>.
            I leverage <strong>AI tools</strong> to ship faster without compromising quality.
          </motion.p>

          {/* Skills badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8"
          >
            {['React/Next.js', 'React Native', 'Technical Lead', 'TypeScript', 'AI-First'].map((skill, i) => (
              <Badge key={skill} variant="secondary" className="px-3 py-1">
                {skill}
              </Badge>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
          >
            <Button size="lg" onClick={() => document.getElementById('ai-chat')?.scrollIntoView({ behavior: 'smooth' })}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat with my AI
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}>
              <Code className="mr-2 h-4 w-4" />
              View Experience
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-4 justify-center lg:justify-start"
          >
            <a
              href={resumeData.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={resumeData.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${resumeData.personalInfo.email}`}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* Right side - Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex-1 w-full max-w-xl"
        >
          <div className="relative">
            {/* Profile image with terminal overlay */}
            <div className="relative">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-3xl" />

              {/* Main card */}
              <div className="relative bg-background/80 backdrop-blur-sm rounded-2xl border shadow-2xl overflow-hidden">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2 font-mono">santiago@dev ~ ai-workflow</span>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Profile section */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20">
                        <Image
                          src="https://github.com/soy4rias.png"
                          alt={resumeData.personalInfo.name}
                          width={80}
                          height={80}
                          className="object-cover"
                          priority
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                        <span className="text-white text-xs">AI</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold">{resumeData.personalInfo.name}</h3>
                      <p className="text-sm text-muted-foreground">Available for opportunities</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-green-500">Online</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { label: 'Years Exp', value: '8+' },
                      { label: 'Team Led', value: '30+' },
                      { label: 'Companies', value: '7' },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center p-3 rounded-lg bg-muted/50">
                        <span className="text-2xl font-bold">{stat.value}</span>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Animated code snippet */}
                  <div className="bg-[#0d1117] rounded-lg p-4 font-mono text-sm">
                    <div className="text-gray-500 mb-2"># AI-assisted development in action</div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">$</span>
                      <span className="text-white">{displayedSnippet}</span>
                      <span className="w-2 h-5 bg-white animate-pulse" />
                    </div>
                  </div>

                  {/* Tech icons */}
                  <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Code className="w-4 h-4" />
                      <span>React Expert</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Brain className="w-4 h-4" />
                      <span>Tech Lead</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="w-4 h-4" />
                      <span>AI-First</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
