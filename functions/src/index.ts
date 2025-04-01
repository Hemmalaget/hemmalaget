import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import { defineString } from "firebase-functions/params";
import { z } from "zod";

const requestBodySchema = z.object({
  subject: z.string().optional(),
  message: z.string().optional(),
  email: z.string().optional(),
});

const receiverEmail = defineString("RECEIVER_EMAIL");

admin.initializeApp();

const db = admin.firestore();

db.settings({ ignoreUndefinedProperties: true });

export const whistleblow = onRequest(
  {
    timeoutSeconds: 500,
  },
  async (request, response) => {
    const { data = {} } = requestBodySchema.safeParse(request.body);

    const subject: string = data.subject ?? "No subject";
    const text = data.message ?? "No message body";
    const replyTo: string | undefined = data.email;

    logger.info(`Received request with subject: "" and messsage: "${text}".`);

    const doc = await db.collection("mail").add({
      to: receiverEmail.value(),
      replyTo,
      message: {
        subject,
        text,
      },
    });

    logger.info("Added document: " + doc.path);

    response.sendStatus(200);
  }
);
