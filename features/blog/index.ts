// Blog Feature - Barrel Export
// Clean Architecture: Single entry point for the Blog feature

// Components
export { BlogList } from './components/BlogList';
export { BlogCard } from './components/BlogCard';
export { BlogReader } from './components/BlogReader';
export { BlogSection } from './components/BlogSection';
export { NotionBlockRenderer } from './components/NotionBlockRenderer';

// Lib/Services
export { getBlogPosts, getBlogPostBySlug } from './lib/notion';
export { estimateReadingTime, extractHeadings, formatDate } from './lib/reading-utils';

// Types & Constants
export type { BlogPost, BlogPostWithContent, ReadingPreferences, NotionBlock } from './data/blog-types';
export { SAMPLE_POSTS, DEFAULT_READING_PREFERENCES } from './data/blog-types';
