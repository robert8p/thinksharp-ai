# GitHub + Render Deployment Guide

This repository is ready to push to GitHub and deploy to Render as a Static Site.


## No-code first deployment

For a non-technical deployment, use the root-level file `START_HERE_NO_CODE_DEPLOYMENT.md`. It gives browser-only and GitHub Desktop options, plus the exact Render settings.

The most important check is that `render.yaml` and `package.json` are visible on the first page of the GitHub repository. If they are inside a nested `thinksharp-ai` folder, Render Blueprint may not detect the app correctly.

## Recommended deployment shape

- Source control: GitHub repository.
- Hosting: Render Static Site.
- Build output: Expo web export in `dist`.
- Routing: SPA rewrite from `/*` to `/index.html` so Expo Router client-side routes such as `/lesson/1` work on refresh.
- Mobile builds: still supported through EAS using `eas.json`.

## 1. Create the GitHub repository

```bash
git init
git add .
git commit -m "Initial ThinkSharp AI MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/thinksharp-ai.git
git push -u origin main
```

The included GitHub Actions workflow runs:

```bash
npm install
npm run typecheck
npm test
npm run build:web
```

## 2. Deploy to Render using Blueprint

1. Push this repository to GitHub.
2. In Render, choose **New > Blueprint**.
3. Select the GitHub repository.
4. Render will read `render.yaml` from the repo root.
5. Fill any environment variables marked `sync: false`.
6. Apply the Blueprint.

The Blueprint creates one Static Site:

```yaml
name: thinksharp-ai
runtime: static
buildCommand: npm install && npm run build:render
staticPublishPath: ./dist
```

## 3. Deploy to Render manually instead

Choose **New > Static Site** and use:

- Build command: `npm install && npm run build:web`
- Publish directory: `dist`
- Branch: `main`

Then add this rewrite rule in Render:

- Source: `/*`
- Destination: `/index.html`
- Action: `Rewrite`

## 4. Environment variables on Render

For demo mode, leave all secrets blank except the defaults already in `render.yaml`:

```bash
EXPO_PUBLIC_OPENAI_MODEL=gpt-4.1-mini
EXPO_PUBLIC_MOCK_PREMIUM=false
```

For connected mode, add:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
EXPO_PUBLIC_OPENAI_API_KEY=your-openai-api-key
```

Production caution: `EXPO_PUBLIC_OPENAI_API_KEY` is exposed in web/mobile bundles. Keep it blank for public demos, or move OpenAI calls behind a Supabase Edge Function / backend before using a live key in production.

## 5. Validate locally before pushing

```bash
npm install
npm run ci
npm run serve:web
```

Open the local URL shown by `expo serve` / `serve` and test:

- `/`
- `/lesson/lesson-foundations-claims`
- `/ai/claim-analyser`
- `/practice/daily`

## 6. Render deploy behaviour

Render auto-deploys on commits to the linked branch. Pull request previews are enabled in `render.yaml`.

A manual GitHub Actions workflow is also included at `.github/workflows/render-deploy-hook.yml`. It only works if you add a GitHub repository secret named `RENDER_DEPLOY_HOOK_URL` from the Render Static Site settings.

## 7. Troubleshooting

### Direct route refresh gives 404

Confirm the Render rewrite exists:

```text
/* -> /index.html, action: Rewrite
```

### Build fails during dependency install

Use Node 22.13+ and confirm Render uses the repo root. The repo includes `.nvmrc` and `engines.node` for this.

### OpenAI works locally but not on Render

Confirm the env var is set in Render and that you understand the exposure risk for `EXPO_PUBLIC_*` variables. Prefer a backend proxy before production.

### Supabase auth fails on web

Confirm your Supabase URL/publishable key are set and add the Render URL to any relevant Supabase redirect/allowed URL settings.
