# Validation Notes

Performed in the build environment:

- Created repository files, SQL, seed data, tests, and README.
- Confirmed Expo SDK 56 package metadata is available from npm.
- Ran a lightweight TypeScript structural check using temporary stubs because full `npm install` repeatedly exceeded the execution timeout in this environment.
- Ran a runtime core-learning validation script through `tsx` covering:
  - question score calculation
  - lesson mastery threshold
  - module mastery logic
  - skill score update direction/bounds
  - spaced repetition reset/progression
  - diagnostic scoring
  - daily review prioritisation
  - premium gating

Full local validation to run after download:

```bash
npm install
npm run typecheck
npm test
npm run start
```

Known environment limitation: complete dependency installation for Expo SDK 56 timed out here, so Jest and full Expo TypeScript checks were not completed inside this sandbox. The repo includes the required Jest test suite and scripts for local execution.


## GitHub + Render repackaging validation

Additional deployment packaging added:

- Added `render.yaml` for Render Static Site deployment.
- Added `npm run build:web`, `npm run build:render`, `npm run serve:web`, and `npm run ci` scripts.
- Set Expo web output explicitly to `single` so SPA routing can be handled by Render rewrites.
- Added Render rewrite from `/*` to `/index.html`.
- Added GitHub Actions CI to run install, TypeScript, Jest, and Expo web export.
- Added `.nvmrc`, `.npmrc`, and public static-host helper files.
- Added `docs/GITHUB_RENDER_DEPLOYMENT.md`.

Local structural validation performed after repackaging:

- `package.json` parsed successfully.
- `app.json` parsed successfully.
- `public/site.webmanifest` parsed successfully.
- `render.yaml` parsed successfully with PyYAML.
- GitHub Actions workflow YAML files parsed successfully with PyYAML.

Full dependency install still exceeded this sandbox's execution timeout, so full Expo web export, Jest, and TypeScript validation should be run after download with:

```bash
npm install
npm run ci
```

## Humanity rename and friendly redesign validation

Additional changes in this package:

- Renamed app, Expo slug, package name, Render service, web manifest, docs, and share copy to **Humanity**.
- Reworked visual theme from serious dark premium to bright, friendly, rounded, quest-based UI.
- Added reusable UI components: `FunHeader`, `CoachBubble`, and `StatPill`.
- Updated onboarding, home, learning map, progress, AI tools, paywall, and profile screens to use beginner-friendly language and playful quest mechanics.
- Rebranded premium tier as **Humanity Plus**.
- Generated a new simple app icon for Humanity.
- Added `HUMANITY_REDESIGN_NOTES.md`.

Validation performed after redesign:

- Confirmed `app.json`, `package.json`, and `public/site.webmanifest` parse as valid JSON.
- Confirmed legacy brand references were removed from the app and deployment package.
- Attempted `npm install --ignore-scripts --no-audit --no-fund`; dependency installation again exceeded the sandbox timeout before completion.

Run this locally or in GitHub Actions after uploading to GitHub:

```bash
npm install
npm run ci
```

Known limitation: because dependencies could not be fully installed in this sandbox, full TypeScript, Jest, and Expo web export validation still need to run through GitHub Actions or your local machine after upload.

## Lesson gamification tranche validation

Date: 2026-06-22

Changes made:
- Added `src/features/curriculum/lessonSteps.ts` to generate bite-sized lesson quests.
- Rebuilt `app/lesson/[id].tsx` into a one-step-at-a-time quest flow with progress, hearts, check-answer feedback, XP/result state, and retry path.
- Updated Home and Learn screens to describe lessons as bite-sized quests.
- Added `__tests__/lessonSteps.test.ts` for lesson-step generation.

Validation completed in this environment:
- TypeScript transpilation check passed for changed files:
  - `app/lesson/[id].tsx`
  - `app/(tabs)/index.tsx`
  - `app/(tabs)/learn.tsx`
  - `src/features/curriculum/lessonSteps.ts`
  - `__tests__/lessonSteps.test.ts`
- Lightweight runtime validation confirmed the first post-diagnostic lesson now produces 7 steps:
  - intro
  - idea
  - example
  - ai_age
  - reflection
  - question
  - takeaway

Known validation limitation:
- Full `npm install`, `npm run typecheck`, and `npm test` still require dependency installation in the target GitHub/Render environment. The sandbox package does not include `node_modules`.
