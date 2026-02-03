/**
 * Ingest Resume Data into Turso Vector Database
 *
 * This script chunks the resume data and generates embeddings for each chunk,
 * then stores them in Turso for semantic search.
 *
 * Run with: npx tsx scripts/ingest-data.ts
 */

import { createClient } from '@libsql/client';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

// Import resume data
import { resumeData } from '../data/resume';

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

interface DocumentChunk {
  content: string;
  category: string;
  metadata: Record<string, unknown>;
}

/**
 * Generate embedding using Cloudflare Workers AI (FREE)
 * Using @cf/google/embeddinggemma-300m (768 dimensions)
 */
async function generateEmbedding(text: string): Promise<number[]> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/google/embeddinggemma-300m`,
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
 * Chunk resume data into semantic units
 */
function chunkResumeData(): DocumentChunk[] {
  const chunks: DocumentChunk[] = [];

  // Personal Info & Summary
  chunks.push({
    content: `Santiago Arias is a ${resumeData.personalInfo.title}.

${resumeData.personalInfo.summary}

Location: ${resumeData.personalInfo.location || 'Remote'}
Experience: 8+ years in frontend development and technical leadership
Current Role: Senior Frontend Developer at BitcoinIRA`,
    category: 'overview',
    metadata: { source: 'personal_info', type: 'summary' },
  });

  // Each work experience as separate chunk
  resumeData.experience.forEach((exp) => {
    const achievements = exp.achievements?.join('\n- ') || '';
    chunks.push({
      content: `Work Experience at ${exp.company}

Role: ${exp.role}
Period: ${exp.period}

${exp.description}

${achievements ? `Key Achievements:\n- ${achievements}` : ''}`,
      category: 'experience',
      metadata: {
        company: exp.company,
        role: exp.role,
        period: exp.period,
      },
    });
  });

  // Skills grouped by category
  const skillsByCategory = resumeData.skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill.name);
      return acc;
    },
    {} as Record<string, string[]>
  );

  Object.entries(skillsByCategory).forEach(([category, skills]) => {
    chunks.push({
      content: `Technical Skills - ${category}

Santiago is proficient in the following ${category.toLowerCase()} technologies:
${skills.join(', ')}`,
      category: 'skills',
      metadata: { skillCategory: category, skills },
    });
  });

  // AI Expertise
  resumeData.aiExpertise.forEach((expertise) => {
    chunks.push({
      content: `AI Expertise: ${expertise.title}

${expertise.description}

Key Areas: ${expertise.items.join(', ')}`,
      category: 'ai',
      metadata: { expertiseType: expertise.title, items: expertise.items },
    });
  });

  // Education
  resumeData.education.forEach((edu) => {
    chunks.push({
      content: `Education

Degree: ${edu.degree}
School: ${edu.school}
Period: ${edu.period}`,
      category: 'education',
      metadata: { school: edu.school, degree: edu.degree },
    });
  });

  // Contact Information
  chunks.push({
    content: `Contact Information for Santiago Arias

Email: ${resumeData.personalInfo.email}
GitHub: ${resumeData.personalInfo.github}
LinkedIn: ${resumeData.personalInfo.linkedin}
Website: ${resumeData.personalInfo.website}

Feel free to reach out for collaboration, job opportunities, or just to say hi!`,
    category: 'contact',
    metadata: {
      email: resumeData.personalInfo.email,
      github: resumeData.personalInfo.github,
    },
  });

  return chunks;
}

/**
 * Clear existing documents (optional, for re-ingestion)
 */
async function clearExistingDocuments(): Promise<void> {
  console.log('🗑️  Clearing existing documents...');
  await turso.execute('DELETE FROM documents');
  console.log('   ✓ Cleared\n');
}

/**
 * Main ingestion function
 */
async function ingestData() {
  console.log('🚀 Starting data ingestion...\n');

  // Check if Cloudflare credentials are set
  if (!process.env.CLOUDFLARE_ACCOUNT_ID || !process.env.CLOUDFLARE_API_TOKEN) {
    console.error('❌ CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN is not set in .env.local');
    process.exit(1);
  }

  // Clear existing data (uncomment if you want to re-ingest)
  await clearExistingDocuments();

  const chunks = chunkResumeData();
  console.log(`📦 Processing ${chunks.length} chunks...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const progress = `[${i + 1}/${chunks.length}]`;

    try {
      process.stdout.write(`${progress} Generating embedding for ${chunk.category}...`);

      // Generate embedding
      const embedding = await generateEmbedding(chunk.content);
      const embeddingStr = `[${embedding.join(',')}]`;

      // Insert into Turso
      await turso.execute({
        sql: `INSERT INTO documents (content, category, metadata, embedding)
              VALUES (?, ?, ?, vector(?))`,
        args: [
          chunk.content,
          chunk.category,
          JSON.stringify(chunk.metadata),
          embeddingStr,
        ],
      });

      console.log(' ✓');
      successCount++;

      // Small delay to avoid rate limits
      await new Promise((r) => setTimeout(r, 200));
    } catch (error) {
      console.log(' ❌');
      console.error(`   Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Ingestion complete!`);
  console.log(`   Success: ${successCount}/${chunks.length}`);
  if (errorCount > 0) {
    console.log(`   Errors: ${errorCount}`);
  }

  // Verify data
  const countResult = await turso.execute('SELECT COUNT(*) as count FROM documents');
  console.log(`   Total documents in DB: ${countResult.rows[0]?.count}`);

  console.log('\nNext steps:');
  console.log('  1. Start the dev server: npm run dev');
  console.log('  2. Test the chat at http://localhost:3000');
}

ingestData().catch(console.error);
