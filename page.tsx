const checklist = [
  { emoji: '📸', title: 'Real photo, clear face', text: 'A recent, simple headshot beats no photo or a group photo — recruiters skip blank profiles.' },
  { emoji: '✍️', title: 'Headline beyond your title', text: '"CS student building ML projects | Python, React" tells people what you actually do.' },
  { emoji: '🎓', title: 'Education first', text: 'Add your college, expected graduation year, and relevant coursework.' },
  { emoji: '🧩', title: 'Projects & certificates', text: 'Add your Skill India Digital certificate and any hackathon you competed in.' },
  { emoji: '🤝', title: 'Connect with real people', text: 'Classmates, professors, alumni — quality over quantity. Avoid mass-connecting with strangers.' },
  { emoji: '🔒', title: 'Lock down privacy', text: 'Turn off showing your exact birthday and phone number publicly in Settings → Visibility.' },
];

export default function LinkedInGuidePage() {
  return (
    <div>
      <h1 className="text-xl font-bold">🔗 LinkedIn, done safely</h1>
      <p className="mb-4 mt-1 text-sm text-white/60">
        We never auto-create accounts for you — that breaks LinkedIn&apos;s own rules and puts
        your account at risk of being banned. Instead, here&apos;s exactly what to set up yourself,
        in order.
      </p>

      <a
        href="https://www.linkedin.com/signup"
        target="_blank"
        rel="noopener noreferrer"
        className="gradient-btn mb-4 flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-white"
      >
        <span>Open the real LinkedIn sign-up — linkedin.com</span>
        <span aria-hidden>↗</span>
      </a>

      <div className="space-y-3">
        {checklist.map((item) => (
          <div key={item.title} className="glass rounded-card p-4">
            <p className="text-sm font-semibold">
              {item.emoji} {item.title}
            </p>
            <p className="mt-1 text-sm text-white/60">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="glass mt-4 rounded-card p-4 text-sm text-white/60">
        Want AI-written summary lines for your headline or About section? Use the Resume Builder
        tab — copy the language style from your draft resume into your LinkedIn profile.
      </div>
    </div>
  );
}
