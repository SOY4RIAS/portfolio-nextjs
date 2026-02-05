import { createClient } from '@libsql/client';

// Turso client for vector database operations
export const tursoClient = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export interface DocumentRow {
  id: number;
  content: string;
  category: string;
  metadata: string;
}

/**
 * Search for similar documents using vector similarity
 * Uses DiskANN index with cosine similarity
 */
export async function searchSimilar(
  queryEmbedding: number[],
  limit: number = 5,
  category?: string
): Promise<DocumentRow[]> {
  const embeddingStr = `[${queryEmbedding.join(',')}]`;

  if (category && category !== 'all') {
    const result = await tursoClient.execute({
      sql: `
        SELECT
          d.id,
          d.content,
          d.category,
          d.metadata
        FROM vector_top_k('documents_embedding_idx', vector(?), ?) AS v
        JOIN documents d ON d.rowid = v.id
        WHERE d.category = ?
      `,
      args: [embeddingStr, limit * 2, category], // Fetch more to filter
    });
    return result.rows.slice(0, limit) as unknown as DocumentRow[];
  }

  const result = await tursoClient.execute({
    sql: `
      SELECT
        d.id,
        d.content,
        d.category,
        d.metadata
      FROM vector_top_k('documents_embedding_idx', vector(?), ?) AS v
      JOIN documents d ON d.rowid = v.id
    `,
    args: [embeddingStr, limit],
  });

  return result.rows as unknown as DocumentRow[];
}

/**
 * Insert a document with its embedding
 */
export async function insertDocument(
  content: string,
  category: string,
  metadata: Record<string, unknown>,
  embedding: number[]
): Promise<void> {
  const embeddingStr = `[${embedding.join(',')}]`;

  await tursoClient.execute({
    sql: `INSERT INTO documents (content, category, metadata, embedding)
          VALUES (?, ?, ?, vector(?))`,
    args: [content, category, JSON.stringify(metadata), embeddingStr],
  });
}

/**
 * Check if the documents table exists and has data
 */
export async function checkDatabaseStatus(): Promise<{
  tableExists: boolean;
  documentCount: number;
}> {
  try {
    const result = await tursoClient.execute(
      'SELECT COUNT(*) as count FROM documents'
    );
    return {
      tableExists: true,
      documentCount: Number(result.rows[0]?.count ?? 0),
    };
  } catch {
    return {
      tableExists: false,
      documentCount: 0,
    };
  }
}
