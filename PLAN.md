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
  default from the end of December 2026.

`hemmalaget.se` already runs on Microsoft 365, so the function will send
through the Microsoft Graph `sendMail` API as a `hemmalaget.se` mailbox.
SPF and DKIM already pass for that domain, and no DNS changes are needed.

## Preferred solution

- **Sender:** a shared mailbox, `noreply@hemmalaget.se`. Shared mailboxes need
  no license. Sending from `vissel@hemmalaget.se` to itself also works if a new
  mailbox is unwanted.
- **App:** an app registration in Microsoft Entra ID, single tenant, with no
  API permissions granted in Entra.
- **Authorization:** RBAC for Applications in Exchange Online grants the app
  the `Application Mail.Send` role, scoped to the sender mailbox only. Granting
  `Mail.Send` in Entra instead would let the app send as every mailbox in the
  organization.
- **Authentication:** workload identity federation, with no client secret.
  - The function runs as a dedicated Google service account.
  - On each send, the function asks the Google Cloud metadata server for a
    short-lived ID token for that service account, signed by Google.
  - The Entra app has a federated credential that trusts Google tokens for
    that one service account. The function exchanges the Google token for a
    Microsoft access token, valid for about an hour.
  - The Google token only identifies the caller. The Exchange role assignment
    alone decides what the app may do.
  - No secret is stored, so none can leak, expire from inactivity or need
    rotation.

A client secret is the fallback if federation is not acceptable to the
Microsoft 365 admin. It lasts at most 24 months and must be renewed by hand;
it would be stored in Secret Manager as `MS_CLIENT_SECRET`. The code change
for this is small.

## Access needed

One of:

- **A. The Microsoft 365 admin performs the setup** (preferred). The admin
  provides the tenant ID, the client ID and the sender address.
- **B. Temporary roles:** Application Administrator in Microsoft Entra ID, plus
  Exchange Administrator. Both can be removed after the setup.

Global Administrator also works, but it is far broader than needed.

## Configuration

### Google Cloud (project `hemmalaget-8e0ab`)

1. Create the service account `whistleblow@hemmalaget-8e0ab.iam.gserviceaccount.com`.
   It needs no project roles: it only identifies the function to Microsoft.
2. Grant `roles/iam.serviceAccountUser` on that service account to:
   - the CI deployer,
     `github-action-77345932@hemmalaget-8e0ab.iam.gserviceaccount.com`, since
     every hosting deploy also deploys the function (`pinTag`);
   - anyone who deploys functions by hand.
3. Record the service account's numeric unique ID, used as the federated
   credential subject:

   ```sh
   gcloud iam service-accounts describe whistleblow@hemmalaget-8e0ab.iam.gserviceaccount.com --format='value(uniqueId)'
   ```

### Microsoft 365 (admin)

1. **Sender mailbox:** in the Exchange admin center, create the shared mailbox
   `noreply@hemmalaget.se`.
2. **App registration:** in Entra ID, register "Hemmalaget whistleblow",
   accounts in this organizational directory only. Do not add API permissions
   and do not grant admin consent.
3. **Federated credential:** under the app's *Certificates & secrets →
   Federated credentials*, add a credential for *Other issuer*:
   - Issuer: `https://accounts.google.com`
   - Subject identifier: the service account's unique ID from the Google Cloud
     steps above
   - Audience: `api://AzureADTokenExchange` (the default)
4. **Mailbox-scoped permission:** in Exchange Online PowerShell, run:

   ```powershell
   New-ServicePrincipal -AppId <client-id> -ObjectId <enterprise-app-object-id> -DisplayName "Hemmalaget whistleblow"
   New-ManagementScope -Name "Whistleblow sender" -RecipientRestrictionFilter "PrimarySmtpAddress -eq 'noreply@hemmalaget.se'"
   New-ManagementRoleAssignment -App <client-id> -Role "Application Mail.Send" -CustomResourceScope "Whistleblow sender"
   Test-ServicePrincipalAuthorization -Identity <client-id> -Resource noreply@hemmalaget.se
   ```

   `-ObjectId` is the object ID from the app's *Enterprise applications*
   entry, not the one on the app registration. The role assignment can take
   up to an hour to take effect.
5. **Hand over:** pass on the tenant ID, the client ID and the sender address.

## Implementation

All changes are in `functions/`. They replace the nodemailer transport with
two HTTP calls using the built-in `fetch`, so no new dependencies are added.

- **Params** in `functions/.env`. None of them are secrets.

  ```
  RECEIVER_EMAIL=vissel@hemmalaget.se
  SENDER_EMAIL=noreply@hemmalaget.se
  MS_TENANT_ID=<tenant-id>
  MS_CLIENT_ID=<client-id>
  ```

- **Function options:** add `serviceAccount: "whistleblow@hemmalaget-8e0ab.iam.gserviceaccount.com"`
  and drop `secrets`.
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

- **Send:** expect `202 Accepted`.

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

- **Reply-to:** set `replyTo` only when the reporter's address is a valid
  email address. Graph rejects the whole message for an invalid one, so the
  report would be lost. Otherwise, include the given contact text in the
  body.
- **Errors:** on any failure, log the step, the HTTP status and the Microsoft
  error code, never the report content, and return `502`. Keep the existing
  `400` for malformed requests.
- **Remove:** nodemailer, `SMTP_CONNECTION_URI`, `SMTP_USER` and the
  `SMTP_PASSWORD` secret.
- **README:** update *Configuration* and *Deploying* to match. CI now needs
  `iam.serviceAccountUser` on the function's service account instead of
  Secret Manager access.
- **Local emulator:** the metadata server is unavailable locally, so the
  emulator cannot send. Testing happens against the deployed function.

## Deployment and testing

1. Complete the Google Cloud and Microsoft 365 configuration.
2. Create the untracked `functions/.env.hemmalaget-8e0ab` containing
   `RECEIVER_EMAIL=<tester's address>`.
3. Deploy the function only:

   ```sh
   pnpm firebase deploy --only functions:whistleblow
   ```

   A functions-only deploy does not move the hosting site's pinned revision,
   so the live form is unaffected.
4. Call the function URL directly:
   - JSON body: expect `200` and an email.
   - JSON sent as `text/plain`: expect `200` and an email.
   - Malformed body: expect `400`.
   - Check the logs for the send result.
5. Delete `functions/.env.hemmalaget-8e0ab`.
6. Open a PR and merge it. CI deploys hosting and the function together and
   pins the site to the new revision.
7. Submit a real report through the live form and confirm it arrives at
   `vissel@hemmalaget.se`.

## Cleanup after release

- Uninstall the old extension:

  ```sh
  pnpm firebase ext:uninstall firestore-send-email --immediate
  ```

  This also deletes its secret, `firestore-send-email-SMTP_PASSWORD`.
- Delete the `SMTP_PASSWORD` secret, which also removes CI's
  `secretmanager.viewer` binding on it.
- Decide how long to keep the extension's old documents in the Firestore
  `mail` collection.

## Open questions

- Who grants Microsoft 365 access, and which option (A or B) is used.
- Shared mailbox `noreply@hemmalaget.se`, or `vissel@hemmalaget.se` as the
  sender.
- Whether to show a notice on `/visselblasning` with the direct address
  `vissel@hemmalaget.se` until this ships.
