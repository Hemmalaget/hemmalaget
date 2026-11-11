# Hemmalaget

Website for https://hemmalaget.se/. Deployed with [firebase](https://console.firebase.google.com/u/0/project/hemmalaget-8e0ab/overview).

## Development

Requires the Nix dev shell (`direnv allow`) or Node 24 and pnpm.

```
pnpm install
pnpm --dir frontend install
pnpm firebase login
pnpm dev
open http://localhost:5555
```

## Whistleblowing

Reports from `/visselblasning` go to a Microsoft Forms form, which the page
links to (`formUrl` in `frontend/app/visselblasning/page.tsx`). Microsoft
stores the responses and emails the form's owners on each response. The
form's questions and settings are described in `PLAN.md`.

- Form: not created yet
- Owner: not decided yet

## Deploying

CI deploys on every merge to `main`, and deploys a preview channel for every
PR.

To deploy by hand, build the frontend first (`pnpm --dir frontend build`), as
the hosting deploy uploads whatever is in `frontend/out`.
