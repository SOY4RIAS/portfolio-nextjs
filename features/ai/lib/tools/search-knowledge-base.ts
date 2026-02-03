import { z } from 'zod';
import { searchSimilar } from '../turso';
import { generateEmbedding } from '../embeddings';

/**
 * RAG Tool: Search Santiago's knowledge base using semantic similarity
 */
export const searchKnowledgeBase = {
  description: `Search Santiago Arias's knowledge base for information about his professional background.
Use this tool to find information about:
- Work experience and job history
- Technical skills and expertise
- AI tools and workflows
- Education and certifications
- Contact information
- Leadership and team management experience

ALWAYS use this tool first when answering questions about Santiago.`,
  parameters: z.object({
    query: z
      .string()
      .describe('The search query to find relevant information about Santiago'),
    category: z
      .enum(['experience', 'skills', 'ai', 'education', 'contact', 'overview', 'all'])
      .optional()
      .describe('Optional category to filter results for more targeted search'),
    limit: z
      .number()
      .min(1)
      .max(10)
      .optional()
      .describe('Number of results to return (1-10)'),
  }),
  execute: async (params: { query: string; category?: string; limit?: number }) => {
    const { query, category, limit } = params;
    const effectiveLimit = limit ?? 5;
    const effectiveCategory = category ?? 'all';

    try {
      // Generate embedding for the search query
      const queryEmbedding = await generateEmbedding(query);

      // Search for similar documents
      const results = await searchSimilar(
        queryEmbedding,
        effectiveLimit,
        effectiveCategory === 'all' ? undefined : effectiveCategory
      );

      if (results.length === 0) {
        return {
          found: 0,
          message: 'No relevant information found for this query.',
          results: [] as Array<{ content: string; category: string; metadata: unknown }>,
        };
      }

      return {
        found: results.length,
        results: results.map((row) => ({
          content: row.content,
          category: row.category,
          metadata: JSON.parse(row.metadata || '{}'),
        })),
      };
    } catch (error) {
      console.error('Knowledge base search error:', error);
      return {
        found: 0,
        error: 'Failed to search knowledge base. Please try again.',
        results: [] as Array<{ content: string; category: string; metadata: unknown }>,
      };
    }
  },
};
