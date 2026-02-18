'use client';

import * as React from 'react';
import { List, ChevronDown } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  if (headings.length < 2) return null;

  return (
    <>
      {/* Desktop: Sidebar */}
      <nav className="hidden xl:block" aria-label="Table of contents">
        <div className="sticky top-24">
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--reader-muted)]">
            On this page
          </h4>
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  onClick={() => handleClick(heading.id)}
                  className={cn(
                    'block w-full text-left text-sm leading-snug transition-all duration-200',
                    heading.level === 2 && 'pl-0',
                    heading.level === 3 && 'pl-4',
                    activeId === heading.id
                      ? 'font-medium text-[var(--reader-fg)]'
                      : 'text-[var(--reader-muted)] hover:text-[var(--reader-fg)]'
                  )}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile: Collapsible */}
      <div className="xl:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center gap-2 rounded-lg border border-[var(--reader-border)] bg-[var(--reader-code-bg)] px-4 py-3 text-sm font-medium transition-colors"
        >
          <List className="h-4 w-4" />
          <span>Table of Contents</span>
          <ChevronDown
            className={cn(
              'ml-auto h-4 w-4 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>
        {isOpen && (
          <ul className="mt-2 space-y-1 rounded-lg border border-[var(--reader-border)] bg-[var(--reader-code-bg)] p-3">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  onClick={() => handleClick(heading.id)}
                  className={cn(
                    'block w-full rounded px-3 py-1.5 text-left text-sm transition-colors',
                    heading.level === 3 && 'pl-7',
                    activeId === heading.id
                      ? 'bg-[var(--reader-fg)]/10 font-medium text-[var(--reader-fg)]'
                      : 'text-[var(--reader-muted)] hover:text-[var(--reader-fg)]'
                  )}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
