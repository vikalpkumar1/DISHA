import { NextRequest, NextResponse } from 'next/server';
import { aiComplete, aiCompleteWithImage, AINotConfiguredError } from '@/lib/ai';

const SYSTEM = `You are a patient study tutor for an Indian school/college student. You may be given a
typed question, or a photo of a handwritten/printed question (from a textbook, worksheet or exam
paper). Your job is to teach, not just answer:
- Explain the concept and walk through the steps, the way a good tutor would.
- Give the final answer clearly at the end, but make sure the reasoning that gets there is visible
  and easy to follow.
- If the photo is blurry, cut off, or you're not confident what it says, say so and ask what's
  unclear rather than guessing at the question.
- If the question is from a live exam/test the student says they are currently taking, gently
  suggest they focus on understanding it for next time rather than submitting it as their answer
  right now — you're here to help them learn, not to help them cheat on a live assessment.
- Keep it concise: use short paragraphs or numbered steps, not a wall of text.`;

export async function POST(req: NextRequest) {
  let body: { question?: string; imageBase64?: string; imageMediaType?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const question = (body.question ?? '').trim();
  const { imageBase64, imageMediaType } = body;

  if (!question && !imageBase64) {
    return NextResponse.json({ error: 'Send a question or a photo.' }, { status: 400 });
  }

  try {
    const answer = imageBase64
      ? await aiCompleteWithImage(
          SYSTEM,
          question || 'Please explain and solve the question shown in this photo, step by step.',
          imageBase64,
          imageMediaType || 'image/jpeg'
        )
      : await aiComplete(SYSTEM, question);

    return NextResponse.json({ answer });
  } catch (err) {
    if (err instanceof AINotConfiguredError) {
      return NextResponse.json(
        {
          error: 'ai_not_configured',
          message: 'Add ANTHROPIC_API_KEY or a free GEMINI_API_KEY on the server to enable homework help.',
        },
        { status: 501 }
      );
    }
    return NextResponse.json({ error: 'ai_failed', message: 'Could not process that right now — try again.' }, { status: 502 });
  }
}
