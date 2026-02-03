/**
 * Generate embeddings using HuggingFace Inference API
 * Model: all-MiniLM-L6-v2 (384 dimensions, free tier)
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await fetch(
    'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: text,
        options: {
          wait_for_model: true,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HuggingFace API error: ${error}`);
  }

  const embedding = await response.json();

  // The API returns the embedding directly as an array of numbers
  if (Array.isArray(embedding) && typeof embedding[0] === 'number') {
    return embedding;
  }

  // Sometimes it returns nested array for single input
  if (Array.isArray(embedding) && Array.isArray(embedding[0])) {
    return embedding[0];
  }

  throw new Error('Unexpected embedding format from HuggingFace API');
}

/**
 * Generate embeddings for multiple texts (batched)
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const response = await fetch(
    'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: texts,
        options: {
          wait_for_model: true,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HuggingFace API error: ${error}`);
  }

  return response.json();
}
