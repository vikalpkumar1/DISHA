import { NextRequest, NextResponse } from 'next/server';
import { aiComplete, AINotConfiguredError } from '@/lib/ai';
import { opportunities } from '@/data/opportunities';

/**
 * SECURITY DESIGN: the model is only ever allowed to pick ids from the
 * verified `opportunities` dataset — it is never asked to generate a URL,
 * a scheme name, or any other fact from scratch. This route trusts the
 * model for *ranking/matching intent*, never for *inventing content*.
 * Any id it returns that isn't in our dataset is silently dropped.
 */
export async function POST(req: NextRequest) {
  let body: { message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const message = (body.message ?? '').trim();
  if (!message) {
    return NextResponse.json({ error: 'Missing "message".' }, { status: 400 });
  }

  const catalog = opportunities.map((o) => ({
    id: o.id,
    title: o.title,
    category: o.category,
    tags: o.tags,
    description: o.description,
  }));

  const system = `You are a filter, not a source of truth. You will be given a JSON catalog of
verified student opportunities and a student's request in plain language (which may be in
Hindi, English, or Hinglish). Reply with ONLY a JSON object, no prose, no markdown fences:
{"ids": ["id1","id2"], "note": "one short encouraging sentence in the same language style as the request"}
Only use ids that appear in the catalog below. Pick the ones that best match the request.
If nothing matches well, return an empty ids array and a helpful note.

CATALOG:
${JSON.stringify(catalog)}`;

  try {
    const raw = await aiComplete(system, message);
    const cleaned = raw.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned) as { ids?: string[]; note?: string };

    const validIds = new Set(opportunities.map((o) => o.id));
    const ids = (parsed.ids ?? []).filter((id) => validIds.has(id));

    return NextResponse.json({ ids, note: parsed.note ?? '' });
  } catch (err) {
    if (err instanceof AINotConfiguredError) {
      return NextResponse.json(
        {
          error: 'ai_not_configured',
          message:
            'The AI assistant needs ANTHROPIC_API_KEY or a free GEMINI_API_KEY on the server. Local search still works without it.',
        },
        { status: 501 }
      );
    }
    return NextResponse.json({ error: 'ai_failed', message: 'Could not reach the AI assistant.' }, { status: 502 });
  }
}
