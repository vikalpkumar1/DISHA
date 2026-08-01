# Security & anti-fraud design

This app exists in a space (govt schemes, exams, "earn money," prize contests) that is
heavily targeted by scam apps and phishing clones. These are non-negotiable design
rules — please keep them if you extend the project.

## Rules this codebase follows

1. **Outbound links only, never embedded forms.** No page in this app collects Aadhaar
   numbers, OTPs, passwords, or bank details. Every opportunity opens the *real* site in
   the user's own browser (`target="_blank"`, `rel="noopener noreferrer"`), never in an
   iframe. `next.config.mjs` sets `X-Frame-Options: DENY` so this app itself can't be
   framed by a clone either.
2. **Curated, hand-verified dataset, not a scrape.** `data/opportunities.ts` is the only
   source of listings. Every entry has an `officialDomain` shown to the user *before*
   they tap, an `issuer` (the real ministry/department), and a `verifiedOn` date. Do not
   bulk-import listings from search results or a scraper without manually checking each
   domain — see "Growing this list safely" in the README.
3. **The AI assistant can filter, never invent.** `/api/ai-assist` gives the model the
   existing catalog and asks it to return ids from that catalog. Any id it returns that
   isn't already in `data/opportunities.ts` is dropped server-side before it reaches the
   UI. The model is never asked to generate a URL or a scheme name from scratch.
4. **Resume and homework help are stateless.** `/api/resume` and `/api/homework-help`
   do one completion and return it. Nothing is written to a database or log — including
   any photo the student uploads, which never touches disk. If you add analytics later,
   exclude this content explicitly.
5. **No automated account creation.** The LinkedIn guide links to the real signup page
   and gives a manual checklist — it never scripts account creation, which would violate
   LinkedIn's terms and put the user's account at risk.
6. **The timetable and quiz never leave the device.** Both use `localStorage` only —
   there is no server-side timetable/leaderboard database in this codebase. If you add
   one (for a real multiplayer leaderboard, for instance), review what personal data
   you're now storing and update this file.
7. **Homework help teaches, it doesn't just hand over answers.** The system prompt in
   `/api/homework-help` asks the model to explain reasoning, not just output a final
   answer — and to flag if a student appears to be using it mid-exam. Keep that framing
   if you touch this prompt.
8. **Everything is explicitly free.** Every card states its `feeNote`. Real government
   schemes, the NCS portal, PMIS, Skill India Digital, UPSC/SSC/NTA/IBPS applications are
   all free (beyond any *official* exam form fee paid on the official portal itself) — if
   you add a listing that charges an unusual fee, that is itself a signal to re-verify
   it's genuine.

## Known lookalike domains (do not link to these)

- `myschemes.in` and `my-scheme.netlify.app` are **not** the government's myScheme — the
  real one is `myscheme.gov.in`.
- `skillindiadigitalgov.org` and `skillindia.digital.gov.in` are **not** the real Skill
  India Digital Hub — the real one is `skillindiadigital.gov.in`.
- Any site claiming NCS association that asks for a fee is fraudulent — NCS
  (`ncs.gov.in`) publishes an explicit warning that it never charges for registration,
  applications or interviews.
- Coaching/aggregator apps (there are many) often *look* official for UPSC/SSC/Banking
  prep — they can be legitimate businesses, but they are not the government. Always pay
  exam form fees only on the exam body's own domain (`upsc.gov.in`, `ssc.gov.in`,
  `nta.ac.in`, `ibps.in`), never through a third-party "helper."

## API keys and student data

- `ANTHROPIC_API_KEY` / `GEMINI_API_KEY` live only in server environment variables —
  never expose them in client code or commit them.
- Homework photos are sent directly from the browser to your own `/api/homework-help`
  route, then to the AI provider for one completion. They are not stored by this app.
  Review your AI provider's own data-retention policy if that matters for your users.

## Reporting a problem

If a user reports a broken or suspicious link, treat it as high priority — remove or
flag the entry immediately rather than leaving it live while you investigate.
