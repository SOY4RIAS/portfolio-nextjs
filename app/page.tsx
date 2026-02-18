// Feature-based imports (Clean Architecture)
import { Hero } from '@/features/hero';
import { AIChat, AIWorkflow, AIExpertiseSection } from '@/features/ai';
import { ExperienceSection } from '@/features/experience';
import { EducationSection } from '@/features/education';
import { GitHubActivity } from '@/features/github';
import { getBlogPosts, BlogSection } from '@/features/blog';

export default async function Home() {
  const posts = await getBlogPosts();

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

      {/* Blog - Latest articles */}
      <BlogSection posts={posts} />

      {/* Education */}
      <EducationSection />

      {/* GitHub Activity - Live activity */}
      <GitHubActivity />
    </div>
  );
}
