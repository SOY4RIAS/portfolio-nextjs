'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { formatDate } from '../lib/reading-utils';
import type { BlogPost } from '../data/blog-types';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <article className="flex h-full flex-col rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5">
          {/* Cover image */}
          {post.coverImage && (
            <div className="mb-4 overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.title}
                className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          )}

          {/* Category + Date */}
          <div className="mb-3 flex items-center gap-3">
            <span className="rounded-full border border-border px-3 py-0.5 text-xs font-medium text-muted-foreground">
              {post.category}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDate(post.publishedDate)}
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-2 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-foreground/80">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              {post.readingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readingTime} min
                </span>
              )}
            </div>
            <span className="flex items-center gap-1 font-medium transition-all group-hover:gap-2">
              Read <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
