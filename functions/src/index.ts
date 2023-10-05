import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import {defineString} from "firebase-functions/params";

const receiverEmail = defineString("RECEIVER_EMAIL");

admin.initializeApp();

const db = admin.firestore();

export const helloWorld = onRequest(async (request, response) => {
  const subject = request.body.subject ?? "No subject";
  const text = request.body.message ?? "No message body";

  logger.info(`Received request with subject: "${
    subject
  }" and messsage: "${text}".`);

  const doc = await db.collection("default").add({
    to: [receiverEmail.value()],
    message: {
      subject: subject,
      text: text,
    },
  });


  logger.info("Added document: " + doc.path);

  response.sendStatus(200);
});
