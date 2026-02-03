import { Hero } from "@/components/sections/Hero";
import { AIChat } from "@/components/sections/AIChat";
import { AIWorkflow } from "@/components/sections/AIWorkflow";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { AIExpertiseSection } from "@/components/sections/AIExpertiseSection";
import { GitHubActivity } from "@/components/sections/GitHubActivity";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero - First impression */}
      <Hero />

      {/* AI Chat - Interactive RAG demonstration */}
      <AIChat />

      {/* AI Workflow - Planning/Coding/Review methodology */}
      <AIWorkflow />

      {/* Experience - Work history */}
      <ExperienceSection />

      {/* AI Expertise - Detailed AI skills */}
      <AIExpertiseSection />

      {/* Education */}
      <EducationSection />

      {/* GitHub Activity - Live activity */}
      <GitHubActivity />
    </div>
  );
}
