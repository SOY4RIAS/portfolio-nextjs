// Blog Feature - Types & Constants

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage: string | null;
  publishedDate: string;
  author: string;
  readingTime?: number;
}

export interface BlogPostWithContent extends BlogPost {
  blocks: NotionBlock[];
}

export interface NotionRichText {
  type: string;
  text?: { content: string; link: { url: string } | null };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
}

export interface NotionBlock {
  id: string;
  type: string;
  has_children: boolean;
  children?: NotionBlock[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ReadingPreferences {
  fontFamily: 'georgia' | 'system-sans' | 'mono' | 'charter';
  fontSize: number;
  lineHeight: number;
  contentWidth: 'narrow' | 'medium' | 'wide';
  theme: 'light' | 'dark' | 'sepia' | 'paper';
}

export const DEFAULT_READING_PREFERENCES: ReadingPreferences = {
  fontFamily: 'georgia',
  fontSize: 18,
  lineHeight: 1.8,
  contentWidth: 'medium',
  theme: 'light',
};

export const FONT_OPTIONS = [
  { value: 'georgia' as const, label: 'Georgia', family: "Georgia, 'Times New Roman', serif" },
  { value: 'system-sans' as const, label: 'Sans Serif', family: 'var(--font-sans), system-ui, sans-serif' },
  { value: 'charter' as const, label: 'Charter', family: "Charter, 'Bitstream Charter', Georgia, serif" },
  { value: 'mono' as const, label: 'Monospace', family: 'var(--font-mono), monospace' },
] as const;

export const WIDTH_OPTIONS = [
  { value: 'narrow' as const, label: 'Narrow', maxWidth: '580px' },
  { value: 'medium' as const, label: 'Medium', maxWidth: '720px' },
  { value: 'wide' as const, label: 'Wide', maxWidth: '900px' },
] as const;

export const THEME_OPTIONS = [
  { value: 'light' as const, label: 'Light', icon: '☀️' },
  { value: 'dark' as const, label: 'Dark', icon: '🌙' },
  { value: 'sepia' as const, label: 'Sepia', icon: '📜' },
  { value: 'paper' as const, label: 'Paper', icon: '📄' },
] as const;

// Sample posts for when Notion is not configured
export const SAMPLE_POSTS: BlogPost[] = [
  {
    id: 'sample-1',
    slug: 'building-ai-first-development-workflow',
    title: 'Building an AI-First Development Workflow',
    excerpt: 'How I transformed my development process by integrating AI tools at every stage — from planning and architecture to code review and deployment.',
    category: 'AI Engineering',
    tags: ['AI', 'Developer Tools', 'Productivity', 'Claude'],
    coverImage: null,
    publishedDate: '2026-02-10',
    author: 'Santiago Arias',
    readingTime: 8,
  },
  {
    id: 'sample-2',
    slug: 'llm-context-caching-strategy',
    title: 'Improving LLM Context Usage with Smart Caching',
    excerpt: 'How we reduced token costs by 40% and improved response latency using a semantic caching layer for production AI features.',
    category: 'AI Engineering',
    tags: ['LLM', 'Caching', 'Performance', 'Architecture'],
    coverImage: null,
    publishedDate: '2026-01-15',
    author: 'Santiago Arias',
    readingTime: 6,
  },
  {
    id: 'sample-3',
    slug: 'nextjs-16-migration-guide',
    title: 'Migrating to Next.js 16: Lessons from Production',
    excerpt: 'A practical guide to upgrading a large-scale application to Next.js 16 with React 19, covering the pitfalls and performance wins.',
    category: 'Frontend',
    tags: ['Next.js', 'React 19', 'Migration', 'Performance'],
    coverImage: null,
    publishedDate: '2026-01-02',
    author: 'Santiago Arias',
    readingTime: 10,
  },
  {
    id: 'sample-4',
    slug: 'planning-coding-review-strategy',
    title: 'The Planning, Coding, and Review Strategy',
    excerpt: 'A deep dive into the structured development workflow that eliminates 90% of bugs before they reach QA and scales across teams of 30+ developers.',
    category: 'Methodology',
    tags: ['Code Review', 'Best Practices', 'Team Leadership'],
    coverImage: null,
    publishedDate: '2025-11-20',
    author: 'Santiago Arias',
    readingTime: 7,
  },
];

// Sample blocks for the first sample post (demonstrates the full reading experience)
export const SAMPLE_BLOCKS: NotionBlock[] = [
  {
    id: 'b1',
    type: 'paragraph',
    has_children: false,
    paragraph: {
      rich_text: [
        { type: 'text', plain_text: 'Over the past year, I\'ve completely transformed how I write software. What started as experimenting with GitHub Copilot evolved into a comprehensive ', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null },
        { type: 'text', plain_text: 'AI-first development methodology', annotations: { bold: true, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null },
        { type: 'text', plain_text: ' that touches every phase of the software development lifecycle.', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null },
      ],
      color: 'default',
    },
  },
  {
    id: 'b2',
    type: 'heading_2',
    has_children: false,
    heading_2: {
      rich_text: [{ type: 'text', plain_text: 'Why AI-First?', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      color: 'default',
    },
  },
  {
    id: 'b3',
    type: 'paragraph',
    has_children: false,
    paragraph: {
      rich_text: [
        { type: 'text', plain_text: 'The term "AI-First" doesn\'t mean blindly delegating everything to an LLM. It means designing your workflow to ', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null },
        { type: 'text', plain_text: 'leverage AI strengths', annotations: { bold: false, italic: true, strikethrough: false, underline: false, code: false, color: 'default' }, href: null },
        { type: 'text', plain_text: ' — pattern recognition, code generation, analysis at scale — while maintaining human judgment for architecture decisions, UX design, and critical business logic.', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null },
      ],
      color: 'default',
    },
  },
  {
    id: 'b4',
    type: 'callout',
    has_children: false,
    callout: {
      rich_text: [{ type: 'text', plain_text: 'AI-first development is not about replacing developers. It\'s about amplifying what developers can accomplish in a given timeframe.', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      icon: { type: 'emoji', emoji: '💡' },
      color: 'blue_background',
    },
  },
  {
    id: 'b5',
    type: 'heading_2',
    has_children: false,
    heading_2: {
      rich_text: [{ type: 'text', plain_text: 'The Three Pillars', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      color: 'default',
    },
  },
  {
    id: 'b6',
    type: 'paragraph',
    has_children: false,
    paragraph: {
      rich_text: [{ type: 'text', plain_text: 'My workflow is built on three pillars, each enhanced by AI tooling:', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      color: 'default',
    },
  },
  {
    id: 'b7',
    type: 'heading_3',
    has_children: false,
    heading_3: {
      rich_text: [{ type: 'text', plain_text: '1. AI-Assisted Planning', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      color: 'default',
    },
  },
  {
    id: 'b8',
    type: 'paragraph',
    has_children: false,
    paragraph: {
      rich_text: [{ type: 'text', plain_text: 'Before writing a single line of code, I use Claude to analyze requirements, identify edge cases, and draft an implementation plan. This catches architectural issues early when they\'re cheap to fix.', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      color: 'default',
    },
  },
  {
    id: 'b9',
    type: 'code',
    has_children: false,
    code: {
      rich_text: [{ type: 'text', plain_text: '# My typical planning prompt\n> claude "Analyze this feature request and create an implementation\n  plan. Consider: data model changes, API endpoints needed,\n  component hierarchy, edge cases, and testing strategy.\n  \n  Feature: User can customize their reading experience\n  with font selection, size adjustment, and theme modes."', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      language: 'bash',
      caption: [{ type: 'text', plain_text: 'Using Claude Code for architectural planning', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
    },
  },
  {
    id: 'b10',
    type: 'heading_3',
    has_children: false,
    heading_3: {
      rich_text: [{ type: 'text', plain_text: '2. Pair Programming with AI', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      color: 'default',
    },
  },
  {
    id: 'b11',
    type: 'paragraph',
    has_children: false,
    paragraph: {
      rich_text: [
        { type: 'text', plain_text: 'During implementation, I use AI as a pair programmer. The key insight is providing ', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null },
        { type: 'text', plain_text: 'rich context', annotations: { bold: true, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null },
        { type: 'text', plain_text: ' — not just asking "write a function" but sharing the architectural vision, existing patterns, and constraints.', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null },
      ],
      color: 'default',
    },
  },
  {
    id: 'b12',
    type: 'bulleted_list_item',
    has_children: false,
    bulleted_list_item: {
      rich_text: [
        { type: 'text', plain_text: 'CLAUDE.md', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: true, color: 'default' }, href: null },
        { type: 'text', plain_text: ' files provide project-wide context automatically', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null },
      ],
      color: 'default',
    },
  },
  {
    id: 'b13',
    type: 'bulleted_list_item',
    has_children: false,
    bulleted_list_item: {
      rich_text: [{ type: 'text', plain_text: 'Feature-based architecture means AI can focus on one module at a time', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      color: 'default',
    },
  },
  {
    id: 'b14',
    type: 'bulleted_list_item',
    has_children: false,
    bulleted_list_item: {
      rich_text: [{ type: 'text', plain_text: 'Barrel exports create clear boundaries that AI tools respect', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      color: 'default',
    },
  },
  {
    id: 'b15',
    type: 'heading_3',
    has_children: false,
    heading_3: {
      rich_text: [{ type: 'text', plain_text: '3. AI-Powered Code Review', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      color: 'default',
    },
  },
  {
    id: 'b16',
    type: 'paragraph',
    has_children: false,
    paragraph: {
      rich_text: [{ type: 'text', plain_text: 'Every PR goes through an AI review pass before human review. This catches common issues — missing error handling, inconsistent naming, potential performance problems — freeing human reviewers to focus on business logic and architectural concerns.', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      color: 'default',
    },
  },
  {
    id: 'b17',
    type: 'quote',
    has_children: false,
    quote: {
      rich_text: [{ type: 'text', plain_text: 'The best code reviews happen when the reviewer can focus on "is this the right approach?" instead of "did you forget a null check?"', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      color: 'default',
    },
  },
  {
    id: 'b18',
    type: 'heading_2',
    has_children: false,
    heading_2: {
      rich_text: [{ type: 'text', plain_text: 'Real-World Results', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      color: 'default',
    },
  },
  {
    id: 'b19',
    type: 'paragraph',
    has_children: false,
    paragraph: {
      rich_text: [{ type: 'text', plain_text: 'After 6 months of this workflow, the numbers speak for themselves:', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      color: 'default',
    },
  },
  {
    id: 'b20',
    type: 'numbered_list_item',
    has_children: false,
    numbered_list_item: {
      rich_text: [
        { type: 'text', plain_text: '60% faster', annotations: { bold: true, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null },
        { type: 'text', plain_text: ' feature delivery — from spec to production', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null },
      ],
      color: 'default',
    },
  },
  {
    id: 'b21',
    type: 'numbered_list_item',
    has_children: false,
    numbered_list_item: {
      rich_text: [
        { type: 'text', plain_text: '45% fewer bugs', annotations: { bold: true, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null },
        { type: 'text', plain_text: ' reaching QA stage', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null },
      ],
      color: 'default',
    },
  },
  {
    id: 'b22',
    type: 'numbered_list_item',
    has_children: false,
    numbered_list_item: {
      rich_text: [
        { type: 'text', plain_text: '3x improvement', annotations: { bold: true, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null },
        { type: 'text', plain_text: ' in code review turnaround time', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null },
      ],
      color: 'default',
    },
  },
  {
    id: 'b23',
    type: 'divider',
    has_children: false,
    divider: {},
  },
  {
    id: 'b24',
    type: 'heading_2',
    has_children: false,
    heading_2: {
      rich_text: [{ type: 'text', plain_text: 'Tools in My Stack', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      color: 'default',
    },
  },
  {
    id: 'b25',
    type: 'paragraph',
    has_children: false,
    paragraph: {
      rich_text: [{ type: 'text', plain_text: 'Here\'s what my current AI-enhanced development environment looks like:', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      color: 'default',
    },
  },
  {
    id: 'b26',
    type: 'code',
    has_children: false,
    code: {
      rich_text: [{ type: 'text', plain_text: '// My AI Development Stack\nconst aiStack = {\n  planning:    "Claude Code /plan mode",\n  coding:      "Cursor + Claude Sonnet 4.5",\n  review:      "Claude Code /review-pr",\n  testing:     "AI-generated test cases",\n  docs:        "Auto-generated from code",\n  deployment:  "Vercel + GitHub Actions",\n};', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      language: 'typescript',
      caption: [],
    },
  },
  {
    id: 'b27',
    type: 'heading_2',
    has_children: false,
    heading_2: {
      rich_text: [{ type: 'text', plain_text: 'Getting Started', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      color: 'default',
    },
  },
  {
    id: 'b28',
    type: 'paragraph',
    has_children: false,
    paragraph: {
      rich_text: [{ type: 'text', plain_text: 'If you want to adopt an AI-first workflow, start small. Pick one area — planning, coding, or review — and integrate AI there first. Once you see the benefits, expanding becomes natural.', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      color: 'default',
    },
  },
  {
    id: 'b29',
    type: 'to_do',
    has_children: false,
    to_do: {
      rich_text: [{ type: 'text', plain_text: 'Set up a CLAUDE.md file in your project', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      checked: true,
      color: 'default',
    },
  },
  {
    id: 'b30',
    type: 'to_do',
    has_children: false,
    to_do: {
      rich_text: [{ type: 'text', plain_text: 'Try AI-assisted planning for your next feature', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      checked: false,
      color: 'default',
    },
  },
  {
    id: 'b31',
    type: 'to_do',
    has_children: false,
    to_do: {
      rich_text: [{ type: 'text', plain_text: 'Measure your before/after velocity metrics', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
      checked: false,
      color: 'default',
    },
  },
  {
    id: 'b32',
    type: 'paragraph',
    has_children: false,
    paragraph: {
      rich_text: [
        { type: 'text', plain_text: 'The future of software development is collaborative — humans and AI working together. The developers who master this collaboration will build better software, faster. And honestly? It makes the work ', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null },
        { type: 'text', plain_text: 'more fun', annotations: { bold: false, italic: true, strikethrough: false, underline: false, code: false, color: 'default' }, href: null },
        { type: 'text', plain_text: '.', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null },
      ],
      color: 'default',
    },
  },
];
