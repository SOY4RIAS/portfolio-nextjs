import { Hero } from "@/components/sections/Hero";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { AIExpertiseSection } from "@/components/sections/AIExpertiseSection";
import { GitHubActivity } from "@/components/sections/GitHubActivity";
import { BlogSection } from "@/components/sections/BlogSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ExperienceSection />
      <EducationSection />
      <AIExpertiseSection />
      <GitHubActivity />
      <BlogSection />
    </div>
  );
}
