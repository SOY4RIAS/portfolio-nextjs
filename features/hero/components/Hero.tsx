'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Code, Sparkles, Brain, MessageSquare, Github, Linkedin, Mail } from 'lucide-react';
import { roles, codeSnippets, heroStats, featuredSkills, personalInfo } from '../data/hero';

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [displayedSnippet, setDisplayedSnippet] = useState('');

  // Role rotation effect - necessary for animation timing
  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(roleInterval);
  }, []);

  // Typewriter effect for code snippets - necessary for animation
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

  // Event handlers for navigation (React Best Practice 5.7)
  const handleChatClick = useCallback(() => {
    document.getElementById('ai-chat')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleExperienceClick = useCallback(() => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container relative flex flex-col lg:flex-row items-center justify-between gap-12 py-20 lg:py-32">
        {/* Left side - Content */}
        <HeroContent
          currentRole={currentRole}
          onChatClick={handleChatClick}
          onExperienceClick={handleExperienceClick}
        />

        {/* Right side - Visual */}
        <HeroVisual displayedSnippet={displayedSnippet} />
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}

// Sub-components extracted for readability

interface HeroContentProps {
  currentRole: number;
  onChatClick: () => void;
  onExperienceClick: () => void;
}

function HeroContent({ currentRole, onChatClick, onExperienceClick }: HeroContentProps) {
  return (
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
        {personalInfo.name}
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
        {featuredSkills.map((skill) => (
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
        <Button size="lg" onClick={onChatClick}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Chat with my AI
        </Button>
        <Button size="lg" variant="outline" onClick={onExperienceClick}>
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
        <SocialLink href={personalInfo.github} icon={<Github className="w-5 h-5" />} />
        <SocialLink href={personalInfo.linkedin} icon={<Linkedin className="w-5 h-5" />} />
        <SocialLink href={`mailto:${personalInfo.email}`} icon={<Mail className="w-5 h-5" />} />
      </motion.div>
    </div>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  const isExternal = href.startsWith('http');
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="p-2 rounded-lg hover:bg-muted transition-colors"
    >
      {icon}
    </a>
  );
}

function HeroVisual({ displayedSnippet }: { displayedSnippet: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex-1 w-full max-w-xl"
    >
      <div className="relative">
        {/* Glowing background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-3xl" />

        {/* Main card */}
        <div className="relative bg-background/80 backdrop-blur-sm rounded-2xl border shadow-2xl overflow-hidden">
          <TerminalHeader />
          <div className="p-6">
            <ProfileSection />
            <StatsGrid />
            <CodeSnippetDisplay snippet={displayedSnippet} />
            <TechIcons />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TerminalHeader() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <span className="text-xs text-muted-foreground ml-2 font-mono">santiago@dev ~ ai-workflow</span>
    </div>
  );
}

function ProfileSection() {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20">
          <Image
            src="https://github.com/soy4rias.png"
            alt={personalInfo.name}
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
        <h3 className="font-bold">{personalInfo.name}</h3>
        <p className="text-sm text-muted-foreground">Available for opportunities</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-green-500">Online</span>
        </div>
      </div>
    </div>
  );
}

function StatsGrid() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {heroStats.map((stat) => (
        <div key={stat.label} className="text-center p-3 rounded-lg bg-muted/50">
          <span className="text-2xl font-bold">{stat.value}</span>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

function CodeSnippetDisplay({ snippet }: { snippet: string }) {
  return (
    <div className="bg-[#0d1117] rounded-lg p-4 font-mono text-sm">
      <div className="text-gray-500 mb-2"># AI-assisted development in action</div>
      <div className="flex items-center gap-2">
        <span className="text-green-400">$</span>
        <span className="text-white">{snippet}</span>
        <span className="w-2 h-5 bg-white animate-pulse" />
      </div>
    </div>
  );
}

function TechIcons() {
  return (
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
  );
}

function ScrollIndicator() {
  return (
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
  );
}
