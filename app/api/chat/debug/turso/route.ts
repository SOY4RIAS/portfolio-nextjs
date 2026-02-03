import { tursoClient } from '@/features/ai/lib/turso';

export const runtime = 'nodejs';

/**
 * Debug endpoint to verify Turso connection and data
 * GET /api/chat/debug/turso
 */
export async function GET() {
  try {
    // Count documents
    const countResult = await tursoClient.execute(
      'SELECT COUNT(*) as count FROM documents'
    );
    const count = countResult.rows[0]?.count;

    // Get categories breakdown
    const categoriesResult = await tursoClient.execute(
      'SELECT category, COUNT(*) as count FROM documents GROUP BY category'
    );

    // Get sample documents (without embeddings to save bandwidth)
    const samplesResult = await tursoClient.execute(
      'SELECT id, category, substr(content, 1, 100) as preview FROM documents LIMIT 5'
    );

    return Response.json({
      success: true,
      database: {
        connected: true,
        total_documents: count,
        categories: categoriesResult.rows.map((row) => ({
          category: row.category,
          count: row.count,
        })),
      },
      sample_documents: samplesResult.rows.map((row) => ({
        id: row.id,
        category: row.category,
        preview: row.preview + '...',
      })),
      rag_status: Number(count) > 0 ? 'READY' : 'NO_DATA',
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        rag_status: 'ERROR',
      },
      { status: 500 }
    );
  }
}
