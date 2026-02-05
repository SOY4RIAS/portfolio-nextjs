// AI Feature - Barrel Export
// Clean Architecture: Single entry point for the AI feature

// Components
export { AIChat } from './components/AIChat';
export { AIWorkflow } from './components/AIWorkflow';
export { AIExpertiseSection } from './components/AIExpertiseSection';

// Data
export { aiExpertise, aiSkills } from './data/ai-expertise';
export type { AIExpertiseArea } from './data/ai-expertise';
export { knowledgeBase } from './data/knowledge-base';
export type { KnowledgeBase } from './data/knowledge-base';

// Services (Legacy - simulated RAG)
export { generateRAGResponse } from './lib/rag-service';

// RAG Infrastructure (Real RAG with AI SDK 6)
export { tursoClient, searchSimilar, checkDatabaseStatus } from './lib/turso';
export { generateEmbedding, generateEmbeddings } from './lib/embeddings';
export { openrouter, FREE_MODELS, getDefaultModel } from './lib/openrouter';

// Agent Tools
export {
  searchKnowledgeBase,
  getGitHubActivity,
  getCurrentDate,
} from './lib/tools';
