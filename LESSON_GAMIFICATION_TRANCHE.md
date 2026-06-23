# Lesson Gamification Tranche

This package changes Humanity's post-diagnostic lesson experience from a long lesson page into a Duolingo-style step quest.

## What changed

- Lessons now open as bite-sized quests.
- Each lesson is broken into tiny cards:
  1. Quest intro
  2. Learn the move
  3. Real-life example
  4. AI-age warning
  5. Real-world reflection
  6. Quick check
  7. Tiny takeaway
- Users move one step at a time instead of scrolling through the full lesson.
- Practice questions now use a check-answer flow with immediate feedback.
- The lesson header now shows progress, pass mark, and practice hearts.
- End state is more game-like: quest complete, XP earned, score shown, retry available if mastery is not achieved.
- Home and Learn screens now advertise lessons as bite-sized quests.

## Why

The previous lesson structure worked but still felt too close to a conventional mini-course. This tranche makes the core learning loop feel more accessible, playful, and habit-forming while preserving mastery-based progression.

## Files changed

- `app/lesson/[id].tsx`
- `app/(tabs)/index.tsx`
- `app/(tabs)/learn.tsx`
- `src/features/curriculum/lessonSteps.ts`
- `__tests__/lessonSteps.test.ts`

## Deployment

Upload this package to GitHub exactly as before, then redeploy on Render. No coding is required.
