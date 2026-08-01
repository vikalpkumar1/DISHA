import { Opportunity } from '@/data/types';

export default function OpportunityCard({ item }: { item: Opportunity }) {
  return (
    <div className="glass mb-3 rounded-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden>
              {item.emoji}
            </span>
            <h3 className="font-semibold leading-tight">{item.title}</h3>
          </div>
          <p className="mt-1 text-xs text-white/60">{item.issuer}</p>
        </div>
        <span className="tag-pill shrink-0">✅ verified</span>
      </div>

      <p className="mt-3 text-sm text-white/80">{item.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {item.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-pill bg-white/8 px-2 py-0.5 text-[11px] text-white/60">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-3 rounded-xl bg-black/30 p-2 text-xs text-white/70">
        💰 {item.feeNote}
      </div>

      <a
        href={item.officialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="gradient-btn mt-3 flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-white"
      >
        <span>Open official site — {item.officialDomain}</span>
        <span aria-hidden>↗</span>
      </a>
      <p className="mt-1 text-center text-[11px] text-white/40">
        Opens {item.officialDomain} directly. Always check the address bar matches this domain.
      </p>
    </div>
  );
}
