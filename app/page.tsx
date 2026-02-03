// Feature-based imports (Clean Architecture)
import { Hero } from '@/features/hero';
import { AIChat, AIWorkflow, AIExpertiseSection } from '@/features/ai';
import { ExperienceSection } from '@/features/experience';
import { EducationSection } from '@/features/education';
import { GitHubActivity } from '@/features/github';

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
