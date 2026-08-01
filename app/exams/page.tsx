import OpportunityListPage from '@/components/OpportunityListPage';
import { opportunities } from '@/data/opportunities';

export default function ExamsPage() {
  return (
    <div>
      <div className="glass mb-5 rounded-card p-4 text-sm text-white/70">
        <p className="font-semibold text-white">📝 Every major exam, one place</p>
        <p className="mt-1">
          India doesn&apos;t have a single private-sector exam body the way it has UPSC/SSC/NTA for
          government roles — private hiring mostly happens through company applications and
          aptitude tests instead. NCS (in the Jobs tab) is the best single place for private-sector
          openings. This tab covers the major official exam bodies.
        </p>
      </div>
      <OpportunityListPage
        all={opportunities.filter((o) => o.category === 'exam')}
        title="📝 Exams"
        subtitle="Civil services, banking, SSC and national entrance exams — straight from the exam-conducting body."
      />
    </div>
  );
}
