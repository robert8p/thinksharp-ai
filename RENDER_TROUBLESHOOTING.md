# Render troubleshooting

## Error: `services[0].plan no such plan free for service type web`

Cause: Render static sites are defined as `type: web` plus `runtime: static`, but the Blueprint must not include `plan: free` for this service. Static sites are free by default on Render's static-site hosting path.

Fix included in this package: `render.yaml` has been simplified and no longer contains `plan: free`.

The corrected service block starts like this:

```yaml
services:
  - type: web
    name: thinksharp-ai
    runtime: static
    buildCommand: npm install && npm run build:render
    staticPublishPath: ./dist
```

## If Render still fails to detect the app

Check GitHub first. `render.yaml` and `package.json` must be visible at the repository root. If they are inside another `thinksharp-ai` folder, recreate the repo upload so the contents of the folder are at the root.

## If the build fails on dependencies

Use the manual Static Site fallback:

```text
Build Command: npm install && npm run build:render
Publish Directory: dist
Root Directory: leave blank
```

## If direct URLs return 404

Add this Render rewrite rule:

```text
Source: /*
Destination: /index.html
Action: Rewrite
```
