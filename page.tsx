import Link from 'next/link';

const menu = [
  { href: '/schemes', emoji: '🏛️', title: 'Govt. Schemes', desc: 'myScheme, NSP + foreign-study scholarships' },
  { href: '/exams', emoji: '📝', title: 'Exams', desc: 'UPSC, SSC, NTA, IBPS — straight from the source' },
  { href: '/internships', emoji: '💼', title: 'Internships & Jobs', desc: 'Govt. + private, PM Internship, NCS' },
  { href: '/competitions', emoji: '🏆', title: 'Competitions & Prizes', desc: 'Hackathons, contests, real cash prizes' },
  { href: '/homework-help', emoji: '📚', title: 'AI Homework Help', desc: 'Type it or snap a photo — step-by-step' },
  { href: '/timetable', emoji: '⏰', title: 'Timetable', desc: 'Your schedule, with local reminders' },
  { href: '/practice', emoji: '🎮', title: 'Practice Quiz', desc: 'Offline reasoning, quant & GK — no signal needed' },
  { href: '/resume-builder', emoji: '📄', title: 'AI Resume Builder', desc: 'Honest, ATS-friendly, nothing stored' },
  { href: '/linkedin-guide', emoji: '🔗', title: 'LinkedIn Guide', desc: 'Build a real profile the safe, correct way' },
];

export default function HomePage() {
  return (
    <div>
      <header className="mb-6">
        <p className="text-sm text-brand-emerald">🇮🇳 Disha AI · दिशा</p>
        <h1 className="mt-1 text-2xl font-bold leading-tight">
          Real opportunities only. <span className="text-brand-amber">Zero fake portals.</span>
        </h1>
        <p className="mt-2 text-sm text-white/60">
          "Disha" means direction — every listing here links straight to the official government
          or verified site. We never copy a login page, and we never ask for your Aadhaar, OTP or
          bank details.
        </p>
      </header>

      <div className="glass mb-6 rounded-card p-4 text-sm">
        <p className="font-medium">🛡️ How we keep this safe</p>
        <ul className="mt-2 space-y-1 text-white/70">
          <li>• Every card shows the real domain before you tap it</li>
          <li>• Links open the actual official site in your browser — never inside this app</li>
          <li>• Nothing here is ever "guaranteed" — schemes have real eligibility rules</li>
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="glass flex flex-col justify-between rounded-card p-4 transition hover:bg-white/10"
          >
            <span className="text-3xl" aria-hidden>
              {item.emoji}
            </span>
            <div className="mt-3">
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="mt-0.5 text-xs text-white/50">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="glass mt-4 rounded-card p-4 text-sm">
        <p className="font-medium">🚩 See something suspicious?</p>
        <p className="mt-1 text-white/60">
          A real government site never asks you to pay to "unlock" a scheme, job or result. If a
          link asks for money, screenshots your OTP, or the domain doesn&apos;t end in .gov.in,
          stop and report it — see SECURITY.md in the README.
        </p>
      </div>
    </div>
  );
}
