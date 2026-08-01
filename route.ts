import { NextRequest, NextResponse } from 'next/server';
import { aiComplete, AINotConfiguredError } from '@/lib/ai';

/**
 * PRIVACY DESIGN: this route is fully stateless. It forwards the form
 * data to the Anthropic API for one completion and returns the result —
 * nothing is written to a database, a log file, or any third party
 * other than Anthropic (whose API you are calling with your own key).
 * If you add analytics/logging later, make sure resume content is
 * excluded from it.
 */
export async function POST(req: NextRequest) {
  let body: {
    name?: string;
    education?: string;
    skills?: string;
    experience?: string;
    targetRole?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { name = '', education = '', skills = '', experience = '', targetRole = '' } = body;
  if (!name || !education) {
    return NextResponse.json({ error: 'Name and education are required.' }, { status: 400 });
  }

  const system = `You write clean, honest, ATS-friendly student resumes in plain text (no markdown,
no invented facts, no fake companies or numbers). Only use the details the student gives you —
if something is missing, leave it out rather than making it up. Structure: Contact line, Summary
(2 lines), Education, Skills, Experience/Projects, Certifications (if mentioned). Keep it under
350 words and honest — this resume must hold up if an employer asks the student about anything
in it.`;

  const userMessage = `Name: ${name}
Target role: ${targetRole || 'not specified'}
Education: ${education}
Skills: ${skills || 'not specified'}
Experience / projects: ${experience || 'not specified'}`;

  try {
    const resumeText = await aiComplete(system, userMessage);
    return NextResponse.json({ resumeText });
  } catch (err) {
    if (err instanceof AINotConfiguredError) {
      return NextResponse.json(
        {
          error: 'ai_not_configured',
          message: 'Add ANTHROPIC_API_KEY or a free GEMINI_API_KEY on the server to enable AI resume drafting.',
        },
        { status: 501 }
      );
    }
    return NextResponse.json({ error: 'ai_failed', message: 'Could not generate the resume right now.' }, { status: 502 });
  }
}
