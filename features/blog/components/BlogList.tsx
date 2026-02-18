'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import { BlogCard } from './BlogCard';
import type { BlogPost } from '../data/blog-types';

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const categories = React.useMemo(() => {
    const cats = new Set(posts.map((p) => p.category));
    return ['All', ...Array.from(cats)];
  }, [posts]);

  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredPosts = React.useMemo(() => {
    if (activeCategory === 'All') return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <div>
      {/* Category filters */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 flex flex-wrap gap-2"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-all',
              activeCategory === cat
                ? 'border-foreground bg-foreground text-background'
                : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
            )}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Posts grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center text-muted-foreground"
        >
          <p className="text-lg">No posts in this category yet.</p>
        </motion.div>
      )}
    </div>
  );
}
