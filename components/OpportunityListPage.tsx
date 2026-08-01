'use client';

import { useMemo, useState } from 'react';
import { Category, Opportunity } from '@/data/types';
import { defaultFilterState, filterOpportunities, FilterState } from '@/lib/filter';
import FilterBar from './FilterBar';
import AIAssistantPanel from './AIAssistantPanel';
import OpportunityCard from './OpportunityCard';

export default function OpportunityListPage({
  all,
  lockCategory,
  title,
  subtitle,
}: {
  all: Opportunity[];
  lockCategory?: Category;
  title: string;
  subtitle: string;
}) {
  const [state, setState] = useState<FilterState>({
    ...defaultFilterState,
    category: lockCategory ?? 'all',
  });
  const [aiIds, setAiIds] = useState<string[] | null>(null);
  const [aiNote, setAiNote] = useState('');

  const base = useMemo(
    () => (lockCategory ? all.filter((o) => o.category === lockCategory) : all),
    [all, lockCategory]
  );

  const filtered = useMemo(() => filterOpportunities(base, state), [base, state]);

  const shown = aiIds ? base.filter((o) => aiIds.includes(o.id)) : filtered;

  return (
    <div>
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="mb-4 mt-1 text-sm text-white/60">{subtitle}</p>

      <AIAssistantPanel
        onResult={(ids, note) => {
          setAiIds(ids);
          setAiNote(note);
        }}
      />
      {aiIds && (
        <div className="mb-3 flex items-center justify-between text-xs text-white/60">
          <span>🤖 {aiNote || `${aiIds.length} match(es) found`}</span>
          <button className="text-brand-amber" onClick={() => setAiIds(null)}>
            Clear AI filter
          </button>
        </div>
      )}

      {!lockCategory && <FilterBar state={state} onChange={setState} />}

      {shown.length === 0 && (
        <p className="glass rounded-card p-4 text-sm text-white/60">
          No matches yet. Try a broader search — every result here is still hand-verified, so the
          list is intentionally small rather than padded with unchecked links.
        </p>
      )}

      {shown.map((item) => (
        <OpportunityCard key={item.id} item={item} />
      ))}
    </div>
  );
}
