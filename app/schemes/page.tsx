import OpportunityListPage from '@/components/OpportunityListPage';
import { opportunities } from '@/data/opportunities';

export default function SchemesPage() {
  return (
    <OpportunityListPage
      all={opportunities.filter((o) => o.category === 'scheme' || o.category === 'scholarship')}
      title="🏛️ Govt. Schemes & Scholarships"
      subtitle="Verified central and state government schemes. Tap any card to go straight to the real .gov.in page."
    />
  );
}
