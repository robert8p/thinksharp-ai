# Humanity

## Latest product update

Humanity now uses bite-sized lesson quests after the diagnostic. Lessons step users through one small concept at a time, with a progress bar, practice hearts, instant check-answer feedback, XP reward state, and retry flow if mastery is not achieved.

Humanity is a production-oriented Expo + React Native MVP that helps adults master critical thinking in the age of AI. It is built around a daily mastery loop: open the app, complete one high-value thinking challenge, receive immediate feedback, update skill scores, schedule spaced review, and get the next best action.

The product is intentionally not a passive course. Every core lesson includes practice, feedback, a mastery threshold, skill score updates, and review scheduling.


## No-code GitHub + Render deployment

For the simplest deployment path, start with:

```text
START_HERE_NO_CODE_DEPLOYMENT.md
```

The first Render deployment can run in demo mode with no Supabase, OpenAI, or RevenueCat credentials. The key requirement is that `render.yaml` and `package.json` sit at the top level of the GitHub repository.

Manual Render settings are also provided in:

```text
RENDER_SETTINGS_QUICK_REFERENCE.txt
GITHUB_UPLOAD_CHECKLIST.txt
```


## Design direction

Humanity uses a friendly, quest-based interface designed to make critical thinking feel accessible rather than academic. The UI is bright, rounded, encouraging, and progress-led: daily quests, XP, streaks, badges, coach bubbles, learning maps, and visible mastery. The app keeps the serious learning engine underneath — mastery checks, retries, spaced review, skill scores, and AI-safety caveats — but presents it in a way that feels welcoming for beginners and useful for experts.

The design is inspired by the appeal of playful habit-building products while avoiding any copied third-party branding, mascots, artwork, or protected visual identity.

## Tech stack

- Expo + React Native + TypeScript
- Expo Router file-based navigation
- Zustand for app state
- Supabase-ready auth/database/storage/RLS schema
- OpenAI Responses API wrapper with structured JSON output
- Deterministic mock AI fallback when no OpenAI key is present
- RevenueCat-ready subscription abstraction with mock premium toggle
- React Hook Form + Zod for validated forms
- Clean playful theme system for friendly, accessible UI
- Jest + jest-expo tests for learning logic
- EAS-ready configuration

## What is included

### Core product flows

- High-conversion onboarding
- Goal selection
- 10-question diagnostic
- Thinking Profile and starting level
- Home dashboard with next best action
- Daily training recommendation system
- Curriculum/modules screen
- Lesson detail with practice and feedback
- Mastery threshold logic
- Fallacy Spotter
- Bias Detector
- Claim Analyser
- Challenge AI
- Decision Premortem
- Review queue
- Progress dashboard
- Achievements
- Paywall
- Profile/settings, trust warnings, share/invite placeholders

### Seeded curriculum

Fully demoable MVP modules:

1. Foundations of Clear Thinking
2. Logical Fallacies
3. Cognitive Biases

Premium-preview / coming-soon modules:

4. Evidence and Source Quality
5. AI-Era Thinking
6. Better Decisions

### Learning mechanics

- Skill scores from 0–100
- Mastery threshold, default 85%
- Lesson attempts and retry support
- Missed questions enter spaced review
- Review intervals: same day, 2 days, 7 days, 21 days
- Daily training prioritises due review, weakest skill, current module, and user goal
- XP, streaks, level titles, and badges

## Prerequisites

- Node.js 22.13+ recommended for Expo SDK 56
- npm 10+
- Expo CLI via `npx expo`
- Optional: Supabase project
- Optional: OpenAI API key
- Optional later: RevenueCat account

## Environment variables

Copy `.env.example` to `.env`.

```bash
cp .env.example .env
```

Variables:

```bash
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
EXPO_PUBLIC_OPENAI_API_KEY=
EXPO_PUBLIC_OPENAI_MODEL=gpt-4.1-mini
EXPO_PUBLIC_MOCK_PREMIUM=false
```

Demo mode works with all variables blank.

Important production note: `EXPO_PUBLIC_OPENAI_API_KEY` is supported only to make this MVP easy to run. For production, move OpenAI calls behind a secure backend or Supabase Edge Function so API keys are not shipped to devices.

## Run in demo mode


```bash
npm install
npm run start
```

Then open in Expo Go, Android emulator, iOS simulator, or web.

Demo mode includes:

- Demo user
- Seeded local curriculum
- Mock AI outputs
- Mock subscription state
- Console analytics
- No Supabase dependency
- No OpenAI dependency


## GitHub + Render deployment

This repository is now ready to push to GitHub and deploy to Render as an Expo web Static Site.

Included deployment files:

- `render.yaml` — Render Blueprint for a Static Site.
- `.github/workflows/ci.yml` — GitHub Actions workflow that installs dependencies, typechecks, runs tests, and builds the Expo web export.
- `.github/workflows/render-deploy-hook.yml` — optional manual Render deploy hook trigger.
- `.nvmrc` and `engines.node` — Node 22.13+ runtime hint.
- `public/_redirects` — portable SPA fallback for static hosts that support Netlify-style redirects.
- `docs/GITHUB_RENDER_DEPLOYMENT.md` — detailed deployment guide.
- `RENDER_TROUBLESHOOTING.md` — fixes for common Render deployment errors.

### Push to GitHub

```bash
git init
git add .
git commit -m "Initial Humanity MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/humanity.git
git push -u origin main
```

### Deploy to Render with Blueprint

1. Push the repository to GitHub.
2. In Render, choose **New > Blueprint**.
3. Select the GitHub repository.
4. Render reads `render.yaml` from the repo root.
5. Apply the Blueprint. No secrets are required for demo/mock mode.
6. Add Supabase/OpenAI environment variables later only when you are ready to connect real services.

The Blueprint uses:

```bash
npm install && npm run build:render
```

and publishes:

```bash
./dist
```

The Blueprint intentionally does **not** include `plan: free`; Render static sites are defined with `type: web` and `runtime: static`, and adding `plan: free` can cause Blueprint validation errors.

### Deploy to Render manually

Create a **Static Site** in Render and use:

```bash
Build command: npm install && npm run build:web
Publish directory: dist
```

Add a rewrite rule so direct Expo Router URLs do not 404 on refresh:

```text
Source: /*
Destination: /index.html
Action: Rewrite
```

### Validate locally before pushing

```bash
npm install
npm run ci
npm run serve:web
```

Production caution: keep `EXPO_PUBLIC_OPENAI_API_KEY` blank on public web deployments unless you are deliberately accepting that the key is exposed in the browser bundle. The production-safe approach is to proxy OpenAI calls through Supabase Edge Functions or another backend.



## Connect Supabase

1. Create a Supabase project.
2. Open Supabase SQL editor.
3. Run `supabase/schema.sql`.
4. Run `supabase/seed.sql`.
5. Copy your Project URL and Publishable Key.
6. Add them to `.env`:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

The schema includes RLS policies so users can only access their own profile, attempts, skill scores, review items, achievements, AI sessions, diagnostic results, and daily training sessions. Curriculum and achievement definitions are readable by authenticated users.

## Connect OpenAI

Add an API key and optional model:

```bash
EXPO_PUBLIC_OPENAI_API_KEY=your-key
EXPO_PUBLIC_OPENAI_MODEL=gpt-4.1-mini
```

AI service wrapper:

- `src/services/ai/openaiProvider.ts`
- `src/services/ai/mockProvider.ts`
- `src/services/ai/types.ts`

Structured output schemas cover:

- Claim analysis
- Socratic feedback
- AI challenge explanation
- Decision premortem feedback

If OpenAI fails or no key exists, the app automatically falls back to deterministic mock output.

## Connect RevenueCat later

The MVP includes a subscription abstraction at:

```bash
src/services/subscriptions/subscriptionService.ts
src/features/subscriptions/gating.ts
```

Current behaviour:

- Mock premium state
- Mock premium toggle
- Free usage limits
- Premium gates
- Pricing constants

To integrate RevenueCat:

1. Install RevenueCat SDK.
2. Replace `getSubscriptionState`, `startMockSubscription`, and `restorePurchases` with RevenueCat calls.
3. Map RevenueCat entitlement IDs to `free`, `premium`, and `lifetime`.
4. Keep `gating.ts` as the product-level access policy.

## Run tests

```bash
npm test
```

Coverage includes:

- Mastery score calculation
- Module completion logic
- Spaced repetition scheduling
- Premium gating
- Diagnostic scoring
- Daily training recommendation logic
- Mock AI schema validation
- Skill score updates

## TypeScript checks

```bash
npm run typecheck
```

## Build with EAS

Install and authenticate EAS CLI, then update the placeholder project ID in `app.json`.

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --profile preview --platform all
eas build --profile production --platform all
```

## Known limitations

- Supabase auth UI is demo-ready but not fully wired to persistent production sessions yet.
- Local app state is in-memory for demo speed; production should persist and sync attempts, reviews, and skill scores.
- OpenAI calls are supported directly for MVP convenience; production should proxy through a secure backend or Supabase Edge Function.
- Shareable diagnostic result is currently text-based via native share; image-card generation is a clean extension point.
- Modules 4–6 are seeded as premium previews rather than fully implemented lesson sets.
- Data export/deletion are UI placeholders until backend functions are added.
- No enterprise dashboard, certification, or admin CMS in MVP by design.

## Next roadmap

### Phase 1: MVP

- Diagnostic
- Lessons
- Daily training
- Practice
- Mastery
- Mock AI
- Premium gates

### Phase 2: Validation

- User interviews
- A/B onboarding
- Learning outcome testing
- Cohort retention analysis
- Pricing testing

### Phase 3: Premium

- RevenueCat live subscriptions
- Advanced modules
- More AI scenarios
- Share cards
- Deeper progress analytics

### Phase 4: B2B

- Organisation dashboard
- Team licences
- Admin reporting
- Corporate AI-literacy training
- Manager reporting

### Phase 5: Certification

- Formal assessments
- Proctored certificate
- LinkedIn shareable credential
- Employer-recognised learning path

## App Store positioning copy

### Title

Humanity

### Subtitle

Daily critical-thinking training for the AI age.

### Short description

A friendly daily workout for better judgment. Practise spotting weak arguments, bias, misinformation, AI hallucinations, and flawed decisions.

### Long description

Humanity helps adults think clearly in a noisy world. Train your judgment through daily scenarios, AI challenge drills, bias detection, fallacy spotting, claim analysis, and decision premortems.

This is not a passive course. Every session asks you to practise: judge an argument, challenge an AI answer, identify assumptions, analyse evidence, or improve a decision. Humanity tracks your skill scores, schedules missed concepts for review, and recommends the next best action so improvement becomes visible.

Use Humanity to:

- Challenge AI before AI challenges your judgment
- Spot misinformation and overconfident claims
- Improve workplace decision quality
- Practise evidence evaluation
- Recognise cognitive biases and logical fallacies
- Build a clearer, calmer thinking habit

AI outputs are reasoning support, not authoritative truth. Do not use the app as medical, legal, financial, or professional advice.

### Keywords

critical thinking, AI literacy, reasoning, decision making, misinformation, bias, logic, fallacies, evidence, productivity, leadership, learning, judgment, media literacy

### Screenshots list

1. Welcome: think better, one tiny quest at a time
2. Diagnostic: 5-minute thinking test
3. Thinking Profile: skill breakdown
4. Home: today’s friendly daily quest
5. Daily Quest: focused reasoning rep
6. Lesson: explanation plus active practice
7. Claim Analyser: assumptions and evidence needed
8. Challenge AI: find unsupported claims
9. Progress: mastery, streak, badges
10. Humanity Plus: unlock the full training path

### Launch landing page copy

Headline: A friendly daily workout for better judgment.

Subheadline: Build better judgment with friendly daily quests, AI challenge drills, bias training, and decision premortems.

CTA: Take the 5-minute thinking test.

Trust line: Built to train judgment, not replace it. AI feedback is a thinking aid, not a truth oracle.

## Suggested launch strategy

1. Launch a waitlist landing page with the 5-minute thinking test as the hook.
2. Recruit 50–100 beta users from professionals, students, and leaders.
3. Measure diagnostic completion, daily training completion, D7 retention, and perceived usefulness.
4. Interview users who complete at least three daily sessions.
5. Tighten the daily loop before expanding curriculum.
6. Test pricing after repeated-use value is visible.
7. Add employer/team pilot only after the consumer loop proves retention.

## Suggested monetisation model

Free tier:

- Diagnostic
- Module 1
- Limited daily practice
- Limited claim analyses per day
- Basic progress tracking

Premium tier:

- Full curriculum
- Unlimited daily practice
- Unlimited claim analysis
- Advanced AI challenge mode
- Decision premortem coach
- Deep progress analytics
- Certificate-ready pathway in future

Pricing copy:

- Monthly: £7.99
- Annual: £59.99
- Lifetime: £149.99

## KPIs

### Learning KPIs

- Diagnostic completion rate
- Average pre/post skill improvement
- Lesson mastery rate
- Review completion rate
- Skill score improvement over 7/30 days

### Engagement KPIs

- Day 1 retention
- Day 7 retention
- Day 30 retention
- Daily training completion rate
- Streak continuation rate
- Average sessions per week

### Business KPIs

- Free-to-paid conversion
- Paywall view-to-conversion rate
- Monthly recurring revenue
- Annual plan conversion
- Churn
- Referral rate

### Quality KPIs

- AI error reports
- User feedback score
- App crash rate
- Lesson drop-off points
- Support requests

## Product guardrails

Humanity should not overclaim intelligence improvement or outsource judgment to AI. The product wins by making users practise judgment repeatedly, receive feedback, improve mastery scores, and transfer the skill to real-world decisions.
