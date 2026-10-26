# Hemmalaget

Website for https://hemmalaget.se/. Deployed with [firebase](https://console.firebase.google.com/u/0/project/hemmalaget-8e0ab/overview).

## Development

Requires the Nix dev shell (`direnv allow`) or Node 22 and Yarn 1.

```
yarn install
cd frontend; yarn install
cd functions; yarn install
yarn firebase login
yarn dev
open http://localhost:5555
```

## Configuration

There are no secrets in this repo. The env files are Firebase's own, hold
config only and are committed on purpose. **Never put a secret in them.**

- `functions/.env`: parameters for the functions (`defineString`).
- `extensions/firestore-send-email.env`: parameters for the email extension.
  The SMTP password is in Firebase Secret Manager.
