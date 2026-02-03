import { streamText } from 'ai';
import { openrouter, FREE_MODELS } from '@/features/ai/lib/openrouter';
import { searchSimilar } from '@/features/ai/lib/turso';
import { generateEmbedding } from '@/features/ai/lib/embeddings';

// Enable edge runtime for faster responses
export const runtime = 'edge';

// System prompt for the portfolio assistant
const SYSTEM_PROMPT = `You are Santiago Arias's portfolio AI assistant, powered by real RAG (Retrieval-Augmented Generation).

## About Santiago
Santiago is a Senior Frontend Developer, Technical Lead, and AI-First Engineer with 8+ years of experience.
He has led teams of 30+ developers and currently works at BitcoinIRA.

## Instructions
- Respond in the same language as the user (Spanish or English)
- Be concise but informative
- Use markdown formatting for better readability
- For contact inquiries, include: me@santiagoarias.dev

## Personality
- Professional but friendly
- Enthusiastic about AI and technology
- Helpful and informative`;

/**
 * Perform RAG: search for relevant context based on the user's query
 */
async function getRelevantContext(query: string): Promise<string> {
  try {
    console.log('\n🔍 RAG Query:', query);

    // Generate embedding for the query
    const embedding = await generateEmbedding(query);
    console.log('📊 Embedding generated (1536 dimensions)');

    // Search for similar documents
    const results = await searchSimilar(embedding, 5);
    console.log(`📚 Found ${results.length} relevant documents:`);

    if (results.length === 0) {
      console.log('   (no results)');
      return '';
    }

    // Log retrieved categories
    results.forEach((doc, i) => {
      console.log(`   ${i + 1}. [${doc.category}] ${doc.content.slice(0, 50)}...`);
    });

    // Format the context
    return results
      .map((doc) => `[${doc.category.toUpperCase()}]: ${doc.content}`)
      .join('\n\n');
  } catch (error) {
    console.error('RAG search error:', error);
    return '';
  }
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Get the last user message for RAG
    const lastUserMessage = messages
      .slice()
      .reverse()
      .find((m: { role: string }) => m.role === 'user');

    // Perform RAG to get relevant context
    let context = '';
    if (lastUserMessage?.content) {
      context = await getRelevantContext(lastUserMessage.content);
    }

    // Build the system prompt with context
    const systemWithContext = context
      ? `${SYSTEM_PROMPT}\n\n## Retrieved Context (use this to answer the user's question):\n${context}`
      : SYSTEM_PROMPT;

    const result = await streamText({
      model: openrouter(FREE_MODELS.LLAMA_70B),
      system: systemWithContext,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
