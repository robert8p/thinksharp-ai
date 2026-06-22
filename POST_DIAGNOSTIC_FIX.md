# Post-Diagnostic Blank Page Fix

## What was wrong

The diagnostic results screen rendered the shared `<Screen>` component but did not import it. In Expo/React Native web builds, that creates a runtime `ReferenceError` when the app navigates from the diagnostic to the results page, which appears to users as a blank page.

## What was fixed

Updated:

```text
app/(auth)/diagnostic-results.tsx
```

Added:

```ts
import { Screen } from '@/components/Screen';
```

## What to do

Replace your GitHub repository files with this package, commit the changes, then redeploy on Render.

## Expected flow after redeploy

1. Open app.
2. Complete onboarding.
3. Complete diagnostic.
4. Diagnostic results screen appears.
5. Tap **Enter Humanity**.
6. Tap **Skip for demo** or create an account.
7. Home dashboard opens.
