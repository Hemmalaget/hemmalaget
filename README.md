# Hemmalaget

Website for https://hemmalaget.se/. Deployed with [firebase](https://console.firebase.google.com/u/0/project/hemmalaget-8e0ab/overview).

## Development

Requires the Nix dev shell (`direnv allow`) or Node 24 and pnpm.

```
pnpm install
pnpm --dir frontend install
pnpm --dir functions install
pnpm firebase login
pnpm dev
open http://localhost:5555
```

## Configuration

There are no secrets in this repo. The env files are Firebase's own, hold
config only and are committed on purpose. **Never put a secret in them.**

- `functions/.env`: parameters for the functions (`defineString`).
- `SMTP_PASSWORD`: the SendGrid API key, a function secret in Firebase Secret
  Manager. Set it with `pnpm firebase functions:secrets:set SMTP_PASSWORD`
  (no trailing newline). For the emulator, put `SMTP_PASSWORD=...` in
  `functions/.secret.local`, which is gitignored. The emulator sends real
  email through SendGrid.

## Deploying

CI deploys on every merge to `main`. Because the `/api/whistleblow` rewrite is
pinned (`pinTag`), every hosting deploy also deploys the `whistleblow`
function, so the site and the function always move together. PR preview
deploys do this too, which uploads the PR's function code as a new revision of
the production function; the live site stays pinned to the revision from the
last `main` deploy.

CI's service account needs `roles/secretmanager.viewer` on the
`SMTP_PASSWORD` secret.

To deploy by hand, build the frontend first (`pnpm --dir frontend build`), as
the hosting deploy uploads whatever is in `frontend/out`.
