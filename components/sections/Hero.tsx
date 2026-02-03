"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { resumeData } from "@/data/resume";
import { ArrowRight, Terminal, Cpu } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";
import { Spotlight } from "@/components/ui/Spotlight";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-20">
      {/* Background Gradient Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-9 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </span>
            <span className="text-sm font-mono text-accent tracking-widest uppercase">
              System Online // Ready to Deploy
            </span>
          </motion.div>

          <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8 text-foreground">
            <TextReveal text="SANTIAGO" className="text-foreground" />
            <TextReveal text="ARIAS" className="text-muted-foreground" delay={0.2} />
          </h1>

          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-xl md:text-2xl text-muted-foreground mb-10 font-light"
            >
              Architecting <span className="text-foreground font-medium">high-performance web systems</span> and integrating <span className="text-accent font-medium">advanced AI workflows</span> for the next generation of the web.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="group bg-foreground text-background hover:bg-foreground/90 text-lg px-8 py-6 rounded-none border border-transparent"
                onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Experience
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 rounded-none border-border hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-colors"
                onClick={() => document.getElementById('ai-expertise')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Terminal className="mr-2 h-5 w-5" />
                AI Capabilities
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-3">
           {/* Abstract minimalist decorative element or stats */}
           <Spotlight className="p-6 aspect-square flex flex-col justify-between">
              <Cpu className="w-12 h-12 text-accent opacity-50" />
              <div className="space-y-4 font-mono text-sm text-muted-foreground">
                <div className="flex justify-between border-b border-border pb-2">
                  <span>LOC</span>
                  <span className="text-foreground">1.5M+</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span>Stack</span>
                  <span className="text-foreground">Next.js 16</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span>Status</span>
                  <span className="text-accent">Available</span>
                </div>
              </div>
           </Spotlight>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-accent to-transparent"></div>
      </motion.div>
    </section>
  );
}
