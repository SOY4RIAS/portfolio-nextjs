// Blog Feature - Notion API Client
// Clean Architecture: Data fetching isolated in lib layer

import { Client } from '@notionhq/client';
import { SAMPLE_POSTS, SAMPLE_BLOCKS } from '../data/blog-types';
import { estimateReadingTime } from './reading-utils';
import type { BlogPost, BlogPostWithContent, NotionBlock } from '../data/blog-types';

// Check if Notion is configured
const isNotionConfigured = !!(process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_ID);

const notion = isNotionConfigured
  ? new Client({ auth: process.env.NOTION_TOKEN })
  : null;

const DATABASE_ID = process.env.NOTION_DATABASE_ID || '';

/**
 * Maps a Notion page object to our BlogPost type
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pageToPost(page: any): BlogPost {
  const props = page.properties;

  return {
    id: page.id,
    slug: props.Slug?.rich_text?.[0]?.plain_text || '',
    title: props.Name?.title?.[0]?.plain_text || '',
    excerpt: props.Excerpt?.rich_text?.[0]?.plain_text || '',
    category: props.Category?.select?.name || '',
    tags: props.Tags?.multi_select?.map((t: { name: string }) => t.name) || [],
    coverImage:
      page.cover?.external?.url ||
      page.cover?.file?.url ||
      props.Cover?.files?.[0]?.external?.url ||
      props.Cover?.files?.[0]?.file?.url ||
      null,
    publishedDate: props.Date?.date?.start || '',
    author: props.Author?.rich_text?.[0]?.plain_text || 'Santiago Arias',
  };
}

/**
 * Fetches all published blog posts from Notion
 * Falls back to sample data when Notion is not configured
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isNotionConfigured || !notion) {
    return SAMPLE_POSTS;
  }

  try {
    // Notion SDK v5: databases.query → dataSources.query
    const response = await notion.dataSources.query({
      data_source_id: DATABASE_ID,
      filter: {
        property: 'Published',
        checkbox: { equals: true },
      },
      sorts: [
        { property: 'Date', direction: 'descending' },
      ],
    });

    const posts = response.results.map(pageToPost);

    // Fetch reading time for each post
    const postsWithReadingTime = await Promise.all(
      posts.map(async (post) => {
        try {
          const blocks = await getBlockChildren(post.id);
          return { ...post, readingTime: estimateReadingTime(blocks) };
        } catch {
          return { ...post, readingTime: 5 };
        }
      })
    );

    return postsWithReadingTime;
  } catch (error) {
    console.error('Error fetching blog posts from Notion:', error);
    return SAMPLE_POSTS;
  }
}

/**
 * Fetches a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPostWithContent | null> {
  if (!isNotionConfigured || !notion) {
    const samplePost = SAMPLE_POSTS.find((p) => p.slug === slug);
    if (!samplePost) return null;

    const blocks = slug === 'building-ai-first-development-workflow' ? SAMPLE_BLOCKS : generateGenericBlocks(samplePost.title, samplePost.excerpt);

    return {
      ...samplePost,
      readingTime: estimateReadingTime(blocks),
      blocks,
    };
  }

  try {
    const response = await notion.dataSources.query({
      data_source_id: DATABASE_ID,
      filter: {
        and: [
          { property: 'Slug', rich_text: { equals: slug } },
          { property: 'Published', checkbox: { equals: true } },
        ],
      },
    });

    if (response.results.length === 0) return null;

    const page = response.results[0];
    const post = pageToPost(page);
    const blocks = await getBlockChildren(page.id);

    return {
      ...post,
      readingTime: estimateReadingTime(blocks),
      blocks,
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

/**
 * Recursively fetches all blocks (content) for a Notion page
 */
async function getBlockChildren(blockId: string): Promise<NotionBlock[]> {
  if (!notion) return [];

  const blocks: NotionBlock[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    });

    for (const block of response.results) {
      const b = block as unknown as NotionBlock;
      if (b.has_children && b.type !== 'child_page') {
        b.children = await getBlockChildren(b.id);
      }
      blocks.push(b);
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return blocks;
}

/**
 * Generates generic sample blocks for posts without custom content
 */
function generateGenericBlocks(title: string, excerpt: string): NotionBlock[] {
  return [
    {
      id: 'gen-1',
      type: 'paragraph',
      has_children: false,
      paragraph: {
        rich_text: [{ type: 'text', plain_text: excerpt, annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
        color: 'default',
      },
    },
    {
      id: 'gen-2',
      type: 'callout',
      has_children: false,
      callout: {
        rich_text: [{ type: 'text', plain_text: `This is a preview of "${title}". Connect your Notion database to see the full content.`, annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
        icon: { type: 'emoji', emoji: '📝' },
        color: 'gray_background',
      },
    },
    {
      id: 'gen-3',
      type: 'heading_2',
      has_children: false,
      heading_2: {
        rich_text: [{ type: 'text', plain_text: 'Coming Soon', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
        color: 'default',
      },
    },
    {
      id: 'gen-4',
      type: 'paragraph',
      has_children: false,
      paragraph: {
        rich_text: [{ type: 'text', plain_text: 'The full article will be available once the Notion CMS is connected. In the meantime, you can explore the reading controls above to customize your reading experience.', annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, color: 'default' }, href: null }],
        color: 'default',
      },
    },
  ];
}
