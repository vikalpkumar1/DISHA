# 🇮🇳 Disha AI (दिशा — "direction")

India's student super app — one place to find **verified** government and private
exams, scholarships (including fully-funded study abroad), internships, jobs and prize
competitions, with an AI assistant that filters (never invents), a camera-ready
homework helper, a timetable with reminders, an offline practice quiz, a resume
builder, and a LinkedIn setup guide.

**Core promise:** every listing is hand-checked, shows its real domain before you tap
it, and opens the actual official site — never a clone, never an embedded login form.
Read [`SECURITY.md`](./SECURITY.md) before adding any new listing.

## ✨ What's included

| Screen | What it does |
|---|---|
| 🏠 Home | Emoji menu into every section, plus the safety notice |
| 🏛️ Schemes | myScheme, NSP + the National Overseas Scholarship for study abroad |
| 📝 Exams | UPSC, SSC, NTA (JEE/NEET/CUET/UGC-NET), IBPS — govt exam bodies, direct |
| 💼 Internships & Jobs | PM Internship Scheme, NCS (govt **and** private listings side by side) — filterable by sector and state |
| 🏆 Competitions | Smart India Hackathon, MyGov contests, with an anti-scam prize warning |
| 📚 Homework Help | Type a question or snap a photo of it — AI explains the steps like a tutor |
| ⏰ Timetable | Build a weekly schedule, get local reminder notifications, works fully offline |
| 🎮 Practice Quiz | Reasoning/quant/GK questions, 100% offline, personal-best "leaderboard" |
| 📄 Resume Builder | AI-drafted, stateless — nothing is stored server-side |
| 🔗 LinkedIn Guide | A manual checklist linking to the real linkedin.com — no automated sign-up |
| 🤖 AI Assistant | Natural-language filter embedded on every listing page; only ever picks from the verified dataset |

Filtering works by **category**, **sector** (government / private / both), and **state**
(India-wide programmes always show; pick a state to see state-specific ones too).

## 🚀 Getting started

**On a phone with no computer access?** Skip to [`SETUP.md`](./SETUP.md) — a
complete, free, mobile-only walkthrough (GitHub, free Gemini key, Vercel).

```bash
git clone <your-repo-url>
cd disha-ai
npm install
cp .env.example .env.local   # optional — see below
npm run dev
```

The app works fully with **zero configuration** — local search, the timetable, and the
offline quiz all work with no API key and no internet once loaded. The AI assistant,
homework helper and resume builder light up once you add either key to `.env.local`:

- `ANTHROPIC_API_KEY` — console.anthropic.com (paid, used first if both are set)
- `GEMINI_API_KEY` — **completely free** at aistudio.google.com/apikey

Never commit `.env.local` — it's already in `.gitignore`.

## ☁️ Deploying

**Vercel (recommended):**
1. Push this repo to GitHub.
2. Import it at vercel.com/new.
3. Add `ANTHROPIC_API_KEY` or `GEMINI_API_KEY` under Project Settings → Environment
   Variables.
4. Deploy.

**Packaging as an Android app (Play Store) from the PWA:**
This app already ships a `public/manifest.json` and a basic offline service worker
(`public/sw.js`), and is installable as a PWA. To wrap it as a Play Store listing, use
Google's own [Bubblewrap CLI](https://github.com/GoogleChromeLabs/bubblewrap) or
[PWABuilder](https://www.pwabuilder.com/) against your deployed Vercel URL — both
generate a Trusted Web Activity (TWA) `.aab` you upload directly to Play Console. You'll
need to add real `icon-192.png` / `icon-512.png` files under `public/icons/` first
(placeholders aren't included in this repo).

## 🧩 Growing this list safely

`data/opportunities.ts` is intentionally small. To add a new entry:
1. Find the **official** page yourself — search `<scheme name> site:gov.in`, or check it
   against `india.gov.in`'s directory.
2. Confirm the domain ends in `.gov.in`, or is a well-known verified platform you can
   name the owning ministry/company for.
3. Fill in every field, especially `feeNote` (state plainly that it's free, or exactly
   what it costs), `sector` (`government` / `private` / `both`), `state` (`'All India'`
   unless it's genuinely state-specific), and `verifiedOn` (today's date).
4. Never copy a listing from an aggregator blog without checking the underlying gov.in
   link yourself — aggregator sites often go stale or get hijacked.

## 🔭 Future scope

- **Live data instead of a static file** — sync `myscheme.gov.in`'s public listings and
  NCS job postings on a schedule, still gated through the same manual-verification review
  step before anything goes live.
- **State-wise expansion** — most current listings are national because that's where
  verified centralised portals exist; add state government scheme portals (each state
  has its own) behind the same verification bar.
- **Private-sector job API** — NCS already lists private jobs, but a dedicated private
  job board API (with a real commercial partner) would add far more volume; keep listings
  clearly labelled by source and never blur government vs. private results together.
- **Real background push notifications** — the current timetable reminders only fire
  while the app is open; a push server (e.g. web-push + a small backend) would enable
  true background reminders even when the app/tab is closed.
- **Real multiplayer leaderboard** — the practice quiz currently stores only a personal
  best on-device; a shared leaderboard needs a backend and basic auth, plus a decision on
  what (if any) personal data to store.
- **Deadline reminders for schemes/exams** — push notifications a few days before an
  application window closes, reusing the same push infrastructure as the timetable.
- **Regional language UI** — Hindi, Marathi, Tamil, Bengali, Telugu translations, since
  myScheme and NSP already support multiple languages.
- **Verified employer partnerships** — direct listings from companies that opt in and
  are individually verified, kept clearly separate from government schemes.
- **Mentor / alumni matching** — connect students with alumni from the same college who
  went through the same scheme or internship.
- **Accessibility pass** — screen-reader labels, larger text mode, and a low-bandwidth
  "text-only" view for slow connections.

## 🛠 Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Sora + Inter (next/font) ·
Anthropic API or free Google AI Studio (Gemini) — optional, server-side only ·
installable, offline-capable PWA
