import { createOpenRouter } from '@openrouter/ai-sdk-provider';

/**
 * OpenRouter provider configured for the portfolio
 */
export const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});

/**
 * Available free models on OpenRouter
 * All these models have :free suffix and don't consume credits
 */
export const FREE_MODELS = {
  // Best for general chat - GPT-4 level performance, 128K context
  LLAMA_70B: 'meta-llama/llama-3.3-70b-instruct:free',

  // Best for long context (1M tokens) and multimodal
  GEMINI_FLASH: 'google/gemini-2.0-flash-exp:free',

  // Best for reasoning and complex analysis
  DEEPSEEK_R1: 'deepseek/deepseek-r1:free',

  // Fast and efficient for code tasks, 262K context
  QWEN_CODER: 'qwen/qwen-2.5-coder-32b-instruct:free',

  // Lightweight option for simple tasks
  LLAMA_8B: 'meta-llama/llama-3.1-8b-instruct:free',
} as const;

export type FreeModel = (typeof FREE_MODELS)[keyof typeof FREE_MODELS];

/**
 * Get the default model for chat
 */
export function getDefaultModel(): FreeModel {
  return FREE_MODELS.LLAMA_70B;
}
