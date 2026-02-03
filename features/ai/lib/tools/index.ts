/**
 * AI Agent Tools
 *
 * These tools are used by the AI SDK to:
 * 1. Search the knowledge base (RAG)
 * 2. Fetch real-time GitHub activity
 * 3. Get current date for context
 */

import { z } from 'zod';

export { searchKnowledgeBase } from './search-knowledge-base';
export { getGitHubActivity } from './github-activity';

/**
 * Simple utility tool to get the current date
 * Useful for temporal context in responses
 */
export const getCurrentDate = {
  description: 'Get the current date and time. Use for temporal context in responses.',
  parameters: z.object({}),
  execute: async () => {
    const now = new Date();
    return {
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().split(' ')[0],
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      formatted: now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };
  },
};
