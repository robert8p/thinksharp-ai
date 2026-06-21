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
