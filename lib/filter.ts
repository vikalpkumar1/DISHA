import { Category, Sector, Opportunity } from '@/data/types';

export interface FilterState {
  query: string;
  category: Category | 'all';
  sector: Sector | 'all';
  state: string; // 'All India' or a specific state; 'All India' matches everything
  tags: string[];
}

export const defaultFilterState: FilterState = {
  query: '',
  category: 'all',
  sector: 'all',
  state: 'All India',
  tags: [],
};

/**
 * Pure, local, zero-cost keyword filter. This is what runs the app by
 * default — no API key, no network call, no data ever leaves the device.
 * The optional AI assistant (see /api/ai-assist) is a convenience layer
 * on top of this, not a replacement for it.
 */
export function filterOpportunities(list: Opportunity[], state: FilterState): Opportunity[] {
  const q = state.query.trim().toLowerCase();

  return list.filter((item) => {
    if (state.category !== 'all' && item.category !== state.category) return false;

    if (state.sector !== 'all' && item.sector !== 'both' && item.sector !== state.sector) return false;

    // 'All India' selection shows everything; a specific state shows that
    // state's listings plus every nationwide ('All India') one.
    if (state.state !== 'All India' && item.state !== 'All India' && item.state !== state.state) return false;

    if (state.tags.length > 0) {
      const hasAllTags = state.tags.every((tag) => item.tags.includes(tag));
      if (!hasAllTags) return false;
    }

    if (!q) return true;

    const haystack = [item.title, item.description, item.issuer, ...item.tags]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function allTags(list: Opportunity[]): string[] {
  const set = new Set<string>();
  list.forEach((item) => item.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}
