/**
 * Server-only helper for Google AI Studio's Gemini API — a free-tier
 * alternative to Anthropic's API. Get a free key at https://aistudio.google.com/apikey
 * and set GEMINI_API_KEY in .env.local. Never import this from a
 * "use client" component.
 *
 * Model names change over time — if GEMINI_MODEL isn't set, this uses a
 * sensible default, but check https://ai.google.dev/gemini-api/docs/models
 * for the current model list and update .env.local if the default 404s.
 */

const DEFAULT_MODEL = 'gemini-2.5-flash';

export class GeminiNotConfiguredError extends Error {
  constructor() {
    super('GEMINI_API_KEY is not set on the server.');
    this.name = 'GeminiNotConfiguredError';
  }
}

function endpoint(model: string, apiKey: string) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
}

interface GeminiPart {
  text?: string;
  inline_data?: { mime_type: string; data: string };
}

async function generate(systemPrompt: string, parts: GeminiPart[]): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new GeminiNotConfiguredError();
  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;

  const res = await fetch(endpoint(model, apiKey), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: 'user', parts }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${text}`);
  }

  const data = await res.json();
  const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text ?? '';
}

export async function callGemini(systemPrompt: string, userMessage: string): Promise<string> {
  return generate(systemPrompt, [{ text: userMessage }]);
}

export async function callGeminiVision(
  systemPrompt: string,
  userMessage: string,
  imageBase64: string,
  imageMediaType: string
): Promise<string> {
  return generate(systemPrompt, [
    { text: userMessage },
    { inline_data: { mime_type: imageMediaType, data: imageBase64 } },
  ]);
}
