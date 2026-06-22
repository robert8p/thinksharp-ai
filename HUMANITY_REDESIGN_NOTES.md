# Humanity redesign notes

This package changes the previous concept into **Humanity**.

## Product direction

Humanity keeps the same serious learning engine but presents it in a more accessible, friendly, quest-based style:

- Friendly daily quests instead of formal training tasks.
- Short, encouraging coach bubbles.
- Colourful rounded cards, badges, progress bars, and XP/streak surfaces.
- Beginner-safe language with less expert jargon.
- A playful mascot-style feel using simple emoji-based coach moments, without copying any third-party mascot, brand, or artwork.
- Still mastery-based: users must practise, receive feedback, retry, and review missed concepts.

## What changed in the app

- App name, package name, Render service name, manifest, README, and deployment docs now use **Humanity**.
- UI theme changed from premium dark-first to bright, friendly, approachable, gamified light-first styling.
- Onboarding now feels like a first quest rather than a formal assessment funnel.
- Dashboard now leads with “today’s quest”, XP, streak, mastery, and clear next actions.
- Curriculum is presented as a learning map with worlds and quests.
- Progress is presented as a “growth garden”.
- Premium tier is branded as **Humanity Plus**.

## What did not change

- Expo + React Native + TypeScript stack.
- Supabase-ready schema and RLS.
- OpenAI wrapper plus mock AI fallback.
- Mastery learning, spaced repetition, skill scoring, and daily recommendation logic.
- GitHub + Render no-code deployment structure.
