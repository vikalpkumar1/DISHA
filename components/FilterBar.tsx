'use client';

import { Category } from '@/data/types';
import { categoryLabels, indianStates } from '@/data/opportunities';
import { FilterState } from '@/lib/filter';

const categories: (Category | 'all')[] = ['all', ...(Object.keys(categoryLabels) as Category[])];
const sectors: { value: FilterState['sector']; label: string }[] = [
  { value: 'all', label: '✨ All' },
  { value: 'government', label: '🏛️ Govt.' },
  { value: 'private', label: '🏢 Private' },
];

export default function FilterBar({
  state,
  onChange,
}: {
  state: FilterState;
  onChange: (next: FilterState) => void;
}) {
  return (
    <div className="mb-4">
      <input
        value={state.query}
        onChange={(e) => onChange({ ...state, query: e.target.value })}
        placeholder="🔎 Search e.g. 'internship for engineering students'"
        className="glass w-full rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-blue"
      />

      <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => {
          const active = state.category === cat;
          const label = cat === 'all' ? '✨ All' : `${categoryLabels[cat].emoji} ${categoryLabels[cat].label}`;
          return (
            <button
              key={cat}
              onClick={() => onChange({ ...state, category: cat })}
              className={`shrink-0 rounded-pill px-3 py-1.5 text-xs transition ${
                active ? 'gradient-btn text-white' : 'glass text-white/70'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          {sectors.map((s) => {
            const active = state.sector === s.value;
            return (
              <button
                key={s.value}
                onClick={() => onChange({ ...state, sector: s.value })}
                className={`rounded-pill px-3 py-1.5 text-xs transition ${
                  active ? 'gradient-btn text-white' : 'glass text-white/70'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        <select
          value={state.state}
          onChange={(e) => onChange({ ...state, state: e.target.value })}
          className="glass ml-auto rounded-pill px-3 py-1.5 text-xs text-white/80 focus:outline-none"
          aria-label="Filter by state"
        >
          {indianStates.map((s) => (
            <option key={s} value={s} className="bg-bg-dark">
              📍 {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
