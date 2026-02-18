'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import { ReadingControls } from './ReadingControls';
import { ReadingProgressBar } from './ReadingProgressBar';
import { TableOfContents } from './TableOfContents';
import { NotionBlockRenderer } from './NotionBlockRenderer';
import { formatDate, extractHeadings } from '../lib/reading-utils';
import {
  FONT_OPTIONS,
  WIDTH_OPTIONS,
  DEFAULT_READING_PREFERENCES,
  type ReadingPreferences,
  type BlogPostWithContent,
} from '../data/blog-types';

const STORAGE_KEY = 'blog-reading-preferences';

export function BlogReader({ post }: { post: BlogPostWithContent }) {
  const [prefs, setPrefs] = React.useState<ReadingPreferences>(DEFAULT_READING_PREFERENCES);
  const [mounted, setMounted] = React.useState(false);

  // Load persisted preferences on mount
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setPrefs(JSON.parse(saved));
    } catch { /* ignore */ }
    setMounted(true);
  }, []);

  const updatePrefs = React.useCallback((updates: Partial<ReadingPreferences>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch { /* ignore */ }
      return next;
    });
  }, []);

  const headings = React.useMemo(() => extractHeadings(post.blocks), [post.blocks]);

  const fontFamily = FONT_OPTIONS.find((f) => f.value === prefs.fontFamily)?.family || FONT_OPTIONS[0].family;
  const maxWidth = WIDTH_OPTIONS.find((w) => w.value === prefs.contentWidth)?.maxWidth || WIDTH_OPTIONS[1].maxWidth;

  // Resolve the effective reader theme based on preferences
  const readerTheme = prefs.theme;

  return (
    <>
      <ReadingProgressBar />

      <div
        data-reader-theme={readerTheme}
        className={cn(
          'min-h-screen transition-colors duration-300',
          'bg-[var(--reader-bg)] text-[var(--reader-fg)]'
        )}
        style={{ fontFamily, fontSize: `${prefs.fontSize}px`, lineHeight: prefs.lineHeight }}
      >
        {/* Header bar */}
        <div className="border-b border-[var(--reader-border)] bg-[var(--reader-bg)]/80 backdrop-blur-sm">
          <div className="container flex items-center justify-between py-3">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm font-medium text-[var(--reader-muted)] transition-colors hover:text-[var(--reader-fg)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            {mounted && (
              <ReadingControls preferences={prefs} onUpdate={updatePrefs} />
            )}
          </div>
        </div>

        {/* Article layout */}
        <div className="container py-8">
          <div className="flex gap-12">
            {/* Main content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto w-full"
              style={{ maxWidth }}
            >
              {/* Post header */}
              <header className="mb-10">
                {post.coverImage && (
                  <div className="mb-8 overflow-hidden rounded-xl border border-[var(--reader-border)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full object-cover"
                      style={{ maxHeight: '400px' }}
                    />
                  </div>
                )}

                <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-[var(--reader-muted)]">
                  {post.category && (
                    <span className="rounded-full border border-[var(--reader-border)] px-3 py-1 font-medium">
                      {post.category}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(post.publishedDate)}
                  </span>
                  {post.readingTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readingTime} min read
                    </span>
                  )}
                </div>

                <h1 className="mb-4 text-[2em] font-bold leading-tight tracking-tight">
                  {post.title}
                </h1>

                <p className="text-lg text-[var(--reader-muted)]">
                  {post.excerpt}
                </p>

                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 rounded-md bg-[var(--reader-code-bg)] px-2 py-1 text-xs text-[var(--reader-muted)]"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <hr className="mt-8 border-[var(--reader-border)]" />
              </header>

              {/* Table of Contents (mobile) */}
              <div className="mb-8">
                <TableOfContents headings={headings} />
              </div>

              {/* Post content */}
              <div className="blog-content">
                <NotionBlockRenderer blocks={post.blocks} />
              </div>

              {/* Footer */}
              <footer className="mt-16 border-t border-[var(--reader-border)] pt-8">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-[var(--reader-muted)]">
                    Written by <span className="font-medium text-[var(--reader-fg)]">{post.author}</span>
                  </div>
                  <Link
                    href="/blog"
                    className="flex items-center gap-2 text-sm font-medium text-[var(--reader-muted)] transition-colors hover:text-[var(--reader-fg)]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    More articles
                  </Link>
                </div>
              </footer>
            </motion.article>

            {/* Desktop TOC sidebar */}
            <div className="hidden xl:block xl:w-64 xl:shrink-0">
              <TableOfContents headings={headings} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
