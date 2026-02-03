/**
 * Setup Turso Database for RAG
 *
 * This script creates the necessary table and vector index for the RAG system.
 * Run with: npx tsx scripts/setup-turso.ts
 */

import { createClient } from '@libsql/client';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function setupDatabase() {
  console.log('🚀 Setting up Turso database for RAG...\n');

  try {
    // Drop existing table to recreate with new dimensions
    console.log('🗑️  Dropping existing table (if any)...');
    await turso.execute('DROP TABLE IF EXISTS documents');
    console.log('   ✓ Old table dropped\n');

    // Create documents table with vector column
    // Using 768 dimensions for Cloudflare embeddinggemma-300m (FREE)
    console.log('📦 Creating documents table...');
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        category TEXT NOT NULL,
        metadata TEXT,
        embedding F32_BLOB(768),
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('   ✓ Documents table created (768 dimensions - Cloudflare embeddinggemma-300m)\n');

    // Create vector index with DiskANN algorithm for fast similarity search
    console.log('🔍 Creating vector index (DiskANN)...');
    await turso.execute(`
      CREATE INDEX IF NOT EXISTS documents_embedding_idx
      ON documents (
        libsql_vector_idx(embedding, 'metric=cosine', 'type=diskann')
      )
    `);
    console.log('   ✓ Vector index created\n');

    // Verify setup
    const result = await turso.execute(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='documents'"
    );

    if (result.rows.length > 0) {
      console.log('✅ Database setup complete!\n');
      console.log('Next steps:');
      console.log('  1. Run: npx tsx scripts/ingest-data.ts');
      console.log('  2. Start the dev server: npm run dev');
      console.log('  3. Test the chat at http://localhost:3000');
    } else {
      console.error('❌ Table was not created properly');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
