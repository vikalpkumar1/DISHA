# 📱 Mobile setup guide — 100% free, no computer needed

This walks you from "zip file on my phone" to "live app on the internet," using
only free tiers and your phone's browser.

---

## Part 1 — Get a free AI key (Google AI Studio / Gemini)

1. On your phone, open **aistudio.google.com/apikey** in your browser.
2. Sign in with any Google account (no credit card, ever, for the free tier).
3. Tap **Create API key**.
4. Let it create a new Google Cloud project automatically (default option).
5. Copy the key — it starts with `AIza...`. Save it somewhere private (like your
   phone's notes app) for a minute — you'll paste it into Vercel in Part 4.
6. Treat this key like a password: never post it publicly, never put it directly
   in your code — it only ever goes into an environment variable.

## Part 2 — Create your GitHub account + a new repository

1. Go to **github.com** → sign up (free).
2. Tap the **+** icon (top right) → **New repository**.
3. Name it `disha-ai`, keep it **Public** (Private also works, both are free),
   leave "Add a README" **unchecked** since we already have one.
4. Tap **Create repository**. You'll land on an empty repo page.

## Part 3 — Get the code from your phone into that repo

First, unzip `disha-ai.zip` using your phone's file manager (both Android and
iPhone can unzip files natively — tap the zip, choose "Extract" or "Uncompress").

**Try this first (fastest, if it works on your phone):**
1. On the empty repo page, tap **"uploading an existing file."**
2. Open your phone's file manager in split-screen / multi-window next to your
   browser (most Android phones support this; long-press the recent-apps icon
   or drag down from the top on some models).
3. Drag the whole unzipped `disha-ai` folder into the upload box. GitHub
   preserves every subfolder automatically.
4. Scroll down, add a commit message like "Initial commit," tap **Commit
   changes**.

**If your phone can't drag a folder into the browser (very common on iPhone,
and some Android phones), use this instead — slower, but works on every phone,
no app installs:**
1. Tap **Add file → Create new file**.
2. In the filename box, type the **full path** of one file, e.g.
   `package.json` — GitHub creates it directly.
3. For a file inside folders, type the whole path in that same box, e.g.
   `data/opportunities.ts` or `app/api/homework-help/route.ts` — GitHub
   **automatically creates the folders for you** when you include slashes.
4. Open that same file on your phone (in the unzipped folder), select all the
   text, copy it, and paste it into GitHub's editor box.
5. Scroll down → **Commit changes**.
6. Repeat for each file in the project (there are about 60 — tedious but
   completely reliable). Do the small config files first
   (`package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`,
   `postcss.config.mjs`, `.gitignore`, `.env.example`), then work through
   `app/`, `components/`, `data/`, `lib/`, `public/` folder by folder.

**Faster option if you're on Android and comfortable with a few typed commands:**
Install **Termux** (free, get it from F-Droid — the Play Store version is
outdated) and run:
```bash
pkg install git
termux-setup-storage
cd ~/storage/downloads
git clone https://github.com/<your-username>/disha-ai.git
cp -r disha-ai-unzipped/* disha-ai/
cd disha-ai
git add .
git commit -m "Initial commit"
git push
```
GitHub will ask for a username and password when you `git push` — use a
**Personal Access Token** instead of your real password (create one free at
github.com/settings/tokens → "Generate new token (classic)" → check the
`repo` box → generate → copy it → paste it when git asks for a password).

## Part 4 — Deploy for free on Vercel

1. Go to **vercel.com** on your phone → **Sign Up** → choose **Continue with
   GitHub** (this links the two for free, no card required).
2. Tap **Add New… → Project**.
3. Find `disha-ai` in the list and tap **Import**.
4. Before deploying, tap **Environment Variables**, and add one:
   - Name: `GEMINI_API_KEY`
   - Value: paste the `AIza...` key from Part 1
5. Tap **Deploy**. Wait about 1–2 minutes.
6. You'll get a live link like `disha-ai-yourname.vercel.app` — that's your
   app, live on the internet, 100% free.
7. From now on, **every time you push a change to the `main` branch on
   GitHub, Vercel automatically redeploys** — no extra setup needed.

## Part 5 — GitHub repositories & branches, explained

- **Repository ("repo")** = your project's folder, plus its entire saved
  history. `disha-ai` is your repo.
- **Commit** = one saved snapshot of changes, with a short message describing
  what changed.
- **Branch** = a parallel copy of the code you can edit without touching the
  main version. `main` is the default branch — the one Vercel deploys from.
- Why branches matter later: if you want to try something risky (a big
  redesign, an experimental feature) without breaking your live app, you'd
  create a new branch (e.g. `feature/dark-mode`), make changes there, and only
  **merge** it into `main` once you're happy — at which point Vercel deploys
  it automatically.
- For now, as a solo project, it's completely fine to just edit `main`
  directly using the "Create new file" / "Edit" buttons on github.com.

## Part 6 — Do you need GitHub Actions?

**Short answer: not for deployment** — Vercel's GitHub integration (Part 4)
already redeploys your app automatically on every push, for free, with no
Actions file needed. That's simpler and does the same job.

GitHub Actions is GitHub's free automation tool: you write a `.yml` file
describing steps to run automatically (e.g. "on every push, install
dependencies and check for errors"). It's free for public repos, and free
personal accounts also get a monthly allowance of Actions minutes for private
repos.

If you'd like a simple one anyway — a sanity check that your code still
installs cleanly every time you push — create this file at
`.github/workflows/ci.yml` (same "type the full path" trick from Part 3):

```yaml
name: CI
on: [push]
jobs:
  build-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
```

This is optional — the app deploys and works fine without it.

---

## Quick recap

1. Free Gemini key → aistudio.google.com/apikey
2. Free GitHub repo → github.com → New repository
3. Get the code in → drag the folder, or "Create new file" with full paths
4. Free Vercel deploy → vercel.com → Import → add `GEMINI_API_KEY` → Deploy
5. Every future push to `main` auto-deploys — that's it
