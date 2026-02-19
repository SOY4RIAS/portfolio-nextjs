'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { BlogCard } from './BlogCard';
import type { BlogPost } from '../data/blog-types';

export function BlogSection({ posts }: { posts: BlogPost[] }) {
  const latestPosts = posts.slice(0, 3);

  return (
    <section id="blog" className="border-t border-border/40 py-20">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              Blog & Case Studies
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Latest Articles
            </h2>
            <p className="mt-2 text-muted-foreground">
              Thoughts on frontend development, AI integration, and engineering leadership.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Posts grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* Mobile: View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center sm:hidden"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View all articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
