// AI Feature - Barrel Export
// Clean Architecture: Single entry point for the AI feature

// Components
export { AIChat } from './components/AIChat';
export { AIWorkflow } from './components/AIWorkflow';
export { AIExpertiseSection } from './components/AIExpertiseSection';

// Data
export { aiExpertise, aiSkills } from './data/ai-expertise';
export type { AIExpertiseArea, AISkill } from './data/ai-expertise';
export { knowledgeBase } from './data/knowledge-base';
export type { KnowledgeBase } from './data/knowledge-base';

// Services
export { generateRAGResponse } from './lib/rag-service';
