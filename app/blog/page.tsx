import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Shared imports (Clean Architecture)
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Button } from '@/shared';

export default function BlogPage() {
  const posts = [
    {
      title: "Improving LLM Context Usage with Smart Caching",
      date: "2024-01-15",
      category: "AI Engineering",
      excerpt: "How we reduced token costs by 40% and improved response latency using a semantic caching layer for BitcoinIRA's AI features.",
      slug: "llm-context-caching"
    },
    {
      title: "The Planning, Coding, and Review Strategy",
      date: "2023-11-20",
      category: "Methodology",
      excerpt: "A deep dive into the structured development workflow that eliminates 90% of bugs before they reach QA.",
      slug: "planning-coding-review"
    },
    {
      title: "Migrating to Next.js 16: A Guide",
      date: "2024-02-01",
      category: "Frontend",
      excerpt: "Lessons learned from upgrading a large-scale application to the latest Next.js version, utilizing React 19 features.",
      slug: "nextjs-16-migration"
    }
  ];

  return (
    <div className="container py-20">
      <div className="mb-10">
        <Link href="/">
          <Button variant="ghost" className="pl-0 hover:pl-2 transition-all">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-4xl font-bold tracking-tight mt-4">Blog & Case Studies</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Thoughts on frontend development, AI integration, and software engineering best practices.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug} className="flex flex-col hover:border-primary/50 transition-colors cursor-pointer group">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline">{post.category}</Badge>
                <span className="text-sm text-muted-foreground">{post.date}</span>
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-3">
                {post.excerpt}
              </CardDescription>
              <Button variant="link" className="px-0 mt-4 group-hover:underline">
                Read more &rarr;
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
