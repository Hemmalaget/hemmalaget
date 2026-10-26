import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { defineSecret, defineString } from "firebase-functions/params";
import { createTransport } from "nodemailer";
import { z } from "zod";

const requestBodySchema = z.object({
  subject: z.string().optional(),
  message: z.string().optional(),
  email: z.string().optional(),
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
    const { data = {} } = requestBodySchema.safeParse(request.body);

    const subject: string = data.subject ?? "No subject";
    const text = data.message ?? "No message body";
    const replyTo: string | undefined = data.email;

    logger.info(`Received request with subject: "" and messsage: "${text}".`);

    // The password must go into the URL: nodemailer lets the URL's (empty)
    // password override a separate `auth` option.
    const smtpUrl = new URL(smtpConnectionUri.value());
    smtpUrl.password = smtpPassword.value();
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
