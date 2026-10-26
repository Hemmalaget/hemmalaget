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

## Deploying functions

CI deploys hosting only. Deploy functions by hand with
`pnpm firebase deploy --only functions`.
