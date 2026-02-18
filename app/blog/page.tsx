import Link from 'next/link';
import { ArrowLeft, Rss } from 'lucide-react';
import { getBlogPosts, BlogList } from '@/features/blog';

// ISR: Revalidate every hour
export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container py-20">
      {/* Header */}
      <div className="mb-10">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Blog & Case Studies
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Thoughts on frontend development, AI integration, and software
              engineering best practices.
            </p>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground sm:flex">
            <Rss className="h-3 w-3" />
            {posts.length} articles
          </div>
        </div>
      </div>

      {/* Posts */}
      <BlogList posts={posts} />
    </div>
  );
}
