/**
 * Generate embeddings using Cloudflare Workers AI (FREE)
 * Model: @cf/google/embeddinggemma-300m (768 dimensions)
 * Free tier: 10,000 neurons/day
 */

const CLOUDFLARE_MODEL = '@cf/google/embeddinggemma-300m';
const FALLBACK_MODEL = '@cf/baai/bge-small-en-v1.5'; // 384 dimensions fallback

export async function generateEmbedding(text: string): Promise<number[]> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !apiToken) {
    throw new Error('Cloudflare credentials not configured');
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${CLOUDFLARE_MODEL}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: [text] }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Cloudflare AI error: ${error}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(`Cloudflare AI error: ${JSON.stringify(result.errors)}`);
  }

  return result.result.data[0];
}

/**
 * Generate embeddings for multiple texts (batched)
 * Cloudflare supports up to 100 texts per request
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !apiToken) {
    throw new Error('Cloudflare credentials not configured');
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${CLOUDFLARE_MODEL}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: texts }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Cloudflare AI error: ${error}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(`Cloudflare AI error: ${JSON.stringify(result.errors)}`);
  }

  return result.result.data;
}
