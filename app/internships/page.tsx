import OpportunityListPage from '@/components/OpportunityListPage';
import { opportunities } from '@/data/opportunities';

const steps = [
  { emoji: '1️⃣', text: 'Pick ONE official platform below (NCS for jobs, PM Internship for internships).' },
  { emoji: '2️⃣', text: 'Register with your real name, a real email, and your actual education details.' },
  { emoji: '3️⃣', text: 'Take the free NCS Employability Assessment — it points you to roles you actually qualify for.' },
  { emoji: '4️⃣', text: 'Apply to 2–3 roles that fit, using your resume — build one in the Resume tab first.' },
  { emoji: '5️⃣', text: 'Never pay a "registration fee," "training deposit," or "processing charge" — official platforms are free.' },
];

export default function InternshipsPage() {
  return (
    <div>
      <div className="glass mb-5 rounded-card p-4">
        <p className="mb-2 text-sm font-semibold">📋 Step-by-step: earning as a student</p>
        <ol className="space-y-2 text-sm text-white/70">
          {steps.map((s) => (
            <li key={s.text} className="flex gap-2">
              <span aria-hidden>{s.emoji}</span>
              <span>{s.text}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-white/40">
          Tip: the "women-friendly" tag surfaces listings with dedicated support for women
          candidates — try searching "women" above.
        </p>
      </div>

      <OpportunityListPage
        all={opportunities.filter((o) => ['internship', 'job', 'skilling'].includes(o.category))}
        title="💼 Internships, Jobs & Free Courses"
        subtitle="Real, paid, official opportunities only — plus free skill certificates that strengthen your resume."
      />
    </div>
  );
}
