'use client';

import { useRef, useState } from 'react';

export default function HomeworkHelpPage() {
  const [question, setQuestion] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMediaType, setImageMediaType] = useState<string | null>(null);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function onFileChosen(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageMediaType(file.type || 'image/jpeg');
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      // Strip the "data:image/...;base64," prefix — the API only wants raw base64.
      setImageBase64(result.split(',')[1] ?? '');
    };
    reader.readAsDataURL(file);
  }

  function clearImage() {
    setImagePreview(null);
    setImageBase64(null);
    setImageMediaType(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function ask() {
    if (!question.trim() && !imageBase64) return;
    setLoading(true);
    setError(null);
    setAnswer('');
    try {
      const res = await fetch('/api/homework-help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          imageBase64: imageBase64 ?? undefined,
          imageMediaType: imageMediaType ?? undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? 'Could not get an answer right now.');
        return;
      }
      setAnswer(data.answer);
    } catch {
      setError('Network error — check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-bold">📚 Homework Help</h1>
      <p className="mb-4 mt-1 text-sm text-white/60">
        Type a question, or snap a photo of it. This explains the steps like a tutor — it&apos;s
        for understanding your homework, not for submitting live exam answers.
      </p>

      <div className="glass space-y-3 rounded-card p-4">
        <textarea
          rows={3}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. 'Explain how to factorise x² + 5x + 6' or leave blank and attach a photo"
          className="w-full rounded-xl bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />

        {imagePreview ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagePreview} alt="Homework question" className="max-h-56 w-full rounded-xl object-contain bg-black/30" />
            <button
              onClick={clearImage}
              className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white"
            >
              ✕ remove
            </button>
          </div>
        ) : (
          <label className="glass flex cursor-pointer items-center justify-center gap-2 rounded-xl py-4 text-sm text-white/70">
            📷 Take or upload a photo of the question
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={onFileChosen}
            />
          </label>
        )}

        <button
          onClick={ask}
          disabled={loading || (!question.trim() && !imageBase64)}
          className="gradient-btn w-full rounded-2xl py-3 text-sm font-medium text-white disabled:opacity-40"
        >
          {loading ? 'Thinking…' : '✨ Help me understand this'}
        </button>
        {error && <p className="text-xs text-brand-amber">⚠️ {error}</p>}
      </div>

      {answer && (
        <div className="glass mt-4 rounded-card p-4">
          <p className="mb-2 text-sm font-semibold">🧑\u200d🏫 Explanation</p>
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-white/80">{answer}</div>
        </div>
      )}
    </div>
  );
}
