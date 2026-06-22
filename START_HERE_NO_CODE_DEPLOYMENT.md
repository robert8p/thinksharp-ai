# Humanity — No-Code GitHub + Render Deployment

This package is ready to deploy as a web app on Render without editing code.

## What you will do

1. Unzip this folder.
2. Put the app files into a new GitHub repository.
3. Connect that repository to Render.
4. Render builds and publishes the app automatically.

You do **not** need Supabase, OpenAI, or RevenueCat keys for the first deployment. The app runs in demo/mock mode when those keys are blank.

---

## Important rule before you start

`render.yaml` must be at the top level of your GitHub repository.

Correct GitHub repository layout:

```text
README.md
START_HERE_NO_CODE_DEPLOYMENT.md
render.yaml
package.json
app.json
app/
src/
supabase/
public/
```

Wrong layout:

```text
humanity/
  render.yaml
  package.json
  app/
  src/
```

If GitHub shows a single folder called `humanity` and all files are inside it, Render Blueprint deployment may not find `render.yaml`.

---

# Option A — Browser-only GitHub upload

Use this if you do not want to install GitHub Desktop.

### 1. Create the GitHub repository

1. Go to GitHub.
2. Click **+** in the top-right.
3. Click **New repository**.
4. Repository name: `humanity`.
5. Choose **Private** or **Public**.
6. Do **not** tick “Add a README file”.
7. Click **Create repository**.

### 2. Upload the app files

1. On the empty repository page, click **uploading an existing file**.
2. Open the unzipped app folder on your computer.
3. Open the inner folder that contains `render.yaml`, `package.json`, `app`, `src`, and `supabase`.
4. Select the files and folders inside that folder.
5. Drag them into GitHub’s upload area.
6. Wait for the upload to finish.
7. Commit message: `Initial Humanity app`.
8. Click **Commit changes**.

### 3. Check GitHub layout

After upload, the repository file list should show `render.yaml` and `package.json` immediately, without clicking into another folder.

If you need a simple check: if you can see `render.yaml` on the first repository page, you are fine.

---

# Option B — GitHub Desktop

Use this if the browser upload is awkward.

### 1. Create a new empty GitHub repository

1. Go to GitHub.
2. Click **+ > New repository**.
3. Repository name: `humanity`.
4. Do **not** add a README.
5. Click **Create repository**.

### 2. Clone it using GitHub Desktop

1. Open GitHub Desktop.
2. Click **File > Clone repository**.
3. Choose the new `humanity` repository.
4. Click **Clone**.

### 3. Copy the app files into the cloned folder

1. Open the cloned `humanity` folder on your computer.
2. Open the unzipped package folder in another window.
3. Copy everything from the package folder that contains `render.yaml`, `package.json`, `app`, `src`, and `supabase` into the cloned GitHub folder.
4. In GitHub Desktop, enter summary: `Initial Humanity app`.
5. Click **Commit to main**.
6. Click **Push origin**.

---

# Deploy on Render using Blueprint

This is the simplest Render path because this repo includes `render.yaml`.

1. Go to Render.
2. Click **New +**.
3. Click **Blueprint**.
4. Connect/select your GitHub repository.
5. Render will detect `render.yaml`.
6. Service name should show as `humanity`.
7. No secrets are required for demo mode.
8. Click **Apply** / **Create** / **Deploy**.
9. Wait for the deploy to finish.
10. Open the `.onrender.com` URL Render gives you.

The app should run in demo mode without Supabase or OpenAI keys.

---

# If Blueprint is not available, deploy manually as a Static Site

1. In Render, click **New +**.
2. Click **Static Site**.
3. Select the GitHub repository.
4. Use these settings:

```text
Name: humanity
Branch: main
Root Directory: leave blank
Build Command: npm install && npm run build:render
Publish Directory: dist
```

5. Add environment variables:

```text
NODE_VERSION = 22.13.0
EXPO_PUBLIC_OPENAI_MODEL = gpt-4.1-mini
EXPO_PUBLIC_MOCK_PREMIUM = false
```

6. Do not add Supabase or OpenAI variables for the first demo deployment. The app is designed to run without them.

7. Add this rewrite rule in Render if it is not already created:

```text
Source: /*
Destination: /index.html
Action: Rewrite
```

8. Click **Create Static Site**.

---

# First deployment checklist

Before pressing deploy, confirm:

- [ ] `render.yaml` is visible on the first page of the GitHub repository.
- [ ] `package.json` is visible on the first page of the GitHub repository.
- [ ] Render service type is **Static Site**, not Web Service.
- [ ] Build command is `npm install && npm run build:render`.
- [ ] Publish directory is `dist`.
- [ ] OpenAI key is blank for the first public demo.
- [ ] Supabase keys are blank unless you have already created the Supabase project.

---

# What will work immediately

- Web deployment on Render.
- Demo onboarding.
- Diagnostic flow.
- Home dashboard.
- Lessons and practice.
- Daily training.
- Claim analyser with mock AI.
- Challenge AI with mock feedback.
- Decision premortem with mock feedback.
- Premium gates using mock subscription logic.

---

# What requires real service setup later

- Supabase auth and persistent user database.
- OpenAI live AI feedback.
- RevenueCat real subscriptions.
- App Store / Play Store native builds through EAS.

For a public Render demo, keep OpenAI blank. Browser apps expose `EXPO_PUBLIC_*` variables, so a live OpenAI key should be moved behind a backend or Supabase Edge Function before production.

---

# Common problems

## Render says it cannot find a build script

Check GitHub. `package.json` must be visible on the repository’s first page.

## Render Blueprint cannot find `render.yaml`

The files were probably uploaded inside a nested folder. Create a fresh repo and upload the contents of the app folder, not the outer folder itself.

## The home page works but refresh on another page gives a 404

Add the Render rewrite:

```text
/* -> /index.html
```

## The app shows mock/demo data

That is expected until Supabase/OpenAI keys are added.

## The build fails due to Node version

Set this Render environment variable:

```text
NODE_VERSION = 22.13.0
```

---

# Recommended first deployment

Deploy demo mode first. Do not add Supabase or OpenAI keys yet. Once the app is live, then move to the next tranche: persistent Supabase sync and a secure AI proxy.


---

## Error: services[0].plan no such plan free for service type web

Use this fixed package. The corrected `render.yaml` does not include `plan: free`. If you already uploaded the previous package, replace the old `render.yaml` in GitHub with the new one from this ZIP, commit the change, and redeploy on Render.
