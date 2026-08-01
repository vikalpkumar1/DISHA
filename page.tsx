import OpportunityListPage from '@/components/OpportunityListPage';
import { opportunities } from '@/data/opportunities';

export default function CompetitionsPage() {
  return (
    <div>
      <div className="glass mb-5 rounded-card p-4 text-sm text-white/70">
        <p className="font-semibold text-white">🏆 Real prizes, real rules</p>
        <p className="mt-1">
          Genuine government contests are always run by a named ministry/department, are free to
          enter, and never ask for your bank PIN or OTP to "release" a prize. If a message claims
          you&apos;ve won something you never entered, it&apos;s not real — see the Security note
          on the Home tab.
        </p>
      </div>
      <OpportunityListPage
        all={opportunities.filter((o) => o.category === 'competition')}
        title="🏆 Competitions & Prizes"
        subtitle="Hackathons and ministry-run contests with real cash prizes and certificates."
      />
    </div>
  );
}
