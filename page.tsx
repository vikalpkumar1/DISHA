'use client';

import { useEffect, useState } from 'react';
import { quizBank } from '@/data/quiz';

const BEST_KEY = 'disha-quiz-best-v1';

export default function PracticePage() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [best, setBest] = useState(0);

  useEffect(() => {
    const stored = Number(window.localStorage.getItem(BEST_KEY) ?? 0);
    setBest(stored);
  }, []);

  const q = quizBank[index];

  function choose(i: number) {
    if (selected !== null) return;
    setSelected(i);
    const isCorrect = i === q.correctIndex;
    const nextScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(nextScore);

    setTimeout(() => {
      if (index + 1 < quizBank.length) {
        setIndex(index + 1);
        setSelected(null);
      } else {
        setFinished(true);
        if (nextScore > best) {
          setBest(nextScore);
          window.localStorage.setItem(BEST_KEY, String(nextScore));
        }
      }
    }, 700);
  }

  function restart() {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  return (
    <div>
      <h1 className="text-xl font-bold">🎮 Practice Quiz</h1>
      <p className="mb-4 mt-1 text-sm text-white/60">
        Fully offline — no internet needed. Reasoning, quant and GK questions, exam-prep style.
      </p>

      <div className="glass mb-4 flex items-center justify-between rounded-card p-3 text-sm">
        <span>🏅 Your best: {best}/{quizBank.length}</span>
        <span className="text-white/50">This device only</span>
      </div>

      {!finished ? (
        <div className="glass rounded-card p-4">
          <p className="mb-1 text-xs uppercase tracking-wide text-brand-amber">{q.topic}</p>
          <p className="mb-1 text-xs text-white/40">
            Question {index + 1} of {quizBank.length}
          </p>
          <p className="mb-4 text-base font-medium">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = i === q.correctIndex;
              let cls = 'glass';
              if (selected !== null && isCorrect) cls = 'bg-brand-emerald/20 border border-brand-emerald';
              else if (isSelected && !isCorrect) cls = 'bg-red-500/20 border border-red-500';
              return (
                <button
                  key={opt}
                  onClick={() => choose(i)}
                  disabled={selected !== null}
                  className={`w-full rounded-xl px-4 py-2.5 text-left text-sm ${cls}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="glass rounded-card p-6 text-center">
          <p className="text-2xl">🎉</p>
          <p className="mt-2 text-lg font-semibold">
            You scored {score}/{quizBank.length}
          </p>
          <p className="mt-1 text-sm text-white/50">Personal best: {best}/{quizBank.length}</p>
          <button onClick={restart} className="gradient-btn mt-4 rounded-2xl px-6 py-2.5 text-sm font-medium text-white">
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
