import { searchSimilar } from '@/features/ai/lib/turso';
import { generateEmbedding } from '@/features/ai/lib/embeddings';

// Use Node.js runtime for better compatibility
export const runtime = 'nodejs';

/**
 * Debug endpoint to test RAG retrieval without LLM
 * GET /api/chat/debug?q=your+query
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get('q') || 'Santiago experience';

  try {
    const startTime = Date.now();

    // Generate embedding
    const embeddingStart = Date.now();
    const embedding = await generateEmbedding(query);
    const embeddingTime = Date.now() - embeddingStart;

    // Search similar documents
    const searchStart = Date.now();
    const results = await searchSimilar(embedding, 5);
    const searchTime = Date.now() - searchStart;

    const totalTime = Date.now() - startTime;

    return Response.json({
      success: true,
      query,
      timing: {
        embedding_ms: embeddingTime,
        search_ms: searchTime,
        total_ms: totalTime,
      },
      embedding: {
        dimensions: embedding.length,
        sample: embedding.slice(0, 5), // First 5 values as sample
      },
      results: results.map((doc, i) => ({
        rank: i + 1,
        category: doc.category,
        preview: doc.content.slice(0, 150) + '...',
        full_content: doc.content,
      })),
      metadata: {
        model: 'openai/text-embedding-3-small',
        vector_db: 'Turso (libSQL)',
        index_type: 'DiskANN cosine similarity',
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    return Response.json(
      {
        success: false,
        error: errorMessage,
        stack: errorStack,
        query,
        env_check: {
          has_openrouter_key: !!process.env.OPENROUTER_API_KEY,
          has_turso_url: !!process.env.TURSO_DATABASE_URL,
        },
      },
      { status: 500 }
    );
  }
}
