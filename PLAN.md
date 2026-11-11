# Plan: collect whistleblow reports with Microsoft Forms

## Background

The `whistleblow` function sends reports from the form at `/visselblasning`
to `vissel@hemmalaget.se` over SMTP through SendGrid. The SendGrid trial ended
on 2026-08-04. Since then every send has failed, and the form cannot deliver
reports. The last successful delivery was on 2026-04-12.

Alternatives considered and rejected:

- **Sending email from the function:** every route needs an account or
  credential that lapses when idle, or Microsoft 365 admin setup:
  - SendGrid and Brevo free plans end or lapse, and Brevo keys expire after
    90 days of inactivity;
  - Loopia has email forwarding only, with no mailbox to authenticate against;
  - Microsoft 365 SMTP AUTH is disabled by default from the end of December
    2026 (MC786329);
  - Microsoft 365 Direct Send needs outbound port 25, which Google Cloud
    blocks;
  - Microsoft Graph `sendMail` with workload identity federation works, but
    needs an Entra app registration and an Exchange RBAC role assignment by
    an admin.
- **Storing reports in Firestore:** anyone with read access to the Firebase
  project could read reports. Today only the readers of `vissel@` can.
- **Publishing the address `vissel@hemmalaget.se`:** reporters could no longer
  stay anonymous.

`hemmalaget.se` already runs on Microsoft 365, so reports will go to a
Microsoft Forms form instead. Microsoft hosts the form and stores the
responses, and notifies the form's owners of each response. The site links to
the form, and the function, SendGrid and every secret go away.

## Preferred solution

### The form

- **Owner:** a group form, owned by the Microsoft 365 group of the people who
  handle reports (*Alla inkomna ärenden hanteras av företagsledningen*). A
  group form survives any one person leaving. If notifications cannot be
  turned on for a group form, a personal form owned by a report handler, with
  the other handlers added as co-owners, is the fallback.
- **Language:** Swedish, matching the site.
- **Questions:**
  - *Ämne*: text, required.
  - *Meddelande*: long text, required.
  - *Din e-post*: text, optional. Its subtitle repeats the site's note:
    *Lämnar du fältet tomt rapporterar du anonymt, men då kan vi inte
    återkoppla till dig.*
- **Settings:**
  - *Who can fill out this form*: *Anyone can respond*. Reporters need no
    account, and Forms records no identity.
  - *Get email notification of each response*: on.
  - *Show results automatically* and any summary sharing: off.
- **Confirmation message:** a Swedish thank-you text, replacing the site's
  *Din rapport har skickats*.

### Who can read reports

Only the form's owners: the members of the owning group, or the co-owners of
a personal form. Today the readers of `vissel@` can. Nobody with access to the
Firebase or Google Cloud project can read reports any more.

### Anonymity

The page says reports *kan inte spåras*. With *Anyone can respond*, Forms
records the response time and answers only. Microsoft still sees the
reporter's IP address, as Google does today through the function.

### Fragility

- **Owner leaves:** a personal form is deleted with its owner's account
  after the retention period. A group form avoids this.
- **Tenant settings:** an admin can disable external sharing for Forms, which
  breaks *Anyone can respond* for every form.
- **Notifications:** go only to owners who turned them on. A new owner must
  turn them on too.

## Access needed

A Microsoft 365 user who handles reports creates the form. No admin role is
needed unless the tenant blocks *Anyone can respond*, in which case the admin
enables *Send a link to the form and collect responses → Anyone can respond*
under *Settings → Org settings → Microsoft Forms* in the admin center.

Questions for the report handlers:

- Which group or person owns the form.
- Whether a group form can send response notifications, or the personal form
  fallback is needed.

## Configuration

1. Create the form as in *The form*.
2. Submit a test response from a private browser window, signed out, and
   confirm that each owner gets a notification.
3. Delete the test response.
4. Copy the form's share link, the `https://forms.office.com/r/...` short
   link, and pass it on together with the owner. Record both in the README.

## Implementation

### Frontend

In `frontend/app/visselblasning/page.tsx`:

- Replace the form, and the divider and heading above it, with the site's
  grey `CTA` box, in a two-column lead like the home page's *Vill du bli en
  del av Hemmalaget?*: the page heading and intro on the left, the box on
  the right. Below 700px the box follows the intro.
- The box has the title *Rapportera ett ärende* and the button *Öppna
  formuläret*. Two new optional `CTA` props:
  - `external` opens the link in a new tab
    (`target="_blank" rel="noopener noreferrer"`) and adds an external-link
    icon. Screen readers hear *(öppnas i ny flik)* instead of the icon.
  - `small` uses a smaller button, so the other `CTA`s keep their size.
- The link URL is a constant in the page; it is public and not
  configuration.
- Lay out the six text sections below the lead in two columns, with CSS
  multi-column layout local to the page, so the columns balance in height.
  Not `Highlights`: its alternating backgrounds mean something else on the
  home page. Below 700px the sections stack in one column.
- Move the anonymity note into the form, as the subtitle of *Din e-post*.
- Drop the client state, `onSubmit`, the status messages and the `Spinner`
  import. Delete `frontend/app/components/Spinner`, which nothing else uses.
- Remove the form styles that are no longer used from `styles.module.css`.
- Update the copy that refers to the form below:
  - *Längre ner på sidan finns Hemmalagets visselblåsarformulär. Innan du går
    dit …* becomes *Innan du rapporterar rekommenderar vi att du läser igenom
    informationen nedan.*
  - *Använd formuläret nedan och fyll i rapporteringsformuläret för
    visselblåsning* becomes *Öppna visselblåsarformuläret med knappen högst
    upp på sidan.*

Linking is preferred over embedding the form in an `<iframe>`. A link needs
no layout work, behaves the same on phones, and does not depend on
third-party cookies or frame policies.

### Function and Firebase config

- Delete `functions/` and the `{ "path": "functions" }` reference in the root
  `tsconfig.json`.
- In `firebase.json`, remove the `/api/whistleblow` rewrite and the
  `functions` block.
- In the root `package.json`, remove `lint:functions` and `dev:functions`, and
  the `functions` install step from the README.
- Remove the `!/functions/.env` exception from `.gitignore`.
- Leave the Firestore config and rules as they are. The rules deny all client
  access.

### README

- *Configuration*: replace the secret section with the form's link and owner,
  and where the form's settings are documented (this plan).
- *Deploying*: remove the `pinTag` and function paragraphs and the
  `secretmanager.viewer` requirement.
- *Development*: remove the `functions` install step.

## Deployment and testing

1. Complete the configuration, including the signed-out test response.
2. Push the implementation to this branch, so PR #42 carries both the plan and
   the code. The preview deploy no longer deploys the function.
3. On the preview channel URL, check that the link opens the form in a new
   tab, on desktop and on a phone.
4. Merge. CI deploys hosting without the rewrite.
5. On the live site, submit a real test through the link, confirm the
   notification arrives, and delete the test response.

## Cleanup after release

1. **Old pull requests:** rebase or close any open PR branched from before
   this change. Their preview deploys still deploy the SMTP function and
   reference `SMTP_PASSWORD`, and they will fail once the function and secret
   are gone.
2. **Function:** delete it. Hosting deploys never delete functions, so it
   stays deployed until then.

   ```sh
   pnpm firebase functions:delete whistleblow --region us-central1
   ```

   After this, a hosting rollback past this release, or an old preview
   channel, points `/api/whistleblow` at a function that no longer exists.
   That function could not send anyway, since SendGrid is gone.
3. **Old extension:** uninstall it. The command asks for confirmation before
   deleting the extension's secret, `firestore-send-email-SMTP_PASSWORD`; pass
   `--force` to skip the prompt.

   ```sh
   pnpm firebase ext:uninstall firestore-send-email --immediate
   ```

4. **Old secret:** delete `SMTP_PASSWORD`. This also removes CI's
   `secretmanager.viewer` binding on it.
5. **SendGrid:** close the account if it still exists.
6. **Old `mail` documents:** decide how long to keep the extension's documents
   in the Firestore `mail` collection. This is not urgent: Firestore rules
   deny all client access, so only admins can read them.

## Open questions

- Who owns the form: which group, or which person with which co-owners.
- Whether the tenant allows *Anyone can respond*.
- Whether a group form can send response notifications.
