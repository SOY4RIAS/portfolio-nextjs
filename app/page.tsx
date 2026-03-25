import dynamic from 'next/dynamic';

// Feature-based imports (Clean Architecture)
// Hero is above the fold - import statically for fastest LCP
import { Hero } from '@/features/hero';
// GitHubActivity is a Server Component (async) - already code-split by framework
import { GitHubActivity } from '@/features/github';

// Below-fold client sections - lazy loaded for better initial page load
const AIChat = dynamic(() => import('@/features/ai/components/AIChat').then(m => ({ default: m.AIChat })), {
  loading: () => <SectionSkeleton />,
});
const AIWorkflow = dynamic(() => import('@/features/ai/components/AIWorkflow').then(m => ({ default: m.AIWorkflow })), {
  loading: () => <SectionSkeleton />,
});
const ExperienceSection = dynamic(() => import('@/features/experience/components/ExperienceSection').then(m => ({ default: m.ExperienceSection })), {
  loading: () => <SectionSkeleton />,
});
const AIExpertiseSection = dynamic(() => import('@/features/ai/components/AIExpertiseSection').then(m => ({ default: m.AIExpertiseSection })), {
  loading: () => <SectionSkeleton />,
});
const EducationSection = dynamic(() => import('@/features/education/components/EducationSection').then(m => ({ default: m.EducationSection })), {
  loading: () => <SectionSkeleton />,
});

function SectionSkeleton() {
  return (
    <div className="py-20">
      <div className="container">
        <div className="h-8 w-48 bg-muted rounded mx-auto mb-8 animate-pulse" />
        <div className="h-64 bg-muted/50 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero - First impression (above fold, statically imported) */}
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
