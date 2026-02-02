'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle2, Code2, Search } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function BlogSection() {
  const strategies = [
    {
      title: "Planning",
      icon: Search,
      description: "Thorough requirements analysis and architectural design before writing a single line of code.",
      details: ["Requirement gathering", "Tech stack selection", "Architecture diagrams"]
    },
    {
      title: "Coding",
      icon: Code2,
      description: "Writing clean, maintainable, and self-documenting code using modern best practices.",
      details: ["Clean Code principles", "Test-Driven Development", "Modular component design"]
    },
    {
      title: "Review",
      icon: CheckCircle2,
      description: "Rigorous code reviews and automated testing to ensure quality and reliability.",
      details: ["Automated CI/CD", "Peer reviews", "Performance profiling"]
    }
  ];

  return (
    <section className="bg-muted/30 py-20">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-4 text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight">Development Philosophy</h2>
          <p className="max-w-[700px] text-muted-foreground">
            My approach to software development revolves around a structured "Planning, Coding, and Review" strategy, ensuring robust and scalable solutions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {strategies.map((strategy, index) => {
            const Icon = strategy.icon;
            return (
              <motion.div
                key={strategy.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="h-full relative overflow-hidden border-none shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                  <CardHeader>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{strategy.title}</CardTitle>
                    <CardDescription>{strategy.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {strategy.details.map((detail) => (
                        <li key={detail} className="flex items-center text-sm text-muted-foreground">
                          <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 flex justify-center">
          <Link href="/blog">
            <Button size="lg" variant="outline">
              Read Case Studies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
