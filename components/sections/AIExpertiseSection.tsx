"use client";

import { resumeData } from "@/data/resume";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Terminal, Copy, Check } from "lucide-react";
import { useState } from "react";

export function AIExpertiseSection() {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText("npx soy4rias-ai-stack@latest init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ai-expertise" className="container py-32">
      <div className="flex flex-col items-center text-center mb-16 space-y-4">
        <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tighter">
          AI Architecture
        </h2>
        <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase">
          // Neural Network Integration & LLM Ops
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl mx-auto rounded-lg overflow-hidden border border-white/10 bg-[#0c0c0c] shadow-2xl"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="font-mono text-xs text-muted-foreground flex items-center gap-2">
            <Terminal className="w-3 h-3" />
            ai_capabilities.sh
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Terminal Body */}
        <div className="p-6 md:p-8 font-mono text-sm md:text-base space-y-8 min-h-[500px] overflow-x-auto">

            {/* Command 1 */}
            <div>
                <div className="flex items-center gap-2 text-green-500 mb-2">
                    <span>➜</span>
                    <span className="text-blue-400">~</span>
                    <span className="text-white">analyze --target=development_workflows</span>
                </div>
                <div className="pl-6 text-neutral-400 space-y-1">
                    <p>Scanning repository...</p>
                    <p>Found optimization opportunities using LLMs.</p>
                    <div className="mt-4 grid md:grid-cols-2 gap-4">
                        {resumeData.aiExpertise.slice(0, 2).map((area, idx) => (
                            <div key={idx} className="bg-white/5 p-4 rounded border border-white/5 hover:border-accent/50 transition-colors group">
                                <h4 className="text-accent font-bold mb-2 group-hover:text-white transition-colors">./{area.title.toLowerCase().replace(/\s+/g, '-')}</h4>
                                <ul className="space-y-1">
                                    {area.items.map((item, i) => (
                                        <li key={i} className="flex gap-2 text-xs md:text-sm">
                                            <span className="text-neutral-600">├</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

             {/* Command 2 */}
             <div className="opacity-0 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
                <div className="flex items-center gap-2 text-green-500 mb-2 mt-8">
                    <span>➜</span>
                    <span className="text-blue-400">~</span>
                    <span className="text-white">list --dependencies</span>
                </div>
                <div className="pl-6 text-neutral-400">
                    <div className="flex flex-wrap gap-2 mt-2">
                        {resumeData.skills.filter(s => s.category === "AI").map((skill, i) => (
                            <span key={i} className="text-green-400/80 hover:text-green-400 transition-colors">
                                "{skill.name}"{i < resumeData.skills.length - 1 ? ',' : ''}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

             {/* Command 3 - Interactive */}
             <div className="opacity-0 animate-fade-in" style={{ animationDelay: '2s', animationFillMode: 'forwards' }}>
                 <div className="flex items-center gap-2 text-green-500 mb-2 mt-8">
                    <span>➜</span>
                    <span className="text-blue-400">~</span>
                    <div className="flex items-center gap-2 group cursor-pointer" onClick={copyCommand}>
                        <span className="text-white">npx soy4rias-ai-stack@latest init</span>
                        {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </div>
                </div>
                <div className="pl-6 text-neutral-400">
                    <span className="animate-pulse">_</span>
                </div>
             </div>

        </div>
      </motion.div>
    </section>
  );
}
