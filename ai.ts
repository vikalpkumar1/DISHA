import { callClaude, callClaudeVision } from './anthropic';
import { callGemini, callGeminiVision } from './gemini';

export class AINotConfiguredError extends Error {
  constructor() {
    super('No AI provider configured — set ANTHROPIC_API_KEY or the free GEMINI_API_KEY.');
    this.name = 'AINotConfiguredError';
  }
}

export type Provider = 'anthropic' | 'gemini' | null;

export function activeProvider(): Provider {
  if (process.env.ANTHROPIC_API_KEY) return 'anthropic';
  if (process.env.GEMINI_API_KEY) return 'gemini';
  return null;
}

/** Text-only completion. Prefers Anthropic if both keys are set. */
export async function aiComplete(system: string, userMessage: string): Promise<string> {
  const provider = activeProvider();
  if (provider === 'anthropic') return callClaude(system, userMessage);
  if (provider === 'gemini') return callGemini(system, userMessage);
  throw new AINotConfiguredError();
}

/** Vision completion (used by the homework camera helper). */
export async function aiCompleteWithImage(
  system: string,
  userMessage: string,
  imageBase64: string,
  imageMediaType: string
): Promise<string> {
  const provider = activeProvider();
  if (provider === 'anthropic') return callClaudeVision(system, userMessage, imageBase64, imageMediaType);
  if (provider === 'gemini') return callGeminiVision(system, userMessage, imageBase64, imageMediaType);
  throw new AINotConfiguredError();
}
