# Plan: send whistleblow email through Microsoft 365

## Background

The `whistleblow` function sends reports from the form at `/visselblasning`
to `vissel@hemmalaget.se` over SMTP through SendGrid. The SendGrid trial ended
on 2026-08-04. Since then every send has failed, and the form cannot deliver
reports. The last successful delivery was on 2026-04-12.

Alternatives considered and rejected:

- **SendGrid / Brevo:** free plans end or lapse. Brevo SMTP and API keys
  expire after 90 days of inactivity, and this function is rarely used.
- **Loopia SMTP:** the Loopia account has email forwarding only, with no
  mailbox to authenticate against.
- **Microsoft 365 SMTP AUTH:** Basic authentication for SMTP is disabled by
  default from the end of December 2026 (MC786329).
- **Microsoft 365 Direct Send** (unauthenticated SMTP to the MX): Google Cloud
  blocks outbound port 25.

`hemmalaget.se` already runs on Microsoft 365, so the function will send
through the Microsoft Graph `sendMail` API as a `hemmalaget.se` mailbox. The
sender and receiver are in the same tenant, so the message stays inside
Microsoft 365, and no DNS changes are needed.

## Preferred solution

### Sender mailbox

- **Preferred:** `vissel@hemmalaget.se` sends to itself. Graph returns
  `202 Accepted` before delivery, so a bounce is the only sign of a failed
  delivery. With `vissel@` as the sender, bounces land in the inbox that
  someone already reads.
- **Precondition:** this works only if `vissel@` is a user or shared mailbox.
  If it is a distribution group or a forward, the admin decides between:
  - a shared mailbox `noreply@hemmalaget.se`, forwarded to `vissel@` or
    monitored, so bounces are seen;
  - converting `vissel@` into a shared mailbox.

### App and authorization

- **App:** an app registration in Microsoft Entra ID, single tenant, with no
  API permissions granted in Entra.
- **Authorization:** RBAC for Applications in Exchange Online grants the app
  the `Application Mail.Send` role, scoped to the sender mailbox only.
  Exchange adds RBAC grants on top of any Entra consent. Granting `Mail.Send`
  in Entra would therefore let the app send as every mailbox in the
  organization, regardless of the scope.

### Authentication

Workload identity federation, with no client secret:

- The function runs as a dedicated Google service account.
- On each send, the function asks the Google Cloud metadata server for a
  short-lived ID token for that service account, signed by Google.
- The Entra app has a federated credential that trusts Google tokens for that
  one service account. Entra matches the token's `iss`, `sub` and `aud`
  claims exactly.
- The function exchanges the Google token for a Microsoft access token, valid
  for about an hour.
- The Google token only identifies the caller. The Exchange role assignment
  alone decides what the app may do.
- No secret is stored, so none can leak, expire from inactivity or need
  rotation.

A client secret is the fallback if federation is not acceptable to the
Microsoft 365 admin. It lasts at most 24 months and must be renewed by hand,
which recreates the lapse-when-idle problem. It would be stored in Secret
Manager as `MS_CLIENT_SECRET`. The code change for this is small.

### Who can send as the sender mailbox

The ability to send is the same as with today's SMTP secret, and is held by:

- anyone with `iam.serviceAccounts.actAs` or Service Account Token Creator on
  the function's service account: project Owners and Editors, and the CI
  deployer;
- anyone with push access to the GitHub repo. PR preview deploys run the PR's
  function code as that service account.

### Fragility

- **Recreating the service account** gives it a new unique ID. The federated
  credential then silently stops matching, and token exchange fails.
- **Conditional Access for workload identities** can block the token exchange,
  if the tenant uses it.

## Access needed

One of:

- **A. The Microsoft 365 admin performs the setup** (preferred). The admin
  provides the tenant ID, the client ID and the sender address.
- **B. Temporary roles:** Application Developer or Cloud Application
  Administrator in Microsoft Entra ID, plus Exchange Administrator. Both can be
  removed after the setup. Application Administrator and Global Administrator
  also work, but they are broader than needed.

Questions for the admin:

- What kind of recipient `vissel@hemmalaget.se` is: user mailbox, shared
  mailbox, distribution group or forward.
- Whether Conditional Access policies apply to workload identities.
- Who owns the app registration long term.

## Configuration

### Google Cloud (project `hemmalaget-8e0ab`)

1. Create the service account `whistleblow@hemmalaget-8e0ab.iam.gserviceaccount.com`.
   It needs no project roles: the metadata server issues ID tokens for the
   attached service account without extra roles, and the platform collects
   logs.
2. Grant `roles/iam.serviceAccountUser` on that service account to:
   - the CI deployer,
     `github-action-77345932@hemmalaget-8e0ab.iam.gserviceaccount.com`, since
     every hosting deploy also deploys the function (`pinTag`);
   - anyone who deploys functions by hand without Owner or Editor on the
     project.
3. Record the service account's numeric unique ID, used as the federated
   credential subject:

   ```sh
   gcloud iam service-accounts describe whistleblow@hemmalaget-8e0ab.iam.gserviceaccount.com --format='value(uniqueId)'
   ```

### Microsoft 365 (admin)

1. **Sender mailbox:** confirm that `vissel@hemmalaget.se` is a mailbox, or
   set up the alternative from *Sender mailbox*. The steps below use
   `<sender>`.
2. **App registration:** in Entra ID, register "Hemmalaget whistleblow",
   accounts in this organizational directory only. Do not add API permissions
   and do not grant admin consent.
3. **Federated credential:** under the app's *Certificates & secrets →
   Federated credentials*, add a credential for *Other issuer*, with an
   explicit subject identifier (not claims matching):
   - Issuer: `https://accounts.google.com`
   - Subject identifier: the service account's unique ID from the Google Cloud
     steps above
   - Audience: `api://AzureADTokenExchange` (the default)
4. **Mailbox-scoped permission:** in Exchange Online PowerShell, run:

   ```powershell
   New-ServicePrincipal -AppId <client-id> -ObjectId <enterprise-app-object-id> -DisplayName "Hemmalaget whistleblow"
   New-ManagementScope -Name "Whistleblow sender" -RecipientRestrictionFilter "PrimarySmtpAddress -eq '<sender>'"
   New-ManagementRoleAssignment -App <client-id> -Role "Application Mail.Send" -CustomResourceScope "Whistleblow sender"
   Test-ServicePrincipalAuthorization -Identity <client-id> -Resource <sender>
   ```

   - `-ObjectId` is the object ID from the app's *Enterprise applications*
     entry, not the one on the app registration.
   - The assignment takes 30 minutes to 2 hours to reach Graph.
     `Test-ServicePrincipalAuthorization` bypasses that cache, so it can pass
     while Graph still returns `403 ErrorAccessDenied`. Wait before treating a
     failed test send as a configuration error.
5. **Hand over:** pass on the tenant ID, the client ID and the sender address.
   Record them, the federated credential's name and the app owner in the
   README.

## Implementation

All changes are in `functions/`. They replace the nodemailer transport with
three HTTP calls using the built-in `fetch`, so no new dependencies are added.

- **Params** in `functions/.env`. None of them are secrets.

  ```
  RECEIVER_EMAIL=vissel@hemmalaget.se
  SENDER_EMAIL=<sender>
  MS_TENANT_ID=<tenant-id>
  MS_CLIENT_ID=<client-id>
  ```

- **Function options:**
  - add `serviceAccount: "whistleblow@hemmalaget-8e0ab.iam.gserviceaccount.com"`;
  - drop `secrets`;
  - lower `timeoutSeconds` from 500 to 60.
- **Google ID token:**

  ```
  GET http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=api://AzureADTokenExchange
  Metadata-Flavor: Google
  ```

- **Microsoft token exchange:**

  ```
  POST https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/token
  Content-Type: application/x-www-form-urlencoded

  client_id=<client-id>
  scope=https://graph.microsoft.com/.default
  grant_type=client_credentials
  client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
  client_assertion=<google-id-token>
  ```

- **Send:** expect `202 Accepted`. This means accepted, not delivered.

  ```
  POST https://graph.microsoft.com/v1.0/users/<sender>/sendMail
  Authorization: Bearer <access-token>

  {
    "message": {
      "subject": "...",
      "body": { "contentType": "Text", "content": "..." },
      "toRecipients": [{ "emailAddress": { "address": "<receiver>" } }],
      "replyTo": [{ "emailAddress": { "address": "<reporter>" } }]
    },
    "saveToSentItems": false
  }
  ```

  `saveToSentItems` defaults to true, so it is set explicitly. This keeps
  report copies out of the sender's Sent Items.
- **Timeouts:** give each of the three calls `AbortSignal.timeout(15_000)`,
  replacing the SMTP connection, greeting and socket timeouts.
- **Reply-to:** set `replyTo` only when the reporter's address passes zod's
  `.email()` check. Graph may reject the whole message for an invalid
  address, and the report would be lost. Otherwise, include the given contact
  text in the body.
- **Errors:** on any failure, log:
  - the step: metadata, token or send;
  - the HTTP status or timeout;
  - the Microsoft `error.code`.

  Never log `error.message`, which can echo addresses, or the report content.
  Return `502`. Keep the existing `400` for malformed requests.
- **Remove:** nodemailer, `SMTP_CONNECTION_URI`, `SMTP_USER` and the
  `SMTP_PASSWORD` secret.
- **README:** update *Configuration* and *Deploying* to match:
  - CI needs `iam.serviceAccountUser` on the function's service account
    instead of Secret Manager access;
  - record the tenant ID, client ID, federated credential name and app owner;
  - recreating the service account breaks sending until the federated
    credential's subject is updated;
  - the local emulator cannot send, because the metadata server is
    unavailable locally. Remove the note that it sends real email.

## Deployment and testing

The implementation goes on this branch, so PR #42 carries both the plan and
the code.

1. Complete the Google Cloud and Microsoft 365 configuration, including the
   propagation wait.
2. Push the implementation. The PR preview deploy creates a function revision
   and pins the preview channel to it. The live site stays pinned to the
   revision from the last `main` deploy.
3. Test on the preview channel URL:
   - Submit a report through the form: expect a `200` and an email in
     `vissel@`.
   - Submit with an invalid contact address: expect a `200`, with the address
     in the body.
   - Call `/api/whistleblow` directly with JSON sent as `text/plain`: expect a
     `200`.
   - Call it with a malformed body: expect a `400`.
   - Check the logs for each step's result.
4. Optional, only to send tests elsewhere: create the untracked
   `functions/.env.hemmalaget-8e0ab` with `RECEIVER_EMAIL=<tester's address>`
   and push. Delete the file and push again before merging.
5. Merge. CI deploys hosting and the function together and pins the site to
   the new revision.
6. Submit a real report through the live form and confirm it arrives at
   `vissel@hemmalaget.se`.

## Cleanup after release

1. **Old pull requests:** rebase or close any open PR branched from before
   this change. Their preview deploys still run the SMTP function and
   reference `SMTP_PASSWORD`, and they will fail once the secret is gone.
2. **Old extension:** uninstall it. The command asks for confirmation before
   deleting the extension's secret, `firestore-send-email-SMTP_PASSWORD`; pass
   `--force` to skip the prompt.

   ```sh
   pnpm firebase ext:uninstall firestore-send-email --immediate
   ```

3. **Old secret:** delete `SMTP_PASSWORD`. This also removes CI's
   `secretmanager.viewer` binding on it. After this, a hosting rollback past
   this release, or an old preview channel, pins a function revision whose
   secret no longer exists. That revision could not send anyway, since
   SendGrid is gone.
4. **Old `mail` documents:** decide how long to keep the extension's documents
   in the Firestore `mail` collection. This is not urgent: Firestore rules
   deny all client access, so only admins can read them.

## Open questions

- Who grants Microsoft 365 access, and which option (A or B) is used.
- Whether `vissel@hemmalaget.se` is a mailbox that can be the sender.
- Whether Conditional Access policies apply to workload identities.
- Who owns the Entra app registration long term.
- Whether to show a notice on `/visselblasning` with the direct address
  `vissel@hemmalaget.se` until this ships.
