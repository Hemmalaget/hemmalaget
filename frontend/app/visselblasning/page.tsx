"use client";

import { useState } from "react";
import styles from "./styles.module.css";

const Whistleblowing = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async () => {
    setError("");

    const data = {
      subject: subject.trim(),
      message: message.trim(),
      email: email.trim() || undefined,
    };

    const response = await fetch("/api/whistleblow", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setSubject("");
      setMessage("");
      setEmail("");
      setError("");
    } else {
      setError(`${response.status} (${response.statusText})`);
    }
  };

  return (
    <div className={styles.page}>
      <h1>Visselblåsning</h1>
      {error && <div>{error}</div>}

      <form
        className={styles.form}
        onSubmit={(evt) => {
          evt.preventDefault();
          onSubmit();
        }}
      >
        <label>
          Rubrik
          <input
            type="text"
            value={subject}
            onChange={(evt) => {
              setSubject(evt.target.value);
            }}
          />
        </label>

        <label>
          Meddelande
          <textarea
            value={message}
            onChange={(evt) => {
              setMessage(evt.target.value);
            }}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(evt) => {
              setEmail(evt.target.value);
            }}
          />
        </label>

        <button type="submit" disabled={!(subject.trim() && message.trim())}>
          Skicka
        </button>
      </form>
    </div>
  );
};

export default Whistleblowing;
