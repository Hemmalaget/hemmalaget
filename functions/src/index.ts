import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { defineSecret, defineString } from "firebase-functions/params";
import { createTransport } from "nodemailer";
import { z } from "zod";

// Blank fields count as missing.
const optionalText = z
  .string()
  .trim()
  .transform((value) => value || undefined)
  .optional();

const requestBodySchema = z.object({
  subject: optionalText,
  message: optionalText,
  email: optionalText,
});

const receiverEmail = defineString("RECEIVER_EMAIL");
const senderEmail = defineString("SENDER_EMAIL");
const smtpConnectionUri = defineString("SMTP_CONNECTION_URI");
const smtpPassword = defineSecret("SMTP_PASSWORD");

export const whistleblow = onRequest(
  {
    timeoutSeconds: 500,
    secrets: [smtpPassword],
  },
  async (request, response) => {
    logger.info("Received whistleblow request.");

    const parsed = requestBodySchema.safeParse(request.body);
    if (!parsed.success) {
      logger.warn("Rejected malformed whistleblow request.");
      response.sendStatus(400);
      return;
    }
    const { data } = parsed;

    const subject = data.subject ?? "No subject";
    const text = data.message ?? "No message body";
    const replyTo = data.email;

    // The password must go into the URL: nodemailer lets the URL's (empty)
    // password override a separate `auth` option.
    const smtpUrl = new URL(smtpConnectionUri.value());
    smtpUrl.password = smtpPassword.value().trim();
    const transport = createTransport({
      url: smtpUrl.toString(),
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });

    try {
      const info = await transport.sendMail({
        from: senderEmail.value(),
        to: receiverEmail.value(),
        replyTo: replyTo ?? senderEmail.value(),
        subject,
        text,
      });
      logger.info("Sent email: " + info.messageId);
    } catch (error) {
      logger.error("Failed to send email", error);
      response.sendStatus(502);
      return;
    }

    response.sendStatus(200);
  }
);
