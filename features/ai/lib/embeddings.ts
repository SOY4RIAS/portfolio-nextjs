/**
 * Generate embeddings using OpenRouter API
 * Model: openai/text-embedding-3-small (1536 dimensions)
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await fetch('https://openrouter.ai/api/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://santiagoarias.dev',
      'X-Title': 'Santiago Arias Portfolio',
    },
    body: JSON.stringify({
      model: 'openai/text-embedding-3-small',
      input: text,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${error}`);
  }

  const result = await response.json();
  return result.data[0].embedding;
}

/**
 * Generate embeddings for multiple texts (batched)
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const response = await fetch('https://openrouter.ai/api/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://santiagoarias.dev',
      'X-Title': 'Santiago Arias Portfolio',
    },
    body: JSON.stringify({
      model: 'openai/text-embedding-3-small',
      input: texts,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${error}`);
  }

  const result = await response.json();
  return result.data.map((item: { embedding: number[] }) => item.embedding);
}
