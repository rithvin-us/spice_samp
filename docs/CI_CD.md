# CI / CD

How this repository is built, checked and shipped. The short version: **GitHub
Actions is the gate, Vercel is the deploy.** They do not overlap — Actions never
needs a Vercel token, and Vercel never needs to re-run the checks.

---

## The pipeline at a glance

```
push / PR ──▶ GitHub Actions ──▶ (green) ──▶ Vercel Git integration ──▶ live
             │                                (build + deploy + preview URL)
             ├─ CI:      typecheck + build on Node 20 & 22, upload dist
             └─ CodeQL:  static security + quality analysis
```

- **Validation** lives in GitHub Actions (this repo).
- **Deployment** is owned by Vercel's Git integration, configured by
  `vercel.json` at the repo root. Every push to `main` deploys to production;
  every PR gets its own preview URL automatically. Production URL:
  <https://solisampleweb.vercel.app>.

Keeping them separate is deliberate: no deploy secret is stored in Actions, and
a CI failure and a deploy failure are never confused for one another.

---

## Workflows

### `.github/workflows/ci.yml` — CI

Runs on pushes to `main`, all PRs to `main`, and on demand
(`workflow_dispatch`).

- **Matrix:** Node `20` and `22`, so a change is validated on both the current
  and the next LTS line. `fail-fast: false` — one version failing still reports
  the other.
- **Steps:** `npm ci` → `npm run lint` (`tsc --noEmit`) → `npm run build`
  (typecheck + `vite build`).
- **Artifact:** the Node 20 job uploads `dist/` (7-day retention) so a reviewer
  can download the exact production output a PR produces.
- **Caching:** `actions/setup-node` caches the npm store keyed on
  `package-lock.json`.
- **Concurrency:** a newer commit on the same ref cancels an in-flight run.
- **Permissions:** `contents: read` only.

### `.github/workflows/codeql.yml` — CodeQL

Static analysis of the TypeScript/JavaScript sources on pushes, PRs, and a
weekly Monday sweep (so newly published advisories are caught even when the code
is quiet). Uses the `security-and-quality` query set. Free for this repository
because it is public; findings appear under the repo's **Security → Code
scanning** tab. No build step — CodeQL reads the sources directly.

---

## Automation

### `.github/dependabot.yml`

Weekly dependency PRs, **grouped** to keep the noise down:

- `react` — React, React DOM, React Router and their types move together.
- `three` — `three`, its types, and every `@react-three/*` package move
  together (they are tightly version-coupled).
- `dev-dependencies` — all remaining devDependencies in one PR.
- A separate ecosystem keeps the pinned **GitHub Actions** themselves current.

Open-PR limit is 5; commits are prefixed `chore(deps)` / `chore(ci)`.

### `.github/pull_request_template.md`

Every PR opens with: what & why, how to test, a checklist (lint, build,
responsive check, reduced-motion, no real data in `src/data/social.ts`), and a
slot for before/after media on visual changes.

---

## Running the same checks locally

CI runs nothing a contributor can't run first:

```bash
npm ci          # what CI installs (exact lockfile)
npm run lint    # tsc --noEmit  — the "Typecheck" step
npm run build   # tsc --noEmit + vite build — the "Build" step
npm run preview # serve dist/ exactly as built
```

If those pass locally, CI passes.

---

## What each check protects

| Check | Catches |
|---|---|
| `npm run lint` (Node 20 & 22) | type errors, including a missing Tamil translation key (the Tamil dictionary is type-checked against English) |
| `npm run build` | anything that breaks a real production bundle — bad imports, failed transforms |
| CodeQL | injection, unsafe patterns, and maintainability smells in TS/JS |
| Dependabot | dependencies drifting out of date / carrying advisories |

---

## Extending it (opt-in ideas)

These are intentionally **not** enabled yet — add them when they earn their
keep:

- **Lighthouse CI budget.** Build, serve `dist/`, and assert performance / a11y
  budgets on `/` and the product routes so a regression in animation cost shows
  up on the PR. High value for a motion-heavy site; needs a served preview, so
  it is left as a deliberate next step.
- **Preview comment bot.** Post the Vercel preview URL as a PR comment (Vercel's
  GitHub app already does this if enabled in the Vercel dashboard — no workflow
  needed).
- **Release tagging.** A `release.yml` that tags `main` and drafts release notes
  from Conventional Commit messages (the history already uses `feat:` / `fix:` /
  `chore:` / `docs:`).
