// Blog Feature - Reading Utilities

import type { NotionBlock } from '../data/blog-types';

/**
 * Extracts plain text from a Notion block's rich_text array
 */
export function extractTextFromBlock(block: NotionBlock): string {
  const content = block[block.type];
  if (!content?.rich_text) return '';
  return content.rich_text
    .map((t: { plain_text: string }) => t.plain_text)
    .join('');
}

/**
 * Estimates reading time based on word count (225 wpm average)
 */
export function estimateReadingTime(blocks: NotionBlock[]): number {
  let wordCount = 0;

  for (const block of blocks) {
    const text = extractTextFromBlock(block);
    wordCount += text.split(/\s+/).filter(Boolean).length;

    if (block.children) {
      wordCount += blocks.reduce((acc, b) => {
        const t = extractTextFromBlock(b);
        return acc + t.split(/\s+/).filter(Boolean).length;
      }, 0);
    }
  }

  return Math.max(1, Math.ceil(wordCount / 225));
}

/**
 * Extracts headings from blocks for Table of Contents
 */
export function extractHeadings(blocks: NotionBlock[]): { id: string; text: string; level: number }[] {
  return blocks
    .filter((block) => ['heading_1', 'heading_2', 'heading_3'].includes(block.type))
    .map((block) => ({
      id: block.id,
      text: extractTextFromBlock(block),
      level: parseInt(block.type.split('_')[1]),
    }));
}

/**
 * Format a date string for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
