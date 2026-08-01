'use client';

import { useState } from 'react';

export default function AIAssistantPanel({ onResult }: { onResult: (ids: string[], note: string) => void }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function ask() {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ai-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? 'AI assistant is unavailable right now — try the search box above instead.');
        return;
      }
      onResult(data.ids ?? [], data.note ?? '');
    } catch {
      setError('Could not reach the AI assistant. The regular search box still works fully offline-safe.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass mb-4 rounded-card p-4">
      <p className="mb-2 text-sm font-medium">🤖 Ask the AI assistant</p>
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && ask()}
          placeholder="e.g. 'paid internship for a 2nd year CS student'"
          className="flex-1 rounded-2xl bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
        />
        <button
          onClick={ask}
          disabled={loading}
          className="gradient-btn rounded-2xl px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? '…' : 'Go'}
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-brand-amber">⚠️ {error}</p>}
      <p className="mt-2 text-[11px] text-white/40">
        The assistant only ever picks from our hand-verified list below — it never invents a scheme or a link.
      </p>
    </div>
  );
}
