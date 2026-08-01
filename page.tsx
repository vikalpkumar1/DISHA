'use client';

import { useState } from 'react';

const initial = { name: '', education: '', skills: '', experience: '', targetRole: '' };

export default function ResumeBuilderPage() {
  const [form, setForm] = useState(initial);
  const [resume, setResume] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof initial>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function generate() {
    setLoading(true);
    setError(null);
    setResume('');
    try {
      const res = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? 'Could not generate a resume right now.');
        return;
      }
      setResume(data.resumeText);
    } catch {
      setError('Network error — check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-bold">📄 AI Resume Builder</h1>
      <p className="mb-4 mt-1 text-sm text-white/60">
        Nothing you type here is saved on any server — it&apos;s used once to draft your resume,
        then forgotten. Only enter things you can genuinely back up in an interview.
      </p>

      <div className="glass space-y-3 rounded-card p-4">
        <Field label="Full name" value={form.name} onChange={(v) => update('name', v)} />
        <Field
          label="Target role (optional)"
          value={form.targetRole}
          onChange={(v) => update('targetRole', v)}
          placeholder="e.g. Frontend Developer Intern"
        />
        <Field
          label="Education"
          value={form.education}
          onChange={(v) => update('education', v)}
          placeholder="e.g. B.Tech CSE, XYZ College, 2027, 8.2 CGPA"
          textarea
        />
        <Field
          label="Skills"
          value={form.skills}
          onChange={(v) => update('skills', v)}
          placeholder="e.g. Python, React, SQL, communication"
          textarea
        />
        <Field
          label="Experience / projects"
          value={form.experience}
          onChange={(v) => update('experience', v)}
          placeholder="Only real things — projects, internships, volunteering"
          textarea
        />

        <button
          onClick={generate}
          disabled={loading || !form.name || !form.education}
          className="gradient-btn w-full rounded-2xl py-3 text-sm font-medium text-white disabled:opacity-40"
        >
          {loading ? 'Drafting…' : '✨ Draft my resume'}
        </button>
        {error && <p className="text-xs text-brand-amber">⚠️ {error}</p>}
      </div>

      {resume && (
        <div className="glass mt-4 rounded-card p-4">
          <p className="mb-2 text-sm font-semibold">Draft — review before using</p>
          <pre className="whitespace-pre-wrap text-sm text-white/80">{resume}</pre>
          <p className="mt-3 text-[11px] text-white/40">
            AI drafts can be wrong or generic — read it fully, fix anything inaccurate, and make
            sure every line is something you can explain in an interview.
          </p>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
}) {
  const cls =
    'w-full rounded-xl bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-blue';
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-white/60">{label}</span>
      {textarea ? (
        <textarea rows={2} className={cls} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={cls} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}
